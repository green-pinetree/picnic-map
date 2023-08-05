import React from 'react'
import styled from '@emotion/styled'
import Header from '../molecules/Header'
import SearchContainer from '../molecules/SearchContainer'
import BREAK_POINT from '@/styles/breakpoint'

export default function TobBar() {
  return (
    <Wrapper>
      <Header mobile />
      <SearchContainer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media only screen and (min-width: ${BREAK_POINT.mobile}px) {
    display: none;
  }
`