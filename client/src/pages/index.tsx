import styled from '@emotion/styled';
import Loading from '@/components/atoms/Loading';
import Detail from '@/components/molecules/Detail';
import Filter from '@/components/molecules/Filter';
import Map from '@/components/molecules/Map';
import PlaceList from '@/components/molecules/PlaceList';
import Drawer from '@/components/organisms/Drawer';
import SideBar from '@/components/organisms/SideBar';
import TobBar from '@/components/organisms/TobBar';
import { useDetail } from '@/hooks/useDetail';
import { usePlaceList } from '@/hooks/usePlaceList';
import { useQueryString } from '@/hooks/useQueryString';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useWeather } from '@/hooks/useWeather';
import BREAK_POINT from '@/styles/breakpoint';

export default function Home() {
  const { id, search } = useQueryString();
  const { isGetLocation } = useUserLocation();
  const { isLoading } = usePlaceList();
  useDetail();
  useWeather();
  
  return (
    <Wrapper>
      <SideBar isLoading={isLoading || isGetLocation} />
      <TobBar />
      <Section>
        {!search && !id && <Filter />}
        {isGetLocation ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <Map />
        )}
      </Section>
      <Drawer isDetail={!!id}>
        {id ? <Detail /> : <PlaceList isLoading={isLoading || isGetLocation} mobile />}
      </Drawer>
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
