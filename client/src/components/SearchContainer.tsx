import { useRouter } from 'next/router';
import React, { useState, KeyboardEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Button from './common/Button';
import SearchBar from './common/SearchBar';
import { AppDispatch } from '@/store';
import { ReducerType } from '@/store/rootReducer';
import { addEmptySearchList, fetchSearchList } from '@/store/searchList';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';
import { BADGE } from '@/styles/zIndex';

export default function SearchContainer() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { search } = router.query as { search: string | undefined };
  const [value, setValue] = useState(search || '');
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );

  useEffect(() => {
    if (!search) return;
    setValue(search);
  }, [search]);

  useEffect(() => {
    if (!search || !longitude || !latitude) return;
    dispatch(fetchSearchList({ search: value, latitude, longitude, page: 1 }));
  }, [longitude, latitude, search]);

  const searchHandler = () => {
    if (!value) {
      dispatch(addEmptySearchList([]));
      router.push('/');
      return;
    }
    dispatch(fetchSearchList({ search: value, latitude, longitude, page: 1 }));
    router.push({
      pathname: '/',
      query: { search: value },
    });
  };

  const keyDownHandler = (e: KeyboardEvent<Element>) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      searchHandler();
    }
  };
  return (
    <Wrapper>
      <SearchBar {...{ value, setValue }} onKeyDown={(e) => keyDownHandler(e)} />
      <Button label="search" size="middle" onClick={searchHandler}>
        검색
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 100vw;
    position: absolute;
    z-index: ${BADGE};
  }
`;
