import { components } from '../../../../schema'
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']

export const getQurationsByQuery = async (query: string) => {
  try {
    const response = await axiosClient.get<APIResponse>(
      `/curation/search?query=${query}`,
    )
    return response.data
  } catch (e) {
    throw e
  }
}

export const useGetQurationBySearch = (query: string) => {
  return useQuery({
    suspense: true,
    useErrorBoundary: true,
    queryKey: ['getQurationBySearch', query],
    queryFn: () => getQurationsByQuery(query),
  })
}
