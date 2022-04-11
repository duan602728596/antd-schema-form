import { expect } from 'chai';
import React from 'react';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';

/* 组件只读 */
export function componentReadOnly() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件只读',
    $readOnly: true
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.container.querySelectorAll('.ant-input-number-input');

  expect(antInputNumberInput[0].readOnly).to.be.true;
}

/* 组件的placeholder属性 */
export function componentPlaceholder() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件的placeholder属性',
    $placeholder: '组件的placeholder属性'
  };
  const wrapper = render(<SchemaForm json={ json } />);
  const antInputNumberInput = wrapper.container.querySelectorAll('.ant-input-number-input');

  expect(antInputNumberInput[0].placeholder).to.be.equal('组件的placeholder属性');
}