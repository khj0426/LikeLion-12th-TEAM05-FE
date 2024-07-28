import { useMutation } from '@tanstack/react-query'
import { components } from '../../../../schema'
import axios from 'axios'

type APIRequest = components['schemas']['LocationInfoResDto']
type APIResponse =
  components['schemas']['ApiResponseTemplateLocationInfoResDto']

const postCurationLocation = async (req: APIRequest) => {
  try {
    const formData = new FormData()
    formData.append('location[name]', req.name ?? '')
    formData.append('location[description]', req.description ?? '')
    formData.append('location[address]', req.address ?? '')

    const response = await axios.post<APIResponse['data']>(
      `https://hayeongyou.shop/location/${req.curationId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
      },
    )
    console.log(response)
    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const usePostCurationLocation = () => {
  return useMutation({
    mutationFn: postCurationLocation,
  })
}
