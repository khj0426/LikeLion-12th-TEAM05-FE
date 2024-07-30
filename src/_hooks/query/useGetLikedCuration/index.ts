//내가 좋아요 한 큐레이션
import { components } from '../../../../schema'
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto']

export const getLikedCuration = async () => {
  try {
    const response = await axiosClient.get<APIResponse['data']>(
      '/curation/user/like',
    )
    return response?.data
  } catch (e) {
    throw e
  }
}

export const useGetLikedCuration = () => {
  return useQuery({
    queryFn: getLikedCuration,
    queryKey: ['getLikedCuration'],
  })
}
