import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Form, Tooltip, Input, Select, Radio, DatePicker } from 'antd';
import { ValidationRule } from 'antd/lib/form';
import { GetFieldDecoratorOptions, WrappedFormUtils } from 'antd/lib/form/Form';
import * as moment from 'moment';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import { isString } from '../../utils/type';
import createStringRules from './createStringRules';
import InputPassword from './InputPassword';
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

class FormString extends Component<FormStringProps> {
  static contextType: Context<ContextValue | {}> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>;
    required: Requireable<boolean>;
  } = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  // select的下拉框
  selectOptionsView(options: Array<{ label: string; value: string }>): React.ReactNodeArray {
    return options.map((item: { label: string; value: string }, index: number): React.ReactNode => {
      return <Select.Option key={ `${ index }` } value={ item.value }>{ item.label }</Select.Option>;
    });
  }

  render(): React.ReactNode {
    const { form, customComponent }: ContextValue = this.context;
    const { getFieldDecorator }: WrappedFormUtils = form;
    // type=object时，会判断key是否存在于required数组中
    const { root, required }: FormStringProps = this.props;
    const {
      id,
      title,
      description,
      $required,
      $componentType,
      $readOnly,
      $defaultValue,
      $options = [],
      $placeholder
    }: StringItem = root;
    const rules: Array<ValidationRule> = createStringRules(this.props.root, required);
    const option: GetFieldDecoratorOptions = { rules };
    let element: React.ReactNode = null;

    // 表单默认值
    if ($defaultValue) option.initialValue = $defaultValue;

    // 格式化日历的日期
    if ($componentType === 'date' && isString($defaultValue)) {
      option.initialValue = moment($defaultValue);
    }

    switch ($componentType) {
      // 文本域
      case 'textArea':
        element = getFieldDecorator(id, option)(
          <Input.TextArea rows={ 6 } readOnly={ $readOnly } placeholder={ $placeholder } />
        );
        break;

      // 渲染select
      case 'select':
        element = getFieldDecorator(id, option)(
          <Select className={ styleName('string-select') }
            placeholder={ $placeholder }
            allowClear={ !$required }
          >
            { this.selectOptionsView($options) }
          </Select>
        );
        break;

      // 渲染radio
      case 'radio':
        element = getFieldDecorator(id, option)(<Radio.Group options={ $options } />);
        break;

      // 渲染日期组件
      case 'date':
        element = getFieldDecorator(id, option)(
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={ true } placeholder={ $placeholder } />
        );
        break;

      // password
      case 'password':
        element = getFieldDecorator(id, option)(
          // 兼容Input.Password组件
          'Password' in Input
            ? <Input.Password readOnly={ $readOnly } placeholder={ $placeholder } />
            : <InputPassword readOnly={ $readOnly } placeholder={ $placeholder } />
        );
        break;

      // 渲染默认组件
      default:
        element = (customComponent && $componentType && $componentType in customComponent)
          ? customComponent[$componentType](root, option, form, required)
          : getFieldDecorator(id, option)(<Input readOnly={ $readOnly } placeholder={ $placeholder } />);
        break;
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

export default FormString;