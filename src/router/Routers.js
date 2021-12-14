import { useRoutes } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../pages/Index/index';

const CreateForm = asyncModule(() => import(/* webpackChunkName: 'createForm' */'../pages/CreateForm/index'));
const Preview = asyncModule(() => import(/* webpackChunkName: 'preview' */'../pages/Preview/index'));

function Routers(props) {
  const routes = useRoutes([
    { path: '/*', element: <Index /> },
    { path: 'CreateForm', element: <CreateForm /> },
    { path: 'Preview', element: <Preview /> }
  ]);

  return routes;
}

export default Routers;