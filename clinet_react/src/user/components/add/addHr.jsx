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
  DatePicker,
} from 'antd'
import { PostHrNew } from '../../../features/hrAllData/postHrNew'

const { Title } = Typography
const { Option } = Select

export default function AddHR({ isOpen, onClose, fetchData }) {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  const handleFinish = async (values) => {
    const {
      employee_code,
      full_name,
      gender,
      birth_date,
      id_number,
      phone_number,
      email,
      erp_department_registration,
      team,
      part,
      position,
    } = values

    const data = {
      employee_code,
      full_name,
      gender,
      birth_date,
      id_number,
      phone_number,
      email,
      erp_department_registration,
      team,
      part,
      position,
    }

    try {
      const response = await PostHrNew(data)
      if (response.data.success) {
        message.success(t('Đăng ký tài khoản thành công'))
        form.resetFields()
        fetchData()
        onClose()
      } else {
        message.error(t('Lỗi khi tạo tài khoản!'))
      }
    } catch (error) {
      message.error(t('Lỗi khi tạo tài khoản!'))
    }
  }

  return (
    <Drawer
      title={
        <Title level={4}>
          <span className="text-base"> {t('Thêm người dùng mới')}</span>
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
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('Mã nhân viên')}
              name="employee_code"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Mã nhân viên')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              label={t('Họ và tên')}
              name="full_name"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Nhập họ và tên')} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('Giới tính')}
              name="gender"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Giới tính')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t('Ngày sinh')}
              name="birth_date"
              style={{ textAlign: 'left' }}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder="Chọn ngày sinh"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('Căn cước công dân')}
              name="id_number"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('CCCD')} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('Số điện thoại')}
              name="phone_number"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Số điện thoại')} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('Email')}
              name="email"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Emal')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('Đăng ký BP ERP')}
              name="erp_department_registration"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('Team')}
              name="team"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Team')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('Part')}
              name="part"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('Chức vụ')}
              name="position"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
