/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type {Fiber} from 'react-reconciler/src/ReactInternalTypes';
import type {
  LegacyDispatcherRef,
  CurrentDispatcherRef,
  ReactRenderer,
  WorkTagMap,
  ConsolePatchSettings,
} from './types';

import {
  formatConsoleArguments,
  formatWithStyles,
} from 'react-devtools-shared/src/backend/utils';
import {
  FIREFOX_CONSOLE_DIMMING_COLOR,
  ANSI_STYLE_DIMMING_TEMPLATE,
  ANSI_STYLE_DIMMING_TEMPLATE_WITH_COMPONENT_STACK,
} from 'react-devtools-shared/src/constants';
import {getInternalReactConstants, getDispatcherRef} from './renderer';
import {
  getStackByFiberInDevAndProd,
  supportsNativeConsoleTasks,
} from './DevToolsFiberComponentStack';
import {castBool, castBrowserTheme} from '../utils';

const OVERRIDE_CONSOLE_METHODS = ['error', 'trace', 'warn'];

// React's custom built component stack strings match "\s{4}in"
// Chrome's prefix matches "\s{4}at"
const PREFIX_REGEX = /\s{4}(in|at)\s{1}/;
// Firefox and Safari have no prefix ("")
// but we can fallback to looking for location info (e.g. "foo.js:12:345")
const ROW_COLUMN_NUMBER_REGEX = /:\d+:\d+(\n|$)/;

export function isStringComponentStack(text: string): boolean {
  return PREFIX_REGEX.test(text) || ROW_COLUMN_NUMBER_REGEX.test(text);
}

const STYLE_DIRECTIVE_REGEX = /^%c/;

// This function tells whether or not the arguments for a console
// method has been overridden by the patchForStrictMode function.
// If it has we'll need to do some special formatting of the arguments
// so the console color stays consistent
function isStrictModeOverride(args: Array<any>): boolean {
  if (__IS_FIREFOX__) {
    return (
      args.length >= 2 &&
      STYLE_DIRECTIVE_REGEX.test(args[0]) &&
      args[1] === FIREFOX_CONSOLE_DIMMING_COLOR
    );
  } else {
    return args.length >= 2 && args[0] === ANSI_STYLE_DIMMING_TEMPLATE;
  }
}

function restorePotentiallyModifiedArgs(args: Array<any>): Array<any> {
  // If the arguments don't have any styles applied, then just copy
  if (!isStrictModeOverride(args)) {
    return args.slice();
  }

  if (__IS_FIREFOX__) {
    // Filter out %c from the start of the first argument and color as a second argument
    return [args[0].slice(2)].concat(args.slice(2));
  } else {
    // Filter out the `\x1b...%s\x1b` template
    return args.slice(1);
  }
}

type OnErrorOrWarning = (
  fiber: Fiber,
  type: 'error' | 'warn',
  args: Array<any>,
) => void;

const injectedRenderers: Map<
  ReactRenderer,
  {
    currentDispatcherRef: LegacyDispatcherRef | CurrentDispatcherRef,
    getCurrentFiber: () => Fiber | null,
    onErrorOrWarning: ?OnErrorOrWarning,
    workTagMap: WorkTagMap,
  },
> = new Map();

let targetConsole: Object = console;
let targetConsoleMethods: {[string]: $FlowFixMe} = {};
for (const method in console) {
  targetConsoleMethods[method] = console[method];
}

let unpatchFn: null | (() => void) = null;

// Enables e.g. Jest tests to inject a mock console object.
export function dangerous_setTargetConsoleForTesting(
  targetConsoleForTesting: Object,
): void {
  targetConsole = targetConsoleForTesting;

  targetConsoleMethods = ({}: {[string]: $FlowFixMe});
  for (const method in targetConsole) {
    targetConsoleMethods[method] = console[method];
  }
}

// v16 renderers should use this method to inject internals necessary to generate a component stack.
// These internals will be used if the console is patched.
// Injecting them separately allows the console to easily be patched or un-patched later (at runtime).
export function registerRenderer(
  renderer: ReactRenderer,
  onErrorOrWarning?: OnErrorOrWarning,
): void {
  const {
    currentDispatcherRef,
    getCurrentFiber,
    findFiberByHostInstance,
    version,
  } = renderer;

  // Ignore React v15 and older because they don't expose a component stack anyway.
  if (typeof findFiberByHostInstance !== 'function') {
    return;
  }

  // currentDispatcherRef gets injected for v16.8+ to support hooks inspection.
  // getCurrentFiber gets injected for v16.9+.
  if (currentDispatcherRef != null && typeof getCurrentFiber === 'function') {
    const {ReactTypeOfWork} = getInternalReactConstants(version);

    injectedRenderers.set(renderer, {
      currentDispatcherRef,
      getCurrentFiber,
      workTagMap: ReactTypeOfWork,
      onErrorOrWarning,
    });
  }
}

const consoleSettingsRef: ConsolePatchSettings = {
  appendComponentStack: false,
  breakOnConsoleErrors: false,
  showInlineWarningsAndErrors: false,
  hideConsoleLogsInStrictMode: false,
  browserTheme: 'dark',
};

// Patches console methods to append component stack for the current fiber.
// Call unpatch() to remove the injected behavior.
export function patch({
  appendComponentStack,
  breakOnConsoleErrors,
  showInlineWarningsAndErrors,
  hideConsoleLogsInStrictMode,
  browserTheme,
}: ConsolePatchSettings): void {
  // Settings may change after we've patched the console.
  // Using a shared ref allows the patch function to read the latest values.
  consoleSettingsRef.appendComponentStack = appendComponentStack;
  consoleSettingsRef.breakOnConsoleErrors = breakOnConsoleErrors;
  consoleSettingsRef.showInlineWarningsAndErrors = showInlineWarningsAndErrors;
  consoleSettingsRef.hideConsoleLogsInStrictMode = hideConsoleLogsInStrictMode;
  consoleSettingsRef.browserTheme = browserTheme;

  if (
    appendComponentStack ||
    breakOnConsoleErrors ||
    showInlineWarningsAndErrors
  ) {
    if (unpatchFn !== null) {
      // Don't patch twice.
      return;
    }

    const originalConsoleMethods: {[string]: $FlowFixMe} = {};

    unpatchFn = () => {
      for (const method in originalConsoleMethods) {
        try {
          targetConsole[method] = originalConsoleMethods[method];
        } catch (error) {}
      }
    };

    OVERRIDE_CONSOLE_METHODS.forEach(method => {
      try {
        const originalMethod = (originalConsoleMethods[method] = targetConsole[
          method
        ].__REACT_DEVTOOLS_ORIGINAL_METHOD__
          ? targetConsole[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__
          : targetConsole[method]);

        // $FlowFixMe[missing-local-annot]
        const overrideMethod = (...args) => {
          let shouldAppendWarningStack = false;
          if (method !== 'log') {
            if (consoleSettingsRef.appendComponentStack) {
              const lastArg = args.length > 0 ? args[args.length - 1] : null;
              const alreadyHasComponentStack =
                typeof lastArg === 'string' && isStringComponentStack(lastArg);

              // If we are ever called with a string that already has a component stack,
              // e.g. a React error/warning, don't append a second stack.
              shouldAppendWarningStack = !alreadyHasComponentStack;
            }
          }

          const shouldShowInlineWarningsAndErrors =
            consoleSettingsRef.showInlineWarningsAndErrors &&
            (method === 'error' || method === 'warn');

          // Search for the first renderer that has a current Fiber.
          // We don't handle the edge case of stacks for more than one (e.g. interleaved renderers?)
          // eslint-disable-next-line no-for-of-loops/no-for-of-loops
          for (const renderer of injectedRenderers.values()) {
            const currentDispatcherRef = getDispatcherRef(renderer);
            const {getCurrentFiber, onErrorOrWarning, workTagMap} = renderer;
            const current: ?Fiber = getCurrentFiber();
            if (current != null) {
              try {
                if (shouldShowInlineWarningsAndErrors) {
                  // patch() is called by two places: (1) the hook and (2) the renderer backend.
                  // The backend is what implements a message queue, so it's the only one that injects onErrorOrWarning.
                  if (typeof onErrorOrWarning === 'function') {
                    onErrorOrWarning(
                      current,
                      ((method: any): 'error' | 'warn'),
                      // Restore and copy args before we mutate them (e.g. adding the component stack)
                      restorePotentiallyModifiedArgs(args),
                    );
                  }
                }

                if (
                  shouldAppendWarningStack &&
                  !supportsNativeConsoleTasks(current)
                ) {
                  const componentStack = getStackByFiberInDevAndProd(
                    workTagMap,
                    current,
                    (currentDispatcherRef: any),
                  );
                  if (componentStack !== '') {
                    if (isStrictModeOverride(args)) {
                      if (__IS_FIREFOX__) {
                        args[0] = `${args[0]} %s`;
                        args.push(componentStack);
                      } else {
                        args[0] =
                          ANSI_STYLE_DIMMING_TEMPLATE_WITH_COMPONENT_STACK;
                        args.push(componentStack);
                      }
                    } else {
                      args.push(componentStack);
                    }
                  }
                }
              } catch (error) {
                // Don't let a DevTools or React internal error interfere with logging.
                setTimeout(() => {
                  throw error;
                }, 0);
              } finally {
                break;
              }
            }
          }

          if (consoleSettingsRef.breakOnConsoleErrors) {
            // --- Welcome to debugging with React DevTools ---
            // This debugger statement means that you've enabled the "break on warnings" feature.
            // Use the browser's Call Stack panel to step out of this override function-
            // to where the original warning or error was logged.
            // eslint-disable-next-line no-debugger
            debugger;
          }

          originalMethod(...args);
        };

        overrideMethod.__REACT_DEVTOOLS_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_OVERRIDE_METHOD__ = overrideMethod;

        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  } else {
    unpatch();
  }
}

// Removed component stack patch from console methods.
export function unpatch(): void {
  if (unpatchFn !== null) {
    unpatchFn();
    unpatchFn = null;
  }
}

let unpatchForStrictModeFn: null | (() => void) = null;

// NOTE: KEEP IN SYNC with src/hook.js:patchConsoleForInitialCommitInStrictMode
export function patchForStrictMode() {
  const overrideConsoleMethods = [
    'error',
    'group',
    'groupCollapsed',
    'info',
    'log',
    'trace',
    'warn',
  ];

  if (unpatchForStrictModeFn !== null) {
    // Don't patch twice.
    return;
  }

  const originalConsoleMethods: {[string]: $FlowFixMe} = {};

  unpatchForStrictModeFn = () => {
    for (const method in originalConsoleMethods) {
      try {
        targetConsole[method] = originalConsoleMethods[method];
      } catch (error) {}
    }
  };

  overrideConsoleMethods.forEach(method => {
    try {
      const originalMethod = (originalConsoleMethods[method] = targetConsole[
        method
      ].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__
        ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__
        : targetConsole[method]);

      // $FlowFixMe[missing-local-annot]
      const overrideMethod = (...args) => {
        if (!consoleSettingsRef.hideConsoleLogsInStrictMode) {
          // Dim the text color of the double logs if we're not hiding them.
          if (__IS_FIREFOX__) {
            originalMethod(
              ...formatWithStyles(args, FIREFOX_CONSOLE_DIMMING_COLOR),
            );
          } else {
            originalMethod(
              ANSI_STYLE_DIMMING_TEMPLATE,
              ...formatConsoleArguments(...args),
            );
          }
        }
      };

      overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ =
        originalMethod;
      originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ =
        overrideMethod;

      targetConsole[method] = overrideMethod;
    } catch (error) {}
  });
}

// NOTE: KEEP IN SYNC with src/hook.js:unpatchConsoleForInitialCommitInStrictMode
export function unpatchForStrictMode(): void {
  if (unpatchForStrictModeFn !== null) {
    unpatchForStrictModeFn();
    unpatchForStrictModeFn = null;
  }
}

export function patchConsoleUsingWindowValues() {
  const appendComponentStack =
    castBool(window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__) ?? true;
  const breakOnConsoleErrors =
    castBool(window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__) ?? false;
  const showInlineWarningsAndErrors =
    castBool(window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__) ?? true;
  const hideConsoleLogsInStrictMode =
    castBool(window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__) ??
    false;
  const browserTheme =
    castBrowserTheme(window.__REACT_DEVTOOLS_BROWSER_THEME__) ?? 'dark';

  patch({
    appendComponentStack,
    breakOnConsoleErrors,
    showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode,
    browserTheme,
  });
}

// After receiving cached console patch settings from React Native, we set them on window.
// When the console is initially patched (in renderer.js and hook.js), these values are read.
// The browser extension (etc.) sets these values on window, but through another method.
export function writeConsolePatchSettingsToWindow(
  settings: ConsolePatchSettings,
): void {
  window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ =
    settings.appendComponentStack;
  window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ =
    settings.breakOnConsoleErrors;
  window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ =
    settings.showInlineWarningsAndErrors;
  window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ =
    settings.hideConsoleLogsInStrictMode;
  window.__REACT_DEVTOOLS_BROWSER_THEME__ = settings.browserTheme;
}

export function installConsoleFunctionsToWindow(): void {
  window.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__ = {
    patchConsoleUsingWindowValues,
    registerRendererWithConsole: registerRenderer,
  };
}
