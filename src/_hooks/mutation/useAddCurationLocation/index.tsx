import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { components } from '../../../../schema'
import { useQueryClient } from '@tanstack/react-query'

type APIRequest = components['schemas']['LocationInfoResDto']
type APIResponse =
  components['schemas']['ApiResponseTemplateLocationInfoResDto']

const postCurationLocation = async (req: APIRequest) => {
  try {
    const formData = new FormData()

    const obj = {
      name: req.name,
      description: req.description,
      address: req.address,
    }
    formData.append('location', JSON.stringify(obj))

    if (req.locationImage) {
      formData.append('locationImage', req.locationImage)
    }

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

    return response.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const usePostCurationLocation = () => {
  const client = useQueryClient()
  return useMutation({
    mutationFn: postCurationLocation,
    onSettled: () => {
      client.resetQueries(['getRecentCuration'])
      //쿼리 키 무효화
    },
  })
}
