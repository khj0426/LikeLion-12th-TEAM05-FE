import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import { axiosClient } from '@/services'

type APIRequest = components['schemas']['UserInfoUpdateReqDto']
type APIResponse = components['schemas']['ApiResponseTemplateUserInfoResDto']

const patchUserInfo = async (req: APIRequest) => {
  try {
    const response = await axiosClient.patch<APIResponse['data']>(
      '/user/info',
      {
        name: req.name,
        email: req.email,
        password: req.password,
      },
    )
    return response.data
  } catch (e) {
    throw e
  }
}

export const useChangeUserInfo = () => {
  return useMutation({
    mutationFn: patchUserInfo,
  })
}
