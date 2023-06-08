import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCenter } from '@/store/centerLocation';
import { PlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import { UserLocation } from '@/store/userLocation';

export const useSetCenter = () => {
  const dispatch = useDispatch();
  const placeList = useSelector<ReducerType, PlaceList>((state) => state.placeList);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );

  useEffect(() => {
    const center = placeList.filter((node) => node.lat !== 0 && node.lng !== 0);
    if (center.length !== 0)
      dispatch(addCenter({ latitude: center[0].lat, longitude: center[0].lng }));
    else dispatch(addCenter({ latitude, longitude }));
  }, [placeList.length]);
};
