import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import {
  Row,
  Col,
  Typography,
  Button,
  Form,
  Input,
  Radio,
  message,
  Pagination,
  Select,
  DatePicker,
  Space,
  Dropdown,
  Menu,
  Table
} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../../static/css/scroll_container.css'
import ViewDetailUserHrRecruitment from '../components/candidateForm/viewDetailUserHrRecruitment'
import { GetHrInterId } from '../../features/hrInter/getInterId'
import NoData from './noData'
import Spinner from './load'
import { PutUserInter } from '../../features/hrInter/putUserInter'
import { DeleteHrInterIds } from '../../features/hrInter/deleteHrInfoIds'
import {
  UserAddOutlined,
  HourglassOutlined,
} from '@ant-design/icons'
import { PostSyncData } from '../../features/hrInter/postSyncData'
import { DownloadOutlined, FilePdfOutlined, FileExcelOutlined, FileWordOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { checkActionPermission } from '../../permissions'

const { Text } = Typography
const { TextArea } = Input;
import moment from 'moment'
import CustomTagSyn from '../components/tags/customTagSyn'
import CustomTagForm from '../components/tags/customTagForm'
import ShowResult from '../components/inter/showResult'

const ActionIcon = () => {
  return (
    <svg className="h-6 w-6 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#292D32" />
      <path d="M15.5801 19.2501C15.1701 19.2501 14.8301 18.9101 14.8301 18.5001V14.6001C14.8301 14.1901 15.1701 13.8501 15.5801 13.8501C15.9901 13.8501 16.3301 14.1901 16.3301 14.6001V18.5001C16.3301 18.9101 15.9901 19.2501 15.5801 19.2501Z" fill="#292D32" />
      <path d="M15.5801 8.2C15.1701 8.2 14.8301 7.86 14.8301 7.45V5.5C14.8301 5.09 15.1701 4.75 15.5801 4.75C15.9901 4.75 16.3301 5.09 16.3301 5.5V7.45C16.3301 7.86 15.9901 8.2 15.5801 8.2Z" fill="#292D32" />
      <path d="M15.5805 13.4002C13.7305 13.4002 12.2305 11.9002 12.2305 10.0502C12.2305 8.2002 13.7305 6.7002 15.5805 6.7002C17.4305 6.7002 18.9305 8.2002 18.9305 10.0502C18.9305 11.9002 17.4205 13.4002 15.5805 13.4002ZM15.5805 8.2002C14.5605 8.2002 13.7305 9.0302 13.7305 10.0502C13.7305 11.0702 14.5605 11.9002 15.5805 11.9002C16.6005 11.9002 17.4305 11.0702 17.4305 10.0502C17.4305 9.0302 16.5905 8.2002 15.5805 8.2002Z" fill="#292D32" />
      <path d="M8.41992 19.2498C8.00992 19.2498 7.66992 18.9098 7.66992 18.4998V16.5498C7.66992 16.1398 8.00992 15.7998 8.41992 15.7998C8.82992 15.7998 9.16992 16.1398 9.16992 16.5498V18.4998C9.16992 18.9098 8.83992 19.2498 8.41992 19.2498Z" fill="#292D32" />
      <path d="M8.41992 10.15C8.00992 10.15 7.66992 9.81 7.66992 9.4V5.5C7.66992 5.09 8.00992 4.75 8.41992 4.75C8.82992 4.75 9.16992 5.09 9.16992 5.5V9.4C9.16992 9.81 8.83992 10.15 8.41992 10.15Z" fill="#292D32" />
      <path d="M8.42031 17.3001C6.57031 17.3001 5.07031 15.8001 5.07031 13.9501C5.07031 12.1001 6.57031 10.6001 8.42031 10.6001C10.2703 10.6001 11.7703 12.1001 11.7703 13.9501C11.7703 15.8001 10.2703 17.3001 8.42031 17.3001ZM8.42031 12.1001C7.40031 12.1001 6.57031 12.9301 6.57031 13.9501C6.57031 14.9701 7.40031 15.8001 8.42031 15.8001C9.44031 15.8001 10.2703 14.9701 10.2703 13.9501C10.2703 12.9301 9.45031 12.1001 8.42031 12.1001Z" fill="#292D32" />
    </svg>

  )
}


export default function DetailUserHrRecruitment({ permissions, isMobile }) {
  const { t } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [dataMore, setDataMore] = useState([])
  const [interviewData, setInterviewData] = useState({})
  const [form] = Form.useForm()
  const [formMore] = Form.useForm()
  const [formFilled, setFormFilled] = useState(false)
  const [status, setStatus] = useState(null)
  const [showModel, setShowModel] = useState(false)
  const [note, setNote] = useState(formData?.note)
  const [stateNote, setStateNote] = useState(formData?.note)

  const canEdit = checkActionPermission(
    permissions,
    'hr-recruitment-1-1',
    'edit',
  )
  const canDelete = checkActionPermission(
    permissions,
    'hr-recruitment-1-1',
    'delete',
  )
  const fetchDataUserId = async () => {
    setLoading(true)
    try {
      const response = await GetHrInterId(id)
      if (response.success) {
        if (response.data.status) {
          setFormData(response.data.data)
          setStatus(response.data.data?.applicant_status)
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
          setError(`${t('api_status.data_error_2')}`)
          setFormData({})
        }
      } else {
        setError(`${t('api_status.data_error')}`)
        setFormData({})
      }
    } catch (error) {
      setError(error.message || `${t('api_status.none_error')}`)
      setFormData({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id || !formData) return
    fetchDataUserId()
    const currentFields = form.getFieldsValue([
      'official_date_first',
      'official_date_second',
    ])
    if (
      currentFields.official_date_first !==
      (formData.official_date_first
        ? moment(formData.official_date_first)
        : null) ||
      currentFields.official_date_second !==
      (formData.official_date_second
        ? moment(formData.official_date_second)
        : null)
    ) {
      form.setFieldsValue({
        official_date_first: formData.official_date_first
          ? moment(formData.official_date_first)
          : null,
        official_date_second: formData.official_date_second
          ? moment(formData.official_date_second)
          : null,
      })
    }
  }, [id])

  useEffect(() => {
    if (status === "interviewed" && (!formData?.note || formData.note.trim() === "")) {
      setShowModel(true);
    }
  }, [status, formData.note])

  const handleNavigateToBack = () => {
    navigate(`/u/action=17/employee-interview-data`)
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing)
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

  const handleFinish = async (values) => {
    setDataMore(values)
    const formattedData = formatSubmissionData(values)

    const submissionData = dataMore
      ? { ...formattedData, ...dataMore }
      : formattedData
    try {
      const response = await PutUserInter(id, submissionData)
      if (response.success) {
         message.success(`${t('api_status.success')}`)
        setIsEditing(false)
        fetchDataUserId()
      } else {
          message.error(`${t('api_status.update_error')}: ${response.message}`)
      }
    } catch (error) {
       message.error(`${t('api_status.error')}`)
    }
  }
  const handleFinishFormMore = async (values) => {
    try {
      const response = await PutUserInter(id, values)
      if (response.success) {
         message.success(`${t('api_status.success')}`)
      } else {
          message.error(`${t('api_status.update_error')}: ${response.message}`)
      }
    } catch (error) {
       message.error(`${t('api_status.error')}`)
    }
  }
  const handleSave = () => {
    form.submit()
    formMore.submit()
  }

  const handleChange = async (value) => {
    const submissionData = {
      applicant_status: value,
    }
    try {
      const response = await PutUserInter(id, submissionData)
      if (response.success) {
        setStatus(value)
        message.success(`${t('api_status.success')}`)
      } else {
        message.error(`${t('api_status.update_error')}: ${response.message}`)
      }
    } catch (error) {
      message.error(`${t('api_status.error')}`)
    }
  }
  const handleChangeSatusFormTrue = async (value) => {
    const submissionData = {
      status_form: false,
    }
    try {
      const response = await PutUserInter(id, submissionData)
      if (response.success) {
        setStatus(value)
        fetchDataUserId()
        message.success(`${t('api_status.form_success_2')}`)
      } else {
        message.error(`${t('api_status.update_error')}: ${response.message}`)
      }
    } catch (error) {
      message.error(`${t('api_status.error')}`)
    }
  }
  const handleChangeSatusFormFalse = async (value) => {
    const submissionData = {
      status_form: true,
    }
    try {
      const response = await PutUserInter(id, submissionData)
      if (response.success) {
        setStatus(value)

        fetchDataUserId()
        message.success(`${t('api_status.form_success')}`)
      } else {
        message.error(`${t('api_status.update_error')}: ${response.message}`)
      }
    } catch (error) {
      message.error(`${t('api_status.error')}`)
    }
  }

  const handleDeleteHrInter = async () => {
    try {
      const response = await DeleteHrInterIds([id])

      const messagePromise = response.success
        ? Promise.resolve(message.success(`${t('api_status.delete_success')}`))
        : Promise.reject(
          new Error(
            `${t('api_status.delete_error')}`,
          ),
        )

      await messagePromise

      if (response.success) {
        handleNavigateToBack()
      }
    } catch (error) {
      message.error(`${t('api_status.error')}`)
    }
  }
  const handleSync = async () => {
    if (
      (formData.employee_code?.trim() || "").trim() === "" ||
      (formData.full_name?.trim() || "").trim() === "" ||
      (formData.phone_number?.trim() || "").trim() === "" ||
      (formData.id_number?.trim() || "").trim() === ""
    ) {
      message.warning(`${t('hr_recruitment_1_1.employee_code_required')}`);
      return;
    } else {
      const result = await PostSyncData([id]);

      if (result.success) {
        message.success(`${result.message} id ${id}`);
      } else {
        message.error(t('sync_failed') + ': ' + result.message);
      }
    }

  };


  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'export-pdf':
        message.warning(t('develop.warning'))
        break;
      case 'export-excel':
        message.warning(t('develop.warning'))
        break;
      case 'export-word':
        message.warning(t('develop.warning'))
        break;
      case 'open-form':
        handleChangeSatusFormTrue();
        break;
      case 'close-form':
        handleChangeSatusFormFalse();
        break;
      case 'delete':
        handleDeleteHrInter()
        break;
      case 'toggle-edit':
        toggleEdit();
        break;
      default:
        break;
    }
  };


  const handleMenuClickPhone = (key) => {
    switch (key) {
      case 'export-pdf':
        console.log('Export PDF');
        break;
      case 'export-excel':
        console.log('Export Excel');
        break;
      case 'export-word':
        console.log('Export Word');
        break;
      case 'open-form':
        handleChangeSatusFormTrue();
        break;
      case 'close-form':
        handleChangeSatusFormFalse();
        break;
      case 'sync':
        handleSync();
        break;
      case 'toggle-edit':
        toggleEdit();
        break;
      case 'save':
        handleSave();
        break;
      case 'delete':
        console.log('Delete item');
        break;
      default:
        break;
    }
  };


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.SubMenu key="export" title={t('hr_recruitment_1_1.export')} icon={<DownloadOutlined />}>
        <Menu.Item key="export-pdf" icon={<FilePdfOutlined />}>{t('hr_recruitment_1_1.export_pdf')} </Menu.Item>
        <Menu.Item key="export-excel" icon={<FileExcelOutlined />}>{t('hr_recruitment_1_1.export_excel')}</Menu.Item>
        <Menu.Item key="export-word" icon={<FileWordOutlined />}>{t('hr_recruitment_1_1.export_word')}</Menu.Item>
      </Menu.SubMenu>
      {canEdit && <>       <Menu.Item key="open-form" icon={<FormOutlined />}>{t('hr_recruitment_1_1.open_form')}</Menu.Item>
        <Menu.Item key="close-form" icon={<FormOutlined />}>{t('hr_recruitment_1_1.close_form')}</Menu.Item></>}
      {canDelete && <Menu.Item key="delete" style={{ color: 'red' }} icon={<DeleteOutlined />}>
        {t('hr_recruitment_1_1.delete')}
      </Menu.Item>}

    </Menu>
  );


  const handleOpenShowResult = () => {
    setShowModel(true)
  }
  const handleCloseShowResult = () => {
    setShowModel(false)
  }

  return (
    <div className="w-full h-screen bg-white  p-3 ">
      <Helmet>
        <title>ITM - #{id}</title>
      </Helmet>

      <nav
        aria-label="Breadcrumb"
        className={`flex justify-between items-center mb-6`}
      >
        <ol className="flex items-center gap-1 text-sm text-gray-700">
          <li onClick={handleNavigateToBack} className="cursor-pointer">
            <span className="text-black hover:text-indigo-950 opacity-80">
              {t('hr_recruitment_1_1.cancel')}
            </span>
          </li>
          <li className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </li>
          <li className="cursor-pointer">
            <span className="text-black opacity-80">#{id}</span>
          </li>

          {!isMobile && (
            <>
              <li className="cursor-pointer ml-5">
                <CustomTagSyn status={formData?.synchronize} />
              </li>
              <li className="cursor-pointer">
                <CustomTagForm status={formData?.status_form} />
              </li>
            </>
          )}
        </ol>

        {isMobile ? (
          <Dropdown
            overlay={
              <Menu
                onClick={({ key }) => handleMenuClickPhone(key)}
              >
                <Menu.SubMenu
                  key="export"
                  title={t('hr_recruitment_1_1.export')}
                  icon={<DownloadOutlined />}
                >
                  <Menu.Item key="export-pdf" icon={<FilePdfOutlined />}>
                    {t('hr_recruitment_1_1.export_pdf')}
                  </Menu.Item>
                  <Menu.Item key="export-excel" icon={<FileExcelOutlined />}>
                    {t('hr_recruitment_1_1.export_excel')}
                  </Menu.Item>
                  <Menu.Item key="export-word" icon={<FileWordOutlined />}>
                    {t('hr_recruitment_1_1.export_word')}
                  </Menu.Item>
                </Menu.SubMenu>

                {canEdit && (
                  <>
                    <Menu.Item key="open-form" icon={<FormOutlined />}>
                      {t('hr_recruitment_1_1.open_form')}
                    </Menu.Item>
                    <Menu.Item key="close-form" icon={<FormOutlined />}>
                      {t('hr_recruitment_1_1.close_form')}
                    </Menu.Item>
                    <Menu.Item key="sync">
                      {t('hr_recruitment_1_1.syn')}
                    </Menu.Item>
                    <Menu.Item key="toggle-edit">
                      {isEditing
                        ? t('hr_recruitment_1_1.exit')
                        : t('hr_recruitment_1_1.edit')}
                    </Menu.Item>
                    <Menu.Item key="save">
                      {t('hr_recruitment_1_1.save')}
                    </Menu.Item>
                  </>
                )}

                {canDelete && (
                  <Menu.Item key="delete" style={{ color: 'red' }} icon={<DeleteOutlined />}>
                    {t('hr_recruitment_1_1.delete')}
                  </Menu.Item>
                )}
              </Menu>
            }
            placement="bottomRight"
          >
            <button className="bg-white">
              <ActionIcon />
            </button>
          </Dropdown>

        ) : (
          <ol className="flex items-center gap-2">
            <Dropdown overlay={menu} placement="bottomRight">
              <Button className="bg-white">
                {t('hr_recruitment_1_1.action')}
              </Button>
            </Dropdown>

            {canEdit && (
              <Button className="bg-white" onClick={handleSync}>
                {t('hr_recruitment_1_1.syn')}
              </Button>
            )}
            {canEdit && (
              <Button className="bg-white" onClick={toggleEdit}>
                {isEditing
                  ? t('hr_recruitment_1_1.exit')
                  : t('hr_recruitment_1_1.edit')}
              </Button>
            )}
            {canEdit && (
              <Button className="bg-white" onClick={handleSave}>
                {t('hr_recruitment_1_1.save')}
              </Button>
            )}
          </ol>
        )}
      </nav>



      {isMobile && <>  <ol className="flex items-center gap-1 text-sm text-gray-700 mb-3"><li className="cursor-pointer ">
        <CustomTagSyn status={formData?.synchronize} />
      </li>
        <li className="cursor-pointer">
          <CustomTagForm status={formData?.status_form} />
        </li></ol></>}
      {canEdit &&

        <Space direction="vertical" className="mb-3">
          <Row gutter={16}>
            <Col>
              <Select
                value={status}
                onChange={handleChange}
                style={{ width: 300 }}
                placeholder="Trạng thái"
              >
                <Option value="waiting_interview" key="waiting_interview">
                  <UserAddOutlined style={{ marginRight: 8 }} />
                  {t('hr_recruitment_1_1.waiting_interview')}
                </Option>
                <Option value="interviewed" key="interviewed">
                  <HourglassOutlined style={{ marginRight: 8 }} />
                  {t('hr_recruitment_1_1.interviewed')}
                </Option>

              </Select>
            </Col>



          </Row>
        </Space>
      }
      <Row gutter={16} className=" h-screen overflow-auto">
        <Col xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 10, order: 2 }}
          className="pt-5 lg:pt-0">



          <div className="divide-y h-screen overflow-auto border  scroll-container cursor-pointer pb-24 divide-gray-100 rounded-xl   bg-white">
            <div className="p-3">
              {isEditing ? (
                <>
                  {' '}
                  <Form
                    layout="vertical"
                    form={formMore}
                    onFinish={handleFinishFormMore}
                    initialValues={{
                      ...formData,
                      official_date_first: formData.official_date_first
                        ? moment(formData.official_date_first)
                        : null,
                      official_date_second: formData.official_date_second
                        ? moment(formData.official_date_second)
                        : null,
                    }}
                  >
                    <h3 className="   text-xl font-bold items-center flex  justify-center mb-2 mt-">{t('hr_recruitment_1_1.position_applied_for')}</h3>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label={t('hr_recruitment_1_1.employee_code')} name="employee_code">
                          <Input size="large" placeholder="CID" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={t('hr_recruitment_1_1.erp_department_registration')}
                          name="erp_department_registration"
                        >
                          <Input size="large" placeholder="ERP" />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item label={t('hr_recruitment_1_1.team')} name="team">
                          <Input size="large" placeholder="Team" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={16}>
                        <Form.Item label={t('hr_recruitment_1_1.part')} name="part">
                          <Input size="large" placeholder="Part" />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item label={t('hr_recruitment_1_1.production')} name="production">
                          <Input size="large" placeholder="Production" />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label={t('hr_recruitment_1_1.section')} name="section">
                          <Input size="large" placeholder="Section" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label={t('hr_recruitment_1_1.job_field')} name="job_field">
                          <Input size="large" placeholder="Job field" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label={t('hr_recruitment_1_1.position')} name="position">
                          <Input size="large" placeholder="Positionl" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label={t('hr_recruitment_1_1.official_date_first')}
                          name="official_date_first"
                        >
                          <DatePicker
                            size="large"
                            style={{ width: '100%' }}
                            placeholder={t('hr_recruitment_1_1.select_date')}
                            format="YYYY-MM-DD"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={t('hr_recruitment_1_1.official_date_second')}
                          name="official_date_second"
                        >
                          <DatePicker
                            size="large"
                            style={{ width: '100%' }}
                            placeholder={t('hr_recruitment_1_1.select_date')}
                            format="YYYY-MM-DD"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <h3 className=" italic mb-2">{t('hr_recruitment_1_1.salary')}</h3>
                    <Row gutter={16}>

                      <Col xs={24} sm={12} md={12}>
                        <Form.Item
                          label={t('hr_recruitment_1_1.desired_base_salary')}
                          name="desired_base_salary"
                        >
                          <Input size="large" placeholder={t('hr_recruitment_1_1.enter_information')} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12} md={12}>
                        <Form.Item
                          label={t('hr_recruitment_1_1.desired_total_salary')}
                          name="desired_total_salary"
                        >
                          <Input size="large" placeholder={t('hr_recruitment_1_1.enter_information')} />
                        </Form.Item>
                      </Col>
                    </Row>




                    <h3 className="  text-xl font-bold items-center flex  justify-center mb-2 mt-5">{t('hr_recruitment_1_1.interview_results')}</h3>

                    <Row gutter={16} className="mb-10">
                      <Col span={12}>
                        <div className="mt-3">
                          <Form.Item
                            label={t('hr_recruitment_1_1.interviewer_user')}
                            name="interviewer_user"
                          >
                            <Input size="large" placeholder={t('hr_recruitment_1_1.enter_information')} />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="mt-3">
                          <Form.Item
                            label={t('hr_recruitment_1_1.interview_results')}
                            name="interview_results"
                          >
                            <Radio.Group>
                              <Radio value="Đạt">{t('hr_recruitment_1_1.obtain')}</Radio>
                              <Radio value="Không Đạt">{t('hr_recruitment_1_1.not_achieved')}</Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={t('hr_recruitment_1_1.note')}
                          name="note"
                        >
                          <TextArea rows={6} allowClear />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </>
              ) : (
                <>

                  <h3 className="   text-xl font-bold items-center flex  justify-center mb-2 mt-">{t('hr_recruitment_1_1.position_applied_for')}</h3>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.employee_code')}</strong>
                        <Text className="ml-2">{formData.employee_code}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.erp_department_registration')}:</strong>
                        <Text className="ml-2">
                          {formData.erp_department_registration}
                        </Text>
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.team')}:</strong>
                        <Text className="ml-2">{formData.team}</Text>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={16}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.part')}:</strong>
                        <Text className="ml-2">{formData.part}</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.production')}:</strong>
                        <Text className="ml-2">{formData.production}</Text>
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.section')}:</strong>
                        <Text className="ml-2">{formData.section}</Text>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.job_field')}:</strong>
                        <Text className="ml-2">{formData.job_field}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.position')}:</strong>
                        <Text className="ml-2">{formData.position}</Text>
                      </div>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.official_date_first')}:</strong>
                        <Text className="ml-2">
                          {formData.official_date_first}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.official_date_second')}:</strong>
                        <Text className="ml-2">
                          {formData.official_date_second}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                  <h3 className=" italic mb-1 mt-2">{t('hr_recruitment_1_1.salary')}</h3>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.desired_base_salary')}:</strong>
                        <Text className="ml-2">
                          {formData?.desired_base_salary}
                        </Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.desired_total_salary')}:</strong>
                        <Text className="ml-2">
                          {formData?.desired_total_salary}
                        </Text>
                      </div>
                    </Col>
                  </Row>

                  {/*  */}
                  <h3 className="  text-xl font-bold items-center flex  justify-center mb-2 mt-5">{t('hr_recruitment_1_1.interview_results')}</h3>

                  <Row gutter={16}>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.interviewer_user')}:</strong>
                        <Text className="ml-2">{formData?.interviewer_user}</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.interview_results')}:</strong>
                        <Text className="ml-2">{formData?.interview_results}</Text>
                      </div>
                    </Col>

                    <Col span={24}>
                      <div className="mt-3">
                        <strong>{t('hr_recruitment_1_1.note')}:</strong>
                        <Text className="ml-2">{formData?.note}</Text>
                      </div>
                    </Col>
                  </Row>

                </>
              )}
            </div>
          </div>
        </Col>

        <Col xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 14, order: 1 }} className=" pt-5 lg:pt-0">
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
      </Row>
      <ShowResult id={id} isOpen={showModel} onClose={handleCloseShowResult} note={note} setNote={setNote} setStateNote={setStateNote} stateNote={stateNote} fetchDataUserId={fetchDataUserId} />
    </div>
  )
}
