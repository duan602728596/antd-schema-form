import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
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
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' },
      { label: '选项3', value: '值3' },
      { label: '选项4', value: '值4' },
      { label: '选项5', value: '值5' },
      { label: '选项6', value: '值6' }
    ]
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