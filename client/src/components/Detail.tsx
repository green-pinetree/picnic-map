import React from 'react';
import styled from '@emotion/styled';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle1, body1, subtitle2 } from '@/styles/font';

interface DetailProps {
  imgSrc: string;
  name: string;
  address: string;
  description: string;
}

export default function Detail({ imgSrc, name, address, description }: DetailProps) {
  return (
    <Wrapper>
      <img src={imgSrc} alt={name} />
      <Title>{name}</Title>
      <Content>
        <Row>
          <Category>공원 주소</Category>
          <Description>{address}</Description>
          <Description>{address}</Description>
        </Row>
        <Row>
          <Category>공원 개요</Category>
          <Description>{description}</Description>
        </Row>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  img {
    width: 360px;
    height: 180px;
  }
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    margin-top: 10px;
  }
`;
const Title = styled.div`
  ${subtitle1}
  height: 20px;
  line-height: 20px;
  margin-top: 10px;
`;
const Content = styled.div`
  width: 100%;
  padding: 20px 10px;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    padding: 0 10px;
  }
`;

const Row = styled.div`
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    padding-bottom: 10px;
  }
`;

const Category = styled.div`
  ${subtitle2}
  line-height: 40px;
`;
const Description = styled.div`
  ${body1}
  line-height: 20px;
`;
