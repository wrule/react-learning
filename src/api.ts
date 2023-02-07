import axios from 'axios';

export
const list = (params: string): Promise<number> =>
  axios.post('/api/xsea/workspace/list', params).then((rsp) => rsp.data.object);

type a = typeof list;
type aa = ReturnType<a>;
type b = Parameters<a>;
type c = [...b, boolean];

type d<T extends (...p: any[]) => Promise<any>> = (...p: [...Parameters<T>, boolean]) => ReturnType<T>;

type ll = d<typeof list>;
