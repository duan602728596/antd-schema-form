import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';
import { createHandleClickFn } from '../utils';

/* 组件值没有验证 */
export function componentNoverification() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值没有验证'
  };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(0);
  expect(result.value.$root).to.be.undefined;
}

/* 表单必填 */
export function componentRequired() {
  const json = {
    id: '$root',
    type: 'string',
    title: '表单必填',
    $required: true,
    $requiredMessage: '表单必填验证信息'
  };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(wrapper.find('.ant-form-explain').text()).to.be.equal('表单必填验证信息');
  expect(result.value).to.be.null;

  wrapper.find('.ant-input').simulate('change', { target: { value: 'hahaha' } });
  wrapper.find('button').simulate('click');
  expect(result.value).to.be.eql({ $root: 'hahaha' });
}

/* 组件值的枚举 */
export function componentEnum() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的枚举',
    enum: ['枚举1', '枚举2'],
    $enumMessage: '枚举验证信息'
  };
  const value = { $root: '枚举3' };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(wrapper.find('.ant-form-explain').text()).to.be.equal('枚举验证信息');
  expect(result.value).to.be.null;

  wrapper.find('.ant-input').simulate('change', { target: { value: '枚举1' } });
  wrapper.find('button').simulate('click');
  expect(result.value).to.be.eql({ $root: '枚举1' });
}

/* 组件值的最小长度 */
export function componentMinLength() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的最小值',
    minLength: 10,
    $minLengthMessage: '最小长度验证信息'
  };
  const value = { $root: '组件的最大值' };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(wrapper.find('.ant-form-explain').text()).to.be.equal('最小长度验证信息');
  expect(result.value).to.be.null;

  wrapper.find('.ant-input').simulate('change', { target: { value: 'abcdefghijklmn' } });
  wrapper.find('button').simulate('click');
  expect(result.value).to.be.eql({ $root: 'abcdefghijklmn' });
}

/* 组件值的最大长度 */
export function componentMaxLength() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的最大值',
    maxLength: 3,
    $maxLengthMessage: '最大长度验证信息'
  };
  const value = { $root: '组件的最大值' };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(wrapper.find('.ant-form-explain').text()).to.be.equal('最大长度验证信息');
  expect(result.value).to.be.null;

  wrapper.find('.ant-input').simulate('change', { target: { value: 'a' } });
  wrapper.find('button').simulate('click');
  expect(result.value).to.be.eql({ $root: 'a' });
}

/* 组件值的固定长度 */
export function componentLength() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的固定长度',
    $length: 5,
    $lengthMessage: '固定长度验证信息'
  };
  const value = { $root: '组件的固定长度' };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(wrapper.find('.ant-form-explain').text()).to.be.equal('固定长度验证信息');
  expect(result.value).to.be.null;

  wrapper.find('.ant-input').simulate('change', { target: { value: 'abcde' } });
  wrapper.find('button').simulate('click');
  expect(result.value).to.be.eql({ $root: 'abcde' });
}

/* 组件的正则表达式验证 */
export function componentPattern() {
  const json = {
    id: '$root',
    type: 'string',
    title: '组件值的正则验证',
    pattern: /^[a-z]+$/,
    $patternMessage: '组件值的正则验证信息'
  };
  const value = { $root: '组件值的正则验证' };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ createHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(wrapper.find('.ant-form-explain').text()).to.be.equal('组件值的正则验证信息');
  expect(result.value).to.be.null;

  wrapper.find('.ant-input').simulate('change', { target: { value: 'abcde' } });
  wrapper.find('button').simulate('click');
  expect(result.value).to.be.eql({ $root: 'abcde' });
}