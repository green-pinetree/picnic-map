import React, { useState, TouchEvent } from 'react';
import PlaceInfo from './common/PlaceInfo';
import { subtitle1 } from '@/styles/font';
import { DRAWER } from '@/styles/zIndex';
import styled from '@emotion/styled';

export default function Drawer() {
  const [drawerHeight, setDrawerHeight] = useState(300);
  const touchMoveHandler = (e: TouchEvent<HTMLDivElement>) => {
    let changeHeight = window.innerHeight - e.targetTouches[0].clientY;
    if (changeHeight < 35) {
      changeHeight = 33;
    }
    setDrawerHeight(changeHeight);
  };
  return (
    <PlaceContainer {...{ drawerHeight }}>
      <Header onTouchMove={(e) => touchMoveHandler(e)}>
        <Bar />
        <Title>주변 장소</Title>
      </Header>
      <Contents>
        <PlaceInfo imgSrc="/dummyimg.png" name="서울숲" address="설명설명" description="설명설명" />
        <PlaceInfo imgSrc="/dummyimg.png" name="서울숲" address="설명설명" description="설명설명" />
        <PlaceInfo imgSrc="/dummyimg.png" name="서울숲" address="설명설명" description="설명설명" />
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
  max-height: 100vh;
  width: 100%;
  overflow-y: hidden;
  border-radius: 40px 40px 0px 0px;
`;

const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
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
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
