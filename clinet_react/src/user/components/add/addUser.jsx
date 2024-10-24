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
  const [form] = Form.useForm()

  const handleFinish = async (values) => {
    const { fullname, username, password, cid } = values
    try {
      const data = await registerUser({
        login: username,
        password: password,
        nameUser: fullname,
        language: 'vi',
        cid: cid
      })
      message.success(t('api_status.success_acc'))
      form.resetFields()
      fetchData()
      onClose()
    } catch (error) {
      message.error(t('api_status.error_acc'))
    }
  }

  return (
    <Drawer
      title={
        <Title level={4} >
          {t('add_page.add_user')}
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
        style={{ textAlign: 'left' }}
      >
        <Title level={5}>{t('add_page.title_note_1')}</Title>

        <Form.Item
          label={t('add_page.full_name')}
          name="fullname"
          rules={[{ required: true, message: t('add_page.rules_full_name') }]}
          style={{ textAlign: 'left' }}
        >
          <Input size="large" placeholder={t('add_page.note_full_name')} />
        </Form.Item>

        <Form.Item
          label={t('add_page.user_name')}
          name="username"
          rules={[
            { required: true, message: t('add_page.rules_user_name') },
          ]}
          style={{ textAlign: 'left' }}
        >
          <Input size="large" placeholder={t('add_page.note_user_name')} />
        </Form.Item>

        <Form.Item
          label={t('add_page.password')}
          name="password"
          rules={[{ required: true, message: t('add_page.rules_password') }]}
          style={{ textAlign: 'left' }}
        >
          <Input.Password size="large" placeholder={t('add_page.note_password')} />
        </Form.Item>
        <Form.Item
          label={t('add_page.employee_code')}
          name="cid"
          rules={[
            { required: true, message: t('add_page.rules_cid') },
          ]}
          style={{ textAlign: 'left' }}
        >
          <Input size="large" placeholder={t('add_page.note_cid')} />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
