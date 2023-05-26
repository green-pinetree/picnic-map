import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { Bounds } from '@/store/mapBounds';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { addRenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { SearchListSliceState } from '@/store/searchList';
import { TypeFilter } from '@/store/typeFilter';
import { UserLocation } from '@/store/userLocation';

export const useRenderList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { placeList, loading } = useSelector<ReducerType, PlaceListSliceState>(
    (state) => state.placeList
  );
  const { searchList } = useSelector<ReducerType, SearchListSliceState>(
    (state) => state.searchList
  );
  const typeFilter = useSelector<ReducerType, TypeFilter>((state) => state.typeFilter);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const { max, min } = useSelector<ReducerType, Bounds>((state) => state.mapBounds);
  useEffect(() => {
    if (!latitude || !longitude) return;
    const typeList: number[] = [];
    typeFilter.map((filter, index) => filter && typeList.push(index));
    dispatch(
      fetchPlaceList({
        latitude,
        longitude,
        type: typeList,
        page: 1,
        bounds: { min: { ...min }, max: { ...max } },
      })
    );
  }, [min, max, typeFilter]);

  useEffect(() => {
    if (searchList.length === 0) {
      dispatch(addRenderList(placeList));
      return;
    }
    dispatch(addRenderList(searchList));
  }, [placeList.length, searchList.length]);
  return { isLoading: loading };
};