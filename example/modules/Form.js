import * as React from 'react';
import { Input, Icon } from 'antd';
import SchemaForm from '../SchemaForm';
import stringJson from '../json/string.json';
import numberJson from '../json/number.json';
import booleanJson from '../json/boolean.json';
import arrayJson from '../json/array.json';

const json = {
  id: '$root',
  type: 'object',
  title: 'schema form',
  description: '这是一个通过json schema渲染的表单。',
  properties: {
    string: stringJson,
    number: numberJson,
    boolean: booleanJson,
    array: arrayJson
  }
};

const value = {
  $root: {
    string: {
      default: 'abcdefg'
    },
    number: {
      default: 12345
    }
  }
};

// 自定义组件
const customComponent = {
  custom(item, option, form, required) {
    const { getFieldDecorator } = form;

    return getFieldDecorator(item.id, option)(
      <Input placeholder="自定义组件" required={ required } addonAfter={ <Icon type="setting" /> } />
    );
  }
};

// 自定义表格渲染
const customTableRender = {
  red(text, record, index, item, form) {
    return <span style={{ color: '#f00' }}>{ text }</span>;
  },
  green(text, record, index, item, form) {
    return <span style={{ color: '#0f0' }}>{ text }</span>;
  }
};

function Form(props) {
  return (
    <SchemaForm json={ json }
      value={ value }
      customComponent={ customComponent }
      customTableRender={ customTableRender }
      onOk={ (form, value, keys) => console.log(value, keys) }
      okText="提交"
    />
  );
}

export default Form;