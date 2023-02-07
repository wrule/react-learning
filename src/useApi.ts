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
type ParamsExt = [...Params, Options?];

export
function useApi_list(...paramsExt: ParamsExt) {
  return useApi(api.list, paramsExt);
};

export
function useApi<T extends (...args: any) => any>(
  func: T,
  paramsExt: [...Parameters<T>, Options?],
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
