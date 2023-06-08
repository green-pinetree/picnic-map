import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from './common/Loading';
import PlaceInfo from './PlaceInfo';
import { PlaceList } from '@/store/placeList';
import { ReducerType } from '@/store/rootReducer';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle3 } from '@/styles/font';

interface RenderPlaceListProps {
  isLoading: boolean;
  mobile?: boolean;
}

export default function RenderPlaceList({ isLoading, mobile = false }: RenderPlaceListProps) {
  const placeList = useSelector<ReducerType, PlaceList>((state) => state.placeList);
  return (
    <Wrapper>
      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {placeList.length === 0 && !isLoading && (
        <NoSearchResult>검색 장소가 없습니다.</NoSearchResult>
      )}
      {placeList.length !== 0 &&
        !isLoading &&
        placeList.map((place) => (
          <PlaceInfo
            key={place.id}
            id={place.id}
            imgSrc={place.image[0]}
            name={place.name}
            address={place.detail.address || ''}
            content={place.content || ''}
            type={place.type}
            {...{ mobile }}
          />
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    margin-top: 40px;
  }
`;
const NoSearchResult = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${subtitle3}
`;