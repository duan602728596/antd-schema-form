import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../../src/SchemaForm';

/* 渲染默认组件 */
export function renderDefault(): void{
  const json: Object = {
    id: '$root',
    type: 'boolean',
    title: '渲染默认组件'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antCheckbox: Object = wrapper.find('.ant-checkbox');

  expect(antCheckbox).to.have.lengthOf(1);
}

/* 渲染开关组件 */
export function renderSwitch(): void{
  const json: Object = {
    id: '$root',
    type: 'boolean',
    title: '渲染开关组件',
    $componentType: 'switch'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antSwitch: Object = wrapper.find('.ant-switch');

  expect(antSwitch).to.have.lengthOf(1);
}