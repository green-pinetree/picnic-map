import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryString } from './useQueryString';
import { addCenter } from '@/store/centerLocation';
import { ReducerType } from '@/store/rootReducer';
import { addLocation, UserLocation } from '@/store/userLocation';

export const useUserLocation = () => {
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const [isGetLocation, setIsGetLocation] = useState(false);
  const dispatch = useDispatch();
  const { id } = useQueryString();
  const setUserLocation = (position: { coords: { latitude: number; longitude: number } }) => {
    const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    dispatch(addLocation({ ...location }));
    if (!id) dispatch(addCenter({ ...location }));
    setIsGetLocation(false);
  };
  const setExceptLocation = () => {
    const location = { latitude: 37.574187, longitude: 126.976882 };
    dispatch(addLocation({ ...location }));
    if (!id) dispatch(addCenter({ ...location }));
    setIsGetLocation(false);
  };
  useEffect(() => {
    if (latitude && longitude) return;
    setIsGetLocation(true);
    navigator.geolocation.getCurrentPosition(setUserLocation, setExceptLocation);
  }, [id]);
  return { isGetLocation };
};
