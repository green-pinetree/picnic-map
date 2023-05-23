import React from 'react';
import Button from './common/Button';
import SearchBar from './common/SearchBar';
import BREAK_POINT from '@/styles/breakpoint';
import { BADGE } from '@/styles/zIndex';
import styled from '@emotion/styled';

export default function SearchContainer() {
  return (
    <Wrapper>
      <SearchBar />
      <Button label="search" size="middle">
        검색
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 100vw;
    position: absolute;
    z-index: ${BADGE};
  }
`;
