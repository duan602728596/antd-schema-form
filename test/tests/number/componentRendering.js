import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault() {
  const json = {
    id: '$root',
    type: 'number',
    title: '渲染默认组件'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.container.querySelectorAll('.ant-input-number-input');

  expect(antInputNumberInput).to.have.lengthOf(1);
  expect(antInputNumberInput[0].tagName.toLowerCase()).to.be.equal('input');
}

/* 渲染单选组件 */
export function renderRadio() {
  const json = {
    id: '$root',
    type: 'number',
    title: '渲染单选组件',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const input = wrapper.container.querySelectorAll('input');

  expect(input).to.have.lengthOf(2);
}