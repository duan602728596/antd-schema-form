import {
  createElement,
  useEffect,
  forwardRef,
  useImperativeHandle,
  PropsWithChildren,
  ForwardedRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  ReactElement
} from 'react';
import { Form } from 'antd';
import type { FormInstance, FormProps } from 'antd/es/form';
import type { Store } from 'antd/es/form/interface';
import { isPlainObject } from './utils/lodash';
import AntdSchemaFormContext from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getObjectFromSchema from './utils/getObjectFromSchema';
import languagePack from './languagePack';
import type { CustomComponentObject, CustomTableRenderObject, SchemaItem, ContextValue } from './types';

export interface SchemaFormProps {
  json: SchemaItem;
  value?: any;
  onOk?: Function;
  onCancel?: Function;
  okText?: string | number;
  cancelText?: string | number;
  footer?: Function;
  customComponent?: CustomComponentObject;
  customTableRender?: CustomTableRenderObject;
  languagePack?: object;
  formOptions?: FormProps;
}

type SchemaFormComponent = ForwardRefExoticComponent<PropsWithoutRef<SchemaFormProps> & RefAttributes<any>>;

const SchemaForm: SchemaFormComponent = forwardRef(
  function(props: PropsWithChildren<SchemaFormProps>, ref: ForwardedRef<any>): ReactElement {
    const [form]: [FormInstance] = Form.useForm();
    const {
      value: schemaFormValue,
      json,
      onOk,
      onCancel,
      okText,
      cancelText,
      footer,
      customComponent = {},
      customTableRender = {},
      formOptions = {}
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
      language,            // 系统语言
      languagePack: langP, // 语言包
      json,
      schemaFormValue
    };

    useImperativeHandle(ref, (): FormInstance => form );

    useEffect(function(): void {
      const defaultValue: Store = getObjectFromSchema(json);
      const obj: Store = getObjectFromValue(schemaFormValue);

      form.resetFields();
      form.setFieldsValue({ ...defaultValue, ...obj });
    }, [schemaFormValue]);

    return (
      <AntdSchemaFormContext.Provider value={ contextValue }>
        <Form layout="vertical" form={ form } { ...formOptions }>
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
  });

export default SchemaForm;