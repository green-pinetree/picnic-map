import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from '../atoms/Loading';
import { addCenter } from '@/store/centerLocation';
import { DetailInfoSliceState } from '@/store/detailInfo';
import { ReducerType } from '@/store/rootReducer';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle1, body1, subtitle2 } from '@/styles/font';

export default function Detail() {
  const { place, loading } = useSelector<ReducerType, DetailInfoSliceState>((state) => state.detailInfo);
  const dispatch = useDispatch();
  const [src, setSrc] = useState('/dummy-image.jpg');

  const handleImageError = () => {
    setSrc('/dummy-image.jpg');
  };
  useEffect(() => {
    if (!place) return;
    const { image } = place
    setSrc(image[0] || '/dummy-image.jpg');
    const { lat, lng } = place
    dispatch(addCenter({ longitude: lng, latitude: lat }));
  }, [place]);

  const { name, content, detail } = place || { name: '', content: '', detail: {} };
  const { mainEquip, mainPlants, address, tel, distance, leadTime, relateSubway, homepage } =
    detail;

  return (
    <Wrapper>
      {loading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <Image
            width={360}
            height={180}
            src={src}
            alt={name}
            priority
            unoptimized
            onError={handleImageError}
          />
          <Title>{name}</Title>
          <Content>
            {address && (
              <Row>
                <Category>주소</Category>
                <Description>{address}</Description>
              </Row>
            )}
            {tel && (
              <Row>
                <Category>연락처</Category>
                <Description>{tel}</Description>
              </Row>
            )}
            {mainEquip && (
              <Row>
                <Category>주요 시설</Category>
                <Description>{mainEquip}</Description>
              </Row>
            )}
            {mainPlants && (
              <Row>
                <Category>주요 식물</Category>
                <Description>{mainPlants}</Description>
              </Row>
            )}
            {homepage && (
              <Row>
                <Category>홈페이지</Category>
                <Description>
                  <Link href={homepage} target="_blank">
                    {homepage}
                  </Link>
                </Description>
              </Row>
            )}
            {distance && (
              <Row>
                <Category>거리</Category>
                <Description>{distance}</Description>
              </Row>
            )}
            {leadTime && (
              <Row>
                <Category>시간</Category>
                <Description>{leadTime}</Description>
              </Row>
            )}
            {relateSubway && (
              <Row>
                <Category>주변 지하철</Category>
                <Description>{relateSubway}</Description>
              </Row>
            )}
            {content && (
              <Row>
                <Category>개요</Category>
                <Description>{content.split('<br />')[0]}</Description>
              </Row>
            )}
          </Content>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    margin-top: 10px;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
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
  padding-bottom: 10px;
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
  word-wrap: break-word;
  a {
    color: ${({ theme }) => theme.color.info};
    :hover {
      text-decoration-line: underline;
    }
  }
`;
