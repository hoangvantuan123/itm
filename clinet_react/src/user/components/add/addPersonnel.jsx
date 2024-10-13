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
  Row,
  Col,
  Avatar,
  Upload,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { PostHrEmployee } from '../../../features/hr/postHrEmployee'
import { registerUser } from '../../../features/auth/API/registerAPI'

const { Title } = Typography
const { Option } = Select

export default function AddPersonnel({ isOpen, onClose, fetchData }) {
  const { t } = useTranslation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleFinish = async (values) => {
    const { name, mobile_phone, employee_id, work_email } = values
    const data = {
      name: name,
      mobile_phone: mobile_phone,
      employee_id: employee_id,
      work_email: work_email,
    }

    try {
      await PostHrEmployee(data)
      message.success(t('Đăng ký tài khoản thành công'))
    } catch (error) {
      message.error(t('Lỗi khi đăng ký tài khoản!'))
    }
  }

  return (
    <Drawer
      title={<Title level={4}>{t('Thêm nhân viên')}</Title>}
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
      {/*  <span
  className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="-ms-1 me-1.5 size-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>

  <p className="whitespace-nowrap text-sm">NV098776643</p>
</span> */}

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ textAlign: 'left' }}
      >
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Avatar shape="square" size={120} icon={<UserOutlined />} />
        </Row>

        <Title level={5}>{t('Thông tin cơ bản')}</Title>

        <Card style={{ marginBottom: '20px' }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label={t('Tên nhân viên')}
                name="name"
                rules={[
                  { required: true, message: t('Vui lòng nhập tên nhân viên') },
                ]}
              >
                <Input size="large" placeholder={t('Tên nhân viên')} />
              </Form.Item>
            </Col>

            {/* Di động và Bộ phận */}
            <Col xs={24} md={12}>
              <Form.Item label={t('Di động')} name="mobile_phone">
                <Input size="large" placeholder={t('Di động')} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={t('Bộ phận')} name="department">
                <Input size="large" placeholder={t('Bộ phận')} />
              </Form.Item>
            </Col>

            {/* Mã nhân viên và Email công việc */}
            <Col xs={24} md={12}>
              <Form.Item
                label={t('Mã nhân viên')}
                name="employee_id"
                rules={[
                  { required: true, message: t('Vui lòng nhập mã nhân viên') },
                ]}
              >
                <Input size="large" placeholder={t('Mã nhân viên')} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={t('Email công việc')} name="work_email">
                <Input size="large" placeholder={t('Email công việc')} />
              </Form.Item>
            </Col>

            {/* Chức vụ và Quản lý */}
            <Col xs={24} md={12}>
              <Form.Item label={t('Chức vụ')} name="position">
                <Input size="large" placeholder={t('Chức vụ')} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={t('Quản lý')} name="manager">
                <Input size="large" placeholder={t('Quản lý')} />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Title level={5}>{t('Thông tin riêng tư')}</Title>
        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
          <details
            className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-base font-medium">{t('Liên hệ cá nhân')}</h2>

              <span className="relative size-5 shrink-0">
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4 mt-5">
              {/* Địa chỉ cá nhân */}
              <Form.Item label={t('Địa chỉ cá nhân')} name="personalAddress">
                <Input size="large" placeholder={t('Địa chỉ cá nhân')} />
              </Form.Item>

              {/* Email */}
              <Form.Item label={t('Email')} name="personalEmail">
                <Input size="large" placeholder={t('Email')} />
              </Form.Item>

              {/* Điện thoại */}
              <Form.Item label={t('Điện thoại')} name="personalPhone">
                <Input size="large" placeholder={t('Điện thoại')} />
              </Form.Item>

              {/* Ngôn ngữ */}
              <Form.Item label={t('Ngôn ngữ')} name="language">
                <Input size="large" placeholder={t('Ngôn ngữ')} />
              </Form.Item>

              {/* Khoảng cách nhà đến nơi làm */}
              <Form.Item
                label={t('Khoảng cách từ nhà đến nơi làm')}
                name="distanceToWork"
              >
                <Input
                  size="large"
                  placeholder={t('Khoảng cách từ nhà đến nơi làm')}
                />
              </Form.Item>

              {/* Biển số xe riêng */}
              <Form.Item label={t('Biển số xe riêng')} name="vehicleLicense">
                <Input size="large" placeholder={t('Biển số xe riêng')} />
              </Form.Item>
            </div>
          </details>

          <details
            className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-base font-medium">
                {t('Tình trạng gia đình')}
              </h2>
              <span className="relative size-5 shrink-0">
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4 mt-5">
              {/* Tình trạng hôn nhân */}
              <Form.Item label={t('Tình trạng hôn nhân')} name="maritalStatus">
                <Select
                  size="large"
                  placeholder={t('Chọn tình trạng hôn nhân')}
                >
                  <Select.Option value="single">{t('Độc thân')}</Select.Option>
                  <Select.Option value="married">
                    {t('Đã kết hôn')}
                  </Select.Option>
                  <Select.Option value="divorced">{t('Ly hôn')}</Select.Option>
                </Select>
              </Form.Item>

              {/* Tên liên hệ khẩn cấp */}
              <Form.Item
                label={t('Tên liên hệ khẩn cấp')}
                name="emergencyContactName"
              >
                <Input size="large" placeholder={t('Tên liên hệ khẩn cấp')} />
              </Form.Item>

              {/* Số điện thoại liên hệ khẩn cấp */}
              <Form.Item
                label={t('Số điện thoại khẩn cấp')}
                name="emergencyContactPhone"
              >
                <Input size="large" placeholder={t('Số điện thoại khẩn cấp')} />
              </Form.Item>
            </div>
          </details>

          {/* Giáo dục */}
          <details
            className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-base font-medium">{t('Giáo dục')}</h2>
              <span className="relative size-5 shrink-0">
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4 mt-5">
              {/* Cấp chứng chỉ */}
              <Form.Item label={t('Cấp chứng chỉ')} name="degree">
                <Select size="large" placeholder={t('Chọn cấp chứng chỉ')}>
                  <Select.Option value="graduate">
                    {t('Tốt nghiệp')}
                  </Select.Option>
                  <Select.Option value="bachelor">{t('Cử nhân')}</Select.Option>
                  <Select.Option value="master">{t('Thạc sĩ')}</Select.Option>
                  <Select.Option value="phd">{t('Tiến sĩ')}</Select.Option>
                  <Select.Option value="other">{t('Khác')}</Select.Option>
                </Select>
              </Form.Item>

              {/* Lĩnh vực nghiên cứu */}
              <Form.Item label={t('Lĩnh vực nghiên cứu')} name="fieldOfStudy">
                <Input size="large" placeholder={t('Lĩnh vực nghiên cứu')} />
              </Form.Item>

              {/* Trường học */}
              <Form.Item label={t('Trường học')} name="school">
                <Input size="large" placeholder={t('Trường học')} />
              </Form.Item>
            </div>
          </details>
          <details
            className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-base font-medium">{t('Công dân')}</h2>
              <span className="relative size-5 shrink-0">
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
          </details>
          <details
            className="group p-6 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-base font-medium">
                {t('Giấy phép lao động')}
              </h2>
              <span className="relative size-5 shrink-0">
                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
          </details>
        </div>
      </Form>
    </Drawer>
  )
}
