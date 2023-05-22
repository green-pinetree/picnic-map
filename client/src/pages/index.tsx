import Filter from '@/components/common/Filter';
import Header from '@/components/common/Header';
import Map from '@/components/common/Map';
import SearchContainer from '@/components/common/SearchContainer';
import Drawer from '@/components/Drawer';
import SideBar from '@/components/SideBar';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <div>
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
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
