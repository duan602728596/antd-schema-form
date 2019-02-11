// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './AppModule';

/* app */
ReactDOM.render(
  <App />,
  // $FlowFixMe
  document.getElementById('app')
);

// $FlowFixMe
if(module.hot) module.hot.accept();