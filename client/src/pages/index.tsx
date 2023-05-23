import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/common/Loading';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import PlaceInfo from '@/components/PlaceInfo';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import BREAK_POINT from '@/styles/breakpoint';
import styled from '@emotion/styled';

export default function Home() {
  const dispatch = useDispatch();
  const { placeList, loading } = useSelector<ReducerType, PlaceListSliceState>(
    (state) => state.placeList
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        fetchPlaceList({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          type: [1, 7, 0],
          page: 1,
        })
      );
    });
  }, []);
  return (
    <>
      <MobileLayout>
        {loading ? (
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
        {loading ? (
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
