import 'regenerator-runtime';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* app */
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if (module.hot) module.hot.accept();