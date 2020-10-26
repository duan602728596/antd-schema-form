import * as React from 'react';
import {
  Fragment,
  useContext,
  PropsWithChildren,
  MouseEvent as RMouseEvent,
  ReactElement,
  ReactNode,
  ReactNodeArray
} from 'react';
import * as PropTypes from 'prop-types';
import isArray from 'lodash-es/isArray';
import { Button, Space } from 'antd';
import type { Store } from 'rc-field-form/es/interface';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';
import createElement from '../../utils/createElement';
import sortProperties from '../../utils/sortProperties';
import type { SchemaItem, ContextValue } from '../../types';

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

function FormObject(props: PropsWithChildren<FormObjectProps>): ReactElement {
  const context: ContextValue = useContext(AntdSchemaFormContext);
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
  function renderComponentByTypeView(root: SchemaItem, required?: boolean): ReactNode {
    const { id, type }: SchemaItem = root;
    const _required: boolean = !!required;
    const props: {
      key: string;
      root: any;
      required: boolean;
    } = { key: id, root, required: _required };

    // 渲染oneOf
    if ('oneOf' in root && root.oneOf && isArray(root.oneOf) && root.oneOf.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
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
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return renderObjectComponentView(root);

      default:
        return null;
    }
  }

  // oneOf组件
  function renderOneOfComponentView(root: SchemaItem, required: boolean): ReactNode {
    const { oneOf, $oneOfComponentType }: SchemaItem = root;
    const element: ReactNodeArray = [];

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

    let oneOfElement: ReactNode = null;

    if (customComponent) {
      oneOfElement = $oneOfComponentType && $oneOfComponentType in customComponent
        ? customComponent[$oneOfComponentType](root, form, element)
        : createElement(customComponent.defaultOneOf, [root, form, element]);
    }

    return oneOfElement;
  }

  // 渲染一个object组件
  function renderObjectComponentView(root: SchemaItem): ReactNode {
    const { $componentType }: SchemaItem = root;
    const required: Array<string> = root.required || [];
    const properties: object = sortProperties(root.properties || {});
    const element: ReactNodeArray = [];

    // 判断object下组件的类型并渲染，只要有一个有值就要显示
    for (const key in properties) {
      element.push(renderComponentByTypeView(properties[key], required.includes(key)));
    }

    let objectElement: ReactNode = null;

    if (customComponent) {
      objectElement = ($componentType && $componentType in customComponent)
        ? customComponent[$componentType](root, form, element)
        : createElement(customComponent.defaultObject, [root, form, element]);
    }

    return objectElement;
  }

  // ok事件
  async function handleOkClick(event: RMouseEvent<HTMLElement, MouseEvent>): Promise<void> {
    try {
      const keys: string[] = getKeysFromObject(formObjectRoot);
      const formValue: Store = await form.validateFields(keys);
      const value: object = getValueFromObject(formValue);

      onOk && onOk(form, value, keys);
    } catch (err) {
      console.error(err);
      form.scrollToField(err?.errorFields?.[0]?.name);
    }
  }

  // cancel事件
  function handleCancelClick(event: RMouseEvent<HTMLElement, MouseEvent>): void {
    const keys: string[] = getKeysFromObject(formObjectRoot);

    onCancel && onCancel(form, keys);
  }

  // 确认和取消按钮
  function footerView(): ReactNode {
    if (onOk || onCancel) {
      return (
        <Space className={ styleName('object-click-button-box') }>
          { onOk ? <Button type="primary" onClick={ handleOkClick }>{ okText }</Button> : null }
          { onCancel ? <Button onClick={ handleCancelClick }>{ cancelText }</Button> : null }
        </Space>
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