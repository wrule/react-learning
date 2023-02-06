import { useQuery } from 'react-query';
import * as api from './api';

export * from './api';

console.log(Object.entries(api));

interface A {
  name1: string;
  name2: string;
  name3: string;
}

type B = { [P in keyof A & string as `str_${P}`]: string };

export
const useList = (params: any, options?: any) => {
  return useJimao(api.list, params, options);
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
