import { expect } from 'chai';
import { render } from '@testing-library/react';
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
  const wrapper = render(<SchemaForm json={ json } />);
  const antTable = wrapper.container.querySelectorAll('.ant-table');
  const table = antTable[0].querySelectorAll('table');

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
      title: '数组内的对象'
    },
    $componentType: 'multiple',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };

  const wrapper = render(<SchemaForm json={ json } />);
  const antSelectSelection = wrapper.container.querySelectorAll('.ant-select-selector');

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
      title: '数组内的对象'
    },
    $componentType: 'tags',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };

  const wrapper = render(<SchemaForm json={ json } />);
  const antSelectSelection = wrapper.container.querySelectorAll('.ant-select');

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
      title: '数组内的对象'
    },
    $componentType: 'checkboxGroup',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antCheckbox = wrapper.container.querySelectorAll('.ant-checkbox');

  expect(antCheckbox).to.have.lengthOf(2);
}