import { components } from '../../../../schema'
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse = components['schemas']['ApiResponseTemplateCommentListResDto']
const getComments = async ({ curationId }: { curationId: string }) => {
  try {
    const response = await axiosClient.get<APIResponse['data']>(
      `/comment/${curationId}`,
    )
    return response.data?.comments
  } catch (e) {
    throw e
  }
}

export const useGetComments = ({ curationId }: { curationId: string }) => {
  return useQuery({
    queryFn: () => getComments({ curationId }),
    queryKey: ['getComments', curationId],
    refetchOnMount: false,
    suspense: true,
    useErrorBoundary: true,
  })
}
