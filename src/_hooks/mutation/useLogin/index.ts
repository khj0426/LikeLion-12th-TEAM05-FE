import { useMutation } from '@tanstack/react-query';
import { components } from '../../../../schema';
import { axiosClient } from '@/services';

type APIRequest = components['schemas']['UserSignInReqDto'];
type APIResponse = components['schemas']['UserSignInResDto'];

export const postLogin = async ({ email, password }: APIRequest) => {
  try {
    const response = await axiosClient.post<APIResponse>('/sign-in', {
      email,
      password,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const useLogin = () => {
  return useMutation({
    mutationFn: postLogin,
  });
};
