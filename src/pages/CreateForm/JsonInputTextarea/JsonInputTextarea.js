import { Fragment, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Button, message, Space } from 'antd';
import { CopyOutlined as IconCopyOutlined, RedoOutlined as IconRedoOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import MonacoEditor from 'react-monaco-editor';
import { setSchemaJson } from '../reducers/reducers';
import { schemaJsonState } from '../reducers/selectors';
import style from './jsonInputTextarea.sass';
import commonStyle from '../commonStyle.sass';
import { I18NContext } from '../../../components/I18N/I18N';

/* schema输入 */
function JsonInputTextarea(props) {
  const { schemaJson } = useSelector(schemaJsonState);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const context = useContext(I18NContext);
  const [textAreaValue, setTextAreaValue] = useState(JSON.stringify(schemaJson, null, 2));

  const query = searchParams.get('q'); // 获取传递的字符串
  const { languagePack } = context;
  const { createForm } = languagePack;
  const langMessage = languagePack.message;

  // 复制
  function handleCopyClick(event) {
    copy(textAreaValue);
    message.info(langMessage.copyMessage);
  }

  // 表单的change事件
  function handleInputTextAreaChange(newValue, event) {
    setTextAreaValue(newValue);
  }

  // 刷新表单并同步到store
  function handleRedoJsonSchema(event) {
    let value = null;

    try {
      value = JSON.parse(textAreaValue);
      value |> setSchemaJson(#) |> dispatch(#);
    } catch (err) {
      message.error(langMessage.jsonFormatError);
    }
  }

  useEffect(function() {
    setTextAreaValue(JSON.stringify(schemaJson, null, 2));
  }, [schemaJson]);

  useEffect(function() {
    if (query) {
      const queryDecodeStr = decodeURIComponent(query);

      setTextAreaValue(queryDecodeStr);

      let value = null;

      try {
        value = JSON.parse(queryDecodeStr);
        value |> setSchemaJson(#) |> dispatch(#);
      } catch (err) {
        message.error(langMessage.jsonFormatError);
      }
    }
  }, []);

  return (
    <Fragment>
      <Space className={ commonStyle.mb8 }>
        <Button icon={ <IconCopyOutlined /> } onClick={ handleCopyClick }>{ createForm.copy }</Button>
        <Button type="primary" icon={ <IconRedoOutlined /> } onClick={ handleRedoJsonSchema }>
          { createForm.refreshFormConfiguration }
        </Button>
      </Space>
      <div className={ style.editor }>
        <MonacoEditor theme="vs"
          width="100%"
          height="100%"
          wordWrap="on"
          language="json"
          value={ textAreaValue }
          onChange={ handleInputTextAreaChange }
          options={{ fontSize: 12, wordWrap: 'on' }}
        />
      </div>
    </Fragment>
  );
}

export default JsonInputTextarea;