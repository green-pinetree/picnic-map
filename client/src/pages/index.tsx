import styled from '@emotion/styled';
import Drawer from '@/components/common/Drawer';
import Detail from '@/components/Detail';
import CancelDetail from '@/components/DetailBack';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import RenderPlaceList from '@/components/PlaceList';
import { usePlaceList } from '@/hooks/usePlaceList';
import { useQueryString } from '@/hooks/useQueryString';
// import { useSetCenter } from '@/hooks/useSetCenter';
import { useUserLocation } from '@/hooks/useUserLocation';

export default function Home() {
  const { id } = useQueryString();
  const { isGetLocation } = useUserLocation();
  const { isLoading } = usePlaceList();
  // useSetCenter();

  return (
    <>
      <MobileLayout>
        {id ? (
          <Drawer title={id ? '' : '주변 장소'} isDetail>
            <Detail />
          </Drawer>
        ) : (
          <Drawer title={id ? '' : '주변 장소'}>
            <RenderPlaceList isLoading={isLoading || isGetLocation} mobile />
          </Drawer>
        )}
      </MobileLayout>
      <DesktopLayout {...{ isGetLocation }}>
        <RenderPlaceList isLoading={isLoading || isGetLocation} />
        {id && (
          <DetailWrapper>
            <CancelDetail />
            <Detail />
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
