import React, { MouseEventHandler, ReactNode } from 'react';
import styled from '@emotion/styled';
import { button1, button2 } from '@/styles/font';
import { buttonStyle } from '@/styles/mixin';

interface ButtonProps {
  size: 'middle' | 'small';
  children: ReactNode;
  label: string;
  onClick: MouseEventHandler;
}

export default function Button({ size, children, label, onClick }: ButtonProps) {
  return (
    <Wrapper role="button" aria-label={label} {...{ size, onClick }}>
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
  ${buttonStyle}
`;
