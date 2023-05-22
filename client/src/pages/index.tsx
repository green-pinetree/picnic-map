import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '@/components/common/Header';
import Map from '@/components/common/Map';
import Drawer from '@/components/Drawer';
import Filter from '@/components/Filter';
import SearchContainer from '@/components/SearchContainer';
import SideBar from '@/components/SideBar';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import styled from '@emotion/styled';

export default function Home() {
  const dispatch = useDispatch();
  const { placeList, loading } = useSelector<ReducerType, PlaceListSliceState>(
    (state) => state.placeList
  );
  console.log(placeList, loading);
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
        </Section>
        <Drawer />
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
