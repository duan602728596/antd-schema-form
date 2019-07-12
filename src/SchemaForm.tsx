import * as React from 'react';
import { useEffect, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import isPlainObject from 'lodash-es/isPlainObject';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import AntdSchemaFormContext from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import languagePack from './languagePack';
import { SchemaItem, ContextValue } from './types';

export interface SchemaFormProps extends FormComponentProps {
  json: SchemaItem;
  value?: any;
  onOk?: Function;
  onCancel?: Function;
  okText?: string | number;
  cancelText?: string | number;
  footer?: Function;
  customComponent?: {
    [key: string]: Function;
  };
  customTableRender?: object;
  languagePack?: object;
}

function SchemaForm(props: PropsWithChildren<SchemaFormProps>): React.ReactElement | null {
  const {
    value: schemaFormValue,
    form,
    json,
    onOk,
    onCancel,
    okText,
    cancelText,
    footer,
    customComponent,
    customTableRender
  }: SchemaFormProps = props;
  // 获取系统语言
  const language: string = typeof window === 'object' // 服务器端渲染判断
    ? (window.navigator.language || window.navigator['userLanguage']).toLocaleLowerCase()
    : 'default';
  const customLangPack: object | undefined = props.languagePack; // 自定义语言包
  const langP: object = isPlainObject(customLangPack)
    ? customLangPack
    : (language in languagePack ? languagePack[language] : languagePack['default']); // 语言包

  const contextValue: ContextValue = {
    form,
    customComponent,
    customTableRender,
    language,           // 系统语言
    languagePack: langP // 语言包
  };

  useEffect(function(): void {
    const obj: object = getObjectFromValue(schemaFormValue);

    form.resetFields();
    form.setFieldsValue(obj);
  }, [schemaFormValue]);

  return (
    <AntdSchemaFormContext.Provider value={ contextValue }>
      <FormObject root={ json }
        onOk={ onOk }
        onCancel={ onCancel }
        okText={ okText }
        cancelText={ cancelText }
        footer={ footer }
      />
    </AntdSchemaFormContext.Provider>
  );
}

SchemaForm.propTypes = {
  json: PropTypes.object.isRequired,
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
  customTableRender: PropTypes.objectOf(PropTypes.func),
  languagePack: PropTypes.object
};

SchemaForm.defaultProps = {
  customComponent: {},
  customTableRender: {}
};

// @ts-ignore
export default Form.create()(SchemaForm);