import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import style from './style.sass';
import Nav from './Nav';

class Header extends Component{
  render(): React.Element{
    return (
      <Layout.Header>
        <div className={ style.headerBox }>
          <Nav />
          <a className={ style.github }
            href="https://github.com/duan602728596/antd-schema-form"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon type="github" />
          </a>
        </div>
      </Layout.Header>
    );
  }
}

export default Header;