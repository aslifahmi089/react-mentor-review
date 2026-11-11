import { createSlice } from '@reduxjs/toolkit';

const viewSlice = createSlice({
  name: 'view',
  initialState: {
    currentView: 'home',
  },
  reducers: {
    setView: (state, action) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = viewSlice.actions;
export default viewSlice.reducer;