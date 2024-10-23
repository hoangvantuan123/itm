import { useState, useEffect, useCallback } from 'react'
import { Form, Table, Input, DatePicker } from 'antd'
import moment from 'moment' // Thư viện để xử lý ngày
import { useTranslation } from 'react-i18next'
const EditFamilyInfoTable = ({ form, dataSource, children }) => {
  const [localDataSource, setLocalDataSource] = useState(dataSource || [])
  const [childrenDataSource, setChildrenDataSource] = useState(children || [])
  const { t } = useTranslation()
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
      title: t('hr_recruitment_1_1.alternate_relationship'),
      dataIndex: 'relationship',
      render: (text, record, index) => (
        <p>
          {text}
        </p>

      ),
    },
    {
      title: t('hr_recruitment_1_1.full_name'),
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
      title: t('hr_recruitment_1_1.phone_number'),
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
      title: t('hr_recruitment_1_1.children_name'),
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
      title:t('children_columns.children_birth_date'),
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
      title:t('children_columns.children_gender'),
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
      <h2 className="text-xl font-semibold mb-4">{t('children_columns.title')}</h2>
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
