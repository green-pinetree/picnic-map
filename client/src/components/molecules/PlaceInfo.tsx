import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle2, body1, desc } from '@/styles/font';

interface PlaceInfoProps {
  id: number;
  imgSrc: string;
  name: string;
  address: string;
  content: string;
  type: { code: number; msg: string };
  mobile?: boolean;
}

export default function PlaceInfo({
  id,
  imgSrc,
  name,
  address,
  content,
  type,
  mobile,
}: PlaceInfoProps) {
  const router = useRouter();
  const [src, setSrc] = useState(imgSrc || '/dummy-image.jpg');
  const handleImageError = () => {
    setSrc('/dummy-image.jpg');
  };
  const handleClick = () => {
    router.push({
      pathname: '/',
      query: { ...router.query, id, type: type.code },
    });
  };
  return (
    <Place role="button" onClick={handleClick}>
      <InfoContainer>
        <ImageBox>
          <Image
            src={src}
            alt={name}
            width={160}
            height={90}
            unoptimized
            placeholder="blur"
            blurDataURL={src}
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
  width: 100%;
  height: fit-content;
  padding: 16px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.color.offWhite};
      filter: brightness(0.9);
    }
  }
  &:active {
    filter: brightness(0.8);
  }
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
  margin-right: 5px;
  height: fit-content;
  line-height: 30px;
`;
const Type = styled.div`
  ${desc}
  height: fit-content;
  line-height: 30px;
  flex: 1;
  text-align: right;
  white-space: nowrap;
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
  width: 98%;
  margin: 5px;
  margin-bottom: 10px;
  line-height: 25px;
  ${body1}
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
