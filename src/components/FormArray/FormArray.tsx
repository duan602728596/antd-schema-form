import * as React from 'react';
import { Component, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Form, Tooltip, Select, Checkbox } from 'antd';
import { GetFieldDecoratorOptions, ValidationRule, WrappedFormUtils } from 'antd/lib/form/Form';
import AntdSchemaFormContext from '../../context';
import TableComponent from './TableComponent';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
import { ArrayItem, ContextValue } from '../../types';

/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：id, type, title, description, items, minItems, maxItems
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options
 */
interface FormArrayProps {
  root: ArrayItem;
  required: boolean;
}

class FormArray extends Component<FormArrayProps> {
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
    const {
      getFieldDecorator,
      // @ts-ignore: rc-form
      getFieldProps
    }: WrappedFormUtils = form;
    const { root, required }: FormArrayProps = this.props;
    const { id, title, description, $componentType, $defaultValue, $options = [] }: ArrayItem = root;
    const rules: Array<ValidationRule> = createArrayRules(root, required);
    const option: GetFieldDecoratorOptions = { rules };
    let element: React.ReactNode = null;

    // 表单默认值
    if ($defaultValue) option.initialValue = $defaultValue;

    switch ($componentType) {
      case 'checkbox':
        element = getFieldDecorator(id, option)(<Checkbox.Group options={ $options } />);
        break;

      case 'multiple':
      case 'tags':
        element = getFieldDecorator(id, option)(
          <Select className={ styleName('array-multiple') } mode={ $componentType }>
            { this.selectOptionsView($options) }
          </Select>
        );
        break;

      default:
        element = (customComponent && $componentType && $componentType in customComponent)
          ? customComponent[$componentType](root, option, form, required)
          : <TableComponent root={ root } { ...getFieldProps(id, option) } />;
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

export default FormArray;