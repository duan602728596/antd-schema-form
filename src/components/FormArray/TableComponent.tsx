import {
  createElement,
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
  PropsWithChildren,
  Dispatch as D,
  SetStateAction as S,
  Ref,
  DragEvent,
  MouseEvent as RMouseEvent,
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  ReactElement,
  ReactNode
} from 'react';
import * as PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Drawer, Input, InputRef } from 'antd';
import type { FormInstance } from 'antd/es/form/Form';
import type { Store } from 'antd/es/form/interface';
import type { TableComponents } from 'rc-table/es/interface';
import { PlusCircleOutlined as IconPlusCircleOutlined, DeleteOutlined as IconDeleteOutlined } from '@ant-design/icons';
import { isNil, isBoolean, isObject } from '../../utils/lodash';
import { arrayMoveImmutable } from '../../utils/arrayMove';
import AntdSchemaFormContext from '../../context';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import getObjectFromSchema from '../../utils/getObjectFromSchema';
import { formatTableValue, sortIndex } from './tableFunction';
import FormObject from '../FormObject/FormObject';
import styleName from '../../utils/styleName';
import isAMomentObject from '../../utils/isAMomentObject';
import type {
  CustomTableRenderFunc,
  SchemaItem,
  StringItem,
  NumberItem,
  BooleanItem,
  ArrayItem,
  ContextValue
} from '../../types';

// 拖拽相关变量
const tableDragClassName: [string, string] = [
  styleName('array-drop-over-downward'),
  styleName('array-drop-over-upward')
];

interface TableComponentProps {
  root: ArrayItem;
  // 表单属性
  id?: string;
  value?: any;
  onChange?: Function;
}

function TableComponent(props: PropsWithChildren<TableComponentProps>): ReactElement {
  const context: ContextValue = useContext(AntdSchemaFormContext);
  const { form, languagePack, customTableRender }: ContextValue = context;
  const { root, value: formComponentValue }: TableComponentProps = props;
  const { id, items }: ArrayItem = root;
  const { type, properties, title, $tableRender }: StringItem | NumberItem | BooleanItem | ArrayItem = items;
  const changeIndexRef: Ref<InputRef> | undefined = useRef(null);
  let dragTargetId: string | undefined = undefined;    // 被拖拽的id
  let dragTargetIndex: number | undefined = undefined; // 被拖拽的index

  // 添加和修改数据的抽屉的显示和隐藏
  const [isDisplayDataDrawer, setIsDisplayDataDrawer]: [boolean, D<S<boolean>>]
    = useState(false);
  // 编辑框修改位置的状态
  const [inputDisplayIndex, setInputDisplayIndex]: [number | undefined, D<S<number | undefined>>]
    = useState(undefined);
  // 编辑框的值
  const [inputChangeIndex, setInputChangeIndex]: [string | undefined, D<S<string | undefined>>]
    = useState(undefined);
  // 多选框
  const [selectedRowKeys, setSelectedRowKeys]: [Array<number>, D<S<Array<number>>>]
    = useState([]);
  // 当前表格编辑的对象
  const [editIndex, setEditIndex]: [number | undefined, D<S<number | undefined>>]
    = useState(undefined);

  // 表单
  function triggerChange(changedValue: Store): void {
    if (props.onChange) {
      props.onChange(changedValue);
    }
  }

  /**
   * 调换位置
   * @param { number } dragIndex - old
   * @param { number } hoverIndex - new
   */
  function moveRow(dragIndex: number, hoverIndex: number): void {
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue ?? []) : tableValue;
    triggerChange(arrayMoveImmutable(tableValue, dragIndex, hoverIndex));
  }

  // 开始拖拽
  function handleTableDragStart(event: DragEvent<HTMLTableRowElement>): void {
    const target: EventTarget = event.target;
    const datasetId: string = target['dataset'].id;
    const index: number = Number(target['dataset'].index);

    dragTargetId = datasetId;
    dragTargetIndex = index;
  }

  // 拖拽进入
  function handleTableDragEnter(event: DragEvent<HTMLTableRowElement>): void {
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
  function handleTableDragLeave(event: DragEvent<HTMLTableRowElement>): void {
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
  function handleTableDragOver(event: DragEvent<HTMLTableRowElement>): void {
    event.preventDefault();
  }

  // 放置
  function handleTableDrop(event: DragEvent<HTMLTableRowElement>): void {
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
  const components: TableComponents<any> = {
    body: {
      row: (item: any): ReactElement<'tr'> => {
        const { children, className }: {
          children: Array<ReactNode>;
          className: string;
        } = item;
        // @ts-ignore
        const index: number = item['data-row-key'] ? Number(item['data-row-key']) : children[0]?.props?.index;

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
  function handleInputDisplayClick(index: number, event: RMouseEvent<HTMLElement, MouseEvent>): void {
    setInputDisplayIndex(index);
    setInputChangeIndex(String(index + 1));
  }

  // 编辑位置框数据修改
  function handleIndexInputChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputChangeIndex(event.target.value);
  }

  // 编辑位置框失去焦点
  function handleIndexInputBlur(index: number, event: FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>): void {
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue ?? []) : tableValue;

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

    tableValue = isNil(tableValue) ? (root.$defaultValue ?? []) : tableValue;

    // 判断是修改还是添加
    if (editIndex === undefined) {
      tableValue[root.$addDataInReverseOrder ? 'unshift' : 'push'](result['items']);
    } else {
      tableValue[editIndex] = result['items'];
    }

    triggerChange([...tableValue]);

    // 重置状态
    form.resetFields(keys);

    if (editIndex === undefined) {
      const formResult: Store = getObjectFromSchema(root.items);

      form.setFieldsValue(formResult);
    } else {
      setIsDisplayDataDrawer(false);
      setEditIndex(undefined);
    }
  }

  // 删除数据
  function handleDeleteDataClick(index: number, event: RMouseEvent<HTMLElement, MouseEvent>): void {
    let tableValue: Array<any> | any = form.getFieldValue(id);

    tableValue = isNil(tableValue) ? (root.$defaultValue ?? []) : tableValue;
    tableValue.splice(index, 1);

    triggerChange([...tableValue]);
  }

  // 修改数据抽屉的显示
  function handleDrawEditDataDisplayClick(index: number, event: RMouseEvent<HTMLElement, MouseEvent>): void {
    setIsDisplayDataDrawer(true);
    setEditIndex(index);
  }

  // 抽屉的显示和隐藏
  function handleDrawerDisplayClick(value: boolean, event?: RMouseEvent<HTMLElement, MouseEvent>): void {
    setIsDisplayDataDrawer(value);

    if (!value) setEditIndex(undefined);
  }

  // 关闭抽屉
  function handleDrawerCloseClick(objectForm: FormInstance, keys: string[]): void {
    handleDrawerDisplayClick(false);
    form.resetFields(keys);
  }

  // 表格的单选和多选
  function handleColumnCheckboxChange(selectedRowKeysValue: number[], selectedRows: object[]): void {
    setSelectedRowKeys(selectedRowKeysValue);
  }

  // 删除选中的数据
  function handleDeleteSelectDataClick(event: RMouseEvent<HTMLElement, MouseEvent>): void {
    const rootId: string = root.id;
    let tableValue: Array<any> | any = form.getFieldValue(rootId);

    tableValue = isNil(tableValue) ? (root.$defaultValue ?? []) : tableValue;
    // 删除选中的数据
    const sortSelectedRowKeys: number[] = sortIndex(selectedRowKeys);

    for (const item of sortSelectedRowKeys) {
      tableValue.splice(item, 1);
    }

    triggerChange([...tableValue]);
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
      render: (value: any, record: object, index: number): ReactNode => {
        if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
          return (
            <a onClick={ (event: RMouseEvent<HTMLElement, MouseEvent>): void => handleInputDisplayClick(index, event) }>
              { index + 1 }
            </a>
          );
        } else {
          return (
            <Input ref={ changeIndexRef }
              value={ inputChangeIndex }
              onChange={ handleIndexInputChange }
              onBlur={ (event: FocusEvent<HTMLInputElement>): void => handleIndexInputBlur(index, event) }
              onPressEnter={ (event: KeyboardEvent<HTMLInputElement>): void => handleIndexInputBlur(index, event) }
            />
          );
        }
      }
    });

    // 渲染函数
    const renderCallback: Function = (value: any, record: object, index: number): string | number => {
      if (isBoolean(value)) {
        return String(value);
      }

      if (isObject(value)) {
        if (isAMomentObject(value)) {
          const { $showTime = true, $format }: StringItem = items as StringItem;
          const formatString: string = $format ?? ($showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');

          return value.format(formatString);
        } else {
          return Object.prototype.toString.call(value);
        }
      }

      return value;
    };

    // 渲染自定义render
    const createRenderCallback: Function = (renderItem: SchemaItem, customFunc: CustomTableRenderFunc): Function => {
      return (value: any, record: object, index: number): ReactNode => {
        return customFunc({ value, record, index, root: renderItem, form });
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
      render: (value: any, record: object, index: number): ReactNode => {
        return (
          <Button.Group>
            <Button onClick={ (event: RMouseEvent<HTMLElement, MouseEvent>): void => handleDrawEditDataDisplayClick(index, event) }>
              { languagePack.formArray.operatingEdit }
            </Button>
            <Popconfirm title={ languagePack.formArray.operatingPopconfirmTitle }
              onConfirm={ (event: RMouseEvent<HTMLElement, MouseEvent>): void => handleDeleteDataClick(index, event) }
            >
              <Button type="primary" danger={ true }>{ languagePack.formArray.operatingDelete }</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    });

    return columnArr;
  }

  const inputNotDisplay: boolean = isNil(inputDisplayIndex);
  const dataSourceValue: Array<any> | any = useMemo(function(): Array<any> | any {
    if (isNil(formComponentValue)) {
      return [];
    }

    if (items.type === 'object') {
      return formComponentValue;
    } else {
      return formatTableValue(formComponentValue);
    }
  }, [items, formComponentValue]);

  useEffect(function(): void {
    // 编辑位置框需要给一个焦点
    if (changeIndexRef.current) {
      changeIndexRef.current.focus();
    }
  }, [inputDisplayIndex, inputChangeIndex]);

  useEffect(function(): void {
    // 打开抽屉时需要赋值
    if (isDisplayDataDrawer) {
      if (editIndex !== undefined) {
        let tableValue: Array<any> | any = form.getFieldValue(id);

        tableValue = isNil(tableValue) ? (root.$defaultValue ?? []) : tableValue;

        const itemValue: any = tableValue[editIndex];
        const result: Store = getObjectFromValue({ items: itemValue }, id);

        form.setFieldsValue(result);
      } else {
        const result: Store = getObjectFromSchema(root.items);

        form.setFieldsValue(result);
      }
    }
  }, [isDisplayDataDrawer, editIndex]);

  // 对数组内的元素数量进行验证
  return (
    <Fragment>
      <Table className={ styleName('array-table-component') }
        size="middle"
        dataSource={ dataSourceValue }
        columns={ columns() }
        bordered={ true }
        title={
          (): Array<ReactNode> => [
            <Button key="add"
              type="primary"
              icon={ <IconPlusCircleOutlined /> }
              onClick={ (event: RMouseEvent<HTMLElement, MouseEvent>): void => handleDrawerDisplayClick(true, event) }
            >
              { languagePack.formArray.operatingAdd }
            </Button>,
            <Popconfirm key="delete"
              title={ languagePack.formArray.deleteSelectedText }
              onConfirm={ (event: RMouseEvent<HTMLElement, MouseEvent>): void => handleDeleteSelectDataClick(event) }
            >
              <Button className={ styleName('array-deleteAll') } type="primary" danger={ true } icon={ <IconDeleteOutlined /> }>
                { languagePack.formArray.deleteSelected }
              </Button>
            </Popconfirm>
          ]
        }
        rowKey={ root.$rowKey ?? ((item: object, index: number): string => `${ index }`) }
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys,
          onChange: handleColumnCheckboxChange
        }}
        components={ inputNotDisplay ? components : undefined }
        pagination={ false }
      />
      {/* 添加和修改数据的抽屉组件 */}
      <Drawer width="100%" open={ isDisplayDataDrawer } destroyOnClose={ true } closable={ false }>
        <FormObject root={ items }
          okText={ editIndex !== undefined ? undefined : languagePack.formObject.addOkText }
          cancelText={ editIndex !== undefined ? undefined : languagePack.formObject.addCancelText }
          onOk={ handleAddOrEditDataClick }
          onCancel={ handleDrawerCloseClick }
        />
      </Drawer>
    </Fragment>
  );
}

TableComponent.propTypes = {
  root: PropTypes.object
};

export default TableComponent;