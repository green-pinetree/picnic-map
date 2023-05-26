import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserLocation } from './userLocation';
import { Place } from '@/types/Place';
import { Response } from '@/types/Response';
import { httpGet } from '@/utils/http';

export type SearchListSliceState = {
  loading: boolean;
  error: null | Response<null>;
  searchList: Place[];
};

// 비동기 통신 구현
export const fetchSearchList = createAsyncThunk(
  'fetchSearchList',
  async ({
    latitude,
    longitude,
    search,
    page,
  }: UserLocation & { search: string; page: number }) => {
    const data = await httpGet(
      `/api/place/search?q=${search}&lng=${longitude}&lat=${latitude}&page=${page}&size=10`
    );
    return data;
  }
);

export const initialState: SearchListSliceState = {
  loading: false,
  error: null,
  searchList: [],
};

export const searchList = createSlice({
  name: 'searchList',
  initialState,
  reducers: {
    addEmptySearchList(state, action: PayloadAction<[]>) {
      return { ...state, searchList: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // 통신 중
      .addCase(fetchSearchList.pending, (state) => ({ ...state, loading: true, error: null }))
      // 통신 성공
      .addCase(fetchSearchList.fulfilled, (state, { payload }) => ({
        ...state,
        error: null,
        loading: false,
        searchList: payload.data,
      }))
      // 통신 에러
      .addCase(fetchSearchList.rejected, (state, { payload }) => ({
        ...state,
        error: payload as Response<null>,
        loading: false,
      }));
  },
});
export const { addEmptySearchList } = searchList.actions;
export default searchList.reducer;
