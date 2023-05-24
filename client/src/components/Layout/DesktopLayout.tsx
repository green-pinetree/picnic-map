import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Map from '../common/Map';
import SideBar from '../common/SideBar';
import Filter from '../Filter';

interface DesktopLayoutProps {
  children: ReactNode;
}

export default function DesktopLayout({ children }: DesktopLayoutProps) {
  const router = useRouter();
  const { search } = router.query;
  return (
    <div className="desktop-layout">
      <SideBar>{children}</SideBar>
      <Section>
        {!search && <Filter />}
        <Map />
      </Section>
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
