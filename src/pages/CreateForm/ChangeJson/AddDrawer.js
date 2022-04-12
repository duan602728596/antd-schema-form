import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Select, Space } from 'antd';
import SchemaForm from 'antd-schema-form';
import schemaFormDefaultLang from 'antd-schema-form/language/default.json' assert { type: 'json' };
import schemaFormZhCNLang from 'antd-schema-form/language/zh-CN.json' assert { type: 'json' };
import json from '../json/json';
import commonStyle from '../commonStyle.sass';
import { I18NContext } from '../../../components/I18N/I18N';

/* 添加抽屉 */
function AddDrawer(props) {
  const { visible, onOk, onCancel, item: propsItem } = props;
  const context = useContext(I18NContext);
  const [typeValue, setTypeValue] = useState(null); // 选择数据类型
  const [value, setValue] = useState(null);         // 表单值
  const [item, setItem] = useState(null);
  const { language, languagePack } = context;
  const { createForm } = languagePack;
  const json2 = language in json ? json[language] : json.default;

  if (typeValue !== null) {
    json2[typeValue].properties.id.$readOnly = item && item.type === 'array';
  }

  // select change事件
  function handleTypeSelect(selectValue, option) {
    setTypeValue(selectValue);
    value.$root.type = selectValue;
    setValue({ ...value });
  }

  useEffect(function() {
    if (visible === false) {
      setTypeValue(null);
    }
  }, [visible]);

  useEffect(function() {
    if (propsItem && visible === true) {
      setValue({
        $root: {
          id: propsItem.type === 'array' ? 'items' : null
        }
      });
      setItem(propsItem);
    }
  }, [propsItem, visible]);

  return (
    <Drawer visible={ visible } width={ 800 } destroyOnClose={ true } maskClosable={ false } onClose={ onCancel }>
      <Space className={ commonStyle.mb8 }>
        <label>{ createForm.drawerLabel }</label>
        <Select className={ commonStyle.typeSelect } value={ typeValue } onSelect={ handleTypeSelect }>
          <Select.Option key="string" value="string">{ createForm.selectOptions[0] }</Select.Option>
          <Select.Option key="number" value="number">{ createForm.selectOptions[1] }</Select.Option>
          <Select.Option key="boolean" value="boolean">{ createForm.selectOptions[2] }</Select.Option>
          <Select.Option key="array" value="array">{ createForm.selectOptions[3] }</Select.Option>
          <Select.Option key="object" value="object">{ createForm.selectOptions[4] }</Select.Option>
        </Select>
      </Space>
      {
        typeValue ? (
          <SchemaForm json={ json2[typeValue] }
            value={ value }
            languagePack={ language === 'zh-cn' ? schemaFormZhCNLang : schemaFormDefaultLang }
            onOk={ onOk }
            onCancel={ onCancel }
          />
        ) : null
      }
    </Drawer>
  );
}

AddDrawer.propTypes = {
  item: PropTypes.object,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default AddDrawer;