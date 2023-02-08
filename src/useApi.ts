import { useQuery } from 'react-query';

type Options = Parameters<typeof useQuery>[2];
type AnyFunction = (...args: any) => any | Promise<any>;
type UseApiParamsType<T extends AnyFunction> = Parameters<T> | [...Parameters<T>, Options?];
type UseApiReturnType<T extends AnyFunction> = ReturnType<typeof useApi<T>>;

function add(a: number, b: string) {
  return a + b;
}

const k1 = useQuery([add, 1, '2'], ({ queryKey }) => add(1, '2'));
const k2 = useApi(add)(1, '2');

function _useApi<T extends AnyFunction>(api: T, ...args: UseApiParamsType<T>) {
  let options: any = undefined;
  let arg_keys: any[] = args;
  if (arg_keys.length > api.length) {
    options = arg_keys[arg_keys.length - 1];
    arg_keys = arg_keys.slice(0, arg_keys.length - 1);
  }
  return useQuery(
    [api, ...arg_keys],
    ({ queryKey }) => api(...queryKey.slice(1)),
    options,
  );
}

export
function useApi<T extends AnyFunction>(api: T) {
  return (...args: UseApiParamsType<T>) => _useApi(api, ...args);
}
