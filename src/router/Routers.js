import React from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../pages/Index/Layout';

const CreateForm = asyncModule(() => import(/* webpackChunkName: 'createForm' */'../pages/CreateForm/Layout'));
const Preview = asyncModule(() => import(/* webpackChunkName: 'preview' */'../pages/Preview/Layout'));

function Routers(props) {
  return (
    <Switch>
      <Route path="/" component={ Index } exact={ true } />
      <Route path="/Index" component={ Index } />
      <Route path="/CreateForm" component={ CreateForm } />
      <Route path="/Preview" component={ Preview } />
    </Switch>
  );
}

export default Routers;