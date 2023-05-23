import React, { ReactNode } from 'react';
import Drawer from '../common/Drawer';
import Header from '../common/Header';
import Map from '../common/Map';
import Filter from '../Filter';
import SearchContainer from '../SearchContainer';
import styled from '@emotion/styled';

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="mobile-layout">
      <Header mobile />
      <Section>
        <SearchContainer />
        <Filter />
        <Map />
      </Section>
      <Drawer>{children}</Drawer>
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;