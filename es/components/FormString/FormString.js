import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip, Input, Select, Radio, DatePicker } from 'antd';
import * as moment from 'moment';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import { isString } from '../../utils/type';
import createStringRules from './createStringRules';
import InputPassword from './InputPassword';
class FormString extends Component {
    // select的下拉框
    selectOptionsView(options) {
        return options.map((item, index) => {
            return React.createElement(Select.Option, { key: `${index}`, value: item.value }, item.label);
        });
    }
    render() {
        const { form, customComponent } = this.context;
        const { getFieldDecorator } = form;
        // type=object时，会判断key是否存在于required数组中
        const { root, required } = this.props;
        const { id, title, description, $required, $componentType, $readOnly, $defaultValue, $options = [], $placeholder } = root;
        const rules = createStringRules(this.props.root, required);
        const option = { rules };
        let element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        // 格式化日历的日期
        if ($componentType === 'date' && isString($defaultValue)) {
            option.initialValue = moment($defaultValue);
        }
        switch ($componentType) {
            // 文本域
            case 'textArea':
                element = getFieldDecorator(id, option)(React.createElement(Input.TextArea, { rows: 6, readOnly: $readOnly, placeholder: $placeholder }));
                break;
            // 渲染select
            case 'select':
                element = getFieldDecorator(id, option)(React.createElement(Select, { className: styleName('string-select'), placeholder: $placeholder, allowClear: !$required }, this.selectOptionsView($options)));
                break;
            // 渲染radio
            case 'radio':
                element = getFieldDecorator(id, option)(React.createElement(Radio.Group, { options: $options }));
                break;
            // 渲染日期组件
            case 'date':
                element = getFieldDecorator(id, option)(React.createElement(DatePicker, { format: "YYYY-MM-DD HH:mm:ss", showTime: true, placeholder: $placeholder }));
                break;
            // password
            case 'password':
                element = getFieldDecorator(id, option)(
                // 兼容Input.Password组件
                'Password' in Input
                    ? React.createElement(Input.Password, { readOnly: $readOnly, placeholder: $placeholder })
                    : React.createElement(InputPassword, { readOnly: $readOnly, placeholder: $placeholder }));
                break;
            // 渲染默认组件
            default:
                element = (customComponent && $componentType && $componentType in customComponent)
                    ? customComponent[$componentType](root, option, form, required)
                    : getFieldDecorator(id, option)(React.createElement(Input, { readOnly: $readOnly, placeholder: $placeholder }));
                break;
        }
        return (React.createElement(Form.Item, { label: title },
            React.createElement(Tooltip, { title: description, placement: "topRight" }, element)));
    }
}
FormString.contextType = AntdSchemaFormContext;
FormString.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormString;
