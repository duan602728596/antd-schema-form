import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Tag, Button, Collapse } from 'antd';
import { setSchemaJson } from '../../store/reducer';
import style from '../style.sass';
import stringJson from './string.json';
import numberJson from './number.json';
import booleanJson from './boolean.json';
import objectJson from './object.json';
import arrayJson from './array.json';

/* state */
const state: Function = createStructuredSelector({
  schemaJson: createSelector(
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('createForm') ? $$state.get('createForm') : null,
    ($$data: ?Immutable.Map): Object => $$data !== null ? $$data.get('schemaJson').toJS() : {}
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    setSchemaJson
  }, dispatch)
});

@connect(state, dispatch)
class ChangeJson extends Component{
  static propTypes: Object = {
    schemaJson: PropTypes.object,
    action: PropTypes.objectOf(PropTypes.func)
  };

  json: Object = {
    string: stringJson,
    number: numberJson,
    boolean: booleanJson,
    object: objectJson,
    array: arrayJson
  };

  constructor(): void{
    super(...arguments);

    const { schemaJson }: { schemaJson: Object } = this.props;

    this.state = {
      schemaJson
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.schemaJson !== prevState.schemaJson){
      const { schemaJson }: { schemaJson: Object } = nextProps;

      return {
        schemaJson
      };
    }

    return null;
  }
  // 根据不同的类型渲染不同的标签
  typeTagView(type: string): ?React.Element{
    switch(type){
      case 'object':
        return <Tag color="magenta">object</Tag>;

      case 'array':
        return <Tag color="red">array</Tag>;

      case 'string':
        return <Tag color="blue">string</Tag>;

      case 'number':
        return <Tag color="purple">number</Tag>;

      case 'boolean':
        return <Tag color="orange">boolean</Tag>;

      default:
        return null;
    }
  }
  // 渲染面板内的信息
  infoTableView(item: Object): React.Element{
    const element: [] = [];
    const { type }: { type: string } = item;

    for(const key: string in this.json[type].properties){
      if(key in item){
        element.push(
          <tr key={ key }>
            <th>{ key }</th>
            <td>{ item[key] }</td>
          </tr>
        );
      }
    }

    return (
      <table className={ style.info }>
        <tbody>{ element }</tbody>
      </table>
    );
  }
  // 渲染面板
  collapseListView(item: Object): React.Element{
    const { type, title }: {
      type: string,
      title: string,
      Description: string
    } = item;

    const element: React.Element = [
      <Collapse key="collapse" bordered={ false }>
        <Collapse.Panel header={
          <div className="clearfix">
            <div className={ style.fl }>
              <b className={ style.title }>{ title }</b>
              { this.typeTagView(type) }
            </div>
            <div className={ style.fr }>
              <Button.Group size="small">
                <Button icon="plus" title="添加" />
                <Button icon="edit" title="编辑" />
                <Button type="danger" icon="delete" title="删除" />
              </Button.Group>
            </div>
          </div>
        }>
          { this.infoTableView(item) }
        </Collapse.Panel>
      </Collapse>,
      <div key="children" className={ style.children } />
    ];

    return element;
  }
  render(): React.Element{
    const { schemaJson }: { schemaJson: Object } = this.state;
    const len: Object = Object.values(schemaJson).length;

    return (
      <div className={ style.collapse }>{ len === 0 ? null : this.collapseListView(schemaJson) }</div>
    );
  }
}

export default ChangeJson;