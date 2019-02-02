import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'number',
    title: '组件有默认值',
    $defaultValue: 8964
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antInputNumberInput: Object = wrapper.find('.ant-input-number-input');

  expect(Number(antInputNumberInput.getDOMNode().value)).to.be.equal(8964);
}

/* 组件有值 */
export function componentHastValue(): void{
  const json: Object = {
    id: '$root',
    type: 'number',
    title: '组件有值'
  };
  const value: Object = { $root: 344.5976 };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antInputNumberInput: Object = wrapper.find('.ant-input-number-input');

  expect(Number(antInputNumberInput.getDOMNode().value)).to.be.equal(344.5976);
}

/* 单选框有默认值 */
export function radioHasDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'number',
    title: '单选框有默认值',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ],
    $defaultValue: 2
  };
  const wrapper: Object = mount(<SchemaForm json={ json } />);
  const antRadioWrapperChecked: Object = wrapper.find('.ant-radio-wrapper-checked');
  const antRadioInput: Object = antRadioWrapperChecked.find('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(Number(antRadioInput.getDOMNode().value)).to.be.equal(2);
}

/* 单选框有值 */
export function radioHastValue(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '单选框有值',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  };
  const value: Object = { $root: 1 };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antRadioWrapperChecked: Object = wrapper.find('.ant-radio-wrapper-checked');
  const antRadioInput: Object = antRadioWrapperChecked.find('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(Number(antRadioInput.getDOMNode().value)).to.be.equal(1);
}

/* 组件的值会覆盖默认值 */
export function theValueOfTheComponentOverridesTheDefaultValue(): void{
  const json: Object = {
    id: '$root',
    type: 'number',
    title: '组件的值会覆盖默认值',
    $defaultValue: 32
  };
  const value: Object = { $root: 64 };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } />);
  const antInputNumberInput: Object = wrapper.find('.ant-input-number-input');

  expect(Number(antInputNumberInput.getDOMNode().value)).to.be.equal(64);
}