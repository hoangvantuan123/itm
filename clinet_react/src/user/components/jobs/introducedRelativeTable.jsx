import { Form, Input, Row, Col } from 'antd'

const IntroducedRelativeTable = ({ form }) => {
  return (
    <div>
      <h3 className="text-base font-semibold mb-4">
        Có hay không người quen giới thiệu
      </h3>
      <Row gutter={16} style={{ marginBottom: '10px' }}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Họ tên người giới thiệu (Tên người giới thiệu)"
            name={['introducer', 'introducerName']} // Nested field for better structure
          >
            <Input size="large" placeholder="Nhập họ tên" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Bộ phận (Phòng ban)"
            name={['introducer', 'department']}
          >
            <Input size="large" placeholder="Nhập bộ phận" />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Form.Item label="Số điện thoại" name={['introducer', 'phoneNumber']}>
            <Input size="large" placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default IntroducedRelativeTable
