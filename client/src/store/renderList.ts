import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '@/types/Place';

export type RenderList = Place[];

export const renderList = createSlice({
  name: 'renderList',
  initialState: [] as RenderList,
  reducers: {
    addRenderList(state, action: PayloadAction<Place[]>) {
      return [...action.payload];
    },
  },
});

export const { addRenderList } = renderList.actions;
export default renderList.reducer;
