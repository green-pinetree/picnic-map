import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { QueryParam } from '@/hooks/useQueryString';
import { Place } from '@/types/Place';
import { Response } from '@/types/Response';
import { httpGet } from '@/utils/http';

export type DetailInfoSliceState = {
    loading: boolean;
    error: null | Response<null>;
    place: Place | null;
};

export const initialState: DetailInfoSliceState = {
    loading: false,
    error: null,
    place: null,
};

  // 비동기 통신 구현
export const fetchDetailInfo = createAsyncThunk(
    'fetchDetailInfo',
    async ({ type, id }: Omit<QueryParam, 'search'>) => {
      const data = await httpGet(`/api/place/detail?type=${type}&id=${id}`);
      return data;
    }
);

export const detail = createSlice({
name: 'detailInfo',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder
    // 통신 중
    .addCase(fetchDetailInfo.pending, (state) => ({ ...state, loading: true, error: null }))
    // 통신 성공
    .addCase(fetchDetailInfo.fulfilled, (state, { payload }) => ({
        ...state,
        error: null,
        loading: false,
        place: payload.data,
    }))
    // 통신 에러
    .addCase(fetchDetailInfo.rejected, (state, { payload }) => ({
        ...state,
        error: payload as Response<null>,
        loading: false,
    }));
},
});
export default detail.reducer;