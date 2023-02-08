import { Table, Space, Button, Row, Modal, Form, Input, Popconfirm } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { list } from './api';
import { useApi } from './useApi';

export
function List1() {
  const [params, set_params] = useState<any>({ pageNum: 1, pageSize: 5 });
  const [modal, set_modal] = useState<any>(null);
  const [form] = Form.useForm();

  // const { isLoading, error, data } = useQuery(
  //   [list, params],
  //   ({ queryKey }) => list(queryKey[1]),
  // );

  const { isLoading, error, data } = useApi(list)(params);

  if (error) return <span>失败了</span>;
  return <Space direction="vertical">
    <Row justify="end">
      <Button size="small" type="primary" onClick={() => {
        const data = { productName: '', productDesc: '' };
        form.setFieldsValue(data);
        set_modal(data);
      }}>新增</Button>
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
            <Button size="small" type="link" onClick={() => {
              form.setFieldsValue({ productName: row.name, productDesc: row.remark });
              set_modal(row);
            }}>编辑</Button>
            <Popconfirm
              title="删除确认"
              description="确认删除此产品？">
              <Button size="small" type="link">删除</Button>
            </Popconfirm>
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
      <Form layout="vertical" form={form}>
        <Form.Item label="产品名称" name="productName" rules={[{ required: true }]}>
          <Input placeholder="请输入产品名称" />
        </Form.Item>
        <Form.Item label="产品描述" name="productDesc">
          <Input.TextArea placeholder="请输入产品描述" />
        </Form.Item>
      </Form>
    </Modal>
  </Space>;
}
