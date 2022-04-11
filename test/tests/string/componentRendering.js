import { expect } from 'chai';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault() {
  const json = {
    id: '$root',
    type: 'string',
    title: '渲染默认组件'
  };

  const wrapper = render(<SchemaForm json={ json } />);
  const antInput = wrapper.container.querySelectorAll('.ant-input');

  expect(antInput).to.have.lengthOf(1);
  expect(antInput[0].tagName.toLowerCase()).to.be.equal('input');
}

/* 渲染文本域 */
export function renderTextArea() {
  const json = {
    id: '$root',
    type: 'string',
    title: '渲染文本域',
    $componentType: 'textArea'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInput = wrapper.container.querySelectorAll('.ant-input');

  expect(antInput).to.have.lengthOf(1);
  expect(antInput[0].tagName.toLowerCase()).to.be.equal('textarea');
}

/* 渲染下拉框 */
export function renderSelect() {
  const json = {
    id: '$root',
    type: 'string',
    title: '渲染下拉框',
    $componentType: 'select',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antSelect = wrapper.container.querySelectorAll('.ant-select');

  expect(antSelect).to.have.lengthOf(1);
}

/* 渲染单选组件 */
export function renderRadio() {
  const json = {
    id: '$root',
    type: 'string',
    title: '渲染单选组件',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const input = wrapper.container.querySelectorAll('input');

  expect(input).to.have.lengthOf(2);
}

/* 渲染日期组件 */
export function renderDate() {
  const json = {
    id: '$root',
    type: 'string',
    title: '渲染日期组件',
    $componentType: 'date'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antCalendarPicker = wrapper.container.querySelectorAll('.ant-picker');

  expect(antCalendarPicker).to.have.lengthOf(1);
}