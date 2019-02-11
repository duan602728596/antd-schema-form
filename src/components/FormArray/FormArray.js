import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Select, Checkbox } from 'antd';
import AntdSchemaFormContext from '../../context';
import TableComponent from './TableComponent';
import styleName from '../../utils/styleName';

/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：id, type, title, description, items
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options
 */
class FormArray extends Component{
  static contextType: Object = AntdSchemaFormContext;
  static propTypes: Object = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  // select的下拉框
  selectOptionsView(options: Array<{ label: string, value: string }>): React.ChildrenArray<React.Element>{
    return options.map((item: Object, index: number): React.Element=>{
      return <Select.Option key={ index } value={ item.value }>{ item.label }</Select.Option>;
    });
  }
  render(): React.Element{
    const { form, customComponent }: {
      form: Object,
      customComponent: Object
    } = this.context;
    const { getFieldDecorator, getFieldProps }: {
      getFieldDecorator: Function,
      getFieldProps: Function
    } = form;
    const { root, required }: {
      root: Object,
      required: boolean
    } = this.props;
    const { id, title, description, $componentType, $defaultValue, $options = [] }: {
      id: string,
      title: string,
      description: string,
      $componentType: ?string,
      $defaultValue: ?string,
      $options: Array<{ babel: string, value: string | number }>
    } = root;
    const option: Object = {};
    let element: ?React.Element = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
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
        element = $componentType in customComponent
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