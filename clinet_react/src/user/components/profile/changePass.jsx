import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import {
  Input,
  Space,
  Table,
  Typography,
  message,
  Button,
  Tabs,
  Drawer,
  Form,
} from 'antd'
const { Search } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs
import 'moment/locale/vi'

export default function ChangePass({
  setIsOpen,
  isOpen,
  handleCancelOpenDrawer,
  openShow,
}) {
  const page = 1
  const pageSize = 100
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleFinish = async (values) => {
    message.success(t('Chưa tạo đầu API'))
  }
  return (
    <Drawer
      title={
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('Đổi mật khẩu')}
        </Title>
      }
      open={isOpen}
      onClose={handleCancelOpenDrawer}
      width={500}
      closable={false}
      extra={[
        <Button key="cancel" onClick={handleCancelOpenDrawer}>
          {t('Thoát')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
          onClick={() => form.submit()}
        >
          {t('Lưu')}
        </Button>,
      ].filter(Boolean)}
    >
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        name="change_password"
      >
        <Form.Item
          label={t('personal_settings_key_menu_03.label_new_pass')}
          name="new_password"
          rules={[
            {
              required: true,
              message: t(
                'personal_settings_key_menu_03.please_input_new_password',
              ),
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t('personal_settings_key_menu_03.label_new_pass')}
          />
        </Form.Item>

        <Form.Item
          label={t('personal_settings_key_menu_03.label_succ_pass')}
          name="confirm_password"
          dependencies={['new_password']}
          rules={[
            {
              required: true,
              message: t(
                'personal_settings_key_menu_03.please_confirm_new_password',
              ),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('new_password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(
                    t('personal_settings_key_menu_03.passwords_do_not_match'),
                  ),
                )
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t('personal_settings_key_menu_03.label_succ_pass')}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
