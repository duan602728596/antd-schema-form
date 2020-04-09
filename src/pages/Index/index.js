import React from 'react';
import { useRoutes } from 'react-router-dom';
import Helmet from 'react-helmet';
import Demo from './Demo';

function ModuleLayout(props) {
  const routes = useRoutes([
    { path: '/', element: <Demo /> },
    { path: 'Index', element: <Demo /> }
  ]);

  return [
    <Helmet key="helmet">
      <title>antd-schema-form</title>
    </Helmet>,
    routes
  ];
}

export default ModuleLayout;