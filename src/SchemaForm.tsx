import { createElement } from 'react';
import {
  useEffect,
  forwardRef,
  PropsWithChildren as PWC,
  Ref,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  ReactElement,
  useImperativeHandle
} from 'react';
import * as PropTypes from 'prop-types';
import { Validator } from 'prop-types';
import isPlainObject from 'lodash-es/isPlainObject';
import { Form } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { FormProps } from 'antd/es/form/Form';
import type { Store } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from './context';
import FormObject from './components/FormObject/FormObject';
import getObjectFromValue from './utils/getObjectFromValue';
import getObjectFromSchema from './utils/getObjectFromSchema';
import languagePack from './languagePack';
import type { SchemaItem, ContextValue } from './types';

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
  formOptions?: FormProps;
}

type SchemaFormComponent = ForwardRefExoticComponent<PropsWithoutRef<SchemaFormProps> & RefAttributes<any>>;

const SchemaForm: SchemaFormComponent = forwardRef(function(props: PWC<SchemaFormProps>, ref: Ref<any>): ReactElement {
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
    customTableRender,
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

SchemaForm.propTypes = {
  json: PropTypes.object.isRequired as Validator<SchemaItem>,
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
  customComponent: PropTypes.objectOf(PropTypes.func) as Validator<{ [key: string]: Function } | null | undefined>,
  customTableRender: PropTypes.objectOf(PropTypes.func),
  languagePack: PropTypes.object
};

SchemaForm.defaultProps = {
  customComponent: {},
  customTableRender: {}
};

export default SchemaForm;