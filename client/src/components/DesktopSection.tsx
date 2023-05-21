import React from 'react';
import Badge from './common/Badge';
import Map from './Map';
import { BADGE } from '@/styles/zIndex';
import styled from '@emotion/styled';

export default function DesktopSection() {
  return (
    <Wrapper>
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
  flex: 1;
`;
const Filter = styled.div`
  display: flex;
  position: absolute;
  z-index: ${BADGE};
  div {
    margin: 10px;
  }
`;
