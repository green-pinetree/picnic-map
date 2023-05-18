import Image from 'next/image';
import React from 'react';
import Button from './Button';
import DateInfo from './DateInfo';
import Header from './Header';
import SearchBar from './SearchBar';
import BREAK_POINT from '@/styles/breakpoint';
import { body1, subtitle1, subtitle2 } from '@/styles/font';
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
          <Place>
            <ImageBox>
              <Image src="/dummyimg.png" alt="Logo" width={360} height={180} priority />
              <div>서울숲</div>
            </ImageBox>
            <Description>
              <div>
                <span>공원 주소: </span>
                <span>설명설명</span>
              </div>
              <div>
                <span>공원 개요: </span>
                <span>설명설명</span>
              </div>
            </Description>
          </Place>
          <Place>
            <ImageBox>
              <Image src="/dummyimg.png" alt="Logo" width={360} height={180} priority />
              <div>서울숲</div>
            </ImageBox>
            <Description>
              <div>
                <span>공원 주소: </span>
                <span>설명설명</span>
              </div>
              <div>
                <span>공원 개요: </span>
                <span>설명설명</span>
              </div>
            </Description>
          </Place>
          <Place>
            <ImageBox>
              <Image src="/dummyimg.png" alt="Logo" width={360} height={180} priority />
              <div>서울숲</div>
            </ImageBox>
            <Description>
              <div>
                <span>공원 주소: </span>
                <span>설명설명</span>
              </div>
              <div>
                <span>공원 개요: </span>
                <span>설명설명</span>
              </div>
            </Description>
          </Place>
          <Place>
            <ImageBox>
              <Image src="/dummyimg.png" alt="Logo" width={360} height={180} priority />
              <div>서울숲</div>
            </ImageBox>
            <Description>
              <div>
                <span>공원 주소: </span>
                <span>설명설명</span>
              </div>
              <div>
                <span>공원 개요: </span>
                <span>설명설명</span>
              </div>
            </Description>
          </Place>
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
  padding: 12px;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 5px;
`;

const PlaceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Title = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  ${subtitle1}
  height: 30px;
  width: 94%;
  padding: 0px 10px;
`;

const Contents = styled.div`
  width: 94%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  overflow-y: auto;
`;

const Place = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
`;

const ImageBox = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    ${subtitle2}
    height: 40px;
    line-height: 40px;
  }
`;

const Description = styled.div`
  width: 100%;
  padding: 10px;
  div {
    width: 100%;
    height: 30px;
    ${body1}
  }
`;
