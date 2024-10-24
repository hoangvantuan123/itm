import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Input,
  Modal,
  Typography,
  Form,
  Select,
  Button,
  Card,
  Divider,
  Space,
  Switch,
  Checkbox,
  Drawer,
  Radio,
  message,
  Table,
  Popconfirm,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { PostResGroups } from '../../../features/resGroups/postResGroups'
const { Title } = Typography
const { Option } = Select
const { TextArea } = Input
export default function AddUserGroups({ isOpen, onClose, fetchData }) {
  const { t } = useTranslation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const [count, setCount] = useState(3)

  const handleFinish = async (values) => {
    const { name, comment } = values
    try {
      const result = await PostResGroups(name, comment)

      if (result.success) {
        fetchData()
        message.success(t('api_status.success_group'))
        form.resetFields()
        onClose()
      } else {
        message.error(result.message || t('api_status.error_group'))
      }
    } catch (error) {
      message.error(t('api_status.error_group'))
    }
  }

  return (
    <Drawer
      title={
        <Title level={4}>
          {t('add_page.add_group')}
        </Title>
      }
      open={isOpen}
      closable={false}
      width={900}
      extra={[
        <Button key="cancel" onClick={onClose}>
          {t('add_page.cancel')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          className=" ml-2 border-gray-200  bg-indigo-600 text-white  shadow-sm text-sm"
          onClick={() => form.submit()}
        >
          {t('add_page.save')}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          language: 'vi',
          timezone: 'GMT+7',
          notifications: true,
          security: false,
        }}
        style={{ textAlign: 'left' }}
      >
        <Title level={5}>{t('add_page.title_note_2')}</Title>

        <Form.Item
          label={t('add_page.name_group')}
          name="name"
          rules={[{ required: true, message: t('add_page.rules_group') }]}
          style={{ textAlign: 'left' }}
        >
          <Input size="large" placeholder={t('add_page.name_group')} />
        </Form.Item>
        <Form.Item
          label={t('add_page.comment')}
          name="comment"
          style={{ textAlign: 'left' }}
        >
          <TextArea rows={4} size="large" placeholder={t('add_page.comment')} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
