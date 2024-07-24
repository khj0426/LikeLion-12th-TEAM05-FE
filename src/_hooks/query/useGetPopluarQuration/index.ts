import { components } from '../../../../schema';
import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '@/services';

type APIResponse =
  components['schemas']['ApiResponseTemplateCurationListResDto'];
export const getPopluarCuration = async () => {
  try {
    const response = await axiosClient.get<Pick<APIResponse, 'data'>>(
      '/curation/popular'
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const useGetPopluarCurations = () => {
  return useQuery({
    suspense: true,
    useErrorBoundary: true,
    queryFn: getPopluarCuration,
    staleTime: Infinity,
    queryKey: ['getPopluarCuration'],
  });
};
