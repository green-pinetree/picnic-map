import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Loading from '@/components/atoms/Loading';
import Filter from '@/components/molecules/Filter';
import Map from '@/components/molecules/Map';
import Detail from '@/components/molecules/Detail';
import Drawer from '@/components/organisms/Drawer';
import Header from '@/components/organisms/Header';
import PlaceList from '@/components/molecules/PlaceList';
import SearchContainer from '@/components/molecules/SearchContainer';
import SideBar from '@/components/organisms/SideBar';
import { usePlaceList } from '@/hooks/usePlaceList';
import { useQueryString } from '@/hooks/useQueryString';
import { useUserLocation } from '@/hooks/useUserLocation';
import BREAK_POINT from '@/styles/breakpoint';

export default function Home() {
  const { id, search } = useQueryString();
  const { isGetLocation } = useUserLocation();
  const { isLoading } = usePlaceList();
  const [width, setWidth] = useState(BREAK_POINT.desktop);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);
  return (
    <Wrapper>
      <SideBar isLoading={isLoading || isGetLocation} />
      {width < BREAK_POINT.mobile && <Header mobile />}
      <Section>
        {width < BREAK_POINT.mobile && <SearchContainer />}
        {!search && !id && <Filter />}
        {isLoading || isGetLocation ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <Map />
        )}
      </Section>
      {id ? (
        <Drawer isDetail>
          <Detail />
        </Drawer>
      ) : (
        <Drawer>
          <PlaceList isLoading={isLoading || isGetLocation} mobile />
        </Drawer>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100vw;
    height: 100vh;
    height: -webkit-fill-available;
    height: fill-available;
  }
`;

const Section = styled.section`
  flex: 1;
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    height: 70%;
  }
`;
