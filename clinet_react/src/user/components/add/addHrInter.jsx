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
        message.success(t('api_status.success_acc'))
        form.resetFields()
        fetchData()
        onClose()
      } else {
        message.error(t('api_status.error_acc'))
      }
    } catch (error) {
      message.error(t('api_status.error_acc'))
    }
  }

  return (
    <Drawer
      title={
        <Title level={4}>
          <span className="text-base"> {t('add_page.add_user')}</span>
        </Title>
      }
      open={isOpen}
      closable={false}
      width={600}
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
          {t('add_page.submit')}
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
              label={t('add_page.full_name')}
              name="full_name"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.full_name')} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label={t('add_page.gender')}
              name="gender"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.gender')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t('add_page.birth_date')}
              name="birth_date"
              style={{ textAlign: 'left' }}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder={t('add-page.note_date')}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('add_page.id_number')}
              name="id_number"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.id_number')} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('add_page.phone_number')}
              name="phone_number"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.phone_number')} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('add_page.email')}
              name="email"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.email')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={t('add_page.team')}
              name="team"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.team')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('add_page.part')}
              name="part"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.part')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('add_page.production')}
              name="production"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.production')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('add_page.section')}
              name="section"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.section')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('add_page.job_field')}
              name="job_field"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.job_field')} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('add_page.position')}
              name="position"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.position')} />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              label={t('add_page.applicant_status')}
              name="applicant_status"
              style={{ textAlign: 'left' }}
            >
              <Select size="large" placeholder={t('add_page.note_applicant_status')}>
                <Option value="waiting_interview">
                  {t('add_page.waiting_interview')}
                </Option>
                <Option value="interviewed">{t('add_page.interviewed')}</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('add_page.interview_date')}
              name="interview_date"
              style={{ textAlign: 'left' }}
            >
              <DatePicker
                size="large"
                style={{ width: '100%' }}
                placeholder={t('add_page.note_date')}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}
