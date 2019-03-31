import * as React from 'react';
import { Component, Fragment, createRef, Context, RefObject } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import classNames from 'classnames';
import { Table, Button, Popconfirm, Drawer, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { TableComponents } from 'antd/lib/table';
import update from 'immutability-helper';
import AntdSchemaFormContext from '../../context';
import { isSpace, isBoolean, isObjectOrArray } from '../../utils/type';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import { formatTableValue, sortIndex } from './tableFunction';
import FormObject from '../FormObject/FormObject';
import { minErrStr, maxErrStr } from './createArrayRules';
import styleName from '../../utils/styleName';
import { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem, ContextValue } from '../../types';

// 拖拽相关变量
const tableDragClassName: [string, string] = [
  styleName('array-drop-over-downward'),
  styleName('array-drop-over-upward')
];

/* 表格的className */
function tableClassName(hasErr: boolean): string {
  return classNames(styleName('array-table-component'), {
    [styleName('array-table-component-has-error')]: hasErr
  });
}

interface TableComponentProps {
  root: ArrayItem;
}

interface TableComponentState {
  isDisplayDataDrawer: boolean;
  inputDisplayIndex?: number;
  inputChangeIndex?: string;
  selectedRowKeys: Array<number>;
  editIndex: number | null;
}

class TableComponent extends Component<TableComponentProps> {
  static contextType: Context<ContextValue | {}> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>;
  } = {
    root: PropTypes.object
  };

  context: ContextValue;
  changeIndexRef: RefObject<Input> = createRef();

  // 拖拽
  dragTargetId: string | undefined = undefined; // 被拖拽的id
  dragTargetIndex: number | undefined = undefined; // 被拖拽的index

  components: TableComponents = {
    body: {
      row: (item: any): React.ReactElement<'tr'> => {
        const { root }: TableComponentProps = this.props;
        const { id }: ArrayItem = root;
        const { children, className }: {
          children: React.ReactNodeArray;
          className: string;
        } = item;
        const index: number = Number(item['data-row-key']);

        return (
          <tr className={ className }
            draggable={ true }
            data-id={ id }
            data-index={ index }
            onDragStart={ this.handleTableDragStart.bind(this) }
            onDragEnter={ this.handleTableDragEnter.bind(this) }
            onDragLeave={ this.handleTableDragLeave.bind(this) }
            onDragOver={ this.handleTableDragOver.bind(this) }
            onDrop={ this.handleTableDrop.bind(this) }
          >
            { children }
          </tr>
        );
      }
    }
  };

  state: TableComponentState = {
    isDisplayDataDrawer: false, // 添加和修改数据的抽屉的显示和隐藏
    inputDisplayIndex: undefined, // 编辑框修改位置的状态
    inputChangeIndex: undefined, // 编辑框的值
    selectedRowKeys: [], // 多选框
    editIndex: null // 当前表格编辑的对象
  };

  // 编辑位置框修改位置
  handleInputDisplayClick(index: number, event: React.MouseEvent<HTMLElement>): void {
    this.setState({
      inputDisplayIndex: index,
      inputChangeIndex: String(index + 1)
    }, (): void => {
      if (this.changeIndexRef.current) {
        this.changeIndexRef.current.focus();
      }
    });
  }

  // 编辑位置框数据修改
  handleIndexInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      inputChangeIndex: event.target.value
    });
  }

  // 编辑位置框失去焦点
  handleIndexInputBlur(index: number, event: React.MouseEvent<HTMLInputElement>): void {
    const { form }: ContextValue = this.context;
    const { root }: TableComponentProps = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    const length: number = tableValue.length;
    const { inputChangeIndex }: TableComponentState = this.state;
    let newIndex: number = Number(inputChangeIndex) - 1;

    if (inputChangeIndex && newIndex !== index && /^[0-9]+$/.test(inputChangeIndex)) {
      if (newIndex < 0) newIndex = 0;
      if (newIndex > length) newIndex = length;

      this.moveRow(index, newIndex);
    }

    this.setState({
      inputDisplayIndex: undefined,
      inputChangeIndex: undefined
    });
  }

  // 开始拖拽
  handleTableDragStart(event: React.DragEvent<'tr'>): void {
    const target: EventTarget = event['target'];
    const id: string = target['dataset'].id;
    const index: number = Number(target['dataset'].index);

    this.dragTargetId = id;
    this.dragTargetIndex = index;
  }

  // 拖拽进入
  handleTableDragEnter(event: React.DragEvent<any>): void {
    event.preventDefault();

    // 获取目标的信息
    const target: EventTarget = event['target'];
    let fatherTarget: HTMLElement | undefined = undefined;

    // 获取父级节点
    if (target['nodeName'] === 'TD') {
      fatherTarget = target['parentNode'];
    } else if (target['nodeName'] === 'BUTTON') {
      fatherTarget = target['parentNode']['parentNode'];
    }

    if (fatherTarget !== undefined) {
      const overId: string | undefined = fatherTarget['dataset'].id;
      const overIndex: number | undefined = Number(fatherTarget['dataset'].index);

      // 添加样式
      if (this.dragTargetId !== undefined && this.dragTargetIndex !== undefined && this.dragTargetId === overId) {
        if (overIndex > this.dragTargetIndex) {
          fatherTarget.classList.add(tableDragClassName[0]);
        } else if (overIndex < this.dragTargetIndex) {
          fatherTarget.classList.add(tableDragClassName[1]);
        }
      }
    }
  }

  // 拖拽退出
  handleTableDragLeave(event: React.DragEvent<any>): void {
    event.preventDefault();

    // 获取目标的信息
    const target: EventTarget = event['target'];
    let fatherTarget: HTMLElement | undefined = undefined;

    // 获取父级节点
    if (target['nodeName'] === 'TD') {
      fatherTarget = target['parentNode'];
    } else if (target['nodeName'] === 'BUTTON') {
      fatherTarget = target['parentNode']['parentNode'];
    }

    if (fatherTarget !== undefined) {
      const overId: string | undefined = fatherTarget['dataset'].id;

      // 移除样式
      if (this.dragTargetId !== undefined && this.dragTargetIndex !== undefined && this.dragTargetId === overId) {
        fatherTarget.classList.remove(tableDragClassName[0]);
        fatherTarget.classList.remove(tableDragClassName[1]);
      }
    }
  }

  // 拖拽中
  handleTableDragOver(event: React.DragEvent<any>): void {
    event.preventDefault();
  }

  // 放置
  handleTableDrop(event: React.DragEvent<any>): void {
    event.preventDefault();

    // 获取目标的信息
    const target: EventTarget = event['target'];
    let fatherTarget: HTMLElement | undefined = undefined;

    // 获取父级节点
    if (target['nodeName'] === 'TD') {
      fatherTarget = target['parentNode'];
    } else if (target['nodeName'] === 'BUTTON') {
      fatherTarget = target['parentNode']['parentNode'];
    }

    if (fatherTarget !== undefined) {
      const overId: string | undefined = fatherTarget['dataset'].id;
      const overIndex: number | undefined = Number(fatherTarget['dataset'].index);

      // 修改数据
      if (this.dragTargetId !== undefined && this.dragTargetIndex !== undefined && this.dragTargetId === overId) {
        this.moveRow(this.dragTargetIndex, overIndex);
      }
    }

    // 重置拖拽状态
    this.dragTargetId = undefined;
    this.dragTargetIndex = undefined;

    // 清除样式
    const c0: HTMLElement | null = document.querySelector(`.${ tableDragClassName[0] }`);
    const c1: HTMLElement | null = document.querySelector(`.${ tableDragClassName[1] }`);

    c0 && c0.classList.remove(tableDragClassName[0]);
    c1 && c1.classList.remove(tableDragClassName[1]);
  }

  // 拖拽
  moveRow(dragIndex: number, hoverIndex: number): void {
    const { form }: ContextValue = this.context;
    const { root }: TableComponentProps = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    const dragRowItem: object = tableValue[dragIndex];
    const newData: { tableValue?: Array<object> } = update({ tableValue }, {
      tableValue: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowItem]]
      }
    });

    form.setFieldsValue({ [id]: newData.tableValue });
  }

  // 添加和修改数据
  handleAddOrEditDataClick: Function = (value: object, form2: WrappedFormUtils, keys: string[]): void => {
    const { form }: ContextValue = this.context;
    const { root }: TableComponentProps = this.props;
    const id: string = root.id;
    // 获取需要验证和获取值的key
    const value2: object = form.getFieldsValue(keys);
    const formatValue: object = formatValueBeforeGetValue(value2, id);
    const result: object = getValueFromObject(formatValue);
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    // 判断是修改还是添加
    if (this.state.editIndex === null) {
      tableValue[root.$addDataInReverseOrder ? 'unshift' : 'push'](result['items']);
    } else {
      tableValue[this.state.editIndex] = result['items'];
    }

    form.setFieldsValue({ [id]: tableValue });

    // 重置状态
    if (this.state.editIndex === null) {
      form.resetFields(keys);
    } else {
      this.setState({
        isDisplayDataDrawer: false,
        editIndex: null
      });
    }
  };

  // 删除数据
  handleDeleteDataClick(index: number, event: React.MouseEvent<Button>): void {
    const { form }: ContextValue = this.context;
    const { root }: TableComponentProps = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
    tableValue.splice(index, 1);
    form.setFieldsValue({ [id]: tableValue });
  }

  // 修改数据抽屉的显示
  handleDrawEditDataDisplayClick(index: number, event: React.MouseEvent<Button>): void {
    const { form }: ContextValue = this.context;
    const { root }: TableComponentProps = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    const itemValue: any = tableValue[index];
    const result: Object = getObjectFromValue({ items: itemValue }, id);

    this.setState({
      isDisplayDataDrawer: true,
      editIndex: index
    }, (): void => form.setFieldsValue(result));
  }

  // 抽屉的显示和隐藏
  handleDrawerDisplayClick(key: string, value: boolean, eventOrObject: React.MouseEvent<Button> | object): void {
    const state: {
      editIndex?: number | null;
      [key: string]: any;
    } = {
      [key]: value
    };

    if (!value) state.editIndex = null;

    this.setState(state);
  }

  // 表格的单选和多选
  handleColumnCheckboxChange(selectedRowKeys: number[], selectedRows: object[]): void {
    this.setState({
      selectedRowKeys
    });
  }

  // 删除选中的数据
  handleDeleteSelectDataClick(event: React.MouseEvent<Button>): void {
    const { form }: ContextValue = this.context;
    const { root }: TableComponentProps = this.props;
    const { selectedRowKeys }: { selectedRowKeys: number[] } = this.state;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
    // 删除选中的数据
    const sortSelectedRowKeys: number[] = sortIndex(selectedRowKeys);

    for (const item of sortSelectedRowKeys) tableValue.splice(item, 1);
    form.setFieldsValue({ [id]: tableValue });
    this.setState({ selectedRowKeys: [] });
  }

  // columns
  columns(): Array<object> {
    const { languagePack, customTableRender }: ContextValue = this.context;
    const { items }: ArrayItem = this.props.root;
    const { inputDisplayIndex, inputChangeIndex }: TableComponentState = this.state;
    const { type, properties, title, $tableRender }: StringItem | NumberItem | BooleanItem | ArrayItem = items;
    const columnArr: object[] = [];

    // 渲染调整数组位置的编辑框
    columnArr.push({
      title: '',
      key: 'lineNumber',
      align: 'center',
      width: 65,
      render: (value: any, item: Object, index: number): React.ReactNode => {
        if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
          return <a onClick={ this.handleInputDisplayClick.bind(this, index) }>{ index + 1 }</a>;
        } else {
          return (
            <Input ref={ this.changeIndexRef }
              value={ inputChangeIndex }
              onChange={ this.handleIndexInputChange.bind(this) }
              onBlur={ this.handleIndexInputBlur.bind(this, index) }
              onPressEnter={ this.handleIndexInputBlur.bind(this, index) }
            />
          );
        }
      }
    });

    // 渲染函数
    const renderCallback: Function = (value: any, item: Object, index: number): string | number => {
      if (isBoolean(value)) {
        return String(value);
      } else if (isObjectOrArray(value)) {
        return Object.prototype.toString.call(value);
      } else {
        return value;
      }
    };

    // 渲染自定义render
    const createRenderCallback: Function = (renderItem: SchemaItem, customFunc: Function): Function => {
      return (value: any, item: Object, index: number): any => {
        return customFunc(renderItem, { value, item, index });
      };
    };

    if (type === 'object') {
      for (const key in properties) {
        const propItem: SchemaItem = properties[key];

        // 隐藏列
        if (!propItem.$tableColumnHidden) {
          columnArr.push({
            title: propItem.title,
            key,
            dataIndex: key,
            render: (propItem.$tableRender && customTableRender && (propItem.$tableRender in customTableRender))
              ? createRenderCallback(propItem, customTableRender[propItem.$tableRender])
              : renderCallback
          });
        }
      }
    } else {
      columnArr.push({
        title,
        key: 'value',
        dataIndex: 'value',
        render: ($tableRender && customTableRender && ($tableRender in customTableRender))
          ? createRenderCallback(items, customTableRender[$tableRender])
          : renderCallback
      });
    }

    columnArr.push({
      title: languagePack && languagePack.formArray.operating,
      key: 'handle',
      width: 160,
      render: (value: any, item: Object, index: number): React.ReactNode => {
        return (
          <Button.Group>
            <Button onClick={ this.handleDrawEditDataDisplayClick.bind(this, index) }>
              { languagePack.formArray.operatingEdit }
            </Button>
            <Popconfirm title={ languagePack.formArray.operatingPopconfirmTitle }
              onConfirm={ this.handleDeleteDataClick.bind(this, index) }
            >
              <Button type="danger">{ languagePack.formArray.operatingDelete }</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    });

    return columnArr;
  }

  render(): React.ReactNode {
    const { root }: TableComponentProps = this.props;
    const { form, languagePack }: ContextValue = this.context;
    const { id, items, minItems, maxItems, $minItemsMessage, $maxItemsMessage }: ArrayItem = root;
    const { isDisplayDataDrawer, selectedRowKeys, inputDisplayIndex, editIndex }: TableComponentState = this.state;
    const inputNotDisplay: boolean = isSpace(inputDisplayIndex);
    let value: Array<any> = form.getFieldValue(id);

    value = isSpace(value) ? (root.$defaultValue || []) : value;

    // 对数组内的元素数量进行验证
    let arrayRulesVerificationResult: string | null = null;

    if (minItems !== undefined && value.length < minItems) {
      arrayRulesVerificationResult = $minItemsMessage || `${ minErrStr }${ minItems }`;
    }

    if (maxItems !== undefined && value.length > maxItems) {
      arrayRulesVerificationResult = $maxItemsMessage || `${ maxErrStr }${ maxItems }`;
    }

    return (
      <Fragment>
        <Table className={ tableClassName(arrayRulesVerificationResult !== null) }
          size="middle"
          dataSource={ items.type === 'object' ? value : formatTableValue(value) }
          columns={ this.columns() }
          bordered={ true }
          title={
            (): React.ReactNodeArray => [
              <Button key="add"
                type="primary"
                icon="plus-circle"
                onClick={ this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', true) }
              >
                { languagePack.formArray.operatingAdd }
              </Button>,
              <Popconfirm key="delete"
                title={ languagePack.formArray.deleteSelectedText }
                onConfirm={ this.handleDeleteSelectDataClick.bind(this) }
              >
                <Button className={ styleName('array-deleteAll') } type="danger" icon="delete">
                  { languagePack.formArray.deleteSelected }
                </Button>
              </Popconfirm>
            ]
          }
          rowKey={ (item: object, index: number): string => `${ index }` }
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: this.handleColumnCheckboxChange.bind(this)
          }}
          components={ inputNotDisplay ? this.components : undefined }
          pagination={ false }
        />
        <p className={ styleName('array-table-rules-verification-str') }>
          { arrayRulesVerificationResult }
        </p>
        {/* 添加和修改数据的抽屉组件 */}
        <Drawer width="100%" visible={ isDisplayDataDrawer } destroyOnClose={ true } closable={ false }>
          <FormObject root={ items }
            okText={ editIndex !== null ? undefined : languagePack.formObject.addOkText }
            cancelText={ editIndex !== null ? undefined : languagePack.formObject.addCancelText }
            onOk={ this.handleAddOrEditDataClick }
            onCancel={ this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', false) }
          />
        </Drawer>
      </Fragment>
    );
  }
}

export default TableComponent;