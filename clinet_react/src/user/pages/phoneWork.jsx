import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import {
  Input,
  Space,
  Table,
  Typography,
  message,
  Menu,
  Tabs,
  Button,
  Dropdown,
} from 'antd'

const { Search } = Input
import decodeJWT from '../../utils/decode-JWT'
const { Title, Text } = Typography
const { TabPane } = Tabs
import 'moment/locale/vi'
import '../../static/css/scroll_container.css'
import TimeTracking from './TimeTracking'
import ListView from '../components/work/viewList'
import TableView from '../components/work/viewTable'
const CalendarIcon2 = () => {
  return (
    <svg
      className="w-4 h-4 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2V5"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.08997H20.5"
        stroke="#292D32"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke="#292D32"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 13.7H15.7037"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 16.7H15.7037"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 13.7H12.0045"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 16.7H12.0045"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 13.7H8.30329"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 16.7H8.30329"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
const NotificationIcon = () => {
  return (
    <svg
      className="w-6 h-6 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.43994V9.76994"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M12.02 2C8.34002 2 5.36002 4.98 5.36002 8.66V10.76C5.36002 11.44 5.08002 12.46 4.73002 13.04L3.46002 15.16C2.68002 16.47 3.22002 17.93 4.66002 18.41C9.44002 20 14.61 20 19.39 18.41C20.74 17.96 21.32 16.38 20.59 15.16L19.32 13.04C18.97 12.46 18.69 11.43 18.69 10.76V8.66C18.68 5 15.68 2 12.02 2Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M15.33 18.8201C15.33 20.6501 13.83 22.1501 12 22.1501C11.09 22.1501 10.25 21.7701 9.65004 21.1701C9.05004 20.5701 8.67004 19.7301 8.67004 18.8201"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </svg>
  )
}
const CalendarIcon = () => {
  return (
    <svg
      className="w-6 h-6 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2V5"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 2V5"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.08997H20.5"
        stroke="#292D32"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
        stroke="#292D32"
        strokeWidth="1.5"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 13.7H15.7037"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6947 16.7H15.7037"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 13.7H12.0045"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9955 16.7H12.0045"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 13.7H8.30329"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.29431 16.7H8.30329"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
const KeyOpenIcon = () => {
  return (
    <svg
      className="w-6 h-6 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.25998 2H16.73C17.38 2 17.96 2.02003 18.48 2.09003C21.25 2.40003 22 3.70001 22 7.26001V13.58C22 17.14 21.25 18.44 18.48 18.75C17.96 18.82 17.39 18.84 16.73 18.84H7.25998C6.60998 18.84 6.02998 18.82 5.50998 18.75C2.73998 18.44 1.98999 17.14 1.98999 13.58V7.26001C1.98999 3.70001 2.73998 2.40003 5.50998 2.09003C6.02998 2.02003 6.60998 2 7.25998 2Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.58 8.32007H17.2599"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.73999 14.11H6.75998H17.27"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7 22H17"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.1947 8.30005H7.20368"
        stroke="#292D32"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.4945 8.30005H10.5035"
        stroke="#292D32"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const TableIcon = () => {
  return (
    <svg
      className="w-4 h-4 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.03 8.5H22"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.03 15.5H22"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.51 21.99V2.01001"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.51 21.99V2.01001"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export default function PhoneWork() {
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [viewModeList, setViewModeList] = useState('month')
  const [viewMode, setViewMode] = useState('calendar')
  const toggleViewModeList = () => {
    setViewModeList(viewModeList === 'month' ? 'week' : 'month')
  }
  const toggleViewMode = () => {
    setViewMode(viewMode === 'calendar' ? 'table' : 'calendar')
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const notifications = [
    { id: 1, message: 'Bạn có một tin nhắn mới.', date: '2024-09-21' },
    { id: 2, message: 'Đã cập nhật trạng thái dự án.', date: '2024-09-20' },
    { id: 3, message: 'Bạn được mời tham gia cuộc họp.', date: '2024-09-19' },
    {
      id: 4,
      message: 'Thành công trong việc hoàn thành nhiệm vụ.',
      date: '2024-09-18',
    },
  ]
  const menuNotifications = (
    <Menu>
      {notifications.map((notification) => (
        <Menu.Item key={notification.id}>
          <div>
            <div>{notification.message}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>
              {notification.date}
            </div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  )

  const menu = (
    <Menu>
      <Menu.Item key="calendar" onClick={() => setViewMode('calendar')}>
        <span className="flex items-center gap-2">
          <CalendarIcon2 />
          {t('Calendar')}
        </span>
      </Menu.Item>
      <Menu.Item key="table" onClick={() => setViewMode('table')}>
        <span className="flex items-center gap-2">
          <TableIcon />
          {t('Table')}
        </span>
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>ITM - {t('Công việc')}</title>
      </Helmet>
      <div className="w-full p-2 flex items-center justify-end bg-slate-50">
        {isMobile && (
          <>
            <Button
              className=" border-none  p-2 bg-none shadow-none"
              onClick={toggleViewModeList}
            >
              <KeyOpenIcon />
            </Button>
          </>
        )}

        <Dropdown overlay={menuNotifications} trigger={['click']}>
          <Button className=" border-none  p-2 bg-none shadow-none">
            <NotificationIcon />
          </Button>
        </Dropdown>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className=" border-none p-2 bg-none shadow-none">
            <CalendarIcon />
          </Button>
        </Dropdown>
      </div>
      <div>
        {viewMode === 'calendar' ? (
          <ListView
            viewModeList={viewModeList}
            setViewModeList={setViewModeList}
          />
        ) : (
          <TableView />
        )}
      </div>
    </div>
  )
}
