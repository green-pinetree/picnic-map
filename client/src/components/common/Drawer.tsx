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

const MIN_HEIGHT = 34;
const MIDDLE_HEIGHT = 300;

export default function Drawer({ children, title = '주변 장소', isDetail = false }: DrawerProps) {
  const [drawerHeight, setDrawerHeight] = useState(MIDDLE_HEIGHT);
  const [drawerEndHeight, setDrawerEndHeight] = useState(MIDDLE_HEIGHT);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [title]);
  const touchMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
    const changeHeight = window.innerHeight - e.targetTouches[0].clientY + 30;
    // 일정 범위 이상 터치 이동해야 서랍 이동
    if (Math.abs(changeHeight - drawerEndHeight) < 20) return;
    setDrawerHeight(changeHeight);
  };
  const touchEndHandler = (e: TouchEvent<HTMLDivElement>) => {
    const changeHeight = window.innerHeight - e.changedTouches[0].clientY + 30;
    // 일정 범위 이상 터치 이동해야 서랍 이동
    if (Math.abs(changeHeight - drawerEndHeight) < 20) return;
    // 서랍을 아래 방향으로 스와이프 한 경우
    if (changeHeight < drawerEndHeight) {
      // middle -> bottom
      if (changeHeight < MIDDLE_HEIGHT) {
        setDrawerHeight(MIN_HEIGHT);
        setDrawerEndHeight(MIN_HEIGHT);
      }
      // top -> middle
      else {
        setDrawerHeight(MIDDLE_HEIGHT);
        setDrawerEndHeight(MIDDLE_HEIGHT);
      }
    }
    // 서랍을 위로 스와이프 한 경우
    // middle -> top
    else if (drawerHeight > MIDDLE_HEIGHT) {
      setDrawerHeight(window.innerHeight - 58);
      setDrawerEndHeight(window.innerHeight - 58);
    }
    // bottom -> middle
    else {
      setDrawerHeight(MIDDLE_HEIGHT);
      setDrawerEndHeight(MIDDLE_HEIGHT);
    }
  };
  return (
    <PlaceContainer {...{ drawerHeight }}>
      <Header onTouchMove={(e) => touchMoveHandler(e)} onTouchEnd={(e) => touchEndHandler(e)}>
        {isDetail ? (
          <TopWrapper>
            <CancelDetail />
            <Bar />
            <div style={{ width: '24px' }} />
          </TopWrapper>
        ) : (
          <Bar />
        )}
      </Header>
      <Contents ref={scrollRef}>
        <Title>{title}</Title>
        {children}
      </Contents>
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
  min-height: ${MIN_HEIGHT}px;
  width: 100%;
  overflow-y: hidden;
  border-radius: 20px 20px 0px 0px;
  border-top: 1px solid ${({ theme }) => theme.color.gray400};
  transition: all 0.3s ease;
`;

const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 45px;
  justify-content: center;
`;

const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
