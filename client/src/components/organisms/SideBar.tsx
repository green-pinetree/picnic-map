import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import DateInfo from '../molecules/DateInfo';
import Header from '../molecules/Header';
import SearchContainer from '../molecules/SearchContainer';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle1 } from '@/styles/font';

interface SideBarProps {
  title?: string;
  children: ReactNode;
}
export default function SideBar({ title = '주변 장소', children }: SideBarProps) {
  return (
    <Wrapper>
      <Header />
      <SearchContainer />
      <DateContainer>
        <DateInfo />
      </DateContainer>
      <PlaceContainer>
        <Title>{title}</Title>
        <Contents>{children}</Contents>
      </PlaceContainer>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  width: 390px;
  border-right: 1px solid ${({ theme }) => theme.color.gray200};
  height: 100vh;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    display: none;
  }
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 50px;
  padding: 5px;
`;

const PlaceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 78px - 67px - 40px);
`;

const Title = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  ${subtitle1}
  height: 30px;
  width: 100%;
  padding: 0px 10px;
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;
