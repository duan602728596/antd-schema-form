import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import Context from '../../context';
import TableComponent from './TableComponent';

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

  render(): React.Element{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.context.form;
    const { root }: { root: Object } = this.props;
    const $id: string = root?.$id || root?.id;
    const { title, description, $componentType, $defaultValue }: {
      title: string,
      description: string,
      $componentType: ?string,
      $defaultValue: ?string
    } = root;
    const option: Object = {};
    let element: ?React.Element = null;

    // 表单默认值
    if($defaultValue) option.initialValue = $defaultValue;

    switch($componentType){
      default:
        element = <TableComponent root={ root } option={ option } />;
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