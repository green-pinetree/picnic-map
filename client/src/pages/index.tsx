import Header from '@/components/common/Header';
import Map from '@/components/common/Map';
import Drawer from '@/components/Drawer';
import Filter from '@/components/Filter';
import SearchContainer from '@/components/SearchContainer';
import SideBar from '@/components/SideBar';
import { httpGet } from '@/utils/http';
import styled from '@emotion/styled';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export default function Home() {
  // const { data, isLoading, isError } = useQuery(['placelist'], () =>
  //   httpGet('/api/place/list?type=1,7&lng=126.922027&lat=37.564501&page=1&size=5')
  // );
  // console.log(data);
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

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['placelist'],
    queryFn: () => httpGet('/api/place/list?type=1,7&lng=126.922027&lat=37.564501&page=1&size=5'),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Section = styled.section`
  flex: 1;
`;
