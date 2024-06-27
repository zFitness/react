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
  const countState = (0, _react.useState)(0);
  const count = countState[0];
  const setCount = countState[1];
  const darkMode = useIsDarkMode();
  const [isDarkMode] = darkMode;
  (0, _react.useEffect)(() => {// ...
  }, []);

  const handleClick = () => setCount(count + 1);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, "Dark mode? ", isDarkMode), /*#__PURE__*/_react.default.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }
  }, "Count: ", count), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30,
      columnNumber: 7
    }
  }, "Update count"));
}

function useIsDarkMode() {
  const darkModeState = (0, _react.useState)(false);
  const [isDarkMode] = darkModeState;
  (0, _react.useEffect)(function useEffectCreate() {// Here is where we may listen to a "theme" event...
  }, []);
  return [isDarkMode, () => {}];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudFVzaW5nSG9va3NJbmRpcmVjdGx5LmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsImNvdW50U3RhdGUiLCJjb3VudCIsInNldENvdW50IiwiZGFya01vZGUiLCJ1c2VJc0RhcmtNb2RlIiwiaXNEYXJrTW9kZSIsImhhbmRsZUNsaWNrIiwiZGFya01vZGVTdGF0ZSIsInVzZUVmZmVjdENyZWF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQVNBOzs7Ozs7OztBQUVPLFNBQVNBLFNBQVQsR0FBcUI7QUFDMUIsUUFBTUMsVUFBVSxHQUFHLHFCQUFTLENBQVQsQ0FBbkI7QUFDQSxRQUFNQyxLQUFLLEdBQUdELFVBQVUsQ0FBQyxDQUFELENBQXhCO0FBQ0EsUUFBTUUsUUFBUSxHQUFHRixVQUFVLENBQUMsQ0FBRCxDQUEzQjtBQUVBLFFBQU1HLFFBQVEsR0FBR0MsYUFBYSxFQUE5QjtBQUNBLFFBQU0sQ0FBQ0MsVUFBRCxJQUFlRixRQUFyQjtBQUVBLHdCQUFVLE1BQU0sQ0FDZDtBQUNELEdBRkQsRUFFRyxFQUZIOztBQUlBLFFBQU1HLFdBQVcsR0FBRyxNQUFNSixRQUFRLENBQUNELEtBQUssR0FBRyxDQUFULENBQWxDOztBQUVBLHNCQUNFLHlFQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG9CQUFpQkksVUFBakIsQ0FERixlQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQUFhSixLQUFiLENBRkYsZUFHRTtBQUFRLElBQUEsT0FBTyxFQUFFSyxXQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFIRixDQURGO0FBT0Q7O0FBRUQsU0FBU0YsYUFBVCxHQUF5QjtBQUN2QixRQUFNRyxhQUFhLEdBQUcscUJBQVMsS0FBVCxDQUF0QjtBQUNBLFFBQU0sQ0FBQ0YsVUFBRCxJQUFlRSxhQUFyQjtBQUVBLHdCQUFVLFNBQVNDLGVBQVQsR0FBMkIsQ0FDbkM7QUFDRCxHQUZELEVBRUcsRUFGSDtBQUlBLFNBQU8sQ0FBQ0gsVUFBRCxFQUFhLE1BQU0sQ0FBRSxDQUFyQixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21wb25lbnQoKSB7XG4gIGNvbnN0IGNvdW50U3RhdGUgPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgY291bnQgPSBjb3VudFN0YXRlWzBdO1xuICBjb25zdCBzZXRDb3VudCA9IGNvdW50U3RhdGVbMV07XG5cbiAgY29uc3QgZGFya01vZGUgPSB1c2VJc0RhcmtNb2RlKCk7XG4gIGNvbnN0IFtpc0RhcmtNb2RlXSA9IGRhcmtNb2RlO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gLi4uXG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHNldENvdW50KGNvdW50ICsgMSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdj5EYXJrIG1vZGU/IHtpc0RhcmtNb2RlfTwvZGl2PlxuICAgICAgPGRpdj5Db3VudDoge2NvdW50fTwvZGl2PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVDbGlja30+VXBkYXRlIGNvdW50PC9idXR0b24+XG4gICAgPC8+XG4gICk7XG59XG5cbmZ1bmN0aW9uIHVzZUlzRGFya01vZGUoKSB7XG4gIGNvbnN0IGRhcmtNb2RlU3RhdGUgPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0RhcmtNb2RlXSA9IGRhcmtNb2RlU3RhdGU7XG5cbiAgdXNlRWZmZWN0KGZ1bmN0aW9uIHVzZUVmZmVjdENyZWF0ZSgpIHtcbiAgICAvLyBIZXJlIGlzIHdoZXJlIHdlIG1heSBsaXN0ZW4gdG8gYSBcInRoZW1lXCIgZXZlbnQuLi5cbiAgfSwgW10pO1xuXG4gIHJldHVybiBbaXNEYXJrTW9kZSwgKCkgPT4ge31dO1xufVxuIl0sInhfZmFjZWJvb2tfc291cmNlcyI6W1tudWxsLFt7Im5hbWVzIjpbIjxuby1ob29rPiIsImNvdW50IiwiZGFya01vZGUiLCJpc0RhcmtNb2RlIl0sIm1hcHBpbmdzIjoiQ0FBRDthcUJDQSxBV0RBO2lCYkVBLEFlRkE7b0NWR0EsQWVIQSJ9XV1dfQ==