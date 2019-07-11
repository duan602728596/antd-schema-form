import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Form, Tooltip, Checkbox, Switch } from 'antd';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import AntdSchemaFormContext from '../../context';
import { ContextValue, BooleanItem } from '../../types';
import styleName from '../../utils/styleName';

/**
 * 当类型为boolean时的组件渲染
 * json schema的属性包括：id, type, title, description
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType
 */
interface FormBooleanProps {
  root: BooleanItem;
  required: boolean;
}

class FormBoolean extends Component<FormBooleanProps, {}> {
  static contextType: Context<ContextValue | {}> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>;
  } = {
    root: PropTypes.object
  };

  context: ContextValue;

  render(): React.ReactNode {
    const { form, customComponent }: ContextValue = this.context;
    const { getFieldDecorator }: WrappedFormUtils = form;
    const { root, required }: FormBooleanProps = this.props;
    const { id, title, description, $componentType, $defaultValue, $hidden }: BooleanItem = root;
    const option: GetFieldDecoratorOptions = {
      valuePropName: 'checked'
    };
    let element: React.ReactNode = null;

    // 表单默认值
    if ($defaultValue) option.initialValue = $defaultValue;

    switch ($componentType) {
      case 'switch':
        element = getFieldDecorator(id, option)(<Switch />);
        break;

      default:
        element = (customComponent && $componentType && $componentType in customComponent)
          ? customComponent[$componentType](root, option, form, required)
          : getFieldDecorator(id, option)(<Checkbox />);
    }

    return (
      <Form.Item className={ $hidden ? styleName('hidden') : undefined } label={ title }>
        <Tooltip title={ description } placement="topRight">
          { element }
        </Tooltip>
      </Form.Item>
    );
  }
}

export default FormBoolean;