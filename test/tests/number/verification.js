import { expect } from 'chai';
import { render } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';
import { createHandleClickFn, sleep } from '../utils';

/* 组件值没有验证 */
export async function componentNoverification() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值没有验证'
  };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value.$root).to.be.undefined;
}

/* 表单必填 */
export async function componentRequired() {
  const json = {
    id: '$root',
    type: 'number',
    title: '表单必填',
    $required: true,
    $requiredMessage: '表单必填验证信息'
  };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;
}

/* 组件值的枚举 */
export async function componentEnum() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值的枚举',
    enum: [13, 24],
    $enumMessage: '枚举验证信息'
  };
  const value = { $root: 52 };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;
}

/* 组件值是整数 */
export async function componentInteger() {
  const json = {
    id: '$root',
    type: 'integer',
    title: '组件值是整数',
    $integerMessage: '必须是整数'
  };
  const value = { $root: 13.42 };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;
}

/* 组件值是整数 */
export async function componentIntegerTrue() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值是整数',
    $integer: true,
    $integerMessage: '必须是整数'
  };
  const value = { $root: 13.42 };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;
}

/* 组件值的最小值 */
export async function componentMinimum() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值的最小值',
    minimum: 3,
    $minimumMessage: '最小值验证信息'
  };
  const value = { $root: 2 };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;
}

/* 组件值的最大值 */
export async function componentMaximum() {
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值的最大值',
    maximum: 100,
    $maximumMessage: '最大值验证信息'
  };
  const value = { $root: 200 };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;
}