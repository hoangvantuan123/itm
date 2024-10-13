import { useEffect } from 'react'
import { Form, Input, InputNumber, Row, Col, DatePicker, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

const PersonalInformation = ({ form, formData }) => {
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
      })
    }
  }, [formData, form])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thông tin nhân sự</h2>

      <Row gutter={16}>
        <Col xs={24} sm={20} md={20}>
          <Form.Item
            label="Họ tên ứng viên:"
            name="full_name"
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
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Form.Item label="Ngày phỏng vấn:" name="interview_date">
            <DatePicker
              size="large"
              style={{ width: '100%' }}
              placeholder="Chọn ngày phỏng vấn"
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={12} md={12}>
          <Form.Item label="Ngày vào:" name="entering_day">
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
            label="Số CMND:"
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
          <Form.Item label="Ngày cấp:" name="id_issue_date">
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
          <Form.Item label="Nơi cấp:" name="id_issue_place">
            <Input size="large" placeholder="Nhập nơi cấp" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label="Số sổ bảo hiểm (nếu có):" name="insurance_number">
            <Input size="large" placeholder="Nhập số bảo hiểm" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item label="Mã số thuế cá nhân:" name="tax_number">
            <Input size="large" placeholder="Nhập mã số thuế" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Form.Item
            label="Số điện thoại liên hệ:"
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

      <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ khẩn cấp</h2>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Số điện thoại liên hệ khi cần thiết:"
            name="alternate_phone_number"
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
            name="alternate_name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input size="large" placeholder="Nhập tên người liên hệ" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Quan hệ:"
            name="alternate_relationship"
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
            name="birth_province"
            rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
          >
            <Input size="large" placeholder="Nhập tỉnh" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Quận/Huyện:"
            name="birth_district"
            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
          >
            <Input size="large" placeholder="Nhập quận/huyện" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Xã/Phường:"
            name="birth_ward"
            rules={[{ required: true, message: 'Vui lòng nhập xã/phường!' }]}
          >
            <Input size="large" placeholder="Nhập xã/phường" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Địa chỉ:"
            name="birth_address"
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
            name="current_province"
            rules={[{ required: true, message: 'Vui lòng nhập tỉnh!' }]}
          >
            <Input size="large" placeholder="Nhập tỉnh" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Quận/Huyện:"
            name="current_district"
            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
          >
            <Input size="large" placeholder="Nhập quận/huyện" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Form.Item
            label="Xã/Phường:"
            name="current_ward"
            rules={[{ required: true, message: 'Vui lòng nhập xã/phường!' }]}
          >
            <Input size="large" placeholder="Nhập xã/phường" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Số nhà/Đường/Thôn/Xóm:"
            name="current_address"
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
