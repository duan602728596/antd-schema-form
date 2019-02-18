import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $defaultValue: true
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antCheckboxInput = wrapper.find('.ant-checkbox-input');

  expect(antCheckboxInput.getDOMNode().checked).to.be.true;
}

/* 组件有值 */
export function componentHastValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有值'
  };
  const value = { $root: true };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antCheckboxInput = wrapper.find('.ant-checkbox-input');

  expect(antCheckboxInput.getDOMNode().checked).to.be.true;
}

/* 开关有默认值 */
export function switchHasDefaultValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $componentType: 'switch',
    $defaultValue: true
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antSwitch = wrapper.find('.ant-switch');

  expect(antSwitch.getDOMNode().getAttribute('aria-checked')).to.be.equal('true');
}

/* 开关有值 */
export function switchHasValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $componentType: 'switch'
  };
  const value = { $root: false };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antSwitch = wrapper.find('.ant-switch');

  expect(antSwitch.getDOMNode().getAttribute('aria-checked')).to.be.equal('false');
}