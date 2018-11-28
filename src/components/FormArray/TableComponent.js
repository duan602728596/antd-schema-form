import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm, Drawer } from 'antd';
import Context from '../../context';
import { isSpace, isBoolean, isObjectOrArray } from '../../utils/type';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import { formatTableValue, getKeysFromObject } from './tableFunction';
import FormObject from '../FormObject/FormObject';

class TableComponent extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object
  };

  editIndex: ?number;
  state: {
    isDisplayDataDrawer: boolean
  };

  constructor(): void{
    super(...arguments);

    this.editIndex = null; // 编辑表单时选择的数组索引
    this.state = {
      isDisplayDataDrawer: false // 添加和修改数据的抽屉的显示和隐藏
    };
  }
  // 添加和修改数据
  handleAddOrEditDataClick: Function = (event: Event): void=>{
    const { form }: { form: Object } = this.context;
    const { root }: { root: Object } = this.props;
    const { items }: { items: Object } = root;
    const $id: string = root?.$id || root?.id;
    // 获取需要验证和获取值的key
    const keys: string[] = getKeysFromObject(items);

    form.validateFields(keys, (err: Array, value: Object): void=>{
      const formatValue: Object = formatValueBeforeGetValue(value, $id);
      const result: Object = getValueFromObject(formatValue);
      let tableValue: Array<any> = form.getFieldValue($id);

      tableValue = isSpace(tableValue) ? (root?.$defaultValue || []) : tableValue;

      // 判断是修改还是添加
      if(this.editIndex === null){
        tableValue.push(result.items);
      }else{
        tableValue[this.editIndex] = result.items;
      }

      form.setFieldsValue({ [$id]: tableValue });

      if(this.editIndex === null){
        form.resetFields(keys);
      }else{
        this.editIndex = null;
        this.setState({ isDisplayDataDrawer: false });
      }
    });
  };
  // 修改数据抽屉的显示
  handleDrawEditDataDisplayClick(index: number, event: Event): void{
    const { form }: { form: Object } = this.context;
    const { root }: { root: Object } = this.props;
    const $id: string = root?.$id || root?.id;
    let tableValue: Array<any> = form.getFieldValue($id);

    tableValue = isSpace(tableValue) ? (root?.$defaultValue || []) : tableValue;

    const itemValue: any = tableValue[index];
    const result: Object = getObjectFromValue({ items: itemValue }, $id);

    this.editIndex = index;

    this.setState({
      isDisplayDataDrawer: true
    }, (): void => form.setFieldsValue(result));
  }
  // 抽屉的显示和隐藏
  handleDrawerDisplayClick(key: string, value: string, event: Event): void{
    this.setState({ [key]: value });
  }
  // columns
  columns(): Array{
    const { items }: { items: Object } = this.props.root;
    const { type, properties, title }: {
      type: string,
      properties: ?Object,
      title: string
    } = items;
    const columnArr: [] = [];

    // 渲染调整数组位置的编辑框
    columnArr.push({
      title: '',
      key: 'lineNumber',
      width: 65,
      render: (value: any, item: Object, index: number): React.Element=>{
        return <a>{ index + 1 }</a>;
      }
    });

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
      for(const key: string in properties){
        const item: Object = properties[key];

        columnArr.push({
          title: item.title,
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
      title: '操作',
      key: 'handle',
      width: 160,
      render: (value: any, item: Object, index: number): React.Element=>{
        return (
          <Button.Group size="middle">
            <Button onClick={ this.handleDrawEditDataDisplayClick.bind(this, index) }>修改</Button>
            <Popconfirm title="确认要删除数据吗？">
              <Button type="danger">删除</Button>
            </Popconfirm>
          </Button.Group>
        );
      }
    });

    return columnArr;
  }
  render(): React.Element{
    const { root }: { root: Object } = this.props;
    const { form }: { form: Object } = this.context;
    const $id: string = root?.$id || root?.id;
    const { items }: { items: Object } = root;
    const { isDisplayDataDrawer }: { isDisplayDataDrawer: boolean } = this.state;
    let value: Array<any> = form.getFieldValue($id);

    value = isSpace(value) ? (root?.$defaultValue || []) : value;

    return (
      <Fragment>
        <Table size="middle"
          dataSource={ items.type === 'object' ? value : formatTableValue(value) }
          columns={ this.columns() }
          bordered={ true }
          title={
            (): React.Element => (
              <Button type="primary"
                icon="plus-circle"
                onClick={ this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', true) }
              >
                添加数据
              </Button>
            )
          }
          rowKey={ (item: Object, index: number): number => index }
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true
          }}
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