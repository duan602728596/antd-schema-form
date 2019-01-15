import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Select } from 'antd';
import SchemaForm from '../../../components/SchemaForm/SchemaForm';
import json from './json/json';
import style from './style.sass';

class EditDrawer extends Component{
  static propTypes: Object = {
    item: PropTypes.object,
    visible: PropTypes.bool,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  };

  formRef: Object = createRef();
  state: Object = {
    typeValue: null, // 选择数据类型
    value: null,     // 表单值
    item: null
  };
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.visible === false){
      return { typeValue: null };
    }

    if(nextProps.item && nextProps.visible === true && nextProps.item !== prevState.item){
      const id: string[] = nextProps.item.id.split('/');

      return {
        typeValue: nextProps.item.type,
        value: {
          $root: {
            ...nextProps.item,
            id: id[id.length - 1]
          }
        },
        item: nextProps.item
      };
    }

    return null;
  }
  // select change事件
  handleTypeSelect: Function = (value: string, option: Object): void=>{
    this.setState({
      typeValue: value
    }, (): void=>{
      this.formRef.current.setFieldsValue({
        '$root/properties/type': value
      });
    });
  };
  render(): React.Element{
    const { visible, onOk, onCancel }: {
      visible: boolean,
      onOk: Function,
      onCancel: Function,
      item: ?Object
    } = this.props;
    const { typeValue, value }: {
      typeValue: ?string,
      value: Object
    } = this.state;

    if(typeValue !== null){
      json[typeValue].properties.id.$readOnly = true;
    }

    return (
      <Drawer visible={ visible } width={ 700 } destroyOnClose={ true } onClose={ onCancel }>
        <div className={ style.mb10 }>
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
            <SchemaForm ref={ this.formRef }
              json={ json[typeValue] }
              value={ value }
              onOk={ onOk }
              onCancel={ onCancel }
            />
          ) : null }
      </Drawer>
    );
  }
}

export default EditDrawer;