import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const initData = {
  schemaJson: null
};

/* Action */
export const setSchemaJson = createAction('表单预览-schemaJson');

/* reducer */
const reducer = handleActions({
  [setSchemaJson]: ($$state, action) => {
    return $$state.set('schemaJson', Map(action.payload));
  }
}, fromJS(initData));

export default {
  preview: reducer
};