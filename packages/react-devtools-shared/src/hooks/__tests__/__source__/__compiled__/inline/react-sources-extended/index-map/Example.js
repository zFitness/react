"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;

var _react = _interopRequireWildcard(require("react"));

var _jsxFileName = "";

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Component() {
  const [count, setCount] = (0, _react.useState)(0);
  return /*#__PURE__*/_react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 5
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }
  }, "You clicked ", count, " times"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCount(count + 1),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }
  }, "Click me"));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzZWN0aW9ucyI6W3sib2Zmc2V0Ijp7ImxpbmUiOjAsImNvbHVtbiI6MH0sIm1hcCI6eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkV4YW1wbGUuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiY291bnQiLCJzZXRDb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBOzs7Ozs7OztBQUVPLFNBQVNBLFNBQVQsR0FBcUI7QUFDMUIsUUFBTSxDQUFDQyxLQUFELEVBQVFDLFFBQVIsSUFBb0IscUJBQVMsQ0FBVCxDQUExQjtBQUVBLHNCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFnQkQsS0FBaEIsV0FERixlQUVFO0FBQVEsSUFBQSxPQUFPLEVBQUUsTUFBTUMsUUFBUSxDQUFDRCxLQUFLLEdBQUcsQ0FBVCxDQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFGRixDQURGO0FBTUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICBjb25zdCBbY291bnQsIHNldENvdW50XSA9IHVzZVN0YXRlKDApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxwPllvdSBjbGlja2VkIHtjb3VudH0gdGltZXM8L3A+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldENvdW50KGNvdW50ICsgMSl9PkNsaWNrIG1lPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwieF9yZWFjdF9zb3VyY2VzIjpbW3sibmFtZXMiOlsiPG5vLWhvb2s+IiwiY291bnQiXSwibWFwcGluZ3MiOiJDQUFEO2E0QkNBLEFXREEifV1dfX1dfQ==