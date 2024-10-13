import { useState } from 'react'
import {
  Input,
  DatePicker,
  InputNumber,
  Form,
  Button,
  Card,
  Row,
  Col,
  Drawer,
  Select,
} from 'antd'

const { Option } = Select

const EducationLanguageTable = ({
  isMobile,
  educationData,
  setEducationData,
  languageData,
  setLanguageData,
}) => {
  const [visible, setVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formType, setFormType] = useState('education')

  const [formValues, setFormValues] = useState({
    schoolName: '',
    major: '',
    years: '',
    startYear: '',
    endYear: '',
    grade: '',
    language: '',
    certificateType: '',
    score: '',
    level: '',
    startDate: null,
    endDate: null,
    note: '',
  })

  const showDrawer = (item, type) => {
    setVisible(true)
    setEditMode(!!item)
    setSelectedItem(item)
    setFormType(type)
    setFormValues({
      schoolName: item?.schoolName || '',
      major: item?.major || '',
      years: item?.years || '',
      startYear: item?.startYear || '',
      endYear: item?.endYear || '',
      grade: item?.grade || '',
      language: item?.language || '',
      certificateType: item?.certificateType || '',
      score: item?.score || '',
      level: item?.level || '',
      startDate: item?.startDate || null,
      endDate: item?.endDate || null,
      note: item?.note || '',
    })
  }

  const onClose = () => {
    setVisible(false)
    setEditMode(false)
    setSelectedItem(null)
  }

  const handleSubmit = () => {
    if (selectedItem) {
      if (formType === 'language') {
        setLanguageData((prev) =>
          prev.map((lang) =>
            lang.key === selectedItem.key ? { ...formValues } : lang,
          ),
        )
      } else {
        setEducationData((prev) =>
          prev.map((edu) =>
            edu.key === selectedItem.key ? { ...formValues } : edu,
          ),
        )
      }
    } else {
      const newKey =
        formType === 'language' ? languageData.length : educationData.length
      if (formType === 'language') {
        setLanguageData([...languageData, { key: newKey, ...formValues }])
      } else {
        setEducationData([...educationData, { key: newKey, ...formValues }])
      }
    }
    onClose()
  }

  return (
    <>
      <h2 className="text-base font-semibold mb-4 mt-4">Tình trạng học vấn</h2>
      <Row gutter={16}>
        {educationData.map((edu) => (
          <Col span={isMobile ? 24 : 24} key={edu.key}>
            <Card
              size="small"
              onClick={() => showDrawer(edu, 'education')}
              title={edu.schoolName || 'Trường học'}
              style={{ marginBottom: 16 }}
            >
              <p>
                <strong>Chuyên ngành:</strong> {edu.major || 'Chuyên ngành'}
              </p>
              <p>
                <strong>Số năm:</strong> {edu.years || 'Số năm'}
              </p>
              <p>
                <strong>Năm nhập học:</strong> {edu.startYear || 'Năm nhập học'}
              </p>
              <p>
                <strong>Năm tốt nghiệp:</strong>{' '}
                {edu.endYear || 'Năm tốt nghiệp'}
              </p>
              <p>
                <strong>Xếp loại:</strong> {edu.grade || 'Xếp loại'}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
      <Button
        type="dashed"
        onClick={() => showDrawer(null, 'education')}
        style={{ marginTop: 5 }}
      >
        Thêm hàng giáo dục
      </Button>

      <h2 className="text-xl font-semibold mb-4 mt-5">Ngoại ngữ</h2>
      <Row gutter={16}>
        {languageData.map((lang) => (
          <Col span={isMobile ? 24 : 24} key={lang.key}>
            <Card
              size="small"
              onClick={() => showDrawer(lang, 'language')}
              title={lang.language || 'Ngôn ngữ'}
              style={{ marginBottom: 16 }}
            >
              <p>
                <strong>Loại chứng nhận:</strong>{' '}
                {lang.certificateType || 'Loại chứng nhận'}
              </p>
              <p>
                <strong>Điểm số:</strong> {lang.score || 'Điểm số'}
              </p>
              <p>
                <strong>Cấp bậc:</strong> {lang.level || 'Cấp bậc'}
              </p>
              <p>
                <strong>Ngày bắt đầu:</strong>{' '}
                {lang.startDate
                  ? lang.startDate.format('YYYY-MM-DD')
                  : 'Ngày bắt đầu'}
              </p>
              <p>
                <strong>Ngày kết thúc:</strong>{' '}
                {lang.endDate
                  ? lang.endDate.format('YYYY-MM-DD')
                  : 'Ngày kết thúc'}
              </p>
              <p>
                <strong>Ghi chú:</strong> {lang.note || 'Ghi chú'}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      <Button
        type="dashed"
        onClick={() => showDrawer(null, 'language')}
        style={{ marginTop: 5 }}
      >
        Thêm ngoại ngữ
      </Button>

      <Drawer
        title={null}
        height={750}
        onClose={onClose}
        visible={visible}
        placement="bottom"
        closable={false}
        footer={
          <div className="flex items-center justify-between">
            <Button key="cancel" onClick={onClose} size="large">
              Thoát
            </Button>
            <Button
              key="submit"
              type="primary"
              size="large"
              className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
              onClick={handleSubmit}
            >
              {editMode ? 'Cập nhật' : 'Thêm'}
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          {formType === 'language' ? (
            <>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Ngôn ngữ">
                    <Select
                      value={formValues.language}
                      size="large"
                      onChange={(value) =>
                        setFormValues({ ...formValues, language: value })
                      }
                      placeholder="Chọn ngôn ngữ"
                    >
                      <Option value="Tiếng Hàn">Tiếng Hàn</Option>
                      <Option value="Tiếng Anh">Tiếng Anh</Option>
                      <Option value="Tiếng Nhật">Tiếng Nhật</Option>
                      <Option value="Tiếng Trung">Tiếng Trung</Option>
                      <Option value="Ngôn ngữ khác">Ngôn ngữ khác</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item label="Loại chứng nhận">
                    <Input
                      size="large"
                      value={formValues.certificateType}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          certificateType: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={12} sm={12}>
                  <Form.Item label="Điểm số">
                    <InputNumber
                      className="w-full"
                      size="large"
                      value={formValues.score}
                      onChange={(e) =>
                        setFormValues({ ...formValues, score: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={12} sm={12}>
                  <Form.Item label="Cấp bậc">
                    <Input
                      className="w-full"
                      size="large"
                      value={formValues.level}
                      onChange={(e) =>
                        setFormValues({ ...formValues, level: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={12} sm={12}>
                  <Form.Item label="Ngày bắt đầu">
                    <DatePicker
                      className="w-full"
                      size="large"
                      value={formValues.startDate}
                      onChange={(date) =>
                        setFormValues({ ...formValues, startDate: date })
                      }
                    />
                  </Form.Item>
                </Col>

                <Col xs={12} sm={12}>
                  <Form.Item label="Ngày kết thúc">
                    <DatePicker
                      className="w-full"
                      size="large"
                      value={formValues.endDate}
                      onChange={(date) =>
                        setFormValues({ ...formValues, endDate: date })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item label="Ghi chú">
                    <Input.TextArea
                      size="large"
                      value={formValues.note}
                      onChange={(e) =>
                        setFormValues({ ...formValues, note: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item label="Trường học">
                    <Input
                      size="large"
                      value={formValues.schoolName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          schoolName: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="Chuyên ngành">
                    <Input
                      size="large"
                      value={formValues.major}
                      onChange={(e) =>
                        setFormValues({ ...formValues, major: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={12} sm={12}>
                  <Form.Item label="Số năm">
                    <InputNumber
                      size="large"
                      className="w-full"
                      value={formValues.years}
                      onChange={(value) =>
                        setFormValues({ ...formValues, years: value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Item label="Năm nhập học">
                    <InputNumber
                      size="large"
                      className="w-full"
                      value={formValues.startYear}
                      onChange={(value) =>
                        setFormValues({ ...formValues, startYear: value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={12} sm={12}>
                  <Form.Item label="Năm tốt nghiệp">
                    <InputNumber
                      className="w-full"
                      size="large"
                      value={formValues.endYear}
                      onChange={(value) =>
                        setFormValues({ ...formValues, endYear: value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={12} sm={12}>
                  <Form.Item label="Xếp loại">
                    <Input
                      size="large"
                      value={formValues.grade}
                      onChange={(e) =>
                        setFormValues({ ...formValues, grade: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </Drawer>
    </>
  )
}

export default EducationLanguageTable
