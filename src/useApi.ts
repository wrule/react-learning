import { useQuery } from 'react-query';
import * as api from './api';

type Options = Parameters<typeof useQuery>[2];
type AnyFunction = (...args: any) => any | Promise<any>;
type UseApiParamsType<T extends AnyFunction> = Parameters<T> | [...Parameters<T>, Options?];
type UseApiReturnType<T extends AnyFunction> = ReturnType<typeof useApi<T>>;

function add(a: number, b: string) {
  return a + b;
}

export
function useApi<T extends (...args: any) => any>(
  func: T,
  ...paramsExt: UseApiParamsType<T>
) {
  let options: any = undefined;
  let params: any[] = paramsExt;
  if (params.length > func.length) {
    params = params.slice(0, params.length - 1);
    options = params[params.length - 1];
  }
  return useQuery(
    [func, ...params],
    ({ queryKey }) => func(...queryKey.slice(1)),
    options,
  );
}
