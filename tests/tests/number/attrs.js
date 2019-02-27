import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import SchemaForm from '../../SchemaForm';

/* 组件只读 */
export function componentReadOnly() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件只读',
    $readOnly: true
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.find('.ant-input-number-input');

  expect(antInputNumberInput.getDOMNode().readOnly).to.be.true;
}

/* 组件的placeholder属性 */
export function componentPlaceholder() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件的placeholder属性',
    $placeholder: '组件的placeholder属性'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.find('.ant-input-number-input');

  expect(antInputNumberInput.getDOMNode().placeholder).to.be.equal('组件的placeholder属性');
}