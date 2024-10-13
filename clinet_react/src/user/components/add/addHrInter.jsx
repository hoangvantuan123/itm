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
import { PostHrInterNew } from '../../../features/hrInter/postHrInterNew'
import moment from 'moment'
import 'moment-timezone'

const { Title } = Typography
const { Option } = Select

export default function AddHrInter({ isOpen, onClose, fetchData }) {
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
      applicant_status,
      applicant_type,
      interview_date,
      team,
      part,
      production,
      section,
      job_field,
      position
    } = values

    const data = {
      employee_code,
      full_name,
      gender,
      birth_date,
      id_number,
      phone_number,
      email,
      applicant_status,
      applicant_type,
      interview_date,
      team,
      part,
      production,
      section,
      job_field,
      position
    }

    try {
      const response = await PostHrInterNew(data)
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
          <Col span={12}>
            <Form.Item
              label={t('Team')}
              name="team"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Team')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('Part')}
              name="part"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Part')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('Production')}
              name="production"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Production')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('Section')}
              name="section"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Section')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('Job field')}
              name="job_field"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Job field')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('Position')}
              name="position"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('Position')} />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              label={t('Trạng thái ứng tuyển')}
              name="applicant_status"
              style={{ textAlign: 'left' }}
            >
              <Select size="large" placeholder={t('Chọn trạng thái ứng viên')}>
                <Option value="waiting_interview">
                  {t('Lên lịch phỏng vấn')}
                </Option>
                <Option value="interviewed">{t('Đã phỏng vấn')}</Option>
                <Option value="waiting_result">{t('Đang đợi kết quả')}</Option>
                <Option value="accepted">{t('Đã nhận')}</Option>
                <Option value="rejected">{t('Không đạt')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('Ngày phỏng vấn')}
              name="interview_date"
              style={{ textAlign: 'left' }}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder="Chọn ngày phỏng vấn"
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
