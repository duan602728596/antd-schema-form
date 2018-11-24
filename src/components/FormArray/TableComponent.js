import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
import Context from '../../context';
import { isSpace, isBoolean, isObjectOrArray } from '../../utils/type';
import styleName from '../../utils/styleName';
import { formatTableValue } from './formatData';

class TableComponent extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object,
    option: PropTypes.object
  };

  state: {
    form: Object,
    value: Array<any>
  };

  constructor(): void{
    super(...arguments);

    const { form }: { form: Object } = this.context;
    const { root }: { root: Object } = this.props;
    const $id: string = root?.$id || root?.id;
    const value: Array<any> = form.getFieldValue($id);

    this.state = {
      form,
      value: isSpace(value) ? (root?.$defaultValue || []) : value
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    const { form }: { form: Object } = prevState;
    const { root }: { root: Object } = nextProps;
    const $id: string = root?.$id || root?.id;
    const value: Array<any> = form.getFieldValue($id);

    return {
      value: isSpace(value) ? (root?.$defaultValue || []) : value
    };
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
            <Button>修改</Button>
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
    const { getFieldProps }: { getFieldProps: Function } = this.context.form;
    const { root, option }: {
      root: Object,
      option: Object
    } = this.props;
    const $id: string = root?.$id || root?.id;
    const { title, description, type }: {
      title: string,
      description: string,
      type: string
    } = root;
    const { value }: { value: Array<value> } = this.state;

    return (
      <Fragment>
        <div className={ styleName('array-tools') } { ...getFieldProps($id, option) }>
          <Button type="primary" icon="plus-circle">添加数据</Button>
        </div>
        <Table size="middle"
          dataSource={ root.items.type === 'object' ? value : formatTableValue(value) }
          columns={ this.columns() }
          bordered={ true }
          rowKey={ (item: Object, index: number): number => index }
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true
          }}
        />
      </Fragment>
    );
  }
}

export default TableComponent;