import createFormReducers from '../pages/CreateForm/reducers/reducers';
import previewReducers from '../pages/Preview/reducers/reducers';

/* reducers */
export const reducersMapObject = Object.assign({},
  createFormReducers,
  previewReducers
);