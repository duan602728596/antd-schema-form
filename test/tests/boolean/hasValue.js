import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $defaultValue: true
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antCheckboxInput: Object = wrapper.find('.ant-checkbox-input');

  expect(antCheckboxInput.getDOMNode().checked).to.be.true;
}

/* 组件有值 */
export function componentHastValue(): void{
  const json: Object = {
    id: '$root',
    type: 'boolean',
    title: '组件有值'
  };
  const value: Object = { $root: true };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antCheckboxInput: Object = wrapper.find('.ant-checkbox-input');

  expect(antCheckboxInput.getDOMNode().checked).to.be.true;
}

/* 开关有默认值 */
export function switchHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $componentType: 'switch',
    $defaultValue: true
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antSwitch: Object = wrapper.find('.ant-switch');

  expect(antSwitch.getDOMNode().getAttribute('aria-checked')).to.be.equal('true');
}

/* 开关有值 */
export function switchHasValue(): void{
  const json: Object = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $componentType: 'switch'
  };
  const value: Object = { $root: false };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antSwitch: Object = wrapper.find('.ant-switch');

  expect(antSwitch.getDOMNode().getAttribute('aria-checked')).to.be.equal('false');
}