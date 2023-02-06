import { useQuery } from 'react-query';
import { list } from './api';

export
const useList = (params: any, options?: any) => {
  return useJimao(list, params, options);
};

export
const useJimao = (
  func: (params: any) => any,
  params: any,
  options?: any,
) => {
  return useQuery(
    [func, params],
    ({ queryKey }) => func(queryKey[1]),
    options,
  );
};
