import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from '@/components/common/Loading';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import PlaceInfo from '@/components/PlaceInfo';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import { AppDispatch } from '@/store/store';
import { TypeFilter } from '@/store/typeFilter';
import { addLocation, UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [isGetLocation, setIsGetLocation] = useState(false);
  const { placeList } = useSelector<ReducerType, PlaceListSliceState>((state) => state.placeList);
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
  return (
    <>
      <MobileLayout>
        {isGetLocation ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          placeList.map((place) => (
            <PlaceInfo
              key={place.id}
              imgSrc={place.image[0]}
              name={place.name}
              address={place.detail.address || ''}
              content={place.content || ''}
              type={place.type}
              mobile
            />
          ))
        )}
      </MobileLayout>
      <DesktopLayout>
        {isGetLocation ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          placeList.map((place) => (
            <PlaceInfo
              key={place.id}
              imgSrc={place.image[0]}
              name={place.name}
              address={place.detail.address || ''}
              content={place.content || ''}
              type={place.type}
            />
          ))
        )}
      </DesktopLayout>
    </>
  );
}
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    margin-top: 40px;
  }
`;
