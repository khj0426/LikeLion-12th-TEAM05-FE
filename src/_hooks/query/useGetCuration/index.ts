import { components } from '../../../../schema';
import { useInfiniteQuery } from '@tanstack/react-query';
import { axiosClient } from '@/services';

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']['data'];

const getCuration = async ({ pageParam = 0 }: { pageParam: number }) => {
  try {
    const response = await axiosClient.get<APIResponse>(
      `/curation?page=${pageParam}`
    );
    return {
      response,
      current_page: pageParam,
    };
  } catch (e) {
    throw e;
  }
};
export const useGetCuration = () => {
  return useInfiniteQuery({
    queryKey: ['getInfinityCurations'],
    suspense: true,
    useErrorBoundary: true,
    queryFn: ({ pageParam }) => getCuration({ pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.current_page + 1;
    },
  });
};
