import React, { useState, TouchEvent, ReactNode, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import CancelDetail from '../DetailBack';
import { subtitle1 } from '@/styles/font';
import { DRAWER } from '@/styles/zIndex';

interface DrawerProps {
  children: ReactNode;
  title?: string;
  isDetail?: boolean;
}

export default function Drawer({ children, title = '주변 장소', isDetail = false }: DrawerProps) {
  const [drawerHeight, setDrawerHeight] = useState(300);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [title]);
  const touchMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
    let changeHeight = window.innerHeight - e.targetTouches[0].clientY + 30;
    if (changeHeight < 150) {
      changeHeight = 33;
    }
    setDrawerHeight(changeHeight);
  };
  return (
    <PlaceContainer {...{ drawerHeight }}>
      <Header onTouchMove={(e) => touchMoveHandler(e)}>
        {isDetail ? (
          <TopWrapper>
            <CancelDetail />
            <Bar />
            <div style={{ width: '24px' }} />
          </TopWrapper>
        ) : (
          <Bar />
        )}
        <Title>{title}</Title>
      </Header>
      <Contents ref={scrollRef}>{children}</Contents>
    </PlaceContainer>
  );
}

const PlaceContainer = styled.div<{ drawerHeight: number }>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.white};
  z-index: ${DRAWER};
  position: absolute;
  bottom: 0;
  height: ${({ drawerHeight }) => `${drawerHeight}px`};
  max-height: calc(100vh - 58px);
  width: 100%;
  overflow-y: hidden;
  border-radius: 20px 20px 0px 0px;
  border-top: 1px solid ${({ theme }) => theme.color.gray400};
`;

const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Bar = styled.div`
  width: 40px;
  height: 4px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.gray300};
  margin: 10px 0px;
`;

const Title = styled.div`
  ${subtitle1}
  width: 90%;
  line-height: 30px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
