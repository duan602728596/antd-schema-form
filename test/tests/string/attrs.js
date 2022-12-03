import { expect } from 'chai';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 组件只读 */
export function componentReadOnly() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件只读',
    $readOnly: true
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInput = wrapper.container.querySelectorAll('.ant-input');

  expect(antInput[0].readOnly).to.be.true;
}

/* 组件的placeholder属性 */
export function componentPlaceholder() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件的placeholder属性',
    $placeholder: '组件的placeholder属性'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInput = wrapper.container.querySelectorAll('.ant-input');

  expect(antInput[0].placeholder).to.be.equal('组件的placeholder属性');
}

/* select组件的placeholder属性 */
export function selectComponentPlaceholder() {
  const json = {
    id: '$root',
    type: 'string',
    title: 'select组件的placeholder属性',
    $componentType: 'select',
    $placeholder: 'select组件的placeholder属性'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antSelectSelectionPlaceholder = wrapper.container.querySelectorAll('.ant-select-selection-placeholder');

  expect(antSelectSelectionPlaceholder[0].innerText).to.be.equal('select组件的placeholder属性');
}

/* password组件的type属性 */
export function passwordComponentType() {
  const json = {
    id: '$root',
    type: 'string',
    title: 'password组件的type属性',
    $componentType: 'password'
  };

  const wrapper = render(<SchemaForm json={ json } />);
  const antInput = wrapper.container.querySelectorAll('.ant-input');

  expect(antInput[0].type).to.be.equal('password');
}