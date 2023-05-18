import Image from 'next/image';
import React from 'react';
import { body1, body2, title } from '@/styles/font';
import styled from '@emotion/styled';

export default function Header() {
  return (
    <Wrapper>
      <Logo>
        <Image src="/Icon.svg" alt="Logo" width={44} height={44} priority />
        <Title>나들이 갈까?</Title>
      </Logo>
      <TodayInfo>
        <Date
          role="button"
          aria-label="Date dropdown trigger"
          aria-haspopup="true"
          aria-controls="date-dropdown"
        >
          2023/04/26
        </Date>
        <Weather>
          <span>날씨: 맑음</span>
          <span>미세먼지: 좋음</span>
        </Weather>
      </TodayInfo>
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
const TodayInfo = styled.div`
  width: fit-content;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const Date = styled.button`
  ${body1}
  width: fit-content;
  text-align: right;
  border-radius: 10px;
  border: 0;
  background-color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.9);
    }
  }
  &:active {
    filter: brightness(0.7);
  }
  &:disabled {
    opacity: 0;
    cursor: inherit;
  }
`;
const Weather = styled.div`
  ${body2}
  span {
    padding-right: 7px;
  }
`;
