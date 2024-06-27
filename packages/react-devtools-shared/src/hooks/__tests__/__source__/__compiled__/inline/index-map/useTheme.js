"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTheme;
exports.ThemeContext = void 0;

var _react = require("react");

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const ThemeContext = /*#__PURE__*/(0, _react.createContext)('bright');
exports.ThemeContext = ThemeContext;

function useTheme() {
  const theme = (0, _react.useContext)(ThemeContext);
  (0, _react.useDebugValue)(theme);
  return theme;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzZWN0aW9ucyI6W3sib2Zmc2V0Ijp7ImxpbmUiOjAsImNvbHVtbiI6MH0sIm1hcCI6eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZVRoZW1lLmpzIl0sIm5hbWVzIjpbIlRoZW1lQ29udGV4dCIsInVzZVRoZW1lIiwidGhlbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBU0E7O0FBVEE7Ozs7Ozs7O0FBV08sTUFBTUEsWUFBWSxnQkFBRywwQkFBYyxRQUFkLENBQXJCOzs7QUFFUSxTQUFTQyxRQUFULEdBQW9CO0FBQ2pDLFFBQU1DLEtBQUssR0FBRyx1QkFBV0YsWUFBWCxDQUFkO0FBQ0EsNEJBQWNFLEtBQWQ7QUFDQSxTQUFPQSxLQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQge2NyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZURlYnVnVmFsdWV9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IFRoZW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoJ2JyaWdodCcpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VUaGVtZSgpIHtcbiAgY29uc3QgdGhlbWUgPSB1c2VDb250ZXh0KFRoZW1lQ29udGV4dCk7XG4gIHVzZURlYnVnVmFsdWUodGhlbWUpO1xuICByZXR1cm4gdGhlbWU7XG59XG4iXX19XX0=