import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Select } from 'antd';
import SchemaForm from '../../../components/SchemaForm/SchemaForm';
import json from './json/json';
import style from './style.sass';

class AddDrawer extends Component{
  static propTypes: Object = {
    item: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  };

  state: Object = {
    typeValue: null // 选择数据类型
  };

  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.visible === false){
      return { typeValue: null };
    }

    return null;
  }
  // select change事件
  handleTypeSelect: Function = (value: string, option: Object): void=>{
    this.setState({ typeValue: value });
  };
  render(): React.Element{
    const { visible, onOk, onCancel, item }: {
      visible: boolean,
      onOk: Function,
      onCancel: Function,
      item: ?Object
    } = this.props;
    const { typeValue }: { typeValue: ?string } = this.state;

    const value: Object = {
      $root: { type: typeValue }
    };

    if(item && item.type === 'array'){
      value.$root.id = 'items';
    }

    if(typeValue !== null){
      json[typeValue].properties.id.$readOnly = item && item.type === 'array';
    }

    return (
      <Drawer visible={ visible } width={ 700 } destroyOnClose={ true } onClose={ onCancel }>
        <div className={ style.tools }>
          <label>选择变量类型：</label>
          <Select className={ style.typeSelect } value={ typeValue } onSelect={ this.handleTypeSelect }>
            <Select.Option key="string" value="string">字符串（string）</Select.Option>
            <Select.Option key="number" value="number">数字（number）</Select.Option>
            <Select.Option key="boolean" value="boolean">布尔（boolean）</Select.Option>
            <Select.Option key="array" value="array">数组（array）</Select.Option>
            <Select.Option key="object" value="object">对象（object）</Select.Option>
          </Select>
        </div>
        {
          typeValue ? (
            <SchemaForm json={ json[typeValue] }
              value={ value }
              onOk={ onOk }
              onCancel={ onCancel }
            />
          ) : null }
      </Drawer>
    );
  }
}

export default AddDrawer;