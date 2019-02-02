import { expect } from 'chai';
import { mount } from 'enzyme';
import React from 'react';
import SchemaForm from '../../SchemaForm';

function CreateHandleClickFn(result: Object): void{
  return function(form: Object, value: Object): void{
    result.value = value;
  };
}

/* 组件值没有验证 */
export function componentNoverification(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件值没有验证'
  };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } onOk={ CreateHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(0);
  expect(result.value.$root).to.be.undefined;
}

/* 表单必填 */
export function componentRequired(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '表单必填',
    $required: true,
    $requiredMessage: '表单必填验证信息'
  };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain: Object = wrapper.find('.ant-form-explain');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('表单必填验证信息');
  expect(result.value).to.be.null;
}

/* 组件值的枚举 */
export function componentEnum(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件值的枚举',
    enum: ['枚举1', '枚举2'],
    $enumMessage: '枚举验证信息'
  };
  const value: Object = { $root: '枚举3' };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain: Object = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('枚举验证信息');
  expect(result.value).to.be.null;
}

/* 组件值的最小长度 */
export function componentMinLength(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件值的最小值',
    minLength: 10,
    $minLengthMessage: '最小长度验证信息'
  };
  const value: Object = { $root: '组件的最大值' };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain: Object = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('最小长度验证信息');
  expect(result.value).to.be.null;
}

/* 组件值的最大长度 */
export function componentMaxLength(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件值的最大值',
    maxLength: 3,
    $maxLengthMessage: '最大长度验证信息'
  };
  const value: Object = { $root: '组件的最大值' };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain: Object = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('最大长度验证信息');
  expect(result.value).to.be.null;
}

/* 组件值的固定长度 */
export function componentLength(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件值的固定长度',
    $length: 5,
    $lengthMessage: '固定长度验证信息'
  };
  const value: Object = { $root: '组件的固定长度' };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain: Object = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('固定长度验证信息');
  expect(result.value).to.be.null;
}

/* 组件的正则表达式验证 */
export function componentPattern(): void{
  const json: Object = {
    id: '$root',
    type: 'string',
    title: '组件值的正则验证',
    pattern: /^[a-z]+$/,
    $patternMessage: '组件值的正则验证信息'
  };
  const value: Object = { $root: '组件值的正则验证' };
  const result: Object = { value: null };
  const wrapper: Object = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain: Object = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('组件值的正则验证信息');
  expect(result.value).to.be.null;
}