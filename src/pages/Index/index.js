import { Fragment } from 'react';
import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Demo from './Demo';

/* 网站首页 */
function Index(props) {
  const routes = useRoutes([
    { path: '/', element: <Demo /> },
    { path: 'Index', element: <Demo /> }
  ]);

  return (
    <Fragment>
      <Helmet>
        <title>antd-schema-form</title>
      </Helmet>
      { routes }
    </Fragment>
  );
}

export default Index;