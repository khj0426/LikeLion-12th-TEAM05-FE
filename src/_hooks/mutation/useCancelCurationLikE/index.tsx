import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import { axiosClient } from '@/services'

type APIResponse = components['schemas']['ApiResponseTemplateString']

const postCancelCurationLike = async ({
  curationId,
}: {
  curationId: string
}) => {
  try {
    const response = await axiosClient.delete<APIResponse>(
      `/${curationId}/unlike`,
    )
    return response.data
  } catch (e) {
    throw e
  }
}

export const useCancelCurationLike = () => {
  return useMutation({
    mutationFn: postCancelCurationLike,
  })
}
