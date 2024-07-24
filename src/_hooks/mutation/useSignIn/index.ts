import { components } from '../../../../schema';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/services';
import { AxiosError } from 'axios';

type APIResponse = components['schemas']['UserSignInResDto'];
type APIRequest = components['schemas']['UserSignUpReqDto'];

export const postSignIn = async ({
  name,
  email,
  role = 'USER',
  password,
}: APIRequest) => {
  try {
    const response = await axiosClient.post<APIResponse>('/sign-up', {
      name,
      email,
      role,
      password,
    });
    return response.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e;
    }
  }
};
export const useSignIn = () => {
  return useMutation({
    mutationFn: postSignIn,
  });
};
