import { Layout, Select, Dropdown, Menu } from 'antd';
import { GithubOutlined as IconGithubOutlined } from '@ant-design/icons';
import packageJson from 'antd-schema-form/package.json' assert { type: 'json' };
import style from './index.sass';
import Nav from './Nav';
import { I18NContext } from '../../components/I18N/I18N';

const { version } = packageJson;

/* 版本切换 */
function versionMenuOverlay() {
  return (
    <Menu>
      <Menu.Item>
        <a className={ style.nowVersion }
          href="https://duan602728596.github.io/antd-schema-form/#/"
          target="_blank" rel="noopener noreferrer"
        >
          { version }
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://duan602728596.github.io/antd-schema-form/v4/#/" target="_blank" rel="noopener noreferrer">v4</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://duan602728596.github.io/antd-schema-form/v3/#/" target="_blank" rel="noopener noreferrer">v3</a>
      </Menu.Item>
      <Menu.Item>
        <a href="https://duan602728596.github.io/antd-schema-form/v2/#/" target="_blank" rel="noopener noreferrer">v2</a>
      </Menu.Item>
    </Menu>
  );
}

/* 网站headers */
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
            <IconGithubOutlined />
          </a>
        </div>
      </div>
    </Layout.Header>
  );
}

export default Header;