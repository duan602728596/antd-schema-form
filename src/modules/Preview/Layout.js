import React, { Component, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadReducer from '../../store/loadReducer';
import reducer from './reducer/reducer';
import Index from './Index/index';
import { I18NContext } from '../../components/I18N/I18N';

function ModuleLayout(props) {
  const context = useContext(I18NContext);
  const { preview } = context.languagePack;

  return [
    <Helmet key="helmet">
      <title>{ preview.title }</title>
    </Helmet>,
    <Switch key="main">
      <Route path="/Preview" component={ Index } exact={ true } />
    </Switch>
  ];
}

export default loadReducer(reducer)(ModuleLayout);