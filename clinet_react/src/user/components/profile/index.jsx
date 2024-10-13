import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Card,
  Avatar,
  Row,
  Col,
  Divider,
  Button,
  Dropdown,
  Menu,
  Switch,
  Space,
  Checkbox,
  Typography,
  Table,
  Radio,
  Form,
  Input,
  Drawer,
  Select,
  message,
} from 'antd'
import {
  TeamOutlined,
  SafetyOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons'
import DefaultAvatar from '../../../assets/default-avatar.png'
import { PutUserID } from '../../../features/resUsers/putUserId'
import { GetUserGroupStatusID } from '../../../features/resGroups/getUserGroupStatusID'
import { DeleteResUserGroups } from '../../../features/resGroups/deleteResUserGroups'
import { PostResUserIdGroups } from '../../../features/resGroups/postResUserIdGroups'
import { checkActionPermission } from '../../../permissions'
import ChangePass from './changePass'
const { Title } = Typography

const { Option } = Select
const columns = [
  {
    title: 'Thiết bị',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Đã thêm vào',
    key: 'permissions',
    render: (_, record) => <a>{record.permissions}</a>,
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'Chrome trên MacOS',
    permissions: '03/08/2024 13:25:03',
  },
  {
    key: '2',
    name: 'Firefox trên Windows',
    permissions: '12/07/2024 09:15:45',
  },
  {
    key: '3',
    name: 'Safari trên iOS',
    permissions: '22/06/2024 16:30:20',
  },
  {
    key: '4',
    name: 'Edge trên Linux',
    permissions: '01/09/2024 10:05:33',
  },
  {
    key: '5',
    name: 'Opera trên Android',
    permissions: '15/08/2024 11:40:10',
  },
]
const SettingIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Settings--Streamline-Solar-Ar"
      className="w-4 h-4 "
    >
      <path
        stroke="#000000"
        d="M8.7181 12C8.7181 14.5264 11.453 16.1054 13.6409 14.8422C14.6563 14.2559 15.2819 13.1725 15.2819 12C15.2819 9.4736 12.547 7.8946 10.3591 9.1578C9.3437 9.7441 8.7181 10.8275 8.7181 12"
        strokeWidth="1.5"
      ></path>
      <path
        d="M13.9313 1.227C13.5291 1.0605 13.0195 1.0605 12 1.0605C10.9805 1.0605 10.4709 1.0605 10.0687 1.227C9.5327 1.4491 9.1067 1.875 8.8847 2.4111C8.7833 2.6558 8.7436 2.9404 8.7281 3.3556C8.7053 3.9657 8.3924 4.5304 7.8637 4.8356C7.335 5.1409 6.6895 5.1295 6.1497 4.8442C5.7825 4.6501 5.5161 4.5421 5.2535 4.5075C4.6782 4.4318 4.0964 4.5877 3.636 4.9409C3.2908 5.2059 3.0359 5.6473 2.5262 6.5302C2.0165 7.413 1.7616 7.8544 1.7048 8.2859C1.6291 8.8612 1.785 9.4431 2.1382 9.9034C2.2994 10.1136 2.526 10.2901 2.8777 10.5111C3.3947 10.836 3.7274 11.3895 3.7274 12C3.7273 12.6105 3.3947 13.1639 2.8777 13.4886C2.526 13.7097 2.2993 13.8864 2.1381 14.0966C1.7848 14.5569 1.6289 15.1387 1.7047 15.714C1.7615 16.1454 2.0164 16.5869 2.5261 17.4698C3.0358 18.3526 3.2907 18.7941 3.6359 19.059C4.0963 19.4122 4.6781 19.5681 5.2534 19.4924C5.516 19.4578 5.7823 19.3498 6.1496 19.1558C6.6894 18.8705 7.3349 18.8591 7.8637 19.1643C8.3924 19.4696 8.7053 20.0343 8.7281 20.6445C8.7436 21.0596 8.7833 21.3442 8.8847 21.5889C9.1067 22.125 9.5327 22.551 10.0687 22.773C10.4709 22.9395 10.9806 22.9395 12 22.9395C13.0195 22.9395 13.5291 22.9395 13.9313 22.773C14.4673 22.551 14.8933 22.125 15.1153 21.5889C15.2167 21.3442 15.2564 21.0596 15.2719 20.6444C15.2947 20.0343 15.6075 19.4696 16.1362 19.1643C16.665 18.859 17.3105 18.8705 17.8504 19.1558C18.2176 19.3498 18.4839 19.4577 18.7464 19.4923C19.3217 19.5681 19.9036 19.4122 20.3639 19.059C20.7092 18.794 20.9641 18.3526 21.4738 17.4697C21.9835 16.5868 22.2384 16.1454 22.2952 15.714C22.3709 15.1387 22.215 14.5568 21.8618 14.0964C21.7005 13.8863 21.4739 13.7096 21.1222 13.4886C20.6053 13.1639 20.2726 12.6104 20.2726 11.9999S20.6053 10.8361 21.1222 10.5113C21.474 10.2903 21.7007 10.1137 21.8619 9.9034C22.2151 9.4431 22.371 8.8613 22.2953 8.286C22.2385 7.8545 21.9837 7.4131 21.4739 6.5302C20.9642 5.6474 20.7093 5.2059 20.3641 4.941C19.9037 4.5878 19.3218 4.4319 18.7465 4.5076C18.484 4.5422 18.2177 4.6501 17.8504 4.8442C17.3106 5.1295 16.6651 5.1409 16.1364 4.8357C15.6075 4.5304 15.2947 3.9656 15.2719 3.3555C15.2564 2.9404 15.2167 2.6558 15.1153 2.4111C14.8933 1.875 14.4673 1.4491 13.9313 1.227Z"
        stroke="#000000"
        strokeWidth="1.5"
      ></path>
    </svg>
  )
}

export default function UserProfile({
  user,
  isModalVisible,
  handleCancel,
  fetchDataResAllUser,
  setSelectedGroup,
  permissions,
  canEdit,
}) {
  const [groupStatus, setGroupStatus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [selectedGroups, setSelectedGroups] = useState([])
  const [deletedGroups, setDeletedGroups] = useState([])
  const [openShow, setOpenShow] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOnClickOpenShow = (e) => {
    setOpenShow(e.key)
    setIsOpen(true)
  }
  const handleCancelOpenDrawer = () => {
    setIsOpen(false)
  }
  const fetchDataGroupStatus = async (e) => {
    setLoading(true)
    try {
      const response = await GetUserGroupStatusID(e)
      if (response.success) {
        setGroupStatus(response?.data)
        setError(null)
      } else {
        setError(response.message)
        setGroupStatus([])
      }
    } catch (error) {
      setError(error.message || 'Đã xảy ra lỗi')
      setGroupStatus([])
    } finally {
      setLoading(false)
    }
  }
  const menu = (
    <Menu onClick={(e) => handleOnClickOpenShow(e)}>
      <Menu.Item key="edit">Chỉnh sửa thông tin</Menu.Item>
      <Menu.Item key="archive">Lưu trữ</Menu.Item>
      <Menu.Item key="duplicate">Nhân bản</Menu.Item>
      <Menu.Item key="delete">Xóa</Menu.Item>
      <Menu.Item key="change-password">Thay đổi mật khẩu</Menu.Item>
      <Menu.Item key="privacy">Tra cứu quyền riêng tư</Menu.Item>
    </Menu>
  )
  const onFinish = (values) => {
    const { nameUser, login, language, active } = values

    const data = {
      nameUser,
      login,
      language,
      active,
    }

    const promises = [PutUserID(user?.id, data)]

    if (selectedGroups.length > 0) {
      promises.push(PostResUserIdGroups(user?.id, selectedGroups))
    }
    if (deletedGroups.length > 0) {
      promises.push(DeleteResUserGroups(deletedGroups))
    }

    // Thông báo cho người dùng rằng quá trình đang diễn ra
    message.loading(t('Đang cập nhật...'))

    Promise.all(promises)
      .then((results) => {
        let success = true
        let errorMessage = ''

        results.forEach((result) => {
          if (!result.success) {
            success = false
            errorMessage = result.message || 'Lỗi khi cập nhật!'
          }
        })

        if (success) {
          setDeletedGroups([])
          setSelectedGroups([])
          fetchDataGroupStatus(user?.id)
          message.success(t('Cập nhật giá trị thành công'))
        } else {
          message.error(errorMessage)
        }
      })
      .catch((error) => {
        message.error(error.message || t('Lỗi khi cập nhật!'))
      })
      .finally(() => {
        message.destroy()
      })
  }

  useEffect(() => {
    if (isModalVisible === true) {
      fetchDataGroupStatus(user?.id)
    }
    if (user) {
      form.setFieldsValue({
        nameUser: user?.name,
        login: user?.login,
        language: user?.language,
        active: user?.active,
      })
    }
  }, [isModalVisible, user, form])

  const handleCheckboxClick = async (group_id, user_group_id, value) => {
    const newData = groupStatus.map((item) =>
      item.group_id === group_id ? { ...item, status: value } : item,
    )
    setGroupStatus(newData)
    if (value && user_group_id === null) {
      setSelectedGroups((prevSelected) => [...prevSelected, group_id])
    } else {
      setSelectedGroups((prevSelected) =>
        prevSelected.filter((id) => id !== group_id),
      )
    }
    if (user_group_id !== null && value === false) {
      setDeletedGroups((prevSelected) => [...prevSelected, user_group_id])
    } else {
      setDeletedGroups((prevSelected) =>
        prevSelected.filter((id) => id !== user_group_id),
      )
    }
  }

  return (
    <Drawer
      title={
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('Thông tin người dùng')}
        </Title>
      }
      open={isModalVisible}
      onClose={handleCancel}
      width={900}
      closable={false}
      extra={[
        <Button key="cancel" onClick={handleCancel}>
          {t('Thoát')}
        </Button>,
        canEdit && (
          <Button
            key="submit"
            type="primary"
            className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
            onClick={() => form.submit()}
          >
            {t('Lưu')}
          </Button>
        ),
      ].filter(Boolean)}
    >
      <Row
        justify="start"
        style={{ marginBottom: '20px' }}
        className="flex items-center gap-3"
      >
        {/* Nút Hành động */}
        <Dropdown
          overlay={menu}
          trigger={['click']}
          className=" border-[1.3px] border-[#d9d9d9]  rounded-lg p-[0.6rem]   flex items-center space-x-2 bg-white hover:bg-gray-100"
          placement="bottomLeft"
        >
          <button className="flex items-center gap-3  md:text-sm text-xs font-medium">
            {' '}
            <SettingIcon /> Hành động
          </button>
        </Dropdown>

        <span className="inline-flex -space-x-px overflow-hidden rounded-md border border-[#d9d9d9] bg-white shadow-sm">
          <button className="inline-block p-[0.6rem]  border-e md:text-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <TeamOutlined style={{ fontSize: '16px' }} className="mr-2" />
            Nhóm
          </button>

          <button className="inline-block border-e p-[0.6rem]  md:text-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <SafetyOutlined style={{ fontSize: '16px' }} className="mr-2" />
            Quyền truy cập
          </button>

          <button className="inline-block border-e p-[0.6rem]  md:text-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <FileTextOutlined style={{ fontSize: '16px' }} className="mr-2" />
            Total Log
          </button>

          <button className="inline-block border-e p-[0.6rem]  md:text-sm text-xs font-medium text-gray-700 hover:bg-gray-50 focus:relative">
            <UserOutlined style={{ fontSize: '16px' }} className="mr-2" />
            Nhân viên
          </button>
        </span>
      </Row>

      <Row gutter={16} align="top" className="flex-col md:flex-row">
        <Col xs={24} md={6} style={{ display: 'flex' }} className=" md:pb-0">
          <Avatar shape="square" size={128} src={DefaultAvatar} />
        </Col>
        <Col xs={24} md={18}>
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="pt-5 md:mt-0"
          >
            <Row gutter={[16, 16]} className="pb-4">
              <Col xs={24} md={24}>
                <Form.Item
                  label="Họ và Tên"
                  name="nameUser"
                  initialValue={user?.name}
                  rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                >
                  <Input size="large" disabled={!canEdit} />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item
                  label="Tên đăng nhập"
                  name="login"
                  initialValue={user?.login}
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên đăng nhập!',
                    },
                  ]}
                >
                  <Input size="large" disabled={!canEdit} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Ngôn ngữ"
                  name="language"
                  initialValue={user?.language}
                  rules={[
                    { required: true, message: 'Vui lòng chọn ngôn ngữ!' },
                  ]}
                >
                  <Select size="large" disabled={!canEdit}>
                    <Option value="vi">Tiếng Việt</Option>
                    <Option value="en">Tiếng Anh</Option>
                    <Option value="fr">Tiếng Pháp</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Title className="mt-5" level={5}>
        {t('Quyền truy cập')}
      </Title>
      <div className="mb-3">
        <Title level={5}>{t('Loại người dùng')}</Title>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value="admin">{t('Người dùng nội bộ')}</Radio>
            <Radio value="editor">{t('Cổng thông tin')}</Radio>
            <Radio value="viewer">{t('Công khai')}</Radio>
          </Space>
        </Radio.Group>
      </div>
      <div>
        <Title level={5}>{t('Nhóm truy cập & quyền')}</Title>
        <Row gutter={[16, 16]}>
          {groupStatus?.map((item) => (
            <Col xs={12} sm={8} key={item?.group_id}>
              <Checkbox
                value={item?.group_id}
                checked={item.status}
                onChange={(e) =>
                  handleCheckboxClick(
                    item.group_id,
                    item.user_group_id,
                    e.target.checked,
                  )
                }
              >
                {item?.name}
              </Checkbox>
            </Col>
          ))}
        </Row>
      </div>
      <Title className="mt-5" level={5}>
        {t('Bảo mật tài khoản')}
      </Title>
      <Title className="mt-5" level={5}>
        {t('Thiết bị đáng tin cậy')}
      </Title>
      <Table columns={columns} dataSource={data} />
      <Title className="mt-5" level={5}>
        {t('Các thiết bị khác')}
      </Title>
      <div className="mt-4">
        <Button
          size="large"
          className="rounded-lg border-gray-200 bg-indigo-600 text-white p-4 shadow-sm text-sm"
        >
          {t('personal_settings_key_menu_03.sign_out_of_all_devices')}
        </Button>
      </div>
      {openShow === 'change-password' && (
        <ChangePass
          openShow={openShow}
          handleCancelOpenDrawer={handleCancelOpenDrawer}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </Drawer>
  )
}
