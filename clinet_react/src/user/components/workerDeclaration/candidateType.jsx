import { Form, Radio, Row, Col, Input } from 'antd'

const CandidateType = ({ handleCheckboxChange, isSupplier }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Đối tượng ứng viên</h2>
      <Form.Item name="candidateType">
        <Radio.Group onChange={handleCheckboxChange} className="w-full">
          <Row gutter={16}>
            <Col span={12}>
              <Radio value="ITM">ITM liên hệ</Radio>
            </Col>
            <Col span={12}>
              <Radio value="Supplier">Nhà cung cấp</Radio>
            </Col>
          </Row>
        </Radio.Group>
      </Form.Item>

      {isSupplier && (
        <Form.Item
          label="Vui lòng cung cấp thông tin chi tiết:"
          name="supplierDetails"
        >
          <Input.TextArea
            placeholder="Nhập thông tin chi tiết về Nhà cung cấp"
            rows={4}
          />
        </Form.Item>
      )}
    </div>
  )
}

export default CandidateType
