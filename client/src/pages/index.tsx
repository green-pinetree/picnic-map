import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '@/components/common/Header';
import Map from '@/components/common/Map';
import Drawer from '@/components/Drawer';
import Filter from '@/components/Filter';
import SearchContainer from '@/components/SearchContainer';
import SideBar from '@/components/SideBar';
import { fetchPlaceList } from '@/store/placeList';
// import { ReducerType } from '@/store/rootReducer';
import styled from '@emotion/styled';

export default function Home() {
  const dispatch = useDispatch();
  // const { placeList } = useSelector<ReducerType, PlaceListSliceState>((state) => state.placeList);
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
      <div className="mobile-layout">
        <Header mobile />
        <Section>
          <SearchContainer />
          <Filter />
          <Map />
          <Drawer />
        </Section>
      </div>
      <div className="desktop-layout">
        <SideBar />
        <Section>
          <Filter />
          <Map />
        </Section>
      </div>
    </>
  );
}

const Section = styled.section`
  flex: 1;
`;
