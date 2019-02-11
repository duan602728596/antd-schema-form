// @flow
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import SchemaForm from '../../SchemaForm';

/* 渲染默认组件 */
export function renderDefault(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '渲染默认组件'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antInput: Object = wrapper.find('.ant-input');

  expect(antInput).to.have.lengthOf(1);
  expect(antInput.name()).to.be.equal('input');
}

/* 渲染文本域 */
export function renderTextArea(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '渲染文本域',
    $componentType: 'textArea'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antInput: Object = wrapper.find('.ant-input');

  expect(antInput).to.have.lengthOf(1);
  expect(antInput.name()).to.be.equal('textarea');
}

/* 渲染下拉框 */
export function renderSelect(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '渲染下拉框',
    $componentType: 'select',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antSelect: Object = wrapper.find('.ant-select');

  expect(antSelect).to.have.lengthOf(1);
}

/* 渲染单选组件 */
export function renderRadio(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '渲染单选组件',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const input: Object = wrapper.find('input');

  expect(input).to.have.lengthOf(2);
}

/* 渲染日期组件 */
export function renderDate(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '渲染日期组件',
    $componentType: 'date'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antCalendarPicker: Object = wrapper.find('.ant-calendar-picker');

  expect(antCalendarPicker).to.have.lengthOf(1);
}