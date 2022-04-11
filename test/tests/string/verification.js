import { expect } from 'chai';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SchemaForm from '../../SchemaForm';
import { createHandleClickFn, sleep } from '../utils';

/* 组件值没有验证 */
export async function componentNoverification() {
  const json = {
    id: '$root',
    type: 'string',
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
    type: 'string',
    title: '表单必填',
    $required: true,
    $requiredMessage: '表单必填验证信息'
  };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;

  fireEvent.change(
    wrapper.container.querySelectorAll('.ant-input')[0],
    { target: { value: 'hahaha' } }
  );
  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.eql({ $root: 'hahaha' });
}

/* 组件值的枚举 */
export async function componentEnum() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的枚举',
    enum: ['枚举1', '枚举2'],
    $enumMessage: '枚举验证信息'
  };
  const value = { $root: '枚举3' };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;

  fireEvent.change(
    wrapper.container.querySelectorAll('.ant-input')[0],
    { target: { value: '枚举1' } }
  );
  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.eql({ $root: '枚举1' });
}

/* 组件值的最小长度 */
export async function componentMinLength() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的最小值',
    minLength: 10,
    $minLengthMessage: '最小长度验证信息'
  };
  const value = { $root: '组件的最大值' };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;

  fireEvent.change(
    wrapper.container.querySelectorAll('.ant-input')[0],
    { target: { value: 'abcdefghijklmn' } }
  );
  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.eql({ $root: 'abcdefghijklmn' });
}

/* 组件值的最大长度 */
export async function componentMaxLength() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的最大值',
    maxLength: 3,
    $maxLengthMessage: '最大长度验证信息'
  };
  const value = { $root: '组件的最大值' };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;

  fireEvent.change(
    wrapper.container.querySelectorAll('.ant-input')[0],
    { target: { value: 'a' } }
  );
  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.eql({ $root: 'a' });
}

/* 组件值的固定长度 */
export async function componentLength() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的固定长度',
    $length: 5,
    $lengthMessage: '固定长度验证信息'
  };
  const value = { $root: '组件的固定长度' };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;

  fireEvent.change(
    wrapper.container.querySelectorAll('.ant-input')[0],
    { target: { value: 'abcde' } }
  );
  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.eql({ $root: 'abcde' });
}

/* 组件的正则表达式验证 */
export async function componentPattern() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的正则验证',
    pattern: /^[a-z]+$/,
    $patternMessage: '组件值的正则验证信息'
  };
  const value = { $root: '组件值的正则验证' };
  const result = { value: null };
  const wrapper = render(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.null;

  fireEvent.change(
    wrapper.container.querySelectorAll('.ant-input')[0],
    { target: { value: 'abcde' } }
  );
  wrapper.container.querySelectorAll('button')[0].click();
  await sleep();
  expect(result.value).to.be.eql({ $root: 'abcde' });
}