import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'createForm',
  initialState: {
    // TODO: 因为immer的不可变，所以使用这个方法来修改和存储值
    schemaJson: {
      id: '$root',
      type: 'object',
      title: '$root',
      properties: {}
    }
  },
  reducers: {
    // 表单生成schemaJson
    setSchemaJson(state, action) {
      state.schemaJson = action.payload;

      return state;
    }
  }
});

export const { setSchemaJson } = actions;
export default { createForm: reducer };