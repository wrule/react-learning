import { useQuery } from 'react-query';
import axios from 'axios';
import { Table } from 'antd';

export
function List1() {
  const { isLoading, error, data } = useQuery(
    ['jimao'],
    () => axios.post('/api/xsea/workspace/list', {
      pageNum: 1,
      pageSize: 1e6,
    }).then((rsp) => rsp.data.object)
  );
  if (error) return <span>失败了</span>;
  return <Table
    bordered
    rowKey="id"
    size="small"
    loading={isLoading}
    columns={[
      { title: '名称', dataIndex: 'name' },
      { title: '问题数', dataIndex: 'bugCount' },
      { title: '项目数', dataIndex: 'projectCount' },
      { title: '备注', dataIndex: 'remark', width: 400, ellipsis: true },
    ]}
    dataSource={data?.list}
  />;
}
