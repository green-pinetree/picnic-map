import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Drawer from '../common/Drawer';
import Header from '../common/Header';
import Map from '../common/Map';
import Filter from '../Filter';
import SearchContainer from '../SearchContainer';

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const router = useRouter();
  const { search, id } = router.query;
  return (
    <div className="mobile-layout">
      <Header mobile />
      <Section>
        <SearchContainer />
        {!search && !id && <Filter />}
        <Map />
      </Section>
      <Drawer title={id ? '' : '주변 장소'}>{children}</Drawer>
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
