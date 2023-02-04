import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

export
function List() {
  const update = async () => {
    return (await axios.post('/api/xsea/workspace/page', {
      pageNum: 1,
      pageSize: 1e6,
    })).data.object;
  };

  const { isLoading, error, data } = useQuery('jimao', update);
  if (isLoading) return <span>加载中</span>;
  if (error) return <span>失败了</span>;
  return <ul>
    {(data.list || []).map((item: any) => <li key={item.id}>{item.name}</li>)}
  </ul>;
}
