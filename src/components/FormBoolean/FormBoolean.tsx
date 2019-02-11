import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Form, Tooltip, Checkbox, Switch } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import AntdSchemaFormContext from '../../context';
import { isSpace } from '../../utils/type';
import { ContextValue, BooleanItem } from '../../types';

/**
 * 当类型为boolean时的组件渲染
 * json schema的属性包括：id, type, title, description
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType
 */
interface FormBooleanProps{
  root?: BooleanItem;
  required?: boolean;
}

interface FormBooleanState{
  form: WrappedFormUtils;
  isChecked: boolean;
}

class FormBoolean extends Component<FormBooleanProps, FormBooleanState>{
  static contextType: Context<ContextValue> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>
  } = {
    root: PropTypes.object
  };

  constructor(props: FormBooleanProps, ...argu: any[]){
    super(props, ...argu);

    const { form } = this.context;
    const { root } = this.props;
    const id: string = root.id;
    const value: boolean = form.getFieldValue(id);

    this.state = {
      form,
      isChecked: isSpace(value) ? root.$defaultValue : value
    };
  }
  static getDerivedStateFromProps(nextProps: FormBooleanProps, prevState: FormBooleanState): { isChecked: boolean }{
    const { form } = prevState;
    const { root } = nextProps;
    const id: string = root.id;
    const value: boolean = form.getFieldValue(id);

    return { isChecked: isSpace(value) ? root.$defaultValue : value };
  }
  render(): React.ReactNode{
    const { form, customComponent } = this.context;
    const { getFieldDecorator } = form;
    const { root, required } = this.props;
    const { id, title, description, $componentType, $defaultValue } = root;
    const option: GetFieldDecoratorOptions = {};
    const { isChecked } = this.state;
    let element: React.ReactNode = null;

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