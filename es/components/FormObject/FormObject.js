import * as React from 'react';
import { Component, Fragment } from 'react';
import * as PropTypes from 'prop-types';
import { Collapse, Button } from 'antd';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import OneOf from './OneOf';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';
import { isArray } from '../../utils/type';
class FormObject extends Component {
    // 根据type渲染不同的组件
    renderComponentByTypeView(root, required) {
        const { id, type } = root;
        const required2 = !!required;
        const props = { key: id, root, required: required2 };
        // 渲染oneOf
        if ('oneOf' in root && root.oneOf && isArray(root.oneOf) && root.oneOf.length > 0) {
            return this.renderOneOfComponentView(root, required2);
        }
        switch (type) {
            case 'string':
                return React.createElement(FormString, Object.assign({}, props));
            case 'integer':
            case 'number':
                return React.createElement(FormNumber, Object.assign({}, props));
            case 'boolean':
                return React.createElement(FormBoolean, Object.assign({}, props));
            case 'array':
                return React.createElement(FormArray, Object.assign({}, props));
            case 'object':
                return this.renderObjectComponentView(root);
            default:
                return null;
        }
    }
    // oneOf组件
    renderOneOfComponentView(root, required) {
        const element = [];
        (root.oneOf || []).forEach((value, index, array) => {
            const childrenRoot = Object.assign({}, value);
            for (const key in root) {
                if (!(key in childrenRoot) && !['oneOf'].includes(key)) {
                    childrenRoot[key] = root[key];
                }
            }
            element.push(this.renderComponentByTypeView(childrenRoot, required));
        });
        return React.createElement(OneOf, { key: root.id, root: root, element: element });
    }
    // 渲染一个object组件
    renderObjectComponentView(root) {
        const { id, title, description } = root;
        const required = root.required || [];
        const properties = root.properties || {};
        const element = [];
        // 判断object下组件的类型并渲染
        for (const key in properties) {
            element.push(this.renderComponentByTypeView(properties[key], required.includes(key)));
        }
        // header
        const header = [
            React.createElement("b", { key: "title" }, title || id),
            React.createElement("span", { className: styleName('object-description'), key: "description" }, description)
        ];
        return (React.createElement(Collapse, { key: id, className: styleName('object-collapse'), defaultActiveKey: [id] },
            React.createElement(Collapse.Panel, { key: id, header: header }, element)));
    }
    // ok事件
    handleOkClick(event) {
        const { form } = this.context;
        const { root, onOk } = this.props;
        const keys = getKeysFromObject(root);
        form.validateFieldsAndScroll(keys, (err, value) => {
            if (err)
                return void 0;
            const value2 = getValueFromObject(value);
            onOk && onOk(form, value2, keys);
        });
    }
    // cancel事件
    handleCancelClick(event) {
        const { form } = this.context;
        const { onCancel } = this.props;
        onCancel && onCancel(form);
    }
    // 确认和取消按钮
    footerView() {
        const { languagePack } = this.context;
        const { onOk, onCancel, okText = languagePack.formObject.okText, cancelText = languagePack.formObject.cancelText } = this.props;
        if (onOk || onCancel) {
            return (React.createElement("div", { className: styleName('object-click-button-box') },
                onOk
                    ? React.createElement(Button, { type: "primary", onClick: this.handleOkClick.bind(this) }, okText)
                    : null,
                onCancel
                    ? (React.createElement(Button, { className: onOk ? styleName('object-cancel') : undefined, onClick: this.handleCancelClick.bind(this) }, cancelText))
                    : null));
        }
        else {
            return null;
        }
    }
    render() {
        const { form } = this.context;
        const { root, footer } = this.props;
        return (React.createElement(Fragment, null,
            this.renderComponentByTypeView(root),
            footer ? footer(form) : this.footerView()));
    }
}
FormObject.contextType = AntdSchemaFormContext;
FormObject.propTypes = {
    root: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    cancelText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    footer: PropTypes.func
};
export default FormObject;
