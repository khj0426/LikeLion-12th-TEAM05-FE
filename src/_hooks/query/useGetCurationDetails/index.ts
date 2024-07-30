import { components } from '../../../../schema'
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '@/services'

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationInfoResDto']

export const getCurationDetail = async ({
  curationId,
}: {
  curationId: string
}) => {
  try {
    const response = await axiosClient.get<APIResponse['data']>(
      `/curation/${curationId}`,
    )
    return response?.data
  } catch (e) {
    throw e
  }
}

export const useCurationDetailInfo = ({
  curationId,
  initCurationInfo,
}: {
  curationId: string
  initCurationInfo?: APIResponse['data']
}) => {
  return useQuery({
    staleTime: Infinity,
    initialData: initCurationInfo,
    queryKey: ['getCurationDetail', curationId],
    queryFn: () => getCurationDetail({ curationId }),
  })
}
