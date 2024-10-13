import { Form, Input, InputNumber, Row, Col, DatePicker, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

const PersonalInformation = ({ form }) => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={20} md={20}>
          <Form.Item
            label="Họ tên ứng viên:"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input size="large" placeholder="Nhập họ tên" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={4} md={4}>
          <Form.Item
            label="Giới tính:"
            name="gender"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
          >
            <Select size="large" placeholder="Chọn giới tính">
              <Option value="Male">Nam</Option>
              <Option value="Female">Nữ</Option>
              <Option value="Other">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Form.Item
            label="Ngày phỏng vấn:"
            name="interviewDate"
            rules={[
              { required: true, message: 'Vui lòng nhập ngày phỏng vấn!' },
            ]}
          >
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày phỏng vấn"
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Form.Item label="Ngày vào:" name="startDate">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày vào"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Ngày tháng năm sinh:"
            name="dob"
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
            label="Số CMND:"
            name="idNumber"
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
          <Form.Item label="Ngày cấp:" name="issuedDate">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày cấp"
            />
          </Form.Item>
        </Col>
        <Col xs={10} sm={12} md={8}>
          <Form.Item label="Dân tộc:" name="ethnicity">
            <Input size="large" placeholder="Nhập dân tộc" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item label="Nơi cấp:" name="issuedPlace">
            <Input size="large" placeholder="Nhập nơi cấp" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label="Số sổ bảo hiểm (nếu có):" name="insuranceNumber">
            <Input size="large" placeholder="Nhập số bảo hiểm" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label="Mã số thuế cá nhân:" name="taxCode">
            <Input size="large" placeholder="Nhập mã số thuế" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Số điện thoại liên hệ:"
            name="phone"
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

      <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ khẩn cấp</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Số điện thoại liên hệ khi cần thiết:"
            name="emergencyPhone"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại khẩn cấp!',
              },
            ]}
          >
            <Input size="large" placeholder="Nhập số điện thoại khẩn cấp" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Tên:"
            name="emergencyContactName"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input size="large" placeholder="Nhập tên người liên hệ" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Quan hệ:"
            name="emergencyContactRelation"
            rules={[{ required: true, message: 'Vui lòng nhập quan hệ!' }]}
          >
            <Input size="large" placeholder="Nhập quan hệ" />
          </Form.Item>
        </Col>
      </Row>

      <h2 className="text-xl font-semibold mb-4">Địa chỉ</h2>
      <h3 className=" italic mb-2">
        Địa chỉ đăng ký giấy khai sinh (hoặc nguyên quán hoặc HKTT hoặc tạm trú)
      </h3>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Tỉnh:"
            name="birthProvince"
            rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
          >
            <Input size="large" placeholder="Nhập tỉnh" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Quận/Huyện:"
            name="birthDistrict"
            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
          >
            <Input size="large" placeholder="Nhập quận/huyện" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Xã/Phường:"
            name="birthCommune"
            rules={[{ required: true, message: 'Vui lòng nhập xã/phường!' }]}
          >
            <Input size="large" placeholder="Nhập xã/phường" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Địa chỉ:"
            name="birthAddress"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input size="large" placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Col>
      </Row>

      <h3 className=" italic mb-2">Địa chỉ nơi ở hiện tại</h3>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Tỉnh:"
            name="currentProvince"
            rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
          >
            <Input size="large" placeholder="Nhập tỉnh" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Quận/Huyện:"
            name="currentDistrict"
            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
          >
            <Input size="large" placeholder="Nhập quận/huyện" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Xã/Phường:"
            name="currentCommune"
            rules={[{ required: true, message: 'Vui lòng nhập xã/phường!' }]}
          >
            <Input size="large" placeholder="Nhập xã/phường" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Số nhà/Đường/Thôn/Xóm:"
            name="currentAddress"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input size="large" placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalInformation
