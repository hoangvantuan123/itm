import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Modal, Typography, Dropdown, Menu, Button } from 'antd'
import { GetTableName } from '../../../features/import/getTable'
import ImportForm from '../import'

const { Title } = Typography
const ImportIcon = () => {
  return (
    <svg
      className="w-4 h-4 opacity-65"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 8V2L10 4"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2L14 4"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12C3 12 3 13.79 3 16V17C3 19.76 3 22 8 22H16C20 22 21 19.76 21 17V16C21 13.79 21 12 17 12C16 12 15.72 12.21 15.2 12.6L14.18 13.68C13 14.94 11 14.94 9.81 13.68L8.8 12.6C8.28 12.21 8 12 7 12Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 12V10C5 7.99004 5 6.33004 8 6.04004"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 12V10C19 7.99004 19 6.33004 16 6.04004"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
const DataIcon = () => {
  return (
    <svg
      className="w-4 h-4 opacity-65"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.32 10H4.69002C3.21002 10 2.01001 8.79002 2.01001 7.32002V4.69002C2.01001 3.21002 3.22002 2.01001 4.69002 2.01001H19.32C20.8 2.01001 22 3.22002 22 4.69002V7.32002C22 8.79002 20.79 10 19.32 10Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.32 22H4.69002C3.21002 22 2.01001 20.79 2.01001 19.32V16.69C2.01001 15.21 3.22002 14.01 4.69002 14.01H19.32C20.8 14.01 22 15.22 22 16.69V19.32C22 20.79 20.79 22 19.32 22Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 5V7"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5V7"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17V19"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 17V19"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 6H18"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 18H18"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ImportAction({
  fetchData,
  isOpen,
  handleOnClickActionImport,
  setActionImport,
  actionImport,
  isMobile
}) {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const { t } = useTranslation()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tableInfo, setTableInfo] = useState(null)
  const [load, setLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if (isModalOpen) {
      const fetchTableInfo = async () => {
        const result = await GetTableName(actionImport)
        if (result.success) {
          setTableInfo(result.data)
        } else {
          setError(result.message)
        }
        setLoading(false)
      }

      fetchTableInfo()
    }
  }, [isModalOpen, actionImport])
  const handleOnClickOpenImport = () => {
    setShowDropdown(false)
    setIsModalOpen(true)
  }
  const handleOnClickCloseImport = () => {
    setIsModalOpen(false)
  }
  const menu = (
    <Menu>
      <Menu.Item key="import_data" onClick={handleOnClickOpenImport}>
        {' '}
        <span className=" flex items-center gap-2">
          {' '}
          <ImportIcon />
          Import dữ liệu
        </span>
      </Menu.Item>
    </Menu>
  )

  const handleOnClick = () => {
    handleOnClickActionImport()
    setShowDropdown(!showDropdown)
  }
  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        open={showDropdown}
        onClick={handleOnClick}
      >

        <button className="border-[1.3px] border-[#d9d9d9] rounded-lg p-[0.6rem] w-auto flex items-center space-x-2 bg-white hover:bg-gray-100">
          <DataIcon />
          <span className="text-gray-500">{t('Import')}</span>
        </button>

      </Dropdown>
      <ImportForm
        fetchData={fetchData}
        isOpen={isModalOpen}
        tableInfo={tableInfo}
        actionImport={actionImport}
        onClose={handleOnClickCloseImport}
      />
    </>
  )
}
