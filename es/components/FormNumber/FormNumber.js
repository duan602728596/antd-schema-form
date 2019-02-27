import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip, InputNumber, Radio } from 'antd';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import createNumberRules from './createNumberRules';
class FormNumber extends Component {
    render() {
        const { form, customComponent } = this.context;
        const { getFieldDecorator } = form;
        // type=object时，会判断key是否存在于required数组中
        const { root, required } = this.props;
        const { id, type, title, description, $componentType, $readOnly, $defaultValue, $options = [], $placeholder } = root;
        const rules = createNumberRules(this.props.root, required, type === 'integer');
        const option = { rules };
        let element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        switch ($componentType) {
            // 渲染radio
            case 'radio':
                element = getFieldDecorator(id, option)(React.createElement(Radio.Group, { options: $options }));
                break;
            default:
                element = (customComponent && $componentType && $componentType in customComponent)
                    ? customComponent[$componentType](root, option, form, required)
                    : getFieldDecorator(id, option)(React.createElement(InputNumber, { className: styleName('number-input'), readOnly: $readOnly, placeholder: $placeholder }));
        }
        return (React.createElement(Form.Item, { label: title },
            React.createElement(Tooltip, { title: description, placement: "topRight" }, element)));
    }
}
FormNumber.contextType = AntdSchemaFormContext;
FormNumber.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormNumber;
