import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '渲染默认组件'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antCheckbox = wrapper.find('.ant-checkbox');

  expect(antCheckbox).to.have.lengthOf(1);
}

/* 渲染开关组件 */
export function renderSwitch() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '渲染开关组件',
    $componentType: 'switch'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antSwitch = wrapper.find('.ant-switch');

  expect(antSwitch).to.have.lengthOf(1);
}