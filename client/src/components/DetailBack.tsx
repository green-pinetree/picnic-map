import { useRouter } from 'next/router';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { useQueryString } from '@/hooks/useQueryString';
import { buttonStyle } from '@/styles/mixin';

export default function DetailBack() {
  const { color: themeColor } = useTheme();
  const { gray400 } = themeColor;
  const router = useRouter();
  const { search } = useQueryString();
  const onCancelDetail = () => {
    if (search) {
      router.push({
        pathname: '/',
        query: { search },
      });
    } else {
      router.push('/');
    }
  };
  return (
    <Cancel onClick={onCancelDetail}>
      <IoIosArrowBack color={gray400} size={25} />
    </Cancel>
  );
}
const Cancel = styled.button`
  border: 0;
  width: 25px;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  padding: 0;
  border-radius: 20px;
  pointer-events: all;
  ${buttonStyle}
`;
