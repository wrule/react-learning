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

const k1 = useQuery([add, 1, '2'], ({ queryKey }) => add(1, '2'));
const k2 = useApi(add, 1, '2');

export
function useApi<T extends AnyFunction>(api: T, ...params: UseApiParamsType<T>) {
  let options: any = undefined;
  let param_keys: any[] = params;
  if (param_keys.length > api.length) {
    options = param_keys[param_keys.length - 1];
    param_keys = param_keys.slice(0, param_keys.length - 1);
  }
  return useQuery(
    [api, ...param_keys],
    ({ queryKey }) => api(...queryKey.slice(1)) as ReturnType<T>,
    options,
  );
}
