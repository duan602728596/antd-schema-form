import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Checkbox, Switch } from 'antd';
import Context from '../../context';
import { isSpace } from '../../utils/type';

/**
 * 当类型为boolean时的组件渲染
 * json schema的属性包括：id, type, title, description
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType
 */
class FormBoolean extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  state: {
    form: Object,
    isChecked: boolean
  };

  constructor(): void{
    super(...arguments);

    const { form }: { form: Object } = this.context;
    const { root }: { root: Object } = this.props;
    const id: string = root.id;
    const value: ?boolean = form.getFieldValue(id);

    this.state = {
      form,
      isChecked: isSpace(value) ? root.$defaultValue : value
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    const { form }: { form: Object } = prevState;
    const { root }: { root: Object } = nextProps;
    const id: string = root.id;
    const value: ?boolean = form.getFieldValue(id);

    return {
      isChecked: isSpace(value) ? root.$defaultValue : value
    };
  }
  render(): React.Element{
    const { form, customComponent }: {
      form: Object,
      customComponent: Object
    } = this.context;
    const { getFieldDecorator }: { getFieldDecorator: Function } = form;
    const { root, required }: {
      root: Object,
      required: boolean
    } = this.props;
    const { id, title, description, $componentType, $defaultValue }: {
      id: string,
      title: string,
      description: string,
      $componentType: ?string,
      $defaultValue: ?string
    } = root;
    const option: Object = {};
    const { isChecked }: { isChecked: boolean } = this.state;
    let element: ?React.Element = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
      case 'switch':
        element = getFieldDecorator(id, option)(<Switch checked={ isChecked } />);
        break;

      default:
        element = $componentType in customComponent
          ? customComponent[$componentType](root, option, form, required)
          : getFieldDecorator(id, option)(<Checkbox checked={ isChecked } />);
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

export default FormBoolean;