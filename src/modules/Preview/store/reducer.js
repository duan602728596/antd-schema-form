// @flow
import { createAction, handleActions } from 'redux-actions';
import * as Immutable from 'immutable';
import { fromJS, Map } from 'immutable';

const initData: {
  schemaJson: ?Immutable.Map<string, Object>
} = {
  schemaJson: null
};

/* Action */
export const setSchemaJson: Function = createAction('表单预览-schemaJson');

/* reducer */
const reducer: Function = handleActions({
  [setSchemaJson]: ($$state: Immutable.Map<string, Object>, action: Object): Immutable.Map<string, Object>=>{
    return $$state.set('schemaJson', Map(action.payload));
  }
}, fromJS(initData));

export default {
  preview: reducer
};