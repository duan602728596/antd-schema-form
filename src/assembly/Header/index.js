import React from 'react';
import { Layout, Icon, Select } from 'antd';
import style from './style.sass';
import Nav from './Nav';
import { I18NContext } from '../../components/I18N/I18N';

function Header(props) {
  return (
    <Layout.Header>
      <div className={ style.headerBox }>
        <Nav />
        <div>
          <I18NContext.Consumer>
            {
              (context) => (
                <Select className={ style.langSelect } size="small" value={ context.language } onSelect={ context.onSelect }>
                  <Select.Option key="default" value="default">EN</Select.Option>
                  <Select.Option key="zh-cn" value="zh-cn">中文</Select.Option>
                </Select>
              )
            }
          </I18NContext.Consumer>
          <a className={ style.github }
            href="https://github.com/duan602728596/antd-schema-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="github" />
          </a>
        </div>
      </div>
    </Layout.Header>
  );
}

export default Header;