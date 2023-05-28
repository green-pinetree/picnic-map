import styled from '@emotion/styled';
import Drawer from '@/components/common/Drawer';
import Detail from '@/components/Detail';
import CancelDetail from '@/components/DetailBack';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import RenderPlaceList from '@/components/RenderPlaceList';
import { useFetchDetail } from '@/hooks/useFetchDetail';
import { useQueryString } from '@/hooks/useQueryString';
import { useRenderList } from '@/hooks/useRenderList';
import { useSetCenter } from '@/hooks/useSetCenter';
import { useUserLocation } from '@/hooks/useUserLocation';
import { subtitle3 } from '@/styles/font';

export default function Home() {
  const { id } = useQueryString();
  const { detail } = useFetchDetail();
  const { isGetLocation } = useUserLocation();
  const { isLoading, hasSearchList } = useRenderList();
  useSetCenter();

  return (
    <>
      <MobileLayout>
        {id && detail ? (
          <Drawer title={id ? '' : '주변 장소'} isDetail>
            <Detail {...detail} />
          </Drawer>
        ) : (
          <Drawer title={id ? '' : '주변 장소'}>
            <RenderPlaceList isLoading={isLoading || isGetLocation} mobile />
          </Drawer>
        )}
      </MobileLayout>
      <DesktopLayout {...{ isGetLocation }}>
        {!hasSearchList ? (
          <NoSearchResult>검색 장소가 없습니다.</NoSearchResult>
        ) : (
          <RenderPlaceList isLoading={isLoading || isGetLocation} />
        )}
        {id && detail && (
          <DetailWrapper>
            <CancelDetail />
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
  align-items: flex-start;
  position: absolute;
  left: 390px;
  top: 0px;
  z-index: 1;
  background-color: ${({ theme }) => theme.color.white};
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.color.gray200};
`;

const NoSearchResult = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${subtitle3}
`;
