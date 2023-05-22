import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export const userLocation = createSlice({
  name: 'userLocation',
  initialState: { latitude: 37.574187, longitude: 126.976882 } as UserLocation,
  reducers: {
    addLocation(state, action: PayloadAction<UserLocation>) {
      return { ...action.payload };
    },
  },
});

export const { addLocation } = userLocation.actions;
export default userLocation.reducer;
