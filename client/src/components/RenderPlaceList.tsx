import React from 'react';
import styled from '@emotion/styled';
import Loading from './common/Loading';
import PlaceInfo from './PlaceInfo';
import { Place } from '@/store/placeList';
import BREAK_POINT from '@/styles/breakpoint';

interface RenderPlaceListProps {
  isGetLocation: boolean;
  renderList: Place[];
  mobile?: boolean;
}

export default function RenderPlaceList({
  isGetLocation,
  renderList,
  mobile = false,
}: RenderPlaceListProps) {
  return (
    <div>
      {isGetLocation ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        renderList.map((place) => (
          <PlaceInfo
            key={place.id}
            imgSrc={place.image[0]}
            name={place.name}
            address={place.detail.address || ''}
            content={place.content || ''}
            type={place.type}
            {...{ mobile }}
          />
        ))
      )}
    </div>
  );
}
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
