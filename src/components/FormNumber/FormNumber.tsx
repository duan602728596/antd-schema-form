import * as React from 'react';
import { useContext, PropsWithChildren, ReactElement } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'antd';
import { Rule } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';
import createElement from '../../utils/createElement';
import { NumberItem, ContextValue } from '../../types';

/**
 * 当类型为number和integer时的组件渲染
 * json schema的属性包括：id, type, title, description, minimum, maximum, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, enumMessage, requiredMessage, minimumMessage、
 *   maximumMessage, options, defaultValue
 */
interface FormNumberProps {
  root: NumberItem;
  required: boolean;
}

function FormNumber(props: PropsWithChildren<FormNumberProps>): ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent, languagePack }: ContextValue = context;
  const { root, required }: FormNumberProps = props; // type=object时，会判断key是否存在于required数组中
  const { id, type, title, description, $componentType, $hidden }: NumberItem = root;
  const rules: Array<Rule> = createNumberRules(languagePack, root, required, type === 'integer');
  let element: ReactElement | null = null;

  if (customComponent) {
    element = ($componentType && $componentType in customComponent)
      ? customComponent[$componentType](root, form, required)
      : createElement(customComponent.defaultNumber, [root, form, required]);
  }

  return element ? (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined }
      name={ id }
      rules={ rules }
      label={ title }
    >
      { element }
    </Form.Item>
  ) : null;
}

FormNumber.propTypes = {
  root: PropTypes.object,
  required: PropTypes.bool
};

export default FormNumber;