import React, { ReactNode } from 'react';
import { button1, button2 } from '@/styles/font';
import styled from '@emotion/styled';

interface ButtonProps {
  size: 'middle' | 'small';
  children: ReactNode;
  label: string;
}

export default function Button({ size, children, label }: ButtonProps) {
  return (
    <Wrapper aria-label={label} {...{ size }}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.button<Pick<ButtonProps, 'size'>>`
  ${({ size }) => (size === 'middle' ? button1 : button2)}
  height: ${({ size }) => (size === 'middle' ? '43px' : '31px')};
  width: fit-content;
  padding: 0 ${({ size }) => (size === 'middle' ? '20px' : '15px')};
  border-radius: 10px;
  border: 0;
  background-color: ${({ theme }) => theme.color.primary};
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
