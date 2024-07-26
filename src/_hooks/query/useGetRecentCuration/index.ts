import { components } from '../../../../schema'
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']

export const getRecentCuration = async () => {
  try {
    const response = await axiosClient.get<APIResponse>('/curation/recent')
    return response.data.data?.curations
  } catch (e) {
    throw e
  }
}

export const useGetRecentCuration = () => {
  return useQuery({
    suspense: true,
    useErrorBoundary: true,
    staleTime: Infinity,
    queryKey: ['getRecentCuration'],
    queryFn: getRecentCuration,
  })
}
