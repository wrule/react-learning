import { useQuery } from 'react-query';
import * as api from './api';

type Options = Parameters<typeof useQuery>[2];
type AnyFunction = (...args: any) => any | Promise<any>;
type UseApiParamsType<T extends AnyFunction> = Parameters<T> | [...Parameters<T>, Options?];
type UseApiReturnType<T extends AnyFunction> = ReturnType<typeof useApi<T>>;

function add(a: number, b: string) {
  return a + b;
}

function UseApi<T extends AnyFunction>(api: T) {
  return (...args: UseApiParamsType<T>) => useApi(api, ...args);
}

const k1 = useQuery([add], ({ queryKey }) => add(1, '2'));
const k2 = useApi(add, 1, '2');

export
function useApi<T extends (...args: any) => any>(
  func: T,
  ...paramsExt: UseApiParamsType<T>
) {
  let options: any = undefined;
  let params: any[] = paramsExt;
  if (params.length > func.length) {
    options = params[params.length - 1];
    params = params.slice(0, params.length - 1);
  }
  return useQuery(
    [func, ...params],
    ({ queryKey }) => func(...queryKey.slice(1)),
    options,
  );
}
