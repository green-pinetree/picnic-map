import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TypeFilter = boolean[];

export const typeFilter = createSlice({
  name: 'typeFilter',
  initialState: [false, false, false, false, false, false, false, false],
  reducers: {
    addType(state, action: PayloadAction<{ type: Type; clickable: boolean }>) {
      const newState = [...state];
      newState[action.payload.type] = action.payload.clickable;
      return [...newState];
    },
  },
});

export const { addType } = typeFilter.actions;
export default typeFilter.reducer;
