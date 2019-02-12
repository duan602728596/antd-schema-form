// @flow
import * as React from 'react';
import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadReducer from '../../store/loadReducer';
import reducer from './store/reducer';
import Index from './Index/index';
import { I18NContext } from '../../components/I18N/I18N';

@loadReducer(reducer)
class ModuleLayout extends Component<{}>{
  static contextType: React.Context<Object> = I18NContext;

  render(): Array<React.Node>{
    const { preview }: { preview: Object } = this.context.languagePack;

    return [
      <Helmet key="helmet">
        <title>{ preview.title }</title>
      </Helmet>,
      <Switch key="main">
        <Route path="/Preview" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;