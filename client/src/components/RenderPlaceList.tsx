import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from './common/Loading';
import PlaceInfo from './PlaceInfo';
import { RenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import BREAK_POINT from '@/styles/breakpoint';

interface RenderPlaceListProps {
  isGetLocation: boolean;
  mobile?: boolean;
}

export default function RenderPlaceList({ isGetLocation, mobile = false }: RenderPlaceListProps) {
  const renderList = useSelector<ReducerType, RenderList>((state) => state.renderList);
  return (
    <Wrapper>
      {isGetLocation ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        renderList.map((place) => (
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
        ))
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
