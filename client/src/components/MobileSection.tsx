import React from 'react';
import Map from './Map';
import styled from '@emotion/styled';

export default function MobileSection() {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  flex: 1;
`;
