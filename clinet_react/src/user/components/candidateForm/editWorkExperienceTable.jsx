import { useEffect, useState, useCallback } from 'react'
import { Table, Input, Button, Form, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
const EditWorkExperienceTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState(dataSource || [])
  const { t } = useTranslation()
  useEffect(() => {
    setLocalDataSource(dataSource)
  }, [dataSource])

  useEffect(() => {
    form.setFieldsValue({ experiences: localDataSource })
  }, [localDataSource, form])

  const handleWorkExperienceChange = useCallback((id, field, value) => {
    setLocalDataSource((prevData) =>
      prevData.map((experience) =>
        experience.id === id ? { ...experience, [field]: value } : experience,
      ),
    )
  }, [])

  const removeWorkExperience = useCallback((id) => {
    setLocalDataSource((prevData) =>
      prevData.filter((experience) => experience.id !== id),
    )
  }, [])

  const experienceColumns = [
    {
      title: t('hr_recruitment_1_1.company_name'),
      dataIndex: 'company_name',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(
              record.id,
              'company_name',
              e.target.value,
            )
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('hr_recruitment_1_1.position'),
      dataIndex: 'position',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'position', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:  t('hr_recruitment_1_1.start_date'),
      dataIndex: 'start_date',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'start_date', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('hr_recruitment_1_1.end_date'),
      dataIndex: 'end_date',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'end_date', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('hr_recruitment_1_1.tasks'),
      dataIndex: 'tasks',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'tasks', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('hr_recruitment_1_1.salary'),
      dataIndex: 'salary',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleWorkExperienceChange(record.id, 'salary', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
  ]

  return (
    <>
      <Form.Item name="experiences">
        <Table
          dataSource={localDataSource}
          columns={experienceColumns}
          pagination={false}
          rowKey={(record) => record.id}
          scroll={{ x: true }}
          bordered
          style={{ margin: '0 auto' }}
          rowClassName="custom-row"
          size="small"
        />
      </Form.Item>
    </>
  )
}

export default EditWorkExperienceTable
