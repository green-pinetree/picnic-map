import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserLocation {
  latitude: number | null;
  longitude: number | null;
}

export const userLocation = createSlice({
  name: 'userLocation',
  initialState: { latitude: null, longitude: null } as UserLocation,
  reducers: {
    addLocation(state, action: PayloadAction<UserLocation>) {
      return { ...action.payload };
    },
  },
});

export const { addLocation } = userLocation.actions;
export default userLocation.reducer;
