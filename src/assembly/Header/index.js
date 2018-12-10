import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon } from 'antd';
import style from './style.sass';

class Header extends Component{
  render(): React.Element{
    return (
      <Layout.Header>
        <nav>
          <ul className={ style.navList }>
            <li>
              <Link to="/">
                <Icon type="home" theme="twoTone" />
                <span>首页</span>
              </Link>
            </li>
            <li>
              <Link to="/CreateForm">
                <Icon type="file-text" theme="twoTone" />
                <span>表单生成</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <Icon type="eye" theme="twoTone" />
                <span>表单预览</span>
              </Link>
            </li>
            <li>
              <a href="https://github.com/duan602728596/antd-schema-form#antd-schema-form"
                target="_blank"
                ref="noopener noreferrer"
              >
                <Icon type="book" theme="twoTone" />
                <span>文档</span>
              </a>
            </li>
          </ul>
        </nav>
      </Layout.Header>
    );
  }
}

export default Header;