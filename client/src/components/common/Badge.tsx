import React, { ReactNode } from 'react';
import { body1 } from '@/styles/font';
import styled from '@emotion/styled';

interface BadgeProps {
  children: ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <Wrapper role="button" aria-label="search-filter">
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 83px;
  height: 36px;
  ${body1}
  border-radius: 100px;
  box-shadow: 0px 1px 1px 1px ${({ theme }) => theme.color.gray400};
  line-height: 36px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.color.primary};
      color: ${({ theme }) => theme.color.white};
    }
  }
  &:active {
    filter: brightness(0.7);
  }
`;
