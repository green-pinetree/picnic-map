import React from 'react';
import styled from '@emotion/styled';
import Badge from './common/Badge';
import BREAK_POINT from '@/styles/breakpoint';
import { BADGE } from '@/styles/zIndex';

export default function Filter() {
  return (
    <Wrapper>
      <Badge>공원</Badge>
      <Badge>둘레길</Badge>
      <Badge>미술관</Badge>
      <Badge>공연장</Badge>
      <Badge>도서관</Badge>
      <Badge>박물관</Badge>
      <Badge>기타</Badge>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  position: absolute;
  z-index: ${BADGE};
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  div {
    margin: 10px;
  }
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    top: 120px;
  }
`;
