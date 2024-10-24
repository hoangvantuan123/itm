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
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('add_page.employee_code')}
              name="employee_code"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.employee_code')} />
            </Form.Item>
          </Col>
        </Row>
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
                placeholder={t('add_page.note_date')}
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
          <Col span={24}>
            <Form.Item
              label={t('add_page.erp_department_registration')}
              name="erp_department_registration"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('add_page.team')}
              name="team"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" placeholder={t('add_page.team')} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label={t('add_page.part')}
              name="part"
              style={{ textAlign: 'left' }}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('add_page.position')}
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
