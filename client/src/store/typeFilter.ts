import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TypeFilter = boolean[];

const initialState = [false, false, false, false, false, false, false, false];

export const typeFilter = createSlice({
  name: 'typeFilter',
  initialState,
  reducers: {
    addType(state, action: PayloadAction<{ type: Type; clickable: boolean }>) {
      const newState = [...state];
      newState[action.payload.type] = action.payload.clickable;
      return [...newState];
    },
    initType() {
      return initialState;
    },
  },
});

export const { addType, initType } = typeFilter.actions;
export default typeFilter.reducer;
