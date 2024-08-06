import { components } from '../../../../schema'
import { useInfiniteQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']

type Qurations = Pick<APIResponse, 'data'>['data']
export const getPopluarCuration = async ({ page = 0 }: { page: number }) => {
  try {
    const response = await axiosClient.get<Exclude<Qurations, 'data'>>(
      `/curation/popular?page=${page}`,
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

export const useGetPopluarCurations = ({ page }: { page: number }) => {
  return useInfiniteQuery({
    suspense: true,
    useErrorBoundary: true,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page + 1
    },
    queryFn: () => getPopluarCuration({ page }),
    queryKey: ['getPopluarCuration', page],
  })
}
