import Image from 'next/image';
import React from 'react';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle2, body1 } from '@/styles/font';
import styled from '@emotion/styled';

interface PlaceInfoProps {
  imgSrc: string;
  name: string;
  address: string;
  description: string;
  mobile?: boolean;
}

export default function PlaceInfo({
  imgSrc,
  name,
  address,
  description,
  mobile = false,
}: PlaceInfoProps) {
  return (
    <Place>
      <ImageBox>
        <Image
          src={imgSrc}
          alt="place-image"
          width={mobile ? 180 : 360}
          height={mobile ? 90 : 180}
          priority
        />
        {!mobile && <Title>{name}</Title>}
      </ImageBox>
      <Description>
        {mobile && <Title>{name}</Title>}
        <Content>
          <span>공원 주소: </span>
          <span>{address}</span>
        </Content>
        <Content>
          <span>공원 개요: </span>
          <span>{description}</span>
        </Content>
      </Description>
    </Place>
  );
}

const Place = styled.div`
  width: 96%;
  margin-top: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  &:last-of-type {
    border-bottom: 0px;
  }
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    display: flex;
  }
`;

const ImageBox = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 50%;
  }
`;

const Description = styled.div`
  width: 100%;
  padding: 10px;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 50%;
  }
`;

const Title = styled.div`
  ${subtitle2}
  height: 40px;
  line-height: 40px;
`;
const Content = styled.div`
  width: 100%;
  height: 25px;
  ${body1}
`;
