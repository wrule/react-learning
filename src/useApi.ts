import { useQuery } from 'react-query';

type Options = Parameters<typeof useQuery>[2];
type AnyFunction = (...args: any) => any | Promise<any>;
type UseApiParamsType<T extends AnyFunction> = Parameters<T> | [...Parameters<T>, Options?];

function _useApi<T extends AnyFunction>(
  api: T,
  ...args: UseApiParamsType<T>
) {
  let options: any = undefined;
  let arg_keys: any[] = args;
  if (arg_keys.length > api.length) {
    options = arg_keys[arg_keys.length - 1];
    arg_keys = arg_keys.slice(0, arg_keys.length - 1);
  }
  return useQuery<Awaited<ReturnType<T>>>(
    [api, ...arg_keys],
    ({ queryKey }) => api(...queryKey.slice(1)),
    options,
  );
}

export
function useApi<T extends AnyFunction>(api: T) {
  return (...args: UseApiParamsType<T>) => _useApi(api, ...args);
}
