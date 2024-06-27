"use strict";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
const {
  useMemo,
  useState
} = require('react');

function Component(props) {
  const InnerComponent = useMemo(() => () => {
    const [state] = useState(0);
    return state;
  });
  props.callback(InnerComponent);
  return null;
}

module.exports = {
  Component
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzZWN0aW9ucyI6W3sib2Zmc2V0Ijp7ImxpbmUiOjAsImNvbHVtbiI6MH0sIm1hcCI6eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudFdpdGhOZXN0ZWRIb29rcy5qcyJdLCJuYW1lcyI6WyJ1c2VNZW1vIiwidXNlU3RhdGUiLCJyZXF1aXJlIiwiQ29tcG9uZW50IiwicHJvcHMiLCJJbm5lckNvbXBvbmVudCIsInN0YXRlIiwiY2FsbGJhY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQVFBLE1BQU07QUFBQ0EsRUFBQUEsT0FBRDtBQUFVQyxFQUFBQTtBQUFWLElBQXNCQyxPQUFPLENBQUMsT0FBRCxDQUFuQzs7QUFFQSxTQUFTQyxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUN4QixRQUFNQyxjQUFjLEdBQUdMLE9BQU8sQ0FBQyxNQUFNLE1BQU07QUFDekMsVUFBTSxDQUFDTSxLQUFELElBQVVMLFFBQVEsQ0FBQyxDQUFELENBQXhCO0FBRUEsV0FBT0ssS0FBUDtBQUNELEdBSjZCLENBQTlCO0FBS0FGLEVBQUFBLEtBQUssQ0FBQ0csUUFBTixDQUFlRixjQUFmO0FBRUEsU0FBTyxJQUFQO0FBQ0Q7O0FBRURHLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUFDTixFQUFBQTtBQUFELENBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cbmNvbnN0IHt1c2VNZW1vLCB1c2VTdGF0ZX0gPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5mdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAgY29uc3QgSW5uZXJDb21wb25lbnQgPSB1c2VNZW1vKCgpID0+ICgpID0+IHtcbiAgICBjb25zdCBbc3RhdGVdID0gdXNlU3RhdGUoMCk7XG5cbiAgICByZXR1cm4gc3RhdGU7XG4gIH0pO1xuICBwcm9wcy5jYWxsYmFjayhJbm5lckNvbXBvbmVudCk7XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge0NvbXBvbmVudH07XG4iXSwieF9mYWNlYm9va19zb3VyY2VzIjpbW251bGwsW3sibmFtZXMiOlsiPG5vLWhvb2s+IiwiSW5uZXJDb21wb25lbnQiLCJzdGF0ZSJdLCJtYXBwaW5ncyI6IkNBQUQ7WXlCQ0E7YUxDQSxBV0RBO2dCM0JEQSJ9XV1dfX1dfQ==