import Image from 'next/image';
import React from 'react';
import DateInfo from './DateInfo';
import { title } from '@/styles/font';
import styled from '@emotion/styled';

export default function Header() {
  return (
    <Wrapper>
      <Logo>
        <Image src="/Icon.svg" alt="Logo" width={44} height={44} priority />
        <Title>나들이 갈까?</Title>
      </Logo>
      <DateInfo />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 5px;
  box-shadow: 0px 1px 3px 1px ${({ theme }) => theme.color.boxShadow};
`;

const Logo = styled.div`
  width: fit-content;
  height: 44px;
`;

const Title = styled.span`
  ${title}
`;
