import { createElement, ReactNode } from 'react';
import { Select } from 'antd';

/* 渲染select的下拉框 */
function selectOptionsRender(options: Array<{ label: string; value: string }>): Array<ReactNode> {
  return options.map((item: { label: string; value: string }, index: number): ReactNode => {
    return <Select.Option key={ `${ index }` } value={ item.value }>{ item.label }</Select.Option>;
  });
}

export default selectOptionsRender;