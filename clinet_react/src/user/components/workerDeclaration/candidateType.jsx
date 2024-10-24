import { Form, Radio, Row, Col, Input } from 'antd'
import { useTranslation } from 'react-i18next';
const CandidateType = ({ handleCheckboxChange, isSupplier }) => {
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{ t('hr_recruitment_1_1.title_note_16') }</h2>
      <Form.Item name="candidateType">
        <Radio.Group onChange={handleCheckboxChange} className="w-full">
          <Row gutter={16}>
            <Col span={12}>
              <Radio value="ITM">{ t('hr_recruitment_1_1.itm_candidate_type') }</Radio>
            </Col>
            <Col span={12}>
              <Radio value="Supplier">{ t('hr_recruitment_1_1.itm_candidate_type_2') }</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>

      {isSupplier && (
        <Form.Item
          label={ t('hr_recruitment_1_1.label_candidate_type') }
          name="supplierDetails"
        >
          <Input.TextArea
            placeholder={ t('hr_recruitment_1_1.note_candidate_type') }
            rows={4}
          />
        </Form.Item>
      )}
    </div>
  )
}

export default CandidateType
