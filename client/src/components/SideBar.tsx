import React from 'react';
import Button from './common/Button';
import DateInfo from './common/DateInfo';
import Header from './common/Header';
import PlaceInfo from './common/PlaceInfo';
import SearchBar from './common/SearchBar';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle1 } from '@/styles/font';
import styled from '@emotion/styled';

export default function SideBar() {
  return (
    <Wrapper>
      <Header />
      <SearchContainer>
        <SearchBar />
        <Button label="search" size="middle">
          검색
        </Button>
      </SearchContainer>
      <DateContainer>
        <DateInfo />
      </DateContainer>
      <PlaceContainer>
        <Title>주변 장소</Title>
        <Contents>
          <PlaceInfo
            imgSrc="/dummyimg.png"
            name="서울숲"
            address="설명설명"
            description="설명설명"
          />
          <PlaceInfo
            imgSrc="/dummyimg.png"
            name="서울숲"
            address="설명설명"
            description="설명설명"
          />
          <PlaceInfo
            imgSrc="/dummyimg.png"
            name="서울숲"
            address="설명설명"
            description="설명설명"
          />
        </Contents>
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 67px;
  padding: 12px;
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
