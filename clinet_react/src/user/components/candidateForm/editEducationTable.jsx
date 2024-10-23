import { useState, useEffect, useCallback } from 'react'
import { Table, Input, Button, Form, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'
const EditEducationTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState(dataSource)
  const { t } = useTranslation()
  useEffect(() => {
    setLocalDataSource(dataSource)
  }, [dataSource])

  useEffect(() => {
    form.setFieldsValue({ educations: localDataSource })
  }, [localDataSource, form])

  const handleEducationChange = useCallback((key, field, value) => {
    setLocalDataSource((prevData) =>
      prevData.map((education) =>
        education.key === key ? { ...education, [field]: value } : education,
      ),
    )
  }, [])

  // Xóa dòng dữ liệu dựa vào key
  const removeEducation = useCallback((key) => {
    setLocalDataSource((prevData) =>
      prevData.filter((education) => education.key !== key),
    )
  }, [])

  // Định nghĩa cột cho bảng
  const educationColumns = [
    {
      title:t('education_columns.highest_education_level'),
      dataIndex: 'highest_education_level',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(
              record.key,
              'highest_education_level',
              e.target.value,
            )
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('education_columns.school'),
      dataIndex: 'school',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.key, 'school', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:  t('education_columns.major'),
      dataIndex: 'major',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.key, 'major', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:t('education_columns.school_year'),
      dataIndex: 'school_year',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.key, 'school_year', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('education_columns.year_ended'),
      dataIndex: 'year_ended',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.key, 'year_ended', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('education_columns.year_of_graduation'),
      dataIndex: 'year_of_graduation',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(
              record.key,
              'year_of_graduation',
              e.target.value,
            )
          }
          className="border-none w-36 md:w-full"
        />
      ),
    },
    {
      title:t('education_columns.classification'),
      dataIndex: 'classification',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleEducationChange(record.key, 'classification', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
  ]

  return (
    <Form.Item name="educations">
      <Table
        dataSource={localDataSource}
        columns={educationColumns}
        pagination={false}
        rowKey={(record) => record.key}
        bordered
        size="small"
      />
    </Form.Item>
  )
}

export default EditEducationTable
