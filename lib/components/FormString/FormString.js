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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var PropTypes = require("prop-types");
var antd_1 = require("antd");
var moment = require("moment");
var context_1 = require("../../context");
var styleName_1 = require("../../utils/styleName");
var type_1 = require("../../utils/type");
var createStringRules_1 = require("./createStringRules");
var InputPassword_1 = require("./InputPassword");
var FormString = /** @class */ (function (_super) {
    __extends(FormString, _super);
    function FormString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // select的下拉框
    FormString.prototype.selectOptionsView = function (options) {
        return options.map(function (item, index) {
            return React.createElement(antd_1.Select.Option, { key: "" + index, value: item.value }, item.label);
        });
    };
    FormString.prototype.render = function () {
        var _a = this.context, form = _a.form, customComponent = _a.customComponent;
        var getFieldDecorator = form.getFieldDecorator;
        // type=object时，会判断key是否存在于required数组中
        var _b = this.props, root = _b.root, required = _b.required;
        var id = root.id, title = root.title, description = root.description, $required = root.$required, $componentType = root.$componentType, $readOnly = root.$readOnly, $defaultValue = root.$defaultValue, _c = root.$options, $options = _c === void 0 ? [] : _c, $placeholder = root.$placeholder;
        var rules = createStringRules_1.default(this.props.root, required);
        var option = { rules: rules };
        var element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        // 格式化日历的日期
        if ($componentType === 'date' && type_1.isString($defaultValue)) {
            option.initialValue = moment($defaultValue);
        }
        switch ($componentType) {
            // 文本域
            case 'textArea':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Input.TextArea, { rows: 6, readOnly: $readOnly, placeholder: $placeholder }));
                break;
            // 渲染select
            case 'select':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Select, { className: styleName_1.default('string-select'), placeholder: $placeholder, allowClear: !$required }, this.selectOptionsView($options)));
                break;
            // 渲染radio
            case 'radio':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Radio.Group, { options: $options }));
                break;
            // 渲染日期组件
            case 'date':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.DatePicker, { format: "YYYY-MM-DD HH:mm:ss", showTime: true, placeholder: $placeholder }));
                break;
            // password
            case 'password':
                element = getFieldDecorator(id, option)(
                // 兼容Input.Password组件
                'Password' in antd_1.Input
                    ? React.createElement(antd_1.Input.Password, { readOnly: $readOnly, placeholder: $placeholder })
                    : React.createElement(InputPassword_1.default, { readOnly: $readOnly, placeholder: $placeholder }));
                break;
            // 渲染默认组件
            default:
                element = (customComponent && $componentType && $componentType in customComponent)
                    ? customComponent[$componentType](root, option, form, required)
                    : getFieldDecorator(id, option)(React.createElement(antd_1.Input, { readOnly: $readOnly, placeholder: $placeholder }));
                break;
        }
        return (React.createElement(antd_1.Form.Item, { label: title },
            React.createElement(antd_1.Tooltip, { title: description, placement: "topRight" }, element)));
    };
    FormString.contextType = context_1.default;
    FormString.propTypes = {
        root: PropTypes.object,
        required: PropTypes.bool
    };
    return FormString;
}(react_1.Component));
exports.default = FormString;
