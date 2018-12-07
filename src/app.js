import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './AppModule';

/* app */
ReactDOM.render(
  <App />,
  document.getElementById('app')
);

if(module.hot){
  module.hot.accept();
}
