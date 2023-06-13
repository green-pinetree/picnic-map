import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Place } from '@/types/Place';

export type PlaceList = Place[] | null;

export const placeList = createSlice({
  name: 'placeList',
  initialState: [] as PlaceList,
  reducers: {
    addPlaceList(state, action: PayloadAction<Place[] | null>) {
      return action.payload;
    },
  },
});

export const { addPlaceList } = placeList.actions;
export default placeList.reducer;
