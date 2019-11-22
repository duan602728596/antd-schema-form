import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Index from './Index/index';

function ModuleLayout(props) {
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

export default ModuleLayout;