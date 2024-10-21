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
  Drawer,
  Dropdown,
  Divider
} from 'antd'
import {
  QuestionCircleOutlined
} from '@ant-design/icons'
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
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.58 8.32007H17.2599"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.73999 14.11H6.75998H17.27"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 22H17"
        stroke="#292D32"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.1947 8.30005H7.20368"
        stroke="#292D32"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4945 8.30005H10.5035"
        stroke="#292D32"
        strokeWidth="2"
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
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
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


  const menu = (
    <Menu>
      <Menu.Item key="calendar" onClick={() => setViewMode('calendar')}>
        <span className="flex items-center gap-2">
          <CalendarIcon2 />
          {t('Calendar')}
        </span>
      </Menu.Item>
     
    </Menu>
  )
  return (
    <div className="w-full h-screen bg-white">
      <Helmet>
        <title>ITM - {t('Công việc')}</title>
      </Helmet>
      <div className="w-full p-2 flex items-center justify-end bg-white">
        {isMobile && (
          <>
            <Button
              className=" border-none  p-2 bg-none shadow-none"
              onClick={toggleViewModeList}
            >
              <KeyOpenIcon />
            </Button>
            <Button
              className=" border-none  p-2 bg-none shadow-none"
              onClick={showDrawer}
            >
           <QuestionCircleOutlined   style={{
        fontSize: '22px',
      }}  className="opacity-65 bg-none"/>
      
            </Button>
          </>
        )}

      </div>
      <Drawer
  placement="bottom"
  closable={false}
  onClose={onClose}
  open={open}
  height="340"
   
>
  <div className="flex flex-col gap-4 ">
    <div className="text-gray-600 text-sm font-semibold">
    {t('hr_payroll.status_4')}
    </div>

    {/* Trạng thái Xanh Lá */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-green-200 rounded-md"></div>
      <span className="text-green-800 text-xs">{t('hr_payroll.status_1')}</span>
    </div>

    {/* Trạng thái Vàng */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-yellow-200 rounded-md"></div>
      <span className="text-yellow-800 text-xs">{t('hr_payroll.status_2')}</span>
    </div>

    {/* Trạng thái Đỏ */}
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-red-200 rounded-md"></div>
      <span className="text-red-800 text-xs">{t('hr_payroll.status_3')}</span>
    </div>
    {/* Thông Báo Liên Hệ */}
    <div className="mt-6 flex justify-center text-center text-gray-600 text-xs">
      <p>{t('hr_payroll.status_5')}</p>
    </div>
  </div>
</Drawer>
      <div>
      <ListView
            viewModeList={viewModeList}
            setViewModeList={setViewModeList}
          />
      </div>
    </div>
  )
}
