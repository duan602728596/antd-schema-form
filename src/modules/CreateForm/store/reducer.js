import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const initData: {
  schemaJson: Immutable.Map
} = {
  schemaJson: Map({
    id: '$root',
    type: 'object',
    title: 'title',
    properties: {}
  })
};

/* Action */
export const setSchemaJson: Function = createAction('表单生成-schemaJson');

/* reducer */
const reducer: Function = handleActions({
  [setSchemaJson]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('schemaJson', Map(action.payload));
  }
}, fromJS(initData));

export default {
  createForm: reducer
};