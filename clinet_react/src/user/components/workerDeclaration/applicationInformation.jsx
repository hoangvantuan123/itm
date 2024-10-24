import { Form, Input, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next';
const ApplicationInformation = ({ form }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">  {t('hr_recruitment_1_1.title_note_15')}</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={t('hr_recruitment_1_1.application_information')}
            name={['applicationInformation', 'applicationDepartment']}
            rules={[
              { required: true, message: t('hr_recruitment_1_1.rules_application_information') },
            ]}
          >
            <Input size="large" placeholder={t('hr_recruitment_1_1.title_note_15')} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={ t('hr_recruitment_1_1.position_applied') }
            name={['applicationInformation', 'positionApplied']}
            rules={[
              { required: true, message: t('hr_recruitment_1_1.rules_position_applied')  },
            ]}
          >
            <Input size="large" placeholder={ t('hr_recruitment_1_1.note_position_applied') } />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={ t('hr_recruitment_1_1.job_title') }
            name={['applicationInformation', 'jobTitle']}
          >
            <Input size="large" placeholder={ t('hr_recruitment_1_1.note_job_title') } />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={ t('hr_recruitment_1_1.user_classification') }
            name={['applicationInformation', 'userClassification']}
          >
            <Input size="large" placeholder={ t('hr_recruitment_1_1.note_user_classification') } />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={ t('hr_recruitment_1_1.desired_salary_basic') }
            name={['applicationInformation', 'desiredSalaryBasic']}
          >
            <Input size="large" placeholder={ t('hr_recruitment_1_1.note_desired_salary_basic') }/>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label={ t('hr_recruitment_1_1.desired_salary_total') }
            name={['applicationInformation', 'desiredSalaryTotal']}
          >
            <Input size="large" placeholder={ t('hr_recruitment_1_1.note_desired_salary_total') } />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default ApplicationInformation
