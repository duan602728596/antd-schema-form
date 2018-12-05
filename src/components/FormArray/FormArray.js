import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Select, Checkbox } from 'antd';
import Context from '../../context';
import TableComponent from './TableComponent';
import styleName from '../../utils/styleName';

/**
 * 当类型为array时的组件渲染
 * json schema的属性包括：$id, type, title, description, items
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：componentType, options
 */
class FormArray extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object
  };

  // select的下拉框
  selectOptionsView(options: Array<{ label: string, value: string }>): React.ChildrenArray<React.Element>{
    return options.map((item: Object, index: number): React.Element=>{
      return <Select.Option key={ index } value={ item.value }>{ item.label }</Select.Option>;
    });
  }
  render(): React.Element{
    const { getFieldDecorator, getFieldProps }: {
      getFieldDecorator: Function,
      getFieldProps: Function
    } = this.context.form;
    const { root }: { root: Object } = this.props;
    const $id: string = root?.$id || root?.id;
    const { title, description, $componentType, $defaultValue, $options = [] }: {
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
        element = getFieldDecorator($id, option)(<Checkbox.Group options={ $options } />);
        break;

      case 'multiple':
        element = getFieldDecorator($id, option)(
          <Select className={ styleName('array-multiple') } mode="multiple">
            { this.selectOptionsView($options) }
          </Select>
        );
        break;

      default:
        element = <TableComponent root={ root } { ...getFieldProps($id, option) } />;
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