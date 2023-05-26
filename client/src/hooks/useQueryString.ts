import { useRouter } from 'next/router';

export const useQueryString = () => {
  const router = useRouter();
  const { type, id, search } = router.query as {
    type: string | undefined;
    id: string | undefined;
    search: string | undefined;
  };
  return { type, id, search };
};
