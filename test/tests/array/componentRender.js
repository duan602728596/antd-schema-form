import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../../src/SchemaForm';

/* 渲染默认组件 */
export function renderDefault(): void{
  const json: Object = {
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
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antTable: Object = wrapper.find('.ant-table');
  const table: Object = antTable.find('table');

  expect(antTable).to.have.lengthOf(1);
  expect(table).to.have.lengthOf(1);
}

/* 渲染Select的multiple模式 */
export function renderSelectMultiple(): void{
  const json: Object = {
    id: '$root',
    type: 'array',
    title: '渲染多选组件',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的对象'
    },
    $componentType: 'multiple',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };

  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antSelectSelection: Object = wrapper.find('.ant-select-selection');

  expect(antSelectSelection).to.have.lengthOf(1);
}

/* 渲染Select的tags模式 */
export function renderSelectTags(): void{
  const json: Object = {
    id: '$root',
    type: 'array',
    title: '渲染多选组件',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的对象'
    },
    $componentType: 'tags',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };

  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antSelectSelection: Object = wrapper.find('.ant-select-selection');

  expect(antSelectSelection).to.have.lengthOf(1);
}

/* 渲染多选组件 */
export function renderCheckboxGroup(): void{
  const json: Object = {
    id: '$root',
    type: 'array',
    title: '渲染多选组件',
    items: {
      id: '$root/items',
      type: 'string',
      title: '数组内的对象'
    },
    $componentType: 'checkbox',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antCheckbox: Object = wrapper.find('.ant-checkbox');

  expect(antCheckbox).to.have.lengthOf(2);
}