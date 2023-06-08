import styled from '@emotion/styled';
import DetailBackIcon from '@/components/atoms/DetailBackIcon';
import Detail from '@/components/organisms/Detail';
import Drawer from '@/components/organisms/Drawer';
import PlaceList from '@/components/organisms/PlaceList';
import DesktopLayout from '@/components/Templates/DesktopLayout';
import MobileLayout from '@/components/Templates/MobileLayout';
import { usePlaceList } from '@/hooks/usePlaceList';
import { useQueryString } from '@/hooks/useQueryString';
import { useUserLocation } from '@/hooks/useUserLocation';

export default function Home() {
  const { id } = useQueryString();
  const { isGetLocation } = useUserLocation();
  const { isLoading } = usePlaceList();
  return (
    <>
      <MobileLayout>
        {id ? (
          <Drawer isDetail>
            <Detail />
          </Drawer>
        ) : (
          <Drawer>
            <PlaceList isLoading={isLoading || isGetLocation} mobile />
          </Drawer>
        )}
      </MobileLayout>
      <DesktopLayout {...{ isGetLocation }}>
        <PlaceList isLoading={isLoading || isGetLocation} />
        {id && (
          <DetailWrapper>
            <DetailBackIcon />
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
