import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button } from 'antd';
import Context from '../../context';
import styleName from '../../utils/styleName';
import FormString from '../FormString/FormString';
import FormNumber from '../FormNumber/FormNumber';
import FormBoolean from '../FormBoolean/FormBoolean';
import FormArray from '../FormArray/FormArray';
import getValueFromObject from '../../utils/getValueFromObject';
import getKeysFromObject from '../../utils/getKeysFromObject';

/**
 * 当类型为object时的组件渲染
 * json schema的属性包括：$id、type、title、description、properties、required
 */
class FormObject extends PureComponent{
  static contextType: Object = Context;
  static propTypes: Object = {
    root: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
  };

  // 根据type渲染不同的组件
  renderComponentByTypeView(root: Object, required: boolean): ?React.Element{
    const $id: string = root?.$id || root?.id;
    const { type }: { type: string } = root;
    const props: Object = { key: $id, root, required };

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
  // 渲染一个object组件
  renderObjectComponentView(root: Object): React.Element{
    const $id: string = root?.$id || root?.id;
    const { title, description }: {
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
      <Collapse key={ $id } className={ styleName('object-collapse') } defaultActiveKey={ [$id] }>
        <Collapse.Panel key={ $id }
          header={[
            <b key="title">{ title || $id }</b>,
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
  render(): React.Element{
    const { root, onOk, onCancel }: {
      root: Object,
      onOk: ?Function,
      onCancel: ?Function
    } = this.props;

    return (
      <Fragment>
        { this.renderComponentByTypeView(root) }
        {
          do{
            if(onOk || onCancel){
              <div className={ styleName('object-click-button-box') }>
                {
                  onOk
                    ? <Button type="primary" onClick={ this.handleOkClick }>确定</Button>
                    : null
                }
                {
                  onCancel
                    ? (
                      <Button className={ styleName('object-cancel') }
                        onClick={ this.handleCancelClick }
                      >
                        取消
                      </Button>
                    )
                    : null
                }
              </div>;
            }
          }
        }
      </Fragment>
    );
  }
}

export default FormObject;