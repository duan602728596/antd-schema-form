import * as React from 'react';
import { useContext, PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form } from 'antd';
import { Rule } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
import createElement from '../../utils/createElement';
import { ArrayItem, ContextValue } from '../../types';

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
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent, languagePack }: ContextValue = context;
  const { root, required }: FormArrayProps = props;
  const { id, title, description, $componentType, $defaultValue, $hidden }: ArrayItem = root;
  const rules: Array<Rule> = createArrayRules(languagePack, root, required);
  let isTableComponent: boolean = false; // 判断是否为table组件
  let element: ReactElement | null = null;

  if (customComponent) {
    if ($componentType && $componentType in customComponent) {
      element = customComponent[$componentType](root, form, required);
    } else {
      element = createElement(customComponent.defaultArray, [root, form, required]);
      isTableComponent = true;
    }
  }

  const classname: string = classNames({
    [styleName('array-table-form-item')]: isTableComponent,
    [styleName('hidden')]: $hidden
  });

  return element ? (
    <Form.Item className={ classname }
      name={ id }
      rules={ rules }
      label={ title }
    >
      { element }
    </Form.Item>
  ) : null;
}

FormArray.propTypes = {
  root: PropTypes.object,
  required: PropTypes.bool
};

export default FormArray;