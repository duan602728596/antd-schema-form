import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';

const initData = {
  schemaJson: Map({
    id: '$root',
    type: 'object',
    title: '$root',
    properties: {}
  })
};

/* Action */
export const setSchemaJson = createAction('表单生成-schemaJson');

/* reducer */
const models = handleActions({
  [setSchemaJson]($$state, action) {
    return $$state.set('schemaJson', Map(action.payload));
  }
}, fromJS(initData));

export default {
  createForm: models
};