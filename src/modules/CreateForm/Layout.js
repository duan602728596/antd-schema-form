import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadReducer from '../../store/loadReducer';
import reducer from './store/reducer';
import Index from './Index/index';

@loadReducer(reducer)
class ModuleLayout extends Component{
  render(): React.ChildrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>表单生成</title>
      </Helmet>,
      <Switch key="main">
        <Route path="/CreateForm" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;