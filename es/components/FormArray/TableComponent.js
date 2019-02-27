import * as React from 'react';
import { Component, Fragment, createRef } from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { Table, Button, Popconfirm, Drawer, Input } from 'antd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import AntdSchemaFormContext from '../../context';
import { isSpace, isBoolean, isObjectOrArray } from '../../utils/type';
import getValueFromObject, { formatValueBeforeGetValue } from '../../utils/getValueFromObject';
import getObjectFromValue from '../../utils/getObjectFromValue';
import DragableBodyRow from './DragableBodyRow';
import { formatTableValue, sortIndex } from './tableFunction';
import FormObject from '../FormObject/FormObject';
import { minErrStr, maxErrStr } from './createArrayRules';
import styleName from '../../utils/styleName';
/* 表格的className */
function tableClassName(hasErr) {
    return classNames(styleName('array-table-component'), {
        [styleName('array-table-component-has-error')]: hasErr
    });
}
class TableComponent extends Component {
    constructor() {
        super(...arguments);
        this.changeIndexRef = createRef();
        this.editIndex = null;
        this.components = {
            body: {
                row: DragableBodyRow
            }
        };
        this.state = {
            isDisplayDataDrawer: false,
            inputDisplayIndex: undefined,
            inputChangeIndex: undefined,
            selectedRowKeys: [] // 多选框
        };
        // 添加和修改数据
        this.handleAddOrEditDataClick = (value, form2, keys) => {
            const { form } = this.context;
            const { root } = this.props;
            const id = root.id;
            // 获取需要验证和获取值的key
            const value2 = form.getFieldsValue(keys);
            const formatValue = formatValueBeforeGetValue(value2, id);
            const result = getValueFromObject(formatValue);
            let tableValue = form.getFieldValue(id);
            tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
            // 判断是修改还是添加
            if (this.editIndex === null) {
                tableValue.push(result['items']);
            }
            else {
                tableValue[this.editIndex] = result['items'];
            }
            form.setFieldsValue({ [id]: tableValue });
            // 重置状态
            if (this.editIndex === null) {
                form.resetFields(keys);
            }
            else {
                this.editIndex = null;
                this.setState({ isDisplayDataDrawer: false });
            }
        };
    }
    // 编辑位置框修改位置
    handleInputDisplayClick(index, event) {
        this.setState({
            inputDisplayIndex: index,
            inputChangeIndex: String(index + 1)
        }, () => {
            if (this.changeIndexRef.current) {
                this.changeIndexRef.current.focus();
            }
        });
    }
    // 编辑位置框数据修改
    handleIndexInputChange(event) {
        this.setState({
            inputChangeIndex: event.target.value
        });
    }
    // 编辑位置框失去焦点
    handleIndexInputBlur(index, event) {
        const { form } = this.context;
        const { root } = this.props;
        const id = root.id;
        let tableValue = form.getFieldValue(id);
        tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        const length = tableValue.length;
        const { inputChangeIndex } = this.state;
        let newIndex = Number(inputChangeIndex) - 1;
        if (inputChangeIndex && newIndex !== index && /^[0-9]+$/.test(inputChangeIndex)) {
            if (newIndex < 0)
                newIndex = 0;
            if (newIndex > length)
                newIndex = length;
            const item = tableValue[index];
            const newData = update({ tableValue }, {
                tableValue: {
                    $splice: [[index, 1], [newIndex, 0, item]]
                }
            });
            form.setFieldsValue({ [id]: newData.tableValue });
        }
        this.setState({
            inputDisplayIndex: undefined,
            inputChangeIndex: undefined
        });
    }
    // 拖拽
    moveRow(dragIndex, hoverIndex) {
        const { form } = this.context;
        const { root } = this.props;
        const id = root.id;
        let tableValue = form.getFieldValue(id);
        tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        const dragRowItem = tableValue[dragIndex];
        const newData = update({ tableValue }, {
            tableValue: {
                $splice: [[dragIndex, 1], [hoverIndex, 0, dragRowItem]]
            }
        });
        form.setFieldsValue({ [id]: newData.tableValue });
    }
    // 删除数据
    handleDeleteDataClick(index, event) {
        const { form } = this.context;
        const { root } = this.props;
        const id = root.id;
        let tableValue = form.getFieldValue(id);
        tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        tableValue.splice(index, 1);
        form.setFieldsValue({ [id]: tableValue });
    }
    // 修改数据抽屉的显示
    handleDrawEditDataDisplayClick(index, event) {
        const { form } = this.context;
        const { root } = this.props;
        const id = root.id;
        let tableValue = form.getFieldValue(id);
        tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        const itemValue = tableValue[index];
        const result = getObjectFromValue({ items: itemValue }, id);
        this.editIndex = index;
        this.setState({
            isDisplayDataDrawer: true
        }, () => form.setFieldsValue(result));
    }
    // 抽屉的显示和隐藏
    handleDrawerDisplayClick(key, value, eventOrObject) {
        this.setState({
            [key]: value
        });
    }
    // 表格的单选和多选
    handleColumnCheckboxChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys
        });
    }
    // 删除选中的数据
    handleDeleteSelectDataClick(event) {
        const { form } = this.context;
        const { root } = this.props;
        const { selectedRowKeys } = this.state;
        const id = root.id;
        let tableValue = form.getFieldValue(id);
        tableValue = isSpace(tableValue) ? (root.$defaultValue || []) : tableValue;
        // 删除选中的数据
        const sortSelectedRowKeys = sortIndex(selectedRowKeys);
        for (const item of sortSelectedRowKeys)
            tableValue.splice(item, 1);
        form.setFieldsValue({ [id]: tableValue });
        this.setState({ selectedRowKeys: [] });
    }
    // columns
    columns() {
        const { languagePack } = this.context;
        const { items } = this.props.root;
        const { inputDisplayIndex, inputChangeIndex } = this.state;
        const { type, properties, title } = items;
        const columnArr = [];
        // 渲染调整数组位置的编辑框
        columnArr.push({
            title: '',
            key: 'lineNumber',
            align: 'center',
            width: 65,
            render: (value, item, index) => {
                if (inputDisplayIndex === undefined || inputDisplayIndex !== index) {
                    return React.createElement("a", { onClick: this.handleInputDisplayClick.bind(this, index) }, index + 1);
                }
                else {
                    return (React.createElement(Input, { ref: this.changeIndexRef, value: inputChangeIndex, onChange: this.handleIndexInputChange.bind(this), onBlur: this.handleIndexInputBlur.bind(this, index), onPressEnter: this.handleIndexInputBlur.bind(this, index) }));
                }
            }
        });
        // 渲染函数
        const renderCb = (value, item, index) => {
            if (isBoolean(value)) {
                return String(value);
            }
            else if (isObjectOrArray(value)) {
                return Object.prototype.toString.call(value);
            }
            else {
                return value;
            }
        };
        if (type === 'object') {
            for (const key in properties) {
                const item = properties[key];
                columnArr.push({
                    title: item['title'],
                    key,
                    dataIndex: key,
                    render: renderCb
                });
            }
        }
        else {
            columnArr.push({
                title,
                key: 'value',
                dataIndex: 'value',
                render: renderCb
            });
        }
        columnArr.push({
            title: languagePack && languagePack.formArray.operating,
            key: 'handle',
            width: 160,
            render: (value, item, index) => {
                return (React.createElement(Button.Group, null,
                    React.createElement(Button, { onClick: this.handleDrawEditDataDisplayClick.bind(this, index) }, languagePack.formArray.operatingEdit),
                    React.createElement(Popconfirm, { title: languagePack.formArray.operatingPopconfirmTitle, onConfirm: this.handleDeleteDataClick.bind(this, index) },
                        React.createElement(Button, { type: "danger" }, languagePack.formArray.operatingDelete))));
            }
        });
        return columnArr;
    }
    render() {
        const { root } = this.props;
        const { form, languagePack } = this.context;
        const { id, items, minItems, maxItems, $minItemsMessage, $maxItemsMessage } = root;
        const { isDisplayDataDrawer, selectedRowKeys, inputDisplayIndex } = this.state;
        const inputNotDisplay = isSpace(inputDisplayIndex);
        let value = form.getFieldValue(id);
        value = isSpace(value) ? (root.$defaultValue || []) : value;
        // 对数组内的元素数量进行验证
        let arrayRulesVerificationResult = null;
        if (minItems !== undefined && value.length < minItems) {
            arrayRulesVerificationResult = $minItemsMessage || `${minErrStr}${minItems}`;
        }
        if (maxItems !== undefined && value.length > maxItems) {
            arrayRulesVerificationResult = $maxItemsMessage || `${maxErrStr}${maxItems}`;
        }
        return (React.createElement(Fragment, null,
            React.createElement(Table, { className: tableClassName(arrayRulesVerificationResult !== null), size: "middle", dataSource: items.type === 'object' ? value : formatTableValue(value), columns: this.columns(), bordered: true, title: () => [
                    React.createElement(Button, { key: "add", type: "primary", icon: "plus-circle", onClick: this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', true) }, languagePack.formArray.operatingAdd),
                    React.createElement(Popconfirm, { key: "delete", title: languagePack.formArray.deleteSelectedText, onConfirm: this.handleDeleteSelectDataClick.bind(this) },
                        React.createElement(Button, { className: styleName('array-deleteAll'), type: "danger", icon: "delete" }, languagePack.formArray.deleteSelected))
                ], rowKey: (item, index) => `${index}`, rowSelection: {
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: this.handleColumnCheckboxChange.bind(this)
                }, components: inputNotDisplay ? this.components : undefined, onRow: inputNotDisplay
                    ? (item, index) => ({ index, moverow: this.moveRow.bind(this) })
                    : undefined, pagination: false }),
            React.createElement("p", { className: styleName('array-table-rules-verification-str') }, arrayRulesVerificationResult),
            React.createElement(Drawer, { width: "100%", visible: isDisplayDataDrawer, destroyOnClose: true, closable: false },
                React.createElement(FormObject, { root: items, onOk: this.handleAddOrEditDataClick, onCancel: this.handleDrawerDisplayClick.bind(this, 'isDisplayDataDrawer', false) }))));
    }
}
TableComponent.contextType = AntdSchemaFormContext;
TableComponent.propTypes = {
    root: PropTypes.object
};
export default DragDropContext(HTML5Backend)(TableComponent);
