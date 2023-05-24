import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserLocation } from './userLocation';
import { Response } from '@/types/Response';
import { httpGet } from '@/utils/http';

export interface Weather {
  district: string;
  date: string;
  skyCode: 1 | 3 | 4;
  skyName: string;
  ptyCode: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  ptyName: string;
  pop: number;
  airMaxIndex: number;
  airGradeCode: 0 | 1 | 2 | 3;
  airGradeName: string;
}

export type WeatherListSliceState = {
  loading: boolean;
  error: null | Response<null>;
  weatherList: Weather[];
  current: Weather | null;
};

// 비동기 통신 구현
export const fetchWeatherList = createAsyncThunk(
  'fetchWeatherList',
  async ({ latitude, longitude }: UserLocation) => {
    const data = await httpGet(`/api/weather?lng=${longitude}&lat=${latitude}`);
    return data;
  }
);

export const initialState: WeatherListSliceState = {
  loading: false,
  error: null,
  weatherList: [],
  current: null,
};

export const weatherList = createSlice({
  name: 'weatherList',
  initialState,
  reducers: {
    addWeather(state, action: PayloadAction<Weather>) {
      return { ...state, current: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // 통신 중
      .addCase(fetchWeatherList.pending, (state) => ({ ...state, loading: true, error: null }))
      // 통신 성공
      .addCase(fetchWeatherList.fulfilled, (state, { payload }) => ({
        ...state,
        error: null,
        loading: false,
        weatherList: payload.data,
        current: payload.data[0],
      }))
      // 통신 에러
      .addCase(fetchWeatherList.rejected, (state, { payload }) => ({
        ...state,
        error: payload as Response<null>,
        loading: false,
      }));
  },
});
export const { addWeather } = weatherList.actions;
export default weatherList.reducer;
