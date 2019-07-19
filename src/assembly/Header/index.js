import React from 'react';
import { Layout, Icon, Select, Dropdown, Menu } from 'antd';
import { version } from 'antd-schema-form/package.json';
import style from './style.sass';
import Nav from './Nav';
import { I18NContext } from '../../components/I18N/I18N';

function versionMenuOverlay() {
  return (
    <Menu>
      <Menu.Item>
        <a className={ style.nowVersion } href="https://duan602728596.github.io/antd-schema-form/#/" target="_blank" rel="noopener noreferrer">{ version }</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://duan602728596.github.io/antd-schema-form/v2/index.html" target="_blank" rel="noopener noreferrer">v2</a>
      </Menu.Item>
    </Menu>
  );
}

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
          <Dropdown placement="bottomLeft" overlay={ versionMenuOverlay() }>
            <a className={ style.version }>v{ version }</a>
          </Dropdown>
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