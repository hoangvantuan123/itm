import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import {
  Input,
  Space,
  Table,
  Typography,
  Tag,
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
import { changePasswordIds } from '../../../features/auth/API/changePasswordIds'

export default function ChangePassSelect({
  userData,
  selectedRowKeys,
  setIsOpen,
  isOpen,
  handleCancelOpenDrawer,
}) {
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
  const getSelectedUsers = () => {
    const selectedUsers = userData.filter((user) =>
      selectedRowKeys.includes(user.id),
    )
    return selectedUsers
  }
  const selectedUsersList = getSelectedUsers()

  const handleFinish = async (values) => {
    const { new_password } = values

    try {
      const result = await changePasswordIds(selectedRowKeys, new_password)
      if (result.success) {
        message.success(t('Cập nhật mật khẩu thành công'))
        form.resetFields()
        setIsOpen(false)
      } else {
        message.error(result.message || 'Lỗi khi cập nhật mật khẩu!')
      }
    } catch (error) {
      message.error(t('Lỗi khi cập nhật mật khẩu!'))
    }
  }

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Đăng nhập',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',

      render: (active) => {
        let color
        let displayText

        if (active === true) {
          color = 'success'
          displayText = `${t('Đã kết nối')}`
        } else if (active === false) {
          color = 'error'
          displayText = `${t('Chưa kết nối')}`
        } else {
          color = 'default'
          displayText = `${t('Chưa xác định')}`
        }

        return (
          <Tag
            color={color}
            key={active}
            className="p-1 font-bold rounded-lg px-6"
          >
            {displayText}
          </Tag>
        )
      },
    },
  ]
  return (
    <Drawer
      title={<Title level={4}>{t('Thay đổi mật khẩu')}</Title>}
      open={isOpen}
      onClose={handleCancelOpenDrawer}
      width={900}
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

      <Title level={5} className="pt-3">
        {t('Danh sách người dùng')}
      </Title>
      <Table
        bordered
        columns={columns}
        dataSource={selectedUsersList}
        rowKey="id"
        className="bg-slate-50 cursor-pointer pb-0 md:pb-40"
      />
    </Drawer>
  )
}
