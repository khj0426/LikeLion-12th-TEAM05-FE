import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import { axiosClient } from '@/services'

type APIResponse = components['schemas']['ApiResponseTemplateString']

const deleteCuration = async ({ curationId }: { curationId: string }) => {
  try {
    const response = await axiosClient.delete<APIResponse>(
      `/curation/${curationId}`,
    )

    return response.data
  } catch (e) {
    throw e
  }
}

export const useDeleteCuration = () => {
  return useMutation({
    mutationFn: deleteCuration,
  })
}
