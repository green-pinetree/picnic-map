import placeList from './placeList';
import userLocation from './userLocation';
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
  userLocation,
  placeList,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
