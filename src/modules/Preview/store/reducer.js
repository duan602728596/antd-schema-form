import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const initData: {
  schemaJson: ?Immutable.Map
} = {
  schemaJson: null
};

/* Action */
export const setSchemaJson: Function = createAction('表单预览-schemaJson');

/* reducer */
const reducer: Function = handleActions({
  [setSchemaJson]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('schemaJson', Map(action.payload));
  }
}, fromJS(initData));

export default {
  preview: reducer
};