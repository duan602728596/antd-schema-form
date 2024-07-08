import { createElement, ReactNode } from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch, Collapse } from 'antd';
import type { ItemType } from 'rc-collapse/es/interface';
import selectOptionsRender from './selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../FormArray/TableComponent';
import OneOf from '../FormObject/OneOf';
import type { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem, CustomComponentFuncArgs } from '../../types';

/* string类型组件 */
// 默认组件
export function defaultString({ root, form, required }: CustomComponentFuncArgs<StringItem>): ReactNode {
  const { $readOnly, $placeholder, $disabled }: StringItem = root;

  return <Input readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />;
}

// 文本域
export function textArea({ root, form, required }: CustomComponentFuncArgs<StringItem>): ReactNode {
  const { $readOnly, $placeholder, $disabled }: StringItem = root;

  return (
    <Input.TextArea rows={ 6 }
      readOnly={ $readOnly }
      placeholder={ $placeholder }
      disabled={ $disabled ?? undefined }
    />
  );
}

// select
export function select({ root, form, required }: CustomComponentFuncArgs<StringItem>): ReactNode {
  const { $required, $options = [], $placeholder, $disabled }: StringItem = root;

  return (
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
export function radio({ root, form, required }: CustomComponentFuncArgs<StringItem | NumberItem>): ReactNode {
  const { $options = [], $disabled }: StringItem | NumberItem = root;

  return <Radio.Group options={ $options } disabled={ $disabled ?? undefined } />;
}

// date
export function date({ root, form, required }: CustomComponentFuncArgs<StringItem>): ReactNode {
  const { id, $placeholder, $disabled, $showTime = true, $format }: StringItem = root;
  const formatString: string = $format ?? ($showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');

  return (
    <DatePicker format={ formatString }
      showTime={ $showTime }
      placeholder={ $placeholder }
      disabled={ $disabled ?? undefined }
    />
  );
}

// password
export function password({ root, form, required }: CustomComponentFuncArgs<StringItem>): ReactNode {
  const { $readOnly, $placeholder, $disabled }: StringItem = root;

  return <Input.Password readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />;
}

/* number类型组件 */
// 默认组件
export function defaultNumber({ root, form, required }: CustomComponentFuncArgs<NumberItem>): ReactNode {
  const { $readOnly, $placeholder, $disabled }: NumberItem = root;

  return (
    <InputNumber className={ styleName('number-input') }
      readOnly={ $readOnly }
      placeholder={ $placeholder }
      disabled={ $disabled ?? undefined }
    />
  );
}

/* boolean类型组件 */
// 默认组件
export function defaultBoolean({ root, form, required }: CustomComponentFuncArgs<BooleanItem>): ReactNode {
  const { $disabled }: BooleanItem = root;

  return <Checkbox disabled={ $disabled ?? undefined } />;
}

// switch组件
export function switchComponent({ root, form, required }: CustomComponentFuncArgs<BooleanItem>): ReactNode {
  const { $disabled }: BooleanItem = root;

  return <Switch disabled={ $disabled ?? undefined } />;
}

/* Array类型组件 */
// 默认组件
export function defaultArray({ root, form, required }: CustomComponentFuncArgs<ArrayItem>): ReactNode {
  return <TableComponent root={ root } />;
}

// checkbox group
export function checkboxGroup({ root, form, required }: CustomComponentFuncArgs<ArrayItem>): ReactNode {
  const { $options = [], $disabled }: ArrayItem = root;

  return <Checkbox.Group options={ $options } disabled={ $disabled ?? undefined } />;
}

// multiple and tags
export function multipleOrTags({ root, form, required }: CustomComponentFuncArgs<ArrayItem>): ReactNode {
  const { $options = [], $componentType, $disabled }: ArrayItem = root;
  const mode: 'multiple' | 'tags' | undefined = ($componentType === 'multiple' || $componentType === 'tags')
    ? $componentType
    : undefined;

  return (
    <Select className={ styleName('array-multiple') } mode={ mode } disabled={ $disabled ?? undefined }>
      { selectOptionsRender($options) }
    </Select>
  );
}

/* object类型组件 */
export function defaultObject({ root, form, element = [] }: CustomComponentFuncArgs<SchemaItem>): ReactNode {
  const { title, id, description }: SchemaItem = root;
  const objectCollapseItems: Array<ItemType> = [{
    key: id,
    id,
    label: [
      <b key="title">{ title || id }</b>,
      <span key="description" className={ styleName('object-description') }>{ description }</span>
    ],
    children: element
  }];

  return <Collapse key={ id } className={ styleName('object-collapse') } items={ objectCollapseItems } defaultActiveKey={ [id] } />;
}

export function defaultOneOf({ root, form, element = [] }: CustomComponentFuncArgs<SchemaItem>): ReactNode {
  const { id }: SchemaItem = root;

  return <OneOf key={ id } root={ root } element={ element } />;
}