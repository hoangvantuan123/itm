import { useState, useEffect, useCallback } from 'react'
import { Form, Table, Input, DatePicker } from 'antd'
import moment from 'moment' // Thư viện để xử lý ngày

const EditFamilyInfoTable = ({ form, dataSource, children }) => {
  const [localDataSource, setLocalDataSource] = useState(dataSource || [])
  const [childrenDataSource, setChildrenDataSource] = useState(children || [])
  useEffect(() => {
    setLocalDataSource(dataSource)
    setChildrenDataSource(children)
  }, [dataSource, children])

  useEffect(() => {
    form.setFieldsValue({ families: localDataSource })
    form.setFieldsValue({ children: childrenDataSource })
  }, [localDataSource, childrenDataSource, form])

  const handleFamilyMemberChange = useCallback((index, field, value) => {
    setLocalDataSource((prevData) =>
      prevData.map((member, idx) =>
        idx === index ? { ...member, [field]: value } : member,
      ),
    )
  }, [])

  const handleChildrenChange = useCallback((index, field, value) => {
    setChildrenDataSource((prevData) =>
      prevData.map((member, idx) =>
        idx === index ? { ...member, [field]: value } : member,
      ),
    )
  }, [])

  const columns = [
    {
      title: 'Quan hệ',
      dataIndex: 'relationship',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleFamilyMemberChange(index, 'relationship', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'full_name',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleFamilyMemberChange(index, 'full_name', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleFamilyMemberChange(index, 'phone_number', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
  ]

  const columnsChildren = [
    {
      title: 'Họ tên',
      dataIndex: 'children_name',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleChildrenChange(index, 'children_name', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
    {
      title: 'Năm sinh',
      dataIndex: 'children_birth_date',
      render: (text, record, index) => (
        <DatePicker
          value={text ? moment(text) : null}
          onChange={(date) =>
            handleChildrenChange(
              index,
              'children_birth_date',
              date ? date.format('YYYY-MM-DD') : null,
            )
          }
          format="YYYY-MM-DD"
          className="border-none w-full"
        />
      ),
    },
    {
      title: 'Giới tính',
      dataIndex: 'children_gender',
      render: (text, record, index) => (
        <Input
          value={text}
          onChange={(e) =>
            handleChildrenChange(index, 'children_gender', e.target.value)
          }
          className="border-none w-full"
        />
      ),
    },
  ]

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Thông tin gia đình</h2>
      <Form.Item name="families">
        <Table
          dataSource={localDataSource}
          columns={columns}
          pagination={false}
          rowKey="key"
          bordered
          scroll={{ x: true }}
          style={{ margin: '0 auto' }}
          rowClassName="custom-row"
          size="small"
        />
      </Form.Item>
      <Form.Item name="children">
        <Table
          dataSource={childrenDataSource}
          columns={columnsChildren}
          pagination={false}
          rowKey="key"
          bordered
          scroll={{ x: true }}
          style={{ margin: '0 auto' }}
          rowClassName="custom-row"
          size="small"
        />
      </Form.Item>
    </>
  )
}

export default EditFamilyInfoTable
