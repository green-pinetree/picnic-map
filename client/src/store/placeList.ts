import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserLocation } from './userLocation';
import { Response } from '@/types/Response';
import { httpGet } from '@/utils/http';

export interface Place {
  id: number;
  type: { code: number; msg: string };
  name: string;
  content: string | null;
  lng: number;
  lat: number;
  image: string[];
  detail: {
    area: string | null;
    mainEquip: string | null;
    mainPlants: string | null;
    directions: string | null;
    address: string | null;
    tel: string | null;
    distance: string | null;
    leadTime: string | null;
    relateSubway: string | null;
    path: string | null;
    homepage: string | null;
  };
  near: number | null;
}

export type PlaceListSliceState = {
  loading: boolean;
  error: null | Response<null>;
  placeList: Place[];
};

// 비동기 통신 구현
export const fetchPlaceList = createAsyncThunk(
  'fetchPlaceList',
  async ({ latitude, longitude, type, page }: UserLocation & { type: number[]; page: number }) => {
    const data = await httpGet(
      `/api/place/list?type=${type.join(',')}&lng=${longitude}&lat=${latitude}&page=${page}&size=10`
    );
    return data;
  }
);

export const initialState: PlaceListSliceState = {
  loading: false,
  error: null,
  placeList: [],
};

export const placeList = createSlice({
  name: 'placeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 통신 중
      .addCase(fetchPlaceList.pending, (state) => ({ ...state, loading: true, error: null }))
      // 통신 성공
      .addCase(fetchPlaceList.fulfilled, (state, { payload }) => ({
        ...state,
        error: null,
        loading: false,
        placeList: payload.data,
      }))
      // 통신 에러
      .addCase(fetchPlaceList.rejected, (state, { payload }) => ({
        ...state,
        error: payload as Response<null>,
        loading: false,
      }));
  },
});

export default placeList.reducer;
