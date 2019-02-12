// @flow
import * as React from 'react';
import { Component, Fragment, createRef } from 'react';
import classNames from 'classnames';
import { Row, Col, Modal } from 'antd';
import SchemaForm, { schemaFormDefaultLang, schemaFormZhCNLang } from '../../../components/SchemaForm/SchemaForm';
import hljs from '../../../components/highlightjs/highlightjs';
import style from './style.sass';
import demo from './demo.json';
import demoZhCN from './demo-zhCN.json';
import { I18NContext } from '../../../components/I18N/I18N';

type IndexState = {
  language: string
};

class Index extends Component<{}, IndexState>{
  static contextType: React.Context<Object> = I18NContext;

  codeRef: Object = createRef();

  constructor(): void{
    super(...arguments);

    const { language }: { language: string } = this.context;

    this.state = {
      language // 语言
    };
  }
  componentDidMount(): void{
    hljs.highlightBlock(this.codeRef.current);
  }
  componentDidUpdate(prevProps: {}, prevState: IndexState): void{
    const { language }: { language: string } = this.context;

    if(language !== prevState.language){
      hljs.highlightBlock(this.codeRef.current);

      this.setState({ language });
    }
  }
  // 表单确认事件
  handleOnFormOkClick: Function = (form: Object, value: Object, keys: string[]): void=>{
    const { languagePack }: { languagePack: Object } = this.context;
    const { message }: { message: Object } = languagePack;

    Modal.info({
      content: (
        <div>
          <h4>{ message.modalTitle }</h4>
          <pre>{ JSON.stringify(value, null, 2) }</pre>
        </div>
      )
    });
  };
  render(): React.Node{
    const { language, languagePack }: {
      language: string,
      languagePack: Object
    } = this.context;
    const { index }: { index: Object } = languagePack;
    const demo2: Object = language === 'zh-cn' ? demoZhCN : demo;

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