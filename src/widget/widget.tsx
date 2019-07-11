import * as React from 'react';
import { Input, Select, Radio, DatePicker, InputNumber } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import selectOptionsRender from '../utils/selectOptionsRender';
import styleName from '../utils/styleName';
import { StringItem, NumberItem } from '../types';

/* string类型组件 */
// 默认组件
export function defaultString(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringItem = root;

  return getFieldDecorator(id, option)(<Input readOnly={ $readOnly } placeholder={ $placeholder } />);
}

// 文本域
export function textArea(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringItem = root;

  return getFieldDecorator(id, option)(
    <Input.TextArea rows={ 6 } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}

// select
export function select(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $required, $options = [], $placeholder }: StringItem = root;

  return getFieldDecorator(id, option)(
    <Select className={ styleName('string-select') }
      placeholder={ $placeholder }
      allowClear={ !($required || required) }
    >
      { selectOptionsRender($options) }
    </Select>
  );
}

// radio（string类型和number类型都能用）
export function radio(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [] }: StringItem | NumberItem = root;

  return getFieldDecorator(id, option)(<Radio.Group options={ $options } />);
}

// date
export function date(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $placeholder }: StringItem = root;

  return getFieldDecorator(id, option)(
    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={ true } placeholder={ $placeholder } />
  );
}

// password
export function password(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringItem = root;

  return getFieldDecorator(id, option)(<Input.Password readOnly={ $readOnly } placeholder={ $placeholder } />);
}

/* number类型组件 */
// 默认组件
export function defaultNumber(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: StringItem = root;

  return getFieldDecorator(id, option)(
    <InputNumber className={ styleName('number-input') } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}