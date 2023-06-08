import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import DetailBackIcon from '@/components/atoms/DetailBackIcon';
import Filter from '@/components/molecules/Filter';
import Header from '@/components/molecules/Header';
import Map from '@/components/molecules/Map';
import SearchContainer from '@/components/molecules/SearchContainer';
import Detail from '@/components/organisms/Detail';
import Drawer from '@/components/organisms/Drawer';
import PlaceList from '@/components/organisms/PlaceList';
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
      <SideBar>
        <PlaceList isLoading={isLoading || isGetLocation} />
        {id && (
          <DetailWrapper>
            <DetailBackIcon />
            <Detail />
          </DetailWrapper>
        )}
      </SideBar>
      {width < BREAK_POINT.mobile && <Header mobile />}
      <Section>
        {width < BREAK_POINT.mobile && <SearchContainer />}
        {!search && !id && <Filter />}
        <Map />
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

const DetailWrapper = styled.div`
  padding: 5px;
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  left: 390px;
  top: 0px;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.white};
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.color.gray200};
`;
const Section = styled.section`
  flex: 1;
`;
