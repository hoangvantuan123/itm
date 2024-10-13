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
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { registerUser } from '../../../features/auth/API/registerAPI'

const { Title } = Typography
const { Option } = Select

export default function AddUser({ isOpen, onClose, fetchData }) {
  const { t } = useTranslation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleFinish = async (values) => {
    const { fullname, username, password } = values
    try {
      const data = await registerUser({
        login: username,
        password: password,
        nameUser: fullname,
        language: 'vi',
      })
      message.success(t('Đăng ký tài khoản thành công'))
      form.resetFields()
      fetchData()
      onClose()
    } catch (error) {
      message.error(t('Lỗi khi đăng ký tài khoản!'))
    }
  }

  return (
    <Drawer
      title={
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('Thêm người dùng mới')}
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
        style={{ textAlign: 'left' }}
      >
        <Title level={5}>{t('Thông tin cơ bản')}</Title>

        {/* Thông tin cơ bản */}
        <Card style={{ marginBottom: '20px' }}>
          <Form.Item
            label={t('Họ và tên')}
            name="fullname"
            rules={[{ required: true, message: t('Vui lòng nhập họ và tên') }]}
            style={{ textAlign: 'left' }}
          >
            <Input size="large" placeholder={t('Nhập họ và tên')} />
          </Form.Item>

          <Form.Item
            label={t('Tên đăng nhập')}
            name="username"
            rules={[
              { required: true, message: t('Vui lòng nhập tên đăng nhập') },
            ]}
            style={{ textAlign: 'left' }}
          >
            <Input size="large" placeholder={t('Nhập tên đăng nhập')} />
          </Form.Item>

          <Form.Item
            label={t('Mật khẩu')}
            name="password"
            rules={[{ required: true, message: t('Vui lòng nhập mật khẩu') }]}
            style={{ textAlign: 'left' }}
          >
            <Input.Password size="large" placeholder={t('Nhập mật khẩu')} />
          </Form.Item>

          <Form.Item
            label={t('Tài khoản liên kết đến nhân viên')}
            name="employeeAccount"
            rules={[
              {
                required: false,
                message: t('Vui lòng chọn tài khoản liên kết'),
              },
            ]}
            style={{ textAlign: 'left' }}
          >
            <Select
              showSearch
              placeholder={t('Chọn tài khoản nhân viên')}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().includes(input.toLowerCase())
              }
              size="large"
            >
              <Option value="employee1">{t('Nhân viên 1')}</Option>
              <Option value="employee2">{t('Nhân viên 2')}</Option>
              <Option value="employee3">{t('Nhân viên 3')}</Option>
              <Option value="employee4">{t('Nhân viên 4')}</Option>
              <Option value="employee5">{t('Nhân viên 5')}</Option>
            </Select>
          </Form.Item>
        </Card>
      </Form>
    </Drawer>
  )
}
