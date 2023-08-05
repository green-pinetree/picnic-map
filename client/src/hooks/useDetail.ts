import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchDetailInfo } from '@/store/detailInfo';
import { useQueryString } from '@/hooks/useQueryString';

export function useDetail(){
    const dispatch = useDispatch<AppDispatch>();
    const { id, type } = useQueryString();
    const fetchDetail = useCallback(async () => {
        dispatch(fetchDetailInfo({id, type}))
    }, [id]);

    useEffect(() => {
        if (!id) return;
        fetchDetail();
    }, [id]);
}