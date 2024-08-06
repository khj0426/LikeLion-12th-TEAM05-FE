import { components } from '../../../../schema'
import { useInfiniteQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']

export const getRecentCuration = async ({ page = 0 }: { page: number }) => {
  try {
    const response = await axiosClient.get<APIResponse['data']>(
      `/curation/recent?page=${page}`,
    )
    return {
      response: response.data?.curations,
      current_page: page,
      pageParam: page,
    }
  } catch (e) {
    throw e
  }
}

export const useGetRecentCuration = ({ page }: { page: number }) => {
  return useInfiniteQuery({
    suspense: true,
    useErrorBoundary: true,
    queryKey: ['getRecentCuration', page],
    queryFn: () => getRecentCuration({ page }), // 오타 수정
    getNextPageParam: (lastPage) => {
      return lastPage.current_page + 1
    },
  })
}
