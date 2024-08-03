import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import { axiosClient } from '@/services'

type APIRequest = components['schemas']['CommentInfoResDto'] & {
  curationId: string
}
type APIResponse =
  components['schemas']['ApiResponseTemplateCurationInfoResDto']

const postComment = async ({ curationId, comment }: APIRequest) => {
  try {
    const response = await axiosClient.post<APIResponse>(
      `/comment/${curationId}`,
      {
        comment,
      },
    )

    return response.data
  } catch (e) {
    throw e
  }
}

export const useCreateComment = () => {
  return useMutation({
    mutationFn: postComment,
  })
}
