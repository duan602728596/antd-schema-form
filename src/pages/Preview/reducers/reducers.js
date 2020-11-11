import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'preview',
  initialState: {
    schemaJson: null
  },
  reducers: {
    // 表单预览schemaJson
    setSchemaJson(state, action) {
      state.schemaJson = action.payload;

      return state;
    }
  }
});

export const { setSchemaJson } = actions;
export default { preview: reducer };