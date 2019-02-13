import * as React from 'react';
import { Component, Fragment, createRef, Context, RefObject, ChangeEvent } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Table, Button, Popconfirm, Drawer, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import AntdSchemaFormContext from '../../context';
import { isSpace, isBoolean, isObjectOrArray } from '../../utils/type';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import { formatTableValue, sortIndex } from './tableFunction';
import FormObject from '../FormObject/FormObject';
import styleName from '../../utils/styleName';
import { ArrayItem, ContextValue } from '../../types';

interface TableComponentProps{
  root: ArrayItem;
}

interface TableComponentState {
  isDisplayDataDrawer: boolean;
  inputDisplayIndex: number;
  inputChangeIndex: string;
  selectedRowKeys: Array<number>;
}

class TableComponent extends Component<TableComponentProps>{
  static contextType: Context<ContextValue> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>
  } = {
    root: PropTypes.object
  };

  changeIndexRef: RefObject<Input> = createRef();
  editIndex: number = null;
  state: TableComponentState = {
    isDisplayDataDrawer: false, // 添加和修改数据的抽屉的显示和隐藏
    inputDisplayIndex: null,    // 编辑框修改位置的状态
    inputChangeIndex: null,     // 编辑框的值
    selectedRowKeys: []         // 多选框
  };

  // 编辑位置框修改位置
  handleInputDisplayClick(index: number, event: Event): void{
    this.setState({
      inputDisplayIndex: index,
      inputChangeIndex: String(index + 1)
    }, (): void=>{
      this.changeIndexRef.current.focus();
    });
  }
  // 编辑位置框数据修改
  handleIndexInputChange(event: ChangeEvent<HTMLInputElement>): void{
    this.setState({ inputChangeIndex: event.target.value });
  }
  // 编辑位置框失去焦点
  handleIndexInputBlur(index: number, event: Event): void{
    const { form } = this.context;
    const { root } = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    const length: number = tableValue.length;
    const { inputChangeIndex } = this.state;
    let newIndex: number = Number(inputChangeIndex) - 1;

    if(newIndex !== index && /^[0-9]+$/.test(inputChangeIndex)){
      if(newIndex < 0) newIndex = 0;
      if(newIndex > length) newIndex = length;

      // 修改位置
      tableValue.splice(newIndex > index ? (newIndex + 1) : newIndex, 0, tableValue[index]);
      // 删除旧数据
      tableValue.splice(newIndex > index ? index : (index + 1), 1);
      form.setFieldsValue({ [id]: tableValue });
    }

    this.setState({
      inputDisplayIndex: null,
      inputChangeIndex: null
    });
  }
  // 添加和修改数据
  handleAddOrEditDataClick: Function = (value: object, form2: WrappedFormUtils, keys: string[]): void=>{
    const { form } = this.context;
    const { root } = this.props;
    const id: string = root.id;
    // 获取需要验证和获取值的key
    const value2: object = form.getFieldsValue(keys);
    const formatValue: object = formatValueBeforeGetValue(value2, id);
    const result: object = getValueFromObject(formatValue);
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    // 判断是修改还是添加
    if(this.editIndex === null){
      tableValue.push(result['items']);
    }else{
      tableValue[this.editIndex] = result['items'];
    }

    form.setFieldsValue({ [id]: tableValue });

    // 重置状态
    if(this.editIndex === null){
      form.resetFields(keys);
    }else{
      this.editIndex = null;
      this.setState({ isDisplayDataDrawer: false });
    }
  };
  // 删除数据
  handleDeleteDataClick(index: number, event: Event): void{
    const { form } = this.context;
    const { root } = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
    tableValue.splice(index, 1);
    form.setFieldsValue({ [id]: tableValue });
  }
  // 修改数据抽屉的显示
  handleDrawEditDataDisplayClick(index: number, event: Event): void{
    const { form } = this.context;
    const { root } = this.props;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;

    const itemValue: any = tableValue[index];
    const result: Object = getObjectFromValue({ items: itemValue }, id);

    this.editIndex = index;

    this.setState({
      isDisplayDataDrawer: true
    }, (): void => form.setFieldsValue(result));
  }
  // 抽屉的显示和隐藏
  handleDrawerDisplayClick(key: string, value: string, eventOrObject: Event | object): void{
    this.setState({ [key]: value });
  }
  // 表格的单选和多选
  handleColumnCheckboxChange(selectedRowKeys: number[], selectedRows: object[]): void{
    this.setState({ selectedRowKeys });
  }
  // 删除选中的数据
  handleDeleteSelectDataClick(event: MouseEvent): void{
    const { form } = this.context;
    const { root } = this.props;
    const { selectedRowKeys }: { selectedRowKeys: number[] } = this.state;
    const id: string = root.id;
    let tableValue: Array<any> = form.getFieldValue(id);

    tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
    // 删除选中的数据
    const sortSelectedRowKeys: number[] = sortIndex(selectedRowKeys);

    for(const item of sortSelectedRowKeys) tableValue.splice(item, 1);
    form.setFieldsValue({ [id]: tableValue });
    this.setState({ selectedRowKeys: [] });
  }
  // columns
  columns(): Array<object>{
    const { languagePack } = this.context;
    const { items } = this.props.root;
    const { inputDisplayIndex, inputChangeIndex } = this.state;
    const { type, properties, title } = items;
    const columnArr: object[] = [];

    // 渲染调整数组位置的编辑框
    columnArr.push({
      title: '',
      key: 'lineNumber',
      align: 'center',
      width: 65,
      render: (value: any, item: Object, index: number): React.ReactNode=>{
        if(inputDisplayIndex === null || inputDisplayIndex !== index){
          return <a onClick={ this.handleInputDisplayClick.bind(this, index) }>{ index + 1 }</a>;
        }else{
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
    const renderCb: Function = (value: any, item: Object, index: number): string | number=>{
      if(isBoolean(value)){
        return String(value);
      }else if(isObjectOrArray(value)){
        return Object.prototype.toString.call(value);
      }else{
        return value;
      }
    };

    if(type === 'object'){
      for(const key in properties){
        const item: object = properties[key];

        columnArr.push({
          title: item['title'],
          key,
          dataIndex: key,
          render: renderCb
        });
      }
    }else{
      columnArr.push({
        title,
        key: 'value',
        dataIndex: 'value',
        render: renderCb
      });
    }

    columnArr.push({
      title: languagePack.formArray.operating,
      key: 'handle',
      width: 160,
      render: (value: any, item: Object, index: number): React.ReactNode=>{
        return (
          <Button.Group>
            <Button onClick={ this.handleDrawEditDataDisplayClick.bind(this, index) }>{ languagePack.formArray.operatingEdit }</Button>
            <Popconfirm title={ languagePack.formArray.operatingPopconfirmTitle } onConfirm={ this.handleDeleteDataClick.bind(this, index) }>
              <Button type="danger">{ languagePack.formArray.operatingDelete }</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    });

    return columnArr;
  }
  render(): React.ReactNode{
    const { root } = this.props;
    const { form, languagePack } = this.context;
    const { id, items } = root;
    const { isDisplayDataDrawer, selectedRowKeys } = this.state;
    let value: Array<any> = form.getFieldValue(id);

    value = isSpace(value) ? (root.$defaultValue || []) : value;

    return (
      <Fragment>
        <Table size="middle"
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
          pagination={ false }
        />
        {/* 添加和修改数据的抽屉组件 */}
        <Drawer width="100%" visible={ isDisplayDataDrawer } destroyOnClose={ true } closable={ false }>
          <FormObject root={ items }
            onOk={ this.handleAddOrEditDataClick }
            onCancel={ this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', false) }
          />
        </Drawer>
      </Fragment>
    );

  }
}

export default TableComponent;