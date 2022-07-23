import { useRoutes } from 'react-router-dom';
import Index from '../pages/Index/index';
import CreateForm from '../pages/CreateForm/index';
import Preview from '../pages/Preview/index';

function Routers(props) {
  const routes = useRoutes([
    { path: '/*', element: <Index /> },
    { path: 'CreateForm', element: <CreateForm /> },
    { path: 'Preview', element: <Preview /> }
  ]);

  return routes;
}

export default Routers;