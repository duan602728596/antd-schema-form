import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import isString from 'lodash-es/isString';
import omit from 'lodash-es/omit';
import { Form, Tooltip } from 'antd';
import { ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import * as moment from 'moment';
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
  const {
    title,
    description,
    $componentType,
    $defaultValue,
    $hidden,
    $formItemProps
  }: StringItem = root;
  const rules: Array<ValidationRule> = createStringRules(languagePack, root, required);
  const option: GetFieldDecoratorOptions = { rules };

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  // 格式化日历的日期
  if ($componentType === 'date' && isString($defaultValue)) {
    option.initialValue = moment($defaultValue);
  }

  let element: React.ReactNode = null;

  if (customComponent) {
    element = ($componentType && $componentType in customComponent)
      ? customComponent[$componentType](root, option, form, required)
      : createElement(customComponent.defaultString, [root, option, form, required]);
  }

  return (
    <Form.Item className={ classNames($hidden ? styleName('hidden') : undefined, $formItemProps?.className) }
      label={ title }
      { ...omit($formItemProps, ['className']) }
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