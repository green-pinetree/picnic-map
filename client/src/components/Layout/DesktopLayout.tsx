import React, { ReactNode } from 'react';
import Map from '../common/Map';
import SideBar from '../common/SideBar';
import Filter from '../Filter';
import styled from '@emotion/styled';

interface DesktopLayoutProps {
  children: ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  return (
    <div className="desktop-layout">
      <SideBar>{children}</SideBar>
      <Section>
        <Filter />
        <Map />
      </Section>
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
