import * as React from 'react';
import { Select } from 'antd';
import { StringItem } from '../types';

export interface Option {
  label: string;
  value: string | number
}

export function getOptionsList(schema: {
  enum?: Array<string | number>;
  enumNames?: Array<string>;
}): Array<Option> {
  if (schema.enum) {
    return schema.enum.map((value: string | number, i: number) => {
      const label: string = (schema.enumNames && schema.enumNames[i]) || String(value);

      return { label, value };
    });
  }

  return [];
}

/* 渲染select的下拉框 */
function selectOptionsRender(schema: StringItem | StringItem): React.ReactNodeArray {
  const options: Option[] = getOptionsList(schema);

  return options.map((item: { label: string; value: string }, index: number): React.ReactNode => {
    return <Select.Option key={ `${ index }` } value={ item.value }>{ item.label }</Select.Option>;
  });
}

export default selectOptionsRender;