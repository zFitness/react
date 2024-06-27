/******/ var __webpack_modules__ = ({

/***/ 786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;
/**
 * @license React
 * react-debug-tools.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ErrorStackParser = __webpack_require__(206),
    React = __webpack_require__(675),
    assign = Object.assign,
    ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"),
    hasOwnProperty = Object.prototype.hasOwnProperty,
    hookLog = [],
    primitiveStackCache = null;

function getPrimitiveStackCache() {
  if (null === primitiveStackCache) {
    var cache = new Map();

    try {
      Dispatcher.useContext({
        _currentValue: null
      });
      Dispatcher.useState(null);
      Dispatcher.useReducer(function (s) {
        return s;
      }, null);
      Dispatcher.useRef(null);
      "function" === typeof Dispatcher.useCacheRefresh && Dispatcher.useCacheRefresh();
      Dispatcher.useLayoutEffect(function () {});
      Dispatcher.useInsertionEffect(function () {});
      Dispatcher.useEffect(function () {});
      Dispatcher.useImperativeHandle(void 0, function () {
        return null;
      });
      Dispatcher.useDebugValue(null);
      Dispatcher.useCallback(function () {});
      Dispatcher.useTransition();
      Dispatcher.useSyncExternalStore(function () {
        return function () {};
      }, function () {
        return null;
      }, function () {
        return null;
      });
      Dispatcher.useDeferredValue(null);
      Dispatcher.useMemo(function () {
        return null;
      });
      "function" === typeof Dispatcher.useMemoCache && Dispatcher.useMemoCache(0);
      "function" === typeof Dispatcher.useOptimistic && Dispatcher.useOptimistic(null, function (s) {
        return s;
      });
      "function" === typeof Dispatcher.useFormState && Dispatcher.useFormState(function (s) {
        return s;
      }, null);
      "function" === typeof Dispatcher.useActionState && Dispatcher.useActionState(function (s) {
        return s;
      }, null);

      if ("function" === typeof Dispatcher.use) {
        Dispatcher.use({
          $$typeof: REACT_CONTEXT_TYPE,
          _currentValue: null
        });
        Dispatcher.use({
          then: function then() {},
          status: "fulfilled",
          value: null
        });

        try {
          Dispatcher.use({
            then: function then() {}
          });
        } catch (x) {}
      }

      Dispatcher.useId();
      "function" === typeof Dispatcher.useHostTransitionStatus && Dispatcher.useHostTransitionStatus();
    } finally {
      var readHookLog = hookLog;
      hookLog = [];
    }

    for (var i = 0; i < readHookLog.length; i++) {
      var hook = readHookLog[i];
      cache.set(hook.primitive, ErrorStackParser.parse(hook.stackError));
    }

    primitiveStackCache = cache;
  }

  return primitiveStackCache;
}

var currentFiber = null,
    currentHook = null,
    currentContextDependency = null;

function nextHook() {
  var hook = currentHook;
  null !== hook && (currentHook = hook.next);
  return hook;
}

function readContext(context) {
  if (null === currentFiber) return context._currentValue;
  if (null === currentContextDependency) throw Error("Context reads do not line up with context dependencies. This is a bug in React Debug Tools.");
  hasOwnProperty.call(currentContextDependency, "memoizedValue") ? (context = currentContextDependency.memoizedValue, currentContextDependency = currentContextDependency.next) : context = context._currentValue;
  return context;
}

var SuspenseException = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`"),
    Dispatcher = {
  use: function use(usable) {
    if (null !== usable && "object" === _typeof(usable)) {
      if ("function" === typeof usable.then) {
        switch (usable.status) {
          case "fulfilled":
            var fulfilledValue = usable.value;
            hookLog.push({
              displayName: null,
              primitive: "Promise",
              stackError: Error(),
              value: fulfilledValue,
              debugInfo: void 0 === usable._debugInfo ? null : usable._debugInfo,
              dispatcherHookName: "Use"
            });
            return fulfilledValue;

          case "rejected":
            throw usable.reason;
        }

        hookLog.push({
          displayName: null,
          primitive: "Unresolved",
          stackError: Error(),
          value: usable,
          debugInfo: void 0 === usable._debugInfo ? null : usable._debugInfo,
          dispatcherHookName: "Use"
        });
        throw SuspenseException;
      }

      if (usable.$$typeof === REACT_CONTEXT_TYPE) return fulfilledValue = readContext(usable), hookLog.push({
        displayName: usable.displayName || "Context",
        primitive: "Context (use)",
        stackError: Error(),
        value: fulfilledValue,
        debugInfo: null,
        dispatcherHookName: "Use"
      }), fulfilledValue;
    }

    throw Error("An unsupported type was passed to use(): " + String(usable));
  },
  readContext: readContext,
  useCacheRefresh: function useCacheRefresh() {
    var hook = nextHook();
    hookLog.push({
      displayName: null,
      primitive: "CacheRefresh",
      stackError: Error(),
      value: null !== hook ? hook.memoizedState : function () {},
      debugInfo: null,
      dispatcherHookName: "CacheRefresh"
    });
    return function () {};
  },
  useCallback: function useCallback(callback) {
    var hook = nextHook();
    hookLog.push({
      displayName: null,
      primitive: "Callback",
      stackError: Error(),
      value: null !== hook ? hook.memoizedState[0] : callback,
      debugInfo: null,
      dispatcherHookName: "Callback"
    });
    return callback;
  },
  useContext: function useContext(context) {
    var value = readContext(context);
    hookLog.push({
      displayName: context.displayName || null,
      primitive: "Context",
      stackError: Error(),
      value: value,
      debugInfo: null,
      dispatcherHookName: "Context"
    });
    return value;
  },
  useEffect: function useEffect(create) {
    nextHook();
    hookLog.push({
      displayName: null,
      primitive: "Effect",
      stackError: Error(),
      value: create,
      debugInfo: null,
      dispatcherHookName: "Effect"
    });
  },
  useImperativeHandle: function useImperativeHandle(ref) {
    nextHook();
    var instance = void 0;
    null !== ref && "object" === _typeof(ref) && (instance = ref.current);
    hookLog.push({
      displayName: null,
      primitive: "ImperativeHandle",
      stackError: Error(),
      value: instance,
      debugInfo: null,
      dispatcherHookName: "ImperativeHandle"
    });
  },
  useDebugValue: function useDebugValue(value, formatterFn) {
    hookLog.push({
      displayName: null,
      primitive: "DebugValue",
      stackError: Error(),
      value: "function" === typeof formatterFn ? formatterFn(value) : value,
      debugInfo: null,
      dispatcherHookName: "DebugValue"
    });
  },
  useLayoutEffect: function useLayoutEffect(create) {
    nextHook();
    hookLog.push({
      displayName: null,
      primitive: "LayoutEffect",
      stackError: Error(),
      value: create,
      debugInfo: null,
      dispatcherHookName: "LayoutEffect"
    });
  },
  useInsertionEffect: function useInsertionEffect(create) {
    nextHook();
    hookLog.push({
      displayName: null,
      primitive: "InsertionEffect",
      stackError: Error(),
      value: create,
      debugInfo: null,
      dispatcherHookName: "InsertionEffect"
    });
  },
  useMemo: function useMemo(nextCreate) {
    var hook = nextHook();
    nextCreate = null !== hook ? hook.memoizedState[0] : nextCreate();
    hookLog.push({
      displayName: null,
      primitive: "Memo",
      stackError: Error(),
      value: nextCreate,
      debugInfo: null,
      dispatcherHookName: "Memo"
    });
    return nextCreate;
  },
  useMemoCache: function useMemoCache(size) {
    var fiber = currentFiber;
    if (null == fiber) return [];
    var $jscomp$optchain$tmpm1596876077$0;
    fiber = null == ($jscomp$optchain$tmpm1596876077$0 = fiber.updateQueue) ? void 0 : $jscomp$optchain$tmpm1596876077$0.memoCache;
    if (null == fiber) return [];
    $jscomp$optchain$tmpm1596876077$0 = fiber.data[fiber.index];

    if (void 0 === $jscomp$optchain$tmpm1596876077$0) {
      $jscomp$optchain$tmpm1596876077$0 = fiber.data[fiber.index] = Array(size);

      for (var i = 0; i < size; i++) {
        $jscomp$optchain$tmpm1596876077$0[i] = REACT_MEMO_CACHE_SENTINEL;
      }
    }

    fiber.index++;
    return $jscomp$optchain$tmpm1596876077$0;
  },
  useOptimistic: function useOptimistic(passthrough) {
    var hook = nextHook();
    passthrough = null !== hook ? hook.memoizedState : passthrough;
    hookLog.push({
      displayName: null,
      primitive: "Optimistic",
      stackError: Error(),
      value: passthrough,
      debugInfo: null,
      dispatcherHookName: "Optimistic"
    });
    return [passthrough, function () {}];
  },
  useReducer: function useReducer(reducer, initialArg, init) {
    reducer = nextHook();
    initialArg = null !== reducer ? reducer.memoizedState : void 0 !== init ? init(initialArg) : initialArg;
    hookLog.push({
      displayName: null,
      primitive: "Reducer",
      stackError: Error(),
      value: initialArg,
      debugInfo: null,
      dispatcherHookName: "Reducer"
    });
    return [initialArg, function () {}];
  },
  useRef: function useRef(initialValue) {
    var hook = nextHook();
    initialValue = null !== hook ? hook.memoizedState : {
      current: initialValue
    };
    hookLog.push({
      displayName: null,
      primitive: "Ref",
      stackError: Error(),
      value: initialValue.current,
      debugInfo: null,
      dispatcherHookName: "Ref"
    });
    return initialValue;
  },
  useState: function useState(initialState) {
    var hook = nextHook();
    initialState = null !== hook ? hook.memoizedState : "function" === typeof initialState ? initialState() : initialState;
    hookLog.push({
      displayName: null,
      primitive: "State",
      stackError: Error(),
      value: initialState,
      debugInfo: null,
      dispatcherHookName: "State"
    });
    return [initialState, function () {}];
  },
  useTransition: function useTransition() {
    var stateHook = nextHook();
    nextHook();
    stateHook = null !== stateHook ? stateHook.memoizedState : !1;
    hookLog.push({
      displayName: null,
      primitive: "Transition",
      stackError: Error(),
      value: stateHook,
      debugInfo: null,
      dispatcherHookName: "Transition"
    });
    return [stateHook, function () {}];
  },
  useSyncExternalStore: function useSyncExternalStore(subscribe, getSnapshot) {
    nextHook();
    nextHook();
    subscribe = getSnapshot();
    hookLog.push({
      displayName: null,
      primitive: "SyncExternalStore",
      stackError: Error(),
      value: subscribe,
      debugInfo: null,
      dispatcherHookName: "SyncExternalStore"
    });
    return subscribe;
  },
  useDeferredValue: function useDeferredValue(value) {
    var hook = nextHook();
    value = null !== hook ? hook.memoizedState : value;
    hookLog.push({
      displayName: null,
      primitive: "DeferredValue",
      stackError: Error(),
      value: value,
      debugInfo: null,
      dispatcherHookName: "DeferredValue"
    });
    return value;
  },
  useId: function useId() {
    var hook = nextHook();
    hook = null !== hook ? hook.memoizedState : "";
    hookLog.push({
      displayName: null,
      primitive: "Id",
      stackError: Error(),
      value: hook,
      debugInfo: null,
      dispatcherHookName: "Id"
    });
    return hook;
  },
  useFormState: function useFormState(action, initialState) {
    var hook = nextHook();
    nextHook();
    nextHook();
    action = Error();
    var debugInfo = null,
        error = null;
    if (null !== hook) {
      if (initialState = hook.memoizedState, "object" === _typeof(initialState) && null !== initialState && "function" === typeof initialState.then) switch (initialState.status) {
        case "fulfilled":
          var value = initialState.value;
          debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo;
          break;

        case "rejected":
          error = initialState.reason;
          break;

        default:
          error = SuspenseException, debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo, value = initialState;
      } else value = initialState;
    } else value = initialState;
    hookLog.push({
      displayName: null,
      primitive: "FormState",
      stackError: action,
      value: value,
      debugInfo: debugInfo,
      dispatcherHookName: "FormState"
    });
    if (null !== error) throw error;
    return [value, function () {}, !1];
  },
  useActionState: function useActionState(action, initialState) {
    var hook = nextHook();
    nextHook();
    nextHook();
    action = Error();
    var debugInfo = null,
        error = null;
    if (null !== hook) {
      if (initialState = hook.memoizedState, "object" === _typeof(initialState) && null !== initialState && "function" === typeof initialState.then) switch (initialState.status) {
        case "fulfilled":
          var value = initialState.value;
          debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo;
          break;

        case "rejected":
          error = initialState.reason;
          break;

        default:
          error = SuspenseException, debugInfo = void 0 === initialState._debugInfo ? null : initialState._debugInfo, value = initialState;
      } else value = initialState;
    } else value = initialState;
    hookLog.push({
      displayName: null,
      primitive: "ActionState",
      stackError: action,
      value: value,
      debugInfo: debugInfo,
      dispatcherHookName: "ActionState"
    });
    if (null !== error) throw error;
    return [value, function () {}, !1];
  },
  useHostTransitionStatus: function useHostTransitionStatus() {
    var status = readContext({
      _currentValue: null
    });
    hookLog.push({
      displayName: null,
      primitive: "HostTransitionStatus",
      stackError: Error(),
      value: status,
      debugInfo: null,
      dispatcherHookName: "HostTransitionStatus"
    });
    return status;
  }
},
    DispatcherProxyHandler = {
  get: function get(target, prop) {
    if (target.hasOwnProperty(prop)) return target[prop];
    target = Error("Missing method in Dispatcher: " + prop);
    target.name = "ReactDebugToolsUnsupportedHookError";
    throw target;
  }
},
    DispatcherProxy = "undefined" === typeof Proxy ? Dispatcher : new Proxy(Dispatcher, DispatcherProxyHandler),
    mostLikelyAncestorIndex = 0;

function findSharedIndex(hookStack, rootStack, rootIndex) {
  var source = rootStack[rootIndex].source,
      i = 0;

  a: for (; i < hookStack.length; i++) {
    if (hookStack[i].source === source) {
      for (var a = rootIndex + 1, b = i + 1; a < rootStack.length && b < hookStack.length; a++, b++) {
        if (hookStack[b].source !== rootStack[a].source) continue a;
      }

      return i;
    }
  }

  return -1;
}

function isReactWrapper(functionName, wrapperName) {
  functionName = parseHookName(functionName);
  return "HostTransitionStatus" === wrapperName ? functionName === wrapperName || "FormStatus" === functionName : functionName === wrapperName;
}

function parseHookName(functionName) {
  if (!functionName) return "";
  var startIndex = functionName.lastIndexOf("[as ");
  if (-1 !== startIndex) return parseHookName(functionName.slice(startIndex + 4, -1));
  startIndex = functionName.lastIndexOf(".");
  startIndex = -1 === startIndex ? 0 : startIndex + 1;

  if ("use" === functionName.slice(startIndex, startIndex + 3)) {
    if (3 === functionName.length - startIndex) return "Use";
    startIndex += 3;
  }

  return functionName.slice(startIndex);
}

function buildTree(rootStack$jscomp$0, readHookLog) {
  for (var rootChildren = [], prevStack = null, levelChildren = rootChildren, nativeHookID = 0, stackOfChildren = [], i = 0; i < readHookLog.length; i++) {
    var hook = readHookLog[i];
    var rootStack = rootStack$jscomp$0;
    var JSCompiler_inline_result = ErrorStackParser.parse(hook.stackError);

    b: {
      var hookStack = JSCompiler_inline_result,
          rootIndex = findSharedIndex(hookStack, rootStack, mostLikelyAncestorIndex);
      if (-1 !== rootIndex) rootStack = rootIndex;else {
        for (var i$jscomp$0 = 0; i$jscomp$0 < rootStack.length && 5 > i$jscomp$0; i$jscomp$0++) {
          if (rootIndex = findSharedIndex(hookStack, rootStack, i$jscomp$0), -1 !== rootIndex) {
            mostLikelyAncestorIndex = i$jscomp$0;
            rootStack = rootIndex;
            break b;
          }
        }

        rootStack = -1;
      }
    }

    b: {
      hookStack = JSCompiler_inline_result;
      rootIndex = getPrimitiveStackCache().get(hook.primitive);
      if (void 0 !== rootIndex) for (i$jscomp$0 = 0; i$jscomp$0 < rootIndex.length && i$jscomp$0 < hookStack.length; i$jscomp$0++) {
        if (rootIndex[i$jscomp$0].source !== hookStack[i$jscomp$0].source) {
          i$jscomp$0 < hookStack.length - 1 && isReactWrapper(hookStack[i$jscomp$0].functionName, hook.dispatcherHookName) && i$jscomp$0++;
          i$jscomp$0 < hookStack.length - 1 && isReactWrapper(hookStack[i$jscomp$0].functionName, hook.dispatcherHookName) && i$jscomp$0++;
          hookStack = i$jscomp$0;
          break b;
        }
      }
      hookStack = -1;
    }

    JSCompiler_inline_result = -1 === rootStack || -1 === hookStack || 2 > rootStack - hookStack ? -1 === hookStack ? [null, null] : [JSCompiler_inline_result[hookStack - 1], null] : [JSCompiler_inline_result[hookStack - 1], JSCompiler_inline_result.slice(hookStack, rootStack - 1)];
    hookStack = JSCompiler_inline_result[0];
    JSCompiler_inline_result = JSCompiler_inline_result[1];
    rootStack = hook.displayName;
    null === rootStack && null !== hookStack && (rootStack = parseHookName(hookStack.functionName) || parseHookName(hook.dispatcherHookName));

    if (null !== JSCompiler_inline_result) {
      hookStack = 0;

      if (null !== prevStack) {
        for (; hookStack < JSCompiler_inline_result.length && hookStack < prevStack.length && JSCompiler_inline_result[JSCompiler_inline_result.length - hookStack - 1].source === prevStack[prevStack.length - hookStack - 1].source;) {
          hookStack++;
        }

        for (prevStack = prevStack.length - 1; prevStack > hookStack; prevStack--) {
          levelChildren = stackOfChildren.pop();
        }
      }

      for (prevStack = JSCompiler_inline_result.length - hookStack - 1; 1 <= prevStack; prevStack--) {
        hookStack = [], rootIndex = JSCompiler_inline_result[prevStack], rootIndex = {
          id: null,
          isStateEditable: !1,
          name: parseHookName(JSCompiler_inline_result[prevStack - 1].functionName),
          value: void 0,
          subHooks: hookStack,
          debugInfo: null,
          hookSource: {
            lineNumber: rootIndex.lineNumber,
            columnNumber: rootIndex.columnNumber,
            functionName: rootIndex.functionName,
            fileName: rootIndex.fileName
          }
        }, levelChildren.push(rootIndex), stackOfChildren.push(levelChildren), levelChildren = hookStack;
      }

      prevStack = JSCompiler_inline_result;
    }

    hookStack = hook.primitive;
    rootIndex = hook.debugInfo;
    hook = {
      id: "Context" === hookStack || "Context (use)" === hookStack || "DebugValue" === hookStack || "Promise" === hookStack || "Unresolved" === hookStack || "HostTransitionStatus" === hookStack ? null : nativeHookID++,
      isStateEditable: "Reducer" === hookStack || "State" === hookStack,
      name: rootStack || hookStack,
      value: hook.value,
      subHooks: [],
      debugInfo: rootIndex,
      hookSource: null
    };
    rootStack = {
      lineNumber: null,
      functionName: null,
      fileName: null,
      columnNumber: null
    };
    JSCompiler_inline_result && 1 <= JSCompiler_inline_result.length && (JSCompiler_inline_result = JSCompiler_inline_result[0], rootStack.lineNumber = JSCompiler_inline_result.lineNumber, rootStack.functionName = JSCompiler_inline_result.functionName, rootStack.fileName = JSCompiler_inline_result.fileName, rootStack.columnNumber = JSCompiler_inline_result.columnNumber);
    hook.hookSource = rootStack;
    levelChildren.push(hook);
  }

  processDebugValues(rootChildren, null);
  return rootChildren;
}

function processDebugValues(hooksTree, parentHooksNode) {
  for (var debugValueHooksNodes = [], i = 0; i < hooksTree.length; i++) {
    var hooksNode = hooksTree[i];
    "DebugValue" === hooksNode.name && 0 === hooksNode.subHooks.length ? (hooksTree.splice(i, 1), i--, debugValueHooksNodes.push(hooksNode)) : processDebugValues(hooksNode.subHooks, hooksNode);
  }

  null !== parentHooksNode && (1 === debugValueHooksNodes.length ? parentHooksNode.value = debugValueHooksNodes[0].value : 1 < debugValueHooksNodes.length && (parentHooksNode.value = debugValueHooksNodes.map(function (_ref) {
    return _ref.value;
  })));
}

function handleRenderFunctionError(error) {
  if (error !== SuspenseException) {
    if (error instanceof Error && "ReactDebugToolsUnsupportedHookError" === error.name) throw error;
    var wrapperError = Error("Error rendering inspected component", {
      cause: error
    });
    wrapperError.name = "ReactDebugToolsRenderError";
    wrapperError.cause = error;
    throw wrapperError;
  }
}

function inspectHooks(renderFunction, props, currentDispatcher) {
  null == currentDispatcher && (currentDispatcher = ReactSharedInternals);
  var previousDispatcher = currentDispatcher.H;
  currentDispatcher.H = DispatcherProxy;

  try {
    var ancestorStackError = Error();
    renderFunction(props);
  } catch (error) {
    handleRenderFunctionError(error);
  } finally {
    renderFunction = hookLog, hookLog = [], currentDispatcher.H = previousDispatcher;
  }

  currentDispatcher = ErrorStackParser.parse(ancestorStackError);
  return buildTree(currentDispatcher, renderFunction);
}

function restoreContexts(contextMap) {
  contextMap.forEach(function (value, context) {
    return context._currentValue = value;
  });
}

__webpack_unused_export__ = inspectHooks;

__webpack_unused_export__ = function (fiber, currentDispatcher) {
  null == currentDispatcher && (currentDispatcher = ReactSharedInternals);
  if (0 !== fiber.tag && 15 !== fiber.tag && 11 !== fiber.tag) throw Error("Unknown Fiber. Needs to be a function component to inspect hooks.");
  getPrimitiveStackCache();
  currentHook = fiber.memoizedState;
  currentFiber = fiber;

  if (hasOwnProperty.call(currentFiber, "dependencies")) {
    var dependencies = currentFiber.dependencies;
    currentContextDependency = null !== dependencies ? dependencies.firstContext : null;
  } else if (hasOwnProperty.call(currentFiber, "dependencies_old")) dependencies = currentFiber.dependencies_old, currentContextDependency = null !== dependencies ? dependencies.firstContext : null;else if (hasOwnProperty.call(currentFiber, "dependencies_new")) dependencies = currentFiber.dependencies_new, currentContextDependency = null !== dependencies ? dependencies.firstContext : null;else if (hasOwnProperty.call(currentFiber, "contextDependencies")) dependencies = currentFiber.contextDependencies, currentContextDependency = null !== dependencies ? dependencies.first : null;else throw Error("Unsupported React version. This is a bug in React Debug Tools.");

  dependencies = fiber.type;
  var props = fiber.memoizedProps;

  if (dependencies !== fiber.elementType && dependencies && dependencies.defaultProps) {
    props = assign({}, props);
    var defaultProps = dependencies.defaultProps;

    for (propName in defaultProps) {
      void 0 === props[propName] && (props[propName] = defaultProps[propName]);
    }
  }

  var propName = new Map();

  try {
    if (null !== currentContextDependency && !hasOwnProperty.call(currentContextDependency, "memoizedValue")) for (defaultProps = fiber; defaultProps;) {
      if (10 === defaultProps.tag) {
        var context = defaultProps.type;
        void 0 !== context._context && (context = context._context);
        propName.has(context) || (propName.set(context, context._currentValue), context._currentValue = defaultProps.memoizedProps.value);
      }

      defaultProps = defaultProps.return;
    }

    if (11 === fiber.tag) {
      var renderFunction = dependencies.render;
      context = props;
      var ref = fiber.ref;
      fiber = currentDispatcher;
      var previousDispatcher = fiber.H;
      fiber.H = DispatcherProxy;

      try {
        var ancestorStackError = Error();
        renderFunction(context, ref);
      } catch (error) {
        handleRenderFunctionError(error);
      } finally {
        var readHookLog = hookLog;
        hookLog = [];
        fiber.H = previousDispatcher;
      }

      var rootStack = ErrorStackParser.parse(ancestorStackError);
      return buildTree(rootStack, readHookLog);
    }

    return inspectHooks(dependencies, props, currentDispatcher);
  } finally {
    currentContextDependency = currentHook = currentFiber = null, restoreContexts(propName);
  }
};

/***/ }),

/***/ 987:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  /* unused reexport */ __webpack_require__(786);
} else {}

/***/ }),

/***/ 126:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(169);
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"),
    REACT_PORTAL_TYPE = Symbol.for("react.portal"),
    REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"),
    REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"),
    REACT_PROFILER_TYPE = Symbol.for("react.profiler"),
    REACT_CONSUMER_TYPE = Symbol.for("react.consumer"),
    REACT_CONTEXT_TYPE = Symbol.for("react.context"),
    REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"),
    REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"),
    REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"),
    REACT_MEMO_TYPE = Symbol.for("react.memo"),
    REACT_LAZY_TYPE = Symbol.for("react.lazy"),
    REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode"),
    REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"),
    REACT_POSTPONE_TYPE = Symbol.for("react.postpone"),
    MAYBE_ITERATOR_SYMBOL = Symbol.iterator;

function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== _typeof(maybeIterable)) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}

var ReactNoopUpdateQueue = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    assign = Object.assign,
    emptyObject = {};

function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function (partialState, callback) {
  if ("object" !== _typeof(partialState) && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = !0;
var isArrayImpl = Array.isArray,
    ReactSharedInternals = {
  H: null,
  A: null,
  T: null,
  S: null
},
    hasOwnProperty = Object.prototype.hasOwnProperty;

function ReactElement(type, key, _ref, self, source, owner, props) {
  _ref = props.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key,
    ref: void 0 !== _ref ? _ref : null,
    props: props
  };
}

function cloneAndReplaceKey(oldElement, newKey) {
  return ReactElement(oldElement.type, newKey, null, void 0, void 0, void 0, oldElement.props);
}

function isValidElement(object) {
  return "object" === _typeof(object) && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
}

function escape(key) {
  var escaperLookup = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + key.replace(/[=:]/g, function (match) {
    return escaperLookup[match];
  });
}

var userProvidedKeyEscapeRegex = /\/+/g;

function getElementKey(element, index) {
  return "object" === _typeof(element) && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
}

function noop$1() {}

function resolveThenable(thenable) {
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;

    case "rejected":
      throw thenable.reason;

    default:
      switch ("string" === typeof thenable.status ? thenable.then(noop$1, noop$1) : (thenable.status = "pending", thenable.then(function (fulfilledValue) {
        "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
      }, function (error) {
        "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
      })), thenable.status) {
        case "fulfilled":
          return thenable.value;

        case "rejected":
          throw thenable.reason;
      }

  }

  throw thenable;
}

function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
  var type = _typeof(children);

  if ("undefined" === type || "boolean" === type) children = null;
  var invokeCallback = !1;
  if (null === children) invokeCallback = !0;else switch (type) {
    case "bigint":
    case "string":
    case "number":
      invokeCallback = !0;
      break;

    case "object":
      switch (children.$$typeof) {
        case REACT_ELEMENT_TYPE:
        case REACT_PORTAL_TYPE:
          invokeCallback = !0;
          break;

        case REACT_LAZY_TYPE:
          return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
      }

  }
  if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function (c) {
    return c;
  })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
  invokeCallback = 0;
  var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
  if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) {
    nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
  } else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) {
    nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
  } else if ("object" === type) {
    if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
    array = String(children);
    throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
  }
  return invokeCallback;
}

function mapChildren(children, func, context) {
  if (null == children) return children;
  var result = [],
      count = 0;
  mapIntoArray(children, result, "", "", function (child) {
    return func.call(context, child, count++);
  });
  return result;
}

function lazyInitializer(payload) {
  if (-1 === payload._status) {
    var ctor = payload._result;
    ctor = ctor();
    ctor.then(function (moduleObject) {
      if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
    }, function (error) {
      if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
    });
    -1 === payload._status && (payload._status = 0, payload._result = ctor);
  }

  if (1 === payload._status) return payload._result.default;
  throw payload._result;
}

function useOptimistic(passthrough, reducer) {
  return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
}

var reportGlobalError = "function" === typeof reportError ? reportError : function (error) {
  if ("object" === (typeof window === "undefined" ? "undefined" : _typeof(window)) && "function" === typeof window.ErrorEvent) {
    var event = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: "object" === _typeof(error) && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
      error: error
    });
    if (!window.dispatchEvent(event)) return;
  } else if ("object" === (typeof process === "undefined" ? "undefined" : _typeof(process)) && "function" === typeof process.emit) {
    process.emit("uncaughtException", error);
    return;
  }

  console.error(error);
};

function noop() {}

exports.Children = {
  map: mapChildren,
  forEach: function forEach(children, forEachFunc, forEachContext) {
    mapChildren(children, function () {
      forEachFunc.apply(this, arguments);
    }, forEachContext);
  },
  count: function count(children) {
    var n = 0;
    mapChildren(children, function () {
      n++;
    });
    return n;
  },
  toArray: function toArray(children) {
    return mapChildren(children, function (child) {
      return child;
    }) || [];
  },
  only: function only(children) {
    if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
    return children;
  }
};
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;

exports.act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};

exports.cache = function (fn) {
  return function () {
    return fn.apply(null, arguments);
  };
};

exports.cloneElement = function (element, config, children) {
  if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
  var props = assign({}, element.props),
      key = element.key,
      owner = void 0;
  if (null != config) for (propName in void 0 !== config.ref && (owner = void 0), void 0 !== config.key && (key = "" + config.key), config) {
    !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
  }
  var propName = arguments.length - 2;
  if (1 === propName) props.children = children;else if (1 < propName) {
    for (var childArray = Array(propName), i = 0; i < propName; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }
  return ReactElement(element.type, key, null, void 0, void 0, owner, props);
};

exports.createContext = function (defaultValue) {
  defaultValue = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  defaultValue.Provider = defaultValue;
  defaultValue.Consumer = {
    $$typeof: REACT_CONSUMER_TYPE,
    _context: defaultValue
  };
  return defaultValue;
};

exports.createElement = function (type, config, children) {
  var propName,
      props = {},
      key = null;
  if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) {
    hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
  }
  var childrenLength = arguments.length - 2;
  if (1 === childrenLength) props.children = children;else if (1 < childrenLength) {
    for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }
  if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) {
    void 0 === props[propName] && (props[propName] = childrenLength[propName]);
  }
  return ReactElement(type, key, null, void 0, void 0, null, props);
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.experimental_useEffectEvent = function (callback) {
  return ReactSharedInternals.H.useEffectEvent(callback);
};

exports.experimental_useOptimistic = function (passthrough, reducer) {
  return useOptimistic(passthrough, reducer);
};

exports.forwardRef = function (render) {
  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
};

exports.isValidElement = isValidElement;

exports.lazy = function (ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _payload: {
      _status: -1,
      _result: ctor
    },
    _init: lazyInitializer
  };
};

exports.memo = function (type, compare) {
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: void 0 === compare ? null : compare
  };
};

exports.startTransition = function (scope) {
  var prevTransition = ReactSharedInternals.T,
      transition = {};
  ReactSharedInternals.T = transition;

  try {
    var returnValue = scope(),
        onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish && onStartTransitionFinish(transition, returnValue);
    "object" === _typeof(returnValue) && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
  } catch (error) {
    reportGlobalError(error);
  } finally {
    ReactSharedInternals.T = prevTransition;
  }
};

exports.unstable_Activity = REACT_OFFSCREEN_TYPE;
exports.unstable_DebugTracingMode = REACT_DEBUG_TRACING_MODE_TYPE;
exports.unstable_SuspenseList = REACT_SUSPENSE_LIST_TYPE;

exports.unstable_getCacheForType = function (resourceType) {
  var dispatcher = ReactSharedInternals.A;
  return dispatcher ? dispatcher.getCacheForType(resourceType) : resourceType();
};

exports.unstable_postpone = function (reason) {
  reason = Error(reason);
  reason.$$typeof = REACT_POSTPONE_TYPE;
  throw reason;
};

exports.unstable_useCacheRefresh = function () {
  return ReactSharedInternals.H.useCacheRefresh();
};

exports.use = function (usable) {
  return ReactSharedInternals.H.use(usable);
};

exports.useActionState = function (action, initialState, permalink) {
  return ReactSharedInternals.H.useActionState(action, initialState, permalink);
};

exports.useCallback = function (callback, deps) {
  return ReactSharedInternals.H.useCallback(callback, deps);
};

exports.useContext = function (Context) {
  return ReactSharedInternals.H.useContext(Context);
};

exports.useDebugValue = function () {};

exports.useDeferredValue = function (value, initialValue) {
  return ReactSharedInternals.H.useDeferredValue(value, initialValue);
};

exports.useEffect = function (create, deps) {
  return ReactSharedInternals.H.useEffect(create, deps);
};

exports.useId = function () {
  return ReactSharedInternals.H.useId();
};

exports.useImperativeHandle = function (ref, create, deps) {
  return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
};

exports.useInsertionEffect = function (create, deps) {
  return ReactSharedInternals.H.useInsertionEffect(create, deps);
};

exports.useLayoutEffect = function (create, deps) {
  return ReactSharedInternals.H.useLayoutEffect(create, deps);
};

exports.useMemo = function (create, deps) {
  return ReactSharedInternals.H.useMemo(create, deps);
};

exports.useOptimistic = useOptimistic;

exports.useReducer = function (reducer, initialArg, init) {
  return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
};

exports.useRef = function (initialValue) {
  return ReactSharedInternals.H.useRef(initialValue);
};

exports.useState = function (initialState) {
  return ReactSharedInternals.H.useState(initialState);
};

exports.useSyncExternalStore = function (subscribe, getSnapshot, getServerSnapshot) {
  return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};

exports.useTransition = function () {
  return ReactSharedInternals.H.useTransition();
};

exports.version = "19.0.0-experimental-20b6f4c-20240607";

/***/ }),

/***/ 675:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(126);
} else {}

/***/ }),

/***/ 242:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n4": () => (/* binding */ compareVersions)
/* harmony export */ });
/* unused harmony exports validate, compare, satisfies */
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */
var compareVersions = function compareVersions(v1, v2) {
  // validate input and split into segments
  var n1 = validateAndParse(v1);
  var n2 = validateAndParse(v2); // pop off the patch

  var p1 = n1.pop();
  var p2 = n2.pop(); // validate numbers

  var r = compareSegments(n1, n2);
  if (r !== 0) return r; // validate pre-release

  if (p1 && p2) {
    return compareSegments(p1.split('.'), p2.split('.'));
  } else if (p1 || p2) {
    return p1 ? -1 : 1;
  }

  return 0;
};
/**
 * Validate [semver](https://semver.org/) version strings.
 *
 * @param version Version number to validate
 * @returns `true` if the version number is a valid semver version number, `false` otherwise.
 *
 * @example
 * ```
 * validate('1.0.0-rc.1'); // return true
 * validate('1.0-rc.1'); // return false
 * validate('foo'); // return false
 * ```
 */

var validate = function validate(version) {
  return typeof version === 'string' && /^[v\d]/.test(version) && semver.test(version);
};
/**
 * Compare [semver](https://semver.org/) version strings using the specified operator.
 *
 * @param v1 First version to compare
 * @param v2 Second version to compare
 * @param operator Allowed arithmetic operator to use
 * @returns `true` if the comparison between the firstVersion and the secondVersion satisfies the operator, `false` otherwise.
 *
 * @example
 * ```
 * compare('10.1.8', '10.0.4', '>'); // return true
 * compare('10.0.1', '10.0.1', '='); // return true
 * compare('10.1.1', '10.2.2', '<'); // return true
 * compare('10.1.1', '10.2.2', '<='); // return true
 * compare('10.1.1', '10.2.2', '>='); // return false
 * ```
 */

var compare = function compare(v1, v2, operator) {
  // validate input operator
  assertValidOperator(operator); // since result of compareVersions can only be -1 or 0 or 1
  // a simple map can be used to replace switch

  var res = compareVersions(v1, v2);
  return operatorResMap[operator].includes(res);
};
/**
 * Match [npm semver](https://docs.npmjs.com/cli/v6/using-npm/semver) version range.
 *
 * @param version Version number to match
 * @param range Range pattern for version
 * @returns `true` if the version number is within the range, `false` otherwise.
 *
 * @example
 * ```
 * satisfies('1.1.0', '^1.0.0'); // return true
 * satisfies('1.1.0', '~1.0.0'); // return false
 * ```
 */

var satisfies = function satisfies(version, range) {
  // if no range operator then "="
  var m = range.match(/^([<>=~^]+)/);
  var op = m ? m[1] : '='; // if gt/lt/eq then operator compare

  if (op !== '^' && op !== '~') return compare(version, range, op); // else range of either "~" or "^" is assumed

  var _validateAndParse = validateAndParse(version),
      _validateAndParse2 = _slicedToArray(_validateAndParse, 5),
      v1 = _validateAndParse2[0],
      v2 = _validateAndParse2[1],
      v3 = _validateAndParse2[2],
      vp = _validateAndParse2[4];

  var _validateAndParse3 = validateAndParse(range),
      _validateAndParse4 = _slicedToArray(_validateAndParse3, 5),
      r1 = _validateAndParse4[0],
      r2 = _validateAndParse4[1],
      r3 = _validateAndParse4[2],
      rp = _validateAndParse4[4];

  var v = [v1, v2, v3];
  var r = [r1, r2 !== null && r2 !== void 0 ? r2 : 'x', r3 !== null && r3 !== void 0 ? r3 : 'x']; // validate pre-release

  if (rp) {
    if (!vp) return false;
    if (compareSegments(v, r) !== 0) return false;
    if (compareSegments(vp.split('.'), rp.split('.')) === -1) return false;
  } // first non-zero number


  var nonZero = r.findIndex(function (v) {
    return v !== '0';
  }) + 1; // pointer to where segments can be >=

  var i = op === '~' ? 2 : nonZero > 1 ? nonZero : 1; // before pointer must be equal

  if (compareSegments(v.slice(0, i), r.slice(0, i)) !== 0) return false; // after pointer must be >=

  if (compareSegments(v.slice(i), r.slice(i)) === -1) return false;
  return true;
};
var semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;

var validateAndParse = function validateAndParse(version) {
  if (typeof version !== 'string') {
    throw new TypeError('Invalid argument expected string');
  }

  var match = version.match(semver);

  if (!match) {
    throw new Error("Invalid argument not valid semver ('".concat(version, "' received)"));
  }

  match.shift();
  return match;
};

var isWildcard = function isWildcard(s) {
  return s === '*' || s === 'x' || s === 'X';
};

var tryParse = function tryParse(v) {
  var n = parseInt(v, 10);
  return isNaN(n) ? v : n;
};

var forceType = function forceType(a, b) {
  return _typeof(a) !== _typeof(b) ? [String(a), String(b)] : [a, b];
};

var compareStrings = function compareStrings(a, b) {
  if (isWildcard(a) || isWildcard(b)) return 0;

  var _forceType = forceType(tryParse(a), tryParse(b)),
      _forceType2 = _slicedToArray(_forceType, 2),
      ap = _forceType2[0],
      bp = _forceType2[1];

  if (ap > bp) return 1;
  if (ap < bp) return -1;
  return 0;
};

var compareSegments = function compareSegments(a, b) {
  for (var i = 0; i < Math.max(a.length, b.length); i++) {
    var r = compareStrings(a[i] || '0', b[i] || '0');
    if (r !== 0) return r;
  }

  return 0;
};

var operatorResMap = {
  '>': [1],
  '>=': [0, 1],
  '=': [0],
  '<=': [-1, 0],
  '<': [-1]
};
var allowedOperators = Object.keys(operatorResMap);

var assertValidOperator = function assertValidOperator(op) {
  if (typeof op !== 'string') {
    throw new TypeError("Invalid operator type, expected string but got ".concat(_typeof(op)));
  }

  if (allowedOperators.indexOf(op) === -1) {
    throw new Error("Invalid operator, expected one of ".concat(allowedOperators.join('|')));
  }
};

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  'use strict'; // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(430)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function ErrorStackParser(StackFrame) {
  'use strict';

  var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
  var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
  var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
  return {
    /**
     * Given an Error object, extract the most information from it.
     *
     * @param {Error} error object
     * @return {Array} of StackFrames
     */
    parse: function ErrorStackParser$$parse(error) {
      if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
        return this.parseOpera(error);
      } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
        return this.parseV8OrIE(error);
      } else if (error.stack) {
        return this.parseFFOrSafari(error);
      } else {
        throw new Error('Cannot parse given Error object');
      }
    },
    // Separate line and column numbers from a string of the form: (URI:Line:Column)
    extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
      // Fail-fast but return locations like "(native)"
      if (urlLike.indexOf(':') === -1) {
        return [urlLike];
      }

      var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
      var parts = regExp.exec(urlLike.replace(/[()]/g, ''));
      return [parts[1], parts[2] || undefined, parts[3] || undefined];
    },
    parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(CHROME_IE_STACK_REGEXP);
      }, this);
      return filtered.map(function (line) {
        if (line.indexOf('(eval ') > -1) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(\),.*$)/g, '');
        }

        var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '('); // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
        // case it has spaces in it, as the string is split on \s+ later on

        var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/); // remove the parenthesized location from the line, if it was matched

        sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
        var tokens = sanitizedLine.split(/\s+/).slice(1); // if a location was matched, pass it to extractLocation() otherwise pop the last token

        var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
        var functionName = tokens.join(' ') || undefined;
        var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
        return new StackFrame({
          functionName: functionName,
          fileName: fileName,
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }, this);
    },
    parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !line.match(SAFARI_NATIVE_CODE_REGEXP);
      }, this);
      return filtered.map(function (line) {
        // Throw away eval information until we implement stacktrace.js/stackframe#8
        if (line.indexOf(' > eval') > -1) {
          line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
        }

        if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
          // Safari eval frames only have function names and nothing else
          return new StackFrame({
            functionName: line
          });
        } else {
          var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
          var matches = line.match(functionNameRegex);
          var functionName = matches && matches[1] ? matches[1] : undefined;
          var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
          return new StackFrame({
            functionName: functionName,
            fileName: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }
      }, this);
    },
    parseOpera: function ErrorStackParser$$parseOpera(e) {
      if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
        return this.parseOpera9(e);
      } else if (!e.stack) {
        return this.parseOpera10(e);
      } else {
        return this.parseOpera11(e);
      }
    },
    parseOpera9: function ErrorStackParser$$parseOpera9(e) {
      var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
      var lines = e.message.split('\n');
      var result = [];

      for (var i = 2, len = lines.length; i < len; i += 2) {
        var match = lineRE.exec(lines[i]);

        if (match) {
          result.push(new StackFrame({
            fileName: match[2],
            lineNumber: match[1],
            source: lines[i]
          }));
        }
      }

      return result;
    },
    parseOpera10: function ErrorStackParser$$parseOpera10(e) {
      var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
      var lines = e.stacktrace.split('\n');
      var result = [];

      for (var i = 0, len = lines.length; i < len; i += 2) {
        var match = lineRE.exec(lines[i]);

        if (match) {
          result.push(new StackFrame({
            functionName: match[3] || undefined,
            fileName: match[2],
            lineNumber: match[1],
            source: lines[i]
          }));
        }
      }

      return result;
    },
    // Opera 10.65+ Error.stack very similar to FF/Safari
    parseOpera11: function ErrorStackParser$$parseOpera11(error) {
      var filtered = error.stack.split('\n').filter(function (line) {
        return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
      }, this);
      return filtered.map(function (line) {
        var tokens = line.split('@');
        var locationParts = this.extractLocation(tokens.pop());
        var functionCall = tokens.shift() || '';
        var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^)]*\)/g, '') || undefined;
        var argsRaw;

        if (functionCall.match(/\(([^)]*)\)/)) {
          argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1');
        }

        var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
        return new StackFrame({
          functionName: functionName,
          args: args,
          fileName: locationParts[0],
          lineNumber: locationParts[1],
          columnNumber: locationParts[2],
          source: line
        });
      }, this);
    }
  };
});

/***/ }),

/***/ 730:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(169);


module.exports = LRUCache; // This will be a proper iterable 'Map' in engines that support it,
// or a fakey-fake PseudoMap in older versions.

var Map = __webpack_require__(307);

var util = __webpack_require__(82); // A linked list to keep track of recently-used-ness


var Yallist = __webpack_require__(695); // use symbols if possible, otherwise just _props


var hasSymbol = typeof Symbol === 'function' && process.env._nodeLRUCacheForceNoSymbol !== '1';
var makeSymbol;

if (hasSymbol) {
  makeSymbol = function makeSymbol(key) {
    return Symbol(key);
  };
} else {
  makeSymbol = function makeSymbol(key) {
    return '_' + key;
  };
}

var MAX = makeSymbol('max');
var LENGTH = makeSymbol('length');
var LENGTH_CALCULATOR = makeSymbol('lengthCalculator');
var ALLOW_STALE = makeSymbol('allowStale');
var MAX_AGE = makeSymbol('maxAge');
var DISPOSE = makeSymbol('dispose');
var NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet');
var LRU_LIST = makeSymbol('lruList');
var CACHE = makeSymbol('cache');

function naiveLength() {
  return 1;
} // lruList is a yallist where the head is the youngest
// item, and the tail is the oldest.  the list contains the Hit
// objects as the entries.
// Each Hit object has a reference to its Yallist.Node.  This
// never changes.
//
// cache is a Map (or PseudoMap) that matches the keys to
// the Yallist.Node object.


function LRUCache(options) {
  if (!(this instanceof LRUCache)) {
    return new LRUCache(options);
  }

  if (typeof options === 'number') {
    options = {
      max: options
    };
  }

  if (!options) {
    options = {};
  }

  var max = this[MAX] = options.max; // Kind of weird to have a default max of Infinity, but oh well.

  if (!max || !(typeof max === 'number') || max <= 0) {
    this[MAX] = Infinity;
  }

  var lc = options.length || naiveLength;

  if (typeof lc !== 'function') {
    lc = naiveLength;
  }

  this[LENGTH_CALCULATOR] = lc;
  this[ALLOW_STALE] = options.stale || false;
  this[MAX_AGE] = options.maxAge || 0;
  this[DISPOSE] = options.dispose;
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
  this.reset();
} // resize the cache when the max changes.


Object.defineProperty(LRUCache.prototype, 'max', {
  set: function set(mL) {
    if (!mL || !(typeof mL === 'number') || mL <= 0) {
      mL = Infinity;
    }

    this[MAX] = mL;
    trim(this);
  },
  get: function get() {
    return this[MAX];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function set(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  },
  get: function get() {
    return this[ALLOW_STALE];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function set(mA) {
    if (!mA || !(typeof mA === 'number') || mA < 0) {
      mA = 0;
    }

    this[MAX_AGE] = mA;
    trim(this);
  },
  get: function get() {
    return this[MAX_AGE];
  },
  enumerable: true
}); // resize the cache when the lengthCalculator changes.

Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function set(lC) {
    if (typeof lC !== 'function') {
      lC = naiveLength;
    }

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      }, this);
    }

    trim(this);
  },
  get: function get() {
    return this[LENGTH_CALCULATOR];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'length', {
  get: function get() {
    return this[LENGTH];
  },
  enumerable: true
});
Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function get() {
    return this[LRU_LIST].length;
  },
  enumerable: true
});

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].tail; walker !== null;) {
    var prev = walker.prev;
    forEachStep(this, fn, walker, thisp);
    walker = prev;
  }
};

function forEachStep(self, fn, node, thisp) {
  var hit = node.value;

  if (isStale(self, hit)) {
    del(self, node);

    if (!self[ALLOW_STALE]) {
      hit = undefined;
    }
  }

  if (hit) {
    fn.call(thisp, hit.value, hit.key, self);
  }
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this[LRU_LIST].head; walker !== null;) {
    var next = walker.next;
    forEachStep(this, fn, walker, thisp);
    walker = next;
  }
};

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.key;
  }, this);
};

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map(function (k) {
    return k.value;
  }, this);
};

LRUCache.prototype.reset = function () {
  if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value);
    }, this);
  }

  this[CACHE] = new Map(); // hash of items by key

  this[LRU_LIST] = new Yallist(); // list of items in order of use recency

  this[LENGTH] = 0; // length of items in the list
};

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit)) {
      return {
        k: hit.key,
        v: hit.value,
        e: hit.now + (hit.maxAge || 0)
      };
    }
  }, this).toArray().filter(function (h) {
    return h;
  });
};

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST];
};
/* istanbul ignore next */


LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {';
  var extras = false;
  var as = this[ALLOW_STALE];

  if (as) {
    str += '\n  allowStale: true';
    extras = true;
  }

  var max = this[MAX];

  if (max && max !== Infinity) {
    if (extras) {
      str += ',';
    }

    str += '\n  max: ' + util.inspect(max, opts);
    extras = true;
  }

  var maxAge = this[MAX_AGE];

  if (maxAge) {
    if (extras) {
      str += ',';
    }

    str += '\n  maxAge: ' + util.inspect(maxAge, opts);
    extras = true;
  }

  var lc = this[LENGTH_CALCULATOR];

  if (lc && lc !== naiveLength) {
    if (extras) {
      str += ',';
    }

    str += '\n  length: ' + util.inspect(this[LENGTH], opts);
    extras = true;
  }

  var didFirst = false;
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) {
      str += ',\n  ';
    } else {
      if (extras) {
        str += ',\n';
      }

      didFirst = true;
      str += '\n  ';
    }

    var key = util.inspect(item.key).split('\n').join('\n  ');
    var val = {
      value: item.value
    };

    if (item.maxAge !== maxAge) {
      val.maxAge = item.maxAge;
    }

    if (lc !== naiveLength) {
      val.length = item.length;
    }

    if (isStale(this, item)) {
      val.stale = true;
    }

    val = util.inspect(val, opts).split('\n').join('\n  ');
    str += key + ' => ' + val;
  });

  if (didFirst || extras) {
    str += '\n';
  }

  str += '}';
  return str;
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE];
  var now = maxAge ? Date.now() : 0;
  var len = this[LENGTH_CALCULATOR](value, key);

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key));
      return false;
    }

    var node = this[CACHE].get(key);
    var item = node.value; // dispose of the old one before overwriting
    // split out into 2 ifs for better coverage tracking

    if (this[DISPOSE]) {
      if (!this[NO_DISPOSE_ON_SET]) {
        this[DISPOSE](key, item.value);
      }
    }

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    this[LENGTH] += len - item.length;
    item.length = len;
    this.get(key);
    trim(this);
    return true;
  }

  var hit = new Entry(key, value, len, now, maxAge); // oversized objects fall out of cache automatically.

  if (hit.length > this[MAX]) {
    if (this[DISPOSE]) {
      this[DISPOSE](key, value);
    }

    return false;
  }

  this[LENGTH] += hit.length;
  this[LRU_LIST].unshift(hit);
  this[CACHE].set(key, this[LRU_LIST].head);
  trim(this);
  return true;
};

LRUCache.prototype.has = function (key) {
  if (!this[CACHE].has(key)) return false;
  var hit = this[CACHE].get(key).value;

  if (isStale(this, hit)) {
    return false;
  }

  return true;
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true);
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false);
};

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail;
  if (!node) return null;
  del(this, node);
  return node.value;
};

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key));
};

LRUCache.prototype.load = function (arr) {
  // reset the cache
  this.reset();
  var now = Date.now(); // A previous serialized cache has the most recent items first

  for (var l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l];
    var expiresAt = hit.e || 0;

    if (expiresAt === 0) {
      // the item was created without expiration in a non aged cache
      this.set(hit.k, hit.v);
    } else {
      var maxAge = expiresAt - now; // dont add already expired items

      if (maxAge > 0) {
        this.set(hit.k, hit.v, maxAge);
      }
    }
  }
};

LRUCache.prototype.prune = function () {
  var self = this;
  this[CACHE].forEach(function (value, key) {
    get(self, key, false);
  });
};

function get(self, key, doUse) {
  var node = self[CACHE].get(key);

  if (node) {
    var hit = node.value;

    if (isStale(self, hit)) {
      del(self, node);
      if (!self[ALLOW_STALE]) hit = undefined;
    } else {
      if (doUse) {
        self[LRU_LIST].unshiftNode(node);
      }
    }

    if (hit) hit = hit.value;
  }

  return hit;
}

function isStale(self, hit) {
  if (!hit || !hit.maxAge && !self[MAX_AGE]) {
    return false;
  }

  var stale = false;
  var diff = Date.now() - hit.now;

  if (hit.maxAge) {
    stale = diff > hit.maxAge;
  } else {
    stale = self[MAX_AGE] && diff > self[MAX_AGE];
  }

  return stale;
}

function trim(self) {
  if (self[LENGTH] > self[MAX]) {
    for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
      // We know that we're about to delete this one, and also
      // what the next least recently used key will be, so just
      // go ahead and set it now.
      var prev = walker.prev;
      del(self, walker);
      walker = prev;
    }
  }
}

function del(self, node) {
  if (node) {
    var hit = node.value;

    if (self[DISPOSE]) {
      self[DISPOSE](hit.key, hit.value);
    }

    self[LENGTH] -= hit.length;
    self[CACHE].delete(hit.key);
    self[LRU_LIST].removeNode(node);
  }
} // classy, since V8 prefers predictable objects.


function Entry(key, value, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
}

/***/ }),

/***/ 169:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ 307:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(169);
if (process.env.npm_package_name === 'pseudomap' && process.env.npm_lifecycle_script === 'test') process.env.TEST_PSEUDOMAP = 'true';

if (typeof Map === 'function' && !process.env.TEST_PSEUDOMAP) {
  module.exports = Map;
} else {
  module.exports = __webpack_require__(761);
}

/***/ }),

/***/ 761:
/***/ ((module) => {

var hasOwnProperty = Object.prototype.hasOwnProperty;
module.exports = PseudoMap;

function PseudoMap(set) {
  if (!(this instanceof PseudoMap)) // whyyyyyyy
    throw new TypeError("Constructor PseudoMap requires 'new'");
  this.clear();

  if (set) {
    if (set instanceof PseudoMap || typeof Map === 'function' && set instanceof Map) set.forEach(function (value, key) {
      this.set(key, value);
    }, this);else if (Array.isArray(set)) set.forEach(function (kv) {
      this.set(kv[0], kv[1]);
    }, this);else throw new TypeError('invalid argument');
  }
}

PseudoMap.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  Object.keys(this._data).forEach(function (k) {
    if (k !== 'size') fn.call(thisp, this._data[k].value, this._data[k].key);
  }, this);
};

PseudoMap.prototype.has = function (k) {
  return !!find(this._data, k);
};

PseudoMap.prototype.get = function (k) {
  var res = find(this._data, k);
  return res && res.value;
};

PseudoMap.prototype.set = function (k, v) {
  set(this._data, k, v);
};

PseudoMap.prototype.delete = function (k) {
  var res = find(this._data, k);

  if (res) {
    delete this._data[res._index];
    this._data.size--;
  }
};

PseudoMap.prototype.clear = function () {
  var data = Object.create(null);
  data.size = 0;
  Object.defineProperty(this, '_data', {
    value: data,
    enumerable: false,
    configurable: true,
    writable: false
  });
};

Object.defineProperty(PseudoMap.prototype, 'size', {
  get: function get() {
    return this._data.size;
  },
  set: function set(n) {},
  enumerable: true,
  configurable: true
});

PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function () {
  throw new Error('iterators are not implemented in this version');
}; // Either identical, or both NaN


function same(a, b) {
  return a === b || a !== a && b !== b;
}

function Entry(k, v, i) {
  this.key = k;
  this.value = v;
  this._index = i;
}

function find(data, k) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) return data[key];
  }
}

function set(data, k, v) {
  for (var i = 0, s = '_' + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
    if (same(data[key].key, k)) {
      data[key].value = v;
      return;
    }
  }

  data.size++;
  data[key] = new Entry(k, v, key);
}

/***/ }),

/***/ 430:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (root, factory) {
  'use strict'; // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

  /* istanbul ignore next */

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  'use strict';

  function _isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }

  function _getter(p) {
    return function () {
      return this[p];
    };
  }

  var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
  var numericProps = ['columnNumber', 'lineNumber'];
  var stringProps = ['fileName', 'functionName', 'source'];
  var arrayProps = ['args'];
  var props = booleanProps.concat(numericProps, stringProps, arrayProps);

  function StackFrame(obj) {
    if (!obj) return;

    for (var i = 0; i < props.length; i++) {
      if (obj[props[i]] !== undefined) {
        this['set' + _capitalize(props[i])](obj[props[i]]);
      }
    }
  }

  StackFrame.prototype = {
    getArgs: function getArgs() {
      return this.args;
    },
    setArgs: function setArgs(v) {
      if (Object.prototype.toString.call(v) !== '[object Array]') {
        throw new TypeError('Args must be an Array');
      }

      this.args = v;
    },
    getEvalOrigin: function getEvalOrigin() {
      return this.evalOrigin;
    },
    setEvalOrigin: function setEvalOrigin(v) {
      if (v instanceof StackFrame) {
        this.evalOrigin = v;
      } else if (v instanceof Object) {
        this.evalOrigin = new StackFrame(v);
      } else {
        throw new TypeError('Eval Origin must be an Object or StackFrame');
      }
    },
    toString: function toString() {
      var fileName = this.getFileName() || '';
      var lineNumber = this.getLineNumber() || '';
      var columnNumber = this.getColumnNumber() || '';
      var functionName = this.getFunctionName() || '';

      if (this.getIsEval()) {
        if (fileName) {
          return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
        }

        return '[eval]:' + lineNumber + ':' + columnNumber;
      }

      if (functionName) {
        return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
      }

      return fileName + ':' + lineNumber + ':' + columnNumber;
    }
  };

  StackFrame.fromString = function StackFrame$$fromString(str) {
    var argsStartIndex = str.indexOf('(');
    var argsEndIndex = str.lastIndexOf(')');
    var functionName = str.substring(0, argsStartIndex);
    var args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
    var locationString = str.substring(argsEndIndex + 1);

    if (locationString.indexOf('@') === 0) {
      var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, '');
      var fileName = parts[1];
      var lineNumber = parts[2];
      var columnNumber = parts[3];
    }

    return new StackFrame({
      functionName: functionName,
      args: args || undefined,
      fileName: fileName,
      lineNumber: lineNumber || undefined,
      columnNumber: columnNumber || undefined
    });
  };

  for (var i = 0; i < booleanProps.length; i++) {
    StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);

    StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
      return function (v) {
        this[p] = Boolean(v);
      };
    }(booleanProps[i]);
  }

  for (var j = 0; j < numericProps.length; j++) {
    StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);

    StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
      return function (v) {
        if (!_isNumber(v)) {
          throw new TypeError(p + ' must be a Number');
        }

        this[p] = Number(v);
      };
    }(numericProps[j]);
  }

  for (var k = 0; k < stringProps.length; k++) {
    StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);

    StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
      return function (v) {
        this[p] = String(v);
      };
    }(stringProps[k]);
  }

  return StackFrame;
});

/***/ }),

/***/ 718:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

/***/ }),

/***/ 715:
/***/ ((module) => {

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function isBuffer(arg) {
  return arg && _typeof(arg) === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

/***/ }),

/***/ 82:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(169);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return "\x1B[" + inspect.colors[style][0] + 'm' + str + "\x1B[" + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return _typeof(arg) === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return _typeof(arg) === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || _typeof(arg) === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = __webpack_require__(715);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = __webpack_require__(718);

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),

/***/ 695:
/***/ ((module) => {

module.exports = Yallist;
Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;

  if (!(self instanceof Yallist)) {
    self = new Yallist();
  }

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach === 'function') {
    list.forEach(function (item) {
      self.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self.push(arguments[i]);
    }
  }

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) {
    throw new Error('removing node which does not belong to this list');
  }

  var next = node.next;
  var prev = node.prev;

  if (next) {
    next.prev = prev;
  }

  if (prev) {
    prev.next = next;
  }

  if (node === this.head) {
    this.head = next;
  }

  if (node === this.tail) {
    this.tail = prev;
  }

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var head = this.head;
  node.list = this;
  node.next = head;

  if (head) {
    head.prev = node;
  }

  this.head = node;

  if (!this.tail) {
    this.tail = node;
  }

  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) {
    return;
  }

  if (node.list) {
    node.list.removeNode(node);
  }

  var tail = this.tail;
  node.list = this;
  node.prev = tail;

  if (tail) {
    tail.next = node;
  }

  this.tail = node;

  if (!this.head) {
    this.head = node;
  }

  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }

  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) {
    return undefined;
  }

  var res = this.tail.value;
  this.tail = this.tail.prev;

  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) {
    return undefined;
  }

  var res = this.head.value;
  this.head = this.head.next;

  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }

  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;

  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.next;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    // abort out of the list early if we hit a cycle
    walker = walker.prev;
  }

  if (i === n && walker !== null) {
    return walker.value;
  }
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.head; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }

  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();

  for (var walker = this.tail; walker !== null;) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }

  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc;
  var walker = this.head;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc;
  var walker = this.tail;

  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError('Reduce of empty list with no initial value');
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }

  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);

  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }

  return arr;
};

Yallist.prototype.slice = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }

  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  to = to || this.length;

  if (to < 0) {
    to += this.length;
  }

  from = from || 0;

  if (from < 0) {
    from += this.length;
  }

  var ret = new Yallist();

  if (to < from || to < 0) {
    return ret;
  }

  if (from < 0) {
    from = 0;
  }

  if (to > this.length) {
    to = this.length;
  }

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }

  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }

  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head;
  var tail = this.tail;

  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }

  this.head = tail;
  this.tail = head;
  return this;
};

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);

  if (!self.head) {
    self.head = self.tail;
  }

  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);

  if (!self.tail) {
    self.tail = self.head;
  }

  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }

  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}

/***/ }),

/***/ 672:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "RI": () => (/* binding */ getStackByFiberInDevAndProd),
  "Qt": () => (/* binding */ supportsNativeConsoleTasks)
});

// UNUSED EXPORTS: describeFiber

;// CONCATENATED MODULE: ./src/backend/DevToolsConsolePatching.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This is a DevTools fork of shared/ConsolePatchingDev.
// The shared console patching code is DEV-only.
// We can't use it since DevTools only ships production builds.
// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  if (disabledDepth === 0) {
    /* eslint-disable react-internal/no-production-logging */
    prevLog = console.log;
    prevInfo = console.info;
    prevWarn = console.warn;
    prevError = console.error;
    prevGroup = console.group;
    prevGroupCollapsed = console.groupCollapsed;
    prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

    var props = {
      configurable: true,
      enumerable: true,
      value: disabledLog,
      writable: true
    }; // $FlowFixMe[cannot-write] Flow thinks console is immutable.

    Object.defineProperties(console, {
      info: props,
      log: props,
      warn: props,
      error: props,
      group: props,
      groupCollapsed: props,
      groupEnd: props
    });
    /* eslint-enable react-internal/no-production-logging */
  }

  disabledDepth++;
}
function reenableLogs() {
  disabledDepth--;

  if (disabledDepth === 0) {
    /* eslint-disable react-internal/no-production-logging */
    var props = {
      configurable: true,
      enumerable: true,
      writable: true
    }; // $FlowFixMe[cannot-write] Flow thinks console is immutable.

    Object.defineProperties(console, {
      log: _objectSpread(_objectSpread({}, props), {}, {
        value: prevLog
      }),
      info: _objectSpread(_objectSpread({}, props), {}, {
        value: prevInfo
      }),
      warn: _objectSpread(_objectSpread({}, props), {}, {
        value: prevWarn
      }),
      error: _objectSpread(_objectSpread({}, props), {}, {
        value: prevError
      }),
      group: _objectSpread(_objectSpread({}, props), {}, {
        value: prevGroup
      }),
      groupCollapsed: _objectSpread(_objectSpread({}, props), {}, {
        value: prevGroupCollapsed
      }),
      groupEnd: _objectSpread(_objectSpread({}, props), {}, {
        value: prevGroupEnd
      })
    });
    /* eslint-enable react-internal/no-production-logging */
  }

  if (disabledDepth < 0) {
    console.error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
  }
}
;// CONCATENATED MODULE: ./src/backend/DevToolsComponentStackFrame.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This is a DevTools fork of ReactComponentStackFrame.
// This fork enables DevTools to use the same "native" component stack format,
// while still maintaining support for multiple renderer versions
// (which use different values for ReactTypeOfWork).
// The shared console patching code is DEV-only.
// We can't use it since DevTools only ships production builds.

var prefix;
function describeBuiltInComponentFrame(name) {
  if (prefix === undefined) {
    // Extract the VM specific prefix used by each line.
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = match && match[1] || '';
    }
  } // We use the prefix to ensure our stacks line up with native stack frames.


  return '\n' + prefix + name;
}
function describeDebugInfoFrame(name, env) {
  return describeBuiltInComponentFrame(name + (env ? ' (' + env + ')' : ''));
}
var reentry = false;
var componentFrameCache;

if (false) { var PossiblyWeakMap; }

function describeNativeComponentFrame(fn, construct, currentDispatcherRef) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if (!fn || reentry) {
    return '';
  }

  if (false) { var frame; }

  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe[incompatible-type] It does accept undefined.

  Error.prepareStackTrace = undefined;
  reentry = true; // Override the dispatcher so effects scheduled by this shallow render are thrown away.
  //
  // Note that unlike the code this was forked from (in ReactComponentStackFrame)
  // DevTools should override the dispatcher even when DevTools is compiled in production mode,
  // because the app itself may be in development mode and log errors/warnings.

  var previousDispatcher = currentDispatcherRef.H;
  currentDispatcherRef.H = null;
  disableLogs(); // NOTE: keep in sync with the implementation in ReactComponentStackFrame

  /**
   * Finding a common stack frame between sample and control errors can be
   * tricky given the different types and levels of stack trace truncation from
   * different JS VMs. So instead we'll attempt to control what that common
   * frame should be through this object method:
   * Having both the sample and control errors be in the function under the
   * `DescribeNativeComponentFrameRoot` property, + setting the `name` and
   * `displayName` properties of the function ensures that a stack
   * frame exists that has the method name `DescribeNativeComponentFrameRoot` in
   * it for both control and sample stacks.
   */

  var RunInRootFrame = {
    DetermineComponentFrameRoot: function DetermineComponentFrameRoot() {
      var control;

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function Fake() {
            throw Error();
          }; // $FlowFixMe[prop-missing]


          Object.defineProperty(Fake.prototype, 'props', {
            set: function set() {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            } // $FlowFixMe[prop-missing] found when upgrading Flow


            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          } // TODO(luna): This will currently only throw if the function component
          // tries to access React/ReactDOM/props. We should probably make this throw
          // in simple components too


          var maybePromise = fn(); // If the function component returns a promise, it's likely an async
          // component, which we don't yet support. Attach a noop catch handler to
          // silence the error.
          // TODO: Implement component stacks for async client components?

          if (maybePromise && typeof maybePromise.catch === 'function') {
            maybePromise.catch(function () {});
          }
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          return [sample.stack, control.stack];
        }
      }

      return [null, null];
    }
  }; // $FlowFixMe[prop-missing]

  RunInRootFrame.DetermineComponentFrameRoot.displayName = 'DetermineComponentFrameRoot';
  var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, 'name'); // Before ES6, the `name` property was not configurable.

  if (namePropDescriptor && namePropDescriptor.configurable) {
    // V8 utilizes a function's `name` property when generating a stack trace.
    Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, // Configurable properties can be updated even if its writable descriptor
    // is set to `false`.
    // $FlowFixMe[cannot-write]
    'name', {
      value: 'DetermineComponentFrameRoot'
    });
  }

  try {
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(),
        _RunInRootFrame$Deter2 = _slicedToArray(_RunInRootFrame$Deter, 2),
        sampleStack = _RunInRootFrame$Deter2[0],
        controlStack = _RunInRootFrame$Deter2[1];

    if (sampleStack && controlStack) {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sampleStack.split('\n');
      var controlLines = controlStack.split('\n');
      var s = 0;
      var c = 0;

      while (s < sampleLines.length && !sampleLines[s].includes('DetermineComponentFrameRoot')) {
        s++;
      }

      while (c < controlLines.length && !controlLines[c].includes('DetermineComponentFrameRoot')) {
        c++;
      } // We couldn't find our intentionally injected common root frame, attempt
      // to find another common root frame by search from the bottom of the
      // control stack...


      if (s === sampleLines.length || c === controlLines.length) {
        s = sampleLines.length - 1;
        c = controlLines.length - 1;

        while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
          // We expect at least one stack frame to be shared.
          // Typically this will be the root most one. However, stack frames may be
          // cut off due to maximum stack limits. In this case, one maybe cut off
          // earlier than the other. We assume that the sample is longer or the same
          // and there for cut off earlier. So we should find the root most frame in
          // the sample somewhere in the control.
          c--;
        }
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                if (false) {} // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;
    Error.prepareStackTrace = previousPrepareStackTrace;
    currentDispatcherRef.H = previousDispatcher;
    reenableLogs();
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  if (false) {}

  return syntheticFrame;
}
function describeClassComponentFrame(ctor, currentDispatcherRef) {
  return describeNativeComponentFrame(ctor, true, currentDispatcherRef);
}
function describeFunctionComponentFrame(fn, currentDispatcherRef) {
  return describeNativeComponentFrame(fn, false, currentDispatcherRef);
}
;// CONCATENATED MODULE: ./src/backend/DevToolsFiberComponentStack.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This is a DevTools fork of ReactFiberComponentStack.
// This fork enables DevTools to use the same "native" component stack format,
// while still maintaining support for multiple renderer versions
// (which use different values for ReactTypeOfWork).

function describeFiber(workTagMap, workInProgress, currentDispatcherRef) {
  var HostComponent = workTagMap.HostComponent,
      LazyComponent = workTagMap.LazyComponent,
      SuspenseComponent = workTagMap.SuspenseComponent,
      SuspenseListComponent = workTagMap.SuspenseListComponent,
      FunctionComponent = workTagMap.FunctionComponent,
      IndeterminateComponent = workTagMap.IndeterminateComponent,
      SimpleMemoComponent = workTagMap.SimpleMemoComponent,
      ForwardRef = workTagMap.ForwardRef,
      ClassComponent = workTagMap.ClassComponent;

  switch (workInProgress.tag) {
    case HostComponent:
      return describeBuiltInComponentFrame(workInProgress.type);

    case LazyComponent:
      return describeBuiltInComponentFrame('Lazy');

    case SuspenseComponent:
      return describeBuiltInComponentFrame('Suspense');

    case SuspenseListComponent:
      return describeBuiltInComponentFrame('SuspenseList');

    case FunctionComponent:
    case IndeterminateComponent:
    case SimpleMemoComponent:
      return describeFunctionComponentFrame(workInProgress.type, currentDispatcherRef);

    case ForwardRef:
      return describeFunctionComponentFrame(workInProgress.type.render, currentDispatcherRef);

    case ClassComponent:
      return describeClassComponentFrame(workInProgress.type, currentDispatcherRef);

    default:
      return '';
  }
}
function getStackByFiberInDevAndProd(workTagMap, workInProgress, currentDispatcherRef) {
  try {
    var info = '';
    var node = workInProgress;

    do {
      info += describeFiber(workTagMap, node, currentDispatcherRef); // Add any Server Component stack frames in reverse order.

      var debugInfo = node._debugInfo;

      if (debugInfo) {
        for (var i = debugInfo.length - 1; i >= 0; i--) {
          var entry = debugInfo[i];

          if (typeof entry.name === 'string') {
            info += describeDebugInfoFrame(entry.name, entry.env);
          }
        }
      } // $FlowFixMe[incompatible-type] we bail out when we get a null


      node = node.return;
    } while (node);

    return info;
  } catch (x) {
    return '\nError generating stack: ' + x.message + '\n' + x.stack;
  }
}
function supportsNativeConsoleTasks(fiber) {
  // If this Fiber supports native console.createTask then we are already running
  // inside a native async stack trace if it's active - meaning the DevTools is open.
  // Ideally we'd detect if this task was created while the DevTools was open or not.
  return !!fiber._debugTask;
}

/***/ }),

/***/ 917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "An": () => (/* binding */ patchConsoleUsingWindowValues),
/* harmony export */   "B9": () => (/* binding */ writeConsolePatchSettingsToWindow),
/* harmony export */   "OR": () => (/* binding */ unpatchForStrictMode),
/* harmony export */   "aB": () => (/* binding */ installConsoleFunctionsToWindow),
/* harmony export */   "g_": () => (/* binding */ unpatch),
/* harmony export */   "i5": () => (/* binding */ patchForStrictMode),
/* harmony export */   "pb": () => (/* binding */ isStringComponentStack),
/* harmony export */   "r$": () => (/* binding */ patch),
/* harmony export */   "up": () => (/* binding */ dangerous_setTargetConsoleForTesting),
/* harmony export */   "zn": () => (/* binding */ registerRenderer)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(691);
/* harmony import */ var _DevToolsFiberComponentStack__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(672);
/* harmony import */ var react_devtools_feature_flags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(630);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */





var OVERRIDE_CONSOLE_METHODS = ['error', 'trace', 'warn'];
var DIMMED_NODE_CONSOLE_COLOR = '\x1b[2m%s\x1b[0m'; // React's custom built component stack strings match "\s{4}in"
// Chrome's prefix matches "\s{4}at"

var PREFIX_REGEX = /\s{4}(in|at)\s{1}/; // Firefox and Safari have no prefix ("")
// but we can fallback to looking for location info (e.g. "foo.js:12:345")

var ROW_COLUMN_NUMBER_REGEX = /:\d+:\d+(\n|$)/;
function isStringComponentStack(text) {
  return PREFIX_REGEX.test(text) || ROW_COLUMN_NUMBER_REGEX.test(text);
}
var STYLE_DIRECTIVE_REGEX = /^%c/; // This function tells whether or not the arguments for a console
// method has been overridden by the patchForStrictMode function.
// If it has we'll need to do some special formatting of the arguments
// so the console color stays consistent

function isStrictModeOverride(args, method) {
  return args.length >= 2 && STYLE_DIRECTIVE_REGEX.test(args[0]) && args[1] === "color: ".concat(getConsoleColor(method) || '');
}

function getConsoleColor(method) {
  switch (method) {
    case 'warn':
      return consoleSettingsRef.browserTheme === 'light' ? "rgba(250, 180, 50, 0.75)" : "rgba(250, 180, 50, 0.5)";

    case 'error':
      return consoleSettingsRef.browserTheme === 'light' ? "rgba(250, 123, 130, 0.75)" : "rgba(250, 123, 130, 0.5)";

    case 'log':
    default:
      return consoleSettingsRef.browserTheme === 'light' ? "rgba(125, 125, 125, 0.75)" : "rgba(125, 125, 125, 0.5)";
  }
}

var injectedRenderers = new Map();
var targetConsole = console;
var targetConsoleMethods = {};

for (var method in console) {
  targetConsoleMethods[method] = console[method];
}

var unpatchFn = null;
var isNode = false;

try {
  isNode = undefined === global;
} catch (error) {} // Enables e.g. Jest tests to inject a mock console object.


function dangerous_setTargetConsoleForTesting(targetConsoleForTesting) {
  targetConsole = targetConsoleForTesting;
  targetConsoleMethods = {};

  for (var _method in targetConsole) {
    targetConsoleMethods[_method] = console[_method];
  }
} // v16 renderers should use this method to inject internals necessary to generate a component stack.
// These internals will be used if the console is patched.
// Injecting them separately allows the console to easily be patched or un-patched later (at runtime).

function registerRenderer(renderer, onErrorOrWarning) {
  var currentDispatcherRef = renderer.currentDispatcherRef,
      getCurrentFiber = renderer.getCurrentFiber,
      findFiberByHostInstance = renderer.findFiberByHostInstance,
      version = renderer.version; // Ignore React v15 and older because they don't expose a component stack anyway.

  if (typeof findFiberByHostInstance !== 'function') {
    return;
  } // currentDispatcherRef gets injected for v16.8+ to support hooks inspection.
  // getCurrentFiber gets injected for v16.9+.


  if (currentDispatcherRef != null && typeof getCurrentFiber === 'function') {
    var _getInternalReactCons = (0,_renderer__WEBPACK_IMPORTED_MODULE_1__/* .getInternalReactConstants */ .yV)(version),
        ReactTypeOfWork = _getInternalReactCons.ReactTypeOfWork;

    injectedRenderers.set(renderer, {
      currentDispatcherRef: currentDispatcherRef,
      getCurrentFiber: getCurrentFiber,
      workTagMap: ReactTypeOfWork,
      onErrorOrWarning: onErrorOrWarning
    });
  }
}
var consoleSettingsRef = {
  appendComponentStack: false,
  breakOnConsoleErrors: false,
  showInlineWarningsAndErrors: false,
  hideConsoleLogsInStrictMode: false,
  browserTheme: 'dark'
}; // Patches console methods to append component stack for the current fiber.
// Call unpatch() to remove the injected behavior.

function patch(_ref) {
  var appendComponentStack = _ref.appendComponentStack,
      breakOnConsoleErrors = _ref.breakOnConsoleErrors,
      showInlineWarningsAndErrors = _ref.showInlineWarningsAndErrors,
      hideConsoleLogsInStrictMode = _ref.hideConsoleLogsInStrictMode,
      browserTheme = _ref.browserTheme;
  // Settings may change after we've patched the console.
  // Using a shared ref allows the patch function to read the latest values.
  consoleSettingsRef.appendComponentStack = appendComponentStack;
  consoleSettingsRef.breakOnConsoleErrors = breakOnConsoleErrors;
  consoleSettingsRef.showInlineWarningsAndErrors = showInlineWarningsAndErrors;
  consoleSettingsRef.hideConsoleLogsInStrictMode = hideConsoleLogsInStrictMode;
  consoleSettingsRef.browserTheme = browserTheme;

  if (appendComponentStack || breakOnConsoleErrors || showInlineWarningsAndErrors) {
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

    OVERRIDE_CONSOLE_METHODS.forEach(function (method) {
      try {
        var originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_ORIGINAL_METHOD__ : targetConsole[method]; // $FlowFixMe[missing-local-annot]

        var overrideMethod = function overrideMethod() {
          var shouldAppendWarningStack = false;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (method !== 'log') {
            if (consoleSettingsRef.appendComponentStack) {
              var lastArg = args.length > 0 ? args[args.length - 1] : null;
              var alreadyHasComponentStack = typeof lastArg === 'string' && isStringComponentStack(lastArg); // If we are ever called with a string that already has a component stack,
              // e.g. a React error/warning, don't append a second stack.

              shouldAppendWarningStack = !alreadyHasComponentStack;
            }
          }

          var shouldShowInlineWarningsAndErrors = consoleSettingsRef.showInlineWarningsAndErrors && (method === 'error' || method === 'warn'); // Search for the first renderer that has a current Fiber.
          // We don't handle the edge case of stacks for more than one (e.g. interleaved renderers?)
          // eslint-disable-next-line no-for-of-loops/no-for-of-loops

          var _iterator = _createForOfIteratorHelper(injectedRenderers.values()),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var renderer = _step.value;
              var currentDispatcherRef = (0,_renderer__WEBPACK_IMPORTED_MODULE_1__/* .getDispatcherRef */ .Jq)(renderer);
              var getCurrentFiber = renderer.getCurrentFiber,
                  onErrorOrWarning = renderer.onErrorOrWarning,
                  workTagMap = renderer.workTagMap;
              var current = getCurrentFiber();

              if (current != null) {
                try {
                  if (shouldShowInlineWarningsAndErrors) {
                    // patch() is called by two places: (1) the hook and (2) the renderer backend.
                    // The backend is what implements a message queue, so it's the only one that injects onErrorOrWarning.
                    if (typeof onErrorOrWarning === 'function') {
                      onErrorOrWarning(current, method, // Copy args before we mutate them (e.g. adding the component stack)
                      args.slice());
                    }
                  }

                  if (shouldAppendWarningStack && !(0,_DevToolsFiberComponentStack__WEBPACK_IMPORTED_MODULE_2__/* .supportsNativeConsoleTasks */ .Qt)(current)) {
                    var componentStack = (0,_DevToolsFiberComponentStack__WEBPACK_IMPORTED_MODULE_2__/* .getStackByFiberInDevAndProd */ .RI)(workTagMap, current, currentDispatcherRef);

                    if (componentStack !== '') {
                      if (isStrictModeOverride(args, method)) {
                        args[0] = "".concat(args[0], " %s");
                        args.push(componentStack);
                      } else {
                        args.push(componentStack);
                      }
                    }
                  }
                } catch (error) {
                  // Don't let a DevTools or React internal error interfere with logging.
                  setTimeout(function () {
                    throw error;
                  }, 0);
                } finally {
                  break;
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          if (consoleSettingsRef.breakOnConsoleErrors) {
            // --- Welcome to debugging with React DevTools ---
            // This debugger statement means that you've enabled the "break on warnings" feature.
            // Use the browser's Call Stack panel to step out of this override function-
            // to where the original warning or error was logged.
            // eslint-disable-next-line no-debugger
            debugger;
          }

          originalMethod.apply(void 0, args);
        };

        overrideMethod.__REACT_DEVTOOLS_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  } else {
    unpatch();
  }
} // Removed component stack patch from console methods.

function unpatch() {
  if (unpatchFn !== null) {
    unpatchFn();
    unpatchFn = null;
  }
}
var unpatchForStrictModeFn = null; // NOTE: KEEP IN SYNC with src/hook.js:patchConsoleForInitialCommitInStrictMode

function patchForStrictMode() {
  if (react_devtools_feature_flags__WEBPACK_IMPORTED_MODULE_4__/* .consoleManagedByDevToolsDuringStrictMode */ .et) {
    var overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

    if (unpatchForStrictModeFn !== null) {
      // Don't patch twice.
      return;
    }

    var originalConsoleMethods = {};

    unpatchForStrictModeFn = function unpatchForStrictModeFn() {
      for (var _method3 in originalConsoleMethods) {
        try {
          targetConsole[_method3] = originalConsoleMethods[_method3];
        } catch (error) {}
      }
    };

    overrideConsoleMethods.forEach(function (method) {
      try {
        var originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method]; // $FlowFixMe[missing-local-annot]

        var overrideMethod = function overrideMethod() {
          if (!consoleSettingsRef.hideConsoleLogsInStrictMode) {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            // Dim the text color of the double logs if we're not
            // hiding them.
            if (isNode) {
              originalMethod(DIMMED_NODE_CONSOLE_COLOR, _utils__WEBPACK_IMPORTED_MODULE_0__/* .format.apply */ .WU.apply(void 0, args));
            } else {
              var color = getConsoleColor(method);

              if (color) {
                originalMethod.apply(void 0, _toConsumableArray((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .formatWithStyles */ .Ep)(args, "color: ".concat(color))));
              } else {
                throw Error('Console color is not defined');
              }
            }
          }
        };

        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  }
} // NOTE: KEEP IN SYNC with src/hook.js:unpatchConsoleForInitialCommitInStrictMode

function unpatchForStrictMode() {
  if (react_devtools_feature_flags__WEBPACK_IMPORTED_MODULE_4__/* .consoleManagedByDevToolsDuringStrictMode */ .et) {
    if (unpatchForStrictModeFn !== null) {
      unpatchForStrictModeFn();
      unpatchForStrictModeFn = null;
    }
  }
}
function patchConsoleUsingWindowValues() {
  var _castBool, _castBool2, _castBool3, _castBool4, _castBrowserTheme;

  var appendComponentStack = (_castBool = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .castBool */ .qw)(window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__)) !== null && _castBool !== void 0 ? _castBool : true;
  var breakOnConsoleErrors = (_castBool2 = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .castBool */ .qw)(window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__)) !== null && _castBool2 !== void 0 ? _castBool2 : false;
  var showInlineWarningsAndErrors = (_castBool3 = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .castBool */ .qw)(window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__)) !== null && _castBool3 !== void 0 ? _castBool3 : true;
  var hideConsoleLogsInStrictMode = (_castBool4 = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .castBool */ .qw)(window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__)) !== null && _castBool4 !== void 0 ? _castBool4 : false;
  var browserTheme = (_castBrowserTheme = (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .castBrowserTheme */ .d6)(window.__REACT_DEVTOOLS_BROWSER_THEME__)) !== null && _castBrowserTheme !== void 0 ? _castBrowserTheme : 'dark';
  patch({
    appendComponentStack: appendComponentStack,
    breakOnConsoleErrors: breakOnConsoleErrors,
    showInlineWarningsAndErrors: showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode: hideConsoleLogsInStrictMode,
    browserTheme: browserTheme
  });
} // After receiving cached console patch settings from React Native, we set them on window.
// When the console is initially patched (in renderer.js and hook.js), these values are read.
// The browser extension (etc.) sets these values on window, but through another method.

function writeConsolePatchSettingsToWindow(settings) {
  window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = settings.appendComponentStack;
  window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = settings.breakOnConsoleErrors;
  window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = settings.showInlineWarningsAndErrors;
  window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ = settings.hideConsoleLogsInStrictMode;
  window.__REACT_DEVTOOLS_BROWSER_THEME__ = settings.browserTheme;
}
function installConsoleFunctionsToWindow() {
  window.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__ = {
    patchConsoleUsingWindowValues: patchConsoleUsingWindowValues,
    registerRendererWithConsole: registerRenderer
  };
}

/***/ }),

/***/ 691:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Jq": () => (/* binding */ getDispatcherRef),
  "yV": () => (/* binding */ getInternalReactConstants)
});

// UNUSED EXPORTS: attach

// EXTERNAL MODULE: ./src/utils.js + 1 modules
var utils = __webpack_require__(20);
// EXTERNAL MODULE: ./src/backend/utils.js
var backend_utils = __webpack_require__(15);
// EXTERNAL MODULE: ../../build/oss-experimental/react-debug-tools/index.js
var react_debug_tools = __webpack_require__(987);
// EXTERNAL MODULE: ./src/backend/console.js
var backend_console = __webpack_require__(917);
;// CONCATENATED MODULE: ./src/backend/ReactSymbols.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// This list should be kept updated to reflect additions to 'shared/ReactSymbols'.
// DevTools can't import symbols from 'shared/ReactSymbols' directly for two reasons:
// 1. DevTools requires symbols which may have been deleted in more recent versions (e.g. concurrent mode)
// 2. DevTools must support both Symbol and numeric forms of each symbol;
//    Since e.g. standalone DevTools runs in a separate process, it can't rely on its own ES capabilities.
var ReactSymbols_CONCURRENT_MODE_NUMBER = 0xeacf;
var ReactSymbols_CONCURRENT_MODE_SYMBOL_STRING = 'Symbol(react.concurrent_mode)';
var ReactSymbols_CONTEXT_NUMBER = 0xeace;
var ReactSymbols_CONTEXT_SYMBOL_STRING = 'Symbol(react.context)';
var SERVER_CONTEXT_SYMBOL_STRING = 'Symbol(react.server_context)';
var ReactSymbols_DEPRECATED_ASYNC_MODE_SYMBOL_STRING = 'Symbol(react.async_mode)';
var ELEMENT_SYMBOL_STRING = 'Symbol(react.transitional.element)';
var LEGACY_ELEMENT_NUMBER = 0xeac7;
var LEGACY_ELEMENT_SYMBOL_STRING = 'Symbol(react.element)';
var DEBUG_TRACING_MODE_NUMBER = 0xeae1;
var DEBUG_TRACING_MODE_SYMBOL_STRING = 'Symbol(react.debug_trace_mode)';
var FORWARD_REF_NUMBER = 0xead0;
var FORWARD_REF_SYMBOL_STRING = 'Symbol(react.forward_ref)';
var FRAGMENT_NUMBER = 0xeacb;
var FRAGMENT_SYMBOL_STRING = 'Symbol(react.fragment)';
var LAZY_NUMBER = 0xead4;
var LAZY_SYMBOL_STRING = 'Symbol(react.lazy)';
var MEMO_NUMBER = 0xead3;
var MEMO_SYMBOL_STRING = 'Symbol(react.memo)';
var PORTAL_NUMBER = 0xeaca;
var PORTAL_SYMBOL_STRING = 'Symbol(react.portal)';
var ReactSymbols_PROFILER_NUMBER = 0xead2;
var ReactSymbols_PROFILER_SYMBOL_STRING = 'Symbol(react.profiler)';
var ReactSymbols_PROVIDER_NUMBER = 0xeacd;
var ReactSymbols_PROVIDER_SYMBOL_STRING = 'Symbol(react.provider)';
var ReactSymbols_CONSUMER_SYMBOL_STRING = 'Symbol(react.consumer)';
var SCOPE_NUMBER = 0xead7;
var SCOPE_SYMBOL_STRING = 'Symbol(react.scope)';
var ReactSymbols_STRICT_MODE_NUMBER = 0xeacc;
var ReactSymbols_STRICT_MODE_SYMBOL_STRING = 'Symbol(react.strict_mode)';
var SUSPENSE_NUMBER = 0xead1;
var SUSPENSE_SYMBOL_STRING = 'Symbol(react.suspense)';
var SUSPENSE_LIST_NUMBER = 0xead8;
var SUSPENSE_LIST_SYMBOL_STRING = 'Symbol(react.suspense_list)';
var SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED_SYMBOL_STRING = 'Symbol(react.server_context.defaultValue)';
var REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
;// CONCATENATED MODULE: ../shared/objectIs.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function objectIs_is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = // $FlowFixMe[method-unbinding]
typeof Object.is === 'function' ? Object.is : objectIs_is;
/* harmony default export */ const shared_objectIs = ((/* unused pure expression or super */ null && (objectIs)));
;// CONCATENATED MODULE: ../shared/hasOwnProperty.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// $FlowFixMe[method-unbinding]
var hasOwnProperty_hasOwnProperty = Object.prototype.hasOwnProperty;
/* harmony default export */ const shared_hasOwnProperty = ((/* unused pure expression or super */ null && (hasOwnProperty_hasOwnProperty)));
// EXTERNAL MODULE: ./src/isArray.js
var src_isArray = __webpack_require__(765);
;// CONCATENATED MODULE: ./src/backend/StyleX/utils.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var cachedStyleNameToValueMap = new Map();
function utils_getStyleXData(data) {
  var sources = new Set();
  var resolvedStyles = {};
  crawlData(data, sources, resolvedStyles);
  return {
    sources: Array.from(sources).sort(),
    resolvedStyles: resolvedStyles
  };
}
function crawlData(data, sources, resolvedStyles) {
  if (data == null) {
    return;
  }

  if (isArray(data)) {
    data.forEach(function (entry) {
      if (entry == null) {
        return;
      }

      if (isArray(entry)) {
        crawlData(entry, sources, resolvedStyles);
      } else {
        crawlObjectProperties(entry, sources, resolvedStyles);
      }
    });
  } else {
    crawlObjectProperties(data, sources, resolvedStyles);
  }

  resolvedStyles = Object.fromEntries(Object.entries(resolvedStyles).sort());
}

function crawlObjectProperties(entry, sources, resolvedStyles) {
  var keys = Object.keys(entry);
  keys.forEach(function (key) {
    var value = entry[key];

    if (typeof value === 'string') {
      if (key === value) {
        // Special case; this key is the name of the style's source/file/module.
        sources.add(key);
      } else {
        var propertyValue = getPropertyValueForStyleName(value);

        if (propertyValue != null) {
          resolvedStyles[key] = propertyValue;
        }
      }
    } else {
      var nestedStyle = {};
      resolvedStyles[key] = nestedStyle;
      crawlData([value], sources, nestedStyle);
    }
  });
}

function getPropertyValueForStyleName(styleName) {
  if (cachedStyleNameToValueMap.has(styleName)) {
    return cachedStyleNameToValueMap.get(styleName);
  }

  for (var styleSheetIndex = 0; styleSheetIndex < document.styleSheets.length; styleSheetIndex++) {
    var styleSheet = document.styleSheets[styleSheetIndex];
    var rules = null; // this might throw if CORS rules are enforced https://www.w3.org/TR/cssom-1/#the-cssstylesheet-interface

    try {
      rules = styleSheet.cssRules;
    } catch (_e) {
      continue;
    }

    for (var ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
      if (!(rules[ruleIndex] instanceof CSSStyleRule)) {
        continue;
      }

      var rule = rules[ruleIndex];
      var cssText = rule.cssText,
          selectorText = rule.selectorText,
          style = rule.style;

      if (selectorText != null) {
        if (selectorText.startsWith(".".concat(styleName))) {
          var match = cssText.match(/{ *([a-z\-]+):/);

          if (match !== null) {
            var property = match[1];
            var value = style.getPropertyValue(property);
            cachedStyleNameToValueMap.set(styleName, value);
            return value;
          } else {
            return null;
          }
        }
      }
    }
  }

  return null;
}
// EXTERNAL MODULE: ../shared/isArray.js
var shared_isArray = __webpack_require__(189);
;// CONCATENATED MODULE: ./src/devtools/constants.js
var CHANGE_LOG_URL = 'https://github.com/facebook/react/blob/main/packages/react-devtools/CHANGELOG.md';
var UNSUPPORTED_VERSION_URL = 'https://reactjs.org/blog/2019/08/15/new-react-devtools.html#how-do-i-get-the-old-version-back';
var REACT_DEVTOOLS_WORKPLACE_URL = 'https://fburl.com/react-devtools-workplace-group';
var THEME_STYLES = {
  light: {
    '--color-attribute-name': '#ef6632',
    '--color-attribute-name-not-editable': '#23272f',
    '--color-attribute-name-inverted': 'rgba(255, 255, 255, 0.7)',
    '--color-attribute-value': '#1a1aa6',
    '--color-attribute-value-inverted': '#ffffff',
    '--color-attribute-editable-value': '#1a1aa6',
    '--color-background': '#ffffff',
    '--color-background-hover': 'rgba(0, 136, 250, 0.1)',
    '--color-background-inactive': '#e5e5e5',
    '--color-background-invalid': '#fff0f0',
    '--color-background-selected': '#0088fa',
    '--color-button-background': '#ffffff',
    '--color-button-background-focus': '#ededed',
    '--color-button': '#5f6673',
    '--color-button-disabled': '#cfd1d5',
    '--color-button-active': '#0088fa',
    '--color-button-focus': '#23272f',
    '--color-button-hover': '#23272f',
    '--color-border': '#eeeeee',
    '--color-commit-did-not-render-fill': '#cfd1d5',
    '--color-commit-did-not-render-fill-text': '#000000',
    '--color-commit-did-not-render-pattern': '#cfd1d5',
    '--color-commit-did-not-render-pattern-text': '#333333',
    '--color-commit-gradient-0': '#37afa9',
    '--color-commit-gradient-1': '#63b19e',
    '--color-commit-gradient-2': '#80b393',
    '--color-commit-gradient-3': '#97b488',
    '--color-commit-gradient-4': '#abb67d',
    '--color-commit-gradient-5': '#beb771',
    '--color-commit-gradient-6': '#cfb965',
    '--color-commit-gradient-7': '#dfba57',
    '--color-commit-gradient-8': '#efbb49',
    '--color-commit-gradient-9': '#febc38',
    '--color-commit-gradient-text': '#000000',
    '--color-component-name': '#6a51b2',
    '--color-component-name-inverted': '#ffffff',
    '--color-component-badge-background': 'rgba(0, 0, 0, 0.1)',
    '--color-component-badge-background-inverted': 'rgba(255, 255, 255, 0.25)',
    '--color-component-badge-count': '#777d88',
    '--color-component-badge-count-inverted': 'rgba(255, 255, 255, 0.7)',
    '--color-console-error-badge-text': '#ffffff',
    '--color-console-error-background': '#fff0f0',
    '--color-console-error-border': '#ffd6d6',
    '--color-console-error-icon': '#eb3941',
    '--color-console-error-text': '#fe2e31',
    '--color-console-warning-badge-text': '#000000',
    '--color-console-warning-background': '#fffbe5',
    '--color-console-warning-border': '#fff5c1',
    '--color-console-warning-icon': '#f4bd00',
    '--color-console-warning-text': '#64460c',
    '--color-context-background': 'rgba(0,0,0,.9)',
    '--color-context-background-hover': 'rgba(255, 255, 255, 0.1)',
    '--color-context-background-selected': '#178fb9',
    '--color-context-border': '#3d424a',
    '--color-context-text': '#ffffff',
    '--color-context-text-selected': '#ffffff',
    '--color-dim': '#777d88',
    '--color-dimmer': '#cfd1d5',
    '--color-dimmest': '#eff0f1',
    '--color-error-background': 'hsl(0, 100%, 97%)',
    '--color-error-border': 'hsl(0, 100%, 92%)',
    '--color-error-text': '#ff0000',
    '--color-expand-collapse-toggle': '#777d88',
    '--color-forget-badge-background': '#2683e2',
    '--color-forget-badge-background-inverted': '#1a6bbc',
    '--color-forget-text': '#fff',
    '--color-link': '#0000ff',
    '--color-modal-background': 'rgba(255, 255, 255, 0.75)',
    '--color-bridge-version-npm-background': '#eff0f1',
    '--color-bridge-version-npm-text': '#000000',
    '--color-bridge-version-number': '#0088fa',
    '--color-primitive-hook-badge-background': '#e5e5e5',
    '--color-primitive-hook-badge-text': '#5f6673',
    '--color-record-active': '#fc3a4b',
    '--color-record-hover': '#3578e5',
    '--color-record-inactive': '#0088fa',
    '--color-resize-bar': '#eeeeee',
    '--color-resize-bar-active': '#dcdcdc',
    '--color-resize-bar-border': '#d1d1d1',
    '--color-resize-bar-dot': '#333333',
    '--color-timeline-internal-module': '#d1d1d1',
    '--color-timeline-internal-module-hover': '#c9c9c9',
    '--color-timeline-internal-module-text': '#444',
    '--color-timeline-native-event': '#ccc',
    '--color-timeline-native-event-hover': '#aaa',
    '--color-timeline-network-primary': '#fcf3dc',
    '--color-timeline-network-primary-hover': '#f0e7d1',
    '--color-timeline-network-secondary': '#efc457',
    '--color-timeline-network-secondary-hover': '#e3ba52',
    '--color-timeline-priority-background': '#f6f6f6',
    '--color-timeline-priority-border': '#eeeeee',
    '--color-timeline-user-timing': '#c9cacd',
    '--color-timeline-user-timing-hover': '#93959a',
    '--color-timeline-react-idle': '#d3e5f6',
    '--color-timeline-react-idle-hover': '#c3d9ef',
    '--color-timeline-react-render': '#9fc3f3',
    '--color-timeline-react-render-hover': '#83afe9',
    '--color-timeline-react-render-text': '#11365e',
    '--color-timeline-react-commit': '#c88ff0',
    '--color-timeline-react-commit-hover': '#b281d6',
    '--color-timeline-react-commit-text': '#3e2c4a',
    '--color-timeline-react-layout-effects': '#b281d6',
    '--color-timeline-react-layout-effects-hover': '#9d71bd',
    '--color-timeline-react-layout-effects-text': '#3e2c4a',
    '--color-timeline-react-passive-effects': '#b281d6',
    '--color-timeline-react-passive-effects-hover': '#9d71bd',
    '--color-timeline-react-passive-effects-text': '#3e2c4a',
    '--color-timeline-react-schedule': '#9fc3f3',
    '--color-timeline-react-schedule-hover': '#2683E2',
    '--color-timeline-react-suspense-rejected': '#f1cc14',
    '--color-timeline-react-suspense-rejected-hover': '#ffdf37',
    '--color-timeline-react-suspense-resolved': '#a6e59f',
    '--color-timeline-react-suspense-resolved-hover': '#89d281',
    '--color-timeline-react-suspense-unresolved': '#c9cacd',
    '--color-timeline-react-suspense-unresolved-hover': '#93959a',
    '--color-timeline-thrown-error': '#ee1638',
    '--color-timeline-thrown-error-hover': '#da1030',
    '--color-timeline-text-color': '#000000',
    '--color-timeline-text-dim-color': '#ccc',
    '--color-timeline-react-work-border': '#eeeeee',
    '--color-search-match': 'yellow',
    '--color-search-match-current': '#f7923b',
    '--color-selected-tree-highlight-active': 'rgba(0, 136, 250, 0.1)',
    '--color-selected-tree-highlight-inactive': 'rgba(0, 0, 0, 0.05)',
    '--color-scroll-caret': 'rgba(150, 150, 150, 0.5)',
    '--color-tab-selected-border': '#0088fa',
    '--color-text': '#000000',
    '--color-text-invalid': '#ff0000',
    '--color-text-selected': '#ffffff',
    '--color-toggle-background-invalid': '#fc3a4b',
    '--color-toggle-background-on': '#0088fa',
    '--color-toggle-background-off': '#cfd1d5',
    '--color-toggle-text': '#ffffff',
    '--color-warning-background': '#fb3655',
    '--color-warning-background-hover': '#f82042',
    '--color-warning-text-color': '#ffffff',
    '--color-warning-text-color-inverted': '#fd4d69',
    // The styles below should be kept in sync with 'root.css'
    // They are repeated there because they're used by e.g. tooltips or context menus
    // which get rendered outside of the DOM subtree (where normal theme/styles are written).
    '--color-scroll-thumb': '#c2c2c2',
    '--color-scroll-track': '#fafafa',
    '--color-tooltip-background': 'rgba(0, 0, 0, 0.9)',
    '--color-tooltip-text': '#ffffff'
  },
  dark: {
    '--color-attribute-name': '#9d87d2',
    '--color-attribute-name-not-editable': '#ededed',
    '--color-attribute-name-inverted': '#282828',
    '--color-attribute-value': '#cedae0',
    '--color-attribute-value-inverted': '#ffffff',
    '--color-attribute-editable-value': 'yellow',
    '--color-background': '#282c34',
    '--color-background-hover': 'rgba(255, 255, 255, 0.1)',
    '--color-background-inactive': '#3d424a',
    '--color-background-invalid': '#5c0000',
    '--color-background-selected': '#178fb9',
    '--color-button-background': '#282c34',
    '--color-button-background-focus': '#3d424a',
    '--color-button': '#afb3b9',
    '--color-button-active': '#61dafb',
    '--color-button-disabled': '#4f5766',
    '--color-button-focus': '#a2e9fc',
    '--color-button-hover': '#ededed',
    '--color-border': '#3d424a',
    '--color-commit-did-not-render-fill': '#777d88',
    '--color-commit-did-not-render-fill-text': '#000000',
    '--color-commit-did-not-render-pattern': '#666c77',
    '--color-commit-did-not-render-pattern-text': '#ffffff',
    '--color-commit-gradient-0': '#37afa9',
    '--color-commit-gradient-1': '#63b19e',
    '--color-commit-gradient-2': '#80b393',
    '--color-commit-gradient-3': '#97b488',
    '--color-commit-gradient-4': '#abb67d',
    '--color-commit-gradient-5': '#beb771',
    '--color-commit-gradient-6': '#cfb965',
    '--color-commit-gradient-7': '#dfba57',
    '--color-commit-gradient-8': '#efbb49',
    '--color-commit-gradient-9': '#febc38',
    '--color-commit-gradient-text': '#000000',
    '--color-component-name': '#61dafb',
    '--color-component-name-inverted': '#282828',
    '--color-component-badge-background': '#5e6167',
    '--color-component-badge-background-inverted': '#46494e',
    '--color-component-badge-count': '#8f949d',
    '--color-component-badge-count-inverted': 'rgba(255, 255, 255, 0.85)',
    '--color-console-error-badge-text': '#000000',
    '--color-console-error-background': '#290000',
    '--color-console-error-border': '#5c0000',
    '--color-console-error-icon': '#eb3941',
    '--color-console-error-text': '#fc7f7f',
    '--color-console-warning-badge-text': '#000000',
    '--color-console-warning-background': '#332b00',
    '--color-console-warning-border': '#665500',
    '--color-console-warning-icon': '#f4bd00',
    '--color-console-warning-text': '#f5f2ed',
    '--color-context-background': 'rgba(255,255,255,.95)',
    '--color-context-background-hover': 'rgba(0, 136, 250, 0.1)',
    '--color-context-background-selected': '#0088fa',
    '--color-context-border': '#eeeeee',
    '--color-context-text': '#000000',
    '--color-context-text-selected': '#ffffff',
    '--color-dim': '#8f949d',
    '--color-dimmer': '#777d88',
    '--color-dimmest': '#4f5766',
    '--color-error-background': '#200',
    '--color-error-border': '#900',
    '--color-error-text': '#f55',
    '--color-expand-collapse-toggle': '#8f949d',
    '--color-forget-badge-background': '#2683e2',
    '--color-forget-badge-background-inverted': '#1a6bbc',
    '--color-forget-text': '#fff',
    '--color-link': '#61dafb',
    '--color-modal-background': 'rgba(0, 0, 0, 0.75)',
    '--color-bridge-version-npm-background': 'rgba(0, 0, 0, 0.25)',
    '--color-bridge-version-npm-text': '#ffffff',
    '--color-bridge-version-number': 'yellow',
    '--color-primitive-hook-badge-background': 'rgba(0, 0, 0, 0.25)',
    '--color-primitive-hook-badge-text': 'rgba(255, 255, 255, 0.7)',
    '--color-record-active': '#fc3a4b',
    '--color-record-hover': '#a2e9fc',
    '--color-record-inactive': '#61dafb',
    '--color-resize-bar': '#282c34',
    '--color-resize-bar-active': '#31363f',
    '--color-resize-bar-border': '#3d424a',
    '--color-resize-bar-dot': '#cfd1d5',
    '--color-timeline-internal-module': '#303542',
    '--color-timeline-internal-module-hover': '#363b4a',
    '--color-timeline-internal-module-text': '#7f8899',
    '--color-timeline-native-event': '#b2b2b2',
    '--color-timeline-native-event-hover': '#949494',
    '--color-timeline-network-primary': '#fcf3dc',
    '--color-timeline-network-primary-hover': '#e3dbc5',
    '--color-timeline-network-secondary': '#efc457',
    '--color-timeline-network-secondary-hover': '#d6af4d',
    '--color-timeline-priority-background': '#1d2129',
    '--color-timeline-priority-border': '#282c34',
    '--color-timeline-user-timing': '#c9cacd',
    '--color-timeline-user-timing-hover': '#93959a',
    '--color-timeline-react-idle': '#3d485b',
    '--color-timeline-react-idle-hover': '#465269',
    '--color-timeline-react-render': '#2683E2',
    '--color-timeline-react-render-hover': '#1a76d4',
    '--color-timeline-react-render-text': '#11365e',
    '--color-timeline-react-commit': '#731fad',
    '--color-timeline-react-commit-hover': '#611b94',
    '--color-timeline-react-commit-text': '#e5c1ff',
    '--color-timeline-react-layout-effects': '#611b94',
    '--color-timeline-react-layout-effects-hover': '#51167a',
    '--color-timeline-react-layout-effects-text': '#e5c1ff',
    '--color-timeline-react-passive-effects': '#611b94',
    '--color-timeline-react-passive-effects-hover': '#51167a',
    '--color-timeline-react-passive-effects-text': '#e5c1ff',
    '--color-timeline-react-schedule': '#2683E2',
    '--color-timeline-react-schedule-hover': '#1a76d4',
    '--color-timeline-react-suspense-rejected': '#f1cc14',
    '--color-timeline-react-suspense-rejected-hover': '#e4c00f',
    '--color-timeline-react-suspense-resolved': '#a6e59f',
    '--color-timeline-react-suspense-resolved-hover': '#89d281',
    '--color-timeline-react-suspense-unresolved': '#c9cacd',
    '--color-timeline-react-suspense-unresolved-hover': '#93959a',
    '--color-timeline-thrown-error': '#fb3655',
    '--color-timeline-thrown-error-hover': '#f82042',
    '--color-timeline-text-color': '#282c34',
    '--color-timeline-text-dim-color': '#555b66',
    '--color-timeline-react-work-border': '#3d424a',
    '--color-search-match': 'yellow',
    '--color-search-match-current': '#f7923b',
    '--color-selected-tree-highlight-active': 'rgba(23, 143, 185, 0.15)',
    '--color-selected-tree-highlight-inactive': 'rgba(255, 255, 255, 0.05)',
    '--color-scroll-caret': '#4f5766',
    '--color-shadow': 'rgba(0, 0, 0, 0.5)',
    '--color-tab-selected-border': '#178fb9',
    '--color-text': '#ffffff',
    '--color-text-invalid': '#ff8080',
    '--color-text-selected': '#ffffff',
    '--color-toggle-background-invalid': '#fc3a4b',
    '--color-toggle-background-on': '#178fb9',
    '--color-toggle-background-off': '#777d88',
    '--color-toggle-text': '#ffffff',
    '--color-warning-background': '#ee1638',
    '--color-warning-background-hover': '#da1030',
    '--color-warning-text-color': '#ffffff',
    '--color-warning-text-color-inverted': '#ee1638',
    // The styles below should be kept in sync with 'root.css'
    // They are repeated there because they're used by e.g. tooltips or context menus
    // which get rendered outside of the DOM subtree (where normal theme/styles are written).
    '--color-scroll-thumb': '#afb3b9',
    '--color-scroll-track': '#313640',
    '--color-tooltip-background': 'rgba(255, 255, 255, 0.95)',
    '--color-tooltip-text': '#000000'
  },
  compact: {
    '--font-size-monospace-small': '9px',
    '--font-size-monospace-normal': '11px',
    '--font-size-monospace-large': '15px',
    '--font-size-sans-small': '10px',
    '--font-size-sans-normal': '12px',
    '--font-size-sans-large': '14px',
    '--line-height-data': '18px'
  },
  comfortable: {
    '--font-size-monospace-small': '10px',
    '--font-size-monospace-normal': '13px',
    '--font-size-monospace-large': '17px',
    '--font-size-sans-small': '12px',
    '--font-size-sans-normal': '14px',
    '--font-size-sans-large': '16px',
    '--line-height-data': '22px'
  }
}; // HACK
//
// Sometimes the inline target is rendered before root styles are applied,
// which would result in e.g. NaN itemSize being passed to react-window list.

var COMFORTABLE_LINE_HEIGHT = parseInt(THEME_STYLES.comfortable['--line-height-data'], 10);
var COMPACT_LINE_HEIGHT = parseInt(THEME_STYLES.compact['--line-height-data'], 10);

;// CONCATENATED MODULE: ../react-devtools-timeline/src/constants.js
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var constants_REACT_TOTAL_NUM_LANES = 31; // Increment this number any time a backwards breaking change is made to the profiler metadata.

var constants_SCHEDULING_PROFILER_VERSION = 1;
var SNAPSHOT_MAX_HEIGHT = 60;
// EXTERNAL MODULE: ./src/backend/DevToolsFiberComponentStack.js + 2 modules
var DevToolsFiberComponentStack = __webpack_require__(672);
;// CONCATENATED MODULE: ./src/backend/profilingHooks.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */


 // Add padding to the start/stop time of the profile.
// This makes the UI nicer to use.

var TIME_OFFSET = 10;
var performanceTarget = null; // If performance exists and supports the subset of the User Timing API that we require.

var supportsUserTiming = typeof performance !== 'undefined' && // $FlowFixMe[method-unbinding]
typeof performance.mark === 'function' && // $FlowFixMe[method-unbinding]
typeof performance.clearMarks === 'function';
var supportsUserTimingV3 = false;

if (supportsUserTiming) {
  var CHECK_V3_MARK = '__v3';
  var markOptions = {};
  Object.defineProperty(markOptions, 'startTime', {
    get: function get() {
      supportsUserTimingV3 = true;
      return 0;
    },
    set: function set() {}
  });

  try {
    performance.mark(CHECK_V3_MARK, markOptions);
  } catch (error) {// Ignore
  } finally {
    performance.clearMarks(CHECK_V3_MARK);
  }
}

if (supportsUserTimingV3) {
  performanceTarget = performance;
} // Some environments (e.g. React Native / Hermes) don't support the performance API yet.


var getCurrentTime = // $FlowFixMe[method-unbinding]
(typeof performance === "undefined" ? "undefined" : _typeof(performance)) === 'object' && typeof performance.now === 'function' ? function () {
  return performance.now();
} : function () {
  return Date.now();
}; // Mocking the Performance Object (and User Timing APIs) for testing is fragile.
// This API allows tests to directly override the User Timing APIs.

function setPerformanceMock_ONLY_FOR_TESTING(performanceMock) {
  performanceTarget = performanceMock;
  supportsUserTiming = performanceMock !== null;
  supportsUserTimingV3 = performanceMock !== null;
}
function profilingHooks_createProfilingHooks(_ref) {
  var getDisplayNameForFiber = _ref.getDisplayNameForFiber,
      getIsProfiling = _ref.getIsProfiling,
      getLaneLabelMap = _ref.getLaneLabelMap,
      workTagMap = _ref.workTagMap,
      currentDispatcherRef = _ref.currentDispatcherRef,
      reactVersion = _ref.reactVersion;
  var currentBatchUID = 0;
  var currentReactComponentMeasure = null;
  var currentReactMeasuresStack = [];
  var currentTimelineData = null;
  var currentFiberStacks = new Map();
  var isProfiling = false;
  var nextRenderShouldStartNewBatch = false;

  function getRelativeTime() {
    var currentTime = getCurrentTime();

    if (currentTimelineData) {
      if (currentTimelineData.startTime === 0) {
        currentTimelineData.startTime = currentTime - TIME_OFFSET;
      }

      return currentTime - currentTimelineData.startTime;
    }

    return 0;
  }

  function getInternalModuleRanges() {
    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges === 'function') {
      // Ask the DevTools hook for module ranges that may have been reported by the current renderer(s).
      // Don't do this eagerly like the laneToLabelMap,
      // because some modules might not yet have registered their boundaries when the renderer is injected.
      var ranges = __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges(); // This check would not be required,
      // except that it's possible for things to override __REACT_DEVTOOLS_GLOBAL_HOOK__.


      if (isArray(ranges)) {
        return ranges;
      }
    }

    return null;
  }

  function getTimelineData() {
    return currentTimelineData;
  }

  function laneToLanesArray(lanes) {
    var lanesArray = [];
    var lane = 1;

    for (var index = 0; index < REACT_TOTAL_NUM_LANES; index++) {
      if (lane & lanes) {
        lanesArray.push(lane);
      }

      lane *= 2;
    }

    return lanesArray;
  }

  var laneToLabelMap = typeof getLaneLabelMap === 'function' ? getLaneLabelMap() : null;

  function markMetadata() {
    markAndClear("--react-version-".concat(reactVersion));
    markAndClear("--profiler-version-".concat(SCHEDULING_PROFILER_VERSION));
    var ranges = getInternalModuleRanges();

    if (ranges) {
      for (var i = 0; i < ranges.length; i++) {
        var range = ranges[i];

        if (isArray(range) && range.length === 2) {
          var _ranges$i = _slicedToArray(ranges[i], 2),
              startStackFrame = _ranges$i[0],
              stopStackFrame = _ranges$i[1];

          markAndClear("--react-internal-module-start-".concat(startStackFrame));
          markAndClear("--react-internal-module-stop-".concat(stopStackFrame));
        }
      }
    }

    if (laneToLabelMap != null) {
      var labels = Array.from(laneToLabelMap.values()).join(',');
      markAndClear("--react-lane-labels-".concat(labels));
    }
  }

  function markAndClear(markName) {
    // This method won't be called unless these functions are defined, so we can skip the extra typeof check.
    performanceTarget.mark(markName);
    performanceTarget.clearMarks(markName);
  }

  function recordReactMeasureStarted(type, lanes) {
    // Decide what depth thi work should be rendered at, based on what's on the top of the stack.
    // It's okay to render over top of "idle" work but everything else should be on its own row.
    var depth = 0;

    if (currentReactMeasuresStack.length > 0) {
      var top = currentReactMeasuresStack[currentReactMeasuresStack.length - 1];
      depth = top.type === 'render-idle' ? top.depth : top.depth + 1;
    }

    var lanesArray = laneToLanesArray(lanes);
    var reactMeasure = {
      type: type,
      batchUID: currentBatchUID,
      depth: depth,
      lanes: lanesArray,
      timestamp: getRelativeTime(),
      duration: 0
    };
    currentReactMeasuresStack.push(reactMeasure);

    if (currentTimelineData) {
      var _currentTimelineData = currentTimelineData,
          batchUIDToMeasuresMap = _currentTimelineData.batchUIDToMeasuresMap,
          laneToReactMeasureMap = _currentTimelineData.laneToReactMeasureMap;
      var reactMeasures = batchUIDToMeasuresMap.get(currentBatchUID);

      if (reactMeasures != null) {
        reactMeasures.push(reactMeasure);
      } else {
        batchUIDToMeasuresMap.set(currentBatchUID, [reactMeasure]);
      }

      lanesArray.forEach(function (lane) {
        reactMeasures = laneToReactMeasureMap.get(lane);

        if (reactMeasures) {
          reactMeasures.push(reactMeasure);
        }
      });
    }
  }

  function recordReactMeasureCompleted(type) {
    var currentTime = getRelativeTime();

    if (currentReactMeasuresStack.length === 0) {
      console.error('Unexpected type "%s" completed at %sms while currentReactMeasuresStack is empty.', type, currentTime); // Ignore work "completion" user timing mark that doesn't complete anything

      return;
    }

    var top = currentReactMeasuresStack.pop();

    if (top.type !== type) {
      console.error('Unexpected type "%s" completed at %sms before "%s" completed.', type, currentTime, top.type);
    } // $FlowFixMe[cannot-write] This property should not be writable outside of this function.


    top.duration = currentTime - top.timestamp;

    if (currentTimelineData) {
      currentTimelineData.duration = getRelativeTime() + TIME_OFFSET;
    }
  }

  function markCommitStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('commit', lanes); // TODO (timeline) Re-think this approach to "batching"; I don't think it works for Suspense or pre-rendering.
      // This issue applies to the User Timing data also.

      nextRenderShouldStartNewBatch = true;
    }

    if (supportsUserTimingV3) {
      markAndClear("--commit-start-".concat(lanes)); // Some metadata only needs to be logged once per session,
      // but if profiling information is being recorded via the Performance tab,
      // DevTools has no way of knowing when the recording starts.
      // Because of that, we log thie type of data periodically (once per commit).

      markMetadata();
    }
  }

  function markCommitStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('commit');
      recordReactMeasureCompleted('render-idle');
    }

    if (supportsUserTimingV3) {
      markAndClear('--commit-stop');
    }
  }

  function markComponentRenderStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'render',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-render-start-".concat(componentName));
      }
    }
  }

  function markComponentRenderStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-render-stop');
    }
  }

  function markComponentLayoutEffectMountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'layout-effect-mount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-layout-effect-mount-start-".concat(componentName));
      }
    }
  }

  function markComponentLayoutEffectMountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-layout-effect-mount-stop');
    }
  }

  function markComponentLayoutEffectUnmountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'layout-effect-unmount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-layout-effect-unmount-start-".concat(componentName));
      }
    }
  }

  function markComponentLayoutEffectUnmountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-layout-effect-unmount-stop');
    }
  }

  function markComponentPassiveEffectMountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'passive-effect-mount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-passive-effect-mount-start-".concat(componentName));
      }
    }
  }

  function markComponentPassiveEffectMountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-passive-effect-mount-stop');
    }
  }

  function markComponentPassiveEffectUnmountStarted(fiber) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (isProfiling) {
          currentReactComponentMeasure = {
            componentName: componentName,
            duration: 0,
            timestamp: getRelativeTime(),
            type: 'passive-effect-unmount',
            warning: null
          };
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--component-passive-effect-unmount-start-".concat(componentName));
      }
    }
  }

  function markComponentPassiveEffectUnmountStopped() {
    if (isProfiling) {
      if (currentReactComponentMeasure) {
        if (currentTimelineData) {
          currentTimelineData.componentMeasures.push(currentReactComponentMeasure);
        } // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentReactComponentMeasure.duration = // $FlowFixMe[incompatible-use] found when upgrading Flow
        getRelativeTime() - currentReactComponentMeasure.timestamp;
        currentReactComponentMeasure = null;
      }
    }

    if (supportsUserTimingV3) {
      markAndClear('--component-passive-effect-unmount-stop');
    }
  }

  function markComponentErrored(fiber, thrownValue, lanes) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';
      var phase = fiber.alternate === null ? 'mount' : 'update';
      var message = '';

      if (thrownValue !== null && _typeof(thrownValue) === 'object' && typeof thrownValue.message === 'string') {
        message = thrownValue.message;
      } else if (typeof thrownValue === 'string') {
        message = thrownValue;
      }

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          currentTimelineData.thrownErrors.push({
            componentName: componentName,
            message: message,
            phase: phase,
            timestamp: getRelativeTime(),
            type: 'thrown-error'
          });
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--error-".concat(componentName, "-").concat(phase, "-").concat(message));
      }
    }
  }

  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map; // $FlowFixMe[incompatible-type]: Flow cannot handle polymorphic WeakMaps

  var wakeableIDs = new PossiblyWeakMap();
  var wakeableID = 0;

  function getWakeableID(wakeable) {
    if (!wakeableIDs.has(wakeable)) {
      wakeableIDs.set(wakeable, wakeableID++);
    }

    return wakeableIDs.get(wakeable);
  }

  function markComponentSuspended(fiber, wakeable, lanes) {
    if (isProfiling || supportsUserTimingV3) {
      var eventType = wakeableIDs.has(wakeable) ? 'resuspend' : 'suspend';
      var id = getWakeableID(wakeable);
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';
      var phase = fiber.alternate === null ? 'mount' : 'update'; // Following the non-standard fn.displayName convention,
      // frameworks like Relay may also annotate Promises with a displayName,
      // describing what operation/data the thrown Promise is related to.
      // When this is available we should pass it along to the Timeline.

      var displayName = wakeable.displayName || '';
      var suspenseEvent = null;

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        suspenseEvent = {
          componentName: componentName,
          depth: 0,
          duration: 0,
          id: "".concat(id),
          phase: phase,
          promiseName: displayName,
          resolution: 'unresolved',
          timestamp: getRelativeTime(),
          type: 'suspense',
          warning: null
        };

        if (currentTimelineData) {
          currentTimelineData.suspenseEvents.push(suspenseEvent);
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--suspense-".concat(eventType, "-").concat(id, "-").concat(componentName, "-").concat(phase, "-").concat(lanes, "-").concat(displayName));
      }

      wakeable.then(function () {
        if (suspenseEvent) {
          suspenseEvent.duration = getRelativeTime() - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'resolved';
        }

        if (supportsUserTimingV3) {
          markAndClear("--suspense-resolved-".concat(id, "-").concat(componentName));
        }
      }, function () {
        if (suspenseEvent) {
          suspenseEvent.duration = getRelativeTime() - suspenseEvent.timestamp;
          suspenseEvent.resolution = 'rejected';
        }

        if (supportsUserTimingV3) {
          markAndClear("--suspense-rejected-".concat(id, "-").concat(componentName));
        }
      });
    }
  }

  function markLayoutEffectsStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('layout-effects', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear("--layout-effects-start-".concat(lanes));
    }
  }

  function markLayoutEffectsStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('layout-effects');
    }

    if (supportsUserTimingV3) {
      markAndClear('--layout-effects-stop');
    }
  }

  function markPassiveEffectsStarted(lanes) {
    if (isProfiling) {
      recordReactMeasureStarted('passive-effects', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear("--passive-effects-start-".concat(lanes));
    }
  }

  function markPassiveEffectsStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('passive-effects');
    }

    if (supportsUserTimingV3) {
      markAndClear('--passive-effects-stop');
    }
  }

  function markRenderStarted(lanes) {
    if (isProfiling) {
      if (nextRenderShouldStartNewBatch) {
        nextRenderShouldStartNewBatch = false;
        currentBatchUID++;
      } // If this is a new batch of work, wrap an "idle" measure around it.
      // Log it before the "render" measure to preserve the stack ordering.


      if (currentReactMeasuresStack.length === 0 || currentReactMeasuresStack[currentReactMeasuresStack.length - 1].type !== 'render-idle') {
        recordReactMeasureStarted('render-idle', lanes);
      }

      recordReactMeasureStarted('render', lanes);
    }

    if (supportsUserTimingV3) {
      markAndClear("--render-start-".concat(lanes));
    }
  }

  function markRenderYielded() {
    if (isProfiling) {
      recordReactMeasureCompleted('render');
    }

    if (supportsUserTimingV3) {
      markAndClear('--render-yield');
    }
  }

  function markRenderStopped() {
    if (isProfiling) {
      recordReactMeasureCompleted('render');
    }

    if (supportsUserTimingV3) {
      markAndClear('--render-stop');
    }
  }

  function markRenderScheduled(lane) {
    if (isProfiling) {
      if (currentTimelineData) {
        currentTimelineData.schedulingEvents.push({
          lanes: laneToLanesArray(lane),
          timestamp: getRelativeTime(),
          type: 'schedule-render',
          warning: null
        });
      }
    }

    if (supportsUserTimingV3) {
      markAndClear("--schedule-render-".concat(lane));
    }
  }

  function markForceUpdateScheduled(fiber, lane) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          currentTimelineData.schedulingEvents.push({
            componentName: componentName,
            lanes: laneToLanesArray(lane),
            timestamp: getRelativeTime(),
            type: 'schedule-force-update',
            warning: null
          });
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--schedule-forced-update-".concat(lane, "-").concat(componentName));
      }
    }
  }

  function getParentFibers(fiber) {
    var parents = [];
    var parent = fiber;

    while (parent !== null) {
      parents.push(parent);
      parent = parent.return;
    }

    return parents;
  }

  function markStateUpdateScheduled(fiber, lane) {
    if (isProfiling || supportsUserTimingV3) {
      var componentName = getDisplayNameForFiber(fiber) || 'Unknown';

      if (isProfiling) {
        // TODO (timeline) Record and cache component stack
        if (currentTimelineData) {
          var event = {
            componentName: componentName,
            // Store the parent fibers so we can post process
            // them after we finish profiling
            lanes: laneToLanesArray(lane),
            timestamp: getRelativeTime(),
            type: 'schedule-state-update',
            warning: null
          };
          currentFiberStacks.set(event, getParentFibers(fiber)); // $FlowFixMe[incompatible-use] found when upgrading Flow

          currentTimelineData.schedulingEvents.push(event);
        }
      }

      if (supportsUserTimingV3) {
        markAndClear("--schedule-state-update-".concat(lane, "-").concat(componentName));
      }
    }
  }

  function toggleProfilingStatus(value) {
    if (isProfiling !== value) {
      isProfiling = value;

      if (isProfiling) {
        var internalModuleSourceToRanges = new Map();

        if (supportsUserTimingV3) {
          var ranges = getInternalModuleRanges();

          if (ranges) {
            for (var i = 0; i < ranges.length; i++) {
              var range = ranges[i];

              if (isArray(range) && range.length === 2) {
                var _ranges$i2 = _slicedToArray(ranges[i], 2),
                    startStackFrame = _ranges$i2[0],
                    stopStackFrame = _ranges$i2[1];

                markAndClear("--react-internal-module-start-".concat(startStackFrame));
                markAndClear("--react-internal-module-stop-".concat(stopStackFrame));
              }
            }
          }
        }

        var laneToReactMeasureMap = new Map();
        var lane = 1;

        for (var index = 0; index < REACT_TOTAL_NUM_LANES; index++) {
          laneToReactMeasureMap.set(lane, []);
          lane *= 2;
        }

        currentBatchUID = 0;
        currentReactComponentMeasure = null;
        currentReactMeasuresStack = [];
        currentFiberStacks = new Map();
        currentTimelineData = {
          // Session wide metadata; only collected once.
          internalModuleSourceToRanges: internalModuleSourceToRanges,
          laneToLabelMap: laneToLabelMap || new Map(),
          reactVersion: reactVersion,
          // Data logged by React during profiling session.
          componentMeasures: [],
          schedulingEvents: [],
          suspenseEvents: [],
          thrownErrors: [],
          // Data inferred based on what React logs.
          batchUIDToMeasuresMap: new Map(),
          duration: 0,
          laneToReactMeasureMap: laneToReactMeasureMap,
          startTime: 0,
          // Data only available in Chrome profiles.
          flamechart: [],
          nativeEvents: [],
          networkMeasures: [],
          otherUserTimingMarks: [],
          snapshots: [],
          snapshotHeight: 0
        };
        nextRenderShouldStartNewBatch = true;
      } else {
        // Postprocess Profile data
        if (currentTimelineData !== null) {
          currentTimelineData.schedulingEvents.forEach(function (event) {
            if (event.type === 'schedule-state-update') {
              // TODO(luna): We can optimize this by creating a map of
              // fiber to component stack instead of generating the stack
              // for every fiber every time
              var fiberStack = currentFiberStacks.get(event);

              if (fiberStack && currentDispatcherRef != null) {
                event.componentStack = fiberStack.reduce(function (trace, fiber) {
                  return trace + describeFiber(workTagMap, fiber, currentDispatcherRef);
                }, '');
              }
            }
          });
        } // Clear the current fiber stacks so we don't hold onto the fibers
        // in memory after profiling finishes


        currentFiberStacks.clear();
      }
    }
  }

  return {
    getTimelineData: getTimelineData,
    profilingHooks: {
      markCommitStarted: markCommitStarted,
      markCommitStopped: markCommitStopped,
      markComponentRenderStarted: markComponentRenderStarted,
      markComponentRenderStopped: markComponentRenderStopped,
      markComponentPassiveEffectMountStarted: markComponentPassiveEffectMountStarted,
      markComponentPassiveEffectMountStopped: markComponentPassiveEffectMountStopped,
      markComponentPassiveEffectUnmountStarted: markComponentPassiveEffectUnmountStarted,
      markComponentPassiveEffectUnmountStopped: markComponentPassiveEffectUnmountStopped,
      markComponentLayoutEffectMountStarted: markComponentLayoutEffectMountStarted,
      markComponentLayoutEffectMountStopped: markComponentLayoutEffectMountStopped,
      markComponentLayoutEffectUnmountStarted: markComponentLayoutEffectUnmountStarted,
      markComponentLayoutEffectUnmountStopped: markComponentLayoutEffectUnmountStopped,
      markComponentErrored: markComponentErrored,
      markComponentSuspended: markComponentSuspended,
      markLayoutEffectsStarted: markLayoutEffectsStarted,
      markLayoutEffectsStopped: markLayoutEffectsStopped,
      markPassiveEffectsStarted: markPassiveEffectsStarted,
      markPassiveEffectsStopped: markPassiveEffectsStopped,
      markRenderStarted: markRenderStarted,
      markRenderYielded: markRenderYielded,
      markRenderStopped: markRenderStopped,
      markRenderScheduled: markRenderScheduled,
      markForceUpdateScheduled: markForceUpdateScheduled,
      markStateUpdateScheduled: markStateUpdateScheduled
    },
    toggleProfilingStatus: toggleProfilingStatus
  };
}
;// CONCATENATED MODULE: ./src/backend/renderer.js
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function renderer_slicedToArray(arr, i) { return renderer_arrayWithHoles(arr) || renderer_iterableToArrayLimit(arr, i) || renderer_unsupportedIterableToArray(arr, i) || renderer_nonIterableRest(); }

function renderer_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function renderer_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function renderer_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || renderer_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return renderer_arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = renderer_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function renderer_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return renderer_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return renderer_arrayLikeToArray(o, minLen); }

function renderer_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function renderer_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { renderer_typeof = function _typeof(obj) { return typeof obj; }; } else { renderer_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return renderer_typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
















function getDispatcherRef(renderer) {
  if (renderer.currentDispatcherRef === undefined) {
    return undefined;
  }

  var injectedRef = renderer.currentDispatcherRef;

  if (typeof injectedRef.H === 'undefined' && typeof injectedRef.current !== 'undefined') {
    // We got a legacy dispatcher injected, let's create a wrapper proxy to translate.
    return {
      get H() {
        return injectedRef.current;
      },

      set H(value) {
        injectedRef.current = value;
      }

    };
  }

  return injectedRef;
}

function getFiberFlags(fiber) {
  // The name of this field changed from "effectTag" to "flags"
  return fiber.flags !== undefined ? fiber.flags : fiber.effectTag;
} // Some environments (e.g. React Native / Hermes) don't support the performance API yet.


var renderer_getCurrentTime = // $FlowFixMe[method-unbinding]
(typeof performance === "undefined" ? "undefined" : renderer_typeof(performance)) === 'object' && typeof performance.now === 'function' ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
function getInternalReactConstants(version) {
  // **********************************************************
  // The section below is copied from files in React repo.
  // Keep it in sync, and add version guards if it changes.
  //
  // Technically these priority levels are invalid for versions before 16.9,
  // but 16.9 is the first version to report priority level to DevTools,
  // so we can avoid checking for earlier versions and support pre-16.9 canary releases in the process.
  var ReactPriorityLevels = {
    ImmediatePriority: 99,
    UserBlockingPriority: 98,
    NormalPriority: 97,
    LowPriority: 96,
    IdlePriority: 95,
    NoPriority: 90
  };

  if ((0,backend_utils.gt)(version, '17.0.2')) {
    ReactPriorityLevels = {
      ImmediatePriority: 1,
      UserBlockingPriority: 2,
      NormalPriority: 3,
      LowPriority: 4,
      IdlePriority: 5,
      NoPriority: 0
    };
  }

  var StrictModeBits = 0;

  if ((0,backend_utils/* gte */.eg)(version, '18.0.0-alpha')) {
    // 18+
    StrictModeBits = 24;
  } else if ((0,backend_utils/* gte */.eg)(version, '16.9.0')) {
    // 16.9 - 17
    StrictModeBits = 1;
  } else if ((0,backend_utils/* gte */.eg)(version, '16.3.0')) {
    // 16.3 - 16.8
    StrictModeBits = 2;
  }

  var ReactTypeOfWork = null; // **********************************************************
  // The section below is copied from files in React repo.
  // Keep it in sync, and add version guards if it changes.
  //
  // TODO Update the gt() check below to be gte() whichever the next version number is.
  // Currently the version in Git is 17.0.2 (but that version has not been/may not end up being released).

  if ((0,backend_utils.gt)(version, '17.0.1')) {
    ReactTypeOfWork = {
      CacheComponent: 24,
      // Experimental
      ClassComponent: 1,
      ContextConsumer: 9,
      ContextProvider: 10,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: 18,
      // Behind a flag
      ForwardRef: 11,
      Fragment: 7,
      FunctionComponent: 0,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: 26,
      // In reality, 18.2+. But doesn't hurt to include it here
      HostSingleton: 27,
      // Same as above
      HostText: 6,
      IncompleteClassComponent: 17,
      IncompleteFunctionComponent: 28,
      IndeterminateComponent: 2,
      // removed in 19.0.0
      LazyComponent: 16,
      LegacyHiddenComponent: 23,
      MemoComponent: 14,
      Mode: 8,
      OffscreenComponent: 22,
      // Experimental
      Profiler: 12,
      ScopeComponent: 21,
      // Experimental
      SimpleMemoComponent: 15,
      SuspenseComponent: 13,
      SuspenseListComponent: 19,
      // Experimental
      TracingMarkerComponent: 25,
      // Experimental - This is technically in 18 but we don't
      // want to fork again so we're adding it here instead
      YieldComponent: -1 // Removed

    };
  } else if ((0,backend_utils/* gte */.eg)(version, '17.0.0-alpha')) {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 1,
      ContextConsumer: 9,
      ContextProvider: 10,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: 18,
      // Behind a flag
      ForwardRef: 11,
      Fragment: 7,
      FunctionComponent: 0,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 6,
      IncompleteClassComponent: 17,
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 2,
      LazyComponent: 16,
      LegacyHiddenComponent: 24,
      MemoComponent: 14,
      Mode: 8,
      OffscreenComponent: 23,
      // Experimental
      Profiler: 12,
      ScopeComponent: 21,
      // Experimental
      SimpleMemoComponent: 15,
      SuspenseComponent: 13,
      SuspenseListComponent: 19,
      // Experimental
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: -1 // Removed

    };
  } else if ((0,backend_utils/* gte */.eg)(version, '16.6.0-beta.0')) {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 1,
      ContextConsumer: 9,
      ContextProvider: 10,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: 18,
      // Behind a flag
      ForwardRef: 11,
      Fragment: 7,
      FunctionComponent: 0,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 6,
      IncompleteClassComponent: 17,
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 2,
      LazyComponent: 16,
      LegacyHiddenComponent: -1,
      MemoComponent: 14,
      Mode: 8,
      OffscreenComponent: -1,
      // Experimental
      Profiler: 12,
      ScopeComponent: -1,
      // Experimental
      SimpleMemoComponent: 15,
      SuspenseComponent: 13,
      SuspenseListComponent: 19,
      // Experimental
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: -1 // Removed

    };
  } else if ((0,backend_utils/* gte */.eg)(version, '16.4.3-alpha')) {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 2,
      ContextConsumer: 11,
      ContextProvider: 12,
      CoroutineComponent: -1,
      // Removed
      CoroutineHandlerPhase: -1,
      // Removed
      DehydratedSuspenseComponent: -1,
      // Doesn't exist yet
      ForwardRef: 13,
      Fragment: 9,
      FunctionComponent: 0,
      HostComponent: 7,
      HostPortal: 6,
      HostRoot: 5,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 8,
      IncompleteClassComponent: -1,
      // Doesn't exist yet
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 4,
      LazyComponent: -1,
      // Doesn't exist yet
      LegacyHiddenComponent: -1,
      MemoComponent: -1,
      // Doesn't exist yet
      Mode: 10,
      OffscreenComponent: -1,
      // Experimental
      Profiler: 15,
      ScopeComponent: -1,
      // Experimental
      SimpleMemoComponent: -1,
      // Doesn't exist yet
      SuspenseComponent: 16,
      SuspenseListComponent: -1,
      // Doesn't exist yet
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: -1 // Removed

    };
  } else {
    ReactTypeOfWork = {
      CacheComponent: -1,
      // Doesn't exist yet
      ClassComponent: 2,
      ContextConsumer: 12,
      ContextProvider: 13,
      CoroutineComponent: 7,
      CoroutineHandlerPhase: 8,
      DehydratedSuspenseComponent: -1,
      // Doesn't exist yet
      ForwardRef: 14,
      Fragment: 10,
      FunctionComponent: 1,
      HostComponent: 5,
      HostPortal: 4,
      HostRoot: 3,
      HostHoistable: -1,
      // Doesn't exist yet
      HostSingleton: -1,
      // Doesn't exist yet
      HostText: 6,
      IncompleteClassComponent: -1,
      // Doesn't exist yet
      IncompleteFunctionComponent: -1,
      // Doesn't exist yet
      IndeterminateComponent: 0,
      LazyComponent: -1,
      // Doesn't exist yet
      LegacyHiddenComponent: -1,
      MemoComponent: -1,
      // Doesn't exist yet
      Mode: 11,
      OffscreenComponent: -1,
      // Experimental
      Profiler: 15,
      ScopeComponent: -1,
      // Experimental
      SimpleMemoComponent: -1,
      // Doesn't exist yet
      SuspenseComponent: 16,
      SuspenseListComponent: -1,
      // Doesn't exist yet
      TracingMarkerComponent: -1,
      // Doesn't exist yet
      YieldComponent: 9
    };
  } // **********************************************************
  // End of copied code.
  // **********************************************************


  function getTypeSymbol(type) {
    var symbolOrNumber = renderer_typeof(type) === 'object' && type !== null ? type.$$typeof : type;
    return renderer_typeof(symbolOrNumber) === 'symbol' ? // $FlowFixMe[incompatible-return] `toString()` doesn't match the type signature?
    symbolOrNumber.toString() : symbolOrNumber;
  }

  var _ReactTypeOfWork = ReactTypeOfWork,
      CacheComponent = _ReactTypeOfWork.CacheComponent,
      ClassComponent = _ReactTypeOfWork.ClassComponent,
      IncompleteClassComponent = _ReactTypeOfWork.IncompleteClassComponent,
      IncompleteFunctionComponent = _ReactTypeOfWork.IncompleteFunctionComponent,
      FunctionComponent = _ReactTypeOfWork.FunctionComponent,
      IndeterminateComponent = _ReactTypeOfWork.IndeterminateComponent,
      ForwardRef = _ReactTypeOfWork.ForwardRef,
      HostRoot = _ReactTypeOfWork.HostRoot,
      HostHoistable = _ReactTypeOfWork.HostHoistable,
      HostSingleton = _ReactTypeOfWork.HostSingleton,
      HostComponent = _ReactTypeOfWork.HostComponent,
      HostPortal = _ReactTypeOfWork.HostPortal,
      HostText = _ReactTypeOfWork.HostText,
      Fragment = _ReactTypeOfWork.Fragment,
      LazyComponent = _ReactTypeOfWork.LazyComponent,
      LegacyHiddenComponent = _ReactTypeOfWork.LegacyHiddenComponent,
      MemoComponent = _ReactTypeOfWork.MemoComponent,
      OffscreenComponent = _ReactTypeOfWork.OffscreenComponent,
      Profiler = _ReactTypeOfWork.Profiler,
      ScopeComponent = _ReactTypeOfWork.ScopeComponent,
      SimpleMemoComponent = _ReactTypeOfWork.SimpleMemoComponent,
      SuspenseComponent = _ReactTypeOfWork.SuspenseComponent,
      SuspenseListComponent = _ReactTypeOfWork.SuspenseListComponent,
      TracingMarkerComponent = _ReactTypeOfWork.TracingMarkerComponent;

  function resolveFiberType(type) {
    var typeSymbol = getTypeSymbol(type);

    switch (typeSymbol) {
      case MEMO_NUMBER:
      case MEMO_SYMBOL_STRING:
        // recursively resolving memo type in case of memo(forwardRef(Component))
        return resolveFiberType(type.type);

      case FORWARD_REF_NUMBER:
      case FORWARD_REF_SYMBOL_STRING:
        return type.render;

      default:
        return type;
    }
  } // NOTICE Keep in sync with shouldFilterFiber() and other get*ForFiber methods


  function getDisplayNameForFiber(fiber) {
    var _fiber$updateQueue, _fiber$memoizedState, _fiber$memoizedState$;

    var shouldSkipForgetCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var elementType = fiber.elementType,
        type = fiber.type,
        tag = fiber.tag;
    var resolvedType = type;

    if (renderer_typeof(type) === 'object' && type !== null) {
      resolvedType = resolveFiberType(type);
    }

    var resolvedContext = null;

    if (!shouldSkipForgetCheck && ( // $FlowFixMe[incompatible-type] fiber.updateQueue is mixed
    ((_fiber$updateQueue = fiber.updateQueue) === null || _fiber$updateQueue === void 0 ? void 0 : _fiber$updateQueue.memoCache) != null || ((_fiber$memoizedState = fiber.memoizedState) === null || _fiber$memoizedState === void 0 ? void 0 : (_fiber$memoizedState$ = _fiber$memoizedState.memoizedState) === null || _fiber$memoizedState$ === void 0 ? void 0 : _fiber$memoizedState$[REACT_MEMO_CACHE_SENTINEL]))) {
      var displayNameWithoutForgetWrapper = getDisplayNameForFiber(fiber, true);

      if (displayNameWithoutForgetWrapper == null) {
        return null;
      }

      return "Forget(".concat(displayNameWithoutForgetWrapper, ")");
    }

    switch (tag) {
      case CacheComponent:
        return 'Cache';

      case ClassComponent:
      case IncompleteClassComponent:
      case IncompleteFunctionComponent:
      case FunctionComponent:
      case IndeterminateComponent:
        return (0,utils/* getDisplayName */.Gf)(resolvedType);

      case ForwardRef:
        return (0,utils/* getWrappedDisplayName */.z6)(elementType, resolvedType, 'ForwardRef', 'Anonymous');

      case HostRoot:
        var fiberRoot = fiber.stateNode;

        if (fiberRoot != null && fiberRoot._debugRootType !== null) {
          return fiberRoot._debugRootType;
        }

        return null;

      case HostComponent:
      case HostSingleton:
      case HostHoistable:
        return type;

      case HostPortal:
      case HostText:
        return null;

      case Fragment:
        return 'Fragment';

      case LazyComponent:
        // This display name will not be user visible.
        // Once a Lazy component loads its inner component, React replaces the tag and type.
        // This display name will only show up in console logs when DevTools DEBUG mode is on.
        return 'Lazy';

      case MemoComponent:
      case SimpleMemoComponent:
        // Display name in React does not use `Memo` as a wrapper but fallback name.
        return (0,utils/* getWrappedDisplayName */.z6)(elementType, resolvedType, 'Memo', 'Anonymous');

      case SuspenseComponent:
        return 'Suspense';

      case LegacyHiddenComponent:
        return 'LegacyHidden';

      case OffscreenComponent:
        return 'Offscreen';

      case ScopeComponent:
        return 'Scope';

      case SuspenseListComponent:
        return 'SuspenseList';

      case Profiler:
        return 'Profiler';

      case TracingMarkerComponent:
        return 'TracingMarker';

      default:
        var typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case ReactSymbols_CONCURRENT_MODE_NUMBER:
          case ReactSymbols_CONCURRENT_MODE_SYMBOL_STRING:
          case ReactSymbols_DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
            return null;

          case ReactSymbols_PROVIDER_NUMBER:
          case ReactSymbols_PROVIDER_SYMBOL_STRING:
            // 16.3.0 exposed the context object as "context"
            // PR #12501 changed it to "_context" for 16.3.1+
            // NOTE Keep in sync with inspectElementRaw()
            resolvedContext = fiber.type._context || fiber.type.context;
            return "".concat(resolvedContext.displayName || 'Context', ".Provider");

          case ReactSymbols_CONTEXT_NUMBER:
          case ReactSymbols_CONTEXT_SYMBOL_STRING:
          case SERVER_CONTEXT_SYMBOL_STRING:
            if (fiber.type._context === undefined && fiber.type.Provider === fiber.type) {
              // In 19+, Context.Provider === Context, so this is a provider.
              resolvedContext = fiber.type;
              return "".concat(resolvedContext.displayName || 'Context', ".Provider");
            } // 16.3-16.5 read from "type" because the Consumer is the actual context object.
            // 16.6+ should read from "type._context" because Consumer can be different (in DEV).
            // NOTE Keep in sync with inspectElementRaw()


            resolvedContext = fiber.type._context || fiber.type; // NOTE: TraceUpdatesBackendManager depends on the name ending in '.Consumer'
            // If you change the name, figure out a more resilient way to detect it.

            return "".concat(resolvedContext.displayName || 'Context', ".Consumer");

          case ReactSymbols_CONSUMER_SYMBOL_STRING:
            // 19+
            resolvedContext = fiber.type._context;
            return "".concat(resolvedContext.displayName || 'Context', ".Consumer");

          case ReactSymbols_STRICT_MODE_NUMBER:
          case ReactSymbols_STRICT_MODE_SYMBOL_STRING:
            return null;

          case ReactSymbols_PROFILER_NUMBER:
          case ReactSymbols_PROFILER_SYMBOL_STRING:
            return "Profiler(".concat(fiber.memoizedProps.id, ")");

          case SCOPE_NUMBER:
          case SCOPE_SYMBOL_STRING:
            return 'Scope';

          default:
            // Unknown element type.
            // This may mean a new element type that has not yet been added to DevTools.
            return null;
        }

    }
  }

  return {
    getDisplayNameForFiber: getDisplayNameForFiber,
    getTypeSymbol: getTypeSymbol,
    ReactPriorityLevels: ReactPriorityLevels,
    ReactTypeOfWork: ReactTypeOfWork,
    StrictModeBits: StrictModeBits
  };
} // Map of one or more Fibers in a pair to their unique id number.
// We track both Fibers to support Fast Refresh,
// which may forcefully replace one of the pair as part of hot reloading.
// In that case it's still important to be able to locate the previous ID during subsequent renders.

var fiberToIDMap = new Map(); // Map of id to one (arbitrary) Fiber in a pair.
// This Map is used to e.g. get the display name for a Fiber or schedule an update,
// operations that should be the same whether the current and work-in-progress Fiber is used.

var idToArbitraryFiberMap = new Map();
var fiberToComponentStackMap = new WeakMap();
function attach(hook, rendererID, renderer, global) {
  // Newer versions of the reconciler package also specific reconciler version.
  // If that version number is present, use it.
  // Third party renderer versions may not match the reconciler version,
  // and the latter is what's important in terms of tags and symbols.
  var version = renderer.reconcilerVersion || renderer.version;

  var _getInternalReactCons = getInternalReactConstants(version),
      getDisplayNameForFiber = _getInternalReactCons.getDisplayNameForFiber,
      getTypeSymbol = _getInternalReactCons.getTypeSymbol,
      ReactPriorityLevels = _getInternalReactCons.ReactPriorityLevels,
      ReactTypeOfWork = _getInternalReactCons.ReactTypeOfWork,
      StrictModeBits = _getInternalReactCons.StrictModeBits;

  var CacheComponent = ReactTypeOfWork.CacheComponent,
      ClassComponent = ReactTypeOfWork.ClassComponent,
      ContextConsumer = ReactTypeOfWork.ContextConsumer,
      DehydratedSuspenseComponent = ReactTypeOfWork.DehydratedSuspenseComponent,
      ForwardRef = ReactTypeOfWork.ForwardRef,
      Fragment = ReactTypeOfWork.Fragment,
      FunctionComponent = ReactTypeOfWork.FunctionComponent,
      HostRoot = ReactTypeOfWork.HostRoot,
      HostHoistable = ReactTypeOfWork.HostHoistable,
      HostSingleton = ReactTypeOfWork.HostSingleton,
      HostPortal = ReactTypeOfWork.HostPortal,
      HostComponent = ReactTypeOfWork.HostComponent,
      HostText = ReactTypeOfWork.HostText,
      IncompleteClassComponent = ReactTypeOfWork.IncompleteClassComponent,
      IncompleteFunctionComponent = ReactTypeOfWork.IncompleteFunctionComponent,
      IndeterminateComponent = ReactTypeOfWork.IndeterminateComponent,
      LegacyHiddenComponent = ReactTypeOfWork.LegacyHiddenComponent,
      MemoComponent = ReactTypeOfWork.MemoComponent,
      OffscreenComponent = ReactTypeOfWork.OffscreenComponent,
      SimpleMemoComponent = ReactTypeOfWork.SimpleMemoComponent,
      SuspenseComponent = ReactTypeOfWork.SuspenseComponent,
      SuspenseListComponent = ReactTypeOfWork.SuspenseListComponent,
      TracingMarkerComponent = ReactTypeOfWork.TracingMarkerComponent;
  var ImmediatePriority = ReactPriorityLevels.ImmediatePriority,
      UserBlockingPriority = ReactPriorityLevels.UserBlockingPriority,
      NormalPriority = ReactPriorityLevels.NormalPriority,
      LowPriority = ReactPriorityLevels.LowPriority,
      IdlePriority = ReactPriorityLevels.IdlePriority,
      NoPriority = ReactPriorityLevels.NoPriority;
  var getLaneLabelMap = renderer.getLaneLabelMap,
      injectProfilingHooks = renderer.injectProfilingHooks,
      overrideHookState = renderer.overrideHookState,
      overrideHookStateDeletePath = renderer.overrideHookStateDeletePath,
      overrideHookStateRenamePath = renderer.overrideHookStateRenamePath,
      overrideProps = renderer.overrideProps,
      overridePropsDeletePath = renderer.overridePropsDeletePath,
      overridePropsRenamePath = renderer.overridePropsRenamePath,
      scheduleRefresh = renderer.scheduleRefresh,
      setErrorHandler = renderer.setErrorHandler,
      setSuspenseHandler = renderer.setSuspenseHandler,
      scheduleUpdate = renderer.scheduleUpdate;
  var supportsTogglingError = typeof setErrorHandler === 'function' && typeof scheduleUpdate === 'function';
  var supportsTogglingSuspense = typeof setSuspenseHandler === 'function' && typeof scheduleUpdate === 'function';

  if (typeof scheduleRefresh === 'function') {
    // When Fast Refresh updates a component, the frontend may need to purge cached information.
    // For example, ASTs cached for the component (for named hooks) may no longer be valid.
    // Send a signal to the frontend to purge this cached information.
    // The "fastRefreshScheduled" dispatched is global (not Fiber or even Renderer specific).
    // This is less effecient since it means the front-end will need to purge the entire cache,
    // but this is probably an okay trade off in order to reduce coupling between the DevTools and Fast Refresh.
    renderer.scheduleRefresh = function () {
      try {
        hook.emit('fastRefreshScheduled');
      } finally {
        return scheduleRefresh.apply(void 0, arguments);
      }
    };
  }

  var getTimelineData = null;
  var toggleProfilingStatus = null;

  if (typeof injectProfilingHooks === 'function') {
    var response = createProfilingHooks({
      getDisplayNameForFiber: getDisplayNameForFiber,
      getIsProfiling: function getIsProfiling() {
        return isProfiling;
      },
      getLaneLabelMap: getLaneLabelMap,
      currentDispatcherRef: getDispatcherRef(renderer),
      workTagMap: ReactTypeOfWork,
      reactVersion: version
    }); // Pass the Profiling hooks to the reconciler for it to call during render.

    injectProfilingHooks(response.profilingHooks); // Hang onto this toggle so we can notify the external methods of profiling status changes.

    getTimelineData = response.getTimelineData;
    toggleProfilingStatus = response.toggleProfilingStatus;
  } // Tracks Fibers with recently changed number of error/warning messages.
  // These collections store the Fiber rather than the ID,
  // in order to avoid generating an ID for Fibers that never get mounted
  // (due to e.g. Suspense or error boundaries).
  // onErrorOrWarning() adds Fibers and recordPendingErrorsAndWarnings() later clears them.


  var fibersWithChangedErrorOrWarningCounts = new Set();
  var pendingFiberToErrorsMap = new Map();
  var pendingFiberToWarningsMap = new Map(); // Mapping of fiber IDs to error/warning messages and counts.

  var fiberIDToErrorsMap = new Map();
  var fiberIDToWarningsMap = new Map();

  function clearErrorsAndWarnings() {
    // eslint-disable-next-line no-for-of-loops/no-for-of-loops
    var _iterator = _createForOfIteratorHelper(fiberIDToErrorsMap.keys()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var id = _step.value;

        var _fiber = idToArbitraryFiberMap.get(id);

        if (_fiber != null) {
          fibersWithChangedErrorOrWarningCounts.add(_fiber);
          updateMostRecentlyInspectedElementIfNecessary(id);
        }
      } // eslint-disable-next-line no-for-of-loops/no-for-of-loops

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = _createForOfIteratorHelper(fiberIDToWarningsMap.keys()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _id = _step2.value;

        var _fiber2 = idToArbitraryFiberMap.get(_id);

        if (_fiber2 != null) {
          fibersWithChangedErrorOrWarningCounts.add(_fiber2);
          updateMostRecentlyInspectedElementIfNecessary(_id);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    fiberIDToErrorsMap.clear();
    fiberIDToWarningsMap.clear();
    flushPendingEvents();
  }

  function clearMessageCountHelper(fiberID, pendingFiberToMessageCountMap, fiberIDToMessageCountMap) {
    var fiber = idToArbitraryFiberMap.get(fiberID);

    if (fiber != null) {
      // Throw out any pending changes.
      pendingFiberToErrorsMap.delete(fiber);

      if (fiberIDToMessageCountMap.has(fiberID)) {
        fiberIDToMessageCountMap.delete(fiberID); // If previous flushed counts have changed, schedule an update too.

        fibersWithChangedErrorOrWarningCounts.add(fiber);
        flushPendingEvents();
        updateMostRecentlyInspectedElementIfNecessary(fiberID);
      } else {
        fibersWithChangedErrorOrWarningCounts.delete(fiber);
      }
    }
  }

  function clearErrorsForFiberID(fiberID) {
    clearMessageCountHelper(fiberID, pendingFiberToErrorsMap, fiberIDToErrorsMap);
  }

  function clearWarningsForFiberID(fiberID) {
    clearMessageCountHelper(fiberID, pendingFiberToWarningsMap, fiberIDToWarningsMap);
  }

  function updateMostRecentlyInspectedElementIfNecessary(fiberID) {
    if (mostRecentlyInspectedElement !== null && mostRecentlyInspectedElement.id === fiberID) {
      hasElementUpdatedSinceLastInspected = true;
    }
  } // Called when an error or warning is logged during render, commit, or passive (including unmount functions).


  function onErrorOrWarning(fiber, type, args) {
    if (type === 'error') {
      var maybeID = getFiberIDUnsafe(fiber); // if this is an error simulated by us to trigger error boundary, ignore

      if (maybeID != null && forceErrorForFiberIDs.get(maybeID) === true) {
        return;
      }
    }

    var message = format.apply(void 0, _toConsumableArray(args));

    if (__DEBUG__) {
      debug('onErrorOrWarning', fiber, null, "".concat(type, ": \"").concat(message, "\""));
    } // Mark this Fiber as needed its warning/error count updated during the next flush.


    fibersWithChangedErrorOrWarningCounts.add(fiber); // Track the warning/error for later.

    var fiberMap = type === 'error' ? pendingFiberToErrorsMap : pendingFiberToWarningsMap;
    var messageMap = fiberMap.get(fiber);

    if (messageMap != null) {
      var count = messageMap.get(message) || 0;
      messageMap.set(message, count + 1);
    } else {
      fiberMap.set(fiber, new Map([[message, 1]]));
    } // Passive effects may trigger errors or warnings too;
    // In this case, we should wait until the rest of the passive effects have run,
    // but we shouldn't wait until the next commit because that might be a long time.
    // This would also cause "tearing" between an inspected Component and the tree view.
    // Then again we don't want to flush too soon because this could be an error during async rendering.
    // Use a debounce technique to ensure that we'll eventually flush.


    flushPendingErrorsAndWarningsAfterDelay();
  } // Patching the console enables DevTools to do a few useful things:
  // * Append component stacks to warnings and error messages
  // * Disable logging during re-renders to inspect hooks (see inspectHooksOfFiber)


  registerRendererWithConsole(renderer, onErrorOrWarning); // The renderer interface can't read these preferences directly,
  // because it is stored in localStorage within the context of the extension.
  // It relies on the extension to pass the preference through via the global.

  patchConsoleUsingWindowValues();

  var debug = function debug(name, fiber, parentFiber) {
    var extraString = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

    if (__DEBUG__) {
      var displayName = fiber.tag + ':' + (getDisplayNameForFiber(fiber) || 'null');
      var maybeID = getFiberIDUnsafe(fiber) || '<no id>';
      var parentDisplayName = parentFiber ? parentFiber.tag + ':' + (getDisplayNameForFiber(parentFiber) || 'null') : '';
      var maybeParentID = parentFiber ? getFiberIDUnsafe(parentFiber) || '<no-id>' : '';
      console.groupCollapsed("[renderer] %c".concat(name, " %c").concat(displayName, " (").concat(maybeID, ") %c").concat(parentFiber ? "".concat(parentDisplayName, " (").concat(maybeParentID, ")") : '', " %c").concat(extraString), 'color: red; font-weight: bold;', 'color: blue;', 'color: purple;', 'color: black;');
      console.log(new Error().stack.split('\n').slice(1).join('\n'));
      console.groupEnd();
    }
  }; // Configurable Components tree filters.


  var hideElementsWithDisplayNames = new Set();
  var hideElementsWithPaths = new Set();
  var hideElementsWithTypes = new Set(); // Highlight updates

  var traceUpdatesEnabled = false;
  var traceUpdatesForNodes = new Set();

  function applyComponentFilters(componentFilters) {
    hideElementsWithTypes.clear();
    hideElementsWithDisplayNames.clear();
    hideElementsWithPaths.clear();
    componentFilters.forEach(function (componentFilter) {
      if (!componentFilter.isEnabled) {
        return;
      }

      switch (componentFilter.type) {
        case ComponentFilterDisplayName:
          if (componentFilter.isValid && componentFilter.value !== '') {
            hideElementsWithDisplayNames.add(new RegExp(componentFilter.value, 'i'));
          }

          break;

        case ComponentFilterElementType:
          hideElementsWithTypes.add(componentFilter.value);
          break;

        case ComponentFilterLocation:
          if (componentFilter.isValid && componentFilter.value !== '') {
            hideElementsWithPaths.add(new RegExp(componentFilter.value, 'i'));
          }

          break;

        case ComponentFilterHOC:
          hideElementsWithDisplayNames.add(new RegExp('\\('));
          break;

        default:
          console.warn("Invalid component filter type \"".concat(componentFilter.type, "\""));
          break;
      }
    });
  } // The renderer interface can't read saved component filters directly,
  // because they are stored in localStorage within the context of the extension.
  // Instead it relies on the extension to pass filters through.


  if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ != null) {
    var componentFiltersWithoutLocationBasedOnes = filterOutLocationComponentFilters(window.__REACT_DEVTOOLS_COMPONENT_FILTERS__);
    applyComponentFilters(componentFiltersWithoutLocationBasedOnes);
  } else {
    // Unfortunately this feature is not expected to work for React Native for now.
    // It would be annoying for us to spam YellowBox warnings with unactionable stuff,
    // so for now just skip this message...
    //console.warn('⚛️ DevTools: Could not locate saved component filters');
    // Fallback to assuming the default filters in this case.
    applyComponentFilters(getDefaultComponentFilters());
  } // If necessary, we can revisit optimizing this operation.
  // For example, we could add a new recursive unmount tree operation.
  // The unmount operations are already significantly smaller than mount operations though.
  // This is something to keep in mind for later.


  function updateComponentFilters(componentFilters) {
    if (isProfiling) {
      // Re-mounting a tree while profiling is in progress might break a lot of assumptions.
      // If necessary, we could support this- but it doesn't seem like a necessary use case.
      throw Error('Cannot modify filter preferences while profiling');
    } // Recursively unmount all roots.


    hook.getFiberRoots(rendererID).forEach(function (root) {
      currentRootID = getOrGenerateFiberID(root.current); // The TREE_OPERATION_REMOVE_ROOT operation serves two purposes:
      // 1. It avoids sending unnecessary bridge traffic to clear a root.
      // 2. It preserves Fiber IDs when remounting (below) which in turn ID to error/warning mapping.

      pushOperation(TREE_OPERATION_REMOVE_ROOT);
      flushPendingEvents(root);
      currentRootID = -1;
    });
    applyComponentFilters(componentFilters); // Reset pseudo counters so that new path selections will be persisted.

    rootDisplayNameCounter.clear(); // Recursively re-mount all roots with new filter criteria applied.

    hook.getFiberRoots(rendererID).forEach(function (root) {
      currentRootID = getOrGenerateFiberID(root.current);
      setRootPseudoKey(currentRootID, root.current);
      mountFiberRecursively(root.current, null, false, false);
      flushPendingEvents(root);
      currentRootID = -1;
    }); // Also re-evaluate all error and warning counts given the new filters.

    reevaluateErrorsAndWarnings();
    flushPendingEvents();
  } // NOTICE Keep in sync with get*ForFiber methods


  function shouldFilterFiber(fiber) {
    var tag = fiber.tag,
        type = fiber.type,
        key = fiber.key;

    switch (tag) {
      case DehydratedSuspenseComponent:
        // TODO: ideally we would show dehydrated Suspense immediately.
        // However, it has some special behavior (like disconnecting
        // an alternate and turning into real Suspense) which breaks DevTools.
        // For now, ignore it, and only show it once it gets hydrated.
        // https://github.com/bvaughn/react-devtools-experimental/issues/197
        return true;

      case HostPortal:
      case HostText:
      case LegacyHiddenComponent:
      case OffscreenComponent:
        return true;

      case HostRoot:
        // It is never valid to filter the root element.
        return false;

      case Fragment:
        return key === null;

      default:
        var typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case CONCURRENT_MODE_NUMBER:
          case CONCURRENT_MODE_SYMBOL_STRING:
          case DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
          case STRICT_MODE_NUMBER:
          case STRICT_MODE_SYMBOL_STRING:
            return true;

          default:
            break;
        }

    }

    var elementType = getElementTypeForFiber(fiber);

    if (hideElementsWithTypes.has(elementType)) {
      return true;
    }

    if (hideElementsWithDisplayNames.size > 0) {
      var displayName = getDisplayNameForFiber(fiber);

      if (displayName != null) {
        // eslint-disable-next-line no-for-of-loops/no-for-of-loops
        var _iterator3 = _createForOfIteratorHelper(hideElementsWithDisplayNames),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var displayNameRegExp = _step3.value;

            if (displayNameRegExp.test(displayName)) {
              return true;
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    }
    /* DISABLED: https://github.com/facebook/react/pull/28417
    if (hideElementsWithPaths.size > 0) {
      const source = getSourceForFiber(fiber);
       if (source != null) {
        const {fileName} = source;
        // eslint-disable-next-line no-for-of-loops/no-for-of-loops
        for (const pathRegExp of hideElementsWithPaths) {
          if (pathRegExp.test(fileName)) {
            return true;
          }
        }
      }
    }
    */


    return false;
  } // NOTICE Keep in sync with shouldFilterFiber() and other get*ForFiber methods


  function getElementTypeForFiber(fiber) {
    var type = fiber.type,
        tag = fiber.tag;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
        return ElementTypeClass;

      case IncompleteFunctionComponent:
      case FunctionComponent:
      case IndeterminateComponent:
        return ElementTypeFunction;

      case ForwardRef:
        return ElementTypeForwardRef;

      case HostRoot:
        return ElementTypeRoot;

      case HostComponent:
      case HostHoistable:
      case HostSingleton:
        return ElementTypeHostComponent;

      case HostPortal:
      case HostText:
      case Fragment:
        return ElementTypeOtherOrUnknown;

      case MemoComponent:
      case SimpleMemoComponent:
        return ElementTypeMemo;

      case SuspenseComponent:
        return ElementTypeSuspense;

      case SuspenseListComponent:
        return ElementTypeSuspenseList;

      case TracingMarkerComponent:
        return ElementTypeTracingMarker;

      default:
        var typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case CONCURRENT_MODE_NUMBER:
          case CONCURRENT_MODE_SYMBOL_STRING:
          case DEPRECATED_ASYNC_MODE_SYMBOL_STRING:
            return ElementTypeOtherOrUnknown;

          case PROVIDER_NUMBER:
          case PROVIDER_SYMBOL_STRING:
            return ElementTypeContext;

          case CONTEXT_NUMBER:
          case CONTEXT_SYMBOL_STRING:
            return ElementTypeContext;

          case STRICT_MODE_NUMBER:
          case STRICT_MODE_SYMBOL_STRING:
            return ElementTypeOtherOrUnknown;

          case PROFILER_NUMBER:
          case PROFILER_SYMBOL_STRING:
            return ElementTypeProfiler;

          default:
            return ElementTypeOtherOrUnknown;
        }

    }
  } // When profiling is supported, we store the latest tree base durations for each Fiber.
  // This is so that we can quickly capture a snapshot of those values if profiling starts.
  // If we didn't store these values, we'd have to crawl the tree when profiling started,
  // and use a slow path to find each of the current Fibers.


  var idToTreeBaseDurationMap = new Map(); // When profiling is supported, we store the latest tree base durations for each Fiber.
  // This map enables us to filter these times by root when sending them to the frontend.

  var idToRootMap = new Map(); // When a mount or update is in progress, this value tracks the root that is being operated on.

  var currentRootID = -1; // Returns the unique ID for a Fiber or generates and caches a new one if the Fiber hasn't been seen before.
  // Once this method has been called for a Fiber, untrackFiberID() should always be called later to avoid leaking.

  function getOrGenerateFiberID(fiber) {
    var id = null;

    if (fiberToIDMap.has(fiber)) {
      id = fiberToIDMap.get(fiber);
    } else {
      var _alternate = fiber.alternate;

      if (_alternate !== null && fiberToIDMap.has(_alternate)) {
        id = fiberToIDMap.get(_alternate);
      }
    }

    var didGenerateID = false;

    if (id === null) {
      didGenerateID = true;
      id = getUID();
    } // This refinement is for Flow purposes only.


    var refinedID = id; // Make sure we're tracking this Fiber
    // e.g. if it just mounted or an error was logged during initial render.

    if (!fiberToIDMap.has(fiber)) {
      fiberToIDMap.set(fiber, refinedID);
      idToArbitraryFiberMap.set(refinedID, fiber);
    } // Also make sure we're tracking its alternate,
    // e.g. in case this is the first update after mount.


    var alternate = fiber.alternate;

    if (alternate !== null) {
      if (!fiberToIDMap.has(alternate)) {
        fiberToIDMap.set(alternate, refinedID);
      }
    }

    if (__DEBUG__) {
      if (didGenerateID) {
        debug('getOrGenerateFiberID()', fiber, fiber.return, 'Generated a new UID');
      }
    }

    return refinedID;
  } // Returns an ID if one has already been generated for the Fiber or throws.


  function getFiberIDThrows(fiber) {
    var maybeID = getFiberIDUnsafe(fiber);

    if (maybeID !== null) {
      return maybeID;
    }

    throw Error("Could not find ID for Fiber \"".concat(getDisplayNameForFiber(fiber) || '', "\""));
  } // Returns an ID if one has already been generated for the Fiber or null if one has not been generated.
  // Use this method while e.g. logging to avoid over-retaining Fibers.


  function getFiberIDUnsafe(fiber) {
    if (fiberToIDMap.has(fiber)) {
      return fiberToIDMap.get(fiber);
    } else {
      var alternate = fiber.alternate;

      if (alternate !== null && fiberToIDMap.has(alternate)) {
        return fiberToIDMap.get(alternate);
      }
    }

    return null;
  } // Removes a Fiber (and its alternate) from the Maps used to track their id.
  // This method should always be called when a Fiber is unmounting.


  function untrackFiberID(fiber) {
    if (__DEBUG__) {
      debug('untrackFiberID()', fiber, fiber.return, 'schedule after delay');
    } // Untrack Fibers after a slight delay in order to support a Fast Refresh edge case:
    // 1. Component type is updated and Fast Refresh schedules an update+remount.
    // 2. flushPendingErrorsAndWarningsAfterDelay() runs, sees the old Fiber is no longer mounted
    //    (it's been disconnected by Fast Refresh), and calls untrackFiberID() to clear it from the Map.
    // 3. React flushes pending passive effects before it runs the next render,
    //    which logs an error or warning, which causes a new ID to be generated for this Fiber.
    // 4. DevTools now tries to unmount the old Component with the new ID.
    //
    // The underlying problem here is the premature clearing of the Fiber ID,
    // but DevTools has no way to detect that a given Fiber has been scheduled for Fast Refresh.
    // (The "_debugNeedsRemount" flag won't necessarily be set.)
    //
    // The best we can do is to delay untracking by a small amount,
    // and give React time to process the Fast Refresh delay.


    untrackFibersSet.add(fiber); // React may detach alternate pointers during unmount;
    // Since our untracking code is async, we should explicily track the pending alternate here as well.

    var alternate = fiber.alternate;

    if (alternate !== null) {
      untrackFibersSet.add(alternate);
    }

    if (untrackFibersTimeoutID === null) {
      untrackFibersTimeoutID = setTimeout(untrackFibers, 1000);
    }
  }

  var untrackFibersSet = new Set();
  var untrackFibersTimeoutID = null;

  function untrackFibers() {
    if (untrackFibersTimeoutID !== null) {
      clearTimeout(untrackFibersTimeoutID);
      untrackFibersTimeoutID = null;
    }

    untrackFibersSet.forEach(function (fiber) {
      var fiberID = getFiberIDUnsafe(fiber);

      if (fiberID !== null) {
        idToArbitraryFiberMap.delete(fiberID); // Also clear any errors/warnings associated with this fiber.

        clearErrorsForFiberID(fiberID);
        clearWarningsForFiberID(fiberID);
      }

      fiberToIDMap.delete(fiber);
      fiberToComponentStackMap.delete(fiber);
      var alternate = fiber.alternate;

      if (alternate !== null) {
        fiberToIDMap.delete(alternate);
        fiberToComponentStackMap.delete(alternate);
      }

      if (forceErrorForFiberIDs.has(fiberID)) {
        forceErrorForFiberIDs.delete(fiberID);

        if (forceErrorForFiberIDs.size === 0 && setErrorHandler != null) {
          setErrorHandler(shouldErrorFiberAlwaysNull);
        }
      }
    });
    untrackFibersSet.clear();
  }

  function getChangeDescription(prevFiber, nextFiber) {
    switch (getElementTypeForFiber(nextFiber)) {
      case ElementTypeClass:
      case ElementTypeFunction:
      case ElementTypeMemo:
      case ElementTypeForwardRef:
        if (prevFiber === null) {
          return {
            context: null,
            didHooksChange: false,
            isFirstMount: true,
            props: null,
            state: null
          };
        } else {
          var data = {
            context: getContextChangedKeys(nextFiber),
            didHooksChange: false,
            isFirstMount: false,
            props: getChangedKeys(prevFiber.memoizedProps, nextFiber.memoizedProps),
            state: getChangedKeys(prevFiber.memoizedState, nextFiber.memoizedState)
          }; // Only traverse the hooks list once, depending on what info we're returning.

          var indices = getChangedHooksIndices(prevFiber.memoizedState, nextFiber.memoizedState);
          data.hooks = indices;
          data.didHooksChange = indices !== null && indices.length > 0;
          return data;
        }

      default:
        return null;
    }
  }

  function updateContextsForFiber(fiber) {
    switch (getElementTypeForFiber(fiber)) {
      case ElementTypeClass:
      case ElementTypeForwardRef:
      case ElementTypeFunction:
      case ElementTypeMemo:
        if (idToContextsMap !== null) {
          var id = getFiberIDThrows(fiber);
          var contexts = getContextsForFiber(fiber);

          if (contexts !== null) {
            // $FlowFixMe[incompatible-use] found when upgrading Flow
            idToContextsMap.set(id, contexts);
          }
        }

        break;

      default:
        break;
    }
  } // Differentiates between a null context value and no context.


  var NO_CONTEXT = {};

  function getContextsForFiber(fiber) {
    var legacyContext = NO_CONTEXT;
    var modernContext = NO_CONTEXT;

    switch (getElementTypeForFiber(fiber)) {
      case ElementTypeClass:
        var instance = fiber.stateNode;

        if (instance != null) {
          if (instance.constructor && instance.constructor.contextType != null) {
            modernContext = instance.context;
          } else {
            legacyContext = instance.context;

            if (legacyContext && Object.keys(legacyContext).length === 0) {
              legacyContext = NO_CONTEXT;
            }
          }
        }

        return [legacyContext, modernContext];

      case ElementTypeForwardRef:
      case ElementTypeFunction:
      case ElementTypeMemo:
        var dependencies = fiber.dependencies;

        if (dependencies && dependencies.firstContext) {
          modernContext = dependencies.firstContext;
        }

        return [legacyContext, modernContext];

      default:
        return null;
    }
  } // Record all contexts at the time profiling is started.
  // Fibers only store the current context value,
  // so we need to track them separately in order to determine changed keys.


  function crawlToInitializeContextsMap(fiber) {
    var id = getFiberIDUnsafe(fiber); // Not all Fibers in the subtree have mounted yet.
    // For example, Offscreen (hidden) or Suspense (suspended) subtrees won't yet be tracked.
    // We can safely skip these subtrees.

    if (id !== null) {
      updateContextsForFiber(fiber);
      var current = fiber.child;

      while (current !== null) {
        crawlToInitializeContextsMap(current);
        current = current.sibling;
      }
    }
  }

  function getContextChangedKeys(fiber) {
    if (idToContextsMap !== null) {
      var id = getFiberIDThrows(fiber); // $FlowFixMe[incompatible-use] found when upgrading Flow

      var prevContexts = idToContextsMap.has(id) ? // $FlowFixMe[incompatible-use] found when upgrading Flow
      idToContextsMap.get(id) : null;
      var nextContexts = getContextsForFiber(fiber);

      if (prevContexts == null || nextContexts == null) {
        return null;
      }

      var _prevContexts = renderer_slicedToArray(prevContexts, 2),
          prevLegacyContext = _prevContexts[0],
          prevModernContext = _prevContexts[1];

      var _nextContexts = renderer_slicedToArray(nextContexts, 2),
          nextLegacyContext = _nextContexts[0],
          nextModernContext = _nextContexts[1];

      switch (getElementTypeForFiber(fiber)) {
        case ElementTypeClass:
          if (prevContexts && nextContexts) {
            if (nextLegacyContext !== NO_CONTEXT) {
              return getChangedKeys(prevLegacyContext, nextLegacyContext);
            } else if (nextModernContext !== NO_CONTEXT) {
              return prevModernContext !== nextModernContext;
            }
          }

          break;

        case ElementTypeForwardRef:
        case ElementTypeFunction:
        case ElementTypeMemo:
          if (nextModernContext !== NO_CONTEXT) {
            var prevContext = prevModernContext;
            var nextContext = nextModernContext;

            while (prevContext && nextContext) {
              // Note this only works for versions of React that support this key (e.v. 18+)
              // For older versions, there's no good way to read the current context value after render has completed.
              // This is because React maintains a stack of context values during render,
              // but by the time DevTools is called, render has finished and the stack is empty.
              if (!is(prevContext.memoizedValue, nextContext.memoizedValue)) {
                return true;
              }

              prevContext = prevContext.next;
              nextContext = nextContext.next;
            }

            return false;
          }

          break;

        default:
          break;
      }
    }

    return null;
  }

  function isHookThatCanScheduleUpdate(hookObject) {
    var queue = hookObject.queue;

    if (!queue) {
      return false;
    }

    var boundHasOwnProperty = hasOwnProperty.bind(queue); // Detect the shape of useState() / useReducer() / useTransition()
    // using the attributes that are unique to these hooks
    // but also stable (e.g. not tied to current Lanes implementation)
    // We don't check for dispatch property, because useTransition doesn't have it

    if (boundHasOwnProperty('pending')) {
      return true;
    } // Detect useSyncExternalStore()


    return boundHasOwnProperty('value') && boundHasOwnProperty('getSnapshot') && typeof queue.getSnapshot === 'function';
  }

  function didStatefulHookChange(prev, next) {
    var prevMemoizedState = prev.memoizedState;
    var nextMemoizedState = next.memoizedState;

    if (isHookThatCanScheduleUpdate(prev)) {
      return prevMemoizedState !== nextMemoizedState;
    }

    return false;
  }

  function getChangedHooksIndices(prev, next) {
    if (prev == null || next == null) {
      return null;
    }

    var indices = [];
    var index = 0;

    if (next.hasOwnProperty('baseState') && next.hasOwnProperty('memoizedState') && next.hasOwnProperty('next') && next.hasOwnProperty('queue')) {
      while (next !== null) {
        if (didStatefulHookChange(prev, next)) {
          indices.push(index);
        }

        next = next.next;
        prev = prev.next;
        index++;
      }
    }

    return indices;
  }

  function getChangedKeys(prev, next) {
    if (prev == null || next == null) {
      return null;
    } // We can't report anything meaningful for hooks changes.


    if (next.hasOwnProperty('baseState') && next.hasOwnProperty('memoizedState') && next.hasOwnProperty('next') && next.hasOwnProperty('queue')) {
      return null;
    }

    var keys = new Set([].concat(_toConsumableArray(Object.keys(prev)), _toConsumableArray(Object.keys(next))));
    var changedKeys = []; // eslint-disable-next-line no-for-of-loops/no-for-of-loops

    var _iterator4 = _createForOfIteratorHelper(keys),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var key = _step4.value;

        if (prev[key] !== next[key]) {
          changedKeys.push(key);
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    return changedKeys;
  } // eslint-disable-next-line no-unused-vars


  function didFiberRender(prevFiber, nextFiber) {
    switch (nextFiber.tag) {
      case ClassComponent:
      case FunctionComponent:
      case ContextConsumer:
      case MemoComponent:
      case SimpleMemoComponent:
      case ForwardRef:
        // For types that execute user code, we check PerformedWork effect.
        // We don't reflect bailouts (either referential or sCU) in DevTools.
        // TODO: This flag is a leaked implementation detail. Once we start
        // releasing DevTools in lockstep with React, we should import a
        // function from the reconciler instead.
        var PerformedWork = 1;
        return (getFiberFlags(nextFiber) & PerformedWork) === PerformedWork;
      // Note: ContextConsumer only gets PerformedWork effect in 16.3.3+
      // so it won't get highlighted with React 16.3.0 to 16.3.2.

      default:
        // For host components and other types, we compare inputs
        // to determine whether something is an update.
        return prevFiber.memoizedProps !== nextFiber.memoizedProps || prevFiber.memoizedState !== nextFiber.memoizedState || prevFiber.ref !== nextFiber.ref;
    }
  }

  var pendingOperations = [];
  var pendingRealUnmountedIDs = [];
  var pendingSimulatedUnmountedIDs = [];
  var pendingOperationsQueue = [];
  var pendingStringTable = new Map();
  var pendingStringTableLength = 0;
  var pendingUnmountedRootID = null;

  function pushOperation(op) {
    if (false) {}

    pendingOperations.push(op);
  }

  function shouldBailoutWithPendingOperations() {
    if (isProfiling) {
      if (currentCommitProfilingMetadata != null && currentCommitProfilingMetadata.durations.length > 0) {
        return false;
      }
    }

    return pendingOperations.length === 0 && pendingRealUnmountedIDs.length === 0 && pendingSimulatedUnmountedIDs.length === 0 && pendingUnmountedRootID === null;
  }

  function flushOrQueueOperations(operations) {
    if (shouldBailoutWithPendingOperations()) {
      return;
    }

    if (pendingOperationsQueue !== null) {
      pendingOperationsQueue.push(operations);
    } else {
      hook.emit('operations', operations);
    }
  }

  var flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;

  function clearPendingErrorsAndWarningsAfterDelay() {
    if (flushPendingErrorsAndWarningsAfterDelayTimeoutID !== null) {
      clearTimeout(flushPendingErrorsAndWarningsAfterDelayTimeoutID);
      flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;
    }
  }

  function flushPendingErrorsAndWarningsAfterDelay() {
    clearPendingErrorsAndWarningsAfterDelay();
    flushPendingErrorsAndWarningsAfterDelayTimeoutID = setTimeout(function () {
      flushPendingErrorsAndWarningsAfterDelayTimeoutID = null;

      if (pendingOperations.length > 0) {
        // On the off chance that something else has pushed pending operations,
        // we should bail on warnings; it's probably not safe to push midway.
        return;
      }

      recordPendingErrorsAndWarnings();

      if (shouldBailoutWithPendingOperations()) {
        // No warnings or errors to flush; we can bail out early here too.
        return;
      } // We can create a smaller operations array than flushPendingEvents()
      // because we only need to flush warning and error counts.
      // Only a few pieces of fixed information are required up front.


      var operations = new Array(3 + pendingOperations.length);
      operations[0] = rendererID;
      operations[1] = currentRootID;
      operations[2] = 0; // String table size

      for (var j = 0; j < pendingOperations.length; j++) {
        operations[3 + j] = pendingOperations[j];
      }

      flushOrQueueOperations(operations);
      pendingOperations.length = 0;
    }, 1000);
  }

  function reevaluateErrorsAndWarnings() {
    fibersWithChangedErrorOrWarningCounts.clear();
    fiberIDToErrorsMap.forEach(function (countMap, fiberID) {
      var fiber = idToArbitraryFiberMap.get(fiberID);

      if (fiber != null) {
        fibersWithChangedErrorOrWarningCounts.add(fiber);
      }
    });
    fiberIDToWarningsMap.forEach(function (countMap, fiberID) {
      var fiber = idToArbitraryFiberMap.get(fiberID);

      if (fiber != null) {
        fibersWithChangedErrorOrWarningCounts.add(fiber);
      }
    });
    recordPendingErrorsAndWarnings();
  }

  function mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToMessageCountMap, fiberIDToMessageCountMap) {
    var newCount = 0;
    var messageCountMap = fiberIDToMessageCountMap.get(fiberID);
    var pendingMessageCountMap = pendingFiberToMessageCountMap.get(fiber);

    if (pendingMessageCountMap != null) {
      if (messageCountMap == null) {
        messageCountMap = pendingMessageCountMap;
        fiberIDToMessageCountMap.set(fiberID, pendingMessageCountMap);
      } else {
        // This Flow refinement should not be necessary and yet...
        var refinedMessageCountMap = messageCountMap;
        pendingMessageCountMap.forEach(function (pendingCount, message) {
          var previousCount = refinedMessageCountMap.get(message) || 0;
          refinedMessageCountMap.set(message, previousCount + pendingCount);
        });
      }
    }

    if (!shouldFilterFiber(fiber)) {
      if (messageCountMap != null) {
        messageCountMap.forEach(function (count) {
          newCount += count;
        });
      }
    }

    pendingFiberToMessageCountMap.delete(fiber);
    return newCount;
  }

  function recordPendingErrorsAndWarnings() {
    clearPendingErrorsAndWarningsAfterDelay();
    fibersWithChangedErrorOrWarningCounts.forEach(function (fiber) {
      var fiberID = getFiberIDUnsafe(fiber);

      if (fiberID === null) {// Don't send updates for Fibers that didn't mount due to e.g. Suspense or an error boundary.
      } else {
        var errorCount = mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToErrorsMap, fiberIDToErrorsMap);
        var warningCount = mergeMapsAndGetCountHelper(fiber, fiberID, pendingFiberToWarningsMap, fiberIDToWarningsMap);
        pushOperation(TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS);
        pushOperation(fiberID);
        pushOperation(errorCount);
        pushOperation(warningCount);
      } // Always clean up so that we don't leak.


      pendingFiberToErrorsMap.delete(fiber);
      pendingFiberToWarningsMap.delete(fiber);
    });
    fibersWithChangedErrorOrWarningCounts.clear();
  }

  function flushPendingEvents(root) {
    // Add any pending errors and warnings to the operations array.
    // We do this just before flushing, so we can ignore errors for no-longer-mounted Fibers.
    recordPendingErrorsAndWarnings();

    if (shouldBailoutWithPendingOperations()) {
      // If we aren't profiling, we can just bail out here.
      // No use sending an empty update over the bridge.
      //
      // The Profiler stores metadata for each commit and reconstructs the app tree per commit using:
      // (1) an initial tree snapshot and
      // (2) the operations array for each commit
      // Because of this, it's important that the operations and metadata arrays align,
      // So it's important not to omit even empty operations while profiling is active.
      return;
    }

    var numUnmountIDs = pendingRealUnmountedIDs.length + pendingSimulatedUnmountedIDs.length + (pendingUnmountedRootID === null ? 0 : 1);
    var operations = new Array( // Identify which renderer this update is coming from.
    2 + // [rendererID, rootFiberID]
    // How big is the string table?
    1 + // [stringTableLength]
    // Then goes the actual string table.
    pendingStringTableLength + ( // All unmounts are batched in a single message.
    // [TREE_OPERATION_REMOVE, removedIDLength, ...ids]
    numUnmountIDs > 0 ? 2 + numUnmountIDs : 0) + // Regular operations
    pendingOperations.length); // Identify which renderer this update is coming from.
    // This enables roots to be mapped to renderers,
    // Which in turn enables fiber props, states, and hooks to be inspected.

    var i = 0;
    operations[i++] = rendererID;
    operations[i++] = currentRootID; // Now fill in the string table.
    // [stringTableLength, str1Length, ...str1, str2Length, ...str2, ...]

    operations[i++] = pendingStringTableLength;
    pendingStringTable.forEach(function (entry, stringKey) {
      var encodedString = entry.encodedString; // Don't use the string length.
      // It won't work for multibyte characters (like emoji).

      var length = encodedString.length;
      operations[i++] = length;

      for (var j = 0; j < length; j++) {
        operations[i + j] = encodedString[j];
      }

      i += length;
    });

    if (numUnmountIDs > 0) {
      // All unmounts except roots are batched in a single message.
      operations[i++] = TREE_OPERATION_REMOVE; // The first number is how many unmounted IDs we're gonna send.

      operations[i++] = numUnmountIDs; // Fill in the real unmounts in the reverse order.
      // They were inserted parents-first by React, but we want children-first.
      // So we traverse our array backwards.

      for (var j = pendingRealUnmountedIDs.length - 1; j >= 0; j--) {
        operations[i++] = pendingRealUnmountedIDs[j];
      } // Fill in the simulated unmounts (hidden Suspense subtrees) in their order.
      // (We want children to go before parents.)
      // They go *after* the real unmounts because we know for sure they won't be
      // children of already pushed "real" IDs. If they were, we wouldn't be able
      // to discover them during the traversal, as they would have been deleted.


      for (var _j = 0; _j < pendingSimulatedUnmountedIDs.length; _j++) {
        operations[i + _j] = pendingSimulatedUnmountedIDs[_j];
      }

      i += pendingSimulatedUnmountedIDs.length; // The root ID should always be unmounted last.

      if (pendingUnmountedRootID !== null) {
        operations[i] = pendingUnmountedRootID;
        i++;
      }
    } // Fill in the rest of the operations.


    for (var _j2 = 0; _j2 < pendingOperations.length; _j2++) {
      operations[i + _j2] = pendingOperations[_j2];
    }

    i += pendingOperations.length; // Let the frontend know about tree operations.

    flushOrQueueOperations(operations); // Reset all of the pending state now that we've told the frontend about it.

    pendingOperations.length = 0;
    pendingRealUnmountedIDs.length = 0;
    pendingSimulatedUnmountedIDs.length = 0;
    pendingUnmountedRootID = null;
    pendingStringTable.clear();
    pendingStringTableLength = 0;
  }

  function getStringID(string) {
    if (string === null) {
      return 0;
    }

    var existingEntry = pendingStringTable.get(string);

    if (existingEntry !== undefined) {
      return existingEntry.id;
    }

    var id = pendingStringTable.size + 1;
    var encodedString = utfEncodeString(string);
    pendingStringTable.set(string, {
      encodedString: encodedString,
      id: id
    }); // The string table total length needs to account both for the string length,
    // and for the array item that contains the length itself.
    //
    // Don't use string length for this table.
    // It won't work for multibyte characters (like emoji).

    pendingStringTableLength += encodedString.length + 1;
    return id;
  }

  function recordMount(fiber, parentFiber) {
    var isRoot = fiber.tag === HostRoot;
    var id = getOrGenerateFiberID(fiber);

    if (__DEBUG__) {
      debug('recordMount()', fiber, parentFiber);
    }

    var hasOwnerMetadata = fiber.hasOwnProperty('_debugOwner');
    var isProfilingSupported = fiber.hasOwnProperty('treeBaseDuration'); // Adding a new field here would require a bridge protocol version bump (a backwads breaking change).
    // Instead let's re-purpose a pre-existing field to carry more information.

    var profilingFlags = 0;

    if (isProfilingSupported) {
      profilingFlags = PROFILING_FLAG_BASIC_SUPPORT;

      if (typeof injectProfilingHooks === 'function') {
        profilingFlags |= PROFILING_FLAG_TIMELINE_SUPPORT;
      }
    }

    if (isRoot) {
      pushOperation(TREE_OPERATION_ADD);
      pushOperation(id);
      pushOperation(ElementTypeRoot);
      pushOperation((fiber.mode & StrictModeBits) !== 0 ? 1 : 0);
      pushOperation(profilingFlags);
      pushOperation(StrictModeBits !== 0 ? 1 : 0);
      pushOperation(hasOwnerMetadata ? 1 : 0);

      if (isProfiling) {
        if (displayNamesByRootID !== null) {
          displayNamesByRootID.set(id, getDisplayNameForRoot(fiber));
        }
      }
    } else {
      var key = fiber.key;
      var displayName = getDisplayNameForFiber(fiber);
      var elementType = getElementTypeForFiber(fiber);
      var debugOwner = fiber._debugOwner; // Ideally we should call getFiberIDThrows() for _debugOwner,
      // since owners are almost always higher in the tree (and so have already been processed),
      // but in some (rare) instances reported in open source, a descendant mounts before an owner.
      // Since this is a DEV only field it's probably okay to also just lazily generate and ID here if needed.
      // See https://github.com/facebook/react/issues/21445

      var ownerID;

      if (debugOwner != null) {
        if (typeof debugOwner.tag === 'number') {
          ownerID = getOrGenerateFiberID(debugOwner);
        } else {
          // TODO: Track Server Component Owners.
          ownerID = 0;
        }
      } else {
        ownerID = 0;
      }

      var parentID = parentFiber ? getFiberIDThrows(parentFiber) : 0;
      var displayNameStringID = getStringID(displayName); // This check is a guard to handle a React element that has been modified
      // in such a way as to bypass the default stringification of the "key" property.

      var keyString = key === null ? null : String(key);
      var keyStringID = getStringID(keyString);
      pushOperation(TREE_OPERATION_ADD);
      pushOperation(id);
      pushOperation(elementType);
      pushOperation(parentID);
      pushOperation(ownerID);
      pushOperation(displayNameStringID);
      pushOperation(keyStringID); // If this subtree has a new mode, let the frontend know.

      if ((fiber.mode & StrictModeBits) !== 0 && (parentFiber.mode & StrictModeBits) === 0) {
        pushOperation(TREE_OPERATION_SET_SUBTREE_MODE);
        pushOperation(id);
        pushOperation(StrictMode);
      }
    }

    if (isProfilingSupported) {
      idToRootMap.set(id, currentRootID);
      recordProfilingDurations(fiber);
    }
  }

  function recordUnmount(fiber, isSimulated) {
    if (__DEBUG__) {
      debug('recordUnmount()', fiber, null, isSimulated ? 'unmount is simulated' : '');
    }

    if (trackedPathMatchFiber !== null) {
      // We're in the process of trying to restore previous selection.
      // If this fiber matched but is being unmounted, there's no use trying.
      // Reset the state so we don't keep holding onto it.
      if (fiber === trackedPathMatchFiber || fiber === trackedPathMatchFiber.alternate) {
        setTrackedPath(null);
      }
    }

    var unsafeID = getFiberIDUnsafe(fiber);

    if (unsafeID === null) {
      // If we've never seen this Fiber, it might be inside of a legacy render Suspense fragment (so the store is not even aware of it).
      // In that case we can just ignore it or it will cause errors later on.
      // One example of this is a Lazy component that never resolves before being unmounted.
      //
      // This also might indicate a Fast Refresh force-remount scenario.
      //
      // TODO: This is fragile and can obscure actual bugs.
      return;
    } // Flow refinement.


    var id = unsafeID;
    var isRoot = fiber.tag === HostRoot;

    if (isRoot) {
      // Roots must be removed only after all children (pending and simulated) have been removed.
      // So we track it separately.
      pendingUnmountedRootID = id;
    } else if (!shouldFilterFiber(fiber)) {
      // To maintain child-first ordering,
      // we'll push it into one of these queues,
      // and later arrange them in the correct order.
      if (isSimulated) {
        pendingSimulatedUnmountedIDs.push(id);
      } else {
        pendingRealUnmountedIDs.push(id);
      }
    }

    if (!fiber._debugNeedsRemount) {
      untrackFiberID(fiber);
      var isProfilingSupported = fiber.hasOwnProperty('treeBaseDuration');

      if (isProfilingSupported) {
        idToRootMap.delete(id);
        idToTreeBaseDurationMap.delete(id);
      }
    }
  }

  function mountFiberRecursively(firstChild, parentFiber, traverseSiblings, traceNearestHostComponentUpdate) {
    // Iterate over siblings rather than recursing.
    // This reduces the chance of stack overflow for wide trees (e.g. lists with many items).
    var fiber = firstChild;

    while (fiber !== null) {
      // Generate an ID even for filtered Fibers, in case it's needed later (e.g. for Profiling).
      getOrGenerateFiberID(fiber);

      if (__DEBUG__) {
        debug('mountFiberRecursively()', fiber, parentFiber);
      } // If we have the tree selection from previous reload, try to match this Fiber.
      // Also remember whether to do the same for siblings.


      var mightSiblingsBeOnTrackedPath = updateTrackedPathStateBeforeMount(fiber);
      var shouldIncludeInTree = !shouldFilterFiber(fiber);

      if (shouldIncludeInTree) {
        recordMount(fiber, parentFiber);
      }

      if (traceUpdatesEnabled) {
        if (traceNearestHostComponentUpdate) {
          var elementType = getElementTypeForFiber(fiber); // If an ancestor updated, we should mark the nearest host nodes for highlighting.

          if (elementType === ElementTypeHostComponent) {
            traceUpdatesForNodes.add(fiber.stateNode);
            traceNearestHostComponentUpdate = false;
          }
        } // We intentionally do not re-enable the traceNearestHostComponentUpdate flag in this branch,
        // because we don't want to highlight every host node inside of a newly mounted subtree.

      }

      var isSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent;

      if (isSuspense) {
        var isTimedOut = fiber.memoizedState !== null;

        if (isTimedOut) {
          // Special case: if Suspense mounts in a timed-out state,
          // get the fallback child from the inner fragment and mount
          // it as if it was our own child. Updates handle this too.
          var primaryChildFragment = fiber.child;
          var fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
          var fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;

          if (fallbackChild !== null) {
            mountFiberRecursively(fallbackChild, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
          }
        } else {
          var primaryChild = null;
          var areSuspenseChildrenConditionallyWrapped = OffscreenComponent === -1;

          if (areSuspenseChildrenConditionallyWrapped) {
            primaryChild = fiber.child;
          } else if (fiber.child !== null) {
            primaryChild = fiber.child.child;
          }

          if (primaryChild !== null) {
            mountFiberRecursively(primaryChild, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
          }
        }
      } else {
        if (fiber.child !== null) {
          mountFiberRecursively(fiber.child, shouldIncludeInTree ? fiber : parentFiber, true, traceNearestHostComponentUpdate);
        }
      } // We're exiting this Fiber now, and entering its siblings.
      // If we have selection to restore, we might need to re-activate tracking.


      updateTrackedPathStateAfterMount(mightSiblingsBeOnTrackedPath);
      fiber = traverseSiblings ? fiber.sibling : null;
    }
  } // We use this to simulate unmounting for Suspense trees
  // when we switch from primary to fallback.


  function unmountFiberChildrenRecursively(fiber) {
    if (__DEBUG__) {
      debug('unmountFiberChildrenRecursively()', fiber);
    } // We might meet a nested Suspense on our way.


    var isTimedOutSuspense = fiber.tag === ReactTypeOfWork.SuspenseComponent && fiber.memoizedState !== null;
    var child = fiber.child;

    if (isTimedOutSuspense) {
      // If it's showing fallback tree, let's traverse it instead.
      var primaryChildFragment = fiber.child;
      var fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null; // Skip over to the real Fiber child.

      child = fallbackChildFragment ? fallbackChildFragment.child : null;
    }

    while (child !== null) {
      // Record simulated unmounts children-first.
      // We skip nodes without return because those are real unmounts.
      if (child.return !== null) {
        unmountFiberChildrenRecursively(child);
        recordUnmount(child, true);
      }

      child = child.sibling;
    }
  }

  function recordProfilingDurations(fiber) {
    var id = getFiberIDThrows(fiber);
    var actualDuration = fiber.actualDuration,
        treeBaseDuration = fiber.treeBaseDuration;
    idToTreeBaseDurationMap.set(id, treeBaseDuration || 0);

    if (isProfiling) {
      var alternate = fiber.alternate; // It's important to update treeBaseDuration even if the current Fiber did not render,
      // because it's possible that one of its descendants did.

      if (alternate == null || treeBaseDuration !== alternate.treeBaseDuration) {
        // Tree base duration updates are included in the operations typed array.
        // So we have to convert them from milliseconds to microseconds so we can send them as ints.
        var convertedTreeBaseDuration = Math.floor((treeBaseDuration || 0) * 1000);
        pushOperation(TREE_OPERATION_UPDATE_TREE_BASE_DURATION);
        pushOperation(id);
        pushOperation(convertedTreeBaseDuration);
      }

      if (alternate == null || didFiberRender(alternate, fiber)) {
        if (actualDuration != null) {
          // The actual duration reported by React includes time spent working on children.
          // This is useful information, but it's also useful to be able to exclude child durations.
          // The frontend can't compute this, since the immediate children may have been filtered out.
          // So we need to do this on the backend.
          // Note that this calculated self duration is not the same thing as the base duration.
          // The two are calculated differently (tree duration does not accumulate).
          var selfDuration = actualDuration;
          var child = fiber.child;

          while (child !== null) {
            selfDuration -= child.actualDuration || 0;
            child = child.sibling;
          } // If profiling is active, store durations for elements that were rendered during the commit.
          // Note that we should do this for any fiber we performed work on, regardless of its actualDuration value.
          // In some cases actualDuration might be 0 for fibers we worked on (particularly if we're using Date.now)
          // In other cases (e.g. Memo) actualDuration might be greater than 0 even if we "bailed out".


          var metadata = currentCommitProfilingMetadata;
          metadata.durations.push(id, actualDuration, selfDuration);
          metadata.maxActualDuration = Math.max(metadata.maxActualDuration, actualDuration);

          if (recordChangeDescriptions) {
            var changeDescription = getChangeDescription(alternate, fiber);

            if (changeDescription !== null) {
              if (metadata.changeDescriptions !== null) {
                metadata.changeDescriptions.set(id, changeDescription);
              }
            }

            updateContextsForFiber(fiber);
          }
        }
      }
    }
  }

  function recordResetChildren(fiber, childSet) {
    if (__DEBUG__) {
      debug('recordResetChildren()', childSet, fiber);
    } // The frontend only really cares about the displayName, key, and children.
    // The first two don't really change, so we are only concerned with the order of children here.
    // This is trickier than a simple comparison though, since certain types of fibers are filtered.


    var nextChildren = []; // This is a naive implementation that shallowly recourses children.
    // We might want to revisit this if it proves to be too inefficient.

    var child = childSet;

    while (child !== null) {
      findReorderedChildrenRecursively(child, nextChildren);
      child = child.sibling;
    }

    var numChildren = nextChildren.length;

    if (numChildren < 2) {
      // No need to reorder.
      return;
    }

    pushOperation(TREE_OPERATION_REORDER_CHILDREN);
    pushOperation(getFiberIDThrows(fiber));
    pushOperation(numChildren);

    for (var i = 0; i < nextChildren.length; i++) {
      pushOperation(nextChildren[i]);
    }
  }

  function findReorderedChildrenRecursively(fiber, nextChildren) {
    if (!shouldFilterFiber(fiber)) {
      nextChildren.push(getFiberIDThrows(fiber));
    } else {
      var child = fiber.child;
      var isTimedOutSuspense = fiber.tag === SuspenseComponent && fiber.memoizedState !== null;

      if (isTimedOutSuspense) {
        // Special case: if Suspense mounts in a timed-out state,
        // get the fallback child from the inner fragment,
        // and skip over the primary child.
        var primaryChildFragment = fiber.child;
        var fallbackChildFragment = primaryChildFragment ? primaryChildFragment.sibling : null;
        var fallbackChild = fallbackChildFragment ? fallbackChildFragment.child : null;

        if (fallbackChild !== null) {
          child = fallbackChild;
        }
      }

      while (child !== null) {
        findReorderedChildrenRecursively(child, nextChildren);
        child = child.sibling;
      }
    }
  } // Returns whether closest unfiltered fiber parent needs to reset its child list.


  function updateFiberRecursively(nextFiber, prevFiber, parentFiber, traceNearestHostComponentUpdate) {
    var id = getOrGenerateFiberID(nextFiber);

    if (__DEBUG__) {
      debug('updateFiberRecursively()', nextFiber, parentFiber);
    }

    if (traceUpdatesEnabled) {
      var elementType = getElementTypeForFiber(nextFiber);

      if (traceNearestHostComponentUpdate) {
        // If an ancestor updated, we should mark the nearest host nodes for highlighting.
        if (elementType === ElementTypeHostComponent) {
          traceUpdatesForNodes.add(nextFiber.stateNode);
          traceNearestHostComponentUpdate = false;
        }
      } else {
        if (elementType === ElementTypeFunction || elementType === ElementTypeClass || elementType === ElementTypeContext || elementType === ElementTypeMemo || elementType === ElementTypeForwardRef) {
          // Otherwise if this is a traced ancestor, flag for the nearest host descendant(s).
          traceNearestHostComponentUpdate = didFiberRender(prevFiber, nextFiber);
        }
      }
    }

    if (mostRecentlyInspectedElement !== null && mostRecentlyInspectedElement.id === id && didFiberRender(prevFiber, nextFiber)) {
      // If this Fiber has updated, clear cached inspected data.
      // If it is inspected again, it may need to be re-run to obtain updated hooks values.
      hasElementUpdatedSinceLastInspected = true;
    }

    var shouldIncludeInTree = !shouldFilterFiber(nextFiber);
    var isSuspense = nextFiber.tag === SuspenseComponent;
    var shouldResetChildren = false; // The behavior of timed-out Suspense trees is unique.
    // Rather than unmount the timed out content (and possibly lose important state),
    // React re-parents this content within a hidden Fragment while the fallback is showing.
    // This behavior doesn't need to be observable in the DevTools though.
    // It might even result in a bad user experience for e.g. node selection in the Elements panel.
    // The easiest fix is to strip out the intermediate Fragment fibers,
    // so the Elements panel and Profiler don't need to special case them.
    // Suspense components only have a non-null memoizedState if they're timed-out.

    var prevDidTimeout = isSuspense && prevFiber.memoizedState !== null;
    var nextDidTimeOut = isSuspense && nextFiber.memoizedState !== null; // The logic below is inspired by the code paths in updateSuspenseComponent()
    // inside ReactFiberBeginWork in the React source code.

    if (prevDidTimeout && nextDidTimeOut) {
      // Fallback -> Fallback:
      // 1. Reconcile fallback set.
      var nextFiberChild = nextFiber.child;
      var nextFallbackChildSet = nextFiberChild ? nextFiberChild.sibling : null; // Note: We can't use nextFiber.child.sibling.alternate
      // because the set is special and alternate may not exist.

      var prevFiberChild = prevFiber.child;
      var prevFallbackChildSet = prevFiberChild ? prevFiberChild.sibling : null;

      if (prevFallbackChildSet == null && nextFallbackChildSet != null) {
        mountFiberRecursively(nextFallbackChildSet, shouldIncludeInTree ? nextFiber : parentFiber, true, traceNearestHostComponentUpdate);
        shouldResetChildren = true;
      }

      if (nextFallbackChildSet != null && prevFallbackChildSet != null && updateFiberRecursively(nextFallbackChildSet, prevFallbackChildSet, nextFiber, traceNearestHostComponentUpdate)) {
        shouldResetChildren = true;
      }
    } else if (prevDidTimeout && !nextDidTimeOut) {
      // Fallback -> Primary:
      // 1. Unmount fallback set
      // Note: don't emulate fallback unmount because React actually did it.
      // 2. Mount primary set
      var nextPrimaryChildSet = nextFiber.child;

      if (nextPrimaryChildSet !== null) {
        mountFiberRecursively(nextPrimaryChildSet, shouldIncludeInTree ? nextFiber : parentFiber, true, traceNearestHostComponentUpdate);
      }

      shouldResetChildren = true;
    } else if (!prevDidTimeout && nextDidTimeOut) {
      // Primary -> Fallback:
      // 1. Hide primary set
      // This is not a real unmount, so it won't get reported by React.
      // We need to manually walk the previous tree and record unmounts.
      unmountFiberChildrenRecursively(prevFiber); // 2. Mount fallback set

      var _nextFiberChild = nextFiber.child;

      var _nextFallbackChildSet = _nextFiberChild ? _nextFiberChild.sibling : null;

      if (_nextFallbackChildSet != null) {
        mountFiberRecursively(_nextFallbackChildSet, shouldIncludeInTree ? nextFiber : parentFiber, true, traceNearestHostComponentUpdate);
        shouldResetChildren = true;
      }
    } else {
      // Common case: Primary -> Primary.
      // This is the same code path as for non-Suspense fibers.
      if (nextFiber.child !== prevFiber.child) {
        // If the first child is different, we need to traverse them.
        // Each next child will be either a new child (mount) or an alternate (update).
        var nextChild = nextFiber.child;
        var prevChildAtSameIndex = prevFiber.child;

        while (nextChild) {
          // We already know children will be referentially different because
          // they are either new mounts or alternates of previous children.
          // Schedule updates and mounts depending on whether alternates exist.
          // We don't track deletions here because they are reported separately.
          if (nextChild.alternate) {
            var prevChild = nextChild.alternate;

            if (updateFiberRecursively(nextChild, prevChild, shouldIncludeInTree ? nextFiber : parentFiber, traceNearestHostComponentUpdate)) {
              // If a nested tree child order changed but it can't handle its own
              // child order invalidation (e.g. because it's filtered out like host nodes),
              // propagate the need to reset child order upwards to this Fiber.
              shouldResetChildren = true;
            } // However we also keep track if the order of the children matches
            // the previous order. They are always different referentially, but
            // if the instances line up conceptually we'll want to know that.


            if (prevChild !== prevChildAtSameIndex) {
              shouldResetChildren = true;
            }
          } else {
            mountFiberRecursively(nextChild, shouldIncludeInTree ? nextFiber : parentFiber, false, traceNearestHostComponentUpdate);
            shouldResetChildren = true;
          } // Try the next child.


          nextChild = nextChild.sibling; // Advance the pointer in the previous list so that we can
          // keep comparing if they line up.

          if (!shouldResetChildren && prevChildAtSameIndex !== null) {
            prevChildAtSameIndex = prevChildAtSameIndex.sibling;
          }
        } // If we have no more children, but used to, they don't line up.


        if (prevChildAtSameIndex !== null) {
          shouldResetChildren = true;
        }
      } else {
        if (traceUpdatesEnabled) {
          // If we're tracing updates and we've bailed out before reaching a host node,
          // we should fall back to recursively marking the nearest host descendants for highlight.
          if (traceNearestHostComponentUpdate) {
            var hostFibers = findAllCurrentHostFibers(getFiberIDThrows(nextFiber));
            hostFibers.forEach(function (hostFiber) {
              traceUpdatesForNodes.add(hostFiber.stateNode);
            });
          }
        }
      }
    }

    if (shouldIncludeInTree) {
      var isProfilingSupported = nextFiber.hasOwnProperty('treeBaseDuration');

      if (isProfilingSupported) {
        recordProfilingDurations(nextFiber);
      }
    }

    if (shouldResetChildren) {
      // We need to crawl the subtree for closest non-filtered Fibers
      // so that we can display them in a flat children set.
      if (shouldIncludeInTree) {
        // Normally, search for children from the rendered child.
        var nextChildSet = nextFiber.child;

        if (nextDidTimeOut) {
          // Special case: timed-out Suspense renders the fallback set.
          var _nextFiberChild2 = nextFiber.child;
          nextChildSet = _nextFiberChild2 ? _nextFiberChild2.sibling : null;
        }

        if (nextChildSet != null) {
          recordResetChildren(nextFiber, nextChildSet);
        } // We've handled the child order change for this Fiber.
        // Since it's included, there's no need to invalidate parent child order.


        return false;
      } else {
        // Let the closest unfiltered parent Fiber reset its child order instead.
        return true;
      }
    } else {
      return false;
    }
  }

  function cleanup() {// We don't patch any methods so there is no cleanup.
  }

  function rootSupportsProfiling(root) {
    if (root.memoizedInteractions != null) {
      // v16 builds include this field for the scheduler/tracing API.
      return true;
    } else if (root.current != null && root.current.hasOwnProperty('treeBaseDuration')) {
      // The scheduler/tracing API was removed in v17 though
      // so we need to check a non-root Fiber.
      return true;
    } else {
      return false;
    }
  }

  function flushInitialOperations() {
    var localPendingOperationsQueue = pendingOperationsQueue;
    pendingOperationsQueue = null;

    if (localPendingOperationsQueue !== null && localPendingOperationsQueue.length > 0) {
      // We may have already queued up some operations before the frontend connected
      // If so, let the frontend know about them.
      localPendingOperationsQueue.forEach(function (operations) {
        hook.emit('operations', operations);
      });
    } else {
      // Before the traversals, remember to start tracking
      // our path in case we have selection to restore.
      if (trackedPath !== null) {
        mightBeOnTrackedPath = true;
      } // If we have not been profiling, then we can just walk the tree and build up its current state as-is.


      hook.getFiberRoots(rendererID).forEach(function (root) {
        currentRootID = getOrGenerateFiberID(root.current);
        setRootPseudoKey(currentRootID, root.current); // Handle multi-renderer edge-case where only some v16 renderers support profiling.

        if (isProfiling && rootSupportsProfiling(root)) {
          // If profiling is active, store commit time and duration.
          // The frontend may request this information after profiling has stopped.
          currentCommitProfilingMetadata = {
            changeDescriptions: recordChangeDescriptions ? new Map() : null,
            durations: [],
            commitTime: renderer_getCurrentTime() - profilingStartTime,
            maxActualDuration: 0,
            priorityLevel: null,
            updaters: getUpdatersList(root),
            effectDuration: null,
            passiveEffectDuration: null
          };
        }

        mountFiberRecursively(root.current, null, false, false);
        flushPendingEvents(root);
        currentRootID = -1;
      });
    }
  }

  function getUpdatersList(root) {
    return root.memoizedUpdaters != null ? Array.from(root.memoizedUpdaters).filter(function (fiber) {
      return getFiberIDUnsafe(fiber) !== null;
    }).map(fiberToSerializedElement) : null;
  }

  function handleCommitFiberUnmount(fiber) {
    // If the untrackFiberSet already has the unmounted Fiber, this means we've already
    // recordedUnmount, so we don't need to do it again. If we don't do this, we might
    // end up double-deleting Fibers in some cases (like Legacy Suspense).
    if (!untrackFibersSet.has(fiber)) {
      // This is not recursive.
      // We can't traverse fibers after unmounting so instead
      // we rely on React telling us about each unmount.
      recordUnmount(fiber, false);
    }
  }

  function handlePostCommitFiberRoot(root) {
    if (isProfiling && rootSupportsProfiling(root)) {
      if (currentCommitProfilingMetadata !== null) {
        var _getEffectDurations = getEffectDurations(root),
            effectDuration = _getEffectDurations.effectDuration,
            passiveEffectDuration = _getEffectDurations.passiveEffectDuration; // $FlowFixMe[incompatible-use] found when upgrading Flow


        currentCommitProfilingMetadata.effectDuration = effectDuration; // $FlowFixMe[incompatible-use] found when upgrading Flow

        currentCommitProfilingMetadata.passiveEffectDuration = passiveEffectDuration;
      }
    }
  }

  function handleCommitFiberRoot(root, priorityLevel) {
    var current = root.current;
    var alternate = current.alternate; // Flush any pending Fibers that we are untracking before processing the new commit.
    // If we don't do this, we might end up double-deleting Fibers in some cases (like Legacy Suspense).

    untrackFibers();
    currentRootID = getOrGenerateFiberID(current); // Before the traversals, remember to start tracking
    // our path in case we have selection to restore.

    if (trackedPath !== null) {
      mightBeOnTrackedPath = true;
    }

    if (traceUpdatesEnabled) {
      traceUpdatesForNodes.clear();
    } // Handle multi-renderer edge-case where only some v16 renderers support profiling.


    var isProfilingSupported = rootSupportsProfiling(root);

    if (isProfiling && isProfilingSupported) {
      // If profiling is active, store commit time and duration.
      // The frontend may request this information after profiling has stopped.
      currentCommitProfilingMetadata = {
        changeDescriptions: recordChangeDescriptions ? new Map() : null,
        durations: [],
        commitTime: renderer_getCurrentTime() - profilingStartTime,
        maxActualDuration: 0,
        priorityLevel: priorityLevel == null ? null : formatPriorityLevel(priorityLevel),
        updaters: getUpdatersList(root),
        // Initialize to null; if new enough React version is running,
        // these values will be read during separate handlePostCommitFiberRoot() call.
        effectDuration: null,
        passiveEffectDuration: null
      };
    }

    if (alternate) {
      // TODO: relying on this seems a bit fishy.
      var wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null && // A dehydrated root is not considered mounted
      alternate.memoizedState.isDehydrated !== true;
      var isMounted = current.memoizedState != null && current.memoizedState.element != null && // A dehydrated root is not considered mounted
      current.memoizedState.isDehydrated !== true;

      if (!wasMounted && isMounted) {
        // Mount a new root.
        setRootPseudoKey(currentRootID, current);
        mountFiberRecursively(current, null, false, false);
      } else if (wasMounted && isMounted) {
        // Update an existing root.
        updateFiberRecursively(current, alternate, null, false);
      } else if (wasMounted && !isMounted) {
        // Unmount an existing root.
        removeRootPseudoKey(currentRootID);
        recordUnmount(current, false);
      }
    } else {
      // Mount a new root.
      setRootPseudoKey(currentRootID, current);
      mountFiberRecursively(current, null, false, false);
    }

    if (isProfiling && isProfilingSupported) {
      if (!shouldBailoutWithPendingOperations()) {
        var commitProfilingMetadata = rootToCommitProfilingMetadataMap.get(currentRootID);

        if (commitProfilingMetadata != null) {
          commitProfilingMetadata.push(currentCommitProfilingMetadata);
        } else {
          rootToCommitProfilingMetadataMap.set(currentRootID, [currentCommitProfilingMetadata]);
        }
      }
    } // We're done here.


    flushPendingEvents(root);

    if (traceUpdatesEnabled) {
      hook.emit('traceUpdates', traceUpdatesForNodes);
    }

    currentRootID = -1;
  }

  function findAllCurrentHostFibers(id) {
    var fibers = [];
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (!fiber) {
      return fibers;
    } // Next we'll drill down this component to find all HostComponent/Text.


    var node = fiber;

    while (true) {
      if (node.tag === HostComponent || node.tag === HostText) {
        fibers.push(node);
      } else if (node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === fiber) {
        return fibers;
      }

      while (!node.sibling) {
        if (!node.return || node.return === fiber) {
          return fibers;
        }

        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    } // Flow needs the return here, but ESLint complains about it.
    // eslint-disable-next-line no-unreachable


    return fibers;
  }

  function findNativeNodesForFiberID(id) {
    try {
      var _fiber3 = findCurrentFiberUsingSlowPathById(id);

      if (_fiber3 === null) {
        return null;
      }

      var hostFibers = findAllCurrentHostFibers(id);
      return hostFibers.map(function (hostFiber) {
        return hostFiber.stateNode;
      }).filter(Boolean);
    } catch (err) {
      // The fiber might have unmounted by now.
      return null;
    }
  }

  function getDisplayNameForFiberID(id) {
    var fiber = idToArbitraryFiberMap.get(id);
    return fiber != null ? getDisplayNameForFiber(fiber) : null;
  }

  function getFiberForNative(hostInstance) {
    return renderer.findFiberByHostInstance(hostInstance);
  }

  function getFiberIDForNative(hostInstance) {
    var findNearestUnfilteredAncestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var fiber = renderer.findFiberByHostInstance(hostInstance);

    if (fiber != null) {
      if (findNearestUnfilteredAncestor) {
        while (fiber !== null && shouldFilterFiber(fiber)) {
          fiber = fiber.return;
        }
      }

      return getFiberIDThrows(fiber);
    }

    return null;
  } // This function is copied from React and should be kept in sync:
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberTreeReflection.js


  function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber) {
      throw new Error('Unable to find node on an unmounted component.');
    }
  } // This function is copied from React and should be kept in sync:
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberTreeReflection.js


  function getNearestMountedFiber(fiber) {
    var node = fiber;
    var nearestMounted = fiber;

    if (!fiber.alternate) {
      // If there is no alternate, this might be a new tree that isn't inserted
      // yet. If it is, then it will have a pending insertion effect on it.
      var nextNode = node;

      do {
        node = nextNode; // TODO: This function, and these flags, are a leaked implementation
        // detail. Once we start releasing DevTools in lockstep with React, we
        // should import a function from the reconciler instead.

        var Placement = 2;
        var Hydrating = 4096;

        if ((node.flags & (Placement | Hydrating)) !== 0) {
          // This is an insertion or in-progress hydration. The nearest possible
          // mounted fiber is the parent but we need to continue to figure out
          // if that one is still mounted.
          nearestMounted = node.return;
        } // $FlowFixMe[incompatible-type] we bail out when we get a null


        nextNode = node.return;
      } while (nextNode);
    } else {
      while (node.return) {
        node = node.return;
      }
    }

    if (node.tag === HostRoot) {
      // TODO: Check if this was a nested HostRoot when used with
      // renderContainerIntoSubtree.
      return nearestMounted;
    } // If we didn't hit the root, that means that we're in an disconnected tree
    // that has been unmounted.


    return null;
  } // This function is copied from React and should be kept in sync:
  // https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberTreeReflection.js
  // It would be nice if we updated React to inject this function directly (vs just indirectly via findDOMNode).
  // BEGIN copied code


  function findCurrentFiberUsingSlowPathById(id) {
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return null;
    }

    var alternate = fiber.alternate;

    if (!alternate) {
      // If there is no alternate, then we only need to check if it is mounted.
      var nearestMounted = getNearestMountedFiber(fiber);

      if (nearestMounted === null) {
        throw new Error('Unable to find node on an unmounted component.');
      }

      if (nearestMounted !== fiber) {
        return null;
      }

      return fiber;
    } // If we have two possible branches, we'll walk backwards up to the root
    // to see what path the root points to. On the way we may hit one of the
    // special cases and we'll deal with them.


    var a = fiber;
    var b = alternate;

    while (true) {
      var parentA = a.return;

      if (parentA === null) {
        // We're at the root.
        break;
      }

      var parentB = parentA.alternate;

      if (parentB === null) {
        // There is no alternate. This is an unusual case. Currently, it only
        // happens when a Suspense component is hidden. An extra fragment fiber
        // is inserted in between the Suspense fiber and its children. Skip
        // over this extra fragment fiber and proceed to the next parent.
        var nextParent = parentA.return;

        if (nextParent !== null) {
          a = b = nextParent;
          continue;
        } // If there's no parent, we're at the root.


        break;
      } // If both copies of the parent fiber point to the same child, we can
      // assume that the child is current. This happens when we bailout on low
      // priority: the bailed out fiber's child reuses the current child.


      if (parentA.child === parentB.child) {
        var child = parentA.child;

        while (child) {
          if (child === a) {
            // We've determined that A is the current branch.
            assertIsMounted(parentA);
            return fiber;
          }

          if (child === b) {
            // We've determined that B is the current branch.
            assertIsMounted(parentA);
            return alternate;
          }

          child = child.sibling;
        } // We should never have an alternate for any mounting node. So the only
        // way this could possibly happen is if this was unmounted, if at all.


        throw new Error('Unable to find node on an unmounted component.');
      }

      if (a.return !== b.return) {
        // The return pointer of A and the return pointer of B point to different
        // fibers. We assume that return pointers never criss-cross, so A must
        // belong to the child set of A.return, and B must belong to the child
        // set of B.return.
        a = parentA;
        b = parentB;
      } else {
        // The return pointers point to the same fiber. We'll have to use the
        // default, slow path: scan the child sets of each parent alternate to see
        // which child belongs to which set.
        //
        // Search parent A's child set
        var didFindChild = false;
        var _child = parentA.child;

        while (_child) {
          if (_child === a) {
            didFindChild = true;
            a = parentA;
            b = parentB;
            break;
          }

          if (_child === b) {
            didFindChild = true;
            b = parentA;
            a = parentB;
            break;
          }

          _child = _child.sibling;
        }

        if (!didFindChild) {
          // Search parent B's child set
          _child = parentB.child;

          while (_child) {
            if (_child === a) {
              didFindChild = true;
              a = parentB;
              b = parentA;
              break;
            }

            if (_child === b) {
              didFindChild = true;
              b = parentB;
              a = parentA;
              break;
            }

            _child = _child.sibling;
          }

          if (!didFindChild) {
            throw new Error('Child was not found in either parent set. This indicates a bug ' + 'in React related to the return pointer. Please file an issue.');
          }
        }
      }

      if (a.alternate !== b) {
        throw new Error("Return fibers should always be each others' alternates. " + 'This error is likely caused by a bug in React. Please file an issue.');
      }
    } // If the root is not a host container, we're in a disconnected tree. I.e.
    // unmounted.


    if (a.tag !== HostRoot) {
      throw new Error('Unable to find node on an unmounted component.');
    }

    if (a.stateNode.current === a) {
      // We've determined that A is the current branch.
      return fiber;
    } // Otherwise B has to be current branch.


    return alternate;
  } // END copied code


  function prepareViewAttributeSource(id, path) {
    if (isMostRecentlyInspectedElement(id)) {
      window.$attribute = getInObject(mostRecentlyInspectedElement, path);
    }
  }

  function prepareViewElementSource(id) {
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return;
    }

    var elementType = fiber.elementType,
        tag = fiber.tag,
        type = fiber.type;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
      case IncompleteFunctionComponent:
      case IndeterminateComponent:
      case FunctionComponent:
        global.$type = type;
        break;

      case ForwardRef:
        global.$type = type.render;
        break;

      case MemoComponent:
      case SimpleMemoComponent:
        global.$type = elementType != null && elementType.type != null ? elementType.type : type;
        break;

      default:
        global.$type = null;
        break;
    }
  }

  function fiberToSerializedElement(fiber) {
    return {
      displayName: getDisplayNameForFiber(fiber) || 'Anonymous',
      id: getFiberIDThrows(fiber),
      key: fiber.key,
      type: getElementTypeForFiber(fiber)
    };
  }

  function getOwnersList(id) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber == null) {
      return null;
    }

    var owners = [fiberToSerializedElement(fiber)];
    var owner = fiber._debugOwner;

    while (owner != null) {
      if (typeof owner.tag === 'number') {
        var ownerFiber = owner; // Refined

        owners.unshift(fiberToSerializedElement(ownerFiber));
        owner = ownerFiber._debugOwner;
      } else {
        // TODO: Track Server Component Owners.
        break;
      }
    }

    return owners;
  } // Fast path props lookup for React Native style editor.
  // Could use inspectElementRaw() but that would require shallow rendering hooks components,
  // and could also mess with memoization.


  function getInstanceAndStyle(id) {
    var instance = null;
    var style = null;
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      instance = fiber.stateNode;

      if (fiber.memoizedProps !== null) {
        style = fiber.memoizedProps.style;
      }
    }

    return {
      instance: instance,
      style: style
    };
  }

  function isErrorBoundary(fiber) {
    var tag = fiber.tag,
        type = fiber.type;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
        var instance = fiber.stateNode;
        return typeof type.getDerivedStateFromError === 'function' || instance !== null && typeof instance.componentDidCatch === 'function';

      default:
        return false;
    }
  }

  function getNearestErrorBoundaryID(fiber) {
    var parent = fiber.return;

    while (parent !== null) {
      if (isErrorBoundary(parent)) {
        return getFiberIDUnsafe(parent);
      }

      parent = parent.return;
    }

    return null;
  }

  function inspectElementRaw(id) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber == null) {
      return null;
    }

    var debugOwner = fiber._debugOwner,
        stateNode = fiber.stateNode,
        key = fiber.key,
        memoizedProps = fiber.memoizedProps,
        memoizedState = fiber.memoizedState,
        dependencies = fiber.dependencies,
        tag = fiber.tag,
        type = fiber.type;
    var elementType = getElementTypeForFiber(fiber);
    var usesHooks = (tag === FunctionComponent || tag === SimpleMemoComponent || tag === ForwardRef) && (!!memoizedState || !!dependencies); // TODO Show custom UI for Cache like we do for Suspense
    // For now, just hide state data entirely since it's not meant to be inspected.

    var showState = !usesHooks && tag !== CacheComponent;
    var typeSymbol = getTypeSymbol(type);
    var canViewSource = false;
    var context = null;

    if (tag === ClassComponent || tag === FunctionComponent || tag === IncompleteClassComponent || tag === IncompleteFunctionComponent || tag === IndeterminateComponent || tag === MemoComponent || tag === ForwardRef || tag === SimpleMemoComponent) {
      canViewSource = true;

      if (stateNode && stateNode.context != null) {
        // Don't show an empty context object for class components that don't use the context API.
        var shouldHideContext = elementType === ElementTypeClass && !(type.contextTypes || type.contextType);

        if (!shouldHideContext) {
          context = stateNode.context;
        }
      }
    } else if ( // Detect pre-19 Context Consumers
    (typeSymbol === CONTEXT_NUMBER || typeSymbol === CONTEXT_SYMBOL_STRING) && !( // In 19+, CONTEXT_SYMBOL_STRING means a Provider instead.
    // It will be handled in a different branch below.
    // Eventually, this entire branch can be removed.
    type._context === undefined && type.Provider === type)) {
      // 16.3-16.5 read from "type" because the Consumer is the actual context object.
      // 16.6+ should read from "type._context" because Consumer can be different (in DEV).
      // NOTE Keep in sync with getDisplayNameForFiber()
      var consumerResolvedContext = type._context || type; // Global context value.

      context = consumerResolvedContext._currentValue || null; // Look for overridden value.

      var _current = fiber.return;

      while (_current !== null) {
        var currentType = _current.type;
        var currentTypeSymbol = getTypeSymbol(currentType);

        if (currentTypeSymbol === PROVIDER_NUMBER || currentTypeSymbol === PROVIDER_SYMBOL_STRING) {
          // 16.3.0 exposed the context object as "context"
          // PR #12501 changed it to "_context" for 16.3.1+
          // NOTE Keep in sync with getDisplayNameForFiber()
          var providerResolvedContext = currentType._context || currentType.context;

          if (providerResolvedContext === consumerResolvedContext) {
            context = _current.memoizedProps.value;
            break;
          }
        }

        _current = _current.return;
      }
    } else if ( // Detect 19+ Context Consumers
    typeSymbol === CONSUMER_SYMBOL_STRING) {
      // This branch is 19+ only, where Context.Provider === Context.
      // NOTE Keep in sync with getDisplayNameForFiber()
      var _consumerResolvedContext = type._context; // Global context value.

      context = _consumerResolvedContext._currentValue || null; // Look for overridden value.

      var _current2 = fiber.return;

      while (_current2 !== null) {
        var _currentType = _current2.type;

        var _currentTypeSymbol = getTypeSymbol(_currentType);

        if ( // In 19+, these are Context Providers
        _currentTypeSymbol === CONTEXT_SYMBOL_STRING) {
          var _providerResolvedContext = _currentType;

          if (_providerResolvedContext === _consumerResolvedContext) {
            context = _current2.memoizedProps.value;
            break;
          }
        }

        _current2 = _current2.return;
      }
    }

    var hasLegacyContext = false;

    if (context !== null) {
      hasLegacyContext = !!type.contextTypes; // To simplify hydration and display logic for context, wrap in a value object.
      // Otherwise simple values (e.g. strings, booleans) become harder to handle.

      context = {
        value: context
      };
    }

    var owners = null;
    var owner = debugOwner;

    while (owner != null) {
      if (typeof owner.tag === 'number') {
        var ownerFiber = owner; // Refined

        if (owners === null) {
          owners = [];
        }

        owners.push(fiberToSerializedElement(ownerFiber));
        owner = ownerFiber._debugOwner;
      } else {
        // TODO: Track Server Component Owners.
        break;
      }
    }

    var isTimedOutSuspense = tag === SuspenseComponent && memoizedState !== null;
    var hooks = null;

    if (usesHooks) {
      var originalConsoleMethods = {}; // Temporarily disable all console logging before re-running the hook.

      for (var method in console) {
        try {
          originalConsoleMethods[method] = console[method]; // $FlowFixMe[prop-missing]

          console[method] = function () {};
        } catch (error) {}
      }

      try {
        hooks = inspectHooksOfFiber(fiber, getDispatcherRef(renderer));
      } finally {
        // Restore original console functionality.
        for (var _method in originalConsoleMethods) {
          try {
            // $FlowFixMe[prop-missing]
            console[_method] = originalConsoleMethods[_method];
          } catch (error) {}
        }
      }
    }

    var rootType = null;
    var current = fiber;

    while (current.return !== null) {
      current = current.return;
    }

    var fiberRoot = current.stateNode;

    if (fiberRoot != null && fiberRoot._debugRootType !== null) {
      rootType = fiberRoot._debugRootType;
    }

    var errors = fiberIDToErrorsMap.get(id) || new Map();
    var warnings = fiberIDToWarningsMap.get(id) || new Map();
    var isErrored = false;
    var targetErrorBoundaryID;

    if (isErrorBoundary(fiber)) {
      // if the current inspected element is an error boundary,
      // either that we want to use it to toggle off error state
      // or that we allow to force error state on it if it's within another
      // error boundary
      //
      // TODO: This flag is a leaked implementation detail. Once we start
      // releasing DevTools in lockstep with React, we should import a function
      // from the reconciler instead.
      var DidCapture = 128;
      isErrored = (fiber.flags & DidCapture) !== 0 || forceErrorForFiberIDs.get(id) === true;
      targetErrorBoundaryID = isErrored ? id : getNearestErrorBoundaryID(fiber);
    } else {
      targetErrorBoundaryID = getNearestErrorBoundaryID(fiber);
    }

    var plugins = {
      stylex: null
    };

    if (enableStyleXFeatures) {
      if (memoizedProps != null && memoizedProps.hasOwnProperty('xstyle')) {
        plugins.stylex = getStyleXData(memoizedProps.xstyle);
      }
    }

    var source = null;

    if (canViewSource) {
      source = getSourceForFiber(fiber);
    }

    return {
      id: id,
      // Does the current renderer support editable hooks and function props?
      canEditHooks: typeof overrideHookState === 'function',
      canEditFunctionProps: typeof overrideProps === 'function',
      // Does the current renderer support advanced editing interface?
      canEditHooksAndDeletePaths: typeof overrideHookStateDeletePath === 'function',
      canEditHooksAndRenamePaths: typeof overrideHookStateRenamePath === 'function',
      canEditFunctionPropsDeletePaths: typeof overridePropsDeletePath === 'function',
      canEditFunctionPropsRenamePaths: typeof overridePropsRenamePath === 'function',
      canToggleError: supportsTogglingError && targetErrorBoundaryID != null,
      // Is this error boundary in error state.
      isErrored: isErrored,
      targetErrorBoundaryID: targetErrorBoundaryID,
      canToggleSuspense: supportsTogglingSuspense && ( // If it's showing the real content, we can always flip fallback.
      !isTimedOutSuspense || // If it's showing fallback because we previously forced it to,
      // allow toggling it back to remove the fallback override.
      forceFallbackForSuspenseIDs.has(id)),
      // Can view component source location.
      canViewSource: canViewSource,
      source: source,
      // Does the component have legacy context attached to it.
      hasLegacyContext: hasLegacyContext,
      key: key != null ? key : null,
      displayName: getDisplayNameForFiber(fiber),
      type: elementType,
      // Inspectable properties.
      // TODO Review sanitization approach for the below inspectable values.
      context: context,
      hooks: hooks,
      props: memoizedProps,
      state: showState ? memoizedState : null,
      errors: Array.from(errors.entries()),
      warnings: Array.from(warnings.entries()),
      // List of owners
      owners: owners,
      rootType: rootType,
      rendererPackageName: renderer.rendererPackageName,
      rendererVersion: renderer.version,
      plugins: plugins
    };
  }

  var mostRecentlyInspectedElement = null;
  var hasElementUpdatedSinceLastInspected = false;
  var currentlyInspectedPaths = {};

  function isMostRecentlyInspectedElement(id) {
    return mostRecentlyInspectedElement !== null && mostRecentlyInspectedElement.id === id;
  }

  function isMostRecentlyInspectedElementCurrent(id) {
    return isMostRecentlyInspectedElement(id) && !hasElementUpdatedSinceLastInspected;
  } // Track the intersection of currently inspected paths,
  // so that we can send their data along if the element is re-rendered.


  function mergeInspectedPaths(path) {
    var current = currentlyInspectedPaths;
    path.forEach(function (key) {
      if (!current[key]) {
        current[key] = {};
      }

      current = current[key];
    });
  }

  function createIsPathAllowed(key, secondaryCategory) {
    // This function helps prevent previously-inspected paths from being dehydrated in updates.
    // This is important to avoid a bad user experience where expanded toggles collapse on update.
    return function isPathAllowed(path) {
      switch (secondaryCategory) {
        case 'hooks':
          if (path.length === 1) {
            // Never dehydrate the "hooks" object at the top levels.
            return true;
          }

          if (path[path.length - 2] === 'hookSource' && path[path.length - 1] === 'fileName') {
            // It's important to preserve the full file name (URL) for hook sources
            // in case the user has enabled the named hooks feature.
            // Otherwise the frontend may end up with a partial URL which it can't load.
            return true;
          }

          if (path[path.length - 1] === 'subHooks' || path[path.length - 2] === 'subHooks') {
            // Dehydrating the 'subHooks' property makes the HooksTree UI a lot more complicated,
            // so it's easiest for now if we just don't break on this boundary.
            // We can always dehydrate a level deeper (in the value object).
            return true;
          }

          break;

        default:
          break;
      }

      var current = key === null ? currentlyInspectedPaths : currentlyInspectedPaths[key];

      if (!current) {
        return false;
      }

      for (var i = 0; i < path.length; i++) {
        current = current[path[i]];

        if (!current) {
          return false;
        }
      }

      return true;
    };
  }

  function updateSelectedElement(inspectedElement) {
    var hooks = inspectedElement.hooks,
        id = inspectedElement.id,
        props = inspectedElement.props;
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return;
    }

    var elementType = fiber.elementType,
        stateNode = fiber.stateNode,
        tag = fiber.tag,
        type = fiber.type;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
      case IndeterminateComponent:
        global.$r = stateNode;
        break;

      case IncompleteFunctionComponent:
      case FunctionComponent:
        global.$r = {
          hooks: hooks,
          props: props,
          type: type
        };
        break;

      case ForwardRef:
        global.$r = {
          hooks: hooks,
          props: props,
          type: type.render
        };
        break;

      case MemoComponent:
      case SimpleMemoComponent:
        global.$r = {
          hooks: hooks,
          props: props,
          type: elementType != null && elementType.type != null ? elementType.type : type
        };
        break;

      default:
        global.$r = null;
        break;
    }
  }

  function storeAsGlobal(id, path, count) {
    if (isMostRecentlyInspectedElement(id)) {
      var value = getInObject(mostRecentlyInspectedElement, path);
      var key = "$reactTemp".concat(count);
      window[key] = value;
      console.log(key);
      console.log(value);
    }
  }

  function getSerializedElementValueByPath(id, path) {
    if (isMostRecentlyInspectedElement(id)) {
      var valueToCopy = getInObject(mostRecentlyInspectedElement, path);
      return serializeToString(valueToCopy);
    }
  }

  function inspectElement(requestID, id, path, forceFullData) {
    if (path !== null) {
      mergeInspectedPaths(path);
    }

    if (isMostRecentlyInspectedElement(id) && !forceFullData) {
      if (!hasElementUpdatedSinceLastInspected) {
        if (path !== null) {
          var secondaryCategory = null;

          if (path[0] === 'hooks') {
            secondaryCategory = 'hooks';
          } // If this element has not been updated since it was last inspected,
          // we can just return the subset of data in the newly-inspected path.


          return {
            id: id,
            responseID: requestID,
            type: 'hydrated-path',
            path: path,
            value: cleanForBridge(getInObject(mostRecentlyInspectedElement, path), createIsPathAllowed(null, secondaryCategory), path)
          };
        } else {
          // If this element has not been updated since it was last inspected, we don't need to return it.
          // Instead we can just return the ID to indicate that it has not changed.
          return {
            id: id,
            responseID: requestID,
            type: 'no-change'
          };
        }
      }
    } else {
      currentlyInspectedPaths = {};
    }

    hasElementUpdatedSinceLastInspected = false;

    try {
      mostRecentlyInspectedElement = inspectElementRaw(id);
    } catch (error) {
      // the error name is synced with ReactDebugHooks
      if (error.name === 'ReactDebugToolsRenderError') {
        var message = 'Error rendering inspected element.';
        var stack; // Log error & cause for user to debug

        console.error(message + '\n\n', error);

        if (error.cause != null) {
          var _fiber4 = findCurrentFiberUsingSlowPathById(id);

          var componentName = _fiber4 != null ? getDisplayNameForFiber(_fiber4) : null;
          console.error('React DevTools encountered an error while trying to inspect hooks. ' + 'This is most likely caused by an error in current inspected component' + (componentName != null ? ": \"".concat(componentName, "\".") : '.') + '\nThe error thrown in the component is: \n\n', error.cause);

          if (error.cause instanceof Error) {
            message = error.cause.message || message;
            stack = error.cause.stack;
          }
        }

        return {
          type: 'error',
          errorType: 'user',
          id: id,
          responseID: requestID,
          message: message,
          stack: stack
        };
      } // the error name is synced with ReactDebugHooks


      if (error.name === 'ReactDebugToolsUnsupportedHookError') {
        return {
          type: 'error',
          errorType: 'unknown-hook',
          id: id,
          responseID: requestID,
          message: 'Unsupported hook in the react-debug-tools package: ' + error.message
        };
      } // Log Uncaught Error


      console.error('Error inspecting element.\n\n', error);
      return {
        type: 'error',
        errorType: 'uncaught',
        id: id,
        responseID: requestID,
        message: error.message,
        stack: error.stack
      };
    }

    if (mostRecentlyInspectedElement === null) {
      return {
        id: id,
        responseID: requestID,
        type: 'not-found'
      };
    } // Any time an inspected element has an update,
    // we should update the selected $r value as wel.
    // Do this before dehydration (cleanForBridge).


    updateSelectedElement(mostRecentlyInspectedElement); // Clone before cleaning so that we preserve the full data.
    // This will enable us to send patches without re-inspecting if hydrated paths are requested.
    // (Reducing how often we shallow-render is a better DX for function components that use hooks.)

    var cleanedInspectedElement = _objectSpread({}, mostRecentlyInspectedElement); // $FlowFixMe[prop-missing] found when upgrading Flow


    cleanedInspectedElement.context = cleanForBridge(cleanedInspectedElement.context, createIsPathAllowed('context', null)); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.hooks = cleanForBridge(cleanedInspectedElement.hooks, createIsPathAllowed('hooks', 'hooks')); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.props = cleanForBridge(cleanedInspectedElement.props, createIsPathAllowed('props', null)); // $FlowFixMe[prop-missing] found when upgrading Flow

    cleanedInspectedElement.state = cleanForBridge(cleanedInspectedElement.state, createIsPathAllowed('state', null));
    return {
      id: id,
      responseID: requestID,
      type: 'full-data',
      // $FlowFixMe[prop-missing] found when upgrading Flow
      value: cleanedInspectedElement
    };
  }

  function logElementToConsole(id) {
    var result = isMostRecentlyInspectedElementCurrent(id) ? mostRecentlyInspectedElement : inspectElementRaw(id);

    if (result === null) {
      console.warn("Could not find Fiber with id \"".concat(id, "\""));
      return;
    }

    var supportsGroup = typeof console.groupCollapsed === 'function';

    if (supportsGroup) {
      console.groupCollapsed("[Click to expand] %c<".concat(result.displayName || 'Component', " />"), // --dom-tag-name-color is the CSS variable Chrome styles HTML elements with in the console.
      'color: var(--dom-tag-name-color); font-weight: normal;');
    }

    if (result.props !== null) {
      console.log('Props:', result.props);
    }

    if (result.state !== null) {
      console.log('State:', result.state);
    }

    if (result.hooks !== null) {
      console.log('Hooks:', result.hooks);
    }

    var nativeNodes = findNativeNodesForFiberID(id);

    if (nativeNodes !== null) {
      console.log('Nodes:', nativeNodes);
    }

    if (window.chrome || /firefox/i.test(navigator.userAgent)) {
      console.log('Right-click any value to save it as a global variable for further inspection.');
    }

    if (supportsGroup) {
      console.groupEnd();
    }
  }

  function deletePath(type, id, hookID, path) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      var instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          path = path.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (path.length === 0) {// Simple context value (noop)
              } else {
                deletePathInObject(instance.context, path);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookStateDeletePath === 'function') {
            overrideHookStateDeletePath(fiber, hookID, path);
          }

          break;

        case 'props':
          if (instance === null) {
            if (typeof overridePropsDeletePath === 'function') {
              overridePropsDeletePath(fiber, path);
            }
          } else {
            fiber.pendingProps = copyWithDelete(instance.props, path);
            instance.forceUpdate();
          }

          break;

        case 'state':
          deletePathInObject(instance.state, path);
          instance.forceUpdate();
          break;
      }
    }
  }

  function renamePath(type, id, hookID, oldPath, newPath) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      var instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          oldPath = oldPath.slice(1);
          newPath = newPath.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (oldPath.length === 0) {// Simple context value (noop)
              } else {
                renamePathInObject(instance.context, oldPath, newPath);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookStateRenamePath === 'function') {
            overrideHookStateRenamePath(fiber, hookID, oldPath, newPath);
          }

          break;

        case 'props':
          if (instance === null) {
            if (typeof overridePropsRenamePath === 'function') {
              overridePropsRenamePath(fiber, oldPath, newPath);
            }
          } else {
            fiber.pendingProps = copyWithRename(instance.props, oldPath, newPath);
            instance.forceUpdate();
          }

          break;

        case 'state':
          renamePathInObject(instance.state, oldPath, newPath);
          instance.forceUpdate();
          break;
      }
    }
  }

  function overrideValueAtPath(type, id, hookID, path, value) {
    var fiber = findCurrentFiberUsingSlowPathById(id);

    if (fiber !== null) {
      var instance = fiber.stateNode;

      switch (type) {
        case 'context':
          // To simplify hydration and display of primitive context values (e.g. number, string)
          // the inspectElement() method wraps context in a {value: ...} object.
          // We need to remove the first part of the path (the "value") before continuing.
          path = path.slice(1);

          switch (fiber.tag) {
            case ClassComponent:
              if (path.length === 0) {
                // Simple context value
                instance.context = value;
              } else {
                setInObject(instance.context, path, value);
              }

              instance.forceUpdate();
              break;

            case FunctionComponent:
              // Function components using legacy context are not editable
              // because there's no instance on which to create a cloned, mutated context.
              break;
          }

          break;

        case 'hooks':
          if (typeof overrideHookState === 'function') {
            overrideHookState(fiber, hookID, path, value);
          }

          break;

        case 'props':
          switch (fiber.tag) {
            case ClassComponent:
              fiber.pendingProps = copyWithSet(instance.props, path, value);
              instance.forceUpdate();
              break;

            default:
              if (typeof overrideProps === 'function') {
                overrideProps(fiber, path, value);
              }

              break;
          }

          break;

        case 'state':
          switch (fiber.tag) {
            case ClassComponent:
              setInObject(instance.state, path, value);
              instance.forceUpdate();
              break;
          }

          break;
      }
    }
  }

  var currentCommitProfilingMetadata = null;
  var displayNamesByRootID = null;
  var idToContextsMap = null;
  var initialTreeBaseDurationsMap = null;
  var initialIDToRootMap = null;
  var isProfiling = false;
  var profilingStartTime = 0;
  var recordChangeDescriptions = false;
  var rootToCommitProfilingMetadataMap = null;

  function getProfilingData() {
    var dataForRoots = [];

    if (rootToCommitProfilingMetadataMap === null) {
      throw Error('getProfilingData() called before any profiling data was recorded');
    }

    rootToCommitProfilingMetadataMap.forEach(function (commitProfilingMetadata, rootID) {
      var commitData = [];
      var initialTreeBaseDurations = [];
      var displayName = displayNamesByRootID !== null && displayNamesByRootID.get(rootID) || 'Unknown';

      if (initialTreeBaseDurationsMap != null) {
        initialTreeBaseDurationsMap.forEach(function (treeBaseDuration, id) {
          if (initialIDToRootMap != null && initialIDToRootMap.get(id) === rootID) {
            // We don't need to convert milliseconds to microseconds in this case,
            // because the profiling summary is JSON serialized.
            initialTreeBaseDurations.push([id, treeBaseDuration]);
          }
        });
      }

      commitProfilingMetadata.forEach(function (commitProfilingData, commitIndex) {
        var changeDescriptions = commitProfilingData.changeDescriptions,
            durations = commitProfilingData.durations,
            effectDuration = commitProfilingData.effectDuration,
            maxActualDuration = commitProfilingData.maxActualDuration,
            passiveEffectDuration = commitProfilingData.passiveEffectDuration,
            priorityLevel = commitProfilingData.priorityLevel,
            commitTime = commitProfilingData.commitTime,
            updaters = commitProfilingData.updaters;
        var fiberActualDurations = [];
        var fiberSelfDurations = [];

        for (var i = 0; i < durations.length; i += 3) {
          var fiberID = durations[i];
          fiberActualDurations.push([fiberID, durations[i + 1]]);
          fiberSelfDurations.push([fiberID, durations[i + 2]]);
        }

        commitData.push({
          changeDescriptions: changeDescriptions !== null ? Array.from(changeDescriptions.entries()) : null,
          duration: maxActualDuration,
          effectDuration: effectDuration,
          fiberActualDurations: fiberActualDurations,
          fiberSelfDurations: fiberSelfDurations,
          passiveEffectDuration: passiveEffectDuration,
          priorityLevel: priorityLevel,
          timestamp: commitTime,
          updaters: updaters
        });
      });
      dataForRoots.push({
        commitData: commitData,
        displayName: displayName,
        initialTreeBaseDurations: initialTreeBaseDurations,
        rootID: rootID
      });
    });
    var timelineData = null;

    if (typeof getTimelineData === 'function') {
      var currentTimelineData = getTimelineData();

      if (currentTimelineData) {
        var batchUIDToMeasuresMap = currentTimelineData.batchUIDToMeasuresMap,
            internalModuleSourceToRanges = currentTimelineData.internalModuleSourceToRanges,
            laneToLabelMap = currentTimelineData.laneToLabelMap,
            laneToReactMeasureMap = currentTimelineData.laneToReactMeasureMap,
            rest = _objectWithoutProperties(currentTimelineData, ["batchUIDToMeasuresMap", "internalModuleSourceToRanges", "laneToLabelMap", "laneToReactMeasureMap"]);

        timelineData = _objectSpread(_objectSpread({}, rest), {}, {
          // Most of the data is safe to parse as-is,
          // but we need to convert the nested Arrays back to Maps.
          // Most of the data is safe to serialize as-is,
          // but we need to convert the Maps to nested Arrays.
          batchUIDToMeasuresKeyValueArray: Array.from(batchUIDToMeasuresMap.entries()),
          internalModuleSourceToRanges: Array.from(internalModuleSourceToRanges.entries()),
          laneToLabelKeyValueArray: Array.from(laneToLabelMap.entries()),
          laneToReactMeasureKeyValueArray: Array.from(laneToReactMeasureMap.entries())
        });
      }
    }

    return {
      dataForRoots: dataForRoots,
      rendererID: rendererID,
      timelineData: timelineData
    };
  }

  function startProfiling(shouldRecordChangeDescriptions) {
    if (isProfiling) {
      return;
    }

    recordChangeDescriptions = shouldRecordChangeDescriptions; // Capture initial values as of the time profiling starts.
    // It's important we snapshot both the durations and the id-to-root map,
    // since either of these may change during the profiling session
    // (e.g. when a fiber is re-rendered or when a fiber gets removed).

    displayNamesByRootID = new Map();
    initialTreeBaseDurationsMap = new Map(idToTreeBaseDurationMap);
    initialIDToRootMap = new Map(idToRootMap);
    idToContextsMap = new Map();
    hook.getFiberRoots(rendererID).forEach(function (root) {
      var rootID = getFiberIDThrows(root.current);
      displayNamesByRootID.set(rootID, getDisplayNameForRoot(root.current));

      if (shouldRecordChangeDescriptions) {
        // Record all contexts at the time profiling is started.
        // Fibers only store the current context value,
        // so we need to track them separately in order to determine changed keys.
        crawlToInitializeContextsMap(root.current);
      }
    });
    isProfiling = true;
    profilingStartTime = renderer_getCurrentTime();
    rootToCommitProfilingMetadataMap = new Map();

    if (toggleProfilingStatus !== null) {
      toggleProfilingStatus(true);
    }
  }

  function stopProfiling() {
    isProfiling = false;
    recordChangeDescriptions = false;

    if (toggleProfilingStatus !== null) {
      toggleProfilingStatus(false);
    }
  } // Automatically start profiling so that we don't miss timing info from initial "mount".


  if (sessionStorageGetItem(SESSION_STORAGE_RELOAD_AND_PROFILE_KEY) === 'true') {
    startProfiling(sessionStorageGetItem(SESSION_STORAGE_RECORD_CHANGE_DESCRIPTIONS_KEY) === 'true');
  } // React will switch between these implementations depending on whether
  // we have any manually suspended/errored-out Fibers or not.


  function shouldErrorFiberAlwaysNull() {
    return null;
  } // Map of id and its force error status: true (error), false (toggled off),
  // null (do nothing)


  var forceErrorForFiberIDs = new Map();

  function shouldErrorFiberAccordingToMap(fiber) {
    if (typeof setErrorHandler !== 'function') {
      throw new Error('Expected overrideError() to not get called for earlier React versions.');
    }

    var id = getFiberIDUnsafe(fiber);

    if (id === null) {
      return null;
    }

    var status = null;

    if (forceErrorForFiberIDs.has(id)) {
      status = forceErrorForFiberIDs.get(id);

      if (status === false) {
        // TRICKY overrideError adds entries to this Map,
        // so ideally it would be the method that clears them too,
        // but that would break the functionality of the feature,
        // since DevTools needs to tell React to act differently than it normally would
        // (don't just re-render the failed boundary, but reset its errored state too).
        // So we can only clear it after telling React to reset the state.
        // Technically this is premature and we should schedule it for later,
        // since the render could always fail without committing the updated error boundary,
        // but since this is a DEV-only feature, the simplicity is worth the trade off.
        forceErrorForFiberIDs.delete(id);

        if (forceErrorForFiberIDs.size === 0) {
          // Last override is gone. Switch React back to fast path.
          setErrorHandler(shouldErrorFiberAlwaysNull);
        }
      }
    }

    return status;
  }

  function overrideError(id, forceError) {
    if (typeof setErrorHandler !== 'function' || typeof scheduleUpdate !== 'function') {
      throw new Error('Expected overrideError() to not get called for earlier React versions.');
    }

    forceErrorForFiberIDs.set(id, forceError);

    if (forceErrorForFiberIDs.size === 1) {
      // First override is added. Switch React to slower path.
      setErrorHandler(shouldErrorFiberAccordingToMap);
    }

    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber != null) {
      scheduleUpdate(fiber);
    }
  }

  function shouldSuspendFiberAlwaysFalse() {
    return false;
  }

  var forceFallbackForSuspenseIDs = new Set();

  function shouldSuspendFiberAccordingToSet(fiber) {
    var maybeID = getFiberIDUnsafe(fiber);
    return maybeID !== null && forceFallbackForSuspenseIDs.has(maybeID);
  }

  function overrideSuspense(id, forceFallback) {
    if (typeof setSuspenseHandler !== 'function' || typeof scheduleUpdate !== 'function') {
      throw new Error('Expected overrideSuspense() to not get called for earlier React versions.');
    }

    if (forceFallback) {
      forceFallbackForSuspenseIDs.add(id);

      if (forceFallbackForSuspenseIDs.size === 1) {
        // First override is added. Switch React to slower path.
        setSuspenseHandler(shouldSuspendFiberAccordingToSet);
      }
    } else {
      forceFallbackForSuspenseIDs.delete(id);

      if (forceFallbackForSuspenseIDs.size === 0) {
        // Last override is gone. Switch React back to fast path.
        setSuspenseHandler(shouldSuspendFiberAlwaysFalse);
      }
    }

    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber != null) {
      scheduleUpdate(fiber);
    }
  } // Remember if we're trying to restore the selection after reload.
  // In that case, we'll do some extra checks for matching mounts.


  var trackedPath = null;
  var trackedPathMatchFiber = null;
  var trackedPathMatchDepth = -1;
  var mightBeOnTrackedPath = false;

  function setTrackedPath(path) {
    if (path === null) {
      trackedPathMatchFiber = null;
      trackedPathMatchDepth = -1;
      mightBeOnTrackedPath = false;
    }

    trackedPath = path;
  } // We call this before traversing a new mount.
  // It remembers whether this Fiber is the next best match for tracked path.
  // The return value signals whether we should keep matching siblings or not.


  function updateTrackedPathStateBeforeMount(fiber) {
    if (trackedPath === null || !mightBeOnTrackedPath) {
      // Fast path: there's nothing to track so do nothing and ignore siblings.
      return false;
    }

    var returnFiber = fiber.return;
    var returnAlternate = returnFiber !== null ? returnFiber.alternate : null; // By now we know there's some selection to restore, and this is a new Fiber.
    // Is this newly mounted Fiber a direct child of the current best match?
    // (This will also be true for new roots if we haven't matched anything yet.)

    if (trackedPathMatchFiber === returnFiber || trackedPathMatchFiber === returnAlternate && returnAlternate !== null) {
      // Is this the next Fiber we should select? Let's compare the frames.
      var actualFrame = getPathFrame(fiber); // $FlowFixMe[incompatible-use] found when upgrading Flow

      var expectedFrame = trackedPath[trackedPathMatchDepth + 1];

      if (expectedFrame === undefined) {
        throw new Error('Expected to see a frame at the next depth.');
      }

      if (actualFrame.index === expectedFrame.index && actualFrame.key === expectedFrame.key && actualFrame.displayName === expectedFrame.displayName) {
        // We have our next match.
        trackedPathMatchFiber = fiber;
        trackedPathMatchDepth++; // Are we out of frames to match?
        // $FlowFixMe[incompatible-use] found when upgrading Flow

        if (trackedPathMatchDepth === trackedPath.length - 1) {
          // There's nothing that can possibly match afterwards.
          // Don't check the children.
          mightBeOnTrackedPath = false;
        } else {
          // Check the children, as they might reveal the next match.
          mightBeOnTrackedPath = true;
        } // In either case, since we have a match, we don't need
        // to check the siblings. They'll never match.


        return false;
      }
    } // This Fiber's parent is on the path, but this Fiber itself isn't.
    // There's no need to check its children--they won't be on the path either.


    mightBeOnTrackedPath = false; // However, one of its siblings may be on the path so keep searching.

    return true;
  }

  function updateTrackedPathStateAfterMount(mightSiblingsBeOnTrackedPath) {
    // updateTrackedPathStateBeforeMount() told us whether to match siblings.
    // Now that we're entering siblings, let's use that information.
    mightBeOnTrackedPath = mightSiblingsBeOnTrackedPath;
  } // Roots don't have a real persistent identity.
  // A root's "pseudo key" is "childDisplayName:indexWithThatName".
  // For example, "App:0" or, in case of similar roots, "Story:0", "Story:1", etc.
  // We will use this to try to disambiguate roots when restoring selection between reloads.


  var rootPseudoKeys = new Map();
  var rootDisplayNameCounter = new Map();

  function setRootPseudoKey(id, fiber) {
    var name = getDisplayNameForRoot(fiber);
    var counter = rootDisplayNameCounter.get(name) || 0;
    rootDisplayNameCounter.set(name, counter + 1);
    var pseudoKey = "".concat(name, ":").concat(counter);
    rootPseudoKeys.set(id, pseudoKey);
  }

  function removeRootPseudoKey(id) {
    var pseudoKey = rootPseudoKeys.get(id);

    if (pseudoKey === undefined) {
      throw new Error('Expected root pseudo key to be known.');
    }

    var name = pseudoKey.slice(0, pseudoKey.lastIndexOf(':'));
    var counter = rootDisplayNameCounter.get(name);

    if (counter === undefined) {
      throw new Error('Expected counter to be known.');
    }

    if (counter > 1) {
      rootDisplayNameCounter.set(name, counter - 1);
    } else {
      rootDisplayNameCounter.delete(name);
    }

    rootPseudoKeys.delete(id);
  }

  function getDisplayNameForRoot(fiber) {
    var preferredDisplayName = null;
    var fallbackDisplayName = null;
    var child = fiber.child; // Go at most three levels deep into direct children
    // while searching for a child that has a displayName.

    for (var i = 0; i < 3; i++) {
      if (child === null) {
        break;
      }

      var displayName = getDisplayNameForFiber(child);

      if (displayName !== null) {
        // Prefer display names that we get from user-defined components.
        // We want to avoid using e.g. 'Suspense' unless we find nothing else.
        if (typeof child.type === 'function') {
          // There's a few user-defined tags, but we'll prefer the ones
          // that are usually explicitly named (function or class components).
          preferredDisplayName = displayName;
        } else if (fallbackDisplayName === null) {
          fallbackDisplayName = displayName;
        }
      }

      if (preferredDisplayName !== null) {
        break;
      }

      child = child.child;
    }

    return preferredDisplayName || fallbackDisplayName || 'Anonymous';
  }

  function getPathFrame(fiber) {
    var key = fiber.key;
    var displayName = getDisplayNameForFiber(fiber);
    var index = fiber.index;

    switch (fiber.tag) {
      case HostRoot:
        // Roots don't have a real displayName, index, or key.
        // Instead, we'll use the pseudo key (childDisplayName:indexWithThatName).
        var id = getFiberIDThrows(fiber);
        var pseudoKey = rootPseudoKeys.get(id);

        if (pseudoKey === undefined) {
          throw new Error('Expected mounted root to have known pseudo key.');
        }

        displayName = pseudoKey;
        break;

      case HostComponent:
        displayName = fiber.type;
        break;

      default:
        break;
    }

    return {
      displayName: displayName,
      key: key,
      index: index
    };
  } // Produces a serializable representation that does a best effort
  // of identifying a particular Fiber between page reloads.
  // The return path will contain Fibers that are "invisible" to the store
  // because their keys and indexes are important to restoring the selection.


  function getPathForElement(id) {
    var fiber = idToArbitraryFiberMap.get(id);

    if (fiber == null) {
      return null;
    }

    var keyPath = [];

    while (fiber !== null) {
      // $FlowFixMe[incompatible-call] found when upgrading Flow
      keyPath.push(getPathFrame(fiber)); // $FlowFixMe[incompatible-use] found when upgrading Flow

      fiber = fiber.return;
    }

    keyPath.reverse();
    return keyPath;
  }

  function getBestMatchForTrackedPath() {
    if (trackedPath === null) {
      // Nothing to match.
      return null;
    }

    if (trackedPathMatchFiber === null) {
      // We didn't find anything.
      return null;
    } // Find the closest Fiber store is aware of.


    var fiber = trackedPathMatchFiber;

    while (fiber !== null && shouldFilterFiber(fiber)) {
      fiber = fiber.return;
    }

    if (fiber === null) {
      return null;
    }

    return {
      id: getFiberIDThrows(fiber),
      // $FlowFixMe[incompatible-use] found when upgrading Flow
      isFullMatch: trackedPathMatchDepth === trackedPath.length - 1
    };
  }

  var formatPriorityLevel = function formatPriorityLevel(priorityLevel) {
    if (priorityLevel == null) {
      return 'Unknown';
    }

    switch (priorityLevel) {
      case ImmediatePriority:
        return 'Immediate';

      case UserBlockingPriority:
        return 'User-Blocking';

      case NormalPriority:
        return 'Normal';

      case LowPriority:
        return 'Low';

      case IdlePriority:
        return 'Idle';

      case NoPriority:
      default:
        return 'Unknown';
    }
  };

  function setTraceUpdatesEnabled(isEnabled) {
    traceUpdatesEnabled = isEnabled;
  }

  function hasFiberWithId(id) {
    return idToArbitraryFiberMap.has(id);
  }

  function getComponentStackForFiber(fiber) {
    var componentStack = fiberToComponentStackMap.get(fiber);

    if (componentStack == null) {
      var dispatcherRef = getDispatcherRef(renderer);

      if (dispatcherRef == null) {
        return null;
      }

      componentStack = getStackByFiberInDevAndProd(ReactTypeOfWork, fiber, dispatcherRef);
      fiberToComponentStackMap.set(fiber, componentStack);
    }

    return componentStack;
  }

  function getSourceForFiber(fiber) {
    var componentStack = getComponentStackForFiber(fiber);

    if (componentStack == null) {
      return null;
    }

    return parseSourceFromComponentStack(componentStack);
  }

  return {
    cleanup: cleanup,
    clearErrorsAndWarnings: clearErrorsAndWarnings,
    clearErrorsForFiberID: clearErrorsForFiberID,
    clearWarningsForFiberID: clearWarningsForFiberID,
    getSerializedElementValueByPath: getSerializedElementValueByPath,
    deletePath: deletePath,
    findNativeNodesForFiberID: findNativeNodesForFiberID,
    flushInitialOperations: flushInitialOperations,
    getBestMatchForTrackedPath: getBestMatchForTrackedPath,
    getComponentStackForFiber: getComponentStackForFiber,
    getSourceForFiber: getSourceForFiber,
    getDisplayNameForFiberID: getDisplayNameForFiberID,
    getFiberForNative: getFiberForNative,
    getFiberIDForNative: getFiberIDForNative,
    getInstanceAndStyle: getInstanceAndStyle,
    getOwnersList: getOwnersList,
    getPathForElement: getPathForElement,
    getProfilingData: getProfilingData,
    handleCommitFiberRoot: handleCommitFiberRoot,
    handleCommitFiberUnmount: handleCommitFiberUnmount,
    handlePostCommitFiberRoot: handlePostCommitFiberRoot,
    hasFiberWithId: hasFiberWithId,
    inspectElement: inspectElement,
    logElementToConsole: logElementToConsole,
    patchConsoleForStrictMode: patchConsoleForStrictMode,
    prepareViewAttributeSource: prepareViewAttributeSource,
    prepareViewElementSource: prepareViewElementSource,
    overrideError: overrideError,
    overrideSuspense: overrideSuspense,
    overrideValueAtPath: overrideValueAtPath,
    renamePath: renamePath,
    renderer: renderer,
    setTraceUpdatesEnabled: setTraceUpdatesEnabled,
    setTrackedPath: setTrackedPath,
    startProfiling: startProfiling,
    stopProfiling: stopProfiling,
    storeAsGlobal: storeAsGlobal,
    unpatchConsoleForStrictMode: unpatchConsoleForStrictMode,
    updateComponentFilters: updateComponentFilters
  };
}

/***/ }),

/***/ 15:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ep": () => (/* binding */ formatWithStyles),
/* harmony export */   "WU": () => (/* binding */ format),
/* harmony export */   "eg": () => (/* binding */ gte),
/* harmony export */   "gt": () => (/* binding */ gt)
/* harmony export */ });
/* unused harmony exports hasAssignedBackend, cleanForBridge, copyWithDelete, copyWithRename, copyWithSet, getEffectDurations, serializeToString, isSynchronousXHRSupported, isReactNativeEnvironment, parseSourceFromComponentStack */
/* harmony import */ var compare_versions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(242);
/* harmony import */ var _hydration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(508);
/* harmony import */ var shared_isArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(189);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */



// TODO: update this to the first React version that has a corresponding DevTools backend
var FIRST_DEVTOOLS_BACKEND_LOCKSTEP_VER = '999.9.9';
function hasAssignedBackend(version) {
  if (version == null || version === '') {
    return false;
  }

  return gte(version, FIRST_DEVTOOLS_BACKEND_LOCKSTEP_VER);
}
function cleanForBridge(data, isPathAllowed) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (data !== null) {
    var cleanedPaths = [];
    var unserializablePaths = [];
    var cleanedData = dehydrate(data, cleanedPaths, unserializablePaths, path, isPathAllowed);
    return {
      data: cleanedData,
      cleaned: cleanedPaths,
      unserializable: unserializablePaths
    };
  } else {
    return null;
  }
}
function copyWithDelete(obj, path) {
  var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var key = path[index];
  var updated = isArray(obj) ? obj.slice() : _objectSpread({}, obj);

  if (index + 1 === path.length) {
    if (isArray(updated)) {
      updated.splice(key, 1);
    } else {
      delete updated[key];
    }
  } else {
    // $FlowFixMe[incompatible-use] number or string is fine here
    updated[key] = copyWithDelete(obj[key], path, index + 1);
  }

  return updated;
} // This function expects paths to be the same except for the final value.
// e.g. ['path', 'to', 'foo'] and ['path', 'to', 'bar']

function copyWithRename(obj, oldPath, newPath) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var oldKey = oldPath[index];
  var updated = isArray(obj) ? obj.slice() : _objectSpread({}, obj);

  if (index + 1 === oldPath.length) {
    var newKey = newPath[index]; // $FlowFixMe[incompatible-use] number or string is fine here

    updated[newKey] = updated[oldKey];

    if (isArray(updated)) {
      updated.splice(oldKey, 1);
    } else {
      delete updated[oldKey];
    }
  } else {
    // $FlowFixMe[incompatible-use] number or string is fine here
    updated[oldKey] = copyWithRename(obj[oldKey], oldPath, newPath, index + 1);
  }

  return updated;
}
function copyWithSet(obj, path, value) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (index >= path.length) {
    return value;
  }

  var key = path[index];
  var updated = isArray(obj) ? obj.slice() : _objectSpread({}, obj); // $FlowFixMe[incompatible-use] number or string is fine here

  updated[key] = copyWithSet(obj[key], path, value, index + 1);
  return updated;
}
function getEffectDurations(root) {
  // Profiling durations are only available for certain builds.
  // If available, they'll be stored on the HostRoot.
  var effectDuration = null;
  var passiveEffectDuration = null;
  var hostRoot = root.current;

  if (hostRoot != null) {
    var stateNode = hostRoot.stateNode;

    if (stateNode != null) {
      effectDuration = stateNode.effectDuration != null ? stateNode.effectDuration : null;
      passiveEffectDuration = stateNode.passiveEffectDuration != null ? stateNode.passiveEffectDuration : null;
    }
  }

  return {
    effectDuration: effectDuration,
    passiveEffectDuration: passiveEffectDuration
  };
}
function serializeToString(data) {
  if (data === undefined) {
    return 'undefined';
  }

  if (typeof data === 'function') {
    return data.toString();
  }

  var cache = new Set(); // Use a custom replacer function to protect against circular references.

  return JSON.stringify(data, function (key, value) {
    if (_typeof(value) === 'object' && value !== null) {
      if (cache.has(value)) {
        return;
      }

      cache.add(value);
    }

    if (typeof value === 'bigint') {
      return value.toString() + 'n';
    }

    return value;
  }, 2);
} // Formats an array of args with a style for console methods, using
// the following algorithm:
//     1. The first param is a string that contains %c
//          - Bail out and return the args without modifying the styles.
//            We don't want to affect styles that the developer deliberately set.
//     2. The first param is a string that doesn't contain %c but contains
//        string formatting
//          - [`%c${args[0]}`, style, ...args.slice(1)]
//          - Note: we assume that the string formatting that the developer uses
//            is correct.
//     3. The first param is a string that doesn't contain string formatting
//        OR is not a string
//          - Create a formatting string where:
//                 boolean, string, symbol -> %s
//                 number -> %f OR %i depending on if it's an int or float
//                 default -> %o

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
} // based on https://github.com/tmpfs/format-util/blob/0e62d430efb0a1c51448709abd3e2406c14d8401/format.js#L1
// based on https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
// Implements s, d, i and f placeholders
// NOTE: KEEP IN SYNC with src/hook.js

function format(maybeMessage) {
  for (var _len = arguments.length, inputArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    inputArgs[_key - 1] = arguments[_key];
  }

  var args = inputArgs.slice();
  var formatted = String(maybeMessage); // If the first argument is a string, check for substitutions.

  if (typeof maybeMessage === 'string') {
    if (args.length) {
      var REGEXP = /(%?)(%([jds]))/g;
      formatted = formatted.replace(REGEXP, function (match, escaped, ptn, flag) {
        var arg = args.shift();

        switch (flag) {
          case 's':
            arg += '';
            break;

          case 'd':
          case 'i':
            arg = parseInt(arg, 10).toString();
            break;

          case 'f':
            arg = parseFloat(arg).toString();
            break;
        }

        if (!escaped) {
          return arg;
        }

        args.unshift(arg);
        return match;
      });
    }
  } // Arguments that remain after formatting.


  if (args.length) {
    for (var i = 0; i < args.length; i++) {
      formatted += ' ' + String(args[i]);
    }
  } // Update escaped %% values.


  formatted = formatted.replace(/%{2,2}/g, '%');
  return String(formatted);
}
function isSynchronousXHRSupported() {
  return !!(window.document && window.document.featurePolicy && window.document.featurePolicy.allowsFeature('sync-xhr'));
}
function gt() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (0,compare_versions__WEBPACK_IMPORTED_MODULE_2__/* .compareVersions */ .n4)(a, b) === 1;
}
function gte() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return (0,compare_versions__WEBPACK_IMPORTED_MODULE_2__/* .compareVersions */ .n4)(a, b) > -1;
}
var isReactNativeEnvironment = function isReactNativeEnvironment() {
  // We've been relying on this for such a long time
  // We should probably define the client for DevTools on the backend side and share it with the frontend
  return window.document == null;
};

function extractLocation(url) {
  if (url.indexOf(':') === -1) {
    return null;
  } // remove any parentheses from start and end


  var withoutParentheses = url.replace(/^\(+/, '').replace(/\)+$/, '');
  var locationParts = /(at )?(.+?)(?::(\d+))?(?::(\d+))?$/.exec(withoutParentheses);

  if (locationParts == null) {
    return null;
  }

  var _locationParts = _slicedToArray(locationParts, 5),
      sourceURL = _locationParts[2],
      line = _locationParts[3],
      column = _locationParts[4];

  return {
    sourceURL: sourceURL,
    line: line,
    column: column
  };
}

var CHROME_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;

function parseSourceFromChromeStack(stack) {
  var frames = stack.split('\n'); // eslint-disable-next-line no-for-of-loops/no-for-of-loops

  var _iterator = _createForOfIteratorHelper(frames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var frame = _step.value;
      var sanitizedFrame = frame.trim();
      var locationInParenthesesMatch = sanitizedFrame.match(/ (\(.+\)$)/);
      var possibleLocation = locationInParenthesesMatch ? locationInParenthesesMatch[1] : sanitizedFrame;
      var location = extractLocation(possibleLocation); // Continue the search until at least sourceURL is found

      if (location == null) {
        continue;
      }

      var sourceURL = location.sourceURL,
          _location$line = location.line,
          line = _location$line === void 0 ? '1' : _location$line,
          _location$column = location.column,
          column = _location$column === void 0 ? '1' : _location$column;
      return {
        sourceURL: sourceURL,
        line: parseInt(line, 10),
        column: parseInt(column, 10)
      };
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return null;
}

function parseSourceFromFirefoxStack(stack) {
  var frames = stack.split('\n'); // eslint-disable-next-line no-for-of-loops/no-for-of-loops

  var _iterator2 = _createForOfIteratorHelper(frames),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var frame = _step2.value;
      var sanitizedFrame = frame.trim();
      var frameWithoutFunctionName = sanitizedFrame.replace(/((.*".+"[^@]*)?[^@]*)(?:@)/, '');
      var location = extractLocation(frameWithoutFunctionName); // Continue the search until at least sourceURL is found

      if (location == null) {
        continue;
      }

      var sourceURL = location.sourceURL,
          _location$line2 = location.line,
          line = _location$line2 === void 0 ? '1' : _location$line2,
          _location$column2 = location.column,
          column = _location$column2 === void 0 ? '1' : _location$column2;
      return {
        sourceURL: sourceURL,
        line: parseInt(line, 10),
        column: parseInt(column, 10)
      };
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return null;
}

function parseSourceFromComponentStack(componentStack) {
  if (componentStack.match(CHROME_STACK_REGEXP)) {
    return parseSourceFromChromeStack(componentStack);
  }

  return parseSourceFromFirefoxStack(componentStack);
}

/***/ }),

/***/ 630:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "et": () => (/* binding */ consoleManagedByDevToolsDuringStrictMode)
/* harmony export */ });
/* unused harmony exports enableLogger, enableStyleXFeatures, isInternalFacebookBuild */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/************************************************************************
 * This file is forked between different DevTools implementations.
 * It should never be imported directly!
 * It should always be imported from "react-devtools-feature-flags".
 ************************************************************************/
var consoleManagedByDevToolsDuringStrictMode = false;
var enableLogger = false;
var enableStyleXFeatures = false;
var isInternalFacebookBuild = false;
/************************************************************************
 * Do not edit the code below.
 * It ensures this fork exports the same types as the default flags file.
 ************************************************************************/

// Flow magic to verify the exports of this file match the original version.
null;

/***/ }),

/***/ 508:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports meta, dehydrate, fillInPath, hydrate */
/* harmony import */ var react_devtools_shared_src_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var meta = {
  inspectable: Symbol('inspectable'),
  inspected: Symbol('inspected'),
  name: Symbol('name'),
  preview_long: Symbol('preview_long'),
  preview_short: Symbol('preview_short'),
  readonly: Symbol('readonly'),
  size: Symbol('size'),
  type: Symbol('type'),
  unserializable: Symbol('unserializable')
};
// This threshold determines the depth at which the bridge "dehydrates" nested data.
// Dehydration means that we don't serialize the data for e.g. postMessage or stringify,
// unless the frontend explicitly requests it (e.g. a user clicks to expand a props object).
//
// Reducing this threshold will improve the speed of initial component inspection,
// but may decrease the responsiveness of expanding objects/arrays to inspect further.
var LEVEL_THRESHOLD = 2;
/**
 * Generate the dehydrated metadata for complex object instances
 */

function createDehydrated(type, inspectable, data, cleaned, path) {
  cleaned.push(path);
  var dehydrated = {
    inspectable: inspectable,
    type: type,
    preview_long: formatDataForPreview(data, true),
    preview_short: formatDataForPreview(data, false),
    name: !data.constructor || data.constructor.name === 'Object' ? '' : data.constructor.name
  };

  if (type === 'array' || type === 'typed_array') {
    dehydrated.size = data.length;
  } else if (type === 'object') {
    dehydrated.size = Object.keys(data).length;
  }

  if (type === 'iterator' || type === 'typed_array') {
    dehydrated.readonly = true;
  }

  return dehydrated;
}
/**
 * Strip out complex data (instances, functions, and data nested > LEVEL_THRESHOLD levels deep).
 * The paths of the stripped out objects are appended to the `cleaned` list.
 * On the other side of the barrier, the cleaned list is used to "re-hydrate" the cleaned representation into
 * an object with symbols as attributes, so that a sanitized object can be distinguished from a normal object.
 *
 * Input: {"some": {"attr": fn()}, "other": AnInstance}
 * Output: {
 *   "some": {
 *     "attr": {"name": the fn.name, type: "function"}
 *   },
 *   "other": {
 *     "name": "AnInstance",
 *     "type": "object",
 *   },
 * }
 * and cleaned = [["some", "attr"], ["other"]]
 */


function dehydrate(data, cleaned, unserializable, path, isPathAllowed) {
  var level = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var type = getDataType(data);
  var isPathAllowedCheck;

  switch (type) {
    case 'html_element':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.tagName,
        type: type
      };

    case 'function':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: typeof data.name === 'function' || !data.name ? 'function' : data.name,
        type: type
      };

    case 'string':
      isPathAllowedCheck = isPathAllowed(path);

      if (isPathAllowedCheck) {
        return data;
      } else {
        return data.length <= 500 ? data : data.slice(0, 500) + '...';
      }

    case 'bigint':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };

    case 'symbol':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };
    // React Elements aren't very inspector-friendly,
    // and often contain private fields or circular references.

    case 'react_element':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: getDisplayNameForReactElement(data) || 'Unknown',
        type: type
      };
    // ArrayBuffers error if you try to inspect them.

    case 'array_buffer':
    case 'data_view':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: type === 'data_view' ? 'DataView' : 'ArrayBuffer',
        size: data.byteLength,
        type: type
      };

    case 'array':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      }

      return data.map(function (item, i) {
        return dehydrate(item, cleaned, unserializable, path.concat([i]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
      });

    case 'html_all_collection':
    case 'typed_array':
    case 'iterator':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      } else {
        var unserializableValue = {
          unserializable: true,
          type: type,
          readonly: true,
          size: type === 'typed_array' ? data.length : undefined,
          preview_short: formatDataForPreview(data, false),
          preview_long: formatDataForPreview(data, true),
          name: !data.constructor || data.constructor.name === 'Object' ? '' : data.constructor.name
        }; // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.

        Array.from(data).forEach(function (item, i) {
          return unserializableValue[i] = dehydrate(item, cleaned, unserializable, path.concat([i]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
        });
        unserializable.push(path);
        return unserializableValue;
      }

    case 'opaque_iterator':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data[Symbol.toStringTag],
        type: type
      };

    case 'date':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };

    case 'regexp':
      cleaned.push(path);
      return {
        inspectable: false,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.toString(),
        type: type
      };

    case 'object':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      } else {
        var object = {};
        getAllEnumerableKeys(data).forEach(function (key) {
          var name = key.toString();
          object[name] = dehydrate(data[key], cleaned, unserializable, path.concat([name]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
        });
        return object;
      }

    case 'class_instance':
      isPathAllowedCheck = isPathAllowed(path);

      if (level >= LEVEL_THRESHOLD && !isPathAllowedCheck) {
        return createDehydrated(type, true, data, cleaned, path);
      }

      var value = {
        unserializable: true,
        type: type,
        readonly: true,
        preview_short: formatDataForPreview(data, false),
        preview_long: formatDataForPreview(data, true),
        name: data.constructor.name
      };
      getAllEnumerableKeys(data).forEach(function (key) {
        var keyAsString = key.toString();
        value[keyAsString] = dehydrate(data[key], cleaned, unserializable, path.concat([keyAsString]), isPathAllowed, isPathAllowedCheck ? 1 : level + 1);
      });
      unserializable.push(path);
      return value;

    case 'infinity':
    case 'nan':
    case 'undefined':
      // Some values are lossy when sent through a WebSocket.
      // We dehydrate+rehydrate them to preserve their type.
      cleaned.push(path);
      return {
        type: type
      };

    default:
      return data;
  }
}
function fillInPath(object, data, path, value) {
  var target = getInObject(object, path);

  if (target != null) {
    if (!target[meta.unserializable]) {
      delete target[meta.inspectable];
      delete target[meta.inspected];
      delete target[meta.name];
      delete target[meta.preview_long];
      delete target[meta.preview_short];
      delete target[meta.readonly];
      delete target[meta.size];
      delete target[meta.type];
    }
  }

  if (value !== null && data.unserializable.length > 0) {
    var unserializablePath = data.unserializable[0];
    var isMatch = unserializablePath.length === path.length;

    for (var i = 0; i < path.length; i++) {
      if (path[i] !== unserializablePath[i]) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) {
      upgradeUnserializable(value, value);
    }
  }

  setInObject(object, path, value);
}
function hydrate(object, cleaned, unserializable) {
  cleaned.forEach(function (path) {
    var length = path.length;
    var last = path[length - 1];
    var parent = getInObject(object, path.slice(0, length - 1));

    if (!parent || !parent.hasOwnProperty(last)) {
      return;
    }

    var value = parent[last];

    if (!value) {
      return;
    } else if (value.type === 'infinity') {
      parent[last] = Infinity;
    } else if (value.type === 'nan') {
      parent[last] = NaN;
    } else if (value.type === 'undefined') {
      parent[last] = undefined;
    } else {
      // Replace the string keys with Symbols so they're non-enumerable.
      var replaced = {};
      replaced[meta.inspectable] = !!value.inspectable;
      replaced[meta.inspected] = false;
      replaced[meta.name] = value.name;
      replaced[meta.preview_long] = value.preview_long;
      replaced[meta.preview_short] = value.preview_short;
      replaced[meta.size] = value.size;
      replaced[meta.readonly] = !!value.readonly;
      replaced[meta.type] = value.type;
      parent[last] = replaced;
    }
  });
  unserializable.forEach(function (path) {
    var length = path.length;
    var last = path[length - 1];
    var parent = getInObject(object, path.slice(0, length - 1));

    if (!parent || !parent.hasOwnProperty(last)) {
      return;
    }

    var node = parent[last];

    var replacement = _objectSpread({}, node);

    upgradeUnserializable(replacement, node);
    parent[last] = replacement;
  });
  return object;
}

function upgradeUnserializable(destination, source) {
  var _Object$definePropert;

  Object.defineProperties(destination, (_Object$definePropert = {}, _defineProperty(_Object$definePropert, meta.inspected, {
    configurable: true,
    enumerable: false,
    value: !!source.inspected
  }), _defineProperty(_Object$definePropert, meta.name, {
    configurable: true,
    enumerable: false,
    value: source.name
  }), _defineProperty(_Object$definePropert, meta.preview_long, {
    configurable: true,
    enumerable: false,
    value: source.preview_long
  }), _defineProperty(_Object$definePropert, meta.preview_short, {
    configurable: true,
    enumerable: false,
    value: source.preview_short
  }), _defineProperty(_Object$definePropert, meta.size, {
    configurable: true,
    enumerable: false,
    value: source.size
  }), _defineProperty(_Object$definePropert, meta.readonly, {
    configurable: true,
    enumerable: false,
    value: !!source.readonly
  }), _defineProperty(_Object$definePropert, meta.type, {
    configurable: true,
    enumerable: false,
    value: source.type
  }), _defineProperty(_Object$definePropert, meta.unserializable, {
    configurable: true,
    enumerable: false,
    value: !!source.unserializable
  }), _Object$definePropert));
  delete destination.inspected;
  delete destination.name;
  delete destination.preview_long;
  delete destination.preview_short;
  delete destination.size;
  delete destination.readonly;
  delete destination.type;
  delete destination.unserializable;
}

/***/ }),

/***/ 765:
/***/ (() => {

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var isArray = Array.isArray;
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (isArray)));

/***/ }),

/***/ 20:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "qw": () => (/* binding */ castBool),
  "d6": () => (/* binding */ castBrowserTheme),
  "Gf": () => (/* binding */ getDisplayName),
  "z6": () => (/* binding */ getWrappedDisplayName)
});

// UNUSED EXPORTS: alphaSortKeys, backendToFrontendSerializedElementMapper, deletePathInObject, filterOutLocationComponentFilters, formatDataForPreview, getAllEnumerableKeys, getAppendComponentStack, getBreakOnConsoleErrors, getDataType, getDefaultComponentFilters, getDefaultOpenInEditorURL, getDisplayNameForReactElement, getHideConsoleLogsInStrictMode, getInObject, getOpenInEditorURL, getSavedComponentFilters, getShowInlineWarningsAndErrors, getUID, isPlainObject, normalizeUrl, parseElementDisplayNameFromBackend, printOperationsArray, renamePathInObject, setInObject, setSavedComponentFilters, shallowDiffers, utfDecodeStringWithRanges, utfEncodeString

// EXTERNAL MODULE: ../../node_modules/lru-cache/index.js
var lru_cache = __webpack_require__(730);
var lru_cache_default = /*#__PURE__*/__webpack_require__.n(lru_cache);
// EXTERNAL MODULE: ../shared/ReactFeatureFlags.js
var ReactFeatureFlags = __webpack_require__(178);
;// CONCATENATED MODULE: ../shared/ReactSymbols.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
 // ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.

var ReactSymbols_REACT_LEGACY_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_ELEMENT_TYPE = ReactFeatureFlags/* renameElementSymbol */.dd ? Symbol.for('react.transitional.element') : ReactSymbols_REACT_LEGACY_ELEMENT_TYPE;
var ReactSymbols_REACT_PORTAL_TYPE = Symbol.for('react.portal');
var ReactSymbols_REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var ReactSymbols_REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var ReactSymbols_REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var ReactSymbols_REACT_PROVIDER_TYPE = Symbol.for('react.provider'); // TODO: Delete with enableRenderableContext

var ReactSymbols_REACT_CONSUMER_TYPE = Symbol.for('react.consumer');
var ReactSymbols_REACT_CONTEXT_TYPE = Symbol.for('react.context');
var ReactSymbols_REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var ReactSymbols_REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var ReactSymbols_REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var ReactSymbols_REACT_MEMO_TYPE = Symbol.for('react.memo');
var ReactSymbols_REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_SCOPE_TYPE = Symbol.for('react.scope');
var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for('react.debug_trace_mode');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var REACT_LEGACY_HIDDEN_TYPE = Symbol.for('react.legacy_hidden');
var REACT_TRACING_MARKER_TYPE = Symbol.for('react.tracing_marker');
var REACT_MEMO_CACHE_SENTINEL = Symbol.for('react.memo_cache_sentinel');
var REACT_POSTPONE_TYPE = Symbol.for('react.postpone');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || _typeof(maybeIterable) !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}
var ASYNC_ITERATOR = Symbol.asyncIterator;
// EXTERNAL MODULE: ./src/hydration.js
var hydration = __webpack_require__(508);
// EXTERNAL MODULE: ./src/isArray.js
var src_isArray = __webpack_require__(765);
;// CONCATENATED MODULE: ./src/utils.js
/* provided dependency */ var process = __webpack_require__(169);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function utils_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { utils_typeof = function _typeof(obj) { return typeof obj; }; } else { utils_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return utils_typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */










// $FlowFixMe[method-unbinding]
var utils_hasOwnProperty = Object.prototype.hasOwnProperty;
var cachedDisplayNames = new WeakMap(); // On large trees, encoding takes significant time.
// Try to reuse the already encoded strings.

var encodedStringCache = new (lru_cache_default())({
  max: 1000
});
function alphaSortKeys(a, b) {
  if (a.toString() > b.toString()) {
    return 1;
  } else if (b.toString() > a.toString()) {
    return -1;
  } else {
    return 0;
  }
}
function getAllEnumerableKeys(obj) {
  var keys = new Set();
  var current = obj;

  var _loop = function _loop() {
    var currentKeys = [].concat(_toConsumableArray(Object.keys(current)), _toConsumableArray(Object.getOwnPropertySymbols(current)));
    var descriptors = Object.getOwnPropertyDescriptors(current);
    currentKeys.forEach(function (key) {
      // $FlowFixMe[incompatible-type]: key can be a Symbol https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
      if (descriptors[key].enumerable) {
        keys.add(key);
      }
    });
    current = Object.getPrototypeOf(current);
  };

  while (current != null) {
    _loop();
  }

  return keys;
} // Mirror https://github.com/facebook/react/blob/7c21bf72ace77094fd1910cc350a548287ef8350/packages/shared/getComponentName.js#L27-L37

function getWrappedDisplayName(outerType, innerType, wrapperName, fallbackName) {
  var displayName = outerType === null || outerType === void 0 ? void 0 : outerType.displayName;
  return displayName || "".concat(wrapperName, "(").concat(getDisplayName(innerType, fallbackName), ")");
}
function getDisplayName(type) {
  var fallbackName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Anonymous';
  var nameFromCache = cachedDisplayNames.get(type);

  if (nameFromCache != null) {
    return nameFromCache;
  }

  var displayName = fallbackName; // The displayName property is not guaranteed to be a string.
  // It's only safe to use for our purposes if it's a string.
  // github.com/facebook/react-devtools/issues/803

  if (typeof type.displayName === 'string') {
    displayName = type.displayName;
  } else if (typeof type.name === 'string' && type.name !== '') {
    displayName = type.name;
  }

  cachedDisplayNames.set(type, displayName);
  return displayName;
}
var uidCounter = 0;
function getUID() {
  return ++uidCounter;
}
function utfDecodeStringWithRanges(array, left, right) {
  var string = '';

  for (var i = left; i <= right; i++) {
    string += String.fromCodePoint(array[i]);
  }

  return string;
}

function surrogatePairToCodePoint(charCode1, charCode2) {
  return ((charCode1 & 0x3ff) << 10) + (charCode2 & 0x3ff) + 0x10000;
} // Credit for this encoding approach goes to Tim Down:
// https://stackoverflow.com/questions/4877326/how-can-i-tell-if-a-string-contains-multibyte-characters-in-javascript


function utfEncodeString(string) {
  var cached = encodedStringCache.get(string);

  if (cached !== undefined) {
    return cached;
  }

  var encoded = [];
  var i = 0;
  var charCode;

  while (i < string.length) {
    charCode = string.charCodeAt(i); // Handle multibyte unicode characters (like emoji).

    if ((charCode & 0xf800) === 0xd800) {
      encoded.push(surrogatePairToCodePoint(charCode, string.charCodeAt(++i)));
    } else {
      encoded.push(charCode);
    }

    ++i;
  }

  encodedStringCache.set(string, encoded);
  return encoded;
}
function printOperationsArray(operations) {
  // The first two values are always rendererID and rootID
  var rendererID = operations[0];
  var rootID = operations[1];
  var logs = ["operations for renderer:".concat(rendererID, " and root:").concat(rootID)];
  var i = 2; // Reassemble the string table.

  var stringTable = [null // ID = 0 corresponds to the null string.
  ];
  var stringTableSize = operations[i++];
  var stringTableEnd = i + stringTableSize;

  while (i < stringTableEnd) {
    var nextLength = operations[i++];
    var nextString = utfDecodeStringWithRanges(operations, i, i + nextLength - 1);
    stringTable.push(nextString);
    i += nextLength;
  }

  while (i < operations.length) {
    var operation = operations[i];

    switch (operation) {
      case TREE_OPERATION_ADD:
        {
          var _id = operations[i + 1];
          var type = operations[i + 2];
          i += 3;

          if (type === ElementTypeRoot) {
            logs.push("Add new root node ".concat(_id));
            i++; // isStrictModeCompliant

            i++; // supportsProfiling

            i++; // supportsStrictMode

            i++; // hasOwnerMetadata
          } else {
            var parentID = operations[i];
            i++;
            i++; // ownerID

            var displayNameStringID = operations[i];
            var displayName = stringTable[displayNameStringID];
            i++;
            i++; // key

            logs.push("Add node ".concat(_id, " (").concat(displayName || 'null', ") as child of ").concat(parentID));
          }

          break;
        }

      case TREE_OPERATION_REMOVE:
        {
          var removeLength = operations[i + 1];
          i += 2;

          for (var removeIndex = 0; removeIndex < removeLength; removeIndex++) {
            var _id2 = operations[i];
            i += 1;
            logs.push("Remove node ".concat(_id2));
          }

          break;
        }

      case TREE_OPERATION_REMOVE_ROOT:
        {
          i += 1;
          logs.push("Remove root ".concat(rootID));
          break;
        }

      case TREE_OPERATION_SET_SUBTREE_MODE:
        {
          var _id3 = operations[i + 1];
          var mode = operations[i + 1];
          i += 3;
          logs.push("Mode ".concat(mode, " set for subtree with root ").concat(_id3));
          break;
        }

      case TREE_OPERATION_REORDER_CHILDREN:
        {
          var _id4 = operations[i + 1];
          var numChildren = operations[i + 2];
          i += 3;
          var children = operations.slice(i, i + numChildren);
          i += numChildren;
          logs.push("Re-order node ".concat(_id4, " children ").concat(children.join(',')));
          break;
        }

      case TREE_OPERATION_UPDATE_TREE_BASE_DURATION:
        // Base duration updates are only sent while profiling is in progress.
        // We can ignore them at this point.
        // The profiler UI uses them lazily in order to generate the tree.
        i += 3;
        break;

      case TREE_OPERATION_UPDATE_ERRORS_OR_WARNINGS:
        var id = operations[i + 1];
        var numErrors = operations[i + 2];
        var numWarnings = operations[i + 3];
        i += 4;
        logs.push("Node ".concat(id, " has ").concat(numErrors, " errors and ").concat(numWarnings, " warnings"));
        break;

      default:
        throw Error("Unsupported Bridge operation \"".concat(operation, "\""));
    }
  }

  console.log(logs.join('\n  '));
}
function getDefaultComponentFilters() {
  return [{
    type: ComponentFilterElementType,
    value: ElementTypeHostComponent,
    isEnabled: true
  }];
}
function getSavedComponentFilters() {
  try {
    var raw = localStorageGetItem(LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY);

    if (raw != null) {
      var parsedFilters = JSON.parse(raw);
      return filterOutLocationComponentFilters(parsedFilters);
    }
  } catch (error) {}

  return getDefaultComponentFilters();
}
function setSavedComponentFilters(componentFilters) {
  localStorageSetItem(LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY, JSON.stringify(filterOutLocationComponentFilters(componentFilters)));
} // Following __debugSource removal from Fiber, the new approach for finding the source location
// of a component, represented by the Fiber, is based on lazily generating and parsing component stack frames
// To find the original location, React DevTools will perform symbolication, source maps are required for that.
// In order to start filtering Fibers, we need to find location for all of them, which can't be done lazily.
// Eager symbolication can become quite expensive for large applications.

function filterOutLocationComponentFilters(componentFilters) {
  // This is just an additional check to preserve the previous state
  // Filters can be stored on the backend side or in user land (in a window object)
  if (!Array.isArray(componentFilters)) {
    return componentFilters;
  }

  return componentFilters.filter(function (f) {
    return f.type !== ComponentFilterLocation;
  });
}

function parseBool(s) {
  if (s === 'true') {
    return true;
  }

  if (s === 'false') {
    return false;
  }
}

function castBool(v) {
  if (v === true || v === false) {
    return v;
  }
}
function castBrowserTheme(v) {
  if (v === 'light' || v === 'dark' || v === 'auto') {
    return v;
  }
}
function getAppendComponentStack() {
  var _parseBool;

  var raw = localStorageGetItem(LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY);
  return (_parseBool = parseBool(raw)) !== null && _parseBool !== void 0 ? _parseBool : true;
}
function getBreakOnConsoleErrors() {
  var _parseBool2;

  var raw = localStorageGetItem(LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS);
  return (_parseBool2 = parseBool(raw)) !== null && _parseBool2 !== void 0 ? _parseBool2 : false;
}
function getHideConsoleLogsInStrictMode() {
  var _parseBool3;

  var raw = localStorageGetItem(LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE);
  return (_parseBool3 = parseBool(raw)) !== null && _parseBool3 !== void 0 ? _parseBool3 : false;
}
function getShowInlineWarningsAndErrors() {
  var _parseBool4;

  var raw = localStorageGetItem(LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY);
  return (_parseBool4 = parseBool(raw)) !== null && _parseBool4 !== void 0 ? _parseBool4 : true;
}
function getDefaultOpenInEditorURL() {
  return typeof process.env.EDITOR_URL === 'string' ? process.env.EDITOR_URL : '';
}
function getOpenInEditorURL() {
  try {
    var raw = localStorageGetItem(LOCAL_STORAGE_OPEN_IN_EDITOR_URL);

    if (raw != null) {
      return JSON.parse(raw);
    }
  } catch (error) {}

  return getDefaultOpenInEditorURL();
}
function parseElementDisplayNameFromBackend(displayName, type) {
  if (displayName === null) {
    return {
      formattedDisplayName: null,
      hocDisplayNames: null,
      compiledWithForget: false
    };
  }

  if (displayName.startsWith('Forget(')) {
    var displayNameWithoutForgetWrapper = displayName.slice(7, displayName.length - 1);

    var _parseElementDisplayN = parseElementDisplayNameFromBackend(displayNameWithoutForgetWrapper, type),
        formattedDisplayName = _parseElementDisplayN.formattedDisplayName,
        _hocDisplayNames = _parseElementDisplayN.hocDisplayNames;

    return {
      formattedDisplayName: formattedDisplayName,
      hocDisplayNames: _hocDisplayNames,
      compiledWithForget: true
    };
  }

  var hocDisplayNames = null;

  switch (type) {
    case ElementTypeClass:
    case ElementTypeForwardRef:
    case ElementTypeFunction:
    case ElementTypeMemo:
      if (displayName.indexOf('(') >= 0) {
        var matches = displayName.match(/[^()]+/g);

        if (matches != null) {
          displayName = matches.pop();
          hocDisplayNames = matches;
        }
      }

      break;

    default:
      break;
  }

  return {
    formattedDisplayName: displayName,
    hocDisplayNames: hocDisplayNames,
    compiledWithForget: false
  };
} // Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349

function shallowDiffers(prev, next) {
  for (var attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }

  for (var _attribute in next) {
    if (prev[_attribute] !== next[_attribute]) {
      return true;
    }
  }

  return false;
}
function getInObject(object, path) {
  return path.reduce(function (reduced, attr) {
    if (reduced) {
      if (utils_hasOwnProperty.call(reduced, attr)) {
        return reduced[attr];
      }

      if (typeof reduced[Symbol.iterator] === 'function') {
        // Convert iterable to array and return array[index]
        //
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        return Array.from(reduced)[attr];
      }
    }

    return null;
  }, object);
}
function deletePathInObject(object, path) {
  var length = path.length;
  var last = path[length - 1];

  if (object != null) {
    var parent = getInObject(object, path.slice(0, length - 1));

    if (parent) {
      if (isArray(parent)) {
        parent.splice(last, 1);
      } else {
        delete parent[last];
      }
    }
  }
}
function renamePathInObject(object, oldPath, newPath) {
  var length = oldPath.length;

  if (object != null) {
    var parent = getInObject(object, oldPath.slice(0, length - 1));

    if (parent) {
      var lastOld = oldPath[length - 1];
      var lastNew = newPath[length - 1];
      parent[lastNew] = parent[lastOld];

      if (isArray(parent)) {
        parent.splice(lastOld, 1);
      } else {
        delete parent[lastOld];
      }
    }
  }
}
function setInObject(object, path, value) {
  var length = path.length;
  var last = path[length - 1];

  if (object != null) {
    var parent = getInObject(object, path.slice(0, length - 1));

    if (parent) {
      parent[last] = value;
    }
  }
}

/**
 * Get a enhanced/artificial type string based on the object instance
 */
function getDataType(data) {
  if (data === null) {
    return 'null';
  } else if (data === undefined) {
    return 'undefined';
  }

  if (isElement(data)) {
    return 'react_element';
  }

  if (typeof HTMLElement !== 'undefined' && data instanceof HTMLElement) {
    return 'html_element';
  }

  var type = utils_typeof(data);

  switch (type) {
    case 'bigint':
      return 'bigint';

    case 'boolean':
      return 'boolean';

    case 'function':
      return 'function';

    case 'number':
      if (Number.isNaN(data)) {
        return 'nan';
      } else if (!Number.isFinite(data)) {
        return 'infinity';
      } else {
        return 'number';
      }

    case 'object':
      if (isArray(data)) {
        return 'array';
      } else if (ArrayBuffer.isView(data)) {
        return utils_hasOwnProperty.call(data.constructor, 'BYTES_PER_ELEMENT') ? 'typed_array' : 'data_view';
      } else if (data.constructor && data.constructor.name === 'ArrayBuffer') {
        // HACK This ArrayBuffer check is gross; is there a better way?
        // We could try to create a new DataView with the value.
        // If it doesn't error, we know it's an ArrayBuffer,
        // but this seems kind of awkward and expensive.
        return 'array_buffer';
      } else if (typeof data[Symbol.iterator] === 'function') {
        var iterator = data[Symbol.iterator]();

        if (!iterator) {// Proxies might break assumptoins about iterators.
          // See github.com/facebook/react/issues/21654
        } else {
          return iterator === data ? 'opaque_iterator' : 'iterator';
        }
      } else if (data.constructor && data.constructor.name === 'RegExp') {
        return 'regexp';
      } else {
        // $FlowFixMe[method-unbinding]
        var toStringValue = Object.prototype.toString.call(data);

        if (toStringValue === '[object Date]') {
          return 'date';
        } else if (toStringValue === '[object HTMLAllCollection]') {
          return 'html_all_collection';
        }
      }

      if (!isPlainObject(data)) {
        return 'class_instance';
      }

      return 'object';

    case 'string':
      return 'string';

    case 'symbol':
      return 'symbol';

    case 'undefined':
      if ( // $FlowFixMe[method-unbinding]
      Object.prototype.toString.call(data) === '[object HTMLAllCollection]') {
        return 'html_all_collection';
      }

      return 'undefined';

    default:
      return 'unknown';
  }
} // Fork of packages/react-is/src/ReactIs.js:30, but with legacy element type
// Which has been changed in https://github.com/facebook/react/pull/28813

function typeOfWithLegacyElementSymbol(object) {
  if (utils_typeof(object) === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_LEGACY_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
                return $$typeofType;

              case REACT_CONSUMER_TYPE:
                if (enableRenderableContext) {
                  return $$typeofType;
                }

              // Fall through

              case REACT_PROVIDER_TYPE:
                if (!enableRenderableContext) {
                  return $$typeofType;
                }

              // Fall through

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

function getDisplayNameForReactElement(element) {
  var elementType = typeOf(element) || typeOfWithLegacyElementSymbol(element);

  switch (elementType) {
    case ContextConsumer:
      return 'ContextConsumer';

    case ContextProvider:
      return 'ContextProvider';

    case ForwardRef:
      return 'ForwardRef';

    case Fragment:
      return 'Fragment';

    case Lazy:
      return 'Lazy';

    case Memo:
      return 'Memo';

    case Portal:
      return 'Portal';

    case Profiler:
      return 'Profiler';

    case StrictMode:
      return 'StrictMode';

    case Suspense:
      return 'Suspense';

    case SuspenseList:
      return 'SuspenseList';

    case TracingMarker:
      return 'TracingMarker';

    default:
      var type = element.type;

      if (typeof type === 'string') {
        return type;
      } else if (typeof type === 'function') {
        return getDisplayName(type, 'Anonymous');
      } else if (type != null) {
        return 'NotImplementedInDevtools';
      } else {
        return 'Element';
      }

  }
}
var MAX_PREVIEW_STRING_LENGTH = 50;

function truncateForDisplay(string) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MAX_PREVIEW_STRING_LENGTH;

  if (string.length > length) {
    return string.slice(0, length) + '…';
  } else {
    return string;
  }
} // Attempts to mimic Chrome's inline preview for values.
// For example, the following value...
//   {
//      foo: 123,
//      bar: "abc",
//      baz: [true, false],
//      qux: { ab: 1, cd: 2 }
//   };
//
// Would show a preview of...
//   {foo: 123, bar: "abc", baz: Array(2), qux: {…}}
//
// And the following value...
//   [
//     123,
//     "abc",
//     [true, false],
//     { foo: 123, bar: "abc" }
//   ];
//
// Would show a preview of...
//   [123, "abc", Array(2), {…}]


function formatDataForPreview(data, showFormattedValue) {
  if (data != null && utils_hasOwnProperty.call(data, meta.type)) {
    return showFormattedValue ? data[meta.preview_long] : data[meta.preview_short];
  }

  var type = getDataType(data);

  switch (type) {
    case 'html_element':
      return "<".concat(truncateForDisplay(data.tagName.toLowerCase()), " />");

    case 'function':
      return truncateForDisplay("\u0192 ".concat(typeof data.name === 'function' ? '' : data.name, "() {}"));

    case 'string':
      return "\"".concat(data, "\"");

    case 'bigint':
      return truncateForDisplay(data.toString() + 'n');

    case 'regexp':
      return truncateForDisplay(data.toString());

    case 'symbol':
      return truncateForDisplay(data.toString());

    case 'react_element':
      return "<".concat(truncateForDisplay(getDisplayNameForReactElement(data) || 'Unknown'), " />");

    case 'array_buffer':
      return "ArrayBuffer(".concat(data.byteLength, ")");

    case 'data_view':
      return "DataView(".concat(data.buffer.byteLength, ")");

    case 'array':
      if (showFormattedValue) {
        var formatted = '';

        for (var i = 0; i < data.length; i++) {
          if (i > 0) {
            formatted += ', ';
          }

          formatted += formatDataForPreview(data[i], false);

          if (formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "[".concat(truncateForDisplay(formatted), "]");
      } else {
        var length = utils_hasOwnProperty.call(data, meta.size) ? data[meta.size] : data.length;
        return "Array(".concat(length, ")");
      }

    case 'typed_array':
      var shortName = "".concat(data.constructor.name, "(").concat(data.length, ")");

      if (showFormattedValue) {
        var _formatted = '';

        for (var _i = 0; _i < data.length; _i++) {
          if (_i > 0) {
            _formatted += ', ';
          }

          _formatted += data[_i];

          if (_formatted.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "".concat(shortName, " [").concat(truncateForDisplay(_formatted), "]");
      } else {
        return shortName;
      }

    case 'iterator':
      var name = data.constructor.name;

      if (showFormattedValue) {
        // TRICKY
        // Don't use [...spread] syntax for this purpose.
        // This project uses @babel/plugin-transform-spread in "loose" mode which only works with Array values.
        // Other types (e.g. typed arrays, Sets) will not spread correctly.
        var array = Array.from(data);
        var _formatted2 = '';

        for (var _i2 = 0; _i2 < array.length; _i2++) {
          var entryOrEntries = array[_i2];

          if (_i2 > 0) {
            _formatted2 += ', ';
          } // TRICKY
          // Browsers display Maps and Sets differently.
          // To mimic their behavior, detect if we've been given an entries tuple.
          //   Map(2) {"abc" => 123, "def" => 123}
          //   Set(2) {"abc", 123}


          if (isArray(entryOrEntries)) {
            var key = formatDataForPreview(entryOrEntries[0], true);
            var value = formatDataForPreview(entryOrEntries[1], false);
            _formatted2 += "".concat(key, " => ").concat(value);
          } else {
            _formatted2 += formatDataForPreview(entryOrEntries, false);
          }

          if (_formatted2.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "".concat(name, "(").concat(data.size, ") {").concat(truncateForDisplay(_formatted2), "}");
      } else {
        return "".concat(name, "(").concat(data.size, ")");
      }

    case 'opaque_iterator':
      {
        return data[Symbol.toStringTag];
      }

    case 'date':
      return data.toString();

    case 'class_instance':
      return data.constructor.name;

    case 'object':
      if (showFormattedValue) {
        var keys = Array.from(getAllEnumerableKeys(data)).sort(alphaSortKeys);
        var _formatted3 = '';

        for (var _i3 = 0; _i3 < keys.length; _i3++) {
          var _key = keys[_i3];

          if (_i3 > 0) {
            _formatted3 += ', ';
          }

          _formatted3 += "".concat(_key.toString(), ": ").concat(formatDataForPreview(data[_key], false));

          if (_formatted3.length > MAX_PREVIEW_STRING_LENGTH) {
            // Prevent doing a lot of unnecessary iteration...
            break;
          }
        }

        return "{".concat(truncateForDisplay(_formatted3), "}");
      } else {
        return '{…}';
      }

    case 'boolean':
    case 'number':
    case 'infinity':
    case 'nan':
    case 'null':
    case 'undefined':
      return data;

    default:
      try {
        return truncateForDisplay(String(data));
      } catch (error) {
        return 'unserializable';
      }

  }
} // Basically checking that the object only has Object in its prototype chain

var isPlainObject = function isPlainObject(object) {
  var objectPrototype = Object.getPrototypeOf(object);
  if (!objectPrototype) return true;
  var objectParentPrototype = Object.getPrototypeOf(objectPrototype);
  return !objectParentPrototype;
};
function backendToFrontendSerializedElementMapper(element) {
  var _parseElementDisplayN2 = parseElementDisplayNameFromBackend(element.displayName, element.type),
      formattedDisplayName = _parseElementDisplayN2.formattedDisplayName,
      hocDisplayNames = _parseElementDisplayN2.hocDisplayNames,
      compiledWithForget = _parseElementDisplayN2.compiledWithForget;

  return _objectSpread(_objectSpread({}, element), {}, {
    displayName: formattedDisplayName,
    hocDisplayNames: hocDisplayNames,
    compiledWithForget: compiledWithForget
  });
} // This is a hacky one to just support this exact case.

function normalizeUrl(url) {
  return url.replace('/./', '/');
}

/***/ }),

/***/ 178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dd": () => (/* binding */ renameElementSymbol)
/* harmony export */ });
/* unused harmony exports enableComponentStackLocations, favorSafetyOverHydrationPerf, enableAsyncActions, disableSchedulerTimeoutInWorkLoop, enableDeferRootSchedulingToMicrotask, disableDefaultPropsExceptForClasses, enableSuspenseCallback, enableScopeAPI, enableCreateEventHandleAPI, enableLegacyFBSupport, enableCache, enableLegacyCache, enableBinaryFlight, enableFlightReadableStream, enableAsyncIterableChildren, enableTaint, enablePostpone, enableTransitionTracing, enableLazyContextPropagation, enableLegacyHidden, enableSuspenseAvoidThisFallback, enableSuspenseAvoidThisFallbackFizz, enableCPUSuspense, enableUseMemoCacheHook, enableNoCloningMemoCache, enableUseEffectEventHook, enableFizzExternalRuntime, alwaysThrottleRetries, passChildrenWhenCloningPersistedNodes, enableServerComponentLogs, enableAddPropertiesFastPath, enableOwnerStacks, enableShallowPropDiffing, enableRetryLaneExpiration, retryLaneExpirationMs, syncLaneExpirationMs, transitionLaneExpirationMs, disableLegacyContext, useModernStrictMode, disableIEWorkarounds, enableFilterEmptyStringAttributesDOM, disableClientCache, enableInfiniteRenderLoopDetection, enableRefAsProp, disableStringRefs, enableFastJSX, enableReactTestRendererWarning, disableLegacyMode, enableRenderableContext, enableUseDeferredValueInitialArg, forceConcurrentByDefaultForTesting, enableUnifiedSyncLane, allowConcurrentByDefault, disableCommentsAsDOMContainers, enableTrustedTypesIntegration, disableInputAttributeSyncing, disableTextareaChildren, enableSchedulingProfiler, debugRenderPhaseSideEffectsForStrictMode, enableProfilerTimer, enableProfilerCommitHooks, enableProfilerNestedUpdatePhase, enableDebugTracing, enableAsyncDebugInfo, enableUpdaterTracking, enableGetInspectorDataForInstanceInProduction, consoleManagedByDevToolsDuringStrictMode, enableDO_NOT_USE_disableStrictPassiveEffect */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
// -----------------------------------------------------------------------------
// Land or remove (zero effort)
//
// Flags that can likely be deleted or landed without consequences
// -----------------------------------------------------------------------------
var enableComponentStackLocations = true; // -----------------------------------------------------------------------------
// Killswitch
//
// Flags that exist solely to turn off a change in case it causes a regression
// when it rolls out to prod. We should remove these as soon as possible.
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Land or remove (moderate effort)
//
// Flags that can be probably deleted or landed, but might require extra effort
// like migrating internal callers or performance testing.
// -----------------------------------------------------------------------------
// TODO: Finish rolling out in www

var favorSafetyOverHydrationPerf = true;
var enableAsyncActions = true; // Need to remove didTimeout argument from Scheduler before landing

var disableSchedulerTimeoutInWorkLoop = false; // This will break some internal tests at Meta so we need to gate this until
// those can be fixed.

var enableDeferRootSchedulingToMicrotask = true; // TODO: Land at Meta before removing.

var disableDefaultPropsExceptForClasses = true; // -----------------------------------------------------------------------------
// Slated for removal in the future (significant effort)
//
// These are experiments that didn't work out, and never shipped, but we can't
// delete from the codebase until we migrate internal callers.
// -----------------------------------------------------------------------------
// Add a callback property to suspense to notify which promises are currently
// in the update queue. This allows reporting and tracing of what is causing
// the user to see a loading state.
//
// Also allows hydration callbacks to fire when a dehydrated boundary gets
// hydrated or deleted.
//
// This will eventually be replaced by the Transition Tracing proposal.

var enableSuspenseCallback = false; // Experimental Scope support.

var enableScopeAPI = false; // Experimental Create Event Handle API.

var enableCreateEventHandleAPI = false; // Support legacy Primer support on internal FB www

var enableLegacyFBSupport = false; // -----------------------------------------------------------------------------
// Ongoing experiments
//
// These are features that we're either actively exploring or are reasonably
// likely to include in an upcoming release.
// -----------------------------------------------------------------------------

var enableCache = true;
var enableLegacyCache = (/* unused pure expression or super */ null && (true));
var enableBinaryFlight = true;
var enableFlightReadableStream = true;
var enableAsyncIterableChildren = (/* unused pure expression or super */ null && (true));
var enableTaint = (/* unused pure expression or super */ null && (true));
var enablePostpone = (/* unused pure expression or super */ null && (true));
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLazyContextPropagation = false; // FB-only usage. The new API has different semantics.

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber

var enableSuspenseAvoidThisFallback = false; // Enables unstable_avoidThisFallback feature in Fizz

var enableSuspenseAvoidThisFallbackFizz = false;
var enableCPUSuspense = (/* unused pure expression or super */ null && (true)); // Enables useMemoCache hook, intended as a compilation target for
// auto-memoization.

var enableUseMemoCacheHook = true; // Test this at Meta before enabling.

var enableNoCloningMemoCache = false;
var enableUseEffectEventHook = (/* unused pure expression or super */ null && (true)); // Test in www before enabling in open source.
// Enables DOM-server to stream its instruction set as data-attributes
// (handled with an MutationObserver) instead of inline-scripts

var enableFizzExternalRuntime = (/* unused pure expression or super */ null && (true));
var alwaysThrottleRetries = true;
var passChildrenWhenCloningPersistedNodes = false;
var enableServerComponentLogs = (/* unused pure expression or super */ null && (true));
var enableAddPropertiesFastPath = false;
var enableOwnerStacks = (/* unused pure expression or super */ null && (true));
var enableShallowPropDiffing = false;
/**
 * Enables an expiration time for retry lanes to avoid starvation.
 */

var enableRetryLaneExpiration = false;
var retryLaneExpirationMs = 5000;
var syncLaneExpirationMs = 250;
var transitionLaneExpirationMs = 5000; // -----------------------------------------------------------------------------
// Ready for next major.
//
// Alias __NEXT_MAJOR__ to __EXPERIMENTAL__ for easier skimming.
// -----------------------------------------------------------------------------
// TODO: Anything that's set to `true` in this section should either be cleaned
// up (if it's on everywhere, including Meta and RN builds) or moved to a
// different section of this file.
// const __NEXT_MAJOR__ = __EXPERIMENTAL__;
// Renames the internal symbol for elements since they have changed signature/constructor

var renameElementSymbol = true; // Removes legacy style context

var disableLegacyContext = true; // Not ready to break experimental yet.
// Modern <StrictMode /> behaviour aligns more with what components
// components will encounter in production, especially when used With <Offscreen />.
// TODO: clean up legacy <StrictMode /> once tests pass WWW.

var useModernStrictMode = true; // Not ready to break experimental yet.
// Remove IE and MsApp specific workarounds for innerHTML

var disableIEWorkarounds = true; // Filter certain DOM attributes (e.g. src, href) if their values are empty
// strings. This prevents e.g. <img src=""> from making an unnecessary HTTP
// request for certain browsers.

var enableFilterEmptyStringAttributesDOM = true; // Disabled caching behavior of `react/cache` in client runtimes.

var disableClientCache = true;
/**
 * Enables a new error detection for infinite render loops from updates caused
 * by setState or similar outside of the component owning the state.
 */

var enableInfiniteRenderLoopDetection = true; // Subtle breaking changes to JSX runtime to make it faster, like passing `ref`
// as a normal prop instead of stripping it from the props object.
// Passes `ref` as a normal prop instead of stripping it from the props object
// during element creation.

var enableRefAsProp = true;
var disableStringRefs = true;
var enableFastJSX = true; // Warn on any usage of ReactTestRenderer

var enableReactTestRendererWarning = true; // Disables legacy mode
// This allows us to land breaking changes to remove legacy mode APIs in experimental builds
// before removing them in stable in the next Major

var disableLegacyMode = true; // Make <Context> equivalent to <Context.Provider> instead of <Context.Consumer>

var enableRenderableContext = true; // Enables the `initialValue` option for `useDeferredValue`

var enableUseDeferredValueInitialArg = true; // -----------------------------------------------------------------------------
// Chopping Block
//
// Planned feature deprecations and breaking changes. Sorted roughly in order of
// when we plan to enable them.
// -----------------------------------------------------------------------------
// Enables time slicing for updates that aren't wrapped in startTransition.

var forceConcurrentByDefaultForTesting = false;
var enableUnifiedSyncLane = true; // Adds an opt-in to time slicing for updates that aren't wrapped in startTransition.

var allowConcurrentByDefault = false; // -----------------------------------------------------------------------------
// React DOM Chopping Block
//
// Similar to main Chopping Block but only flags related to React DOM. These are
// grouped because we will likely batch all of them into a single major release.
// -----------------------------------------------------------------------------
// Disable support for comment nodes as React DOM containers. Already disabled
// in open source, but www codebase still relies on it. Need to remove.

var disableCommentsAsDOMContainers = true;
var enableTrustedTypesIntegration = false; // Prevent the value and checked attributes from syncing with their related
// DOM properties

var disableInputAttributeSyncing = false; // Disables children for <textarea> elements

var disableTextareaChildren = false; // -----------------------------------------------------------------------------
// Debugging and DevTools
// -----------------------------------------------------------------------------
// Adds user timing marks for e.g. state updates, suspense, and work loop stuff,
// for an experimental timeline tool.

var enableSchedulingProfiler = (/* unused pure expression or super */ null && (false)); // Helps identify side effects in render-phase lifecycle hooks and setState
// reducers by double invoking them in StrictLegacyMode.

var debugRenderPhaseSideEffectsForStrictMode = (/* unused pure expression or super */ null && (false)); // Gather advanced timing metrics for Profiler subtrees.

var enableProfilerTimer = (/* unused pure expression or super */ null && (false)); // Record durations for commit and passive effects phases.

var enableProfilerCommitHooks = (/* unused pure expression or super */ null && (false)); // Phase param passed to onRender callback differentiates between an "update" and a "cascading-update".

var enableProfilerNestedUpdatePhase = (/* unused pure expression or super */ null && (false)); // Adds verbose console logging for e.g. state updates, suspense, and work loop
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false;
var enableAsyncDebugInfo = (/* unused pure expression or super */ null && (true)); // Track which Fiber(s) schedule render work.

var enableUpdaterTracking = (/* unused pure expression or super */ null && (false)); // Internal only.

var enableGetInspectorDataForInstanceInProduction = false;
var consoleManagedByDevToolsDuringStrictMode = true;
var enableDO_NOT_USE_disableStrictPassiveEffect = false;

/***/ }),

/***/ 189:
/***/ (() => {

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (isArray)));

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
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
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__(917);
/******/ var __webpack_exports__dangerous_setTargetConsoleForTesting = __webpack_exports__.up;
/******/ var __webpack_exports__installConsoleFunctionsToWindow = __webpack_exports__.aB;
/******/ var __webpack_exports__isStringComponentStack = __webpack_exports__.pb;
/******/ var __webpack_exports__patch = __webpack_exports__.r$;
/******/ var __webpack_exports__patchConsoleUsingWindowValues = __webpack_exports__.An;
/******/ var __webpack_exports__patchForStrictMode = __webpack_exports__.i5;
/******/ var __webpack_exports__registerRenderer = __webpack_exports__.zn;
/******/ var __webpack_exports__unpatch = __webpack_exports__.g_;
/******/ var __webpack_exports__unpatchForStrictMode = __webpack_exports__.OR;
/******/ var __webpack_exports__writeConsolePatchSettingsToWindow = __webpack_exports__.B9;
/******/ export { __webpack_exports__dangerous_setTargetConsoleForTesting as dangerous_setTargetConsoleForTesting, __webpack_exports__installConsoleFunctionsToWindow as installConsoleFunctionsToWindow, __webpack_exports__isStringComponentStack as isStringComponentStack, __webpack_exports__patch as patch, __webpack_exports__patchConsoleUsingWindowValues as patchConsoleUsingWindowValues, __webpack_exports__patchForStrictMode as patchForStrictMode, __webpack_exports__registerRenderer as registerRenderer, __webpack_exports__unpatch as unpatch, __webpack_exports__unpatchForStrictMode as unpatchForStrictMode, __webpack_exports__writeConsolePatchSettingsToWindow as writeConsolePatchSettingsToWindow };
/******/ 

//# sourceMappingURL=console.js.map