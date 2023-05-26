import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQueryString } from './useQueryString';
import { addCenter } from '@/store/centerLocation';
import { Place } from '@/types/Place';
import { httpGet } from '@/utils/http';

export const useFetchDetail = () => {
  const [detail, setDetail] = useState<Place>();
  const dispatch = useDispatch();
  const { id, type } = useQueryString();

  const fetchDetail = async () => {
    const response = await httpGet(`/api/place/detail?type=${type}&id=${id}`);
    setDetail(response.data);
    const { lat, lng } = response.data;
    dispatch(addCenter({ longitude: lng, latitude: lat }));
  };

  useEffect(() => {
    if (!id || !type) return;
    fetchDetail();
  }, [id, type]);

  return { detail };
};
