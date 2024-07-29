import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import { axiosClient } from '@/services'

type APIResponse = components['schemas']['ApiResponseTemplateString']

const postLikeCuration = async ({ curationId }: { curationId: string }) => {
  console.log(curationId)
  try {
    const response = await axiosClient.post<APIResponse>(
      `/${curationId}/like`,
      {
        curationId,
      },
    )
    return response.data
  } catch (e) {
    throw e
  }
}

export const useLikeCuration = () => {
  return useMutation({
    mutationFn: postLikeCuration,
  })
}
