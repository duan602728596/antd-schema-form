import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import style from './style.sass';

function Nav(props: Object): React.Element{
  return (
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
          <Link to="/Preview">
            <Icon type="eye" theme="twoTone" />
            <span>表单预览</span>
          </Link>
        </li>
        <li>
          <a href="https://github.com/duan602728596/antd-schema-form#antd-schema-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="book" theme="twoTone" />
            <span>文档</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;