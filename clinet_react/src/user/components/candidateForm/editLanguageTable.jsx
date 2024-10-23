import { useState, useEffect, useCallback } from 'react'
import { Table, Input, Button, Form, DatePicker } from 'antd'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import 'moment/locale/vi'

const EditLanguageTable = ({ form, dataSource }) => {
  const [localDataSource, setLocalDataSource] = useState(dataSource)
  const { t } = useTranslation()
  useEffect(() => {
    setLocalDataSource(dataSource)
  }, [dataSource])

  useEffect(() => {
    form.setFieldsValue({ languages: localDataSource })
  }, [localDataSource, form])

  const handleLanguageChange = useCallback((id, field, value) => {
    setLocalDataSource((prevData) =>
      prevData.map((language) =>
        language.id === id ? { ...language, [field]: value } : language,
      ),
    )
  }, [])

  const removeLanguage = useCallback((key) => {
    setLocalDataSource((prevData) =>
      prevData.filter((language) => language.id !== key),
    )
  }, [])

  const languageColumns = [
    {
      title:  t('language_columns.language'),
      dataIndex: 'language',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleLanguageChange(record.id, 'language', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:t('language_columns.certificate_type'),
      dataIndex: 'certificate_type',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleLanguageChange(record.id, 'certificate_type', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title: t('language_columns.score'),
      dataIndex: 'score',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleLanguageChange(record.id, 'score', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
    {
      title:t('language_columns.level'),
      dataIndex: 'level',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) =>
            handleLanguageChange(record.id, 'level', e.target.value)
          }
          className="border-none w-36 md:w-full"
          style={{ margin: 0 }}
        />
      ),
    },
  ]

  return (
    <Form.Item name="languages">
      <Table
        dataSource={localDataSource}
        columns={languageColumns}
        pagination={false}
        rowKey={(record) => record.id}
        bordered
        size="small"
      />
    </Form.Item>
  )
}

export default EditLanguageTable
