import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import moment from 'moment';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '组件有默认值',
    $defaultValue: '这是默认值'
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antInput = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().value).to.be.equal('这是默认值');
}

/* 组件有值 */
export function componentHastValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '组件有值'
  };
  const value = { $root: '这是值' };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antInput = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().value).to.be.equal('这是值');
}

/* 下拉框有默认值 */
export function selectHasDefaultValue(){
  const json = {
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
  const wrapper = mount(<SchemaForm json={ json } />);
  const antSelectSelectionSelectedValue = wrapper.find('.ant-select-selection-selected-value');

  expect(antSelectSelectionSelectedValue.text()).to.be.equal('选项2');
}

/* 下拉框有值 */
export function selectHasValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '下拉框有值',
    $componentType: 'select',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const value = { $root: '值1' };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antSelectSelectionSelectedValue = wrapper.find('.ant-select-selection-selected-value');

  expect(antSelectSelectionSelectedValue.text()).to.be.equal('选项1');
}

/* 单选框有默认值 */
export function radioHasDefaultValue(){
  const json = {
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
  const wrapper = mount(<SchemaForm json={ json } />);
  const antRadioWrapperChecked = wrapper.find('.ant-radio-wrapper-checked');
  const antRadioInput = antRadioWrapperChecked.find('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(antRadioInput.getDOMNode().value).to.be.equal('值2');
}

/* 单选框有值 */
export function radioHastValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '单选框有值',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: '值1' },
      { label: '选项2', value: '值2' }
    ]
  };
  const value = { $root: '值1' };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antRadioWrapperChecked = wrapper.find('.ant-radio-wrapper-checked');
  const antRadioInput = antRadioWrapperChecked.find('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(antRadioInput.getDOMNode().value).to.be.equal('值1');
}

/* 日期选择有默认值 */
export function dateHasDefaultValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '日期选择有默认值',
    $componentType: 'date',
    $defaultValue: moment('2018-12-01 22:43:17')
  };
  const wrapper = mount(<SchemaForm json={ json } />);
  const antCalendarPickerInput = wrapper.find('.ant-calendar-picker-input');

  expect(antCalendarPickerInput.getDOMNode().value).to.be.equal('2018-12-01 22:43:17');
}

/* 日期选择有值 */
export function dateHasValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '日期选择有值',
    $componentType: 'date'
  };
  const value = { $root: moment('2000-01-08 16:12:00') };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antCalendarPickerInput = wrapper.find('.ant-calendar-picker-input');

  expect(antCalendarPickerInput.getDOMNode().value).to.be.equal('2000-01-08 16:12:00');
}

/* 组件的值会覆盖默认值 */
export function theValueOfTheComponentOverridesTheDefaultValue(){
  const json = {
    id: '$root',
    type: 'string',
    title: '组件的值会覆盖默认值',
    $defaultValue: '这是默认值'
  };
  const value = { $root: '这是值' };
  const wrapper = mount(<SchemaForm json={ json } value={ value } />);
  const antInput = wrapper.find('.ant-input');

  expect(antInput.getDOMNode().value).to.be.equal('这是值');
}