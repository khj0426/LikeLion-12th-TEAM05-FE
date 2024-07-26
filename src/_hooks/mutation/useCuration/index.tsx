import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import { axiosClient } from '@/services'

type APIRequest = components['schemas']['CurationSaveReqDto']
type APIResponse = components['schemas']['ApiResponseTemplateCurationInfoResDto']

export const postCuration = async ({ name, content }: APIRequest) => {
    try {
        const response = await axiosClient.post<APIResponse>('/curation', {
            name,
            content,
        })
        return response.data.data
    } catch (e) {
        throw e
    }
}
export const useCuration = () => {
    return useMutation({
        mutationFn: postCuration,
    })
}
