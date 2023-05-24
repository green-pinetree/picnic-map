import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import RenderPlaceList from '@/components/RenderPlaceList';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { addRenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { SearchListSliceState } from '@/store/searchList';
import { AppDispatch } from '@/store/store';
import { TypeFilter } from '@/store/typeFilter';
import { addLocation, UserLocation } from '@/store/userLocation';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [isGetLocation, setIsGetLocation] = useState(false);
  const { placeList } = useSelector<ReducerType, PlaceListSliceState>((state) => state.placeList);
  const { searchList } = useSelector<ReducerType, SearchListSliceState>(
    (state) => state.searchList
  );
  const typeFilter = useSelector<ReducerType, TypeFilter>((state) => state.typeFilter);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  useEffect(() => {
    setIsGetLocation(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      dispatch(addLocation({ ...location }));
      setIsGetLocation(false);
    });
  }, []);
  useEffect(() => {
    if (!latitude || !longitude) return;
    const typeList: number[] = [];
    typeFilter.map((type, index) => type && typeList.push(index));
    dispatch(
      fetchPlaceList({
        latitude,
        longitude,
        type: typeList,
        page: 1,
      })
    );
  }, [latitude, longitude, typeFilter]);

  useEffect(() => {
    if (searchList.length === 0) {
      dispatch(addRenderList(placeList));
      return;
    }
    dispatch(addRenderList(searchList));
  }, [placeList.length, searchList.length]);
  return (
    <>
      <MobileLayout>
        <RenderPlaceList {...{ isGetLocation }} mobile />
      </MobileLayout>
      <DesktopLayout>
        <RenderPlaceList {...{ isGetLocation }} />
      </DesktopLayout>
    </>
  );
}
