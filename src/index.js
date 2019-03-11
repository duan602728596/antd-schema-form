import React from 'react';
import { render } from 'react-dom';
import App from './App';

/* app */
render(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}