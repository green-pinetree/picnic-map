import { combineReducers } from '@reduxjs/toolkit';
import placeList from './placeList';
import userLocation from './userLocation';
import weather from './weather';

const reducer = combineReducers({
  userLocation,
  placeList,
  weather,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
