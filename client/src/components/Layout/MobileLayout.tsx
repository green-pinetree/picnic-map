import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
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
      {children}
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
