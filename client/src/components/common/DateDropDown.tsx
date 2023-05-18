import React, { useState } from 'react';
import { body1, body2 } from '@/styles/font';
import { buttonStyle } from '@/styles/mixin';
import styled from '@emotion/styled';

export default function DateDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
      <Date
        role="button"
        id="date-trigger"
        aria-label="Date dropdown trigger"
        aria-haspopup="true"
        aria-controls="date-dropdown"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        2023/04/26
      </Date>
      {isOpen && (
        <MenuList aria-labelledby="date-trigger" id="date-dropdown">
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
          <Menu onClick={() => setIsOpen(false)} type="button">
            <div>2023/04/26</div>
            <div>날씨: 맑음 미세먼지: 좋음</div>
          </Menu>
        </MenuList>
      )}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Date = styled.button`
  ${body1}
  width: fit-content;
  text-align: right;
  border-radius: 10px;
  border: 0;
  background-color: ${({ theme }) => theme.color.white};
  ${buttonStyle}
`;

const MenuList = styled.div`
  position: absolute;
  z-index: 999;
  top: 25px;
  right: 5px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 10px;
`;

const Menu = styled.button`
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  background-color: ${({ theme }) => theme.color.white};
  ${body2}
  ${buttonStyle}
  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }
  &:last-of-type {
    border-bottom: 0px;
    border-radius: 0 0 10px 10px;
  }
  div {
    width: 100%;
    text-align: left;
    height: 20px;
    white-space: nowrap;
  }
`;
