import { components } from '../../../../schema'
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateUserPopularListResDto']

const getPopluarCurators = async () => {
  try {
    const response = await axiosClient.get<APIResponse['data']>('/user/popular')
    return response.data
  } catch (e) {
    throw e
  }
}

export const useGetPopluarCurators = () => {
  return useQuery({
    staleTime: Infinity,
    queryFn: getPopluarCurators,
    queryKey: ['getPopluarCurators'],
  })
}
