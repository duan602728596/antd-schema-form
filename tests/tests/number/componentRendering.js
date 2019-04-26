import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault() {
  const json = {
    id: '$root',
    type: 'number',
    title: '渲染默认组件'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.find('.ant-input-number-input');

  expect(antInputNumberInput).to.have.lengthOf(1);
  expect(antInputNumberInput.name()).to.be.equal('input');
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
  const wrapper = mount(<SchemaForm json={ json } />);
  const input = wrapper.find('input');

  expect(input).to.have.lengthOf(2);
}