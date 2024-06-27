"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = Component;

var _react = require("react");

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const A = /*#__PURE__*/(0, _react.createContext)(1);
const B = /*#__PURE__*/(0, _react.createContext)(2);

function Component() {
  const a = (0, _react.useContext)(A);
  const b = (0, _react.useContext)(B); // prettier-ignore

  const c = (0, _react.useContext)(A),
        d = (0, _react.useContext)(B); // eslint-disable-line one-var

  return a + b + c + d;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudFdpdGhNdWx0aXBsZUhvb2tzUGVyTGluZS5qcyJdLCJuYW1lcyI6WyJBIiwiQiIsIkNvbXBvbmVudCIsImEiLCJiIiwiYyIsImQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFTQTs7QUFUQTs7Ozs7Ozs7QUFXQSxNQUFBQSxDQUFBLGdCQUFBLDBCQUFBLENBQUEsQ0FBQTtBQUNBLE1BQUFDLENBQUEsZ0JBQUEsMEJBQUEsQ0FBQSxDQUFBOztBQUVBLFNBQUFDLFNBQUEsR0FBQTtBQUNBLFFBQUFDLENBQUEsR0FBQSx1QkFBQUgsQ0FBQSxDQUFBO0FBQ0EsUUFBQUksQ0FBQSxHQUFBLHVCQUFBSCxDQUFBLENBQUEsQ0FGQSxDQUlBOztBQUNBLFFBQUFJLENBQUEsR0FBQSx1QkFBQUwsQ0FBQSxDQUFBO0FBQUEsUUFBQU0sQ0FBQSxHQUFBLHVCQUFBTCxDQUFBLENBQUEsQ0FMQSxDQUtBOztBQUVBLFNBQUFFLENBQUEsR0FBQUMsQ0FBQSxHQUFBQyxDQUFBLEdBQUFDLENBQUE7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSBNZXRhIFBsYXRmb3JtcywgSW5jLiBhbmQgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAZmxvd1xuICovXG5cbmltcG9ydCB7Y3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBBID0gY3JlYXRlQ29udGV4dCgxKTtcbmNvbnN0IEIgPSBjcmVhdGVDb250ZXh0KDIpO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29tcG9uZW50KCkge1xuICBjb25zdCBhID0gdXNlQ29udGV4dChBKTtcbiAgY29uc3QgYiA9IHVzZUNvbnRleHQoQik7XG5cbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IGMgPSB1c2VDb250ZXh0KEEpLCBkID0gdXNlQ29udGV4dChCKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBvbmUtdmFyXG5cbiAgcmV0dXJuIGEgKyBiICsgYyArIGQ7XG59XG4iXX0=