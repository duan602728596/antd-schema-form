import * as React from 'react';
import { Fragment, useContext, PropsWithChildren } from 'react';
import * as PropTypes from 'prop-types';
import isArray from 'lodash-es/isArray';
import isNil from 'lodash-es/isNil';
import isString from 'lodash-es/isString';
import { Button } from 'antd';
import { Store } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';
import createElement from '../../utils/createElement';
import { SchemaItem, ContextValue } from '../../types';

/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：id, type, title, description, properties, required
 */
interface FormObjectProps {
  root: SchemaItem;
  onOk?: Function;
  onCancel?: Function;
  okText?: string | number;
  cancelText?: string | number;
  footer?: Function;
}

function FormObject(props: PropsWithChildren<FormObjectProps>): React.ReactElement | null {
  const context: ContextValue | {} = useContext(AntdSchemaFormContext);

  if (!('form' in context)) return null; // 类型判断

  const { form, customComponent, languagePack }: ContextValue = context;
  const {
    root: formObjectRoot,
    onOk,
    onCancel,
    okText = languagePack.formObject.okText,
    cancelText = languagePack.formObject.cancelText,
    footer
  }: FormObjectProps = props;

  // 根据type渲染不同的组件
  function renderComponentByTypeView(root: SchemaItem, required?: boolean): React.ReactNode {
    const { id, type }: SchemaItem = root;
    const _required: boolean = !!required;
    const props: {
      key: string;
      root: any;
      required: boolean;
    } = { key: id, root, required: _required };

    // 渲染oneOf
    if ('oneOf' in root && root.oneOf && isArray(root.oneOf) && root.oneOf.length > 0) {
      // eslint-disable-next-line no-use-before-define
      return renderOneOfComponentView(root, _required);
    }

    switch (type) {
      case 'string':
        return <FormString { ...props } />;

      case 'integer':
      case 'number':
        return <FormNumber { ...props } />;

      case 'boolean':
        return <FormBoolean { ...props } />;

      case 'array':
        return <FormArray { ...props } />;

      case 'object':
        // eslint-disable-next-line no-use-before-define
        return renderObjectComponentView(root);

      default:
        return null;
    }
  }

  // oneOf组件
  function renderOneOfComponentView(root: SchemaItem, required: boolean): React.ReactNode {
    const { oneOf, $oneOfComponentType }: SchemaItem = root;
    const element: React.ReactNodeArray = [];

    (oneOf || []).forEach((value: SchemaItem, index: number, array: Array<SchemaItem>): void => {
      const childrenRoot: SchemaItem = { ...value };

      for (const key in root) {
        // children不继承oneOf相关的属性
        if (!(key in childrenRoot) && !['oneOf', '$oneOfDisabled', '$oneOfIndex', '$oneOfComponentType'].includes(key)) {
          childrenRoot[key] = root[key];
        }
      }

      element.push(renderComponentByTypeView(childrenRoot, required));
    });

    let oneOfElement: React.ReactNode = null;

    if (customComponent) {
      oneOfElement = $oneOfComponentType && $oneOfComponentType in customComponent
        ? customComponent[$oneOfComponentType](root, form, element)
        : createElement(customComponent.defaultOneOf, [root, form, element]);
    }

    return oneOfElement;
  }

  // 判断是否显示
  function dependenciesDisplay(id: string, key: string, keyDepMap: { [key: string]: string[] }): boolean {
    let isDependenciesDisplay: boolean = false;

    for (const item of keyDepMap[key]) {
      const value: any = form.getFieldValue(`${ id }/properties/${ item }`);

      if (!(isNil(value) || (isString(value) && value === ''))) {
        isDependenciesDisplay = true;
        break;
      }
    }

    return isDependenciesDisplay;
  }

  // 渲染一个object组件
  function renderObjectComponentView(root: SchemaItem): React.ReactNode {
    const { $componentType }: SchemaItem = root;
    const required: Array<string> = root.required || [];
    const properties: object = root.properties || {};
    const element: React.ReactNodeArray = [];

    // 判断object下组件的类型并渲染，只要有一个有值就要显示
    for (const key in properties) {
      element.push(renderComponentByTypeView(properties[key], required.includes(key)));
    }

    let objectElement: React.ReactNode = null;

    if (customComponent) {
      objectElement = ($componentType && $componentType in customComponent)
        ? customComponent[$componentType](root, form, element)
        : createElement(customComponent.defaultObject, [root, form, element]);
    }

    return objectElement;
  }

  // ok事件
  async function handleOkClick(event: React.MouseEvent<HTMLElement, MouseEvent>): Promise<void> {
    try {
      const keys: string[] = getKeysFromObject(formObjectRoot);
      const formValue: Store = await form.validateFields(keys);
      const value: object = getValueFromObject(formValue);

      onOk && onOk(form, value, keys);
    } catch (err) {
      console.error(err);
      form.scrollToField(err.errorFields[0].name);
    }
  }

  // cancel事件
  function handleCancelClick(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    onCancel && onCancel(form);
  }

  // 确认和取消按钮
  function footerView(): React.ReactNode {
    if (onOk || onCancel) {
      return (
        <div className={ styleName('object-click-button-box') }>
          {
            onOk
              ? <Button type="primary" onClick={ handleOkClick }>{ okText }</Button>
              : null
          }
          {
            onCancel ? (
              <Button className={ onOk ? styleName('object-cancel') : undefined } onClick={ handleCancelClick }>
                { cancelText }
              </Button>
            ) : null
          }
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <Fragment>
      { renderComponentByTypeView(formObjectRoot) }
      { footer ? footer(form) : footerView() }
    </Fragment>
  );
}

FormObject.propTypes = {
  root: PropTypes.object,
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
  footer: PropTypes.func
};

export default FormObject;