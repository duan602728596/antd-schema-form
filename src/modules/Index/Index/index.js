import React, { Component, Fragment, createRef } from 'react';
import classNames from 'classnames';
import { Row, Col, Modal } from 'antd';
import SchemaForm from 'antd-schema-form';
import schemaFormDefaultLang from 'antd-schema-form/language/default.json';
import schemaFormZhCNLang from 'antd-schema-form/language/zh-CN.json';
import hljs from 'highlightjs';
import style from './style.sass';
import demo from './demo.json';
import demoZhCN from './demo-zhCN.json';
import { I18NContext } from '../../../components/I18N/I18N';

class Index extends Component {
  static contextType = I18NContext;

  codeRef = createRef();

  constructor() {
    super(...arguments);

    const { language } = this.context;

    this.state = {
      language // 语言
    };
  }

  componentDidMount() {
    hljs.highlightBlock(this.codeRef.current);
  }

  componentDidUpdate(prevProps, prevState) {
    const { language } = this.context;

    if (language !== prevState.language) {
      hljs.highlightBlock(this.codeRef.current);

      this.setState({ language });
    }
  }

  // 表单确认事件
  handleOnFormOkClick = (form, value, keys) => {
    const { languagePack } = this.context;
    const { message } = languagePack;

    Modal.info({
      content: (
        <div>
          <h4>{ message.modalTitle }</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  };

  render() {
    const { language, languagePack } = this.context;
    const { index } = languagePack;
    const demo2 = language === 'zh-cn' ? demoZhCN : demo;

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
              onOk={ this.handleOnFormOkClick }
            />
          </Col>
          <Col xs={ 24 } sm={ 24 } md={ 12 }>
            <h4>schema.json：</h4>
            <pre className={ style.codePre }>
              <code ref={ this.codeRef } className={ classNames('json', style.code) }>
                { JSON.stringify(demo2, null, 2) }
              </code>
            </pre>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Index;