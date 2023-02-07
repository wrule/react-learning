import { useQuery } from 'react-query';
import * as api from './api';

export * from './api';

type A = typeof api;
type C<T extends (...p: any[]) => Promise<any>> = (...p: [...Parameters<T>, boolean]) => {
  raw: ReturnType<T>
};

type B = {
  [
    Key in keyof A & string
    as A[Key] extends Function ? `useApi_${Key}` : never
  ]: C<A[Key]>;
};


type ll = C<typeof list>;


const b: B = { } as any;
b.useApi_list()

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
