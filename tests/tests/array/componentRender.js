import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault() {
  const json = {
    id: '$root',
    type: 'array',
    title: '渲染默认组件',
    items: {
      id: '$root/items',
      type: 'object',
      title: '数组内的对象',
      properties: {
        col1: {
          id: '$root/items/properties/col1',
          type: 'string',
          title: 'col1'
        },
        col2: {
          id: '$root/items/properties/col2',
          type: 'number',
          title: 'col2'
        }
      }
    }
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antTable = wrapper.find('.ant-table');
  const table = antTable.find('table');

  expect(antTable).to.have.lengthOf(1);
  expect(table).to.have.lengthOf(1);
}

/* 渲染Select的multiple模式 */
export function renderSelectMultiple() {
  const json = {
    id: '$root',
    type: 'array',
    title: '渲染多选组件',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的对象',
      emum: ['值1', '值2'],
      emumNames: ['选项1', '选项2']
    },
    $componentType: 'multiple'
  };

  const wrapper = mount(<SchemaForm json={ json } />);
  const antSelectSelection = wrapper.find('.ant-select-selection');

  expect(antSelectSelection).to.have.lengthOf(1);
}

/* 渲染Select的tags模式 */
export function renderSelectTags() {
  const json = {
    id: '$root',
    type: 'array',
    title: '渲染多选组件',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的对象',
      emum: ['值1', '值2'],
      emumNames: ['选项1', '选项2']
    },
    $componentType: 'tags'
  };

  const wrapper = mount(<SchemaForm json={ json } />);
  const antSelectSelection = wrapper.find('.ant-select-selection');

  expect(antSelectSelection).to.have.lengthOf(1);
}

/* 渲染多选组件 */
export function renderCheckboxGroup() {
  const json = {
    id: '$root',
    type: 'array',
    title: '渲染多选组件',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的对象',
      emum: ['值1', '值2'],
      emumNames: ['选项1', '选项2']
    },
    $componentType: 'checkbox'

  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antCheckbox = wrapper.find('.ant-checkbox');

  expect(antCheckbox).to.have.lengthOf(2);
}