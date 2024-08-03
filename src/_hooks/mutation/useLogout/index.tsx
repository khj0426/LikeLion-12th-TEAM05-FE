import { useMutation } from '@tanstack/react-query'
import { axiosClient } from '@/services'

const postLogout = async () => {
  try {
    await axiosClient.post('/logout')
  } catch (e) {
    throw e
  }
}

export const useLogout = () => {
  return useMutation({
    mutationFn: postLogout,
  })
}
