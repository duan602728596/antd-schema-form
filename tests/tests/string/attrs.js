import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

/* 组件只读 */
export function componentReadOnly() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件只读',
    $readOnly: true
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antInput = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().readOnly).to.be.true;
}

/* 组件的placeholder属性 */
export function componentPlaceholder() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件的placeholder属性',
    $placeholder: '组件的placeholder属性'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antInput = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().placeholder).to.be.equal('组件的placeholder属性');
}

/* select组件的placeholder属性 */
export function selectComponentPlaceholder() {
  const json = {
    id: '$root',
    type: 'string',
    title: 'select组件的placeholder属性',
    $componentType: 'select',
    $placeholder: 'select组件的placeholder属性'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antSelectSelectionPlaceholder = wrapper.find('.ant-select-selection__placeholder');

  expect(antSelectSelectionPlaceholder.text()).to.be.equal('select组件的placeholder属性');
}

/* password组件的type属性 */
export function passwordComponentType() {
  const json = {
    id: '$root',
    type: 'string',
    title: 'password组件的type属性',
    $componentType: 'password'
  };

  const wrapper = mount(<SchemaForm json={ json } />);
  const antInput = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().type).to.be.equal('password');
  wrapper.find('.ant-input-suffix').find('i').simulate('click');
  expect(antInput.getDOMNode().type).to.be.equal('text');
}