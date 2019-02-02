import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Form, Tooltip, InputNumber, Radio } from 'antd';
import { ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import AntdSchemaForm from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';
import { NumberItem, ContextValue } from '../../types';

/**
 * 当类型为number和integer时的组件渲染
 * json schema的属性包括：id, type, title, description, minimum, maximum, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, enumMessage, requiredMessage, minimumMessage、
 *   maximumMessage, options, defaultValue
 */
interface FormNumberProps{
  root?: NumberItem;
  required?: boolean;
}

class FormNumber extends Component<FormNumberProps>{
  static contextType: Context<ContextValue> = AntdSchemaForm;
  static propTypes: {
    root: Requireable<object>,
    required: Requireable<boolean>
  } = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  render(): React.ReactNode{
    const { form, customComponent } = this.context;
    const { getFieldDecorator } = form;
    // type=object时，会判断key是否存在于required数组中
    const { root, required } = this.props;
    const { id, type, title, description, $componentType, $readOnly, $defaultValue, $options = [], $placeholder } = root;
    const rules: Array<ValidationRule> = createNumberRules(this.props.root, required, type === 'integer');
    const option: GetFieldDecoratorOptions = { rules };
    let element: React.ReactNode = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
      // 渲染radio
      case 'radio':
        element = getFieldDecorator(id, option)(<Radio.Group options={ $options } />);
        break;

      default:
        element = $componentType in customComponent
          ? customComponent[$componentType](root, option, form, required)
          : getFieldDecorator(id, option)(
            <InputNumber className={ styleName('number-input') } readOnly={ $readOnly } placeholder={ $placeholder } />
          );
    }

    return (
      <Form.Item label={ title }>
        <Tooltip title={ description } placement="topRight">
          { element }
        </Tooltip>
      </Form.Item>
    );
  }
}

export default FormNumber;