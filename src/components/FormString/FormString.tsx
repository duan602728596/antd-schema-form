import { createElement, useContext, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Form } from 'antd';
import type { Rule } from 'antd/es/form';
import * as classNames from 'classnames';
import { omit } from '../../utils/lodash';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createStringRules from './createStringRules';
import createReactElement from '../../utils/createReactElement';
import type { StringItem, ContextValue } from '../../types';

/**
 * 当类型为string时的组件渲染
 * json schema的属性包括：id, type, title, description, pattern, minLength, maxLength, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, length, patternOption, enumMessage, lengthMessage, requiredMessage,
 *   patternMessage, minLengthMessage, maxLengthMessage, options, defaultValue, placeholder
 */
interface FormStringProps {
  root: StringItem;
  required: boolean;
}

function FormString(props: PropsWithChildren<FormStringProps>): ReactElement | null {
  const context: ContextValue = useContext(AntdSchemaFormContext);
  const { form, customComponent, languagePack }: ContextValue = context;
  const { root, required }: FormStringProps = props; // type=object时，会判断key是否存在于required数组中
  const { id, title, description, $componentType, $hidden, $formItemProps }: StringItem = root;
  const rules: Array<Rule> = createStringRules(languagePack, root, required);
  let element: ReactNode | null = null;

  if (customComponent) {
    element = ($componentType && $componentType in customComponent)
      ? customComponent[$componentType]({ root, form, required })
      : createReactElement(customComponent.defaultString, [{ root, form, required }]);
  }

  return element ? (
    <Form.Item className={ classNames($hidden ? styleName('hidden') : undefined, $formItemProps?.className) }
      name={ id }
      rules={ rules }
      label={ title }
      { ...omit($formItemProps, ['className']) }
    >
      { element }
    </Form.Item>
  ) : null;
}

export default FormString;