import React from 'react';
import Badge from './common/Badge';
import Button from './common/Button';
import SearchBar from './common/SearchBar';
import Map from './Map';
import { BADGE } from '@/styles/zIndex';
import styled from '@emotion/styled';

export default function MobileSection() {
  return (
    <Wrapper>
      <SearchContainer>
        <SearchBar />
        <Button label="search" size="middle">
          검색
        </Button>
      </SearchContainer>
      <Filter>
        <Badge>공원</Badge>
        <Badge>둘레길</Badge>
        <Badge>미술관</Badge>
        <Badge>공연장</Badge>
        <Badge>도서관</Badge>
        <Badge>박물관</Badge>
        <Badge>기타</Badge>
      </Filter>
      <Map />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  flex: 1;
`;
const SearchContainer = styled.div`
  width: 100vw;
  display: flex;
  position: absolute;
  z-index: ${BADGE};
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;
const Filter = styled.div`
  width: 100vw;
  display: flex;
  position: absolute;
  top: 120px;
  z-index: ${BADGE};
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    margin: 10px;
  }
`;
