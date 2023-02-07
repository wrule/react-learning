import { useQuery } from 'react-query';
import * as api from './api';

export * from './api';

type A = typeof api;
type B = {
  [
    Key in keyof A & string
    as A[Key] extends Function ? `useApi_${Key}` : never
  ]: A[Key];
};

const b: B = { } as any;


type Options = any;
type Params = Parameters<typeof api.list>;

export
function useApi_list(...params: Params) {
  return useApi(api.list, params);
};

export
function useApi<T extends (...args: any) => any>(
  func: T,
  params: Parameters<T>,
  options?: Options,
) {
  return useQuery(
    [func, ...params],
    ({ queryKey }) => {
      return func(queryKey[1]);
    },
    options,
  );
}
