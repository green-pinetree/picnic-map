import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MdCancel } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { AppDispatch } from '@/store';
import { addCenter } from '@/store/centerLocation';
import { Bounds } from '@/store/mapBounds';
import { PlaceListSliceState, fetchPlaceList } from '@/store/placeList';
import { addRenderList } from '@/store/renderList';
import { ReducerType } from '@/store/rootReducer';
import { SearchListSliceState } from '@/store/searchList';
import { TypeFilter } from '@/store/typeFilter';
import { addLocation, UserLocation } from '@/store/userLocation';
import Detail from '@/components/Detail';
import DesktopLayout from '@/components/Layout/DesktopLayout';
import MobileLayout from '@/components/Layout/MobileLayout';
import RenderPlaceList from '@/components/RenderPlaceList';
import { buttonStyle } from '@/styles/mixin';
import { Place } from '@/types/Place';
import { httpGet } from '@/utils/http';

export default function Home() {
  const { color: themeColor } = useTheme();
  const { gray200 } = themeColor;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { type, id, search } = router.query as {
    type: string | undefined;
    id: string | undefined;
    search: string | undefined;
  };
  const [isGetLocation, setIsGetLocation] = useState(false);
  const { placeList } = useSelector<ReducerType, PlaceListSliceState>((state) => state.placeList);
  const { searchList } = useSelector<ReducerType, SearchListSliceState>(
    (state) => state.searchList
  );
  const typeFilter = useSelector<ReducerType, TypeFilter>((state) => state.typeFilter);
  const { latitude, longitude } = useSelector<ReducerType, UserLocation>(
    (state) => state.userLocation
  );
  const { max, min } = useSelector<ReducerType, Bounds>((state) => state.mapBounds);
  const [detail, setDetail] = useState<Place>();
  const fetchDetail = async () => {
    const response = await httpGet(`/api/place/detail?type=${type}&id=${id}`);
    setDetail(response.data);
    const { lat, lng } = response.data;
    dispatch(addCenter({ longitude: lng, latitude: lat }));
  };
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
  useEffect(() => {
    if (!id || !type) return;
    fetchDetail();
  }, [id, type]);
  useEffect(() => {
    setIsGetLocation(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
      dispatch(addLocation({ ...location }));
      dispatch(addCenter({ ...location }));
      setIsGetLocation(false);
    });
  }, []);

  useEffect(() => {
    if (!latitude || !longitude) return;
    const typeList: number[] = [];
    typeFilter.map((filter, index) => filter && typeList.push(index));
    dispatch(
      fetchPlaceList({
        latitude,
        longitude,
        type: typeList,
        page: 1,
        bounds: { min: { ...min }, max: { ...max } },
      })
    );
  }, [min, max, typeFilter]);

  useEffect(() => {
    if (searchList.length === 0) {
      dispatch(addRenderList(placeList));
      return;
    }
    dispatch(addRenderList(searchList));
  }, [placeList.length, searchList.length]);
  return (
    <>
      <MobileLayout>
        {id && detail ? <Detail {...detail} /> : <RenderPlaceList {...{ isGetLocation }} mobile />}
      </MobileLayout>
      <DesktopLayout>
        <RenderPlaceList {...{ isGetLocation }} />
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
