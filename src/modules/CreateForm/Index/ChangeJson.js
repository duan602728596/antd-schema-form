import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Tag, Button, Collapse } from 'antd';
import { setSchemaJson } from '../store/reducer';
import style from './style.sass';
import json from './json/json';
import AddDrawer from './AddDrawer';

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

  state: {
    schemaJson: Object,
    isAddDrawerDisplay: boolean,
    addItem: ?Object,
    editItem: ?Object
  };

  constructor(): void{
    super(...arguments);

    const { schemaJson }: { schemaJson: Object } = this.props;

    this.state = {
      schemaJson,
      isAddDrawerDisplay: false, // 添加面板的显示和隐藏
      addItem: null,
      editItem: null
    };
  }
  static getDerivedStateFromProps(nextProps: Object, prevState: Object): ?Object{
    if(nextProps.schemaJson !== prevState.schemaJson){
      const { schemaJson }: { schemaJson: Object } = nextProps;

      return { schemaJson };
    }

    return null;
  }
  // 关闭面板
  handleCloseDrawerClick(itemName: string, visibleName: string, form: Object): void{
    this.setState({
      [itemName]: null,
      [visibleName]: false
    });
  }
  // 打开添加面板
  handleOpenAddDrawerClick(item: Object, event: Event): void{
    event.stopPropagation();
    this.setState({
      isAddDrawerDisplay: true,
      addItem: item
    });
  }
  // 确认事件
  handleOkAddDrawerClick: Function = (form: Object, value: Object, keys: string[]): void=>{
    const { schemaJson, addItem }: {
      schemaJson: Object,
      addItem: Object
    } = this.state;
    const { $root }: { $root: Object } = value;
    const { id, ...etcValue }: {
      id: string,
      etcValue: Object
    } = $root;

    if(addItem.type === 'object'){
      if(!('properties' in addItem)) addItem.properties = {};

      addItem.properties[id] = {
        id: `${ addItem.id }/properties/${ id }`,
        ...etcValue
      };
    }else if(addItem.type === 'array'){
      addItem.items = {
        id: `${ addItem.id }/items`,
        ...etcValue
      };
    }

    this.props.action.setSchemaJson(schemaJson);
    this.setState({
      isAddDrawerDisplay: false,
      addItem: null
    });
  };
  // 删除事件
  handleDeleteItemClick(item: Object, event: Event): void{
    event.stopPropagation();

    const { id }: { id: string } = item;
    const { schemaJson }: { schemaJson: Object } = this.state;
    const idArr: string[] = id.split('/').slice(1);

    if(idArr.length === 0){
      this.props.action.setSchemaJson({});
    }else{
      for(let i: number = 0, j: number = idArr.length, k: Object = schemaJson; i < j; i++){
        if(i === j - 1){
          delete k[idArr[i]];
        }else{
          k = schemaJson[idArr[i]];
        }
      }

      this.props.action.setSchemaJson(schemaJson);
    }
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

    for(const key: string in json[type].properties){
      if(key in item){
        let value: any = item[key];

        if(value === undefined || value === null) continue;

        if(typeof value === 'boolean'){
          value = String(value);
        }else if(typeof value === 'object'){
          value = Object.prototype.toString.call(value);
        }

        element.push(
          <tr key={ key }>
            <th>{ key }</th>
            <td>{ value }</td>
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
                {
                  type === 'object' || type === 'array'
                    ? <Button icon="plus" title="添加" onClick={ this.handleOpenAddDrawerClick.bind(this, item) } />
                    : null
                }
                <Button icon="edit" title="编辑" />
                <Button type="danger" icon="delete" title="删除" onClick={ this.handleDeleteItemClick.bind(this, item) } />
              </Button.Group>
            </div>
          </div>
        }>
          { this.infoTableView(item) }
        </Collapse.Panel>
      </Collapse>
    ];

    const childrenList: React.ChildrenArray<React.Element> = [];

    if(type === 'object' && item.properties){
      for(const key: string in item.properties){
        childrenList.push(this.collapseListView(item.properties[key]));
      }
    }else if(type === 'array' && item.items){
      childrenList.push(this.collapseListView(item.items));
    }

    if(childrenList.length > 0){
      element.push(
        <div key="children" className={ style.children }>{ childrenList }</div>
      );
    }

    return element;
  }
  render(): React.Element{
    const { schemaJson, isAddDrawerDisplay, addItem }: {
      schemaJson: Object,
      isAddDrawerDisplay: boolean,
      addItem: ?Object
    } = this.state;
    const len: Object = Object.values(schemaJson).length;

    return (
      <Fragment>
        <div className={ style.collapse }>{ len === 0 ? null : this.collapseListView(schemaJson) }</div>
        <AddDrawer item={ addItem }
          visible={ isAddDrawerDisplay }
          onOk={ this.handleOkAddDrawerClick }
          onCancel={ this.handleCloseDrawerClick.bind(this, 'addItem', 'isAddDrawerDisplay') }
        />
      </Fragment>
    );
  }
}

export default ChangeJson;