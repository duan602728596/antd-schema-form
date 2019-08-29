import * as React from 'react';
import { Fragment, useState, useEffect, useContext, useRef, PropsWithChildren, Dispatch, SetStateAction, RefObject } from 'react';
import * as PropTypes from 'prop-types';
import isNil from 'lodash-es/isNil';
import isBoolean from 'lodash-es/isBoolean';
import isObject from 'lodash-es/isObject';
import classNames from 'classnames';
import { Table, Button, Popconfirm, Drawer, Input } from 'antd';
import { PlusCircle as IconPlusCircle, Delete as IconDelete } from '@ant-design/icons';
import { FormInstance } from 'antd/es/form/Form';
import { TableComponents } from 'antd/es/table';
import { Store } from 'rc-field-form/es/interface';
import update from 'immutability-helper';
import AntdSchemaFormContext from '../../context';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import { formatTableValue, sortIndex } from './tableFunction';
import FormObject from '../FormObject/FormObject';
import styleName from '../../utils/styleName';
import template from '../../utils/template';
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
  // 表单属性
  id?: string;
  value?: any;
  onChange?: Function;
}

function TableComponent(props: PropsWithChildren<TableComponentProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, languagePack, customTableRender }: ContextValue = context;
  const { root }: TableComponentProps = props;
  const { id, items, minItems, maxItems, $minItemsMessage, $maxItemsMessage }: ArrayItem = root;
  const { type, properties, title, $tableRender }: StringItem | NumberItem | BooleanItem | ArrayItem = items;
  // @ts-ignore
  const changeIndexRef: RefObject<Input> = useRef();
  let dragTargetId: string | undefined = undefined;    // 被拖拽的id
  let dragTargetIndex: number | undefined = undefined; // 被拖拽的index

  // 添加和修改数据的抽屉的显示和隐藏
  const [isDisplayDataDrawer, setIsDisplayDataDrawer]: [boolean, Dispatch<SetStateAction<boolean>>]
    = useState(false);
  // 编辑框修改位置的状态
  const [inputDisplayIndex, setInputDisplayIndex]: [number | undefined, Dispatch<SetStateAction<number | undefined>>]
    = useState(undefined);
  // 编辑框的值
  const [inputChangeIndex, setInputChangeIndex]: [string | undefined, Dispatch<SetStateAction<string | undefined>>]
    = useState(undefined);
  // 多选框
  const [selectedRowKeys, setSelectedRowKeys]: [Array<number>, Dispatch<SetStateAction<Array<number>>>]
    = useState([]);
  // 当前表格编辑的对象
  const [editIndex, setEditIndex]: [number | undefined, Dispatch<SetStateAction<number | undefined>>]
    = useState(undefined);

  // 表单
  function triggerChange(changedValue: Store): void {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  }

  // 调换位置
  function moveRow(dragIndex: number, hoverIndex: number): void {
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;

    const dragRowItem: object = tableValue[dragIndex];
    const newData: { tableValue: Store } = update({ tableValue }, {
      tableValue: {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowItem]]
      }
    });

    triggerChange(newData.tableValue);
  }

  // 开始拖拽
  function handleTableDragStart(event: React.DragEvent<HTMLTableRowElement>): void {
    const target: EventTarget = event.target;
    const id: string = target['dataset'].id;
    const index: number = Number(target['dataset'].index);

    dragTargetId = id;
    dragTargetIndex = index;
  }

  // 拖拽进入
  function handleTableDragEnter(event: React.DragEvent<HTMLTableRowElement>): void {
    event.preventDefault();

    // 获取目标的信息
    const target: EventTarget = event.target;
    let fatherTarget: HTMLElement | undefined = undefined;

    // 获取父级节点
    if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
      fatherTarget = target['parentNode'];
    } else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
      fatherTarget = target['parentNode']['parentNode'];
    }

    if (fatherTarget !== undefined) {
      const overId: string | undefined = fatherTarget['dataset'].id;
      const overIndex: number | undefined = Number(fatherTarget['dataset'].index);

      // 添加样式
      if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
        if (overIndex > dragTargetIndex) {
          fatherTarget.classList.add(tableDragClassName[0]);
        } else if (overIndex < dragTargetIndex) {
          fatherTarget.classList.add(tableDragClassName[1]);
        }
      }
    }
  }

  // 拖拽退出
  function handleTableDragLeave(event: React.DragEvent<HTMLTableRowElement>): void {
    event.preventDefault();

    // 获取目标的信息
    const target: EventTarget = event['target'];
    let fatherTarget: HTMLElement | undefined = undefined;

    // 获取父级节点
    if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
      fatherTarget = target['parentNode'];
    } else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
      fatherTarget = target['parentNode']['parentNode'];
    }

    if (fatherTarget !== undefined) {
      const overId: string | undefined = fatherTarget['dataset'].id;

      // 移除样式
      if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
        fatherTarget.classList.remove(tableDragClassName[0]);
        fatherTarget.classList.remove(tableDragClassName[1]);
      }
    }
  }

  // 拖拽中
  function handleTableDragOver(event: React.DragEvent<HTMLTableRowElement>): void {
    event.preventDefault();
  }

  // 放置
  function handleTableDrop(event: React.DragEvent<HTMLTableRowElement>): void {
    event.preventDefault();

    // 获取目标的信息
    const target: EventTarget = event['target'];
    let fatherTarget: HTMLElement | undefined = undefined;

    // 获取父级节点
    if (target['nodeName'] === 'TD' && target['parentNode']['nodeName'] === 'TR') {
      fatherTarget = target['parentNode'];
    } else if (target['nodeName'] === 'BUTTON' && target['parentNode']['parentNode']['nodeName'] === 'TR') {
      fatherTarget = target['parentNode']['parentNode'];
    }

    if (fatherTarget !== undefined) {
      const overId: string | undefined = fatherTarget['dataset'].id;
      const overIndex: number | undefined = Number(fatherTarget['dataset'].index);

      // 修改数据
      if (dragTargetId !== undefined && dragTargetIndex !== undefined && dragTargetId === overId) {
        moveRow(dragTargetIndex, overIndex);
      }
    }

    // 重置拖拽状态
    dragTargetId = undefined;
    dragTargetIndex = undefined;

    // 清除样式
    const c0: HTMLElement | null = document.querySelector(`.${ tableDragClassName[0] }`);
    const c1: HTMLElement | null = document.querySelector(`.${ tableDragClassName[1] }`);

    c0 && c0.classList.remove(tableDragClassName[0]);
    c1 && c1.classList.remove(tableDragClassName[1]);
  }

  // table components
  const components: TableComponents = {
    body: {
      row: (item: any): React.ReactElement<'tr'> => {
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
            onDragStart={ handleTableDragStart }
            onDragEnter={ handleTableDragEnter }
            onDragLeave={ handleTableDragLeave }
            onDragOver={ handleTableDragOver }
            onDrop={ handleTableDrop }
          >
            { children }
          </tr>
        );
      }
    }
  };

  // 编辑位置框修改位置
  function handleInputDisplayClick(index: number, event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    setInputDisplayIndex(index);
    setInputChangeIndex(String(index + 1));
  }

  // 编辑位置框数据修改
  function handleIndexInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputChangeIndex(event.target.value);
  }

  // 编辑位置框失去焦点
  function handleIndexInputBlur(index: number, event: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>): void {
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;

    const length: number = tableValue.length;
    let newIndex: number = Number(inputChangeIndex) - 1;

    if (inputChangeIndex && newIndex !== index && /^[0-9]+$/.test(inputChangeIndex)) {
      if (newIndex < 0) newIndex = 0;
      if (newIndex > length) newIndex = length;

      moveRow(index, newIndex);
    }

    setInputDisplayIndex(undefined);
    setInputChangeIndex(undefined);
  }

  // 添加和修改数据
  function handleAddOrEditDataClick(objectForm: FormInstance, objectValue: object, keys: string[]): void {
    // 获取需要验证和获取值的key
    const value: Store = form.getFieldsValue(keys);
    const formatValue: Store = formatValueBeforeGetValue(value, id);
    const result: object = getValueFromObject(formatValue);
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;

    // 判断是修改还是添加
    if (editIndex === undefined) {
      tableValue[root.$addDataInReverseOrder ? 'unshift' : 'push'](result['items']);
    } else {
      tableValue[editIndex] = result['items'];
    }

    triggerChange(tableValue);

    // 重置状态
    if (editIndex === undefined) {
      form.resetFields(keys);
    } else {
      setIsDisplayDataDrawer(false);
      setEditIndex(undefined);
    }
  }

  // 删除数据
  function handleDeleteDataClick(index: number, event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
    tableValue.splice(index, 1);

    triggerChange(tableValue);
  }

  // 修改数据抽屉的显示
  function handleDrawEditDataDisplayClick(index: number, event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    setIsDisplayDataDrawer(true);
    setEditIndex(index);
  }

  // 抽屉的显示和隐藏
  function handleDrawerDisplayClick(value: boolean, event?: React.MouseEvent<HTMLElement, MouseEvent>): void {
    setIsDisplayDataDrawer(value);

    if (!value) setEditIndex(undefined);
  }

  // 表格的单选和多选
  function handleColumnCheckboxChange(selectedRowKeys: number[], selectedRows: object[]): void {
    setSelectedRowKeys(selectedRowKeys);
  }

  // 删除选中的数据
  function handleDeleteSelectDataClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const id: string = root.id;
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;
    // 删除选中的数据
    const sortSelectedRowKeys: number[] = sortIndex(selectedRowKeys);

    for (const item of sortSelectedRowKeys) tableValue.splice(item, 1);

    triggerChange(tableValue);
    setSelectedRowKeys([]);
  }

  // columns
  function columns(): Array<object> {
    const columnArr: object[] = [];

    // 渲染调整数组位置的编辑框
    columnArr.push({
      title: '',
      key: 'lineNumber',
      align: 'center',
      width: 65,
      render: (value: any, record: object, index: number): React.ReactNode => {
        if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
          return (
            <a onClick={ (event: React.MouseEvent<HTMLElement, MouseEvent>): void => handleInputDisplayClick(index, event) }>
              { index + 1 }
            </a>
          );
        } else {
          return (
            <Input ref={ changeIndexRef }
              value={ inputChangeIndex }
              onChange={ handleIndexInputChange }
              onBlur={ (event: React.FocusEvent<HTMLInputElement>): void => handleIndexInputBlur(index, event) }
              onPressEnter={ (event: React.KeyboardEvent<HTMLInputElement>): void => handleIndexInputBlur(index, event) }
            />
          );
        }
      }
    });

    // 渲染函数
    const renderCallback: Function = (value: any, record: object, index: number): string | number => {
      if (isBoolean(value)) {
        return String(value);
      } else if (isObject(value)) {
        return Object.prototype.toString.call(value);
      } else {
        return value;
      }
    };

    // 渲染自定义render
    const createRenderCallback: Function = (renderItem: SchemaItem, customFunc: Function): Function => {
      return (value: any, record: object, index: number): any => {
        return customFunc(value, record, index, renderItem, form);
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
      render: (value: any, record: object, index: number): React.ReactNode => {
        return (
          <Button.Group>
            <Button onClick={ (event: React.MouseEvent<HTMLElement, MouseEvent>): void => handleDrawEditDataDisplayClick(index, event) }>
              { languagePack.formArray.operatingEdit }
            </Button>
            <Popconfirm title={ languagePack.formArray.operatingPopconfirmTitle }
              onConfirm={ (event: React.MouseEvent<HTMLElement, MouseEvent>): void => handleDeleteDataClick(index, event) }
            >
              <Button type="danger">{ languagePack.formArray.operatingDelete }</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    });

    return columnArr;
  }

  useEffect(function(): void {
    // 编辑位置框需要给一个焦点
    if (changeIndexRef.current) {
      changeIndexRef.current.focus();
    }
  }, [inputDisplayIndex, inputChangeIndex]);

  useEffect(function(): void {
    // 打开抽屉时需要赋值
    if (editIndex !== undefined) {
      let tableValue: Array<any> | any = form.getFieldValue(id);

      tableValue = isNil(tableValue) ? (root.$defaultValue || []) : tableValue;

      const itemValue: any = tableValue[editIndex];
      const result: Store = getObjectFromValue({ items: itemValue }, id);

      form.setFieldsValue(result);
    }
  }, [isDisplayDataDrawer, editIndex]);

  const inputNotDisplay: boolean = isNil(inputDisplayIndex);
  let value: Array<any> | any = form.getFieldValue(id);

  value = isNil(value) ? [] : value;

  // 对数组内的元素数量进行验证
  let arrayRulesVerificationResult: string | undefined = undefined;

  if (minItems !== undefined && value.length < minItems) {
    arrayRulesVerificationResult = template($minItemsMessage || languagePack.rules.array.minItems, {
      '0': minItems
    });
  }

  if (maxItems !== undefined && value.length > maxItems) {
    arrayRulesVerificationResult = template($maxItemsMessage || languagePack.rules.array.maxItems, {
      '0': maxItems
    });
  }

  return (
    <Fragment>
      <Table className={ tableClassName(arrayRulesVerificationResult !== undefined) }
        size="middle"
        dataSource={ items.type === 'object' ? value : formatTableValue(value) }
        columns={ columns() }
        bordered={ true }
        title={
          (): React.ReactNodeArray => [
            <Button key="add"
              type="primary"
              icon={ <IconPlusCircle /> }
              onClick={ (event: React.MouseEvent<HTMLElement, MouseEvent>): void => handleDrawerDisplayClick(true, event) }
            >
              { languagePack.formArray.operatingAdd }
            </Button>,
            <Popconfirm key="delete"
              title={ languagePack.formArray.deleteSelectedText }
              onConfirm={ (event: React.MouseEvent<HTMLElement, MouseEvent>): void => handleDeleteSelectDataClick(event) }
            >
              <Button className={ styleName('array-deleteAll') } type="danger" icon={ <IconDelete /> }>
                { languagePack.formArray.deleteSelected }
              </Button>
            </Popconfirm>
          ]
        }
        rowKey={ (item: object, index: number): string => `${ index }` }
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: handleColumnCheckboxChange
        }}
        components={ inputNotDisplay ? components : undefined }
        pagination={ false }
      />
      <p className={ styleName('array-table-rules-verification-str') }>
        { arrayRulesVerificationResult }
      </p>
      {/* 添加和修改数据的抽屉组件 */}
      <Drawer width="100%" visible={ isDisplayDataDrawer } destroyOnClose={ true } closable={ false }>
        <FormObject root={ items }
          okText={ editIndex !== undefined ? undefined : languagePack.formObject.addOkText }
          cancelText={ editIndex !== undefined ? undefined : languagePack.formObject.addCancelText }
          onOk={ handleAddOrEditDataClick }
          onCancel={ (): void => handleDrawerDisplayClick(false) }
        />
      </Drawer>
    </Fragment>
  );
}

TableComponent.propTypes = {
  root: PropTypes.object
};

export default TableComponent;