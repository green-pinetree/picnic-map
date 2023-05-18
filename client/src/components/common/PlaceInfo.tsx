import Image from 'next/image';
import React from 'react';
import { subtitle2, body1 } from '@/styles/font';
import styled from '@emotion/styled';

interface PlaceInfoProps {
  imgSrc: string;
  name: string;
  address: string;
  description: string;
}

export default function PlaceInfo({ imgSrc, name, address, description }: PlaceInfoProps) {
  return (
    <Place>
      <ImageBox>
        <Image src={imgSrc} alt="place-image" width={360} height={180} priority />
        <div>{name}</div>
      </ImageBox>
      <Description>
        <div>
          <span>공원 주소: </span>
          <span>{address}</span>
        </div>
        <div>
          <span>공원 개요: </span>
          <span>{description}</span>
        </div>
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
`;

const ImageBox = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    ${subtitle2}
    height: 40px;
    line-height: 40px;
  }
`;

const Description = styled.div`
  width: 100%;
  padding: 10px;
  div {
    width: 100%;
    height: 30px;
    ${body1}
  }
`;
