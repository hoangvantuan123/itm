import { Form, Input, Row, Col } from 'antd'

const ApplicationInformation = ({ form }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thông tin ứng tuyển</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="응시부문 (Bộ phận ứng tuyển):"
            name={['applicationInformation', 'applicationDepartment']}
            rules={[
              { required: true, message: 'Vui lòng nhập bộ phận ứng tuyển!' },
            ]}
          >
            <Input size="large" placeholder="Nhập bộ phận ứng tuyển" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Vị trí ứng tuyển:"
            name={['applicationInformation', 'positionApplied']}
            rules={[
              { required: true, message: 'Vui lòng nhập vị trí ứng tuyển!' },
            ]}
          >
            <Input size="large" placeholder="Nhập vị trí ứng tuyển" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Chức vụ:"
            name={['applicationInformation', 'jobTitle']}
          >
            <Input size="large" placeholder="Nhập chức vụ" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Phân loại nhân viên:"
            name={['applicationInformation', 'userClassification']}
          >
            <Input size="large" placeholder="Nhập phân loại" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Mức lương CB mong muốn:"
            name={['applicationInformation', 'desiredSalaryBasic']}
          >
            <Input size="large" placeholder="Nhập mức lương CB mong muốn" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Mức lương tổng mong muốn:"
            name={['applicationInformation', 'desiredSalaryTotal']}
          >
            <Input size="large" placeholder="Nhập mức lương tổng mong muốn" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default ApplicationInformation
