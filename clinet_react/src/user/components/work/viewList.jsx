import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  ClockCircleOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { GetTimekeepingUser } from '../../../features/timekeeping/getTimeKeeping'

import { Tag, Button } from 'antd'
import moment from 'moment'

const ArrowRightIcon = () => {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
const ArrowLeftIcon = () => {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default function ListView({ setViewModeList, viewModeList }) {
  const { t } = useTranslation();

  const [groupBy, setGroupBy] = useState('day');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [showListContent, setListContent] = useState(false);
  const [highlightedDate, setHighlightedDate] = useState(moment());
  const [isMobile, setIsMobile] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 820;
      setIsMobile(mobile);

      if (!mobile) {
        navigate('/u/action=6/time_tracking');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const now = selectedDate;
      const monthYear = `${String(now.month() + 1).padStart(2, '0')}-${now.year()}`;
      const cid = "VM31122002";
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
  }, [selectedDate]); // 

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setHighlightedDate(date);
    setListContent(true);
  };

  const getWeekDates = (date) => {
    const startOfWeek = date.clone().startOf('week');
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, 'days'),
    );
  };

  const getMonthDates = (date) => {
    const startOfMonth = date.clone().startOf('month');
    const endOfMonth = date.clone().endOf('month');
    const monthDates = [];

    for (
      let d = startOfMonth.clone();
      d.isBefore(endOfMonth.clone().add(1, 'days'));
      d.add(1, 'days')
    ) {
      if (d.month() === date.month()) {
        monthDates.push(d.clone());
      }
    }
    return monthDates;
  };

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().add(1, 'month'));
  };

  const weekDates = getWeekDates(selectedDate);
  const monthDates = getMonthDates(selectedDate);

  const getColorForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dateData = data.find(item => item.date === dateStr);

    if (dateData) {
      const records = dateData.records;

      const hasArrival = records.some(record => record.WkItemSeq === 29); // Giờ đến (ERP)
      const hasDeparture = records.some(record => record.WkItemSeq === 43); // Giờ về thực tế (ERP)
      const hasOT = records.some(record => record.IsOT === 1); // Làm thêm giờ (OT)


      if (hasArrival && hasDeparture) {
        return hasOT
          ? 'bg-purple-200 text-purple-800'
          : 'bg-green-200 text-green-800';
      } else if (hasArrival || hasDeparture) {
        return 'bg-yellow-200 text-yellow-800';
      } else {
        return 'bg-red-200 text-red-800';
      }
    }
    return '';
  };


  return (
    <div className="  h-screen overflow-auto  bg-white">
      <div className="p-2">
        {viewModeList === 'month' && (
          <div className="flex justify-between mb-4">
            <span className="font-semibold">
              {t(`months.${selectedDate.format('M')}`)} {selectedDate.format('YYYY')}
            </span>

            <div className="flex items-center gap-2">
              <Button className="border-none p-2 bg-white shadow-none" onClick={handlePrevMonth}>
                <ArrowLeftIcon />
              </Button>
              <Button className="border-none p-2 bg-white shadow-none" onClick={handleNextMonth}>
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        )}

        {viewModeList === 'month' ? (
          <div className="grid grid-cols-7 gap-2">
            {monthDates.map((date, index) => (
              <div
                key={index}
                className={`text-center rounded-lg pb-1 ${getColorForDate(date)} ${date.isSame(highlightedDate, 'day') ? 'bg-blue-100' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                {index < 7 && (
                  <span className="text-xs text-gray-500 ">
                    {date.format('ddd')}
                  </span>
                )}
                <br />
                {date.format('DD')}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-between rounded-lg mb-4">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`flex-1 text-center p-2 m-1 rounded-lg ${getColorForDate(date)} ${date.isSame(highlightedDate, 'day') ? 'bg-blue-100' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                <span className="text-xs text-gray-500">
                  {date.format('ddd')}
                </span>
                <br />
                {date.format('DD')}
              </div>
            ))}
          </div>
        )}
      </div>

 

        <div className="flex-1  h-screen p-4 bg-slate-50 rounded-3xl shadow-md">
          <h3 className="text-lg mb-2 font-semibold">
            {selectedDate.format('YYYY-MM-DD')}
          </h3>
          <h4 className="text-gray-800 mt-3 mb-3">Danh sách các bản ghi:</h4>

          <ul className=" pb-32 h-screen">
              {data.find(item => item.date === selectedDate.format('YYYY-MM-DD'))?.records.length > 0 ? (
                data.find(item => item.date === selectedDate.format('YYYY-MM-DD')).records.map((record, index) => (
                  <li key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
                    <h4 className="text-gray-500">{record?.WkItemName}</h4>
                    <p className="text-gray-800">{record?.DTime}</p>
                  </li>
                ))
              ) : (
                <li className="bg-gray-100 rounded-lg p-4 mb-4">Không có bản ghi nào</li>
              )}
            </ul>
        </div>
    </div>
  );
}
