import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '渲染默认组件'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antCheckbox = wrapper.container.querySelectorAll('.ant-checkbox');

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
  const wrapper = render(<SchemaForm json={ json } />);
  const antSwitch = wrapper.container.querySelectorAll('.ant-switch');

  expect(antSwitch).to.have.lengthOf(1);
}