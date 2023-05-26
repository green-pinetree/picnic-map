import { combineReducers } from '@reduxjs/toolkit';
import centerLocation from './centerLocation';
import mapBounds from './mapBounds';
import placeList from './placeList';
import renderList from './renderList';
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
  renderList,
  centerLocation,
  mapBounds,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
