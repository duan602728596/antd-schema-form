// @flow
import * as React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, InputNumber, Radio } from 'antd';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';

/**
 * 当类型为number和integer时的组件渲染
 * json schema的属性包括：id, type, title, description, minimum, maximum, enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, enumMessage, requiredMessage, minimumMessage、
 *   maximumMessage, options, defaultValue
 */
type FormNumberProps = {
  root: Object,
  required: boolean
};

class FormNumber extends Component<FormNumberProps>{
  static contextType: Object = AntdSchemaFormContext;
  static propTypes: React.Context<Object> = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  render(): React.Node{
    const { form, customComponent }: {
      form: Object,
      customComponent: Object
    } = this.context;
    const { getFieldDecorator }: { getFieldDecorator: Function } = form;
    // type=object时，会判断key是否存在于required数组中
    const { root, required }: {
      root: Object,
      required: boolean
    } = this.props;
    const { id, type, title, description, $componentType, $readOnly, $defaultValue, $options = [], $placeholder }: {
      id: string,
      type: string,
      title: string,
      description: string,
      $componentType?: string,
      $readOnly?: boolean,
      $defaultValue?: string,
      $options?: Array<{ label: string, value: string}>,
      $placeholder?: string
    } = root;
    const rules: Array<Object> = createNumberRules(this.props.root, required, type === 'integer');
    const option: Object = { rules };
    let element: React.Node = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
      // 渲染radio
      case 'radio':
        element = getFieldDecorator(id, option)(<Radio.Group options={ $options } />);
        break;

      default:
        element = ($componentType && $componentType in customComponent)
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