import * as React from 'react';
import { Component, ReactType } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import classNames from 'classnames';
import { DragSource, DropTarget, DragSourceMonitor, DropTargetMonitor } from 'react-dnd';
import styleName from '../../utils/styleName';

/**
 * 表格拖拽功能
 * https://ant.design/components/table-cn/#components-table-demo-drag-sorting
 */
const dropOverDownward: string = styleName('array-drop-over-downward');
const dropOverUpward: string = styleName('array-drop-over-upward');
let dragingIndex: number = -1;

interface BodyRowProps{
  isOver: boolean;
  connectDragSource: Function;
  connectDropTarget: Function;
  index: number;
  style: object;
  className: string;
  moverow: Function;
}

class BodyRow extends Component<BodyRowProps>{
  static propTypes: {
    isOver: Requireable<boolean>,
    connectDragSourc: Requireable<Function>,
    connectDropTarget: Requireable<Function>,
    index: Requireable<number>,
    style: Requireable<object>,
    className: Requireable<string>,
    moverow: Requireable<Function>
  } = {
    isOver: PropTypes.bool,
    connectDragSourc: PropTypes.func,
    connectDropTarget: PropTypes.func,
    index: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    moverow: PropTypes.func
  };

  render(): React.ReactNode{
    const { isOver, connectDragSource, connectDropTarget, index, style, className, moverow, ...restProps } = this.props;
    const fStyle: object = { ...style, cursor: 'move' };
    const fClassName: string = classNames(className, {
      [dropOverDownward]: isOver && index > dragingIndex
    }, {
      [dropOverUpward]: isOver && index < dragingIndex
    });

    console.log(fClassName);

    return connectDragSource(
      connectDropTarget(<tr className={ fClassName } style={ fStyle } { ...restProps } />)
    );
  }
}

const rowSource: { beginDrag: (props: {}, monitor: DragSourceMonitor, component: any) => any } = {
  beginDrag(props: { index: number }): { index: number }{
    dragingIndex = props.index;

    return {
      index: props.index
    };
  }
};

const rowTarget: { drop: (props: {}, monitor: DropTargetMonitor, component: any) => any } = {
  drop(props: { index: number, moverow: Function }, monitor: DropTargetMonitor, component: any): void{
    const dragIndex: number = monitor.getItem().index;
    const hoverIndex: number = props.index;

    if (dragIndex === hoverIndex) return;

    props.moverow(dragIndex, hoverIndex);
    monitor.getItem().index = hoverIndex;
  }
};

const DragableBodyRow: ReactType<any> = DropTarget('row', rowTarget,
  (connect: { dropTarget: Function }, monitor: DropTargetMonitor): object => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }),
)(DragSource('row', rowSource,
  (connect) => ({
    connectDragSource: connect.dragSource()
  })
)(BodyRow));

export default DragableBodyRow;