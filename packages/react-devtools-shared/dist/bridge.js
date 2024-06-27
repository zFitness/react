/******/ var __webpack_modules__ = ({

/***/ 170:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ EventEmitter)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var EventEmitter = /*#__PURE__*/function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    _defineProperty(this, "listenersMap", new Map());
  }

  _createClass(EventEmitter, [{
    key: "addListener",
    value: function addListener(event, listener) {
      var listeners = this.listenersMap.get(event);

      if (listeners === undefined) {
        this.listenersMap.set(event, [listener]);
      } else {
        var index = listeners.indexOf(listener);

        if (index < 0) {
          listeners.push(listener);
        }
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var listeners = this.listenersMap.get(event);

      if (listeners !== undefined) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (listeners.length === 1) {
          // No need to clone or try/catch
          var listener = listeners[0];
          listener.apply(null, args);
        } else {
          var didThrow = false;
          var caughtError = null;
          var clonedListeners = Array.from(listeners);

          for (var i = 0; i < clonedListeners.length; i++) {
            var _listener = clonedListeners[i];

            try {
              _listener.apply(null, args);
            } catch (error) {
              if (caughtError === null) {
                didThrow = true;
                caughtError = error;
              }
            }
          }

          if (didThrow) {
            throw caughtError;
          }
        }
      }
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      this.listenersMap.clear();
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      var listeners = this.listenersMap.get(event);

      if (listeners !== undefined) {
        var index = listeners.indexOf(listener);

        if (index >= 0) {
          listeners.splice(index, 1);
        }
      }
    }
  }]);

  return EventEmitter;
}();



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
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HS": () => (/* binding */ BRIDGE_PROTOCOL),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "xQ": () => (/* binding */ currentBridgeProtocol)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(170);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var BATCH_DURATION = 100; // This message specifies the version of the DevTools protocol currently supported by the backend,
// as well as the earliest NPM version (e.g. "4.13.0") that protocol is supported by on the frontend.
// This enables an older frontend to display an upgrade message to users for a newer, unsupported backend.

// Bump protocol version whenever a backwards breaking change is made
// in the messages sent between BackendBridge and FrontendBridge.
// This mapping is embedded in both frontend and backend builds.
//
// The backend protocol will always be the latest entry in the BRIDGE_PROTOCOL array.
//
// When an older frontend connects to a newer backend,
// the backend can send the minNpmVersion and the frontend can display an NPM upgrade prompt.
//
// When a newer frontend connects with an older protocol version,
// the frontend can use the embedded minNpmVersion/maxNpmVersion values to display a downgrade prompt.
var BRIDGE_PROTOCOL = [// This version technically never existed,
// but a backwards breaking change was added in 4.11,
// so the safest guess to downgrade the frontend would be to version 4.10.
{
  version: 0,
  minNpmVersion: '"<4.11.0"',
  maxNpmVersion: '"<4.11.0"'
}, // Versions 4.11.x – 4.12.x contained the backwards breaking change,
// but we didn't add the "fix" of checking the protocol version until 4.13,
// so we don't recommend downgrading to 4.11 or 4.12.
{
  version: 1,
  minNpmVersion: '4.13.0',
  maxNpmVersion: '4.21.0'
}, // Version 2 adds a StrictMode-enabled and supports-StrictMode bits to add-root operation.
{
  version: 2,
  minNpmVersion: '4.22.0',
  maxNpmVersion: null
}];
var currentBridgeProtocol = BRIDGE_PROTOCOL[BRIDGE_PROTOCOL.length - 1];

var Bridge = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Bridge, _EventEmitter);

  var _super = _createSuper(Bridge);

  function Bridge(wall) {
    var _this;

    _classCallCheck(this, Bridge);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_isShutdown", false);

    _defineProperty(_assertThisInitialized(_this), "_messageQueue", []);

    _defineProperty(_assertThisInitialized(_this), "_timeoutID", null);

    _defineProperty(_assertThisInitialized(_this), "_wallUnlisten", null);

    _defineProperty(_assertThisInitialized(_this), "_flush", function () {
      // This method is used after the bridge is marked as destroyed in shutdown sequence,
      // so we do not bail out if the bridge marked as destroyed.
      // It is a private method that the bridge ensures is only called at the right times.
      if (_this._timeoutID !== null) {
        clearTimeout(_this._timeoutID);
        _this._timeoutID = null;
      }

      if (_this._messageQueue.length) {
        for (var i = 0; i < _this._messageQueue.length; i += 2) {
          var _this$_wall;

          (_this$_wall = _this._wall).send.apply(_this$_wall, [_this._messageQueue[i]].concat(_toConsumableArray(_this._messageQueue[i + 1])));
        }

        _this._messageQueue.length = 0; // Check again for queued messages in BATCH_DURATION ms. This will keep
        // flushing in a loop as long as messages continue to be added. Once no
        // more are, the timer expires.

        _this._timeoutID = setTimeout(_this._flush, BATCH_DURATION);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "overrideValueAtPath", function (_ref) {
      var id = _ref.id,
          path = _ref.path,
          rendererID = _ref.rendererID,
          type = _ref.type,
          value = _ref.value;

      switch (type) {
        case 'context':
          _this.send('overrideContext', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;

        case 'hooks':
          _this.send('overrideHookState', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;

        case 'props':
          _this.send('overrideProps', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;

        case 'state':
          _this.send('overrideState', {
            id: id,
            path: path,
            rendererID: rendererID,
            wasForwarded: true,
            value: value
          });

          break;
      }
    });

    _this._wall = wall;
    _this._wallUnlisten = wall.listen(function (message) {
      if (message && message.event) {
        _assertThisInitialized(_this).emit(message.event, message.payload);
      }
    }) || null; // Temporarily support older standalone front-ends sending commands to newer embedded backends.
    // We do this because React Native embeds the React DevTools backend,
    // but cannot control which version of the frontend users use.

    _this.addListener('overrideValueAtPath', _this.overrideValueAtPath);

    return _this;
  } // Listening directly to the wall isn't advised.
  // It can be used to listen for legacy (v3) messages (since they use a different format).


  _createClass(Bridge, [{
    key: "send",
    value: function send(event) {
      if (this._isShutdown) {
        console.warn("Cannot send message \"".concat(event, "\" through a Bridge that has been shutdown."));
        return;
      } // When we receive a message:
      // - we add it to our queue of messages to be sent
      // - if there hasn't been a message recently, we set a timer for 0 ms in
      //   the future, allowing all messages created in the same tick to be sent
      //   together
      // - if there *has* been a message flushed in the last BATCH_DURATION ms
      //   (or we're waiting for our setTimeout-0 to fire), then _timeoutID will
      //   be set, and we'll simply add to the queue and wait for that


      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      this._messageQueue.push(event, payload);

      if (!this._timeoutID) {
        this._timeoutID = setTimeout(this._flush, 0);
      }
    }
  }, {
    key: "shutdown",
    value: function shutdown() {
      if (this._isShutdown) {
        console.warn('Bridge was already shutdown.');
        return;
      } // Queue the shutdown outgoing message for subscribers.


      this.emit('shutdown');
      this.send('shutdown'); // Mark this bridge as destroyed, i.e. disable its public API.

      this._isShutdown = true; // Disable the API inherited from EventEmitter that can add more listeners and send more messages.
      // $FlowFixMe[cannot-write] This property is not writable.

      this.addListener = function () {}; // $FlowFixMe[cannot-write] This property is not writable.


      this.emit = function () {}; // NOTE: There's also EventEmitter API like `on` and `prependListener` that we didn't add to our Flow type of EventEmitter.
      // Unsubscribe this bridge incoming message listeners to be sure, and so they don't have to do that.


      this.removeAllListeners(); // Stop accepting and emitting incoming messages from the wall.

      var wallUnlisten = this._wallUnlisten;

      if (wallUnlisten) {
        wallUnlisten();
      } // Synchronously flush all queued outgoing messages.
      // At this step the subscribers' code may run in this call stack.


      do {
        this._flush();
      } while (this._messageQueue.length); // Make sure once again that there is no dangling timer.


      if (this._timeoutID !== null) {
        clearTimeout(this._timeoutID);
        this._timeoutID = null;
      }
    }
  }, {
    key: "wall",
    get: function get() {
      return this._wall;
    }
  }]);

  return Bridge;
}(_events__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bridge);
})();

var __webpack_exports__BRIDGE_PROTOCOL = __webpack_exports__.HS;
var __webpack_exports__currentBridgeProtocol = __webpack_exports__.xQ;
var __webpack_exports__default = __webpack_exports__.ZP;
export { __webpack_exports__BRIDGE_PROTOCOL as BRIDGE_PROTOCOL, __webpack_exports__currentBridgeProtocol as currentBridgeProtocol, __webpack_exports__default as default };

//# sourceMappingURL=bridge.js.map