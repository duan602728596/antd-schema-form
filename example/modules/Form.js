import React, { useRef } from 'react';
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
    },
    array: {
      default: [
        {
          col1: '数据1',
          col2: 1,
          col3: true
        },
        {
          col1: '数据2',
          col2: 2,
          col3: false
        }
      ]
    }
  }
};

// 自定义组件
const customComponent = {
  custom(item, form, required) {
    return <Input placeholder="自定义组件" required={ required } addonAfter={ <Icon type="setting" /> } />;
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
  const formRef = useRef();

  // 提交
  function handleOkSubmit(form, value, keys) {
    console.log(value, keys);
    console.log(formRef);
  }

  return (
    <SchemaForm ref={ formRef }
      json={ json }
      value={ value }
      customComponent={ customComponent }
      customTableRender={ customTableRender }
      okText="提交"
      onOk={ handleOkSubmit }
    />
  );
}

export default Form;