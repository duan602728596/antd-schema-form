import { Fragment, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Button, message, Modal, Empty, Space } from 'antd';
import { CopyOutlined as IconCopyOutlined, TableOutlined as IconTableOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import MonacoEditor from 'react-monaco-editor';
import { setSchemaJson } from './reducers/reducers';
import style from './preview.sass';
import schemaFormDefaultLang from 'antd-schema-form/language/default.json';
import schemaFormZhCNLang from 'antd-schema-form/language/zh-CN.json';
import { I18NContext } from '../../components/I18N/I18N';
import SchemaFormPreview from './SchemaFormPreview';

/* state */
const state = createStructuredSelector({
  schemaJson: createSelector(
    ({ preview }) => preview?.schemaJson,
    (data) => data ?? null
  )
});

/* 输入schema */
function Preview(props) {
  const { schemaJson } = useSelector(state);
  const dispatch = useDispatch();
  const context = useContext(I18NContext);
  const [textAreaValue, setTextAreaValue]
    = useState(schemaJson === null ? '' : JSON.stringify(schemaJson, null, 2));

  const { language, languagePack } = context;
  const { preview } = languagePack;
  const langMessage = languagePack.message;

  // 复制
  function handleCopyClick(event) {
    copy(textAreaValue);
    message.info(langMessage.copyMessage);
  }

  // 表单确认事件
  function handleOnFormOkClick(form, value, keys) {
    const langMessage = languagePack.message;

    Modal.info({
      content: (
        <div>
          <h4>{ langMessage.modalTitle }</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  }

  // 表单的change事件
  function handleInputTextAreaChange(newValue, event) {
    setTextAreaValue(newValue);
  }

  // 表单预览
  function handleRedoJsonSchema(event) {
    let value = null;

    try {
      value = JSON.parse(textAreaValue);
      value |> setSchemaJson |> dispatch;
    } catch (err) {
      message.error(langMessage.jsonFormatError);
    }
  }

  return (
    <Fragment>
      <p>{ preview.introduction }</p>
      <div className={ style.flexBox }>
        <div className={ style.flexLeftBox }>
          <Space className={ style.tools }>
            <Button icon={ <IconCopyOutlined /> } onClick={ handleCopyClick }>{ preview.copy }</Button>
            <Button type="primary" icon={ <IconTableOutlined /> } onClick={ handleRedoJsonSchema }>
              { preview.generateForm }
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
        </div>
        <div className={ style.flexRightBox }>
          {
            schemaJson ? (
              <SchemaFormPreview json={ schemaJson }
                languagePack={ language === 'zh-cn' ? schemaFormZhCNLang : schemaFormDefaultLang }
                onOk={ handleOnFormOkClick }
              />
            ) : (
              <div className={ style.noData }>
                <Empty description=" " image={ Empty.PRESENTED_IMAGE_SIMPLE } />
              </div>
            )
          }
        </div>
      </div>
    </Fragment>
  );
}

export default Preview;