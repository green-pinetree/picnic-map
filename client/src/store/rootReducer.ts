import { combineReducers } from '@reduxjs/toolkit';
import placeList from './placeList';
import searchList from './searchList';
import typeFilter from './typeFilter';
import userLocation from './userLocation';
import weather from './weather';

const reducer = combineReducers({
  userLocation,
  placeList,
  weather,
  typeFilter,
  searchList,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
