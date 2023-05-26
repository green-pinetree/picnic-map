import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Detail from '@/components/Detail';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import RenderPlaceList from '@/components/RenderPlaceList';
import { useFetchDetail } from '@/hooks/useFetchDetail';
import { useQueryString } from '@/hooks/useQueryString';
import { useRenderList } from '@/hooks/useRenderList';
import { useSetCenter } from '@/hooks/useSetCenter';
import { useUserLocation } from '@/hooks/useUserLocation';
import { buttonStyle } from '@/styles/mixin';

export default function Home() {
  const { color: themeColor } = useTheme();
  const { gray200 } = themeColor;
  const router = useRouter();
  const { id, search } = useQueryString();
  const { detail } = useFetchDetail();
  const { isGetLocation } = useUserLocation();
  const { isLoading } = useRenderList();
  useSetCenter();
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
    <>
      <MobileLayout>
        {id && detail ? (
          <Detail {...detail} />
        ) : (
          <RenderPlaceList isLoading={isLoading || isGetLocation} mobile />
        )}
      </MobileLayout>
      <DesktopLayout {...{ isGetLocation }}>
        <RenderPlaceList isLoading={isLoading || isGetLocation} />
        {id && detail && (
          <DetailWrapper>
            <Cancel onClick={onCancelDetail}>
              <MdCancel color={gray200} size={20} />
            </Cancel>
            <Detail {...detail} />
          </DetailWrapper>
        )}
      </DesktopLayout>
    </>
  );
}

const DetailWrapper = styled.div`
  padding: 5px;
  width: 390px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  left: 390px;
  top: 0px;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.white};
`;
const Cancel = styled.button`
  border: 0;
  width: 20px;
  display: flex;
  background-color: ${({ theme }) => theme.color.white};
  padding: 0;
  border-radius: 20px;
  pointer-events: all;
  ${buttonStyle}
`;
