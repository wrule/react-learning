import { useQuery } from 'react-query';
import * as api from './api';

export * from './api';

console.log(Object.entries(api));


type A = {
  a: string;
  b: boolean;
  c: number;
  d: () => void;
  e: (a: string) => void;
  f: (a: string, b: string) => void;
  g: (a: string, b: string, c: string) => void;
};

type PrefixKey<T> = {
  [K in keyof T & string as `str_${K}`]: T[K];
};

type FilterVal<T> = {
  [K in keyof T]: T[K] extends ((p: any) => any) ? (T[K] extends (() => any) ? never : T[K]) : never;
};

type ValidKey<T> = {
  [K in keyof T]: T[K] extends never ? never : K
}[keyof T];

type B = PrefixKey<A>;
type BB = FilterVal<B>;
type BBB = ValidKey<BB>;
type BBBB = Pick<B, BBB>;

(({}) as BBBB).


// interface A {
//   name1: string;
//   name2: string;
//   name3: string;
// }

// type B = { [P in keyof A & string as `str_${P}`]: string };

export
const useList = (params: any, options?: any) => {
  return useJimao(api.list, params, options);
};

export
const useJimao = (
  func: (params: any) => any,
  params: any,
  options?: any,
) => {
  return useQuery(
    [func, params],
    ({ queryKey }) => func(queryKey[1]),
    options,
  );
};
