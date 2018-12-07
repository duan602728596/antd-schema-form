import React, { Component } from 'react';
import { Layout } from 'antd';
import style from './style.sass';
import Header from '../Header/index';
import Routers from '../../router/Routers';

class Arrangement extends Component{
  render(): React.Element{
    return (
      <Layout className={ style.arrangement }>
        <Header />
        <Layout.Content className={ style.content }>
          <Routers />
        </Layout.Content>
      </Layout>
    );
  }
}

export default Arrangement;