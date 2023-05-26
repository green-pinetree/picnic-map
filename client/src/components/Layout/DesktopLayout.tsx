import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import Loading from '../common/Loading';
import Map from '../common/Map';
import SideBar from '../common/SideBar';
import Filter from '../Filter';

interface DesktopLayoutProps {
  title?: string;
  children: ReactNode;
  isGetLocation: boolean;
}

export default function DesktopLayout({ title, children, isGetLocation }: DesktopLayoutProps) {
  const router = useRouter();
  const { search, id } = router.query;
  return (
    <div className="desktop-layout">
      <SideBar {...{ title }}>{children}</SideBar>
      {isGetLocation ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <Section>
          {!search && !id && <Filter />}
          <Map />
        </Section>
      )}
    </div>
  );
}
const Section = styled.section`
  flex: 1;
`;
const LoadingContainer = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
