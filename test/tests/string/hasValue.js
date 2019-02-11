// @flow
import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import moment from 'moment';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件有默认值',
    $defaultValue: '这是默认值'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antInput: Object = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().value).to.be.equal('这是默认值');
}

/* 组件有值 */
export function componentHastValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件有值'
  };
  const value: Object = { $root: '这是值' };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antInput: Object = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().value).to.be.equal('这是值');
}

/* 下拉框有默认值 */
export function selectHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '下拉框有默认值',
    $componentType: 'select',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ],
    $defaultValue: '值2'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antSelectSelectionSelectedValue: Object = wrapper.find('.ant-select-selection-selected-value');

  expect(antSelectSelectionSelectedValue.text()).to.be.equal('选项2');
}

/* 下拉框有值 */
export function selectHasValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '下拉框有值',
    $componentType: 'select',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const value: Object = { $root: '值1' };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antSelectSelectionSelectedValue: Object = wrapper.find('.ant-select-selection-selected-value');

  expect(antSelectSelectionSelectedValue.text()).to.be.equal('选项1');
}

/* 单选框有默认值 */
export function radioHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '单选框有默认值',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ],
    $defaultValue: '值2'
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antRadioWrapperChecked: Object = wrapper.find('.ant-radio-wrapper-checked');
  const antRadioInput: Object = antRadioWrapperChecked.find('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(antRadioInput.getDOMNode().value).to.be.equal('值2');
}

/* 单选框有值 */
export function radioHastValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '单选框有值',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const value: Object = { $root: '值1' };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antRadioWrapperChecked: Object = wrapper.find('.ant-radio-wrapper-checked');
  const antRadioInput: Object = antRadioWrapperChecked.find('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(antRadioInput.getDOMNode().value).to.be.equal('值1');
}

/* 日期选择有默认值 */
export function dateHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '日期选择有默认值',
    $componentType: 'date',
    $defaultValue: moment('2018-12-01 22:43:17')
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antCalendarPickerInput: Object = wrapper.find('.ant-calendar-picker-input');

  expect(antCalendarPickerInput.getDOMNode().value).to.be.equal('2018-12-01 22:43:17');
}

/* 日期选择有值 */
export function dateHasValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '日期选择有值',
    $componentType: 'date'
  };
  const value: Object = { $root: moment('2000-01-08 16:12:00') };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antCalendarPickerInput: Object = wrapper.find('.ant-calendar-picker-input');

  expect(antCalendarPickerInput.getDOMNode().value).to.be.equal('2000-01-08 16:12:00');
}

/* 组件的值会覆盖默认值 */
export function theValueOfTheComponentOverridesTheDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件的值会覆盖默认值',
    $defaultValue: '这是默认值'
  };
  const value: Object = { $root: '这是值' };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antInput: Object = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().value).to.be.equal('这是值');
}