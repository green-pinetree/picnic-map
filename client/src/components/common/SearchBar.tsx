import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdCancel } from 'react-icons/md';
import { subtitle } from '@/styles/font';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

export default function SearchBar() {
  const [value, setValue] = useState('');
  const { color: themeColor } = useTheme();
  const { gray200 } = themeColor;
  return (
    <Wrapper role="searchbox" aria-label="search">
      <CiSearch size={26} />
      <Input onChange={({ target }) => setValue(target.value)} {...{ value }} />
      <Cancel aria-label="cancel" type="button" onClick={() => setValue('')} disabled={!value}>
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
  border: 1px solid ${({ theme }) => theme.color.gray300};
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
  ${subtitle}
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
  cursor: pointer;
  @media (hover: hover) {
    &:hover {
      filter: brightness(0.9);
    }
  }
  &:active {
    filter: brightness(0.7);
  }
  &:disabled {
    opacity: 0;
    cursor: inherit;
  }
`;
