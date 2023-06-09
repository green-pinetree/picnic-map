import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryString } from './useQueryString';
import { AppDispatch } from '@/store';
import { addCenter } from '@/store/centerLocation';
import { Bounds } from '@/store/mapBounds';
import { addPlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import { TypeFilter } from '@/store/typeFilter';
import { UserLocation } from '@/store/userLocation';
import { Place } from '@/types/Place';
import { httpGet } from '@/utils/http';

export const usePlaceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const { search, id } = useQueryString();

  const typeFilter = useSelector<ReducerType, TypeFilter>((state) => state.typeFilter);

  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const { max, min } = useSelector<ReducerType, Bounds>((state) => state.mapBounds);

  const fetchPlaceList = useCallback(async () => {
    setIsLoading(true);
    const bounds = { min: { ...min }, max: { ...max } };
    const typeList: number[] = [];
    typeFilter.map((filter, index) => filter && typeList.push(index));
    const data = await httpGet(
      `/api/place/list?type=${typeList.join(',')}&lat=${
        (bounds.min.lat + bounds.max.lat) / 2
      }&lng=${(bounds.max.lng + bounds.min.lng) / 2}&latLT=${bounds.max.lat}&lngLT=${
        bounds.min.lng
      }&latRB=${bounds.min.lat}&lngRB=${bounds.max.lng}`
    );
    dispatch(addPlaceList(data.data));
    setIsLoading(false);
  }, [min, max, typeFilter]);

  const fetchSearchList = useCallback(async () => {
    setIsLoading(true);
    const data = await httpGet(
      `/api/place/search?q=${search}&lng=${longitude}&lat=${latitude}&page=1&size=20`
    );
    const searchList = data.data;
    dispatch(addPlaceList(searchList));
    if (!id) {
      const center = searchList.filter((node: Place) => node.lat !== 0 && node.lng !== 0);
      if (center.length !== 0)
        dispatch(addCenter({ latitude: center[0].lat, longitude: center[0].lng }));
      else dispatch(addCenter({ latitude, longitude }));
    }
    setIsLoading(false);
  }, [search, latitude, longitude]);

  useEffect(() => {
    if (!latitude || !longitude) return;
    if (search || id) return;
    fetchPlaceList();
  }, [min, max, typeFilter, search]);

  useEffect(() => {
    if (!latitude || !longitude) return;
    if (!search) return;
    fetchSearchList();
  }, [search, latitude, longitude]);
  return { isLoading };
};
