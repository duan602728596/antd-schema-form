import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip, Input, Select, Radio, DatePicker } from 'antd';
import moment from 'moment';
import Context from '../../context';
import styleName from '../../utils/styleName';
import { isString, isFunction } from '../../utils/type';
import createRules from './createRules';

/**
 * 当类型为string时的组件渲染
 * json schema的属性包括：$id、type、title、description、pattern、minLength、maxLength、enum
 *
 * 扩展属性前必须加上"$"
 * 扩展属性包括：required, componentType, readOnly, length, patternOption, enumMessage, lengthMessage, requiredMessage, patternMessage、
 *   minLengthMessage, maxLengthMessage, options, defaultValue, placeholder
 */
class FormString extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object,
    required: PropTypes.bool
  };

  // 文件上传点击事件
  handleFileUpdateClick(id: string, event: Event): void{
    document.getElementById(id).click();
  }
  // 文件input的change事件
  async handleInputChange($id: string, event: Event): Promise<void>{
    const { form, onUpload }: {
      form: Object,
      onUpload: ?Function
    } = this.context;
    const { files }: { files: Array<File> } = event.target;

    if(onUpload && isFunction(onUpload)){
      const value: string = await onUpload(files);

      form.setFieldsValue({ [$id]: value });
    }else{
      form.setFieldsValue({ [$id]: files[0].name });
    }
  }
  // select的下拉框
  selectOptionsView(options: Array<{ label: string, value: string }>): React.ChildrenArray<React.Element>{
    return options.map((item: Object, index: number): React.Element=>{
      return <Select.Option key={ index } value={ item.value }>{ item.label }</Select.Option>;
    });
  }
  render(): React.Element{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.context.form;
    // type=object时，会判断key是否存在于required数组中
    const { required }: { required: boolean } = this.props;
    const { $id, title, description, $required, $componentType, $readOnly, $defaultValue, $options, $placeholder }: {
      $id: string,
      title: string,
      description: string,
      $required: boolean,
      $componentType: ?string,
      $readOnly: ?boolean,
      $defaultValue: ?string,
      $options: ?Array<{ label: string, value: string}>,
      $placeholder: ?string
    } = this.props.root;
    const rules: Array = createRules(this.props.root, required);
    const option: Object = { rules };
    let element: ?(React.Element | React.ChildrenArray<React.Element>) = null;

    // 表单默认值
    if($defaultValue){
      option.initialValue = $defaultValue;
    }

    // 格式化日历的日期
    if($componentType === 'date' && isString($defaultValue)){
      option.initialValue = moment($defaultValue);
    }

    switch($componentType){
      // 文本域
      case 'textArea':
        element = getFieldDecorator($id, option)(<Input.TextArea rows={ 6 } readOnly={ $readOnly } placeholder={ $placeholder } />);
        break;

      // 渲染select
      case 'select':
        element = getFieldDecorator($id, option)(
          <Select className={ styleName('string-select') }
            readOnly={ $readOnly }
            placeholder={ $placeholder }
            allowClear={ !$required }
          >
            { this.selectOptionsView($options) }
          </Select>
        );
        break;

      // 渲染radio
      case 'radio':
        element = getFieldDecorator($id, option)(<Radio.Group options={ $options } />);
        break;

      // 渲染日期组件
      case 'date':
        element = getFieldDecorator($id, option)(
          <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime={ true } placeholder={ $placeholder } />
        );
        break;

      // 文件上传
      case 'file':
        const id: string = `${ $id }@file`;

        element = [
          getFieldDecorator($id, option)(
            <Input.Search key="input"
              enterButton="选择文件"
              readOnly={ true }
              placeholder={ $placeholder }
              onSearch={ this.handleFileUpdateClick.bind(this, id) }
            />
          ),
          <input key="file"
            className={ styleName('string-file') }
            id={ id }
            type="file"
            onChange={ this.handleInputChange.bind(this, $id) }
          />
        ];
        break;

      // 渲染默认组件
      default:
        element = getFieldDecorator($id, option)(<Input readOnly={ $readOnly } placeholder={ $placeholder } />);
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