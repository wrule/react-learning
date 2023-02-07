import { useQuery } from 'react-query';
import * as api from './api';

export * from './api';

type Api = typeof api;

type UseApiType<T> = {
  [
    Key in keyof T & string
    as T[Key] extends F ? `useApi_${Key}` : never
  ]: typeof useApi<T[Key]>;
};

const b: UseApiType<Api> = { } as any;
b.useApi_list()


type F = (...args: any) => any;

type Options = Parameters<typeof useQuery>[2];
type Params = Parameters<typeof api.list>;
type ParamsExt = [...Params, Options?];

export
function useApi_list(...paramsExt: ParamsExt) {
  return useApi(api.list, ...paramsExt);
};

type UAT<T extends F> = (
  ...args: [...Parameters<typeof useApi<T>>, Options?]
) => ReturnType<typeof useApi<T>>

export
function useApi<T extends (...args: any) => any>(
  func: T,
  ...paramsExt: [...Parameters<T>, Options?]
) {
  let options: any = undefined;
  let params: any = paramsExt;
  if (paramsExt.length > func.length) {
    params = paramsExt.slice(0, paramsExt.length - 1);
    options = paramsExt[paramsExt.length - 1];
  }
  return useQuery(
    [func, ...params],
    ({ queryKey }) => func(...queryKey.slice(1)),
    options,
  );
}
