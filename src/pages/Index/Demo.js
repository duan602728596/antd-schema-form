import { Fragment, useState, useEffect, useRef, useContext } from 'react';
import { Row, Col, Modal } from 'antd';
import SchemaForm from 'antd-schema-form';
import schemaFormDefaultLang from 'antd-schema-form/language/default.json';
import schemaFormZhCNLang from 'antd-schema-form/language/zh-CN.json';
import classNames from 'classnames';
import style from './demo.sass';
import demo from './demo.json';
import demoZhCN from './demo-zhCN.json';
import { I18NContext } from '../../components/I18N/I18N';
import hljs from '../../components/highlight/highlight';

function Demo(props) {
  const context = useContext(I18NContext);
  const codeRef = useRef();
  const [language, setLanguage] = useState(context.language);
  const { index } = context.languagePack;
  const demo2 = language === 'zh-cn' ? demoZhCN : demo;

  // 表单确认事件
  function handleOnFormOkClick(form, value, keys) {
    const { languagePack } = context;
    const { message } = languagePack;

    Modal.info({
      content: (
        <div>
          <h4>{ message.modalTitle }</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  }

  // 渲染你高亮代码
  function codeRender() {
    setLanguage(context.language);
    hljs.highlightBlock(codeRef.current);
  }

  useEffect(function() {
    codeRender();
  });

  return (
    <Fragment>
      <p className={ style.desc }>
        { index.introduction[0] }
        <a href="https://ant.design/index-cn" target="_blank" rel="noopener noreferrer">Ant Design</a>
        { index.introduction[1] }
        <a href="http://json-schema.org/draft-07/json-schema-validation.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          JSON Schema
        </a>
        { index.introduction[2] }
      </p>
      <p className={ style.desc }>{ index.introduction[3] }</p>
      <Row type="flex" gutter={ 10 }>
        <Col className={ style.mb10 } xs={ 24 } sm={ 24 } md={ 12 }>
          <h4>{ index.demoTitle }</h4>
          <SchemaForm json={ demo2 }
            languagePack={ language === 'zh-cn' ? schemaFormZhCNLang : schemaFormDefaultLang }
            onOk={ handleOnFormOkClick }
          />
        </Col>
        <Col xs={ 24 } sm={ 24 } md={ 12 }>
          <h4>schema.json：</h4>
          <pre className={ style.codePre }>
            <code ref={ codeRef } className={ classNames('json', style.code) }>
              { JSON.stringify(demo2, null, 2) }
            </code>
          </pre>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Demo;