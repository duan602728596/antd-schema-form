import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import { Rule } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createStringRules from './createStringRules';
import createElement from '../../utils/createElement';
import { StringItem, ContextValue } from '../../types';

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

function FormString(props: PropsWithChildren<FormStringProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent, languagePack }: ContextValue = context;
  const { root, required }: FormStringProps = props; // type=object时，会判断key是否存在于required数组中
  const { id, title, description, $componentType, $hidden }: StringItem = root;
  const rules: Array<Rule> = createStringRules(languagePack, root, required);
  let element: React.ReactNode = null;

  if (customComponent) {
    element = ($componentType && $componentType in customComponent)
      ? customComponent[$componentType](root, form, required)
      : createElement(customComponent.defaultString, [root, form, required]);
  }

  return (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined }
      name={ id }
      rules={ rules }
      label={ title }
    >
      <Tooltip title={ description } placement="topRight">
        { element }
      </Tooltip>
    </Form.Item>
  );
}

FormString.propTypes = {
  root: PropTypes.object,
  required: PropTypes.bool
};

export default FormString;