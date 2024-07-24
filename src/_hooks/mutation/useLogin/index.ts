import { useMutation } from '@tanstack/react-query';
import { components } from '../../../../schema';
import { AxiosError } from 'axios';
import { axiosClient } from '@/services';

type APIRequest = components['schemas']['UserSignInReqDto'];
type APIResponse = components['schemas']['UserSignInResDto'];

export const useLogin = () => {
  return useMutation<APIResponse, AxiosError, APIRequest>(
    async (requestData) => {
      const response = await axiosClient.post<APIResponse>(
        '/sign-in',
        requestData
      );
      return response.data;
    }
  );
};
