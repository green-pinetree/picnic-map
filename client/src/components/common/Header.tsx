import Image from 'next/image';
import React from 'react';
import DateInfo from '../DateInfo';
import BREAK_POINT from '@/styles/breakpoint';
import { title } from '@/styles/font';
import styled from '@emotion/styled';

interface HeaderProps {
  mobile?: boolean;
}

export default function Header({ mobile = false }: HeaderProps) {
  return (
    <Wrapper>
      <Logo>
        <Image
          src="/Icon.svg"
          alt="Logo"
          width={mobile ? 44 : 50}
          height={mobile ? 44 : 50}
          priority
        />
        <Title>나들이 갈까?</Title>
      </Logo>
      {mobile && <DateInfo />}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 96%;
  height: 68px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 5px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 100%;
    height: 56px;
    box-shadow: 0px 1px 3px 1px ${({ theme }) => theme.color.gray300};
  }
`;

const Logo = styled.div`
  width: fit-content;
  height: 54px;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    height: 44px;
  }
`;

const Title = styled.span`
  ${title}
`;
