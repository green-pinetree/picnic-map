import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCenter } from '@/store/centerLocation';
import { addLocation } from '@/store/userLocation';

export const useUserLocation = () => {
  const [isGetLocation, setIsGetLocation] = useState(false);
  const dispatch = useDispatch();
  const setUserLocation = (position: { coords: { latitude: number; longitude: number } }) => {
    const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
    dispatch(addLocation({ ...location }));
    dispatch(addCenter({ ...location }));
    setIsGetLocation(false);
  };
  const setExceptLocation = () => {
    const location = { latitude: 37.574187, longitude: 126.976882 };
    dispatch(addLocation({ ...location }));
    dispatch(addCenter({ ...location }));
    setIsGetLocation(false);
  };
  useEffect(() => {
    setIsGetLocation(true);
    navigator.geolocation.getCurrentPosition(setUserLocation, setExceptLocation);
  }, []);
  return { isGetLocation };
};
