import Image from 'next/image';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle2, body1, desc } from '@/styles/font';

interface PlaceInfoProps {
  imgSrc: string;
  name: string;
  address: string;
  content: string;
  type: { code: number; msg: string };
  mobile?: boolean;
}

export default function PlaceInfo({
  imgSrc,
  name,
  address,
  content,
  type,
  mobile,
}: PlaceInfoProps) {
  const [src, setSrc] = useState(imgSrc || '/dummy-image.jpg');
  const handleImageError = () => {
    setSrc('/dummy-image.jpg');
  };
  return (
    <Place>
      <InfoContainer>
        <ImageBox>
          <Image
            src={src}
            alt="place-image"
            width={160}
            height={90}
            priority
            onError={handleImageError}
          />
        </ImageBox>
        <Info>
          <TitleContainer>
            <Title>{name}</Title>
            <Type>{type.msg}</Type>
          </TitleContainer>
          <Content>{address}</Content>
        </Info>
      </InfoContainer>
      {!mobile && (
        <DetailContainer>
          <Detail>상세정보</Detail>
          <Description>{content}</Description>
        </DetailContainer>
      )}
    </Place>
  );
}

const Place = styled.div`
  display: flex;
  flex-direction: column;
  width: 96%;
  height: fit-content;
  padding: 16px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  &:last-of-type {
    border-bottom: 0px;
  }
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    display: flex;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  height: fit-content;
`;

const ImageBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 50%;
  }
`;

const Info = styled.div`
  width: 100%;
  padding: 0px 10px;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 50%;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  height: fit-content;
  justify-content: space-between;
`;
const Title = styled.div`
  ${subtitle2}
  max-width: 150px;
  height: fit-content;
  line-height: 30px;
`;
const Type = styled.div`
  ${desc}
  height: fit-content;
  line-height: 30px;
  width: 40px;
  text-align: center;
`;
const Content = styled.div`
  width: 100%;
  ${body1}
  line-height: 20px;
  margin-bottom: 10px;
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Detail = styled.div`
  ${body1}
  font-weight: 700;
  line-height: 30px;
  margin-top: 15px;
  margin-left: 10px;
`;

const Description = styled.div`
  width: 100%;
  margin-left: 5px;
  margin-bottom: 10px;
  line-height: 25px;
  ${body1}
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
