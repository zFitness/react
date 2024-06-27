"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = ListItem;
exports.List = List;

var React = _interopRequireWildcard(require("react"));

var _jsxFileName = "";

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ListItem({
  item,
  removeItem,
  toggleItem
}) {
  const handleDelete = (0, React.useCallback)(() => {
    removeItem(item);
  }, [item, removeItem]);
  const handleToggle = (0, React.useCallback)(() => {
    toggleItem(item);
  }, [item, toggleItem]);
  return /*#__PURE__*/React.createElement("li", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 5
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleDelete,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 7
    }
  }, "Delete"), /*#__PURE__*/React.createElement("label", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25,
      columnNumber: 7
    }
  }, /*#__PURE__*/React.createElement("input", {
    checked: item.isComplete,
    onChange: handleToggle,
    type: "checkbox",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26,
      columnNumber: 9
    }
  }), ' ', item.text));
}

function List(props) {
  const [newItemText, setNewItemText] = (0, React.useState)('');
  const [items, setItems] = (0, React.useState)([{
    id: 1,
    isComplete: true,
    text: 'First'
  }, {
    id: 2,
    isComplete: true,
    text: 'Second'
  }, {
    id: 3,
    isComplete: false,
    text: 'Third'
  }]);
  const [uid, setUID] = (0, React.useState)(4);
  const handleClick = (0, React.useCallback)(() => {
    if (newItemText !== '') {
      setItems([...items, {
        id: uid,
        isComplete: false,
        text: newItemText
      }]);
      setUID(uid + 1);
      setNewItemText('');
    }
  }, [newItemText, items, uid]);
  const handleKeyPress = (0, React.useCallback)(event => {
    if (event.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);
  const handleChange = (0, React.useCallback)(event => {
    setNewItemText(event.currentTarget.value);
  }, [setNewItemText]);
  const removeItem = (0, React.useCallback)(itemToRemove => setItems(items.filter(item => item !== itemToRemove)), [items]);
  const toggleItem = (0, React.useCallback)(itemToToggle => {
    // Dont use indexOf()
    // because editing props in DevTools creates a new Object.
    const index = items.findIndex(item => item.id === itemToToggle.id);
    setItems(items.slice(0, index).concat({ ...itemToToggle,
      isComplete: !itemToToggle.isComplete
    }).concat(items.slice(index + 1)));
  }, [items]);
  return /*#__PURE__*/React.createElement(React.Fragment, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102,
      columnNumber: 5
    }
  }, /*#__PURE__*/React.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 7
    }
  }, "List"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "New list item...",
    value: newItemText,
    onChange: handleChange,
    onKeyPress: handleKeyPress,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 104,
      columnNumber: 7
    }
  }), /*#__PURE__*/React.createElement("button", {
    disabled: newItemText === '',
    onClick: handleClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "img",
    "aria-label": "Add item",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 112,
      columnNumber: 9
    }
  }, "Add")), /*#__PURE__*/React.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 116,
      columnNumber: 7
    }
  }, items.map(item => /*#__PURE__*/React.createElement(ListItem, {
    key: item.id,
    item: item,
    removeItem: removeItem,
    toggleItem: toggleItem,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 118,
      columnNumber: 11
    }
  }))));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvRG9MaXN0LmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwiaXRlbSIsInJlbW92ZUl0ZW0iLCJ0b2dnbGVJdGVtIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlVG9nZ2xlIiwiaXNDb21wbGV0ZSIsInRleHQiLCJMaXN0IiwicHJvcHMiLCJuZXdJdGVtVGV4dCIsInNldE5ld0l0ZW1UZXh0IiwiaXRlbXMiLCJzZXRJdGVtcyIsImlkIiwidWlkIiwic2V0VUlEIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVLZXlQcmVzcyIsImV2ZW50Iiwia2V5IiwiaGFuZGxlQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsInZhbHVlIiwiaXRlbVRvUmVtb3ZlIiwiZmlsdGVyIiwiaXRlbVRvVG9nZ2xlIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzbGljZSIsImNvbmNhdCIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFHTyxTQUFTQSxRQUFULENBQWtCO0FBQUNDLEVBQUFBLElBQUQ7QUFBT0MsRUFBQUEsVUFBUDtBQUFtQkMsRUFBQUE7QUFBbkIsQ0FBbEIsRUFBa0Q7QUFDdkQsUUFBTUMsWUFBWSxHQUFHLHVCQUFZLE1BQU07QUFDckNGLElBQUFBLFVBQVUsQ0FBQ0QsSUFBRCxDQUFWO0FBQ0QsR0FGb0IsRUFFbEIsQ0FBQ0EsSUFBRCxFQUFPQyxVQUFQLENBRmtCLENBQXJCO0FBSUEsUUFBTUcsWUFBWSxHQUFHLHVCQUFZLE1BQU07QUFDckNGLElBQUFBLFVBQVUsQ0FBQ0YsSUFBRCxDQUFWO0FBQ0QsR0FGb0IsRUFFbEIsQ0FBQ0EsSUFBRCxFQUFPRSxVQUFQLENBRmtCLENBQXJCO0FBSUEsc0JBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ0U7QUFBUSxJQUFBLE9BQU8sRUFBRUMsWUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FERixlQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNFO0FB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Q0FBUjtBQVNELEdBZmdCLEVBZ0JqQixDQUFDZixLQUFELENBaEJpQixDQUFuQjtBQW1CQSxzQkFDRSxvQkFBQyxjQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBREYsZUFFRTtBQUNFLElBQUEsSUFBSSxFQUFDLE1BRFA7QUFFRSxJQUFBLFdBQVcsRUFBQyxrQkFGZDtBQUdFLElBQUEsS0FBSyxFQUFFRixXQUhUO0FBSUUsSUFBQSxRQUFRLEVBQUVXLFlBSlo7QUFLRSxJQUFBLFVBQVUsRUFBRUgsY0FMZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUZGLGVBU0U7QUFBUSxJQUFBLFFBQVEsRUFBRVIsV0FBVyxLQUFLLEVBQWxDO0FBQXNDLElBQUEsT0FBTyxFQUFFTyxXQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDRTtBQUFNLElBQUEsSUFBSSxFQUFDLEtBQVg7QUFBaUIsa0JBQVcsVUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERixDQVRGLGVBY0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR0wsS0FBSyxDQUFDbUIsR0FBTixDQUFVOUIsSUFBSSxpQkFDYixvQkFBQyxRQUFEO0FBQ0UsSUFBQSxHQUFHLEVBQUVBLElBQUksQ0FBQ2EsRUFEWjtBQUVFLElBQUEsSUFBSSxFQUFFYixJQUZSO0FBR0UsSUFBQSxVQUFVLEVBQUVDLFVBSGQ7QUFJRSxJQUFBLFVBQVUsRUFBRUMsVUFKZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQURELENBREgsQ0FkRixDQURGO0FBMkJEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIE1ldGEgUGxhdGZvcm1zLCBJbmMuIGFuZCBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtGcmFnbWVudCwgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBMaXN0SXRlbSh7aXRlbSwgcmVtb3ZlSXRlbSwgdG9nZ2xlSXRlbX0pIHtcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHJlbW92ZUl0ZW0oaXRlbSk7XG4gIH0sIFtpdGVtLCByZW1vdmVJdGVtXSk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHRvZ2dsZUl0ZW0oaXRlbSk7XG4gIH0sIFtpdGVtLCB0b2dnbGVJdGVtXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8bGk+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZX0+RGVsZXRlPC9idXR0b24+XG4gICAgICA8bGFiZWw+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNoZWNrZWQ9e2l0ZW0uaXNDb21wbGV0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVG9nZ2xlfVxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgIC8+eycgJ31cbiAgICAgICAge2l0ZW0udGV4dH1cbiAgICAgIDwvbGFiZWw+XG4gICAgPC9saT5cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpc3QocHJvcHMpIHtcbiAgY29uc3QgW25ld0l0ZW1UZXh0LCBzZXROZXdJdGVtVGV4dF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGUoW1xuICAgIHtpZDogMSwgaXNDb21wbGV0ZTogdHJ1ZSwgdGV4dDogJ0ZpcnN0J30sXG4gICAge2lkOiAyLCBpc0NvbXBsZXRlOiB0cnVlLCB0ZXh0OiAnU2Vjb25kJ30sXG4gICAge2lkOiAzLCBpc0NvbXBsZXRlOiBmYWxzZSwgdGV4dDogJ1RoaXJkJ30sXG4gIF0pO1xuICBjb25zdCBbdWlkLCBzZXRVSURdID0gdXNlU3RhdGUoNCk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKG5ld0l0ZW1UZXh0ICE9PSAnJykge1xuICAgICAgc2V0SXRlbXMoW1xuICAgICAgICAuLi5pdGVtcyxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiB1aWQsXG4gICAgICAgICAgaXNDb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgdGV4dDogbmV3SXRlbVRleHQsXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIHNldFVJRCh1aWQgKyAxKTtcbiAgICAgIHNldE5ld0l0ZW1UZXh0KCcnKTtcbiAgICB9XG4gIH0sIFtuZXdJdGVtVGV4dCwgaXRlbXMsIHVpZF0pO1xuXG4gIGNvbnN0IGhhbmRsZUtleVByZXNzID0gdXNlQ2FsbGJhY2soXG4gICAgZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICBoYW5kbGVDbGljaygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2hhbmRsZUNsaWNrXSxcbiAgKTtcblxuICBjb25zdCBoYW5kbGVDaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICBldmVudCA9PiB7XG4gICAgICBzZXROZXdJdGVtVGV4dChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgICB9LFxuICAgIFtzZXROZXdJdGVtVGV4dF0sXG4gICk7XG5cbiAgY29uc3QgcmVtb3ZlSXRlbSA9IHVzZUNhbGxiYWNrKFxuICAgIGl0ZW1Ub1JlbW92ZSA9PiBzZXRJdGVtcyhpdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBpdGVtVG9SZW1vdmUpKSxcbiAgICBbaXRlbXNdLFxuICApO1xuXG4gIGNvbnN0IHRvZ2dsZUl0ZW0gPSB1c2VDYWxsYmFjayhcbiAgICBpdGVtVG9Ub2dnbGUgPT4ge1xuICAgICAgLy8gRG9udCB1c2UgaW5kZXhPZigpXG4gICAgICAvLyBiZWNhdXNlIGVkaXRpbmcgcHJvcHMgaW4gRGV2VG9vbHMgY3JlYXRlcyBhIG5ldyBPYmplY3QuXG4gICAgICBjb25zdCBpbmRleCA9IGl0ZW1zLmZpbmRJbmRleChpdGVtID0+IGl0ZW0uaWQgPT09IGl0ZW1Ub1RvZ2dsZS5pZCk7XG5cbiAgICAgIHNldEl0ZW1zKFxuICAgICAgICBpdGVtc1xuICAgICAgICAgIC5zbGljZSgwLCBpbmRleClcbiAgICAgICAgICAuY29uY2F0KHtcbiAgICAgICAgICAgIC4uLml0ZW1Ub1RvZ2dsZSxcbiAgICAgICAgICAgIGlzQ29tcGxldGU6ICFpdGVtVG9Ub2dnbGUuaXNDb21wbGV0ZSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jb25jYXQoaXRlbXMuc2xpY2UoaW5kZXggKyAxKSksXG4gICAgICApO1xuICAgIH0sXG4gICAgW2l0ZW1zXSxcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxGcmFnbWVudD5cbiAgICAgIDxoMT5MaXN0PC9oMT5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiTmV3IGxpc3QgaXRlbS4uLlwiXG4gICAgICAgIHZhbHVlPXtuZXdJdGVtVGV4dH1cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgb25LZXlQcmVzcz17aGFuZGxlS2V5UHJlc3N9XG4gICAgICAvPlxuICAgICAgPGJ1dHRvbiBkaXNhYmxlZD17bmV3SXRlbVRleHQgPT09ICcnfSBvbkNsaWNrPXtoYW5kbGVDbGlja30+XG4gICAgICAgIDxzcGFuIHJvbGU9XCJpbWdcIiBhcmlhLWxhYmVsPVwiQWRkIGl0ZW1cIj5cbiAgICAgICAgICBBZGRcbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgICA8dWw+XG4gICAgICAgIHtpdGVtcy5tYXAoaXRlbSA9PiAoXG4gICAgICAgICAgPExpc3RJdGVtXG4gICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICBpdGVtPXtpdGVtfVxuICAgICAgICAgICAgcmVtb3ZlSXRlbT17cmVtb3ZlSXRlbX1cbiAgICAgICAgICAgIHRvZ2dsZUl0ZW09e3RvZ2dsZUl0ZW19XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgIDwvRnJhZ21lbnQ+XG4gICk7XG59XG4iXSwieF9yZWFjdF9zb3VyY2VzIjpbW3sibmFtZXMiOlsiPG5vLWhvb2s+IiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlVG9nZ2xlIiwibmV3SXRlbVRleHQiLCJpdGVtcyIsInVpZCIsImhhbmRsZUNsaWNrIiwiaGFuZGxlS2V5UHJlc3MiLCJoYW5kbGVDaGFuZ2UiLCJyZW1vdmVJdGVtIiwidG9nZ2xlSXRlbSJdLCJtYXBwaW5ncyI6IkNBQUQ7Y3VCQ0E7Z0JDREE7a0JERUE7b0JDRkE7c0NnQkdBLEFZSEE7dUN4QklBOzJDeEJKQTs0Q29CS0EsQVdMQTs4Q2JNQTsyRFNOQTs2RE5PQTtvRXRCUEE7c0VvQlFBOzJFcEJSQTs2RWtCU0E7Z0ZsQlRBO2tGa0JVQTttR2xCVkEifV1dfQ==