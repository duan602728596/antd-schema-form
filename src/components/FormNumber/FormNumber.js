import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, InputNumber, Radio } from 'antd';
import Context from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';

/**
 * 当类型为number和integer时的组件渲染
 * json schema的属性包括：$id, type, title, description, minimum, maximum, enum, exclusiveMaximum, exclusiveMinimum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, enumMessage, requiredMessage, minimumMessage、
 *   maximumMessage, options, defaultValue
 */
class FormNumber extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  render(): React.Element{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.context.form;
    // type=object时，会判断key是否存在于required数组中
    const { root, required }: {
      root: Object,
      required: boolean
    } = this.props;
    const $id: string = root?.$id || root?.id;
    const { type, title, description, $componentType, $readOnly, $defaultValue, $options, $placeholder }: {
      type: string,
      title: string,
      description: string,
      $componentType: ?string,
      $readOnly: ?boolean,
      $defaultValue: ?string,
      $options: ?Array<{ label: string, value: string}>,
      $placeholder: ?string
    } = root;
    const rules: Array = createNumberRules(this.props.root, required, type === 'integer');
    const option: Object = { rules };
    let element: ?React.Element = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
      // 渲染radio
      case 'radio':
        element = getFieldDecorator($id, option)(<Radio.Group options={ $options } />);
        break;

      default:
        element = getFieldDecorator($id, option)(
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