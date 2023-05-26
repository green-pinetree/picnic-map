import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Map from '../common/Map';
import SideBar from '../common/SideBar';
import Filter from '../Filter';

interface DesktopLayoutProps {
  title?: string;
  children: ReactNode;
}

export default function DesktopLayout({ title, children }: DesktopLayoutProps) {
  const router = useRouter();
  const { search, id } = router.query;
  return (
    <div className="desktop-layout">
      <SideBar {...{ title }}>{children}</SideBar>
      <Section>
        {!search && !id && <Filter />}
        <Map />
      </Section>
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
