"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var classnames_1 = require("classnames");
var react_dnd_1 = require("react-dnd");
var styleName_1 = require("../../utils/styleName");
/**
 * 表格拖拽功能
 * https://ant.design/components/table-cn/#components-table-demo-drag-sorting
 */
var dropOverDownward = styleName_1.default('array-drop-over-downward');
var dropOverUpward = styleName_1.default('array-drop-over-upward');
var trDrag = styleName_1.default('array-tr-drag');
var dragingIndex = -1;
var BodyRow = /** @class */ (function (_super) {
    __extends(BodyRow, _super);
    function BodyRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BodyRow.prototype.render = function () {
        var _a;
        var _b = this.props, isOver = _b.isOver, connectDragSource = _b.connectDragSource, connectDropTarget = _b.connectDropTarget, index = _b.index, className = _b.className, moverow = _b.moverow, // function类型，直接作为props会报警告
        restProps = __rest(_b, ["isOver", "connectDragSource", "connectDropTarget", "index", "className", "moverow"]);
        var fClassName = classnames_1.default(className, trDrag, (_a = {},
            _a[dropOverDownward] = isOver && index !== undefined && index > dragingIndex,
            _a[dropOverUpward] = isOver && index !== undefined && index < dragingIndex,
            _a));
        return (connectDragSource && connectDropTarget)
            ? connectDragSource(connectDropTarget(React.createElement("tr", __assign({ className: fClassName }, restProps))))
            : null;
    };
    BodyRow.propTypes = {
        isOver: PropTypes.bool,
        connectDragSourc: PropTypes.func,
        connectDropTarget: PropTypes.func,
        index: PropTypes.number,
        className: PropTypes.string,
        moverow: PropTypes.func
    };
    return BodyRow;
}(react_1.Component));
var rowSource = {
    beginDrag: function (props) {
        dragingIndex = props.index;
        return {
            index: props.index
        };
    }
};
var rowTarget = {
    drop: function (props, monitor, component) {
        var dragIndex = monitor.getItem().index;
        var hoverIndex = props.index;
        if (dragIndex === hoverIndex)
            return;
        props.moverow(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};
var DragableBodyRow = react_dnd_1.DropTarget('row', rowTarget, function (connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
})(react_dnd_1.DragSource('row', rowSource, function (connect) {
    return {
        connectDragSource: connect.dragSource()
    };
})(BodyRow));
exports.default = DragableBodyRow;
