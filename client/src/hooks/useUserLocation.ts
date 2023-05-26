import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCenter } from '@/store/centerLocation';
import { addLocation } from '@/store/userLocation';

export const useUserLocation = () => {
  const [isGetLocation, setIsGetLocation] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setIsGetLocation(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      dispatch(addLocation({ ...location }));
      dispatch(addCenter({ ...location }));
      setIsGetLocation(false);
    });
  }, []);
  return { isGetLocation };
};
