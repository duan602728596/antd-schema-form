import * as React from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import omit from 'lodash-es/omit';
import selectOptionsRender from '../../utils/selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../FormArray/TableComponent';
import OneOf from '../FormObject/OneOf';
import { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem } from '../../types';

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
  root: NumberItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder }: NumberItem = root;

  return getFieldDecorator(id, option)(
    <InputNumber className={ styleName('number-input') } readOnly={ $readOnly } placeholder={ $placeholder } />
  );
}

/* boolean类型组件 */
// 默认组件
export function defaultBoolean(
  root: BooleanItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id }: BooleanItem = root;

  return getFieldDecorator(id, option)(<Checkbox />);
}

// switch组件
export function switchComponent(
  root: BooleanItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id }: BooleanItem = root;

  return getFieldDecorator(id, option)(<Switch />);
}

/* Array类型组件 */
// 默认组件
export function defaultArray(
  root: ArrayItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  // @ts-ignore
  const { getFieldProps }: WrappedFormUtils = form;
  const { id }: ArrayItem = root;
  const props: any = omit(getFieldProps(id, option), ['ref']);

  return <TableComponent root={ root } { ...props } />;
}

// checkbox group
export function checkboxGroup(
  root: ArrayItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [] }: ArrayItem = root;

  return getFieldDecorator(id, option)(<Checkbox.Group options={ $options } />);
}

// multiple and tags
export function multipleOrTags(
  root: ArrayItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $options = [], $componentType }: ArrayItem = root;

  return getFieldDecorator(id, option)(
    <Select className={ styleName('array-multiple') } mode={ $componentType }>
      { selectOptionsRender($options) }
    </Select>
  );
}

/* object类型组件 */
export function defaultOneOf(
  root: SchemaItem,
  form: WrappedFormUtils,
  element: React.ReactNodeArray
): React.ReactNode {
  const { id }: SchemaItem = root;

  return <OneOf key={ id } root={ root } element={ element } />;
}