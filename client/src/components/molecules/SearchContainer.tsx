import { useRouter } from 'next/router';
import React, { useState, KeyboardEvent, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../atoms/Button';
import SearchBar from '../atoms/SearchBar';
import BREAK_POINT from '@/styles/breakpoint';
import { BADGE } from '@/styles/zIndex';

export default function SearchContainer() {
  const router = useRouter();
  const { search } = router.query as { search: string | undefined };
  const [value, setValue] = useState(search || '');
  useEffect(() => {
    setValue(search || '');
  }, [search]);

  const searchHandler = () => {
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
  width: 100%;
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    width: 100vw;
    position: absolute;
    z-index: ${BADGE};
  }
`;
