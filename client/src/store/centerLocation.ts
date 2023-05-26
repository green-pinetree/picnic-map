import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CenterLocation {
  latitude: number | null;
  longitude: number | null;
}

export const centerLocation = createSlice({
  name: 'centerLocation',
  initialState: { latitude: null, longitude: null } as CenterLocation,
  reducers: {
    addCenter(state, action: PayloadAction<CenterLocation>) {
      return { ...action.payload };
    },
  },
});

export const { addCenter } = centerLocation.actions;
export default centerLocation.reducer;
