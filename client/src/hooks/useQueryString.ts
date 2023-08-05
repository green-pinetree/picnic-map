import { useRouter } from 'next/router';

export interface QueryParam {
  type: string | undefined;
  id: string | undefined;
  search: string | undefined;
}

export const useQueryString = () => {
  const router = useRouter();
  const { type, id, search } = router.query as unknown as QueryParam;
  return { type, id, search };
};
