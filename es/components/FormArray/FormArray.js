import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip, Select, Checkbox } from 'antd';
import AntdSchemaFormContext from '../../context';
import TableComponent from './TableComponent';
import styleName from '../../utils/styleName';
import createArrayRules from './createArrayRules';
class FormArray extends Component {
    // select的下拉框
    selectOptionsView(options) {
        return options.map((item, index) => {
            return React.createElement(Select.Option, { key: `${index}`, value: item.value }, item.label);
        });
    }
    render() {
        const { form, customComponent } = this.context;
        const { getFieldDecorator, 
        // @ts-ignore: rc-form
        getFieldProps } = form;
        const { root, required } = this.props;
        const { id, title, description, $componentType, $defaultValue, $options = [] } = root;
        const rules = createArrayRules(root, required);
        const option = { rules };
        let isTableComponent = false; // 判断是否为table组件
        let element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        switch ($componentType) {
            case 'checkbox':
                element = getFieldDecorator(id, option)(React.createElement(Checkbox.Group, { options: $options }));
                break;
            case 'multiple':
            case 'tags':
                element = getFieldDecorator(id, option)(React.createElement(Select, { className: styleName('array-multiple'), mode: $componentType }, this.selectOptionsView($options)));
                break;
            default:
                if (customComponent && $componentType && $componentType in customComponent) {
                    element = customComponent[$componentType](root, option, form, required);
                }
                else {
                    element = React.createElement(TableComponent, Object.assign({ root: root }, getFieldProps(id, option)));
                    isTableComponent = true;
                }
        }
        return (React.createElement(Form.Item, { className: isTableComponent ? styleName('array-table-form-item') : undefined, label: title },
            React.createElement(Tooltip, { title: description, placement: "topRight" }, element)));
    }
}
FormArray.contextType = AntdSchemaFormContext;
FormArray.propTypes = {
    root: PropTypes.object,
    required: PropTypes.bool
};
export default FormArray;
