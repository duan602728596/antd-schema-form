import { createElement, useContext, PropsWithChildren, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { Form } from 'antd';
import type { Rule } from 'antd/es/form';
import { omit } from '../../utils/lodash';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
import createReactElement from '../../utils/createReactElement';
import type { ArrayItem, ContextValue } from '../../types';

/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：id, type, title, description, items, minItems, maxItems
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options, addDataInReverseOrder
 */
interface FormArrayProps {
  root: ArrayItem;
  required: boolean;
}

function FormArray(props: PropsWithChildren<FormArrayProps>): ReactElement | null {
  const context: ContextValue = useContext(AntdSchemaFormContext);
  const { form, customComponent, languagePack }: ContextValue = context;
  const { root, required }: FormArrayProps = props;
  const { id, title, description, $componentType, $defaultValue, $hidden, $formItemProps }: ArrayItem = root;
  const rules: Array<Rule> = createArrayRules(languagePack, root, required);
  let isTableComponent: boolean = false; // 判断是否为table组件
  let element: ReactNode | null = null;

  if (customComponent) {
    if ($componentType && $componentType in customComponent) {
      element = customComponent[$componentType]({ root, form, required });
    } else {
      element = createReactElement(customComponent.defaultArray, [{ root, form, required }]);
      isTableComponent = true;
    }
  }

  let classname: string = classNames({
    [styleName('array-table-form-item')]: isTableComponent,
    [styleName('hidden')]: $hidden
  });

  if ($formItemProps && $formItemProps.className) {
    classname = classNames(classname, $formItemProps.className);
  }

  return element ? (
    <Form.Item className={ classname }
      name={ id }
      rules={ rules }
      label={ title }
      { ...omit($formItemProps, ['className']) }
    >
      { element }
    </Form.Item>
  ) : null;
}

export default FormArray;