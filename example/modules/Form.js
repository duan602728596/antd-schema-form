import React, { Component } from 'react';
import SchemaForm from '../../src/index';
import '../../src/style/antd-schema-form.sass';
import stringJson from '../json/string.json';

const json: Object = {
  $id: '$root',
  type: 'object',
  title: 'schema form',
  description: '这是一个通过json schema渲染的表单。',
  properties: {
    string: stringJson
  }
};

function Form(props: Object): React.Element{
  return <SchemaForm json={ json } />;
}

export default Form;