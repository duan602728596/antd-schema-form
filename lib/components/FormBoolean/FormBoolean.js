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
var context_1 = require("../../context");
var type_1 = require("../../utils/type");
var FormBoolean = /** @class */ (function (_super) {
    __extends(FormBoolean, _super);
    function FormBoolean(props) {
        var argu = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argu[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, [props].concat(argu)) || this;
        var form = _this.context.form;
        var root = _this.props.root;
        var id = root.id;
        var value = form.getFieldValue(id);
        _this.state = {
            form: form,
            isChecked: type_1.isSpace(value) ? !!root.$defaultValue : value
        };
        return _this;
    }
    FormBoolean.getDerivedStateFromProps = function (nextProps, prevState) {
        var form = prevState.form;
        var root = nextProps.root;
        var id = root.id;
        var value = form.getFieldValue(id);
        return { isChecked: type_1.isSpace(value) ? !!root.$defaultValue : value };
    };
    FormBoolean.prototype.render = function () {
        var _a = this.context, form = _a.form, customComponent = _a.customComponent;
        var getFieldDecorator = form.getFieldDecorator;
        var _b = this.props, root = _b.root, required = _b.required;
        var id = root.id, title = root.title, description = root.description, $componentType = root.$componentType, $defaultValue = root.$defaultValue;
        var option = {};
        var isChecked = this.state.isChecked;
        var element = null;
        // 表单默认值
        if ($defaultValue)
            option.initialValue = $defaultValue;
        switch ($componentType) {
            case 'switch':
                element = getFieldDecorator(id, option)(React.createElement(antd_1.Switch, { checked: isChecked }));
                break;
            default:
                element = (customComponent && $componentType && $componentType in customComponent)
                    ? customComponent[$componentType](root, option, form, required)
                    : getFieldDecorator(id, option)(React.createElement(antd_1.Checkbox, { checked: isChecked }));
        }
        return (React.createElement(antd_1.Form.Item, { label: title },
            React.createElement(antd_1.Tooltip, { title: description, placement: "topRight" }, element)));
    };
    FormBoolean.contextType = context_1.default;
    FormBoolean.propTypes = {
        root: PropTypes.object
    };
    return FormBoolean;
}(react_1.Component));
exports.default = FormBoolean;
