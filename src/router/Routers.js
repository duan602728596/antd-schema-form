import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../modules/Index/Layout';

const CreateForm: Function = asyncModule((): Promise => import('../modules/CreateForm/Layout'));
const Preview: Function = asyncModule((): Promise => import('../modules/Preview/Layout'));

class Routers extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } />
        <Route path="/CreateForm" component={ CreateForm } />
        <Route path="/Preview" component={ Preview } />
      </Switch>
    );
  }
}

export default Routers;