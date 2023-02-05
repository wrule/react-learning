import { useQuery } from 'react-query';
import axios from 'axios';
import { Table } from 'antd';
import { useState } from 'react';

export
function List2() {
  const [params, set_params] = useState<any>({ pageNum: 1, pageSize: 5 });
  const { isLoading, error, data } = useQuery(
    ['wklist', params],
    ({ queryKey }) => axios.post('/api/xsea/workspace/list', queryKey[1]).then((rsp) => rsp.data.object)
  );
  if (error) return <span>失败了</span>;
  return <Table
    bordered
    rowKey="id"
    size="small"
    loading={isLoading}
    columns={[
      { title: '名称', dataIndex: 'name', width: '30%', ellipsis: true },
      { title: '问题数', dataIndex: 'bugCount' },
      { title: '项目数', dataIndex: 'projectCount' },
      { title: '备注', dataIndex: 'remark', width: '30%', ellipsis: true },
    ]}
    dataSource={data?.list}
    pagination={{
      total: data?.total,
      pageSize: data?.pageSize,
      onChange: (nv) => set_params({ ...params, pageNum: nv }),
    }}
  />;
}
