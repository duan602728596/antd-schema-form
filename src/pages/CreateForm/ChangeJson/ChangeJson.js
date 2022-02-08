import { Fragment, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tag, Button, Collapse } from 'antd';
import {
  PlusOutlined as IconPlusOutlined,
  EditOutlined as IconEditOutlined,
  DeleteOutlined as IconDeleteOutlined
} from '@ant-design/icons';
import classNames from 'classnames';
import { setSchemaJson as reduxSetSchemaJson } from '../reducers/reducers';
import { schemaJsonState } from '../reducers/selectors';
import style from './changeJson.sass';
import json from '../json/json';
import AddDrawer from './AddDrawer';
import EditDrawer from './EditDrawer';
import { I18NContext } from '../../../components/I18N/I18N';

/* 表单层级展示 */
function ChangeJson(props) {
  const { schemaJson: storeSchemaJson } = useSelector(schemaJsonState);
  const dispatch = useDispatch();
  const context = useContext(I18NContext);
  const [schemaJson, setSchemaJson] = useState(storeSchemaJson);
  const [isAddDrawerDisplay, setIsAddDrawerDisplay] = useState(false);   // 添加面板的显示和隐藏
  const [isEditDrawerDisplay, setIsEditDrawerDisplay] = useState(false); // 编辑面板的显示和隐藏
  const [addItem, setAddItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const len = Object.values(schemaJson).length;

  // 打开添加面板
  function handleOpenAddDrawerClick(item, event) {
    event.stopPropagation();

    setIsAddDrawerDisplay(true);
    setAddItem(item);
  }

  // 打开编辑面板
  function handleOpenEditDrawerClick(item, event) {
    event.stopPropagation();

    setIsEditDrawerDisplay(true);
    setEditItem(item);
  }

  // 关闭面板
  function handleCloseDrawerClick(itemName) {
    if (itemName === 'add') {
      setAddItem(null);
      setIsAddDrawerDisplay(false);
    } else {
      setEditItem(null);
      setIsEditDrawerDisplay(false);
    }
  }

  // 添加确认事件
  function handleOkAddDrawerClick(form, value, keys) {
    const { $root } = value;
    const { id, ...etcValue } = $root;

    if (addItem.type === 'object') {
      if (!('properties' in addItem)) addItem.properties = {};

      addItem.properties[id] = {
        id: `${ addItem.id }/properties/${ id }`,
        ...etcValue
      };
    } else if (addItem.type === 'array') {
      addItem.items = {
        id: `${ addItem.id }/items`,
        ...etcValue
      };
    }

    schemaJson |> reduxSetSchemaJson(#) |> dispatch(#);
    setIsAddDrawerDisplay(false);
    setAddItem(null);
  }

  // 编辑确认事件
  function handleOkEditDrawerClick(form, value, keys) {
    const { $root } = value;
    const { id, ...etcValue } = $root;

    if (editItem.type === 'object') {
      delete editItem.items;
    } else if (editItem.type === 'array') {
      delete editItem.properties;
    }

    // 合并数据
    Object.assign(editItem, etcValue);
    schemaJson |> reduxSetSchemaJson(#) |> dispatch(#);
    setIsEditDrawerDisplay(false);
    setEditItem(null);
  }

  // 根据指定id查找并删除数据
  function findAndDelete(id, item, father, key) {
    if (item.id === id && father && key) {
      delete father[key];

      return void 0;
    }

    if (item.type === 'object') {
      for (const propertiesKey in item.properties) {
        findAndDelete(id, item.properties[propertiesKey], item.properties, propertiesKey);
      }

      return void 0;
    }

    if (item.type === 'array') {
      findAndDelete(id, item.items, item, 'items');

      return void 0;
    }
  }

  // 删除事件
  function handleDeleteItemClick(item, event) {
    event.stopPropagation();

    const { id } = item;

    findAndDelete(id, schemaJson);
    schemaJson |> reduxSetSchemaJson(#) |> dispatch(#);
  }

  // 根据不同的类型渲染不同的标签
  function typeTagView(type) {
    switch (type) {
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
  function infoTableView(item) {
    const element = [];
    const { type } = item;
    const { language } = context;
    const json2 = language in json ? json[language] : json.default;

    for (const key in json2[type].properties) {
      if (key in item) {
        let value = item[key];

        if (value === undefined || value === null) continue;

        if (typeof value === 'boolean') {
          value = String(value);
        } else if (typeof value === 'object') {
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
  function collapseListView(item, disableDelete) {
    const { type, title, id } = item;
    const { createForm } = context.languagePack;

    const element = [
      <Collapse key="collapse" bordered={ false }>
        <Collapse.Panel key={ id } header={
          <div className={ classNames(style.collapseView, 'clearfix') }>
            <div className={ style.fl }>
              <b className={ style.title }>{ title }</b>
              { typeTagView(type) }
            </div>
            <div className={ style.fr }>
              <Button.Group size="small">
                <Button icon={ <IconPlusOutlined /> }
                  title={ createForm.add }
                  disabled={ !(type === 'object' || type === 'array') }
                  onClick={ (event) => handleOpenAddDrawerClick(item, event) }
                />
                <Button icon={ <IconEditOutlined /> }
                  title={ createForm.edit }
                  onClick={ (event) => handleOpenEditDrawerClick(item, event) }
                />
                <Button type="primary"
                  danger={ true }
                  icon={ <IconDeleteOutlined /> }
                  title={ createForm.delete }
                  disabled={ disableDelete }
                  onClick={ (event) => handleDeleteItemClick(item, event) }
                />
              </Button.Group>
            </div>
          </div>
        }>
          { infoTableView(item) }
        </Collapse.Panel>
      </Collapse>
    ];

    const childrenList = [];

    if (type === 'object' && item.properties) {
      for (const key in item.properties) {
        childrenList.push(collapseListView(item.properties[key]));
      }
    } else if (type === 'array' && item.items) {
      childrenList.push(collapseListView(item.items));
    }

    if (childrenList.length > 0) {
      element.push(
        <div key="children" className={ style.children }>{ childrenList }</div>
      );
    }

    return element;
  }

  useEffect(function() {
    setSchemaJson(storeSchemaJson);
  }, [storeSchemaJson]);

  return (
    <Fragment>
      <div className={ style.collapse }>{ len === 0 ? null : collapseListView(schemaJson, true) }</div>
      <AddDrawer item={ addItem }
        visible={ isAddDrawerDisplay }
        onOk={ handleOkAddDrawerClick }
        onCancel={ () => handleCloseDrawerClick('add') }
      />
      <EditDrawer item={ editItem }
        visible={ isEditDrawerDisplay }
        onOk={ handleOkEditDrawerClick }
        onCancel={ () => handleCloseDrawerClick('edit') }
      />
    </Fragment>
  );
}

export default ChangeJson;