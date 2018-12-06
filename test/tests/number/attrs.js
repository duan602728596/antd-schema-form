import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../../src/SchemaForm';

/* 组件只读 */
export function componentReadOnly(): void{
  const json: Object = {
    id: '$root',
    type: 'number',
    title: '组件只读',
    $readOnly: true
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antInputNumberInput: Object = wrapper.find('.ant-input-number-input');

  expect(antInputNumberInput.getDOMNode().readOnly).to.be.true;
}

/* 组件的placeholder属性 */
export function componentPlaceholder(): void{
  const json: Object = {
    id: '$root',
    type: 'number',
    title: '组件的placeholder属性',
    $placeholder: '组件的placeholder属性'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antInputNumberInput: Object = wrapper.find('.ant-input-number-input');

  expect(antInputNumberInput.getDOMNode().placeholder).to.be.equal('组件的placeholder属性');
}