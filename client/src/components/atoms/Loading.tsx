import React from 'react';
import styled from '@emotion/styled';

export default function Loading() {
  return (
    <Wrapper>
      <Container>
        <div />
        <div />
        <div />
        <div />
        <div />
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50px;
  height: 30px;
  display: inline-block;
  overflow: hidden;
  background: ${({ theme }) => theme.color.white};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.5);
  backface-visibility: hidden;
  transform-origin: 0 0;
  @keyframes loading-animation {
    0% {
      transform: translate(6px, 20px) scale(0);
    }
    25% {
      transform: translate(6px, 20px) scale(0);
    }
    50% {
      transform: translate(6px, 20px) scale(1);
    }
    75% {
      transform: translate(40px, 20px) scale(1);
    }
    100% {
      transform: translate(74px, 20px) scale(1);
    }
  }
  @keyframes loading-animation-r {
    0% {
      transform: translate(74px, 20px) scale(1);
    }
    100% {
      transform: translate(74px, 20px) scale(0);
    }
  }
  @keyframes loading-animation-c {
    0% {
      background: ${({ theme }) => theme.color.primary};
    }
    25% {
      background: ${({ theme }) => theme.color.primaryDark};
    }
    50% {
      background: ${({ theme }) => theme.color.primary400};
    }
    75% {
      background: ${({ theme }) => theme.color.primaryLight};
    }
    100% {
      background: ${({ theme }) => theme.color.primary};
    }
  }
  div {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translate(40px, 20px) scale(1);
    background: ${({ theme }) => theme.color.primary};
    animation: loading-animation 2.5s infinite cubic-bezier(0, 0.5, 0.5, 1);
  }
  div:nth-of-type(1) {
    background: ${({ theme }) => theme.color.primaryLight};
    transform: translate(74px, 20px) scale(1);
    animation: loading-animation-r 0.625s infinite cubic-bezier(0, 0.5, 0.5, 1),
      loading-animation-c 2.5s infinite step-start;
  }
  div:nth-of-type(2) {
    animation-delay: -0.625s;
    background: ${({ theme }) => theme.color.primary};
  }
  div:nth-of-type(3) {
    animation-delay: -1.25s;
    background: ${({ theme }) => theme.color.primaryLight};
  }
  div:nth-of-type(4) {
    animation-delay: -1.875s;
    background: ${({ theme }) => theme.color.primary400};
  }
  div:nth-of-type(5) {
    animation-delay: -2.5s;
    background: ${({ theme }) => theme.color.primaryDark};
  }
`;
