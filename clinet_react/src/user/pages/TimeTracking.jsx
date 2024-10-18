import {
  CalendarOutlined,
  TableOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Table,
  Drawer,
  Button,
  Dropdown,
  Menu,
} from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { GetTimekeepingUser } from '../../features/timekeeping/getTimeKeeping';

dayjs.extend(utc);
dayjs.extend(timezone);

export default function TimeTracking({ isMobile }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const now = dayjs().tz('Asia/Ho_Chi_Minh'); // Current date
  const [selectedDate, setSelectedDate] = useState(now); // Current month
  const [highlightedDate, setHighlightedDate] = useState(now); // Highlighted day
  const [checkInOutHistory, setCheckInOutHistory] = useState([]); // Records for the selected date
  const [data, setData] = useState([]); // Month data
  const [loading, setLoading] = useState(true); // Loading state
  const [drawerVisible, setDrawerVisible] = useState(false); // Drawer visibility
  const [tableData, setTableData] = useState([]); // Data for the table

  const fetchData = async () => {
    setLoading(true);
    try {
      const monthYear = `${String(selectedDate.month() + 1).padStart(2, '0')}-${selectedDate.year()}`;
      const cid = 'VM31122002'; // Replace with the actual ID
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

  // Fetch data when selectedDate changes (month or year change)
  useEffect(() => {
    fetchData();
    if (isMobile) {
      navigate('/u/phone/work');
    }
  }, [selectedDate, isMobile]); // Re-run whenever `selectedDate` changes

  const handleDateChange = (date) => {
    setHighlightedDate(date);
    const records = data.find((item) => item.date === date.format('YYYY-MM-DD'))?.records || [];
    setCheckInOutHistory(records);
    setDrawerVisible(true);

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
        case 74: //Thêm giờ ca đêm 210%
          values.overtime_normal_210 = record.DTime || 0;
          break;
        case 40: //Ban Đêm
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

    setTableData([
      { key: t('hr_payroll.start'), value: values.start },
      { key: t('hr_payroll.stop'), value: values.stop },
      { key: t('hr_payroll.day_off'), value: values.day_off },
      { key: t('hr_payroll.overtime_normal_150'), value: values.overtime_normal_150 },
      { key: t('hr_payroll.overtime_normal_200'), value: values.overtime_normal_200 },
      { key: t('hr_payroll.overtime_normal_210'), value: values.overtime_normal_210 },
      { key: t('hr_payroll.at_night'), value: values.at_night },
      { key: t('hr_payroll.overtime_sunday_200'), value: values.overtime_sunday_200 },
      { key: t('hr_payroll.overtime_sunday_270'), value: values.overtime_sunday_270 },
      { key: t('hr_payroll.overtime_holiday_300'), value: values.overtime_holiday_300 },
      { key: t('hr_payroll.overtime_holiday_390'), value: values.overtime_holiday_390 },
      { key: t('hr_payroll.working_day'), value: values.working_day },
      { key: t('hr_payroll.late_in'), value: values.late_in },
      { key: t('hr_payroll.early_out'), value: values.early_out },
    ]);
  };

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => prevDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.add(1, 'month'));
  };

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

  const monthDates = Array.from(
    { length: selectedDate.daysInMonth() },
    (_, i) => dayjs(selectedDate).date(i + 1)
  );

  const menu = (
    <Menu
      onClick={({ key }) => { }}
      items={[
        {
          key: 'month',
          label: (
            <span className="flex items-center gap-2">
              <CalendarOutlined />
              {t('Month View')}
            </span>
          ),
        },
      ]}
    />
  );

  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Helmet>
        <title>ITM - {t('Time Tracking')}</title>
      </Helmet>

      {/* Header */}
      <div className="w-full p-2 flex items-center justify-between bg-white border-b">
        <Button icon={<LeftOutlined />} onClick={handlePrevMonth} />
        <span className="font-semibold">
          {t(`months.${selectedDate.format('M')}`)} {selectedDate.format('YYYY')}
        </span>
        <Button icon={<RightOutlined />} onClick={handleNextMonth} />
      </div>
      <div className="flex gap-4 p-2 ">
  
    {/* Trạng thái Xanh Lá */}
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 bg-green-200 rounded-md"></div>
      <span className="text-green-800 text-xs">Đã vào và ra đúng giờ</span>
    </div>

    {/* Trạng thái Vàng */}
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 bg-yellow-200 rounded-md"></div>
      <span className="text-yellow-800 text-xs">Chỉ có vào hoặc ra</span>
    </div>

    {/* Trạng thái Đỏ */}
    <div className="flex items-center gap-3">
      <div className="w-4 h-4 bg-red-200 rounded-md"></div>
      <span className="text-red-800 text-xs">Thiếu thông tin vào/ra hoặc là ngày nghỉ</span>
    </div>
   
  </div>
      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7  gap-4 p-4">
        {monthDates.map((date, index) => (
          <div
            key={index}
            className={`h-32 text-center rounded-lg flex flex-col p-4 cursor-pointer hover:bg-blue-50 ${getColorForDate(date)}
              ${date.isSame(highlightedDate, 'day') ? 'bg-blue-100' : ''}`}
            onClick={() => handleDateChange(date)}
          >
            <span className="text-sm text-gray-500">{date.format('ddd')}</span>
            <span className="text-lg font-semibold">{date.format('DD')}</span>
          </div>
        ))}
      </div>


      {/* Drawer for Attendance Records */}
      <Drawer
        title={t('Attendance Records')}
        closable
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={700}
      >
        <Table
          dataSource={tableData}

          bordered
          columns={[
            {
              title: t('hr_payroll.category'),
              dataIndex: 'key',
              key: 'key',
            },
            {
              title: t('hr_payroll.value'),
              dataIndex: 'value',
              key: 'value',
            },
          ]}
          pagination={false}
          loading={loading}
        />
      </Drawer>
    </div>
  );
}
