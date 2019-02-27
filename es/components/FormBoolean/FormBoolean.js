import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form, Tooltip, Checkbox, Switch } from 'antd';
import AntdSchemaFormContext from '../../context';
import { isSpace } from '../../utils/type';
class FormBoolean extends Component {
    constructor(props, ...argu) {
        super(props, ...argu);
        const { form } = this.context;
        const { root } = this.props;
        const id = root.id;
        const value = form.getFieldValue(id);
        this.state = {
            form,
            isChecked: isSpace(value) ? !!root.$defaultValue : value
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const { form } = prevState;
        const { root } = nextProps;
        const id = root.id;
        const value = form.getFieldValue(id);
        return { isChecked: isSpace(value) ? !!root.$defaultValue : value };
    }
    render() {
        const { form, customComponent } = this.context;
        const { getFieldDecorator } = form;
        const { root, required } = this.props;
        const { id, title, description, $componentType, $defaultValue } = root;
        const option = {};
        const { isChecked } = this.state;
        let element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        switch ($componentType) {
            case 'switch':
                element = getFieldDecorator(id, option)(React.createElement(Switch, { checked: isChecked }));
                break;
            default:
                element = (customComponent && $componentType && $componentType in customComponent)
                    ? customComponent[$componentType](root, option, form, required)
                    : getFieldDecorator(id, option)(React.createElement(Checkbox, { checked: isChecked }));
        }
        return (React.createElement(Form.Item, { label: title },
            React.createElement(Tooltip, { title: description, placement: "topRight" }, element)));
    }
}
FormBoolean.contextType = AntdSchemaFormContext;
FormBoolean.propTypes = {
    root: PropTypes.object
};
export default FormBoolean;
