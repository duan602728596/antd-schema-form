import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button } from 'antd';
import Context from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import OneOf from './OneOf';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';
import { isArray, isNumber } from '../../utils/type';

/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：id、type、title、description、properties、required
 */
class FormObject extends Component{
  static contextType: Object = Context;
  static propTypes: Object = {
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
  static defaultProps: Object = {
    okText: '确认',
    cancelText: '取消'
  };

  // 根据type渲染不同的组件
  renderComponentByTypeView(root: Object, required: boolean): ?React.Element{
    const { id, type }: {
      id: string,
      type: string
    } = root;
    const props: Object = { key: id, root, required };

    // 渲染oneOf
    if('oneOf' in root && isArray(root.oneOf) && root.oneOf.length > 0){
      return this.renderOneOfComponentView(root, required);
    }

    switch(type){
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
  renderOneOfComponentView(root: Object, required: boolean): ?React.Element{
    const element: React.ChildrenArray<React.Element> = [];

    root.oneOf.forEach((value: Object, index: number, array: Array): void=>{
      const childrenRoot: Object = { ...value };

      for(const key: string in root){
        if(!(key in childrenRoot) && !['oneOf'].includes(key)){
          childrenRoot[key] = root[key];
        }
      }

      element.push(this.renderComponentByTypeView(childrenRoot, required));
    });

    return <OneOf key={ root.id } root={ root } element={ element } />;
  }
  // 渲染一个object组件
  renderObjectComponentView(root: Object): React.Element{
    const { id, title, description }: {
      id: string,
      title: string,
      description: string
    } = root;
    const required: Array<string> = root?.required || [];
    const properties: ?Object = root?.properties || {};
    const element: React.ChildrenArray<React.Element> = [];

    // 判断object下组件的类型并渲染
    for(const key: string in properties){
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
  handleOkClick: Function = (event: Event): void=>{
    const { form }: { form: Object } = this.context;
    const { root, onOk }: {
      root: Object,
      onOk: Function
    } = this.props;
    const keys: string[] = getKeysFromObject(root);

    form.validateFields(keys, (err: any, value: Object): void=>{
      if(err) return void 0;

      const value2: Object = getValueFromObject(value);

      onOk(form, value2, keys);
    });
  };
  // cancel事件
  handleCancelClick: Function = (event: Event): void=>{
    const { form }: { form: Object } = this.context;
    const { onCancel }: { onCancel: Function } = this.props;

    onCancel(form);
  };
  // 确认和取消按钮
  footerView(): ?React.Element{
    const { onOk, onCancel, okText, cancelText }: {
      onOk: ?Function,
      onCancel: ?Function,
      okText: string,
      cancelText: string
    } = this.props;

    if(onOk || onCancel){
      return (
        <div className={ styleName('object-click-button-box') }>
          {
            onOk
              ? <Button type="primary" onClick={ this.handleOkClick }>{ okText }</Button>
              : null
          }
          {
            onCancel
              ? (
                <Button className={ onOk ? styleName('object-cancel') : null }
                  onClick={ this.handleCancelClick }
                >
                  { cancelText }
                </Button>
              )
              : null
          }
        </div>
      );
    }else{
      return null;
    }
  }
  render(): React.Element{
    const { form }: { form: Object } = this.context;
    const { root, footer }: {
      root: Object,
      footer: ?Function
    } = this.props;

    return (
      <Fragment>
        { this.renderComponentByTypeView(root) }
        { footer ? footer(form) : this.footerView() }
      </Fragment>
    );
  }
}

export default FormObject;