import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/common/Loading';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import PlaceInfo from '@/components/PlaceInfo';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';

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
          <Loading />
        ) : (
          placeList.map((place) => (
            <PlaceInfo
              imgSrc={place.image.at(0) ? place.image[0] : ''}
              name={place.name}
              address={place.detail.address ? place.detail.address : ''}
              description={place.content ? place.content : ''}
            />
          ))
        )}
      </MobileLayout>
      <DesktopLayout>
        {loading ? (
          <Loading />
        ) : (
          placeList.map((place) => (
            <PlaceInfo
              imgSrc={place.image.at(0) ? place.image[0] : ''}
              name={place.name}
              address={place.detail.address ? place.detail.address : ''}
              description={place.content ? place.content : ''}
            />
          ))
        )}
      </DesktopLayout>
    </>
  );
}
