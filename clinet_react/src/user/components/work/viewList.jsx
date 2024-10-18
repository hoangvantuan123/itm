import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  ClockCircleOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  QuestionCircleOutlined
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
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const monthYear = `${String(selectedDate.month() + 1).padStart(2, '0')}-${selectedDate.year()}`;
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
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setHighlightedDate(date);
    setListContent(true);
  };
  const getWeekDates = (date) => {
    const startOfWeek = date.clone().startOf('isoWeek'); // Thứ Hai
    return Array.from({ length: 7 }, (_, i) => startOfWeek.clone().add(i, 'days'));
  };
  
  const getMonthDates = (date) => {
    const startOfMonth = date.clone().startOf('month'); 
    const endOfMonth = date.clone().endOf('month'); 
  
    const monthDates = [];
    for (let d = startOfMonth.clone(); d.isBefore(endOfMonth.clone().add(1, 'days')); d.add(1, 'days')) {
      monthDates.push(d.clone());
    }
  
    const firstDayOfMonth = monthDates[0].day(); 
    const daysToAdd = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); 
    const adjustedMonthDates = [];
    const startDate = startOfMonth.clone().subtract(daysToAdd, 'days');
  
    for (let i = 0; i < daysToAdd; i++) {
      adjustedMonthDates.push(startDate.clone().add(i, 'days'));
    }
  
    const allDates = adjustedMonthDates.concat(monthDates);
  
    const completeMonthDates = allDates.slice(0, 42);
    
    return completeMonthDates; 
  };
  
  


  const handlePrevMonth = () => setSelectedDate((prevDate) => prevDate.clone().subtract(1, 'month'));
  const handleNextMonth = () => setSelectedDate((prevDate) => prevDate.clone().add(1, 'month'));

  const weekDates = getWeekDates(selectedDate);
  const monthDates = getMonthDates(selectedDate);

  const getColorForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dateData = data.find((item) => item.date === dateStr);

    if (dateData) {
      const hasArrival = dateData.records.some((rec) => rec.WkItemSeq === 29);
      const hasDeparture = dateData.records.some((rec) => rec.WkItemSeq === 43);

      if (hasArrival && hasDeparture) {
        return 'bg-green-200 text-green-800';
      } else if (hasArrival || hasDeparture) {
        return 'bg-yellow-200 text-yellow-800';
      } else {
        return 'bg-red-200 text-red-800';
      }
    }
    return '';
  };

  // New function to process records and return an array of values
  const processRecords = (records) => {
    const values = {
      start: 0,
      stop: 0,
      day_off: 0,
      overtime_normal_150: 0,
      overtime_normal_200: 0,
      overtime_normal_210: 0,
      at_night: 0,
      overtime_sunday_200: 0,
      overtime_sunday_270: 0,
      overtime_holiday_300: 0,
      overtime_holiday_390: 0,
      working_day: 0,
      late_in: 0,
      early_out: 0,
    };

    records.forEach(record => {
      switch (record.WkItemSeq) {
        case 29: // Giờ vào thực tế
          values.start = record.DTime || 0;
          break;
        case 43: // Giờ về thực tế
          values.stop = record.DTime || 0;
          break;
        case 42: // Thêm giờ ca ngày 150%
          values.overtime_normal_150 = record.DTime || 0;
          break;
        case 41: // Tăng ca ngày thường ban đêm 200%
          values.overtime_normal_200 = record.DTime || 0;
          break;
        case 32: // Giờ về
          values.stop = record.DTime || 0;
          break;
        case 36: // Giờ vào
          values.start = record.DTime || 0;
          break;
        case 74: // Thêm giờ ca đêm 210%
          values.overtime_normal_210 = record.DTime || 0;
          break;
        case 40: // Ban Đêm
          values.at_night = record.DTime || 0;
          break;
        case 31: // Chủ nhật ca ngày 200%
          values.overtime_sunday_200 = record.DTime || 0;
          break;
        case 39: // 
          values.overtime_sunday_270 = record.DTime || 0;
          break;
        case 38: // 
          values.overtime_holiday_300 = record.DTime || 0;
          break;
        case 35: // 
          values.overtime_holiday_390 = record.DTime || 0;
          break;
        case 11: // 
          values.working_day = record.DTCnt || 0;
          break;
        case 34: // 
          values.late_in = record.DTime || 0;
          break;
        case 33: // 
          values.early_out = record.DTime || 0;
          break;
      }
    });

    return values;
  };

  // Get processed values for the selected date
  const currentRecords = data.find(item => item.date === selectedDate.format('YYYY-MM-DD'))?.records || [];
  const processedValues = processRecords(currentRecords);
  const getLabel = (key) => {
    const labels = {
      start: "Giờ vào thực tế",
      stop: "Giờ về thực tế",
      day_off: "Dayoff",
      overtime_normal_150: "Thêm giờ ca ngày 150%",
      overtime_normal_200: "Tăng ca ngày thường ban đêm 200%",
      overtime_normal_210: "Thêm giờ ca đêm 210%",
      at_night: "Ban Đêm",
      overtime_sunday_200: "Chủ nhật ca ngày 200%",
      overtime_sunday_270: "Tăng ca Chủ nhật 270%",
      overtime_holiday_300: "Thêm giờ ngày lễ 300%",
      overtime_holiday_390: "Thêm giờ ngày lễ 390%",
      working_day: "Số ngày làm việc",
      late_in: "Giờ đi muộn",
      early_out: "Giờ về sớm",
    };
  
    return labels[key] || key;
  };
  
  return (
    <div className="h-screen overflow-y-auto bg-white">
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
                  <span className="text-xs text-gray-500">
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

      <div className="h-full flex flex-col">
  <ul className="flex-1 pb-32 bg-slate-50 p-4 rounded-3xl shadow-md">
  <h3 className="text-lg mb-2 font-semibold">
    {selectedDate.format('YYYY-MM-DD')}
  </h3>
  <h4 className="text-gray-800 mt-3 mb-3">Danh sách các bản ghi:</h4>

    {currentRecords.length > 0 ? (
      Object.entries(processedValues).map(([key, value], index) => (
        <li key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
          <h4 className="text-gray-500">{getLabel(key)}</h4>
          <p className="text-gray-800">{value}</p>
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

