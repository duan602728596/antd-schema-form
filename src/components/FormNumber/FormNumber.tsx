import * as React from 'react';
import { useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip, InputNumber, Radio } from 'antd';
import { ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';
import { NumberItem, ContextValue } from '../../types';
import { getOptionsList } from '../../utils/selectOptionsRender';

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

function FormNumber(props: PropsWithChildren<FormNumberProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent, languagePack }: ContextValue = context;
  const { getFieldDecorator }: WrappedFormUtils = form;
  const { root, required }: FormNumberProps = props; // type=object时，会判断key是否存在于required数组中
  const {
    id,
    type,
    title,
    description,
    $componentType,
    $readOnly,
    $defaultValue,
    $placeholder,
    $hidden
  }: NumberItem = root;
  const rules: Array<ValidationRule> = createNumberRules(languagePack, root, required, type === 'integer');
  const option: GetFieldDecoratorOptions = { rules };
  let element: React.ReactNode = null;

  // 表单默认值
  if ($defaultValue) option.initialValue = $defaultValue;

  switch ($componentType) {
    // 渲染radio
    case 'radio':
      element = getFieldDecorator(id, option)(<Radio.Group options={ getOptionsList(root) } />);
      break;

    default:
      element = (customComponent && $componentType && $componentType in customComponent)
        ? customComponent[$componentType](root, option, form, required)
        : getFieldDecorator(id, option)(
          <InputNumber className={ styleName('number-input') } readOnly={ $readOnly } placeholder={ $placeholder } />
        );
  }

  return (
    <Form.Item className={ $hidden ? styleName('hidden') : undefined } label={ title }>
      <Tooltip title={ description } placement="topRight">
        { element }
      </Tooltip>
    </Form.Item>
  );
}

FormNumber.propTypes = {
  root: PropTypes.object,
  required: PropTypes.bool
};

export default FormNumber;