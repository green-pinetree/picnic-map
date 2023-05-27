import React, { Dispatch, KeyboardEventHandler, SetStateAction, useRef } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import BREAK_POINT from '@/styles/breakpoint';
import { subtitle3 } from '@/styles/font';
import { buttonStyle } from '@/styles/mixin';

interface SearchBar {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onKeyDown: KeyboardEventHandler;
}

export default function SearchBar({ value, setValue, onKeyDown }: SearchBar) {
  const { color: themeColor } = useTheme();
  const { gray200 } = themeColor;
  const inputElement = useRef<HTMLInputElement>(null);
  return (
    <Wrapper role="searchbox" aria-label="search" {...{ onKeyDown }}>
      <CiSearch size={26} />
      <Input
        placeholder="검색어를 입력하세요"
        ref={inputElement}
        onChange={({ target }) => setValue(target.value)}
        {...{ value }}
      />
      <Cancel
        aria-label="cancel"
        type="button"
        onClick={() => {
          setValue('');
          inputElement.current?.focus();
        }}
        disabled={!value}
      >
        <MdCancel color={gray200} opacity={value ? 1 : 0} size={15} />
      </Cancel>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 43px;
  pointer-events: none;
  padding: 0 5px;
  max-width: 285px;
  border: 1px solid ${({ theme }) => theme.color.gray300};
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  &:focus-within {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;

const Input = styled.input`
  flex: 1;
  pointer-events: all;
  border: 0px;
  border-radius: 10px;
  outline: none;
  padding: 0 5px;
  width: 230px;
  ${subtitle3}
  &::placeholder {
    color: ${({ theme }) => theme.color.gray300};
    font-size: 18px;
  }
`;

const Cancel = styled.button`
  border: 0;
  width: 15px;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  padding: 0;
  margin: auto;
  margin-right: 5px;
  border-radius: 50px;
  pointer-events: all;
  ${buttonStyle}
  @media only screen and (max-width: ${BREAK_POINT.mobile}px) {
    display: none;
  }
`;
