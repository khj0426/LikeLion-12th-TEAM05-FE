import { components } from '../../../../schema'
import { useInfiniteQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']

const getCreatedCuration = async ({
  size = 10,
  pageParam = 0,
}: {
  size: number
  pageParam: number
}) => {
  try {
    const response = await axiosClient.get<APIResponse['data']>(
      `/curation/user?page=${pageParam}&size=${size}`,
    )

    return {
      response: response?.data,
      current_page: pageParam,
      pageParam,
    }
  } catch (e) {
    throw e
  }
}

export const useGetCreatedCuration = () => {
  return useInfiniteQuery({
    queryKey: ['getInfinityCreatedCurations'],
    suspense: true,
    useErrorBoundary: true,
    queryFn: ({ pageParam }) => getCreatedCuration({ pageParam, size: 12 }),
    getNextPageParam: (lastPage) => {
      if (
        lastPage.response &&
        lastPage.response.curations &&
        lastPage.response.curations?.length < 12
      ) {
        return undefined
      }
      return lastPage.current_page + 1
    },
  })
}
