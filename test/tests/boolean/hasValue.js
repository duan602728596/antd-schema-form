import { expect } from 'chai';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 组件有默认值 */
export function componentHasDefaultValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $defaultValue: true
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antCheckboxInput = wrapper.container.querySelectorAll('.ant-checkbox-input');

  expect(antCheckboxInput[0].checked).to.be.true;
}

/* 组件有值 */
export function componentHastValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有值'
  };
  const value = { $root: true };
  const wrapper = render(<SchemaForm json={ json } value={ value } />);
  const antCheckboxInput = wrapper.container.querySelectorAll('.ant-checkbox-input');

  expect(antCheckboxInput[0].checked).to.be.true;
}

/* 开关有默认值 */
export function switchHasDefaultValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $componentType: 'switch',
    $defaultValue: true
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antSwitch = wrapper.container.querySelectorAll('.ant-switch');

  expect(antSwitch[0].getAttribute('aria-checked')).to.be.equal('true');
}

/* 开关有值 */
export function switchHasValue() {
  const json = {
    id: '$root',
    type: 'boolean',
    title: '组件有默认值',
    $componentType: 'switch'
  };
  const value = { $root: false };
  const wrapper = render(<SchemaForm json={ json } value={ value } />);
  const antSwitch = wrapper.container.querySelectorAll('.ant-switch');

  expect(antSwitch[0].getAttribute('aria-checked')).to.be.equal('false');
}