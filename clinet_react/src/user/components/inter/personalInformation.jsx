import { useEffect } from 'react'
import { Form, Input, InputNumber, Row, Col, DatePicker, Select } from 'antd'
import moment from 'moment'
import { useTranslation } from 'react-i18next';
const { Option } = Select

const PersonalInformation = ({ form, formData }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (formData) {
      form.setFieldsValue({
        full_name: formData.full_name,
        gender: formData.gender,
        interview_date: formData.interview_date
          ? moment(formData.interview_date)
          : null,
        entering_day: formData.entering_day
          ? moment(formData.entering_day)
          : null,
        birth_date: formData.birth_date ? moment(formData.birth_date) : null,
        id_number: formData.id_number,
        id_issue_date: formData.id_issue_date
          ? moment(formData.id_issue_date)
          : null,
        ethnicity: formData.ethnicity,
        id_issue_place: formData.id_issue_place,
        insurance_number: formData.insurance_number,
        tax_number: formData.tax_number,
        phone_number: formData.phone_number,
        email: formData.email,
        alternate_phone_number: formData.alternate_phone_number,
        alternate_name: formData.alternate_name,
        alternate_relationship: formData.alternate_relationship,
        birth_address: formData.birth_address,
        birth_province: formData.birth_province,
        birth_district: formData.birth_district,
        birth_ward: formData.birth_ward,
        current_address: formData.current_address,
        current_province: formData.current_province,
        current_district: formData.current_district,
        current_ward: formData.current_ward,
        status_desired_base_salaryform: formData.status_desired_base_salaryform,
        desired_total_salary: formData.desired_total_salary,
      })
    }
  }, [formData, form])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('hr_recruitment_1_1.title_note_11')}</h2>

      <Row gutter={16}>
        <Col xs={24} sm={20} md={20}>
          <Form.Item
            label={t('hr_recruitment_1_1.full_name')}
            name="full_name"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input size="large" placeholder="Nhập họ tên" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={4} md={4}>
          <Form.Item
            label={t('hr_recruitment_1_1.gender')}
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select size="large" placeholder="Chọn giới tính">
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Form.Item label={t('hr_recruitment_1_1.interview_date')} name="interview_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày phỏng vấn"
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Form.Item label={t('hr_recruitment_1_1.entering_day')} name="entering_day">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày vào"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label={t('hr_recruitment_1_1.birth_date')}
            name="birth_date"
            rules={[{ required: true, message: 'Vui lòng nhập ngày sinh!' }]}
          >
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày sinh"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          {/* d */}
          <Form.Item
            label={t('hr_recruitment_1_1.id_number')}
            name="id_number"
            rules={[{ required: true, message: 'Vui lòng nhập số CMND!' }]}
          >
            <Input
              size="large"
              style={{ width: '100%' }}
              placeholder="Nhập số CMND"
            />
          </Form.Item>
        </Col>
        <Col xs={14} sm={12} md={8}>
          <Form.Item label={t('hr_recruitment_1_1.id_issue_date')} name="id_issue_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày cấp"
            />
          </Form.Item>
        </Col>
        <Col xs={10} sm={12} md={8}>
          <Form.Item label={t('hr_recruitment_1_1.ethnicity')} name="ethnicity">
            <Input size="large" placeholder="Nhập dân tộc" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item label={t('hr_recruitment_1_1.id_issue_place')} name="id_issue_place">
            <Input size="large" placeholder="Nhập nơi cấp" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label={t('hr_recruitment_1_1.insurance_number')} name="insurance_number">
            <Input size="large" placeholder="Nhập số bảo hiểm" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label={t('hr_recruitment_1_1.tax_number')} name="tax_number">
            <Input size="large" placeholder="Nhập mã số thuế" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={t('hr_recruitment_1_1.phone_number')}
            name="phone_number"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
            ]}
          >
            <Input
              style={{ width: '100%' }}
              size="large"
              placeholder="Nhập số điện thoại"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label="E-mail:" name="email">
            <Input size="large" placeholder="Nhập email" />
          </Form.Item>
        </Col>
      </Row>

      <h2 className="text-xl font-semibold mb-4">{t('hr_recruitment_1_1.title_note_13')}</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.phone_number_when_needed')}
            name="alternate_phone_number"
            rules={[
              {
                required: true,
                message:t('hr_recruitment_1_1.rules_alternate_phone_number') ,
              },
            ]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_alternate_phone_number')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.alternate_name')}
            name="alternate_name"
            rules={[{ required: true, message: t('hr_recruitment_1_1.rules_alternate_name') }]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_alternate_name')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.alternate_relationship')}
            name="alternate_relationship"
            rules={[{ required: true, message: t('hr_recruitment_1_1.rules_alternate_relationship')}]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_alternate_relationship')} />
          </Form.Item>
        </Col>
      </Row>

      <h2 className="text-xl font-semibold mb-4"> {t('hr_recruitment_1_1.birth_address')} </h2>
      <h3 className=" italic mb-2">
      {t('hr_recruitment_1_1.title_note_1')} 
      </h3>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.birth_province')}
            name="birth_province"
            rules={[{ required: true, message: t('hr_recruitment_1_1.rules_birth_province') }]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_birth_province')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.birth_district')}
            name="birth_district"
            rules={[{ required: true, message: t('hr_recruitment_1_1.rules_birth_district')}]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_birth_district')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.birth_ward')}
            name="birth_ward"
            rules={[{ required: true, message:  t('hr_recruitment_1_1.rules_birth_ward') }]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_birth_address')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label={t('hr_recruitment_1_1.birth_address')}
            name="birth_address"
            rules={[{ required: true, message:  t('hr_recruitment_1_1.rules_birth_address') }]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_birth_address')} />
          </Form.Item>
        </Col>
      </Row>

      <h3 className=" italic mb-2"> {t('hr_recruitment_1_1.title_note_2')} </h3>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.current_province')}
            name="current_province"
            rules={[{ required: true, message:  t('hr_recruitment_1_1.rules_current_province') }]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_current_province') } />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.current_district')}
            name="current_district"
            rules={[{ required: true, message:  t('hr_recruitment_1_1.rules_current_district') }]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_current_district') } />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label={t('hr_recruitment_1_1.current_ward')}
            name="current_ward"
            rules={[{ required: true, message: t('hr_recruitment_1_1.rules_current_ward')}]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.note_current_ward') } />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label={t('hr_recruitment_1_1.current_address')}
            name="current_address"
            rules={[{ required: true, message: t('hr_recruitment_1_1.rules_current_address') }]}
          >
            <Input size="large" placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Col>
      </Row>
      <h3 className=" italic mb-2">{t('hr_recruitment_1_1.title_note_12')}</h3>
      <Row gutter={16}>
      
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={t('hr_recruitment_1_1.desired_base_salary')}
            name="desired_base_salary"
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.enter_information')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={t('hr_recruitment_1_1.desired_total_salary')}
            name="desired_total_salary"
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.enter_information')} />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalInformation
