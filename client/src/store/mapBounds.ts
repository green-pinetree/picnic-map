import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bounds {
  min: { lat: number; lng: number };
  max: { lat: number; lng: number };
}

export const mapBounds = createSlice({
  name: 'mapBounds',
  initialState: { min: { lat: 0, lng: 0 }, max: { lat: 0, lng: 0 } } as Bounds,
  reducers: {
    addBounds(state, action: PayloadAction<Bounds>) {
      return { ...action.payload };
    },
  },
});

export const { addBounds } = mapBounds.actions;
export default mapBounds.reducer;
