import * as React from 'react';
import { useEffect, forwardRef, PropsWithChildren, Ref } from 'react';
import * as PropTypes from 'prop-types';
import isPlainObject from 'lodash-es/isPlainObject';
import { Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import { Store } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import languagePack from './languagePack';
import { SchemaItem, ContextValue } from './types';

export interface SchemaFormProps {
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

function SchemaForm(props: PropsWithChildren<SchemaFormProps>, ref: Ref<any>): React.ReactElement | null {
  const [form]: [FormInstance] = Form.useForm();
  const {
    value: schemaFormValue,
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
  const langP: object = (typeof customLangPack === 'object' && isPlainObject(customLangPack))
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
    const obj: Store = getObjectFromValue(schemaFormValue);

    form.resetFields();
    form.setFieldsValue(obj);
  }, [schemaFormValue]);

  useEffect(function(): void {
    if (ref) {
      if (typeof ref === 'object' && ('current' in ref)) {
        // @ts-ignore
        ref.current = form;
      }

      if (typeof ref === 'function') {
        ref(form);
      }
    }
  }, [ref]);

  return (
    <AntdSchemaFormContext.Provider value={ contextValue }>
      <Form layout="vertical" form={ form }>
        <FormObject root={ json }
          onOk={ onOk }
          onCancel={ onCancel }
          okText={ okText }
          cancelText={ cancelText }
          footer={ footer }
        />
      </Form>
    </AntdSchemaFormContext.Provider>
  );
}

SchemaForm.propTypes = {
  ref: PropTypes.any,
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
export default forwardRef(SchemaForm);