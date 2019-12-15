import * as React from 'react';
import { ReactNode, ReactNodeArray } from 'react';
import { Input, Select, Radio, DatePicker, InputNumber, Checkbox, Switch, Collapse } from 'antd';
import { FormInstance } from 'antd/es/form';
import selectOptionsRender from './selectOptionsRender';
import styleName from '../../utils/styleName';
import TableComponent from '../FormArray/TableComponent';
import OneOf from '../FormObject/OneOf';
import { SchemaItem, StringItem, NumberItem, BooleanItem, ArrayItem } from '../../types';

/* string类型组件 */
// 默认组件
export function defaultString(root: StringItem, form: FormInstance, required: boolean): ReactNode {
  const { $readOnly, $placeholder, $disabled }: StringItem = root;

  return <Input readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />;
}

// 文本域
export function textArea(root: StringItem, form: FormInstance, required: boolean): ReactNode {
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
export function select(root: StringItem, form: FormInstance, required: boolean): ReactNode {
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
export function radio(root: StringItem, form: FormInstance, required: boolean): ReactNode {
  const { $options = [], $disabled }: StringItem | NumberItem = root;

  return <Radio.Group options={ $options } disabled={ $disabled ?? undefined } />;
}

// date
export function date(root: StringItem, form: FormInstance, required: boolean): ReactNode {
  const { id, $placeholder, $disabled }: StringItem = root;

  return (
    <DatePicker format="YYYY-MM-DD HH:mm:ss"
      showTime={ true }
      placeholder={ $placeholder }
      disabled={ $disabled ?? undefined }
    />
  );
}

// password
export function password(root: StringItem, form: FormInstance, required: boolean): ReactNode {
  const { $readOnly, $placeholder, $disabled }: StringItem = root;

  return <Input.Password readOnly={ $readOnly } placeholder={ $placeholder } disabled={ $disabled ?? undefined } />;
}

/* number类型组件 */
// 默认组件
export function defaultNumber(root: NumberItem, form: FormInstance, required: boolean): ReactNode {
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
export function defaultBoolean(root: BooleanItem, form: FormInstance, required: boolean): ReactNode {
  const { $disabled }: BooleanItem = root;

  return <Checkbox disabled={ $disabled ?? undefined } />;
}

// switch组件
export function switchComponent(root: BooleanItem, form: FormInstance, required: boolean): ReactNode {
  const { $disabled }: BooleanItem = root;

  return <Switch disabled={ $disabled ?? undefined } />;
}

/* Array类型组件 */
// 默认组件
export function defaultArray(root: ArrayItem, form: FormInstance, required: boolean): ReactNode {
  return <TableComponent root={ root } />;
}

// checkbox group
export function checkboxGroup(root: ArrayItem, form: FormInstance, required: boolean): ReactNode {
  const { $options = [], $disabled }: ArrayItem = root;

  return <Checkbox.Group options={ $options } disabled={ $disabled ?? undefined } />;
}

// multiple and tags
export function multipleOrTags(root: ArrayItem, form: FormInstance, required: boolean): ReactNode {
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
export function defaultObject(root: SchemaItem, form: FormInstance, element: ReactNodeArray): ReactNode {
  const { title, id, description }: SchemaItem = root;

  // header
  const header: ReactNodeArray = [
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

export function defaultOneOf(root: SchemaItem, form: FormInstance, element: ReactNodeArray): ReactNode {
  const { id }: SchemaItem = root;

  return <OneOf key={ id } root={ root } element={ element } />;
}