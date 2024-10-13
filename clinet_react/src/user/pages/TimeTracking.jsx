import {
  Calendar,
  Table,
  Drawer,
  Button,
  List,
  Typography,
  Dropdown,
  Menu,
} from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { useTranslation } from 'react-i18next'
import {
  CalendarOutlined,
  TableOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'

import { Helmet } from 'react-helmet'
import ListView from '../components/work/viewList'
import TableView from '../components/work/viewTable'

dayjs.extend(utc)
dayjs.extend(timezone)
const CalendarIcon = () => {
  return (
    <svg
      className="w-5 h-5 opacity-65 "
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

const NotificationIcon = () => {
  return (
    <svg
      className="w-5 h-5 opacity-65 "
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

const ListIcon = () => {
  return (
    <svg
      className="w-4 h-4 opacity-65 "
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.5H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 14.5H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 19.5H21"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const KeyOpenIcon = () => {
  return (
    <svg
      className="w-5 h-5 opacity-65 "
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
export default function TimeTracking() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const userId = userFromLocalStorage.id
  const { t } = useTranslation()

  // Lấy ngày hiện tại theo múi giờ Việt Nam
  const now = dayjs().tz('Asia/Ho_Chi_Minh')

  // Khai báo state
  const [value, setValue] = useState(() => now)
  const [selectedValue, setSelectedValue] = useState(() => now)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [checkInOutHistory, setCheckInOutHistory] = useState([]) // Dữ liệu chấm công cho ngày đã chọn
  const [miniCalendarVisible, setMiniCalendarVisible] = useState(false)
  const [viewMode, setViewMode] = useState('calendar')

  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 820
      setIsMobile(mobile)

      if (mobile) {
        navigate('/u/phone/work')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [navigate])

  const sampleData = [
    {
      date: '2024-09-09',
      records: [
        { key: 1, timeIn: '08:00', timeOut: '17:00', status: 'On Time' },
      ],
    },
    {
      date: '2024-09-10',
      records: [{ key: 1, timeIn: '08:15', timeOut: '17:00', status: 'Late' }],
    },
    {
      date: '2024-09-11',
      records: [
        { key: 1, timeIn: '08:00', timeOut: '17:00', status: 'On Time' },
      ],
    },
    {
      date: '2024-09-12',
      records: [{ key: 1, timeIn: '09:00', timeOut: '17:00', status: 'Late' }],
    },
    {
      date: '2024-09-21',
      records: [
        { key: 1, timeIn: '08:00', timeOut: '17:00', status: 'On Time' },
      ],
    },
    {
      date: '2024-10-01',
      records: [{ key: 1, timeIn: '08:30', timeOut: '17:00', status: 'Late' }],
    },
    {
      date: '2024-10-05',
      records: [
        { key: 1, timeIn: '08:00', timeOut: '17:00', status: 'On Time' },
      ],
    },
    {
      date: '2023-11-15',
      records: [{ key: 1, timeIn: '08:45', timeOut: '17:00', status: 'Late' }],
    },
    {
      date: '2023-11-20',
      records: [{ key: 1, timeIn: '08:00', timeOut: '17:00', status: 'Late' }],
    },
    {
      date: '2023-12-10',
      records: [{ key: 1, timeIn: '08:15', timeOut: '17:00', status: 'Late' }],
    },
    {
      date: '2023-12-15',
      records: [
        { key: 1, timeIn: '08:00', timeOut: '17:00', status: 'On Time' },
      ],
    },
  ]

  const onSelect = (newValue) => {
    const selectedDate = newValue.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
    setValue(newValue)
    setSelectedValue(newValue)
    const data =
      sampleData.find((item) => item.date === selectedDate)?.records || []
    setCheckInOutHistory(data)
    setDrawerVisible(true) // Mở Drawer khi chọn ngày
  }

  const dateCellRender = (date) => {
    const selectedDate = date.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
    const record = sampleData.find((item) => item.date === selectedDate)

    if (!record) return <div></div>

    const icons = record.records.map((r, index) => {
      let icon = null
      if (r.status === 'Absent') {
        icon = (
          <>
            <CloseCircleOutlined style={{ color: 'red', fontSize: '16px' }} />
          </>
        )
      } else if (r.status === 'Late') {
        icon = (
          <>
            <ExclamationCircleOutlined
              style={{ color: 'yellow', fontSize: '16px' }}
            />
          </>
        )
      } else {
        icon = (
          <>
            <CheckCircleOutlined style={{ color: 'green', fontSize: '16px' }} />
          </>
        )
      }

      // Hiển thị thêm timeIn
      return (
        <div key={index} className="flex items-center gap-2">
          {icon}
          <span>{r.timeIn}</span>
        </div>
      )
    })

    return <div className="flex flex-col items-center">{icons}</div>
  }

  // Cột cho bảng chấm công
  const columns = [
    {
      title: t('Date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('Time In'),
      dataIndex: 'timeIn',
      key: 'timeIn',
    },
    {
      title: t('Time Out'),
      dataIndex: 'timeOut',
      key: 'timeOut',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
    },
  ]

  // Dữ liệu bảng lương
  const salaryData = sampleData.flatMap((day) =>
    day.records.map((record) => ({
      date: day.date,
      timeIn: record.timeIn,
      timeOut: record.timeOut,
      status: record.status,
    })),
  )

  // Dữ liệu danh sách
  const listData = sampleData.flatMap((day) =>
    day.records.map((record) => ({
      date: day.date,
      timeIn: record.timeIn,
      timeOut: record.timeOut,
      status: record.status,
    })),
  )

  const handleMenuClick = (e) => {
    setViewMode(e.key)
  }
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
  // Tạo menu cho Dropdown
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="calendar">
        <span className="flex items-center gap-2">
          <CalendarIcon2 />
          {t('Calendar')}
        </span>
      </Menu.Item>
      <Menu.Item key="table">
        <span className="flex items-center gap-2">
          <TableIcon />
          {t('Table')}
        </span>
      </Menu.Item>
    </Menu>
  )
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
  return (
    <div className="w-full   bg-slate-50 ">
      <Helmet>
        <title>ITM - {t('Default')}</title>
      </Helmet>
      <div className="h-screen">
        <div className="w-full p-2 flex items-center justify-end bg-slate-50">
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
        <div className="flex ">
          {viewMode === 'calendar' && (
            <>
              <Calendar
                className="p-1 w-full"
                value={value}
                onSelect={onSelect}
                dateCellRender={dateCellRender}
              />
            </>
          )}
          {viewMode === 'table' && <TableView />}
        </div>

        <Drawer
          title={t('Check-in Details')}
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          width={800}
        >
          <Table
            columns={columns}
            dataSource={checkInOutHistory}
            pagination={false}
            locale={{ emptyText: t('No Data') }}
          />
        </Drawer>
      </div>
    </div>
  )
}
