import axios from 'axios';

export
const list = (params: number) =>
  axios.post('/api/xsea/workspace/list', params).then((rsp) => rsp.data.object);
