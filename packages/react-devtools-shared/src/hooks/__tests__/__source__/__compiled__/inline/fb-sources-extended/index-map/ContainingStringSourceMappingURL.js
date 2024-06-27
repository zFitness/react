"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;

var _react = _interopRequireWildcard(require("react"));

var _jsxFileName = "";

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ?sourceMappingURL=([^\s'"]+)/gm
const abc = 'abc';
const string = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + abc;

function Component() {
  const [count, setCount] = (0, _react.useState)(0);
  return /*#__PURE__*/_react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 5
    }
  }, /*#__PURE__*/_react.default.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 7
    }
  }, "You clicked ", count, " times"), /*#__PURE__*/_react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, "string: ", string), /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => setCount(count + 1),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, "Click me"));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzZWN0aW9ucyI6W3sib2Zmc2V0Ijp7ImxpbmUiOjAsImNvbHVtbiI6MH0sIm1hcCI6eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRhaW5pbmdTdHJpbmdTb3VyY2VNYXBwaW5nVVJMLmpzIl0sIm5hbWVzIjpbImFiYyIsInN0cmluZyIsIkNvbXBvbmVudCIsImNvdW50Iiwic2V0Q291bnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFFQTtBQUVBLE1BQU1BLEdBQUcsR0FBRyxLQUFaO0FBQ0EsTUFBTUMsTUFBTSxHQUNWLGlFQUFpRUQsR0FEbkU7O0FBR08sU0FBU0UsU0FBVCxHQUFxQjtBQUMxQixRQUFNLENBQUNDLEtBQUQsRUFBUUMsUUFBUixJQUFvQixxQkFBUyxDQUFULENBQTFCO0FBRUEsc0JBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdCRCxLQUFoQixXQURGLGVBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWNGLE1BQWQsQ0FGRixlQUdFO0FBQVEsSUFBQSxPQUFPLEVBQUUsTUFBTUcsUUFBUSxDQUFDRCxLQUFLLEdBQUcsQ0FBVCxDQUEvQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxnQkFIRixDQURGO0FBT0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuXG4vLyA/c291cmNlTWFwcGluZ1VSTD0oW15cXHMnXCJdKykvZ21cblxuY29uc3QgYWJjID0gJ2FiYyc7XG5jb25zdCBzdHJpbmcgPVxuICAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGFiYztcblxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgY29uc3QgW2NvdW50LCBzZXRDb3VudF0gPSB1c2VTdGF0ZSgwKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8cD5Zb3UgY2xpY2tlZCB7Y291bnR9IHRpbWVzPC9wPlxuICAgICAgPGRpdj5zdHJpbmc6IHtzdHJpbmd9PC9kaXY+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldENvdW50KGNvdW50ICsgMSl9PkNsaWNrIG1lPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwieF9mYWNlYm9va19zb3VyY2VzIjpbW251bGwsW3sibmFtZXMiOlsiPG5vLWhvb2s+IiwiY291bnQiXSwibWFwcGluZ3MiOiJDQUFEO21CNEJDQSxBV0RBIn1dXV19fV19