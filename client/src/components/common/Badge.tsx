import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { ReducerType } from '@/store/rootReducer';
import { Type, TypeFilter, addType } from '@/store/typeFilter';
import { body1 } from '@/styles/font';

interface BadgeProps {
  children: ReactNode;
  code: Type;
}

export default function Badge({ children, code }: BadgeProps) {
  const dispatch = useDispatch();
  const filter = useSelector<ReducerType, TypeFilter>((state) => state.typeFilter);
  return (
    <Wrapper
      role="button"
      aria-label="search-filter"
      clicked={filter[code]}
      onClick={() => dispatch(addType({ type: code, clickable: !filter[code] }))}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ clicked: boolean }>`
  width: fit-content;
  height: 36px;
  padding: 0px 10px;
  white-space: nowrap;
  ${body1}
  color: ${({ theme, clicked }) => (clicked ? theme.color.white : theme.color.black)};
  border-radius: 100px;
  box-shadow: 0px 1px 1px 1px ${({ theme }) => theme.color.gray400};
  line-height: 36px;
  text-align: center;
  background-color: ${({ theme, clicked }) => (clicked ? theme.color.primary : theme.color.white)};
  cursor: pointer;
  @media (hover: hover) {
    min-width: 83px;
    &:hover {
      background-color: ${({ theme }) => theme.color.primary};
      filter: brightness(${({ clicked }) => (clicked ? 0.9 : 1)});
      color: ${({ theme }) => theme.color.white};
    }
  }
  &:active {
    filter: brightness(0.7);
  }
`;
