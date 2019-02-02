import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import SchemaForm from '../SchemaForm';
import stringJson from '../json/string.json';
import numberJson from '../json/number.json';
import booleanJson from '../json/boolean.json';
import arrayJson from '../json/array.json';

const json: Object = {
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

const value: Object = {
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
async function handleFileUpload(file: Array<File>): Promise<string>{
  return `${ file[0].lastModified }`;
}

// 点击事件
function handleClick(form: Object, value: Object, keys: string): void{
  console.log(value, keys);
}

// 自定义组件
const customComponent: Object = {
  custom(item: Object, option: Object, form: Object, required: boolean): React.Element{
    const { getFieldDecorator }: { getFieldDecorator: Function } = form;

    return getFieldDecorator(item.id, option)(
      <Input placeholder="自定义组件" required={ required } addonAfter={ <Icon type="setting" /> } />
    );
  }
};

function Form(props: Object): React.Element{
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