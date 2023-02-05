import { useQuery } from 'react-query';
import axios from 'axios';
import { Table, Space, Button, Row, Modal } from 'antd';
import { useState } from 'react';

export
function List1() {
  const [params, set_params] = useState<any>({ pageNum: 1, pageSize: 5 });
  const [modal, set_modal] = useState<any>(null);
  const { isLoading, error, data } = useQuery(
    ['wklist', params],
    ({ queryKey }) => axios.post('/api/xsea/workspace/list', queryKey[1]).then((rsp) => rsp.data.object),
    { keepPreviousData: true },
  );
  if (error) return <span>失败了</span>;
  return <Space direction="vertical">
    <Row justify="end">
      <Button size="small" type="primary" onClick={() => set_modal({ })}>新增</Button>
    </Row>
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={isLoading}
      columns={[
        { title: '名称', dataIndex: 'name', width: '30%', ellipsis: true },
        { title: '问题数', dataIndex: 'bugCount' },
        { title: '项目数', dataIndex: 'projectCount' },
        { title: '备注', dataIndex: 'remark', width: '30%', ellipsis: true },
        { title: '操作', width: 120, render: (row) => {
          return <Space>
            <Button size="small" type="link" onClick={() => set_modal(row)}>编辑</Button>
            <Button size="small" type="link">删除</Button>
          </Space>;
        } },
      ]}
      dataSource={data?.list}
      pagination={{
        total: data?.total,
        pageSize: data?.pageSize,
        onChange: (nv) => set_params({ ...params, pageNum: nv }),
      }}
    />
    <Modal
      title={modal?.id ? '编辑产品' : '新增产品'}
      visible={modal}
      onCancel={() => set_modal(null)}>
    </Modal>
  </Space>;
}
