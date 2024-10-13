import { useState, useCallback, useEffect } from 'react'
import { Form, Button, message, Drawer, Spin, Divider } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

import FamilyInfoTable from '../components/workerDeclaration/familyInfoTable'
import EducationLanguageTable from '../components/workerDeclaration/educationLanguageTable'
import WorkExperienceTable from '../components/workerDeclaration/workExperienceTable'
import PersonalInformation from '../components/workerDeclaration/personalInformation'
import CandidateType from '../components/workerDeclaration/candidateType'
import { PostPublicHrRecryutment } from '../../features/hrRecruitment/postPublicHrRecruitment'
import { PutUserInterview } from '../../features/hrRecruitment/putUserInterview'
import { GetHrInfoId } from '../../features/hrRecruitment/getPersonnelId'
import { PutHrInfoId } from '../../features/hrRecruitment/updateHrInfoId'
import LanguageTable from '../components/workerDeclaration/LanguageTable'
import SkillTable from '../components/workerDeclaration/skillTable'
import Logo from '../../assets/ItmLogo.png'
const WorkerDeclarationMultiStepForm = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [isSupplier, setIsSupplier] = useState(false)
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState([])

  const [loading, setLoading] = useState(true)
  const [interviewData, setInterviewData] = useState({})
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [decodedData, setDecodedData] = useState(null)
  const [error, setError] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const encodedData = path.split('/').pop()
    if (encodedData !== 'new') {
      const decodedString = atob(encodedData)
      const parsedData = decodedString.includes(':')
        ? decodedString.split(':')
        : JSON.parse(decodedString)
      if (Array.isArray(parsedData)) {
        setDecodedData({
          id: Number(parsedData[0]),
          phoneNumber: parsedData[1],
          fullName: parsedData[2],
          email: parsedData[3],
        })
      }
    }
  }, [location])
  const fetchDataUserId = async () => {
    setLoading(true)
    try {
      const response = await GetHrInfoId(decodedData?.id)
      if (response?.success) {
        if (response?.data.status) {
          setFormData(response?.data.data)
          setError(null)
          if (
            response?.data.data.interviews &&
            response?.data.data.interviews.length > 0
          ) {
            setInterviewData(response?.data.data.interviews[0])
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
    if (decodedData) {
      fetchDataUserId()
    }
  }, [decodedData])

  const handleCheckboxChange = useCallback((event) => {
    setIsSupplier(event.target.value === 'Supplier')
  }, [])

  const validateCurrentStep = async () => {
    try {
      await form.validateFields()
      return true
    } catch (errorInfo) {
      message.error('Vui lòng điền vào tất cả các trường bắt buộc!')
      return false
    }
  }

  const filterEmptyFields = (data) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== '' && value !== undefined && value !== null,
      ),
    )
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
      supplier_details: finalData?.supplierDetails,
      candidate_type: finalData?.candidateType,
      entering_day: finalData?.entering_day,
      email: finalData?.email,
      insurance_number: finalData?.insurance_number,
      tax_number: finalData?.tax_number,
      status_form: true,
      /* Gia đình cha mẹ vợ */
      father_name: finalData?.families[0].full_name,
      father_phone_number: finalData?.families[0].phone_number,
      mother_name: finalData?.families[1].full_name,
      mother_phone_number: finalData?.families[1].phone_number,
      partner_name: finalData?.families[2].full_name,
      partner_phone_number: finalData?.families[2].phone_number,
      /* Con cais */
      children_name_1: finalData?.children[0].children_name,
      children_birth_date_1: finalData?.children[0].children_birth_date,
      children_gender_1: finalData?.children[0].children_gender,
      /*  */
      children_name_2: finalData?.children[1].children_name,
      children_birth_date_2: finalData?.children[1].children_birth_date,
      children_gender_2: finalData?.children[1].children_gender,
      /*  */
      children_name_3: finalData?.children[2].children_name,
      children_birth_date_3: finalData?.children[2].children_birth_date,
      children_gender_3: finalData?.children[2].children_gender,

      /* CÔng việc */

      work_department_1: finalData?.experiences[0].tasks,
      work_responsibility_1: finalData?.experiences[0].position,
      company_name_1: finalData?.experiences[0].company_name,
      entrance_day_1: finalData?.experiences[0].start_date,
      leaving_day_1: finalData?.experiences[0].end_date,
      salary_1: finalData?.experiences[0].salary,

      work_department_2: finalData?.experiences[1].tasks,
      work_responsibility_2: finalData?.experiences[1].position,
      company_name_2: finalData?.experiences[1].company_name,
      entrance_day_2: finalData?.experiences[1].start_date,
      leaving_day_2: finalData?.experiences[1].end_date,
      salary_2: finalData?.experiences[1].salary,

      /*  */
      highest_education_level: finalData?.educations[0].highest_education_level,
      school_name: finalData?.educations[0].school,
      major: finalData?.educations[0].major,
      school_year: finalData?.educations[0].school_year,
      year_ended: finalData?.educations[0].year_ended,
      year_of_graduation: finalData?.educations[0].year_of_graduation,
      classification: finalData?.educations[0].classification,

      /* languages */
      language_1: finalData?.languages[0].language,
      certificate_type_1: finalData?.languages[0].certificate_type,
      score_1: finalData?.languages[0].score,
      level_1: finalData?.languages[0].level,

      language_2: finalData?.languages[1].language,
      certificate_type_2: finalData?.languages[1].certificate_type,
      score_2: finalData?.languages[1].score,
      level_2: finalData?.languages[1].level,

      language_3: finalData?.languages[2].language,
      certificate_type_3: finalData?.languages[2].certificate_type,
      score_3: finalData?.languages[2].score,
      level_3: finalData?.languages[2].level,


      office_skill_excel: finalData?.skills[0].level,
      office_skill_word: finalData?.skills[1].level,
      office_skill_powerpoint: finalData?.skills[2].level,
      software_skill_autocad: finalData?.skills[3].level,
      software_skill_solidworks: finalData?.skills[4].level,
      software_skill_erp: finalData?.skills[5].level,
      software_skill_mes: finalData?.skills[6].level,
    }

    return filterEmptyFields(result)
  }

  const handleSubmit = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      setIsDrawerVisible(true)
    }
  }
  const handleDrawerSubmit = async () => {
    setIsSubmitting(true)
    const finalData = { ...formData, ...form.getFieldsValue() }
    const submissionData = formatSubmissionData(finalData)
    try {
      let response

      if (decodedData) {
        response = await PutHrInfoId(decodedData?.id, submissionData)
      } else {
        response = await PostPublicHrRecryutment(submissionData)
      }
      if (response.success) {
        navigate('/public/apply/thong-bao')
      } else {
        message.error('Có lỗi xảy ra khi gửi thông tin!')
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!')
    } finally {
      setIsSubmitting(false)
      setIsDrawerVisible(false)
    }
  }

  const steps = [
    {
      title: 'Thông Tin Cá Nhân',
      content: (
        <>
          <PersonalInformation form={form} formData={formData} />
          <Divider orientation="left italic">Thông tin gia đình</Divider>
          <FamilyInfoTable
            form={form}
            formData={formData}
            dataSource={formData.families}
            children={formData.children}
          />
          <Divider orientation="left italic">Tình trạng học vấn</Divider>
          <EducationLanguageTable
            form={form}
            dataSource={formData.educations}
          />
          <h2 className="mt-4 mb-2 italic">Ngôn ngữ</h2>
          <LanguageTable form={form} dataSource={formData?.languages} />
          <h2 className="mt-4 mb-2 italic">Kỹ năng</h2>
          <SkillTable form={form} dataSource={formData?.skills} />
          <Divider orientation="left italic">Kinh nghiệm làm việc</Divider>
          <WorkExperienceTable form={form} dataSource={formData.experiences} />
        </>
      ),
    },
  ]

  return (
    <div className="flex items-center justify-center h-screen overflow-auto p-3">
      <div className="lg:max-w-5xl w-full h-screen">
        <div className=" flex flex-col ">
          <div className=" flex items-start mt-2">
            <img
              src={Logo}
              alt="Description of image"
              className="  w-64 h-auto   m-0    rounded-lg"
            />
          </div>
          <div>

            <h1 className="text-xl font-bold text-center mt-9 ">
              TỜ KHAI ỨNG VIÊN
            </h1>
            <p className="text-center mb-4">Mẫu tờ khai thông tin cá nhân online</p>
          </div>

        </div>
        <Form form={form} layout="vertical" className="pb-10">
          {steps[currentStep].content}
          <Form.Item className="mt-4">
            <Button
              className=" w-full bg border py-6 border-indigo-600 bg-indigo-600 text-white"
              onClick={handleSubmit}
              size="large"
              loading={isSubmitting}
            >
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>

        {/* Drawer xác nhận */}
        <Drawer
          placement="bottom"
          onClose={() => setIsDrawerVisible(false)}
          visible={isDrawerVisible}
          height="80%"
          closable={false}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center h-full">
              <Spin tip="Đang gửi thông tin..." />
            </div>
          ) : (
            <div className="flex flex-col  items-center justify-between h-full pt-10">
              <div className=" flex flex-col  items-center justify-center">
                <svg
                  className="w-36 h-auto mb-4"
                  viewBox="0 0 299 316"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.77309 29.8222C0.448836 15.2442 11.7116 2.04346 26.4737 2.04346L153.673 2.04346C165.469 2.04346 175.516 10.6157 177.373 22.2647L219.526 286.65C221.85 301.228 210.587 314.428 195.825 314.428H68.6261C56.83 314.428 46.7828 305.856 44.9255 294.207L2.77309 29.8222Z"
                    fill="#10B981"
                  />
                  <path
                    d="M44.9255 294.207L43.4442 294.443L44.9255 294.207ZM219.526 286.65L221.007 286.414L219.526 286.65ZM26.4737 3.54346L153.673 3.54346V0.543457L26.4737 0.543457V3.54346ZM175.892 22.5009L218.044 286.886L221.007 286.414L178.855 22.0286L175.892 22.5009ZM195.825 312.928H68.6261V315.928H195.825V312.928ZM46.4068 293.971L4.25438 29.5861L1.2918 30.0584L43.4442 294.443L46.4068 293.971ZM68.6261 312.928C57.5673 312.928 48.148 304.892 46.4068 293.971L43.4442 294.443C45.4175 306.82 56.0928 315.928 68.6261 315.928V312.928ZM218.044 286.886C220.223 300.553 209.665 312.928 195.825 312.928V315.928C211.51 315.928 223.476 301.903 221.007 286.414L218.044 286.886ZM153.673 3.54346C164.731 3.54346 174.151 11.58 175.892 22.5009L178.855 22.0286C176.881 9.65152 166.206 0.543457 153.673 0.543457V3.54346ZM26.4737 0.543457C10.789 0.543457 -1.17772 14.5692 1.2918 30.0584L4.25438 29.5861C2.07539 15.9191 12.6342 3.54346 26.4737 3.54346V0.543457Z"
                    fill="black"
                  />
                  <path
                    d="M109.182 26.6077L117.122 26.6077"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M55.3716 26.6077H96.5376"
                    stroke="black"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23.0278 50.1284H198.833L234.42 273.16H58.6145L23.0278 50.1284Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M144.151 82.3105L51.6827 82.3105L49.7056 70.8633L141.946 70.8633L144.151 82.3105Z"
                    fill="#10B981"
                  />
                  <path
                    d="M184.42 107.826L91.9522 107.826L89.9751 96.3791L182.215 96.3791L184.42 107.826Z"
                    fill="#10B981"
                  />
                  <path
                    d="M144.151 82.3105L51.6827 82.3105L49.7056 70.8633L141.946 70.8633L144.151 82.3105Z"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M184.42 107.826L91.9522 107.826L89.9751 96.3791L182.215 96.3791L184.42 107.826Z"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    d="M206.236 251.288L113.768 251.288L111.79 239.84L204.03 239.84L206.236 251.288Z"
                    fill="#10B981"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M266.222 96.5551C266.224 96.5555 266.225 96.5546 266.226 96.5532C268.637 87.5842 268.334 78.1017 265.356 69.3046C264.363 66.3695 263.086 63.5547 261.553 60.8964C261.548 60.8874 261.551 60.8759 261.56 60.8707C261.569 60.8654 261.572 60.8539 261.567 60.8449C256.916 52.8126 249.989 46.3384 241.66 42.2403C239.326 41.0916 236.911 40.144 234.441 39.4018C231.056 38.3803 227.549 37.7392 223.985 37.5025C214.724 36.8874 205.488 39.0304 197.444 43.6607C197.435 43.6662 197.431 43.6785 197.437 43.6881C197.443 43.6977 197.439 43.71 197.43 43.7155C194.772 45.2511 192.259 47.0508 189.931 49.0962C182.953 55.2258 177.95 63.2865 175.554 72.2592C175.553 72.2608 175.554 72.2624 175.556 72.2629C175.557 72.2633 175.558 72.2649 175.558 72.2665L161.776 123.7C160.431 128.721 163.411 133.882 168.431 135.227C173.452 136.572 178.613 133.593 179.958 128.572L193.739 77.1399C193.742 77.1288 193.754 77.1221 193.765 77.1251C193.776 77.1281 193.788 77.1215 193.791 77.1103C195.226 71.7505 198.217 66.9357 202.386 63.2734C206.56 59.6065 211.727 57.2597 217.235 56.5297C221.198 56.0045 225.208 56.3332 229.003 57.4725C232.238 58.4505 235.286 60.0093 237.993 62.0901C242.398 65.4762 245.7 70.0924 247.481 75.3551C249.261 80.611 249.443 86.276 248.007 91.6353C248.003 91.6466 248.01 91.6583 248.021 91.6613C248.033 91.6644 248.039 91.676 248.036 91.6873L234.256 143.118C232.91 148.139 235.89 153.3 240.911 154.645C245.931 155.991 251.092 153.011 252.437 147.99L266.219 96.557C266.219 96.5555 266.221 96.5547 266.222 96.5551Z"
                    fill="#10B981"
                  />
                  <path
                    d="M265.356 69.3046L263.935 69.7855L265.356 69.3046ZM241.66 42.2403L242.323 40.8944L241.66 42.2403ZM234.441 39.4018L234.007 40.8379L234.009 40.8384L234.441 39.4018ZM223.985 37.5025L223.886 38.9992L223.985 37.5025ZM189.931 49.0962L188.941 47.9693L189.931 49.0962ZM202.386 63.2734L203.376 64.4003L202.386 63.2734ZM217.235 56.5297L217.432 58.0167L217.235 56.5297ZM229.003 57.4725L229.437 56.0367L229.434 56.0358L229.003 57.4725ZM237.993 62.0901L237.079 63.2793L237.993 62.0901ZM247.481 75.3551L246.061 75.836L247.481 75.3551ZM234.256 143.118L235.704 143.507L234.256 143.118ZM248.036 91.6873L246.588 91.299L248.036 91.6873ZM248.007 91.6353L246.558 91.2469L248.007 91.6353ZM193.791 77.1103L192.342 76.7222L193.791 77.1103ZM175.554 72.2592L174.105 71.8722L175.554 72.2592ZM197.43 43.7155L196.679 42.4167L197.43 43.7155ZM193.739 77.1399L195.188 77.5281L193.739 77.1399ZM261.567 60.8449L260.269 61.5965L261.567 60.8449ZM197.444 43.6607L198.193 44.9607L197.444 43.6607ZM266.219 96.557L264.77 96.1687L266.219 96.557ZM261.553 60.8964L262.852 60.1469L261.553 60.8964ZM252.437 147.99L253.886 148.378L252.437 147.99ZM266.226 96.5532L267.674 96.9426L266.226 96.5532ZM263.935 69.7855C266.818 78.3017 267.111 87.4813 264.777 96.1638L267.674 96.9426C270.162 87.6871 269.85 77.9018 266.777 68.8237L263.935 69.7855ZM260.254 61.6459C261.738 64.2193 262.974 66.9442 263.935 69.7855L266.777 68.8237C265.752 65.7949 264.435 62.8901 262.852 60.1469L260.254 61.6459ZM262.865 60.0932C258.065 51.8044 250.917 45.1234 242.323 40.8944L240.998 43.5862C249.06 47.5534 255.766 53.8208 260.269 61.5965L262.865 60.0932ZM242.323 40.8944C239.914 39.709 237.421 38.7312 234.873 37.9653L234.009 40.8384C236.4 41.5568 238.738 42.4742 240.998 43.5862L242.323 40.8944ZM223.886 38.9992C227.336 39.2283 230.731 39.849 234.007 40.8379L234.874 37.9658C231.381 36.9117 227.763 36.25 224.084 36.0058L223.886 38.9992ZM198.193 44.9607C205.98 40.4783 214.92 38.4037 223.886 38.9992L224.084 36.0058C214.527 35.3711 204.997 37.5825 196.696 42.3607L198.193 44.9607ZM196.679 42.4167C193.937 44.0014 191.343 45.8586 188.941 47.9693L190.921 50.2231C193.175 48.243 195.608 46.5008 198.18 45.0143L196.679 42.4167ZM188.941 47.9693C181.741 54.2946 176.578 62.6128 174.105 71.8722L177.003 72.6463C179.323 63.9602 184.166 56.1569 190.921 50.2231L188.941 47.9693ZM174.109 71.8783L160.327 123.312L163.225 124.089L177.007 72.6547L174.109 71.8783ZM181.407 128.96L195.188 77.5281L192.291 76.7517L178.509 128.184L181.407 128.96ZM195.24 77.4984C196.598 72.4248 199.429 67.8671 203.376 64.4003L201.396 62.1465C197.004 66.0044 193.854 71.0763 192.342 76.7222L195.24 77.4984ZM203.376 64.4003C207.327 60.9292 212.218 58.7077 217.432 58.0167L217.038 55.0427C211.236 55.8117 205.792 58.2838 201.396 62.1465L203.376 64.4003ZM217.432 58.0167C221.183 57.5196 224.98 57.8307 228.572 58.9092L229.434 56.0358C225.437 54.8358 221.212 54.4895 217.038 55.0427L217.432 58.0167ZM238.907 60.9009C236.056 58.709 232.845 57.067 229.437 56.0367L228.569 58.9083C231.631 59.8341 234.517 61.3097 237.079 63.2793L238.907 60.9009ZM248.902 74.8741C247.026 69.3305 243.548 64.4677 238.907 60.9009L237.079 63.2793C241.249 66.4846 244.374 70.8543 246.061 75.836L248.902 74.8741ZM249.455 92.0237C250.969 86.3782 250.776 80.4107 248.902 74.8741L246.061 75.836C247.745 80.8113 247.918 86.1738 246.558 91.2469L249.455 92.0237ZM235.704 143.507L249.485 92.0755L246.588 91.299L232.807 142.73L235.704 143.507ZM264.77 96.1687L250.989 147.602L253.886 148.378L267.668 96.9452L264.77 96.1687ZM232.807 142.73C231.247 148.551 234.701 154.534 240.522 156.094L241.299 153.196C237.078 152.065 234.574 147.727 235.704 143.507L232.807 142.73ZM247.632 93.1099C246.844 92.8979 246.376 92.0873 246.588 91.299L249.485 92.0755C249.703 91.2646 249.222 90.4308 248.411 90.2128L247.632 93.1099ZM246.558 91.2469C246.341 92.056 246.819 92.8913 247.632 93.1099L248.411 90.2128C249.201 90.4253 249.666 91.2373 249.455 92.0237L246.558 91.2469ZM193.378 78.5743C194.191 78.7915 195.023 78.3074 195.24 77.4984L192.342 76.7222C192.552 75.9355 193.361 75.4647 194.152 75.6759L193.378 78.5743ZM175.169 73.712C174.369 73.4984 173.895 72.6773 174.109 71.8783L177.007 72.6547C177.222 71.8526 176.745 71.0281 175.943 70.8137L175.169 73.712ZM174.105 71.8722C173.891 72.6729 174.366 73.4974 175.169 73.712L175.943 70.8137C176.743 71.0275 177.216 71.8488 177.003 72.6463L174.105 71.8722ZM196.137 44.437C195.729 43.7292 195.972 42.8252 196.679 42.4167L198.18 45.0143C198.906 44.5948 199.156 43.6662 198.737 42.9392L196.137 44.437ZM195.188 77.5281C194.977 78.3167 194.167 78.785 193.378 78.5743L194.152 75.6759C193.341 75.4593 192.508 75.9408 192.291 76.7517L195.188 77.5281ZM262.311 62.169C263.038 61.7484 263.285 60.8185 262.865 60.0932L260.269 61.5965C259.859 60.8893 260.1 59.9825 260.809 59.5723L262.311 62.169ZM196.696 42.3607C195.969 42.7792 195.718 43.7086 196.137 44.437L198.737 42.9392C199.145 43.6484 198.901 44.5533 198.193 44.9607L196.696 42.3607ZM168.043 136.676C173.864 138.236 179.847 134.781 181.407 128.96L178.509 128.184C177.378 132.404 173.04 134.909 168.82 133.778L168.043 136.676ZM267.668 96.9452C267.454 97.7444 266.632 98.2184 265.833 98.0037L266.611 95.1065C265.81 94.891 264.985 95.3667 264.77 96.1687L267.668 96.9452ZM262.852 60.1469C263.261 60.8546 263.019 61.7596 262.311 62.169L260.809 59.5723C260.083 59.9921 259.835 60.9202 260.254 61.6459L262.852 60.1469ZM160.327 123.312C158.768 129.133 162.222 135.116 168.043 136.676L168.82 133.778C164.599 132.647 162.094 128.309 163.225 124.089L160.327 123.312ZM240.522 156.094C246.343 157.654 252.327 154.199 253.886 148.378L250.989 147.602C249.858 151.823 245.519 154.327 241.299 153.196L240.522 156.094ZM264.777 96.1638C264.991 95.3659 265.812 94.8917 266.611 95.1065L265.833 98.0037C266.635 98.2192 267.459 97.7433 267.674 96.9426L264.777 96.1638Z"
                    fill="black"
                  />
                  <path
                    d="M125.944 177.04C121.756 192.499 130.893 208.427 146.351 212.615L220.987 232.836C236.446 237.024 252.374 227.888 256.562 212.429L269.967 162.95C274.155 147.491 265.019 131.564 249.56 127.376L174.924 107.155C159.465 102.966 143.538 112.103 139.349 127.562L125.944 177.04Z"
                    fill="white"
                    stroke="black"
                    strokeWidth="3"
                  />
                  <mask id="path-11-inside-1_502_1743" fill="white">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M185.657 178.392C186.536 176.497 186.085 174.289 184.924 172.552C182.126 168.366 181.079 163.04 182.484 157.794C185.073 148.132 195.005 142.398 204.667 144.987C214.33 147.576 220.064 157.507 217.475 167.17C216.069 172.416 212.499 176.504 207.983 178.73C206.11 179.654 204.616 181.341 204.429 183.422L203.637 192.259C203.36 195.351 200.362 197.446 197.363 196.642L185.166 193.374C182.168 192.57 180.618 189.257 181.925 186.441L185.657 178.392Z"
                    />
                  </mask>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M185.657 178.392C186.536 176.497 186.085 174.289 184.924 172.552C182.126 168.366 181.079 163.04 182.484 157.794C185.073 148.132 195.005 142.398 204.667 144.987C214.33 147.576 220.064 157.507 217.475 167.17C216.069 172.416 212.499 176.504 207.983 178.73C206.11 179.654 204.616 181.341 204.429 183.422L203.637 192.259C203.36 195.351 200.362 197.446 197.363 196.642L185.166 193.374C182.168 192.57 180.618 189.257 181.925 186.441L185.657 178.392Z"
                    fill="black"
                  />
                  <path
                    d="M203.637 192.259L206.625 192.526L203.637 192.259ZM207.983 178.73L209.31 181.421L207.983 178.73ZM184.924 172.552L187.419 170.885L184.924 172.552ZM185.657 178.392L188.378 179.655L185.657 178.392ZM185.382 158.571C184.209 162.947 185.08 167.387 187.419 170.885L182.43 174.219C179.172 169.345 177.948 163.133 179.586 157.018L185.382 158.571ZM203.891 147.884C195.829 145.724 187.542 150.509 185.382 158.571L179.586 157.018C182.604 145.755 194.181 139.071 205.444 142.089L203.891 147.884ZM214.577 166.393C216.737 158.331 211.953 150.045 203.891 147.884L205.444 142.089C216.707 145.107 223.39 156.684 220.373 167.946L214.577 166.393ZM206.656 176.04C210.431 174.179 213.404 170.77 214.577 166.393L220.373 167.946C218.734 174.061 214.568 178.828 209.31 181.421L206.656 176.04ZM200.649 191.991L201.441 183.154L207.417 183.689L206.625 192.526L200.649 191.991ZM185.943 190.476L198.139 193.744L196.587 199.54L184.39 196.272L185.943 190.476ZM188.378 179.655L184.646 187.703L179.203 185.179L182.935 177.13L188.378 179.655ZM206.625 192.526C206.182 197.474 201.384 200.825 196.587 199.54L198.139 193.744C199.339 194.066 200.538 193.228 200.649 191.991L206.625 192.526ZM209.31 181.421C208.076 182.03 207.484 182.944 207.417 183.689L201.441 183.154C201.747 179.738 204.143 177.279 206.656 176.04L209.31 181.421ZM184.39 196.272C179.592 194.986 177.113 189.685 179.203 185.179L184.646 187.703C184.124 188.829 184.743 190.155 185.943 190.476L184.39 196.272ZM187.419 170.885C188.976 173.215 189.822 176.543 188.378 179.655L182.935 177.13C183.25 176.452 183.195 175.363 182.43 174.219L187.419 170.885Z"
                    fill="black"
                    mask="url(#path-11-inside-1_502_1743)"
                  />
                </svg>

                <div className="text-center mb-6">
                  <p className="text-base text-gray-500 mt-4">
                    Cảm ơn bạn đã cung cấp thông tin. Chúng tôi cam kết bảo mật
                    dữ liệu theo quy định.
                  </p>
                  <p className="text-xs text-gray-400 mt-2 italic">
                    Lưu ý: Nếu phát hiện thông tin không chính xác, đơn của bạn
                    có thể bị từ chối mà không cần thông báo trước.
                  </p>
                </div>
              </div>

              <div className="flex w-full  flex-col   gap-3 mt-10">
                <Button
                  onClick={handleDrawerSubmit}
                  loading={isSubmitting}
                  size="large"
                  className=" w-full bg border py-6 border-indigo-600 bg-indigo-600 text-white"
                >
                  Chấp nhận và gửi
                </Button>
                <Button
                  onClick={() => setIsDrawerVisible(false)}
                  size="large"
                  className="py-6 bg-white"
                >
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  )
}

export default WorkerDeclarationMultiStepForm
