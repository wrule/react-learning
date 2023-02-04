import { useQuery } from 'react-query';
import axios from 'axios';
import { Table } from 'antd';

export
function List2() {
  const update = async (params: any) => {
    return (await axios.post('/api/xsea/workspace/list', params)).data.object;
  };
  const { isLoading, error, data } = useQuery('jimao', update);
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
