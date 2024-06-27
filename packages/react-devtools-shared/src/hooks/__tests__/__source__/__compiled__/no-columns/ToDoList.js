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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRvRG9MaXN0LmpzIl0sIm5hbWVzIjpbIkxpc3RJdGVtIiwiaXRlbSIsInJlbW92ZUl0ZW0iLCJ0b2dnbGVJdGVtIiwiaGFuZGxlRGVsZXRlIiwiaGFuZGxlVG9nZ2xlIiwiaXNDb21wbGV0ZSIsInRleHQiLCJMaXN0IiwicHJvcHMiLCJuZXdJdGVtVGV4dCIsInNldE5ld0l0ZW1UZXh0IiwiaXRlbXMiLCJzZXRJdGVtcyIsImlkIiwidWlkIiwic2V0VUlEIiwiaGFuZGxlQ2xpY2siLCJoYW5kbGVLZXlQcmVzcyIsImV2ZW50Iiwia2V5IiwiaGFuZGxlQ2hhbmdlIiwiY3VycmVudFRhcmdldCIsInZhbHVlIiwiaXRlbVRvUmVtb3ZlIiwiZmlsdGVyIiwiaXRlbVRvVG9nZ2xlIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJzbGljZSIsImNvbmNhdCIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFHQSxTQUFBQSxRQUFBLENBQUE7QUFBQUMsRUFBQUEsSUFBQTtBQUFBQyxFQUFBQSxVQUFBO0FBQUFDLEVBQUFBO0FBQUEsQ0FBQSxFQUFBO0FBQ0EsUUFBQUMsWUFBQSxHQUFBLHVCQUFBLE1BQUE7QUFDQUYsSUFBQUEsVUFBQSxDQUFBRCxJQUFBLENBQUE7QUFDQSxHQUZBLEVBRUEsQ0FBQUEsSUFBQSxFQUFBQyxVQUFBLENBRkEsQ0FBQTtBQUlBLFFBQUFHLFlBQUEsR0FBQSx1QkFBQSxNQUFBO0FBQ0FGLElBQUFBLFVBQUEsQ0FBQUYsSUFBQSxDQUFBO0FBQ0EsR0FGQSxFQUVBLENBQUFBLElBQUEsRUFBQUUsVUFBQSxDQUZBLENBQUE7QUFJQSxzQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDQTtBQUFBLElBQUEsT0FBQSxFQUFBQyxZQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREEsZUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDQTtBQUNBLElBQUEsT0FBQSxFQUFB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QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURBLGVBRUE7QUFDQSxJQUFBLElBQUEsRUFBQSxNQURBO0FBRUEsSUFBQSxXQUFBLEVBQUEsa0JBRkE7QUFHQSxJQUFBLEtBQUEsRUFBQUYsV0FIQTtBQUlBLElBQUEsUUFBQSxFQUFBVyxZQUpBO0FBS0EsSUFBQSxVQUFBLEVBQUFILGNBTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFGQSxlQVNBO0FBQUEsSUFBQSxRQUFBLEVBQUFSLFdBQUEsS0FBQSxFQUFBO0FBQUEsSUFBQSxPQUFBLEVBQUFPLFdBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQ0E7QUFBQSxJQUFBLElBQUEsRUFBQSxLQUFBO0FBQUEsa0JBQUEsVUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQURBLENBVEEsZUFjQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNBTCxLQUFBLENBQUFtQixHQUFBLENBQUE5QixJQUFBLGlCQUNBLG9CQUFBLFFBQUE7QUFDQSxJQUFBLEdBQUEsRUFBQUEsSUFBQSxDQUFBYSxFQURBO0FBRUEsSUFBQSxJQUFBLEVBQUFiLElBRkE7QUFHQSxJQUFBLFVBQUEsRUFBQUMsVUFIQTtBQUlBLElBQUEsVUFBQSxFQUFBQyxVQUpBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREEsQ0FEQSxDQWRBLENBREE7QUEyQkEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgTWV0YSBQbGF0Zm9ybXMsIEluYy4gYW5kIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQGZsb3dcbiAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQge0ZyYWdtZW50LCB1c2VDYWxsYmFjaywgdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGZ1bmN0aW9uIExpc3RJdGVtKHtpdGVtLCByZW1vdmVJdGVtLCB0b2dnbGVJdGVtfSkge1xuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmVtb3ZlSXRlbShpdGVtKTtcbiAgfSwgW2l0ZW0sIHJlbW92ZUl0ZW1dKTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdG9nZ2xlSXRlbShpdGVtKTtcbiAgfSwgW2l0ZW0sIHRvZ2dsZUl0ZW1dKTtcblxuICByZXR1cm4gKFxuICAgIDxsaT5cbiAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlRGVsZXRlfT5EZWxldGU8L2J1dHRvbj5cbiAgICAgIDxsYWJlbD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2hlY2tlZD17aXRlbS5pc0NvbXBsZXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVUb2dnbGV9XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgLz57JyAnfVxuICAgICAgICB7aXRlbS50ZXh0fVxuICAgICAgPC9sYWJlbD5cbiAgICA8L2xpPlxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTGlzdChwcm9wcykge1xuICBjb25zdCBbbmV3SXRlbVRleHQsIHNldE5ld0l0ZW1UZXh0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZShbXG4gICAge2lkOiAxLCBpc0NvbXBsZXRlOiB0cnVlLCB0ZXh0OiAnRmlyc3QnfSxcbiAgICB7aWQ6IDIsIGlzQ29tcGxldGU6IHRydWUsIHRleHQ6ICdTZWNvbmQnfSxcbiAgICB7aWQ6IDMsIGlzQ29tcGxldGU6IGZhbHNlLCB0ZXh0OiAnVGhpcmQnfSxcbiAgXSk7XG4gIGNvbnN0IFt1aWQsIHNldFVJRF0gPSB1c2VTdGF0ZSg0KTtcblxuICBjb25zdCBoYW5kbGVDbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAobmV3SXRlbVRleHQgIT09ICcnKSB7XG4gICAgICBzZXRJdGVtcyhbXG4gICAgICAgIC4uLml0ZW1zLFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IHVpZCxcbiAgICAgICAgICBpc0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICB0ZXh0OiBuZXdJdGVtVGV4dCxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgICAgc2V0VUlEKHVpZCArIDEpO1xuICAgICAgc2V0TmV3SXRlbVRleHQoJycpO1xuICAgIH1cbiAgfSwgW25ld0l0ZW1UZXh0LCBpdGVtcywgdWlkXSk7XG5cbiAgY29uc3QgaGFuZGxlS2V5UHJlc3MgPSB1c2VDYWxsYmFjayhcbiAgICBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIGhhbmRsZUNsaWNrKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaGFuZGxlQ2xpY2tdLFxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgIGV2ZW50ID0+IHtcbiAgICAgIHNldE5ld0l0ZW1UZXh0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpO1xuICAgIH0sXG4gICAgW3NldE5ld0l0ZW1UZXh0XSxcbiAgKTtcblxuICBjb25zdCByZW1vdmVJdGVtID0gdXNlQ2FsbGJhY2soXG4gICAgaXRlbVRvUmVtb3ZlID0+IHNldEl0ZW1zKGl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGl0ZW1Ub1JlbW92ZSkpLFxuICAgIFtpdGVtc10sXG4gICk7XG5cbiAgY29uc3QgdG9nZ2xlSXRlbSA9IHVzZUNhbGxiYWNrKFxuICAgIGl0ZW1Ub1RvZ2dsZSA9PiB7XG4gICAgICAvLyBEb250IHVzZSBpbmRleE9mKClcbiAgICAgIC8vIGJlY2F1c2UgZWRpdGluZyBwcm9wcyBpbiBEZXZUb29scyBjcmVhdGVzIGEgbmV3IE9iamVjdC5cbiAgICAgIGNvbnN0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5pZCA9PT0gaXRlbVRvVG9nZ2xlLmlkKTtcblxuICAgICAgc2V0SXRlbXMoXG4gICAgICAgIGl0ZW1zXG4gICAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxuICAgICAgICAgIC5jb25jYXQoe1xuICAgICAgICAgICAgLi4uaXRlbVRvVG9nZ2xlLFxuICAgICAgICAgICAgaXNDb21wbGV0ZTogIWl0ZW1Ub1RvZ2dsZS5pc0NvbXBsZXRlLFxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNvbmNhdChpdGVtcy5zbGljZShpbmRleCArIDEpKSxcbiAgICAgICk7XG4gICAgfSxcbiAgICBbaXRlbXNdLFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEZyYWdtZW50PlxuICAgICAgPGgxPkxpc3Q8L2gxPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJOZXcgbGlzdCBpdGVtLi4uXCJcbiAgICAgICAgdmFsdWU9e25ld0l0ZW1UZXh0fVxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICBvbktleVByZXNzPXtoYW5kbGVLZXlQcmVzc31cbiAgICAgIC8+XG4gICAgICA8YnV0dG9uIGRpc2FibGVkPXtuZXdJdGVtVGV4dCA9PT0gJyd9IG9uQ2xpY2s9e2hhbmRsZUNsaWNrfT5cbiAgICAgICAgPHNwYW4gcm9sZT1cImltZ1wiIGFyaWEtbGFiZWw9XCJBZGQgaXRlbVwiPlxuICAgICAgICAgIEFkZFxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDx1bD5cbiAgICAgICAge2l0ZW1zLm1hcChpdGVtID0+IChcbiAgICAgICAgICA8TGlzdEl0ZW1cbiAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgIGl0ZW09e2l0ZW19XG4gICAgICAgICAgICByZW1vdmVJdGVtPXtyZW1vdmVJdGVtfVxuICAgICAgICAgICAgdG9nZ2xlSXRlbT17dG9nZ2xlSXRlbX1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgPC9GcmFnbWVudD5cbiAgKTtcbn1cbiJdfQ==