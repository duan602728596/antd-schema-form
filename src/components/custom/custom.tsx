import * as React from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch, Collapse } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import omit from 'lodash-es/omit';
import selectOptionsRender from './selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../FormArray/TableComponent';
import OneOf from '../FormObject/OneOf';
import { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem } from '../../types';
// @ts-ignore
import * as warning from '../../utils/warning';

/* string类型组件 */
// 默认组件
export function defaultString(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder, $disabled }: StringItem = root;

  return getFieldDecorator(id, option)(
    <Input readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />
  );
}

// 文本域
export function textArea(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $readOnly, $placeholder, $disabled }: StringItem = root;

  return getFieldDecorator(id, option)(
    <Input.TextArea rows={ 6 } readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />
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
  const { id, $required, $options = [], $placeholder, $disabled }: StringItem = root;

  return getFieldDecorator(id, option)(
    <Select className={ styleName('string-select') }
      placeholder={ $placeholder }
      allowClear={ !($required || required) }
      disabled={ $disabled ?? undefined }
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
  const { id, $options = [], $disabled }: StringItem | NumberItem = root;

  return getFieldDecorator(id, option)(<Radio.Group options={ $options } disabled={ $disabled ?? undefined } />);
}

// date
export function date(
  root: StringItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $placeholder, $disabled }: StringItem = root;

  return getFieldDecorator(id, option)(
    <DatePicker format="YYYY-MM-DD HH:mm:ss"
      showTime={ true }
      placeholder={ $placeholder }
      disabled={ $disabled ?? undefined }
    />
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
  const { id, $readOnly, $placeholder, $disabled }: StringItem = root;

  return getFieldDecorator(id, option)(
    <Input.Password readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />
  );
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
  const { id, $readOnly, $placeholder, $disabled }: NumberItem = root;

  return getFieldDecorator(id, option)(
    <InputNumber className={ styleName('number-input') }
      readOnly={ $readOnly }
      placeholder={ $placeholder }
      disabled={ $disabled ?? undefined }
    />
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
  const { id, $disabled }: BooleanItem = root;

  return getFieldDecorator(id, option)(<Checkbox disabled={ $disabled ?? undefined } />);
}

// switch组件
export function switchComponent(
  root: BooleanItem,
  option: GetFieldDecoratorOptions,
  form: WrappedFormUtils,
  required: boolean
): React.ReactNode {
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { id, $disabled }: BooleanItem = root;

  return getFieldDecorator(id, option)(<Switch disabled={ $disabled ?? undefined } />);
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
  const { id, $options = [], $componentType }: ArrayItem = root;

  $componentType === 'checkbox' && warning('Use "checkboxGroup" instead of "checkbox" when type is array.');

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
  const { id, $options = [], $componentType, $disabled }: ArrayItem = root;
  const mode: any = $componentType; // select ModeOption

  return getFieldDecorator(id, option)(
    <Select className={ styleName('array-multiple') } mode={ mode } disabled={ $disabled ?? undefined }>
      { selectOptionsRender($options) }
    </Select>
  );
}

/* object类型组件 */
export function defaultObject(
  root: SchemaItem,
  form: WrappedFormUtils,
  element: React.ReactNodeArray
): React.ReactNode {
  const { title, id, description }: SchemaItem = root;

  // header
  const header: React.ReactNodeArray = [
    <b key="title">{ title || id }</b>,
    <span key="description" className={ styleName('object-description') }>{ description }</span>
  ];

  return (
    <Collapse key={ id } className={ styleName('object-collapse') } defaultActiveKey={ [id] }>
      <Collapse.Panel key={ id } header={ header }>
        { element }
      </Collapse.Panel>
    </Collapse>
  );
}

export function defaultOneOf(
  root: SchemaItem,
  form: WrappedFormUtils,
  element: React.ReactNodeArray
): React.ReactNode {
  const { id }: SchemaItem = root;

  return <OneOf key={ id } root={ root } element={ element } />;
}