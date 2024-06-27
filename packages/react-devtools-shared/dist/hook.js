/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "U": () => (/* binding */ installHook)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Install the hook on window, which is an event emitter.
 * Note: this global hook __REACT_DEVTOOLS_GLOBAL_HOOK__ is a de facto public API.
 * It's especially important to avoid creating direct dependency on the DevTools Backend.
 * That's why we still inline the whole event emitter implementation,
 * the string format implementation, and part of the console implementation here.
 *
 * 
 */
function installHook(target) {
  if (target.hasOwnProperty('__REACT_DEVTOOLS_GLOBAL_HOOK__')) {
    return null;
  }

  var targetConsole = console;
  var targetConsoleMethods = {};

  for (var method in console) {
    targetConsoleMethods[method] = console[method];
  }

  function dangerous_setTargetConsoleForTesting(targetConsoleForTesting) {
    targetConsole = targetConsoleForTesting;
    targetConsoleMethods = {};

    for (var _method in targetConsole) {
      targetConsoleMethods[_method] = console[_method];
    }
  }

  function detectReactBuildType(renderer) {
    try {
      if (typeof renderer.version === 'string') {
        // React DOM Fiber (16+)
        if (renderer.bundleType > 0) {
          // This is not a production build.
          // We are currently only using 0 (PROD) and 1 (DEV)
          // but might add 2 (PROFILE) in the future.
          return 'development';
        } // React 16 uses flat bundles. If we report the bundle as production
        // version, it means we also minified and envified it ourselves.


        return 'production'; // Note: There is still a risk that the CommonJS entry point has not
        // been envified or uglified. In this case the user would have *both*
        // development and production bundle, but only the prod one would run.
        // This would be really bad. We have a separate check for this because
        // it happens *outside* of the renderer injection. See `checkDCE` below.
      } // $FlowFixMe[method-unbinding]


      var _toString = Function.prototype.toString;

      if (renderer.Mount && renderer.Mount._renderNewRootComponent) {
        // React DOM Stack
        var renderRootCode = _toString.call(renderer.Mount._renderNewRootComponent); // Filter out bad results (if that is even possible):


        if (renderRootCode.indexOf('function') !== 0) {
          // Hope for the best if we're not sure.
          return 'production';
        } // Check for React DOM Stack < 15.1.0 in development.
        // If it contains "storedMeasure" call, it's wrapped in ReactPerf (DEV only).
        // This would be true even if it's minified, as method name still matches.


        if (renderRootCode.indexOf('storedMeasure') !== -1) {
          return 'development';
        } // For other versions (and configurations) it's not so easy.
        // Let's quickly exclude proper production builds.
        // If it contains a warning message, it's either a DEV build,
        // or an PROD build without proper dead code elimination.


        if (renderRootCode.indexOf('should be a pure function') !== -1) {
          // Now how do we tell a DEV build from a bad PROD build?
          // If we see NODE_ENV, we're going to assume this is a dev build
          // because most likely it is referring to an empty shim.
          if (renderRootCode.indexOf('NODE_ENV') !== -1) {
            return 'development';
          } // If we see "development", we're dealing with an envified DEV build
          // (such as the official React DEV UMD).


          if (renderRootCode.indexOf('development') !== -1) {
            return 'development';
          } // I've seen process.env.NODE_ENV !== 'production' being smartly
          // replaced by `true` in DEV by Webpack. I don't know how that
          // works but we can safely guard against it because `true` was
          // never used in the function source since it was written.


          if (renderRootCode.indexOf('true') !== -1) {
            return 'development';
          } // By now either it is a production build that has not been minified,
          // or (worse) this is a minified development build using non-standard
          // environment (e.g. "staging"). We're going to look at whether
          // the function argument name is mangled:


          if ( // 0.13 to 15
          renderRootCode.indexOf('nextElement') !== -1 || // 0.12
          renderRootCode.indexOf('nextComponent') !== -1) {
            // We can't be certain whether this is a development build or not,
            // but it is definitely unminified.
            return 'unminified';
          } else {
            // This is likely a minified development build.
            return 'development';
          }
        } // By now we know that it's envified and dead code elimination worked,
        // but what if it's still not minified? (Is this even possible?)
        // Let's check matches for the first argument name.


        if ( // 0.13 to 15
        renderRootCode.indexOf('nextElement') !== -1 || // 0.12
        renderRootCode.indexOf('nextComponent') !== -1) {
          return 'unminified';
        } // Seems like we're using the production version.
        // However, the branch above is Stack-only so this is 15 or earlier.


        return 'outdated';
      }
    } catch (err) {// Weird environments may exist.
      // This code needs a higher fault tolerance
      // because it runs even with closed DevTools.
      // TODO: should we catch errors in all injected code, and not just this part?
    }

    return 'production';
  }

  function checkDCE(fn) {
    // This runs for production versions of React.
    // Needs to be super safe.
    try {
      // $FlowFixMe[method-unbinding]
      var _toString2 = Function.prototype.toString;

      var code = _toString2.call(fn); // This is a string embedded in the passed function under DEV-only
      // condition. However the function executes only in PROD. Therefore,
      // if we see it, dead code elimination did not work.


      if (code.indexOf('^_^') > -1) {
        // Remember to report during next injection.
        hasDetectedBadDCE = true; // Bonus: throw an exception hoping that it gets picked up by a reporting system.
        // Not synchronously so that it doesn't break the calling code.

        setTimeout(function () {
          throw new Error('React is running in production mode, but dead code ' + 'elimination has not been applied. Read how to correctly ' + 'configure React for production: ' + 'https://react.dev/link/perf-use-production-build');
        });
      }
    } catch (err) {}
  } // NOTE: KEEP IN SYNC with src/backend/utils.js


  function formatWithStyles(inputArgs, style) {
    if (inputArgs === undefined || inputArgs === null || inputArgs.length === 0 || // Matches any of %c but not %%c
    typeof inputArgs[0] === 'string' && inputArgs[0].match(/([^%]|^)(%c)/g) || style === undefined) {
      return inputArgs;
    } // Matches any of %(o|O|d|i|s|f), but not %%(o|O|d|i|s|f)


    var REGEXP = /([^%]|^)((%%)*)(%([oOdisf]))/g;

    if (typeof inputArgs[0] === 'string' && inputArgs[0].match(REGEXP)) {
      return ["%c".concat(inputArgs[0]), style].concat(_toConsumableArray(inputArgs.slice(1)));
    } else {
      var firstArg = inputArgs.reduce(function (formatStr, elem, i) {
        if (i > 0) {
          formatStr += ' ';
        }

        switch (_typeof(elem)) {
          case 'string':
          case 'boolean':
          case 'symbol':
            return formatStr += '%s';

          case 'number':
            var formatting = Number.isInteger(elem) ? '%i' : '%f';
            return formatStr += formatting;

          default:
            return formatStr += '%o';
        }
      }, '%c');
      return [firstArg, style].concat(_toConsumableArray(inputArgs));
    }
  }

  var unpatchFn = null; // NOTE: KEEP IN SYNC with src/backend/console.js:patchForStrictMode
  // This function hides or dims console logs during the initial double renderer
  // in Strict Mode. We need this function because during initial render,
  // React and DevTools are connecting and the renderer interface isn't avaiable
  // and we want to be able to have consistent logging behavior for double logs
  // during the initial renderer.

  function patchConsoleForInitialCommitInStrictMode(_ref) {
    var hideConsoleLogsInStrictMode = _ref.hideConsoleLogsInStrictMode,
        browserTheme = _ref.browserTheme;
    var overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

    if (unpatchFn !== null) {
      // Don't patch twice.
      return;
    }

    var originalConsoleMethods = {};

    unpatchFn = function unpatchFn() {
      for (var _method2 in originalConsoleMethods) {
        try {
          targetConsole[_method2] = originalConsoleMethods[_method2];
        } catch (error) {}
      }
    };

    overrideConsoleMethods.forEach(function (method) {
      try {
        var originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method];

        var overrideMethod = function overrideMethod() {
          if (!hideConsoleLogsInStrictMode) {
            // Dim the text color of the double logs if we're not
            // hiding them.
            var color;

            switch (method) {
              case 'warn':
                color = browserTheme === 'light' ? "rgba(250, 180, 50, 0.75)" : "rgba(250, 180, 50, 0.5)";
                break;

              case 'error':
                color = browserTheme === 'light' ? "rgba(250, 123, 130, 0.75)" : "rgba(250, 123, 130, 0.5)";
                break;

              case 'log':
              default:
                color = browserTheme === 'light' ? "rgba(125, 125, 125, 0.75)" : "rgba(125, 125, 125, 0.5)";
                break;
            }

            if (color) {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              originalMethod.apply(void 0, _toConsumableArray(formatWithStyles(args, "color: ".concat(color))));
            } else {
              throw Error('Console color is not defined');
            }
          }
        };

        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  } // NOTE: KEEP IN SYNC with src/backend/console.js:unpatchForStrictMode


  function unpatchConsoleForInitialCommitInStrictMode() {
    if (unpatchFn !== null) {
      unpatchFn();
      unpatchFn = null;
    }
  }

  var uidCounter = 0;

  function inject(renderer) {
    var id = ++uidCounter;
    renderers.set(id, renderer);
    var reactBuildType = hasDetectedBadDCE ? 'deadcode' : detectReactBuildType(renderer); // Patching the console enables DevTools to do a few useful things:
    // * Append component stacks to warnings and error messages
    // * Disabling or marking logs during a double render in Strict Mode
    // * Disable logging during re-renders to inspect hooks (see inspectHooksOfFiber)
    //
    // Allow patching console early (during injection) to
    // provide developers with components stacks even if they don't run DevTools.

    if (target.hasOwnProperty('__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__')) {
      var _target$__REACT_DEVTO = target.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__,
          registerRendererWithConsole = _target$__REACT_DEVTO.registerRendererWithConsole,
          patchConsoleUsingWindowValues = _target$__REACT_DEVTO.patchConsoleUsingWindowValues;

      if (typeof registerRendererWithConsole === 'function' && typeof patchConsoleUsingWindowValues === 'function') {
        registerRendererWithConsole(renderer);
        patchConsoleUsingWindowValues();
      }
    } // If we have just reloaded to profile, we need to inject the renderer interface before the app loads.
    // Otherwise the renderer won't yet exist and we can skip this step.


    var attach = target.__REACT_DEVTOOLS_ATTACH__;

    if (typeof attach === 'function') {
      var rendererInterface = attach(hook, id, renderer, target);
      hook.rendererInterfaces.set(id, rendererInterface);
    }

    hook.emit('renderer', {
      id: id,
      renderer: renderer,
      reactBuildType: reactBuildType
    });
    return id;
  }

  var hasDetectedBadDCE = false;

  function sub(event, fn) {
    hook.on(event, fn);
    return function () {
      return hook.off(event, fn);
    };
  }

  function on(event, fn) {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(fn);
  }

  function off(event, fn) {
    if (!listeners[event]) {
      return;
    }

    var index = listeners[event].indexOf(fn);

    if (index !== -1) {
      listeners[event].splice(index, 1);
    }

    if (!listeners[event].length) {
      delete listeners[event];
    }
  }

  function emit(event, data) {
    if (listeners[event]) {
      listeners[event].map(function (fn) {
        return fn(data);
      });
    }
  }

  function getFiberRoots(rendererID) {
    var roots = fiberRoots;

    if (!roots[rendererID]) {
      roots[rendererID] = new Set();
    }

    return roots[rendererID];
  }

  function onCommitFiberUnmount(rendererID, fiber) {
    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberUnmount(fiber);
    }
  }

  function onCommitFiberRoot(rendererID, root, priorityLevel) {
    var mountedRoots = hook.getFiberRoots(rendererID);
    var current = root.current;
    var isKnownRoot = mountedRoots.has(root);
    var isUnmounting = current.memoizedState == null || current.memoizedState.element == null; // Keep track of mounted roots so we can hydrate when DevTools connect.

    if (!isKnownRoot && !isUnmounting) {
      mountedRoots.add(root);
    } else if (isKnownRoot && isUnmounting) {
      mountedRoots.delete(root);
    }

    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberRoot(root, priorityLevel);
    }
  }

  function onPostCommitFiberRoot(rendererID, root) {
    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handlePostCommitFiberRoot(root);
    }
  }

  function setStrictMode(rendererID, isStrictMode) {
    var rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      if (isStrictMode) {
        rendererInterface.patchConsoleForStrictMode();
      } else {
        rendererInterface.unpatchConsoleForStrictMode();
      }
    } else {
      // This should only happen during initial commit in the extension before DevTools
      // finishes its handshake with the injected renderer
      if (isStrictMode) {
        var hideConsoleLogsInStrictMode = window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ === true;
        var browserTheme = window.__REACT_DEVTOOLS_BROWSER_THEME__;
        patchConsoleForInitialCommitInStrictMode({
          hideConsoleLogsInStrictMode: hideConsoleLogsInStrictMode,
          browserTheme: browserTheme
        });
      } else {
        unpatchConsoleForInitialCommitInStrictMode();
      }
    }
  }

  var openModuleRangesStack = [];
  var moduleRanges = [];

  function getTopStackFrameString(error) {
    var frames = error.stack.split('\n');
    var frame = frames.length > 1 ? frames[1] : null;
    return frame;
  }

  function getInternalModuleRanges() {
    return moduleRanges;
  }

  function registerInternalModuleStart(error) {
    var startStackFrame = getTopStackFrameString(error);

    if (startStackFrame !== null) {
      openModuleRangesStack.push(startStackFrame);
    }
  }

  function registerInternalModuleStop(error) {
    if (openModuleRangesStack.length > 0) {
      var startStackFrame = openModuleRangesStack.pop();
      var stopStackFrame = getTopStackFrameString(error);

      if (stopStackFrame !== null) {
        moduleRanges.push([startStackFrame, stopStackFrame]);
      }
    }
  } // TODO: More meaningful names for "rendererInterfaces" and "renderers".


  var fiberRoots = {};
  var rendererInterfaces = new Map();
  var listeners = {};
  var renderers = new Map();
  var backends = new Map();
  var hook = {
    rendererInterfaces: rendererInterfaces,
    listeners: listeners,
    backends: backends,
    // Fast Refresh for web relies on this.
    renderers: renderers,
    emit: emit,
    getFiberRoots: getFiberRoots,
    inject: inject,
    on: on,
    off: off,
    sub: sub,
    // This is a legacy flag.
    // React v16 checks the hook for this to ensure DevTools is new enough.
    supportsFiber: true,
    // React calls these methods.
    checkDCE: checkDCE,
    onCommitFiberUnmount: onCommitFiberUnmount,
    onCommitFiberRoot: onCommitFiberRoot,
    onPostCommitFiberRoot: onPostCommitFiberRoot,
    setStrictMode: setStrictMode,
    // Schedule Profiler runtime helpers.
    // These internal React modules to report their own boundaries
    // which in turn enables the profiler to dim or filter internal frames.
    getInternalModuleRanges: getInternalModuleRanges,
    registerInternalModuleStart: registerInternalModuleStart,
    registerInternalModuleStop: registerInternalModuleStop
  };

  if (false) {}

  Object.defineProperty(target, '__REACT_DEVTOOLS_GLOBAL_HOOK__', {
    // This property needs to be configurable for the test environment,
    // else we won't be able to delete and recreate it between tests.
    configurable: false,
    enumerable: false,
    get: function get() {
      return hook;
    }
  });
  return hook;
}
var __webpack_exports__installHook = __webpack_exports__.U;
export { __webpack_exports__installHook as installHook };

//# sourceMappingURL=hook.js.map