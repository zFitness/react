import {installConsoleFunctionsToWindow} from 'react-devtools-shared/src/backend/console';
import {installHook} from 'react-devtools-shared/src/hook';

export function initializeHook(contentWindow: any): void {
  // Install a global variable to allow patching console early (during injection).
  // This provides React Native developers with components stacks even if they don't run DevTools.
  installConsoleFunctionsToWindow();
  installHook(contentWindow);
}
