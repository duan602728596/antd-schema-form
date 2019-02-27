var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import styleName from '../../utils/styleName';
/**
 * 表格拖拽功能
 * https://ant.design/components/table-cn/#components-table-demo-drag-sorting
 */
const dropOverDownward = styleName('array-drop-over-downward');
const dropOverUpward = styleName('array-drop-over-upward');
const trDrag = styleName('array-tr-drag');
let dragingIndex = -1;
class BodyRow extends Component {
    render() {
        const _a = this.props, { isOver, connectDragSource, connectDropTarget, index, className, moverow } = _a, // function类型，直接作为props会报警告
        restProps = __rest(_a, ["isOver", "connectDragSource", "connectDropTarget", "index", "className", "moverow"]);
        const fClassName = classNames(className, trDrag, {
            [dropOverDownward]: isOver && index !== undefined && index > dragingIndex,
            [dropOverUpward]: isOver && index !== undefined && index < dragingIndex
        });
        return (connectDragSource && connectDropTarget)
            ? connectDragSource(connectDropTarget(React.createElement("tr", Object.assign({ className: fClassName }, restProps))))
            : null;
    }
}
BodyRow.propTypes = {
    isOver: PropTypes.bool,
    connectDragSourc: PropTypes.func,
    connectDropTarget: PropTypes.func,
    index: PropTypes.number,
    className: PropTypes.string,
    moverow: PropTypes.func
};
const rowSource = {
    beginDrag(props) {
        dragingIndex = props.index;
        return {
            index: props.index
        };
    }
};
const rowTarget = {
    drop(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex)
            return;
        props.moverow(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};
const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
})(DragSource('row', rowSource, (connect) => {
    return {
        connectDragSource: connect.dragSource()
    };
})(BodyRow));
export default DragableBodyRow;
