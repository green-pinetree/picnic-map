import React from 'react';
import Map from './Map';
import styled from '@emotion/styled';

export default function DesktopSection() {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  flex: 1;
`;
