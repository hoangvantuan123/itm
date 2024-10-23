import { useState, useEffect } from 'react'
import {
  Col,
  Row,
  Form,
  Input,
  Divider,
  Button,
  Table,
  DatePicker,
  Typography,
  Select,
  Card
} from 'antd'
import { useTranslation } from 'react-i18next'
import EditLanguageTable from './editLanguageTable'
import EditWorkExperienceTable from './editWorkExperienceTable'
import EditEducationTable from './editEducationTable'
import EditFamilyInfoTable from './editFamilyInfoTable'
import SkillTable from '../workerDeclaration/skillTable'
const { Text } = Typography
const { Option } = Select
import moment from 'moment'
const ViewDetailUserHrRecruitment = ({
  form,
  isEditing,
  handleFinish,
  setFormData,
  formData,
  setIsEditing,
  toggleEdit,
}) => {
  const handleFormChange = (changedValues) => {
    setFormData({ ...formData, ...changedValues })
  }
  const { t } = useTranslation()
  useEffect(() => {
    const formattedData = {
      ...formData,
      interview_date: formData.interview_date
        ? moment(formData.interview_date)
        : null,
      start_date: formData.start_date ? moment(formData.start_date) : null,
      birth_date: formData.birth_date ? moment(formData.birth_date) : null,
      entering_day: formData.entering_day
        ? moment(formData.entering_day)
        : null,
      id_issue_date: formData.id_issue_date
        ? moment(formData.id_issue_date)
        : null,
    }
    form.setFieldsValue(formattedData)
  }, [formData, form])

  const familyColumns = [
    { title: t('family_columns.relationship'), dataIndex: 'relationship', key: 'relationship' },
    { title:  t('family_columns.full_name'), dataIndex: 'full_name', key: 'full_name' },
    { title:  t('family_columns.phone_number'), dataIndex: 'phone_number', key: 'phone_number' },
  ]
  const childrenColumns = [
    { title:t('children_columns.children_name'), dataIndex: 'children_name', key: 'children_name' },
    {
      title: t('children_columns.children_birth_date'),
      dataIndex: 'children_birth_date',
      key: 'children_birth_date',
    },
    {
      title: t('children_columns.children_gender'),
      dataIndex: 'children_gender',
      key: 'children_gender',
    },
  ]

  const educationColumns = [
    {
      title: t('education_columns.highest_education_level'),
      dataIndex: 'highest_education_level',
      key: 'highest_education_level',
    },
    { title: t('education_columns.highest_education_level'), dataIndex: 'school', key: 'school' },
    { title: t('education_columns.major'), school: 'major', key: 'major' },
    { title: t('education_columns.school_year'), dataIndex: 'school_year', key: 'school_year' },
    { title: t('education_columns.year_ended'), dataIndex: 'year_ended', key: 'year_ended' },
    {
      title:t('education_columns.year_of_graduation'),
      dataIndex: 'year_of_graduation',
      key: 'year_of_graduation',
    },
    { title: t('education_columns.classification'), dataIndex: 'classification', key: 'classification' },
  ]

  const languageColumns = [
    { title: t('language_columns.language'), dataIndex: 'language', key: 'language' },
    {
      title: t('language_columns.certificate_type'),
      dataIndex: 'certificate_type',
      key: 'certificate_type',
    },
    { title:  t('language_columns.score'), dataIndex: 'score', key: 'score' },
    { title:  t('language_columns.level'), dataIndex: 'level', key: 'level' },
  ]

  const experienceColumns = [
    { title:  t('experience_columns.company_name'), dataIndex: 'company_name', key: 'company_name' },
    { title:  t('experience_columns.position'), dataIndex: 'position', key: 'position' },
    { title:  t('experience_columns.start_date'), dataIndex: 'start_date', key: 'start_date' },
    { title:  t('experience_columns.end_date'), dataIndex: 'end_date', key: 'end_date' },
    { title:  t('experience_columns.tasks'), dataIndex: 'tasks', key: 'tasks' },
    { title:  t('experience_columns.salary'), dataIndex: 'salary', key: 'salary' },
  ]

  return (
    <div>
      <h1 className="text-xl font-bold text-center mb-4">{t('hr_recruitment_1_1.declaration_information')}</h1>
      <Divider orientation="left italic">{t('hr_recruitment_1_1.personnel_information')}</Divider>
      {isEditing ? (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="pb-20"
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item label={t('hr_recruitment_1_1.full_name')} name="full_name">
                <Input size="large" placeholder="Nhập họ tên" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('hr_recruitment_1_1.gender')} name="gender">
                <Select size="large" placeholder="Chọn giới tính">
                  <Option value="Male">{t('hr_recruitment_1_1.male')}</Option>
                  <Option value="Female">{t('hr_recruitment_1_1.female')}</Option>
                  <Option value="Other">{t('hr_recruitment_1_1.other_gender')}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t('hr_recruitment_1_1.interview_date')} name="interview_date">
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  placeholder={t('hr_recruitment_1_1.select_date')}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('hr_recruitment_1_1.entering_day')} name="entering_day">
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  placeholder={t('hr_recruitment_1_1.select_date')}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={t('hr_recruitment_1_1.birth_date')} name="birth_date">
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  placeholder={t('hr_recruitment_1_1.select_date')}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t('hr_recruitment_1_1.id_number')} name="id_number">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={t('hr_recruitment_1_1.id_issue_date')} name="id_issue_date">
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  placeholder={t('hr_recruitment_1_1.select_date')}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={t('hr_recruitment_1_1.ethnicity')} name="ethnicity">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={t('hr_recruitment_1_1.id_issue_place')} name="id_issue_place">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t('hr_recruitment_1_1.insurance_number')} name="insurance_number">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t('hr_recruitment_1_1.tax_number')}  name="tax_number">
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label={t('hr_recruitment_1_1.phone_number')} name="phone_number">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email:" name="email">
                <Input size="large" placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={t('hr_recruitment_1_1.phone_number_when_needed')}
                name="alternate_phone_number"
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={t('hr_recruitment_1_1.alternate_name')} name="alternate_name">
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={t('hr_recruitment_1_1.alternate_relationship')} name="alternate_relationship">
                <Input size="large"  />
              </Form.Item>
            </Col>
          </Row>

          <h3 className="mb-2 mt-2 italic">
          {t('hr_recruitment_1_1.title_note_1')}
          </h3>
          <Row gutter={16} className="mt-2">
            <Col span={8}>
              <Form.Item label= {t('hr_recruitment_1_1.birth_province')} name="birth_province">
                <Input size="large" placeholder="Nhập tỉnh" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label= {t('hr_recruitment_1_1.birth_district')} name="birth_district">
                <Input size="large" placeholder="Nhập quận/huyện" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label= {t('hr_recruitment_1_1.birth_ward')} name="birth_ward">
                <Input size="large" placeholder="Nhập xã/phường" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label= {t('hr_recruitment_1_1.birth_address')} name="birth_address">
                <Input size="large" placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>

          <h3 className="mb-2 mt-2 italic">{t('hr_recruitment_1_1.title_note_2')}</h3>
          <Row gutter={16} className="mt-2">
            <Col span={8}>
              <Form.Item label= {t('hr_recruitment_1_1.current_province')} name="current_province">
                <Input size="large" placeholder="Nhập tỉnh" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label= {t('hr_recruitment_1_1.current_district')} name="current_district">
                <Input size="large" placeholder="Nhập quận/huyện" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label= {t('hr_recruitment_1_1.current_ward')} name="current_ward">
                <Input size="large" placeholder="Nhập xã/phường" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label= {t('hr_recruitment_1_1.current_address')} name="current_address">
                <Input size="large" placeholder="Nhập địa chỉ" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left italic"> {t('hr_recruitment_1_1.title_note_3')}</Divider>
          <EditFamilyInfoTable
            form={form}
            dataSource={formData?.families}
            children={formData?.children}
          />

          <Divider orientation="left italic">{t('hr_recruitment_1_1.title_note_4')}</Divider>
          <h2 className="mt-4 mb-2 italic">{t('hr_recruitment_1_1.title_note_5')}</h2>
          <EditEducationTable form={form} dataSource={formData?.educations} />

          <h2 className="mt-4 mb-2 italic">{t('hr_recruitment_1_1.title_note_6')}</h2>
          <EditLanguageTable form={form} dataSource={formData?.languages} />
          <h2 className="mt-4 mb-2  italic">{t('hr_recruitment_1_1.title_note_7')}</h2>
          <SkillTable form={form} dataSource={formData?.skills} />
          <Divider orientation="left italic">{t('hr_recruitment_1_1.title_note_8')}</Divider>

          <EditWorkExperienceTable
            form={form}
            dataSource={formData.experiences}
          />
        </Form>
      ) : (
        <div className=" pb-28">
          <Row gutter={16}>
            <Col span={16}>
              <div>
                <strong>{t('hr_recruitment_1_1.full_name')}:</strong>
                <Text className="ml-2">{formData.full_name}</Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <strong>{t('hr_recruitment_1_1.gender')}:</strong>
                <Text className="ml-2">{formData.gender}</Text>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.interview_date')}:</strong>
                <Text className="ml-2">{formData.interview_date}</Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.entering_day')}:</strong>
                <Text className="ml-2">{formData.entering_day}</Text>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={24}>
              <div>
                <strong>{t('hr_recruitment_1_1.birth_date')}:</strong>
                <Text className="ml-2">{formData.birth_date}</Text>
              </div>
            </Col>
          </Row>

          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.id_number')}:</strong>
                <Text className="ml-2">{formData.id_number}</Text>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <strong>{t('hr_recruitment_1_1.id_issue_date')}:</strong>
                <Text className="ml-2">{formData.id_issue_date}</Text>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <strong>{t('hr_recruitment_1_1.ethnicity')}:</strong>
                <Text className="ml-2">{formData.ethnicity}</Text>
              </div>
            </Col>
          </Row>

          <Row gutter={16} className="mt-2">
            <Col span={24}>
              <div>
                <strong>{t('hr_recruitment_1_1.id_issue_place')}:</strong>
                <Text className="ml-2">{formData.id_issue_place}</Text>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.insurance_number')}:</strong>
                <Text className="ml-2">{formData.insurance_number}</Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.tax_number')}:</strong>
                <Text className="ml-2">{formData.tax_number}</Text>
              </div>
            </Col>
          </Row>
          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.phone_number')}:</strong>
                <Text className="ml-2">{formData.phone_number}</Text>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.email')}:</strong>
                <Text className="ml-2">{formData.email}</Text>
              </div>
            </Col>
          </Row>

          <Row gutter={16} className="mt-2">
            <Col span={12}>
              <div>
                <strong>{t('hr_recruitment_1_1.alternate_phone_number')}:</strong>
                <Text className="ml-2">{formData.alternate_phone_number}</Text>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <strong>{t('hr_recruitment_1_1.alternate_name')}:</strong>
                <Text className="ml-2">{formData.alternate_name}</Text>
              </div>
            </Col>
            <Col span={6}>
              <div>
                <strong>{t('hr_recruitment_1_1.alternate_relationship')}:</strong>
                <Text className="ml-2">{formData.alternate_relationship}</Text>
              </div>
            </Col>
          </Row>

          <h3 className=" mb-2 mt-2 italic">
          {t('hr_recruitment_1_1.title_note_1')}
          </h3>
          <Row gutter={16} className="mt-2">
            <Col span={8}>
              <div>
                <strong> {t('hr_recruitment_1_1.birth_province')}:</strong>
                <Text className="ml-2">{formData.birth_province}</Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <strong> {t('hr_recruitment_1_1.birth_district')}:</strong>
                <Text className="ml-2">{formData.birth_district}</Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <strong> {t('hr_recruitment_1_1.birth_ward')}:</strong>
                <Text className="ml-2">{formData.birth_ward}</Text>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <strong> {t('hr_recruitment_1_1.birth_address')}:</strong>
                <Text className="ml-2">{formData.birth_address}</Text>
              </div>
            </Col>
          </Row>

          <h3 className=" mb-2 mt-2 italic">   {t('hr_recruitment_1_1.title_note_2')}</h3>
          <Row gutter={16} className="mt-2">
            <Col span={8}>
              <div>
                <strong> {t('hr_recruitment_1_1.current_province')}:</strong>
                <Text className="ml-2">{formData.current_province}</Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <strong> {t('hr_recruitment_1_1.current_district')}:</strong>
                <Text className="ml-2">{formData.current_district}</Text>
              </div>
            </Col>
            <Col span={8}>
              <div>
                <strong> {t('hr_recruitment_1_1.current_ward')}:</strong>
                <Text className="ml-2">{formData.current_ward}</Text>
              </div>
            </Col>
            <Col span={24}>
              <div>
                <strong> {t('hr_recruitment_1_1.current_address')}:</strong>
                <Text className="ml-2">{formData.current_address}</Text>
              </div>
            </Col>
          </Row>

          <Divider orientation="left italic"> {t('hr_recruitment_1_1.title_note_3')}</Divider>

          <Table
            dataSource={formData.families}
            columns={familyColumns}
            pagination={false}
            rowKey="phone_number"
            size="small"
            bordered
          />

          <h2 className="mt-4 mb-2 font-semibold">{t('hr_recruitment_1_1.title_note_9')}</h2>

          <Table
            dataSource={formData.children}
            columns={childrenColumns}
            pagination={false}
            rowKey="phone_number"
            size="small"
            bordered
            className="mt-4"
          />

          <Divider orientation="left italic">{t('hr_recruitment_1_1.title_note_4')}</Divider>

          <h2 className="mt-4 mb-2 italic">{t('hr_recruitment_1_1.title_note_5')}</h2>
          <Table
            dataSource={formData.educations}
            columns={educationColumns}
            pagination={false}
            rowKey="school"
            size="small"
            bordered
          />

          <h2 className="mt-4 mb-2 italic">{t('hr_recruitment_1_1.title_note_6')}</h2>
          <Table
            dataSource={formData.languages}
            columns={languageColumns}
            pagination={false}
            rowKey="language"
            size="small"
            bordered
          />

          <h2 className="mt-4 mb-2 italic">{t('hr_recruitment_1_1.title_note_7')}</h2>
          <Row gutter={16}>
            {formData?.skills.map((skill) => (
              <Col span={12} key={skill.id} style={{ marginBottom: 16 }}>
                <Card>
                  <p><strong>{t('hr_recruitment_1_1.skill')}:</strong> {skill.skill}</p>
                  <p><strong>{t('hr_recruitment_1_1.level')}:</strong> {skill.level}</p>
                </Card>
              </Col>
            ))}
          </Row>
          <Divider orientation="left italic">{t('hr_recruitment_1_1.title_note_8')}</Divider>

          <Table
            dataSource={formData.experiences}
            columns={experienceColumns}
            pagination={false}
            rowKey="company_name"
            size="small"
            bordered
          />
        </div>
      )}
    </div>
  )
}

export default ViewDetailUserHrRecruitment
