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
  LeftOutlined, RightOutlined
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
import { GetTimekeepingUser } from '../../features/timekeeping/getTimeKeeping'
import { Helmet } from 'react-helmet'
import TableView from '../components/work/viewTable'
import moment from 'moment'

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



export default function TimeTracking({ isMobile }) {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userFromLocalStorage.id;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const now = dayjs().tz('Asia/Ho_Chi_Minh');

  const [value, setValue] = useState(() => now);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [checkInOutHistory, setCheckInOutHistory] = useState([]);
  const [viewModeList, setViewModeList] = useState('month'); // Default to 'month'
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(now); // Đặt mặc định là ngày hiện tại
  const [highlightedDate, setHighlightedDate] = useState(moment());
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const monthYear = `${String(selectedDate.month() + 1).padStart(2, '0')}-${selectedDate.year()}`;
      const cid = "VM31122002"; // Replace with your actual ID
      const response = await GetTimekeepingUser(cid, monthYear);

      if (response.success) {
        setData(response.data.data);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    if(isMobile) {
      navigate('/u/phone/work');
      }
  }, [selectedDate, isMobile]); // Fetch data whenever selectedDate changes

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setHighlightedDate(date);
    setCheckInOutHistory(data.find(item => item.date === date.format('YYYY-MM-DD'))?.records || []);
    setDrawerVisible(true); // Show Drawer when selecting a date
  };

  const getColorForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dateData = data.find(item => item.date === dateStr);

    if (dateData) {
      const recordCount = dateData.records.length;

      if (recordCount === 1) {
        return 'bg-yellow-200 text-yellow-800';
      } else if (recordCount >= 2) {
        return 'bg-blue-200 text-blue-800'; 
      }
    }
    return ''; 
  };

  const monthDates = Array.from({ length: selectedDate.daysInMonth() }, (_, i) => 
    moment(selectedDate).date(i + 1)
  );

  const handleMenuClick = (e) => {
    setViewModeList(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="month">
        <span className="flex items-center gap-2">
          <CalendarOutlined />
          {t('Month View')}
        </span>
      </Menu.Item>
      <Menu.Item key="week">
        <span className="flex items-center gap-2">
          <TableOutlined />
          {t('Week View')}
        </span>
      </Menu.Item>
    </Menu>
  );

  // Hàm xử lý chuyển tháng
  const handlePrevMonth = () => {
    setSelectedDate(selectedDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate(selectedDate.add(1, 'month'));
  };

  return (
    <div className="w-full bg-white">
      <Helmet>
        <title>ITM - {t('Time Tracking')}</title>
      </Helmet>
      <div className="h-screen">
        <div className="w-full p-2 flex items-center justify-end bg-white">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button className="border-none p-2 bg-none shadow-none">
              <CalendarOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className="p-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Button onClick={handlePrevMonth} icon={<LeftOutlined />} />
              <span className="font-semibold mx-2">
                {t(`months.${selectedDate.format('M')}`)} {selectedDate.format('YYYY')}
              </span>
              <Button onClick={handleNextMonth} icon={<RightOutlined />} />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {monthDates.map((date, index) => (
              <div
                key={index}
                className={`text-center rounded-lg pb-1 ${getColorForDate(date)} ${date.isSame(highlightedDate, 'day') ? 'bg-blue-100' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                <span className="text-xs text-gray-500 ">
                  {date.format('ddd')}
                </span>
                <br />
                {date.format('DD')}
              </div>
            ))}
          </div>
        </div>

        <Drawer
          title={t('Check-in Details')}
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          width={500}
        >
          <Table
            columns={[
              {
                title: t('Check In'),
                dataIndex: 'check_in',
                key: 'check_in',
                render: (text) => moment(text).format('HH:mm'),
              },
              {
                title: t('Check Out'),
                dataIndex: 'check_out',
                key: 'check_out',
                render: (text) => moment(text).format('HH:mm'),
              },
            ]}
            dataSource={checkInOutHistory}
            pagination={false}
            locale={{ emptyText: t('No Data') }}
          />
        </Drawer>
      </div>
    </div>
  );
}