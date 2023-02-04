import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Table } from 'antd';

export
function List() {
  const update = async () => {
    return (await axios.post('/api/xsea/workspace/page', {
      pageNum: 1,
      pageSize: 1e6,
    })).data.object;
  };

  const { isLoading, error, data } = useQuery('jimao', update);
  // if (isLoading) return <span>加载中</span>;
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
      { title: '备注', dataIndex: 'remark' },
    ]}
    dataSource={data?.list}
  />;
}
