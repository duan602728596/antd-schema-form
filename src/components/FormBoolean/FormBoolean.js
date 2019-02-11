// @flow
import * as React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Checkbox, Switch } from 'antd';
import AntdSchemaFormContext from '../../context';
import { isSpace } from '../../utils/type';

/**
 * 当类型为boolean时的组件渲染
 * json schema的属性包括：id, type, title, description
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType
 */
type FormBooleanProps = {
  root: Object,
  required: boolean
};

type FormBooleanState = {
  form: Object,
  isChecked: boolean
};

class FormBoolean extends Component<FormBooleanProps, FormBooleanState>{
  static contextType: React.Context<Object> = AntdSchemaFormContext;
  static propTypes: Object = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  constructor(): void{
    super(...arguments);

    const { form }: { form: Object } = this.context;
    const { root }: { root: Object } = this.props;
    const id: string = root.id;
    const value: boolean = form.getFieldValue(id);

    this.state = {
      form,
      isChecked: isSpace(value) ? root.$defaultValue : value
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    const { form }: { form: Object } = prevState;
    const { root }: { root: Object } = nextProps;
    const id: string = root.id;
    const value: boolean = form.getFieldValue(id);

    return {
      isChecked: isSpace(value) ? root.$defaultValue : value
    };
  }
  render(): React.Node{
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
    let element: React.Node = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
      case 'switch':
        element = getFieldDecorator(id, option)(<Switch checked={ isChecked } />);
        break;

      default:
        element = ($componentType && $componentType in customComponent)
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