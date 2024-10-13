import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Modal, Typography, Dropdown, Menu, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { DeleteResGroups } from '../../../features/resGroups/deleteResGroups'
import { DeleteResUsers } from '../../../features/resUsers/deleteResUsers'
import { DeleteMenus } from '../../../features/menu/deleteMenu'
import { DeleteHrEmployeeIds } from '../../../features/hr/deleteHrEmployeeIds'
import { DeleteHrInfoIds } from '../../../features/hrRecruitment/deleteHrInfoIds'
import { PutUsersInterviewStatus } from '../../../features/hrRecruitment/putUsersInterviewStatus'
import ChangePassSelect from '../profile/changePassSelect'
import { DeleteHrInterviewCandidates } from '../../../features/hrInterviewCandidate/deleteHrInterviewCandidate'
import { DeleteHrInterIds } from '../../../features/hrInter/deleteHrInfoIds'
import ExportDataView from '../export'
import ExportDataViewIds from '../export/exportIds'

const { Title } = Typography
const SettingIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      id="Settings--Streamline-Solar-Ar"
      className="w-4 h-4"
    >
      <path
        stroke="#000000"
        d="M8.7181 12C8.7181 14.5264 11.453 16.1054 13.6409 14.8422C14.6563 14.2559 15.2819 13.1725 15.2819 12C15.2819 9.4736 12.547 7.8946 10.3591 9.1578C9.3437 9.7441 8.7181 10.8275 8.7181 12"
        strokeWidth="1.5"
      ></path>
      <path
        d="M13.9313 1.227C13.5291 1.0605 13.0195 1.0605 12 1.0605C10.9805 1.0605 10.4709 1.0605 10.0687 1.227C9.5327 1.4491 9.1067 1.875 8.8847 2.4111C8.7833 2.6558 8.7436 2.9404 8.7281 3.3556C8.7053 3.9657 8.3924 4.5304 7.8637 4.8356C7.335 5.1409 6.6895 5.1295 6.1497 4.8442C5.7825 4.6501 5.5161 4.5421 5.2535 4.5075C4.6782 4.4318 4.0964 4.5877 3.636 4.9409C3.2908 5.2059 3.0359 5.6473 2.5262 6.5302C2.0165 7.413 1.7616 7.8544 1.7048 8.2859C1.6291 8.8612 1.785 9.4431 2.1382 9.9034C2.2994 10.1136 2.526 10.2901 2.8777 10.5111C3.3947 10.836 3.7274 11.3895 3.7274 12C3.7273 12.6105 3.3947 13.1639 2.8777 13.4886C2.526 13.7097 2.2993 13.8864 2.1381 14.0966C1.7848 14.5569 1.6289 15.1387 1.7047 15.714C1.7615 16.1454 2.0164 16.5869 2.5261 17.4698C3.0358 18.3526 3.2907 18.7941 3.6359 19.059C4.0963 19.4122 4.6781 19.5681 5.2534 19.4924C5.516 19.4578 5.7823 19.3498 6.1496 19.1558C6.6894 18.8705 7.3349 18.8591 7.8637 19.1643C8.3924 19.4696 8.7053 20.0343 8.7281 20.6445C8.7436 21.0596 8.7833 21.3442 8.8847 21.5889C9.1067 22.125 9.5327 22.551 10.0687 22.773C10.4709 22.9395 10.9806 22.9395 12 22.9395C13.0195 22.9395 13.5291 22.9395 13.9313 22.773C14.4673 22.551 14.8933 22.125 15.1153 21.5889C15.2167 21.3442 15.2564 21.0596 15.2719 20.6444C15.2947 20.0343 15.6075 19.4696 16.1362 19.1643C16.665 18.859 17.3105 18.8705 17.8504 19.1558C18.2176 19.3498 18.4839 19.4577 18.7464 19.4923C19.3217 19.5681 19.9036 19.4122 20.3639 19.059C20.7092 18.794 20.9641 18.3526 21.4738 17.4697C21.9835 16.5868 22.2384 16.1454 22.2952 15.714C22.3709 15.1387 22.215 14.5568 21.8618 14.0964C21.7005 13.8863 21.4739 13.7096 21.1222 13.4886C20.6053 13.1639 20.2726 12.6104 20.2726 11.9999S20.6053 10.8361 21.1222 10.5113C21.474 10.2903 21.7007 10.1137 21.8619 9.9034C22.2151 9.4431 22.371 8.8613 22.2953 8.286C22.2385 7.8545 21.9837 7.4131 21.4739 6.5302C20.9642 5.6474 20.7093 5.2059 20.3641 4.941C19.9037 4.5878 19.3218 4.4319 18.7465 4.5076C18.484 4.5422 18.2177 4.6501 17.8504 4.8442C17.3106 5.1295 16.6651 5.1409 16.1364 4.8357C15.6075 4.5304 15.2947 3.9656 15.2719 3.3555C15.2564 2.9404 15.2167 2.6558 15.1153 2.4111C14.8933 1.875 14.4673 1.4491 13.9313 1.227Z"
        stroke="#000000"
        strokeWidth="1.5"
      ></path>
    </svg>
  )
}
export default function ShowAction({
  selectedRowKeys,
  setSelectedRowKeys,
  fetchData,
  fetchDataUser,
  handleOnClickAction,
  actionUsers,
  setActionUsers,
  canDelete,
  userData,
  table
}) {
  const { t } = useTranslation()
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedMenuKey, setSelectedMenuKey] = useState('')
  const [exportOpen, setExportOpen] = useState(false)
  const [exportOpenIds, setExportOpenIds] = useState(false)

  const [isOpen, setIsOpen] = useState(false)

  const handleExportOpen = () => {
    setExportOpen(true)
  }
  const handleExportOpenIds = () => {
    setExportOpenIds(true)
  }
  const handleExportClose = () => {
    setExportOpen(false)
  }
  const handleExportCloseIds = () => {
    setExportOpenIds(false)
  }
  const handleCancelOpenDrawer = () => {
    setIsOpen(false)
  }
  const handleDeleteGroups = async () => {
    try {
      const response = await DeleteResGroups(selectedRowKeys)

      if (response.success) {
        message.success('Xóa thành công các nhóm')
        setSelectedRowKeys([])
        setActionUsers('')
        fetchData()
      } else {
        message.error(
          `Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại`,
        )
      }
    } catch (error) {
      console.error('Lỗi khi xóa nhóm:', error)
      message.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }
  const handleDeleteUsers = async () => {
    try {
      const response = await DeleteResUsers(selectedRowKeys)

      if (response.success) {
        message.success('Xóa thành công tài khoản')
        setSelectedRowKeys([])
        fetchDataUser()
        setActionUsers('')
      } else {
        message.error(
          `Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại`,
        )
      }
    } catch (error) {
      message.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  const handleDeleteMenus = async () => {
    try {
      const response = await DeleteMenus(selectedRowKeys)

      if (response.success) {
        message.success(`${t('Xóa thành công các nhóm')}`)
        setSelectedRowKeys([])
        setActionUsers('')
        fetchData()
      } else {
        message.error(
          `${t('Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
        )
      }
    } catch (error) {
      console.error(`${t('Lỗi khi xóa nhóm:')}`, error)
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }
  const handleDeleteHrEmployees = async () => {
    try {
      const response = await DeleteHrEmployeeIds(selectedRowKeys)

      if (response.success) {
        message.success(`${t('Xóa thành công các nhóm')}`)
        setSelectedRowKeys([])
        setActionUsers('')
        fetchDataUser()
      } else {
        message.error(
          `${t('Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
        )
      }
    } catch (error) {
      console.error(`${t('Lỗi khi xóa nhóm:')}`, error)
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }

  const handleDeleteHrInfoIds = async () => {
    try {
      const response = await DeleteHrInfoIds(selectedRowKeys)

      if (response.success) {
        message.success(`${t('Xóa thành công các nhóm')}`)
        setSelectedRowKeys([])
        setActionUsers('')
        fetchDataUser()
      } else {
        message.error(
          `${t('Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
        )
      }
    } catch (error) {
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }
  const handleUpdateUserInterviewTrue = async () => {
    try {
      const response = await PutUsersInterviewStatus(selectedRowKeys, true)

      const messagePromise = response.success
        ? Promise.resolve(message.success(`${t('Cập nhật thành công')}`))
        : Promise.reject(
          new Error(
            `${t('Cập nhật thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
          ),
        )

      await messagePromise

      if (response.success) {
        await fetchDataUser()
        setSelectedRowKeys([])
        setActionUsers('')
      }
    } catch (error) {
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }
  const handleDeleteHrInterviewCandidates = async () => {
    try {
      const response = await DeleteHrInterviewCandidates(selectedRowKeys)

      const messagePromise = response.success
        ? Promise.resolve(message.success(`${t('Xóa thành công các nhóm')}`))
        : Promise.reject(
          new Error(
            `${t('Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
          ),
        )

      await messagePromise

      if (response.success) {
        await fetchDataUser()
        setSelectedRowKeys([])
        setActionUsers('')
      }
    } catch (error) {
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }
  const handleDeleteHrInter = async () => {
    try {
      const response = await DeleteHrInterIds(selectedRowKeys)

      const messagePromise = response.success
        ? Promise.resolve(message.success(`${t('Xóa thành công các nhóm')}`))
        : Promise.reject(
          new Error(
            `${t('Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
          ),
        )

      await messagePromise

      if (response.success) {
        await fetchDataUser()
        setSelectedRowKeys([])
        setActionUsers('')
      }
    } catch (error) {
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }

  const handleUpdateUserInterviewFalse = async () => {
    try {
      const response = await PutUsersInterviewStatus(selectedRowKeys, false)

      const messages = response.success
        ? Promise.resolve(message.success(`${t('Cập nhật thành công')}`))
        : Promise.reject(
          new Error(
            `${t('Cập nhật thất bại: Yêu cầu không thành công, vui lòng thử lại')}`,
          ),
        )

      await messages

      if (response.success) {
        setSelectedRowKeys([])
        setActionUsers('')
        await fetchDataUser()
      }
    } catch (error) {
      message.error(`${t('Có lỗi xảy ra, vui lòng thử lại')}`)
    }
  }

  const handleMenuClick = (e) => {
    setSelectedMenuKey(e.key)
    setShowDropdown(false)
    if (actionUsers === 'actionUsers') {
      setIsOpen(true)
    }

    const modalConfig = {
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa các nhóm đã chọn?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: {
        style: {
          backgroundColor: '#ff4d4f',
          borderColor: '#ff4d4f',
          color: '#fff',
        },
      },
    }

    const modalSuccess = {
      title: 'Cập nhật',
      content: 'Bạn có chắc chắn muốn cập nhật các nhóm đã chọn không?',
      okText: 'Chọn',
      cancelText: 'Hủy',
      okButtonProps: {
        style: {
          backgroundColor: '#ff4d4f',
          borderColor: '#ff4d4f',
          color: '#fff',
        },
      },
    }

    if (e.key === 'action_show_5') {
      switch (actionUsers) {
        case 'actionGroups':
          Modal.confirm({ ...modalConfig, onOk: handleDeleteGroups })
          break
        case 'actionUsers':
          Modal.confirm({ ...modalConfig, onOk: handleDeleteUsers })
          break
        case 'actionMenu':
          Modal.confirm({ ...modalConfig, onOk: handleDeleteMenus })
          break
        case 'actionPersonnel':
          Modal.confirm({ ...modalConfig, onOk: handleDeleteHrEmployees })

        case 'actionHrInfoIds':
          Modal.confirm({ ...modalConfig, onOk: handleDeleteHrInfoIds })
          break
        case 'actionHrInters':
          Modal.confirm({ ...modalConfig, onOk: handleDeleteHrInter })
          break
        case 'actionHrInterCandidateIds':
          Modal.confirm({
            ...modalConfig,
            onOk: handleDeleteHrInterviewCandidates,
          })
          break
        default:
          break
      }
    }
    if (e.key === 'action_show_6_1') {
      switch (actionUsers) {
        case 'actionHrInfoIds':
          Modal.confirm({
            ...modalSuccess,
            onOk: handleUpdateUserInterviewTrue,
          })
          break
        default:
          break
      }
    }
    if (e.key === 'action_show_6_2') {
      switch (actionUsers) {
        case 'actionHrInfoIds':
          Modal.confirm({
            ...modalSuccess,
            onOk: handleUpdateUserInterviewFalse,
          })
          break
        default:
          break
      }
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="action_show_1" onClick={handleExportOpenIds}>{t('Xuất danh sách đã chọn')}</Menu.Item>

      <Menu.Item key="action_show_2" onClick={handleExportOpen}>{t('Xuất danh theo bộ lọc')}</Menu.Item>
      <Menu.Item key="action_show_3">{t('Lưu trữ')}</Menu.Item>
      <Menu.Item key="action_show_4">{t('Bỏ lưu trữ')}</Menu.Item>


      {actionUsers === 'actionUsers' && (
        <Menu.Item key="action_show_6">{t('Đổi mật khẩu')}</Menu.Item>
      )}

      {canDelete && (
        <Menu.Item key="action_show_5">
          {' '}
          <span className="w-full text-red-700">{t('Xóa')}</span>
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        open={showDropdown}
        onClick={() => {
          setShowDropdown(!showDropdown)
          handleOnClickAction()
        }}
      >
        <button className="border-[1.3px] border-[#d9d9d9] rounded-lg p-[0.6rem] w-auto flex items-center space-x-2 bg-white hover:bg-gray-100">
          <SettingIcon />
          <span className="text-gray-500">{t('Actions')}</span>
        </button>
      </Dropdown>
      {actionUsers === 'actionUsers' && (
        <ChangePassSelect
          userData={userData}
          selectedRowKeys={selectedRowKeys}
          handleCancelOpenDrawer={handleCancelOpenDrawer}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}



      <ExportDataView isOpen={exportOpen} onClose={handleExportClose} setExportOpen={setExportOpen} table={table} />
      <ExportDataViewIds isOpen={exportOpenIds} onClose={handleExportCloseIds} table={table} selectedRowKeys={selectedRowKeys} />
    </>
  )
}
