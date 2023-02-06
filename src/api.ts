import axios from "axios";
import { useQuery } from "react-query";

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

export
const list = (params: any) =>
  axios.post('/api/xsea/workspace/list', params).then((rsp) => rsp.data.object);
