import React, { Component } from 'react';
import SchemaForm from '../../src/SchemaForm';
import '../../src/style/antd-schema-form.sass';
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

async function handleFileUpload(file: Array<File>): Promise<string>{
  return `${ file[0].lastModified }`;
}

function handleClick(form: Object, value: Object, keys: string): void{
  console.log(value, keys);
}

function Form(props: Object): React.Element{
  return <SchemaForm json={ json } value={ value } onOk={ handleClick } onUpload={ handleFileUpload } />;
}

export default Form;