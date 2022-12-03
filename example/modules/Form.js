import { useRef } from 'react';
import { Input } from 'antd';
import { SettingFilled as IconSettingFilled } from '@ant-design/icons';
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
  custom({ item, form, required }) {
    return <Input placeholder="自定义组件" required={ required } addonAfter={ <IconSettingFilled /> } />;
  }
};

// 自定义表格渲染
const customTableRender = {
  red({ value: text, record, index, foor, form }) {
    return <span style={{ color: '#f00' }}>{ text }</span>;
  },
  green({ value: text, record, index, foor, form }) {
    return <span style={{ color: '#0f0' }}>{ text }</span>;
  }
};

function Form(props) {
  const formRef = useRef();

  // 提交
  function handleOkSubmit(form, val, keys) {
    console.log(val, keys);
    console.log(formRef);
  }

  // cancel
  function handleCancelClick() { /* ===== */ }

  return (
    <SchemaForm ref={ formRef }
      json={ json }
      value={ value }
      customComponent={ customComponent }
      customTableRender={ customTableRender }
      okText="提交"
      onOk={ handleOkSubmit }
      onCancel={ handleCancelClick }
    />
  );
}

export default Form;