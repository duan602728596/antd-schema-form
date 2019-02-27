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
var OneOf = /** @class */ (function (_super) {
    __extends(OneOf, _super);
    function OneOf(props) {
        var argu = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argu[_i - 1] = arguments[_i];
        }
        var _this = _super.apply(this, [props].concat(argu)) || this;
        var root = _this.props.root;
        _this.state = {
            root: root,
            index: type_1.isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0 // oneOf选项卡的index
        };
        return _this;
    }
    OneOf.getDerivedStateFromProps = function (nextProps, prevState) {
        if (nextProps.root !== prevState.root) {
            var root = nextProps.root;
            return {
                index: type_1.isNumber(root.$oneOfIndex) ? root.$oneOfIndex : 0
            };
        }
        return null;
    };
    // 切换指定index
    OneOf.prototype.handleDesignationIndexChange = function (event) {
        var index = this.state.index;
        this.switchCallback(event.target.value, index);
    };
    // 切换的callback
    OneOf.prototype.switchCallback = function (newIndex, oldIndex) {
        var root = this.props.root;
        var form = this.context.form;
        var oneOf = root.oneOf;
        // 这个情况是type="string"时，下一个控件是date，因为moment的关系，所以要清空组件的值，最好尽量避免这种情况
        if (oneOf
            && oneOf[newIndex].type === 'string' && oneOf[oldIndex].type === 'string' // 新旧组件都为string
            && ((oneOf[oldIndex].$componentType !== 'date' && oneOf[newIndex].$componentType === 'date') // 判断是否为date组件
                || (oneOf[oldIndex].$componentType === 'date' && oneOf[newIndex].$componentType !== 'date'))) {
            form.resetFields([root.id]);
        }
        this.setState({ index: newIndex });
    };
    // 渲染radio
    OneOf.prototype.radioGroupView = function (root, index) {
        var options = [];
        var oneOf = root.oneOf || [];
        for (var i = 0, j = oneOf.length; i < j; i++) {
            var item = oneOf[i];
            options.push({
                label: item.title,
                value: i
            });
        }
        return (React.createElement(antd_1.Radio.Group, { key: "radio-group", size: "small", options: options, value: index, onChange: this.handleDesignationIndexChange.bind(this) }));
    };
    OneOf.prototype.render = function () {
        var _a = this.props, element = _a.element, root = _a.root;
        var index = this.state.index;
        return [
            this.radioGroupView(root, index),
            element[index]
        ];
    };
    OneOf.contextType = context_1.default;
    OneOf.propTypes = {
        root: PropTypes.object,
        element: PropTypes.arrayOf(PropTypes.node)
    };
    return OneOf;
}(react_1.Component));
exports.default = OneOf;
