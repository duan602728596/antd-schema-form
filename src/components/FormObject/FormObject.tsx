import * as React from 'react';
import { Component, Fragment, Context } from 'react';
import * as PropTypes from 'prop-types';
import { Requireable } from 'prop-types';
import { Collapse, Button } from 'antd';
import AntdSchemaFormContext from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import OneOf from './OneOf';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';
import { isArray } from '../../utils/type';
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

class FormObject extends Component<FormObjectProps> {
  static contextType: Context<ContextValue | {}> = AntdSchemaFormContext;
  static propTypes: {
    root: Requireable<object>;
    onOk: Requireable<Function>;
    onCancel: Requireable<Function>;
    okText: Requireable<string | number>;
    cancelText: Requireable<string | number>;
    footer: Requireable<Function>;
  } = {
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

  // 根据type渲染不同的组件
  renderComponentByTypeView(root: SchemaItem, required?: boolean): React.ReactNode {
    const { id, type }: SchemaItem = root;
    const required2: boolean = !!required;
    const props: {
      key: string;
      root: any;
      required: boolean;
    } = { key: id, root, required: required2 };

    // 渲染oneOf
    if ('oneOf' in root && root.oneOf && isArray(root.oneOf) && root.oneOf.length > 0) {
      return this.renderOneOfComponentView(root, required2);
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
        return this.renderObjectComponentView(root);

      default:
        return null;
    }
  }

  // oneOf组件
  renderOneOfComponentView(root: SchemaItem, required: boolean): React.ReactNode {
    const element: React.ReactNodeArray = [];

    (root.oneOf || []).forEach((value: SchemaItem, index: number, array: Array<SchemaItem>): void => {
      const childrenRoot: SchemaItem = { ...value };

      for (const key in root) {
        if (!(key in childrenRoot) && !['oneOf'].includes(key)) {
          childrenRoot[key] = root[key];
        }
      }

      element.push(this.renderComponentByTypeView(childrenRoot, required));
    });

    return <OneOf key={ root.id } root={ root } element={ element } />;
  }

  // 渲染一个object组件
  renderObjectComponentView(root: SchemaItem): React.ReactNode {
    const { id, title, description }: SchemaItem = root;
    const required: Array<string> = root.required || [];
    const properties: object = root.properties || {};
    const element: React.ReactNodeArray = [];

    // 判断object下组件的类型并渲染
    for (const key in properties) {
      element.push(this.renderComponentByTypeView(properties[key], required.includes(key)));
    }

    return (
      <Collapse key={ id } className={ styleName('object-collapse') } defaultActiveKey={ [id] }>
        <Collapse.Panel key={ id }
          header={[
            <b key="title">{ title || id }</b>,
            <span className={ styleName('object-description') } key="description">{ description }</span>
          ]}
        >
          { element }
        </Collapse.Panel>
      </Collapse>
    );
  }

  // ok事件
  handleOkClick(event: React.MouseEvent<Button>): void {
    const { form }: ContextValue = this.context;
    const { root, onOk }: FormObjectProps = this.props;
    const keys: string[] = getKeysFromObject(root);

    form.validateFieldsAndScroll(keys, (err: any, value: object): void => {
      if (err) return void 0;

      const value2: object = getValueFromObject(value);

      onOk && onOk(form, value2, keys);
    });
  }

  // cancel事件
  handleCancelClick(event: React.MouseEvent<Button>): void {
    const { form }: ContextValue = this.context;
    const { onCancel }: FormObjectProps = this.props;

    onCancel && onCancel(form);
  }

  // 确认和取消按钮
  footerView(): React.ReactNode {
    const { languagePack }: ContextValue = this.context;
    const {
      onOk,
      onCancel,
      okText = languagePack.formObject.okText,
      cancelText = languagePack.formObject.cancelText
    }: FormObjectProps = this.props;

    if (onOk || onCancel) {
      return (
        <div className={ styleName('object-click-button-box') }>
          {
            onOk
              ? <Button type="primary" onClick={ this.handleOkClick.bind(this) }>{ okText }</Button>
              : null
          }
          {
            onCancel
              ? (
                <Button className={ onOk ? styleName('object-cancel') : undefined }
                  onClick={ this.handleCancelClick.bind(this) }
                >
                  { cancelText }
                </Button>
              )
              : null
          }
        </div>
      );
    } else {
      return null;
    }
  }

  render(): React.ReactNode {
    const { form }: ContextValue = this.context;
    const { root, footer }: FormObjectProps = this.props;

    return (
      <Fragment>
        { this.renderComponentByTypeView(root) }
        { footer ? footer(form) : this.footerView() }
      </Fragment>
    );
  }
}

export default FormObject;