import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Button, Drawer, Select, DatePicker, Radio } from 'antd'
const { Option } = Select
const { RangePicker } = DatePicker
import moment from 'moment'
const FieldIcon = () => (
  <svg
    className="w-4 h-4 opacity-65"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.34997 2H12.25C12.99 2 13.6 2.61001 13.6 3.35001V4.82999C13.6 5.36999 13.26 6.04 12.93 6.38L10.03 8.94C9.63003 9.28 9.35998 9.94999 9.35998 10.49V13.39C9.35998 13.79 9.09 14.33 8.75 14.54L7.81 15.15C6.93 15.69 5.71997 15.08 5.71997 14V10.43C5.71997 9.95999 5.44999 9.35001 5.17999 9.01001L2.61999 6.31C2.27999 5.97 2.01001 5.36999 2.01001 4.95999V3.41C2.00001 2.61 2.60997 2 3.34997 2Z"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 5.88 21.22 3.91999 19.41 2.89999C18.9 2.60999 17.88 2.38999 16.95 2.23999"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 13H18"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 17H18"
      stroke="#292D32"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function FieldActionInter({
  handleApplyFilter,
  dateRange,
  setDateRange,
  setIsDrawerVisible,
  isDrawerVisible,
  nameTags,
  setNameTags,
  phoneNumberTags,
  setPhoneNumberTags,
  citizenshipIdTags,
  setCitizenshipIdTags,
  setCid,
  cid,
  setSyn,
  syn,
  setApplicantStatus,
  setApplicantType,
  applicantType,
  applicantStatus,
  setInterviewDate,
  interviewDate,
  isMobile
}) {
  const { t } = useTranslation()

  const handleNameChange = (value) => {
    setNameTags(value)
  }

  const handlePhoneNumberChange = (value) => {
    setPhoneNumberTags(value)
  }

  const handleCitizenshipIdChange = (value) => {
    setCitizenshipIdTags(value)
  }
  const handleCidChange = (value) => {
    setCid(value)
  }

  const handtApplicantType = (e) => {
    setApplicantType(e)
  }
  const handtApplicantStatus = (e) => {
    setApplicantStatus(e)
  }

  return (
    <>
      
      <button    onClick={() => setIsDrawerVisible(true)}  className="border-[1.3px] border-[#d9d9d9] rounded-lg p-[0.6rem] w-auto flex items-center space-x-2 bg-white hover:bg-gray-100">
          <FieldIcon />
          <span className="text-gray-500">{t('field_action.filter')}</span>
        </button>
      <Drawer
        title={t('field_action.filter_options')}
        placement="right"
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
        width={500}
        closable={false}
        extra={[
          <Button key="cancel" onClick={() => setIsDrawerVisible(false)}>
         {t('field_action.cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
            onClick={handleApplyFilter}
          >
         {t('field_action.save_search')}
          </Button>,
        ].filter(Boolean)}
      >
        <div className="mb-3">
          <label className="block mb-1">{t('field_action.name')}:</label>
          <Select
            mode="tags"
            value={nameTags}
            onChange={handleNameChange}
            placeholder={t('field_action.note_name')}
            size="large"
            className="w-full"
          >
            {nameTags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">{t('field_action.phone')}:</label>
          <Select
            mode="tags"
            value={phoneNumberTags}
            onChange={handlePhoneNumberChange}
            placeholder="Enter phone numbers"
            size="large"
            className="w-full"
          >
            {phoneNumberTags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-3">
          <label className="block mb-1">{t('field_action.id_number')}:</label>
          <Select
            mode="tags"
            value={citizenshipIdTags}
            onChange={handleCitizenshipIdChange}
            placeholder={t('field_action.note_id_number')}
            size="large"
            className="w-full"
          >
            {citizenshipIdTags.map((tag) => (
              <Option key={tag} value={tag}>
                {tag}
              </Option>
            ))}
          </Select>
        </div>
        <div className="mb-3">
          <label className="blick mb-1"> {t('field_action.interview_date')}</label>

          <DatePicker
            value={interviewDate}
            onChange={setInterviewDate}
            format="YYYY-MM-DD"
            className="cursor-pointer w-full"
            size="large"
          />
        </div>
        <div className="mb-3">
          <label className="blick mb-1"> {t('field_action.applicant_type')}</label>
          <Select
            mode="tags"
            value={applicantType}
            onChange={handtApplicantType}
            placeholder={t('field_action.applicant_type')}
            size="large"
            className="w-full"
          >
            <Option value="worker">{t('field_action.worker')}</Option>
            <Option value="staff">{t('field_action.staff')}</Option>
          </Select>
        </div>
        <div className="mb-3">
          <label className="blick mb-1"> {t('field_action.applicant_status')}</label>
          <Select
            mode="tags"
            value={applicantStatus}
            onChange={handtApplicantStatus}
            placeholder={t('field_action.applicant_status')}
            size="large"
            className="w-full"
          >
            <Option value="waiting_interview">{t('field_action.waiting_interview')}</Option>
            <Option value="interviewed">{t('field_action.interviewed')}</Option>
          </Select>
        </div>
        <div className="mb-3">
          <label className="blick mb-1"> {t('field_action.date_range_action_inter')}</label>

          <RangePicker
            value={dateRange}
            onChange={setDateRange}
            format="YYYY-MM-DD"
            className="cursor-pointer w-full"
            size="large"
          />
        </div>
      </Drawer>
    </>
  )
}
