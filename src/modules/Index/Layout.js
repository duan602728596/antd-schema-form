import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Index from './Index/index';

class ModuleLayout extends Component{
  render(): React.ChildrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>antd-schema-form</title>
      </Helmet>,
      <Switch key="main">
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;