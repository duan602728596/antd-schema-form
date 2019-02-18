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

// 文件上传
function handleFileUpload(file) {
  return `${ file[0].lastModified }`;
}

// 点击事件
function handleClick(form, value, keys) {
  console.log(value, keys);
}

// 自定义组件
const customComponent = {
  custom(item, option, form, required) {
    const { getFieldDecorator } = form;

    return getFieldDecorator(item.id, option)(
      <Input placeholder="自定义组件" required={ required } addonAfter={ <Icon type="setting" /> } />
    );
  }
};

function Form(props) {
  return (
    <SchemaForm json={ json }
      value={ value }
      customComponent={ customComponent }
      onOk={ handleClick }
      okText="提交"
      onUpload={ handleFileUpload }
    />
  );
}

export default Form;