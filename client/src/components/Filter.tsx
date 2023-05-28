import React from 'react';
import styled from '@emotion/styled';
import Badge from './common/Badge';
import BREAK_POINT from '@/styles/breakpoint';
import { BADGE } from '@/styles/zIndex';

export default function Filter() {
  return (
    <Wrapper>
      <Badge code={0}>공원</Badge>
      <Badge code={1}>두드림길</Badge>
      <Badge code={2}>미술관</Badge>
      <Badge code={3}>공연장</Badge>
      <Badge code={4}>도서관</Badge>
      <Badge code={5}>박물관/기념관</Badge>
      <Badge code={6}>문화원</Badge>
      <Badge code={7}>기타</Badge>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: calc(100vw - 390px);
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
    width: 100vw;
    top: 120px;
  }
`;
