"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var antd_1 = require("antd");
var context_1 = require("../../context");
var styleName_1 = require("../../utils/styleName");
var FormString_1 = require("../FormString/FormString");
var FormNumber_1 = require("../FormNumber/FormNumber");
var FormBoolean_1 = require("../FormBoolean/FormBoolean");
var FormArray_1 = require("../FormArray/FormArray");
var OneOf_1 = require("./OneOf");
var getValueFromObject_1 = require("../../utils/getValueFromObject");
var getKeysFromObject_1 = require("../../utils/getKeysFromObject");
var type_1 = require("../../utils/type");
var FormObject = /** @class */ (function (_super) {
    __extends(FormObject, _super);
    function FormObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 根据type渲染不同的组件
    FormObject.prototype.renderComponentByTypeView = function (root, required) {
        var id = root.id, type = root.type;
        var required2 = !!required;
        var props = { key: id, root: root, required: required2 };
        // 渲染oneOf
        if ('oneOf' in root && root.oneOf && type_1.isArray(root.oneOf) && root.oneOf.length > 0) {
            return this.renderOneOfComponentView(root, required2);
        }
        switch (type) {
            case 'string':
                return React.createElement(FormString_1.default, __assign({}, props));
            case 'integer':
            case 'number':
                return React.createElement(FormNumber_1.default, __assign({}, props));
            case 'boolean':
                return React.createElement(FormBoolean_1.default, __assign({}, props));
            case 'array':
                return React.createElement(FormArray_1.default, __assign({}, props));
            case 'object':
                return this.renderObjectComponentView(root);
            default:
                return null;
        }
    };
    // oneOf组件
    FormObject.prototype.renderOneOfComponentView = function (root, required) {
        var _this = this;
        var element = [];
        (root.oneOf || []).forEach(function (value, index, array) {
            var childrenRoot = __assign({}, value);
            for (var key in root) {
                if (!(key in childrenRoot) && !['oneOf'].includes(key)) {
                    childrenRoot[key] = root[key];
                }
            }
            element.push(_this.renderComponentByTypeView(childrenRoot, required));
        });
        return React.createElement(OneOf_1.default, { key: root.id, root: root, element: element });
    };
    // 渲染一个object组件
    FormObject.prototype.renderObjectComponentView = function (root) {
        var id = root.id, title = root.title, description = root.description;
        var required = root.required || [];
        var properties = root.properties || {};
        var element = [];
        // 判断object下组件的类型并渲染
        for (var key in properties) {
            element.push(this.renderComponentByTypeView(properties[key], required.includes(key)));
        }
        // header
        var header = [
            React.createElement("b", { key: "title" }, title || id),
            React.createElement("span", { className: styleName_1.default('object-description'), key: "description" }, description)
        ];
        return (React.createElement(antd_1.Collapse, { key: id, className: styleName_1.default('object-collapse'), defaultActiveKey: [id] },
            React.createElement(antd_1.Collapse.Panel, { key: id, header: header }, element)));
    };
    // ok事件
    FormObject.prototype.handleOkClick = function (event) {
        var form = this.context.form;
        var _a = this.props, root = _a.root, onOk = _a.onOk;
        var keys = getKeysFromObject_1.default(root);
        form.validateFieldsAndScroll(keys, function (err, value) {
            if (err)
                return void 0;
            var value2 = getValueFromObject_1.default(value);
            onOk && onOk(form, value2, keys);
        });
    };
    // cancel事件
    FormObject.prototype.handleCancelClick = function (event) {
        var form = this.context.form;
        var onCancel = this.props.onCancel;
        onCancel && onCancel(form);
    };
    // 确认和取消按钮
    FormObject.prototype.footerView = function () {
        var languagePack = this.context.languagePack;
        var _a = this.props, onOk = _a.onOk, onCancel = _a.onCancel, _b = _a.okText, okText = _b === void 0 ? languagePack.formObject.okText : _b, _c = _a.cancelText, cancelText = _c === void 0 ? languagePack.formObject.cancelText : _c;
        if (onOk || onCancel) {
            return (React.createElement("div", { className: styleName_1.default('object-click-button-box') },
                onOk
                    ? React.createElement(antd_1.Button, { type: "primary", onClick: this.handleOkClick.bind(this) }, okText)
                    : null,
                onCancel
                    ? (React.createElement(antd_1.Button, { className: onOk ? styleName_1.default('object-cancel') : undefined, onClick: this.handleCancelClick.bind(this) }, cancelText))
                    : null));
        }
        else {
            return null;
        }
    };
    FormObject.prototype.render = function () {
        var form = this.context.form;
        var _a = this.props, root = _a.root, footer = _a.footer;
        return (React.createElement(react_1.Fragment, null,
            this.renderComponentByTypeView(root),
            footer ? footer(form) : this.footerView()));
    };
    FormObject.contextType = context_1.default;
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
    return FormObject;
}(react_1.Component));
exports.default = FormObject;
