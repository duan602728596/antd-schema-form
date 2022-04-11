import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件有默认值',
    $defaultValue: 8964
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.container.querySelectorAll('.ant-input-number-input');

  expect(Number(antInputNumberInput[0].value)).to.be.equal(8_964);
}

/* 组件有值 */
export function componentHastValue() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件有值'
  };
  const value = { $root: 344.5976 };
  const wrapper = render(<SchemaForm json={ json } value={ value } />);
  const antInputNumberInput = wrapper.container.querySelectorAll('.ant-input-number-input');

  expect(Number(antInputNumberInput[0].value)).to.be.equal(344.5976);
}

/* 单选框有默认值 */
export function radioHasDefaultValue() {
  const json = {
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
  const wrapper = render(<SchemaForm json={ json } />);
  const antRadioWrapperChecked = wrapper.container.querySelectorAll('.ant-radio-wrapper-checked');
  const antRadioInput = antRadioWrapperChecked[0].querySelectorAll('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(Number(antRadioInput[0].value)).to.be.equal(2);
}

/* 单选框有值 */
export function radioHastValue() {
  const json = {
    id: '$root',
    type: 'string',
    title: '单选框有值',
    $componentType: 'radio',
    $options: [
      { label: '选项1', value: 1 },
      { label: '选项2', value: 2 }
    ]
  };
  const value = { $root: 1 };
  const wrapper = render(<SchemaForm json={ json } value={ value } />);
  const antRadioWrapperChecked = wrapper.container.querySelectorAll('.ant-radio-wrapper-checked');
  const antRadioInput = antRadioWrapperChecked[0].querySelectorAll('.ant-radio-input');

  expect(antRadioWrapperChecked).to.have.lengthOf(1);
  expect(Number(antRadioInput[0].value)).to.be.equal(1);
}

/* 组件的值会覆盖默认值 */
export function theValueOfTheComponentOverridesTheDefaultValue() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件的值会覆盖默认值',
    $defaultValue: 32
  };
  const value = { $root: 64 };
  const wrapper = render(<SchemaForm json={ json } value={ value } />);
  const antInputNumberInput = wrapper.container.querySelectorAll('.ant-input-number-input');

  expect(Number(antInputNumberInput[0].value)).to.be.equal(64);
}