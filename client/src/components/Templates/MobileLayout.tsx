import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Filter from '../molecules/Filter';
import Header from '../molecules/Header';
import Map from '../molecules/Map';
import SearchContainer from '../molecules/SearchContainer';

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
      {children}
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
