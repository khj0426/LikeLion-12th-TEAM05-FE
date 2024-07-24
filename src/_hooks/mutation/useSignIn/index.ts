import { AxiosError } from 'axios';
import { components } from '../../../../schema';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/services';

type APIResponse = components['schemas']['UserSignInResDto'];
type APIRequest = components['schemas']['UserSignUpReqDto'];

export const useSignIn = () => {
  return useMutation<APIResponse, AxiosError, APIRequest>(
    async ({ name, email, password, role = 'USER' }) => {
      const response = await axiosClient.post<APIResponse>('/sign-up', {
        name,
        email,
        password,
        role,
      });

      return response.data;
    }
  );
};
