import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';
import { createHandleClickFn } from '../utils';

/* 数组元素的数量 */
export function tableComponentMinItems() {
  const json = {
    id: '$root',
    type: 'array',
    title: '数组元素最小数量验证',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组元素最小数量验证'
    },
    minItems: 4,
    emum: ['值1', '值2', '值3', '值4', '值5', '值6'],
    emumNames: ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6']
  };
  const value = {
    $root: ['值1', '值2']
  };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);
  const button = wrapper.find('button');

  button.at(button.length - 1).simulate('click');
  expect(result.value).to.be.null;
}

/* 数组元素的数量 */
export function tableComponentMaxItems() {
  const json = {
    id: '$root',
    type: 'array',
    title: '数组元素最小数量验证',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组元素最小数量验证'
    },
    maxItems: 1,
    $options: [
      { label: '选项1', value: '值1' }
    ]
  };
  const value = {
    $root: ['值1', '值2', '值3']
  };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);
  const button = wrapper.find('button');

  button.at(button.length - 1).simulate('click');
  expect(result.value).to.be.null;
}