import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Row, Col, Typography, Button, Form, Input, Radio, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../../static/css/scroll_container.css'
import ViewDetailUserHrRecruitment from '../components/candidateForm/viewDetailUserHrRecruitment'
import { GetHrInfoId } from '../../features/hrRecruitment/getPersonnelId'
import NoData from './noData'
import Spinner from './load'
import { PutHrInfoId } from '../../features/hrRecruitment/updateHrInfoId'
import { PutUserInterview } from '../../features/hrRecruitment/putUserInterview'
const { Text } = Typography

export default function DetailUserHrInterview() {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [interviewData, setInterviewData] = useState({})
  const [form] = Form.useForm()
  const [formInterview] = Form.useForm()

  const fetchDataUserId = async () => {
    setLoading(true)
    try {
      const response = await GetHrInfoId(id)
      if (response.success) {
        if (response.data.status) {
          setFormData(response.data.data)
          setError(null)
          if (
            response.data.data.interviews &&
            response.data.data.interviews.length > 0
          ) {
            setInterviewData(response.data.data.interviews[0])
          } else {
            setInterviewData({})
          }
        } else {
          setError('Không có dữ liệu cho ID này.')
          setFormData({})
        }
      } else {
        setError('Dữ liệu không khả dụng.')
        setFormData({})
      }
    } catch (error) {
      setError(error.message || 'Đã xảy ra lỗi')
      setFormData({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchDataUserId()
    }
  }, [id])

  const handleNavigateToBack = () => {
    navigate(`/u/action=17/employee-recruitment-data`)
  }

  const handleFormChange = (changedValues) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...changedValues,
    }))
  }

  const toggleEdit = () => {
    setIsEditing(true)
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <NoData />
  }

  const filterEmptyFields = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== '' && value !== undefined && value !== null,
      ),
    )
  }
  const handleFormInterViewChange = (changedValues) => {
    setInterviewData((prev) => ({
      ...prev,
      ...changedValues,
    }))
  }

  const handleSubmit = async (values) => {
    try {
      const response = await PutUserInterview(interviewData?.key, values)
      if (response.success) {
        message.success('Cập nhật thành công!')
      } else {
        message.error(`Cập nhật thất bại: ${response.message}`)
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi trong quá trình cập nhật.')
    }
  }
  const formatSubmissionData = (finalData) => {
    const result = {
      full_name: finalData?.full_name,
      gender: finalData?.gender,
      interview_date: finalData?.interview_date,
      birth_date: finalData?.birth_date,
      id_number: finalData?.id_number,
      id_issue_date: finalData?.id_issue_date,
      ethnicity: finalData?.ethnicity,
      phone_number: finalData?.phone_number,
      alternate_phone_number: finalData?.alternate_phone_number,
      alternate_name: finalData?.alternate_name,
      alternate_relationship: finalData?.alternate_relationship,
      birth_address: finalData?.birth_address,
      birth_province: finalData?.birth_province,
      birth_district: finalData?.birth_district,
      birth_ward: finalData?.birth_ward,
      current_address: finalData?.current_address,
      current_province: finalData?.current_province,
      current_district: finalData?.current_district,
      current_ward: finalData?.current_ward,
      type_personnel: true,
      supplier_details: finalData?.supplierDetails,
      candidate_type: finalData?.candidateType,
      status_form: true,

      families:
        finalData?.families?.map((family) => ({
          id: family.key,
          relationship: family?.relationship,
          full_name: family?.full_name || null,
          birth_year: family?.birth_year,
          workplace: family?.workplace,
          job: family?.job,
          phone_number: family?.phone_number,
          living_together: family?.living_together,
        })) || [],
      educations:
        finalData?.education?.map((education) => ({
          id: education.key,
          school: education?.school || null,
          major: education?.major,
          years: education?.years,
          start_year: education?.start_year,
          graduation_year: education?.graduation_year,
          grade: education?.grade,
        })) || [],
      languages:
        finalData?.languages?.map((language) => ({
          id: language.key,
          language: language?.language,
          certificate_type: language?.certificate_type,
          score: language?.score,
          level: language.level,
          start_date: language.start_date,
          end_date: language.end_date,
          has_bonus: language.has_bonus,
        })) || [],
      experiences:
        finalData?.workExperiences?.map((experience) =>
          filterEmptyFields({
            id: experience.key,
            company_name: experience?.company_name || 'null',
            position: experience.position,
            start_date: experience.start_date,
            end_date: experience.end_date,
            employee_scale: experience.employee_scale,
            tasks: experience.tasks,
            salary: experience.salary,
            description: experience.description,
          }),
        ) || [],
      projects: [],
      office_skills: [],
    }

    return filterEmptyFields(result)
  }

  const handleFinish = async (values) => {
    const submissionData = formatSubmissionData(values)

    try {
      const response = await PutHrInfoId(id, submissionData)
      if (response.success) {
        message.success('Cập nhật thành công!')
      } else {
        message.error(`Cập nhật thất bại: ${response.message}`)
      }
    } catch (error) {
      message.error('Đã xảy ra lỗi trong quá trình cập nhật.')
    }
  }
  const handleSave = () => {
    form.submit()
    formInterview.submit()
  }
  return (
    <div className="w-full h-screen bg-gray-50 p-3">
      <Helmet>
        <title>ITM - {t('Công nhân')}</title>
      </Helmet>

      <nav
        aria-label="Breadcrumb"
        className="flex justify-between items-center mb-6"
      >
        <ol className="flex items-center gap-4 text-sm text-gray-700">
          <li onClick={handleNavigateToBack} className="cursor-pointer">
            <span className=" text-black opacity-80">Trở lại</span>
          </li>
        </ol>
        <ol className=" flex items-center gap-2">
          <Button className="bg-white">Export PDF</Button>
          <Button className="bg-white">Xóa</Button>
          <Button className="bg-white" onClick={toggleEdit}>
            Chỉnh sửa
          </Button>
          <Button className="bg-white" onClick={handleSave}>
            Lưu
          </Button>
        </ol>
      </nav>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={14}>
          <div className="border background bg-white rounded-lg p-6 h-screen overflow-auto scroll-container cursor-pointer">
            <ViewDetailUserHrRecruitment
              setIsEditing={setIsEditing}
              setFormData={setFormData}
              formData={formData}
              isEditing={isEditing}
              toggleEdit={toggleEdit}
              form={form}
              handleFinish={handleFinish}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={10}>
          <div className="border bg-white rounded-lg p-6 mb-3 h-screen overflow-auto scroll-container cursor-pointer">
            <h1 className="text-xl font-bold text-center mb-4">
              Kết quả phỏng vấn
            </h1>
            <Form
              form={formInterview}
              layout="vertical"
              initialValues={interviewData}
              onFinish={handleSubmit}
              onValuesChange={handleFormInterViewChange}
            >
              <Row gutter={16}>
                <Col span={24}>
                  <h3 className="font-semibold">Kết quả phỏng vấn</h3>
                  <Form.Item name="interview_result">
                    <Radio.Group>
                      <Radio value={true}>ĐẠT</Radio>
                      <Radio value={false}>KHÔNG ĐẠT</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Bộ phận ứng tuyển"
                    name="recruitment_department"
                  >
                    <Input size="large" placeholder="Bộ phận ứng tuyển" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Chức vụ" name="position">
                    <Input size="large" placeholder="Chức vụ" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Tên người phỏng vấn"
                    name="interviewer_name"
                  >
                    <Input size="large" placeholder="Tên người phỏng vấn" />
                  </Form.Item>
                </Col>
              </Row>
              <h3 className="font-semibold">Tiêu chuẩn lao động</h3>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item label="Ngoại hình" name="appearance_criteria">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Chiều cao" name="height">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Tiền án" name="criminal_record">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
              <h3 className="font-semibold">Học vấn</h3>
              <Row gutter={16}>
                <Col span={16}>
                  <Form.Item label="Trình độ" name="education_level">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Biết đọc, biết viết" name="reading_writing">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Khả năng tính toán"
                    name="calculation_ability"
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  )
}
