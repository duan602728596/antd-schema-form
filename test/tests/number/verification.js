import { expect } from 'chai';
import { mount } from 'enzyme';
import * as React from 'react';
import SchemaForm from '../../SchemaForm';

function CreateHandleClickFn(result){
  return function(form, value){
    result.value = value;
  };
}

/* 组件值没有验证 */
export function componentNoverification(){
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值没有验证'
  };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } onOk={ CreateHandleClickFn(result) } />);

  wrapper.find('button').simulate('click');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(0);
  expect(result.value.$root).to.be.undefined;
}

/* 表单必填 */
export function componentRequired(){
  const json = {
    id: '$root',
    type: 'number',
    title: '表单必填',
    $required: true,
    $requiredMessage: '表单必填验证信息'
  };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain = wrapper.find('.ant-form-explain');
  expect(wrapper.find('.ant-form-explain')).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('表单必填验证信息');
  expect(result.value).to.be.null;
}

/* 组件值的枚举 */
export function componentEnum(){
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值的枚举',
    enum: [13, 24],
    $enumMessage: '枚举验证信息'
  };
  const value = { $root: 52 };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('枚举验证信息');
  expect(result.value).to.be.null;
}

/* 组件值是整数 */
export function componentInteger(){
  const json = {
    id: '$root',
    type: 'integer',
    title: '组件值是整数',
    $integerMessage: '必须是整数'
  };
  const value = { $root: 13.42 };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('必须是整数');
  expect(result.value).to.be.null;
}

/* 组件值是整数 */
export function componentIntegerTrue(){
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值是整数',
    $integer: true,
    $integerMessage: '必须是整数'
  };
  const value = { $root: 13.42 };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('必须是整数');
  expect(result.value).to.be.null;
}

/* 组件值的最小值 */
export function componentMinimum(){
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值的最小值',
    minimum: 3,
    $minimumMessage: '最小值验证信息'
  };
  const value = { $root: 2 };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('最小值验证信息');
  expect(result.value).to.be.null;
}

/* 组件值的最大值 */
export function componentMaximum(){
  const json = {
    id: '$root',
    type: 'number',
    title: '组件值的最大值',
    maximum: 100,
    $maximumMessage: '最大值验证信息'
  };
  const value = { $root: 200 };
  const result = { value: null };
  const wrapper = mount(<SchemaForm json={ json } value={ value } onOk={ CreateHandleClickFn(result) } />);
  wrapper.find('button').simulate('click');

  const antFormExplain = wrapper.find('.ant-form-explain');
  expect(antFormExplain).to.be.lengthOf(1);
  expect(antFormExplain.text()).to.be.equal('最大值验证信息');
  expect(result.value).to.be.null;
}