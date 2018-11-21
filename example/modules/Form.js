import React, { Component } from 'react';
import SchemaForm from '../../src/index';
import '../../src/style/antd-schema-form.sass';
import stringJson from '../json/string.json';
import numberJson from '../json/number.json';

const json: Object = {
  $id: '$root',
  type: 'object',
  title: 'schema form',
  description: '这是一个通过json schema渲染的表单。',
  properties: {
    string: stringJson,
    number: numberJson
  }
};

async function handleFileUpload(file: Array<File>): Promise<string>{
  return `${ file[0].lastModified }`;
}

function Form(props: Object): React.Element{
  return <SchemaForm json={ json } onUpload={ handleFileUpload } />;
}

export default Form;