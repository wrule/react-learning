import { useQuery } from 'react-query';
import * as api from './api';

export * from './api';

type ApiType = typeof api;

type AnyFunction = (...args: any) => any | Promise<any>;

type UseApiType<T> = {
  [
    Key in keyof T & string
    as T[Key] extends AnyFunction ? `useApi_${Key}` : never
  ]: T[Key]
};

function UseApi<T>(api: T) {
  return { } as UseApiType<T>;
}

UseApi(api).useApi_list(123);


type Options = Parameters<typeof useQuery>[2];
type Params = Parameters<typeof api.list>;
type ParamsExt = [...Params, Options?];

export
function useApi_list(...paramsExt: ParamsExt) {
  return useApi(api.list, ...paramsExt);
};

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
