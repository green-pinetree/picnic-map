import React, { useState, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Button from './common/Button';
import SearchBar from './common/SearchBar';
import { ReducerType } from '@/store/rootReducer';
import { fetchSearchList } from '@/store/searchList';
import { UserLocation } from '@/store/userLocation';
import BREAK_POINT from '@/styles/breakpoint';
import { BADGE } from '@/styles/zIndex';

export default function SearchContainer() {
  const [value, setValue] = useState('');
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const searchHandler = () =>
    dispatch(fetchSearchList({ search: value, latitude, longitude, page: 1 }));

  const keyDownHandler = (e: KeyboardEvent<Element>) => {
    if (e.nativeEvent.isComposing) return;
    const { key } = e;
    if (key === 'Enter') {
      searchHandler();
    }
  };
  const dispatch = useDispatch();
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
