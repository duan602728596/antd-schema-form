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
var classnames_1 = require("classnames");
var antd_1 = require("antd");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var immutability_helper_1 = require("immutability-helper");
var context_1 = require("../../context");
var type_1 = require("../../utils/type");
var getValueFromObject_1 = require("../../utils/getValueFromObject");
var getObjectFromValue_1 = require("../../utils/getObjectFromValue");
var DragableBodyRow_1 = require("./DragableBodyRow");
var tableFunction_1 = require("./tableFunction");
var FormObject_1 = require("../FormObject/FormObject");
var createArrayRules_1 = require("./createArrayRules");
var styleName_1 = require("../../utils/styleName");
/* 表格的className */
function tableClassName(hasErr) {
    var _a;
    return classnames_1.default(styleName_1.default('array-table-component'), (_a = {},
        _a[styleName_1.default('array-table-component-has-error')] = hasErr,
        _a));
}
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.changeIndexRef = react_1.createRef();
        _this.editIndex = null;
        _this.components = {
            body: {
                row: DragableBodyRow_1.default
            }
        };
        _this.state = {
            isDisplayDataDrawer: false,
            inputDisplayIndex: undefined,
            inputChangeIndex: undefined,
            selectedRowKeys: [] // 多选框
        };
        // 添加和修改数据
        _this.handleAddOrEditDataClick = function (value, form2, keys) {
            var _a;
            var form = _this.context.form;
            var root = _this.props.root;
            var id = root.id;
            // 获取需要验证和获取值的key
            var value2 = form.getFieldsValue(keys);
            var formatValue = getValueFromObject_1.formatValueBeforeGetValue(value2, id);
            var result = getValueFromObject_1.default(formatValue);
            var tableValue = form.getFieldValue(id);
            tableValue = type_1.isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
            // 判断是修改还是添加
            if (_this.editIndex === null) {
                tableValue.push(result['items']);
            }
            else {
                tableValue[_this.editIndex] = result['items'];
            }
            form.setFieldsValue((_a = {}, _a[id] = tableValue, _a));
            // 重置状态
            if (_this.editIndex === null) {
                form.resetFields(keys);
            }
            else {
                _this.editIndex = null;
                _this.setState({ isDisplayDataDrawer: false });
            }
        };
        return _this;
    }
    // 编辑位置框修改位置
    TableComponent.prototype.handleInputDisplayClick = function (index, event) {
        var _this = this;
        this.setState({
            inputDisplayIndex: index,
            inputChangeIndex: String(index + 1)
        }, function () {
            if (_this.changeIndexRef.current) {
                _this.changeIndexRef.current.focus();
            }
        });
    };
    // 编辑位置框数据修改
    TableComponent.prototype.handleIndexInputChange = function (event) {
        this.setState({
            inputChangeIndex: event.target.value
        });
    };
    // 编辑位置框失去焦点
    TableComponent.prototype.handleIndexInputBlur = function (index, event) {
        var _a;
        var form = this.context.form;
        var root = this.props.root;
        var id = root.id;
        var tableValue = form.getFieldValue(id);
        tableValue = type_1.isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        var length = tableValue.length;
        var inputChangeIndex = this.state.inputChangeIndex;
        var newIndex = Number(inputChangeIndex) - 1;
        if (inputChangeIndex && newIndex !== index && /^[0-9]+$/.test(inputChangeIndex)) {
            if (newIndex < 0)
                newIndex = 0;
            if (newIndex > length)
                newIndex = length;
            var item = tableValue[index];
            var newData = immutability_helper_1.default({ tableValue: tableValue }, {
                tableValue: {
                    $splice: [[index, 1], [newIndex, 0, item]]
                }
            });
            form.setFieldsValue((_a = {}, _a[id] = newData.tableValue, _a));
        }
        this.setState({
            inputDisplayIndex: undefined,
            inputChangeIndex: undefined
        });
    };
    // 拖拽
    TableComponent.prototype.moveRow = function (dragIndex, hoverIndex) {
        var _a;
        var form = this.context.form;
        var root = this.props.root;
        var id = root.id;
        var tableValue = form.getFieldValue(id);
        tableValue = type_1.isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        var dragRowItem = tableValue[dragIndex];
        var newData = immutability_helper_1.default({ tableValue: tableValue }, {
            tableValue: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowItem]]
            }
        });
        form.setFieldsValue((_a = {}, _a[id] = newData.tableValue, _a));
    };
    // 删除数据
    TableComponent.prototype.handleDeleteDataClick = function (index, event) {
        var _a;
        var form = this.context.form;
        var root = this.props.root;
        var id = root.id;
        var tableValue = form.getFieldValue(id);
        tableValue = type_1.isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        tableValue.splice(index, 1);
        form.setFieldsValue((_a = {}, _a[id] = tableValue, _a));
    };
    // 修改数据抽屉的显示
    TableComponent.prototype.handleDrawEditDataDisplayClick = function (index, event) {
        var form = this.context.form;
        var root = this.props.root;
        var id = root.id;
        var tableValue = form.getFieldValue(id);
        tableValue = type_1.isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        var itemValue = tableValue[index];
        var result = getObjectFromValue_1.default({ items: itemValue }, id);
        this.editIndex = index;
        this.setState({
            isDisplayDataDrawer: true
        }, function () { return form.setFieldsValue(result); });
    };
    // 抽屉的显示和隐藏
    TableComponent.prototype.handleDrawerDisplayClick = function (key, value, eventOrObject) {
        var _a;
        this.setState((_a = {},
            _a[key] = value,
            _a));
    };
    // 表格的单选和多选
    TableComponent.prototype.handleColumnCheckboxChange = function (selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys: selectedRowKeys
        });
    };
    // 删除选中的数据
    TableComponent.prototype.handleDeleteSelectDataClick = function (event) {
        var _a;
        var form = this.context.form;
        var root = this.props.root;
        var selectedRowKeys = this.state.selectedRowKeys;
        var id = root.id;
        var tableValue = form.getFieldValue(id);
        tableValue = type_1.isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        // 删除选中的数据
        var sortSelectedRowKeys = tableFunction_1.sortIndex(selectedRowKeys);
        for (var _i = 0, sortSelectedRowKeys_1 = sortSelectedRowKeys; _i < sortSelectedRowKeys_1.length; _i++) {
            var item = sortSelectedRowKeys_1[_i];
            tableValue.splice(item, 1);
        }
        form.setFieldsValue((_a = {}, _a[id] = tableValue, _a));
        this.setState({ selectedRowKeys: [] });
    };
    // columns
    TableComponent.prototype.columns = function () {
        var _this = this;
        var languagePack = this.context.languagePack;
        var items = this.props.root.items;
        var _a = this.state, inputDisplayIndex = _a.inputDisplayIndex, inputChangeIndex = _a.inputChangeIndex;
        var type = items.type, properties = items.properties, title = items.title;
        var columnArr = [];
        // 渲染调整数组位置的编辑框
        columnArr.push({
            title: '',
            key: 'lineNumber',
            align: 'center',
            width: 65,
            render: function (value, item, index) {
                if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
                    return React.createElement("a", { onClick: _this.handleInputDisplayClick.bind(_this, index) }, index + 1);
                }
                else {
                    return (React.createElement(antd_1.Input, { ref: _this.changeIndexRef, value: inputChangeIndex, onChange: _this.handleIndexInputChange.bind(_this), onBlur: _this.handleIndexInputBlur.bind(_this, index), onPressEnter: _this.handleIndexInputBlur.bind(_this, index) }));
                }
            }
        });
        // 渲染函数
        var renderCb = function (value, item, index) {
            if (type_1.isBoolean(value)) {
                return String(value);
            }
            else if (type_1.isObjectOrArray(value)) {
                return Object.prototype.toString.call(value);
            }
            else {
                return value;
            }
        };
        if (type === 'object') {
            for (var key in properties) {
                var item = properties[key];
                columnArr.push({
                    title: item['title'],
                    key: key,
                    dataIndex: key,
                    render: renderCb
                });
            }
        }
        else {
            columnArr.push({
                title: title,
                key: 'value',
                dataIndex: 'value',
                render: renderCb
            });
        }
        columnArr.push({
            title: languagePack && languagePack.formArray.operating,
            key: 'handle',
            width: 160,
            render: function (value, item, index) {
                return (React.createElement(antd_1.Button.Group, null,
                    React.createElement(antd_1.Button, { onClick: _this.handleDrawEditDataDisplayClick.bind(_this, index) }, languagePack.formArray.operatingEdit),
                    React.createElement(antd_1.Popconfirm, { title: languagePack.formArray.operatingPopconfirmTitle, onConfirm: _this.handleDeleteDataClick.bind(_this, index) },
                        React.createElement(antd_1.Button, { type: "danger" }, languagePack.formArray.operatingDelete))));
            }
        });
        return columnArr;
    };
    TableComponent.prototype.render = function () {
        var _this = this;
        var root = this.props.root;
        var _a = this.context, form = _a.form, languagePack = _a.languagePack;
        var id = root.id, items = root.items, minItems = root.minItems, maxItems = root.maxItems, $minItemsMessage = root.$minItemsMessage, $maxItemsMessage = root.$maxItemsMessage;
        var _b = this.state, isDisplayDataDrawer = _b.isDisplayDataDrawer, selectedRowKeys = _b.selectedRowKeys, inputDisplayIndex = _b.inputDisplayIndex;
        var inputNotDisplay = type_1.isSpace(inputDisplayIndex);
        var value = form.getFieldValue(id);
        value = type_1.isSpace(value) ? (root.$defaultValue || []) : value;
        // 对数组内的元素数量进行验证
        var arrayRulesVerificationResult = null;
        if (minItems !== undefined && value.length < minItems) {
            arrayRulesVerificationResult = $minItemsMessage || "" + createArrayRules_1.minErrStr + minItems;
        }
        if (maxItems !== undefined && value.length > maxItems) {
            arrayRulesVerificationResult = $maxItemsMessage || "" + createArrayRules_1.maxErrStr + maxItems;
        }
        return (React.createElement(react_1.Fragment, null,
            React.createElement(antd_1.Table, { className: tableClassName(arrayRulesVerificationResult !== null), size: "middle", dataSource: items.type === 'object' ? value : tableFunction_1.formatTableValue(value), columns: this.columns(), bordered: true, title: function () { return [
                    React.createElement(antd_1.Button, { key: "add", type: "primary", icon: "plus-circle", onClick: _this.handleDrawerDisplayClick.bind(_this, 'isDisplayDataDrawer', true) }, languagePack.formArray.operatingAdd),
                    React.createElement(antd_1.Popconfirm, { key: "delete", title: languagePack.formArray.deleteSelectedText, onConfirm: _this.handleDeleteSelectDataClick.bind(_this) },
                        React.createElement(antd_1.Button, { className: styleName_1.default('array-deleteAll'), type: "danger", icon: "delete" }, languagePack.formArray.deleteSelected))
                ]; }, rowKey: function (item, index) { return "" + index; }, rowSelection: {
                    type: 'checkbox',
                    selectedRowKeys: selectedRowKeys,
                    onChange: this.handleColumnCheckboxChange.bind(this)
                }, components: inputNotDisplay ? this.components : undefined, onRow: inputNotDisplay
                    ? function (item, index) { return ({ index: index, moverow: _this.moveRow.bind(_this) }); }
                    : undefined, pagination: false }),
            React.createElement("p", { className: styleName_1.default('array-table-rules-verification-str') }, arrayRulesVerificationResult),
            React.createElement(antd_1.Drawer, { width: "100%", visible: isDisplayDataDrawer, destroyOnClose: true, closable: false },
                React.createElement(FormObject_1.default, { root: items, onOk: this.handleAddOrEditDataClick, onCancel: this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', false) }))));
    };
    TableComponent.contextType = context_1.default;
    TableComponent.propTypes = {
        root: PropTypes.object
    };
    return TableComponent;
}(react_1.Component));
exports.default = react_dnd_1.DragDropContext(react_dnd_html5_backend_1.default)(TableComponent);
