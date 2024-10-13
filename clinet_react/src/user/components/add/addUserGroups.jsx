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
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
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
        message.success('Nhóm được tạo thành công')
        form.resetFields()
        onClose()
      } else {
        message.error(result.message || 'Lỗi khi tạo nhóm!')
      }
    } catch (error) {
      message.error('Lỗi khi tạo nhóm!')
    }
  }

  return (
    <Drawer
      title={
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('Thêm nhóm dùng mới')}
        </Title>
      }
      open={isOpen}
      closable={false}
      width={900}
      extra={[
        <Button key="cancel" onClick={onClose}>
          {t('Hủy')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          className=" ml-2 border-gray-200  bg-indigo-600 text-white  shadow-sm text-sm"
          onClick={() => form.submit()}
        >
          {t('Lưu')}
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
        <Title level={5}>{t('Thông tin nhóm')}</Title>

        {/* Thông tin cơ bản */}
        <Card style={{ marginBottom: '20px' }}>
          <Form.Item
            label={t('Tên nhóm')}
            name="name"
            rules={[{ required: true, message: t('Vui lòng nhập tên nhóm') }]}
            style={{ textAlign: 'left' }}
          >
            <Input size="large" placeholder={t('Tên nhóm')} />
          </Form.Item>
          <Form.Item
            label={t('Ghi chú')}
            name="comment"
            style={{ textAlign: 'left' }}
          >
            <TextArea rows={4} size="large" placeholder={t('Ghi chú')} />
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  )
}
