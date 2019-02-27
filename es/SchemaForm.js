var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Form } from 'antd';
import AntdSchemaFormContext from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import { isObject } from './utils/type';
import languagePack from './languagePack';
// @ts-ignore
let SchemaForm = class SchemaForm extends Component {
    constructor(props, ...argu) {
        super(props, ...argu);
        const { value } = this.props;
        // 获取系统语言
        const language = typeof window === 'object' // 服务器端渲染判断
            ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
            : 'default';
        const customLangPack = this.props.languagePack; // 自定义语言包
        const langP = isObject(customLangPack)
            ? customLangPack
            : (language in languagePack ? languagePack[language] : languagePack['default']); // 语言包
        this.state = {
            value,
            language,
            languagePack: langP
        };
    }
    componentDidMount() {
        const { value } = this.state;
        const { form } = this.props;
        const obj = getObjectFromValue(value);
        form.setFieldsValue(obj);
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            const { form, value } = nextProps;
            const obj = getObjectFromValue(value);
            form.resetFields();
            form.setFieldsValue(obj);
            return { value: nextProps.value };
        }
        return null;
    }
    render() {
        const { form, json, onOk, onCancel, okText, cancelText, footer, customComponent } = this.props;
        const { language, languagePack } = this.state;
        const contextValue = {
            form,
            customComponent,
            language,
            languagePack // 语言包
        };
        return (React.createElement(AntdSchemaFormContext.Provider, { value: contextValue },
            React.createElement(FormObject, { root: json, onOk: onOk, onCancel: onCancel, okText: okText, cancelText: cancelText, footer: footer })));
    }
};
SchemaForm.propTypes = {
    json: PropTypes.object,
    value: PropTypes.object,
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
    footer: PropTypes.func,
    customComponent: PropTypes.objectOf(PropTypes.func),
    languagePack: PropTypes.object
};
SchemaForm.defaultProps = {
    customComponent: {}
};
SchemaForm = __decorate([
    Form.create()
], SchemaForm);
export default SchemaForm;
