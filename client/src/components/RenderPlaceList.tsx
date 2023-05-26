import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Loading from './common/Loading';
import PlaceInfo from './PlaceInfo';
import { addCenter } from '@/store/centerLocation';
import { RenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { TypeFilter } from '@/store/typeFilter';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';

interface RenderPlaceListProps {
  isGetLocation: boolean;
  mobile?: boolean;
}

export default function RenderPlaceList({ isGetLocation, mobile = false }: RenderPlaceListProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const renderList = useSelector<ReducerType, RenderList>((state) => state.renderList);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const { id, search } = router.query as {
    type: string | undefined;
    id: string | undefined;
    search: string | undefined;
  };
  const typeFilter = useSelector<ReducerType, TypeFilter>((state) => state.typeFilter);

  useEffect(() => {
    const check = typeFilter.filter((target) => target);
    if (check.length === 0 && !id && !search) {
      dispatch(addCenter({ latitude, longitude }));
      return;
    }
    const center = renderList.filter((node) => node.lat !== 0 && node.lng !== 0);
    if (center.length !== 0)
      dispatch(addCenter({ latitude: center[0].lat, longitude: center[0].lng }));
    else dispatch(addCenter({ latitude, longitude }));
  }, [renderList]);

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
