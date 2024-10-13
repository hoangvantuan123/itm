import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  ClockCircleOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'

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
  const { t } = useTranslation()

  const [groupBy, setGroupBy] = useState('day')
  const [selectedDate, setSelectedDate] = useState(moment())
  const [showListContent, setListContent] = useState(false)
  const [highlightedDate, setHighlightedDate] = useState(moment())
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 820
      setIsMobile(mobile)

      if (!mobile) {
        navigate('/u/action=6/time_tracking')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [navigate])

  const handleDateChange = (date) => {
    setSelectedDate(date)
    setHighlightedDate(date)
    setListContent(true)
  }

  const getWeekDates = (date) => {
    const startOfWeek = date.clone().startOf('week')
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, 'days'),
    )
  }

  const getMonthDates = (date) => {
    const startOfMonth = date.clone().startOf('month')
    const endOfMonth = date.clone().endOf('month')
    const monthDates = []

    for (
      let d = startOfMonth.clone();
      d.isBefore(endOfMonth.clone().add(1, 'days'));
      d.add(1, 'days')
    ) {
      if (d.month() === date.month()) {
        monthDates.push(d.clone())
      }
    }
    return monthDates
  }

  const handlePrevMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().subtract(1, 'month'))
  }

  const handleNextMonth = () => {
    setSelectedDate((prevDate) => prevDate.clone().add(1, 'month'))
  }

  const weekDates = getWeekDates(selectedDate)
  const monthDates = getMonthDates(selectedDate)

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <div className="p-2">
        {/* Thêm nút điều hướng tháng */}
        {viewModeList === 'month' && (
          <div className="flex justify-between mb-4">
            <span className="font-semibold">
              {' '}
              {t(`months.${selectedDate.format('M')}`)}{' '}
              {selectedDate.format('YYYY')}
            </span>

            <div className="flex items-center gap-2">
              <Button
                className=" border-none  p-2  bg-white shadow-none"
                onClick={handlePrevMonth}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                className=" border-none  p-2  bg-white shadow-none"
                onClick={handleNextMonth}
              >
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
                className={`text-center rounded-lg pb-1 ${date.isSame(moment(), 'day') ? 'bg-blue-100 text-blue-600' : ''} ${date.isSame(highlightedDate, 'day') ? 'bg-blue-100' : ''}`}
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
          <div className="flex justify-between rounded-lg  mb-4">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`flex-1 text-center p-2  m-1 rounded-lg ${date.isSame(moment(), 'day') ? 'bg-blue-100 text-blue-600' : ''} ${date.isSame(highlightedDate, 'day') ? 'bg-blue-100' : ''}`}
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

      <div className="p-4 h-screen  pb-5 bg-white rounded-lg overflow-hidden">
        <h3 className="text-lg mb-2 font-semibold">
          {selectedDate.format('YYYY-MM-DD')}
        </h3>
        <h4 className="text-gray-600 mb-4">Thời gian đã chấm công</h4>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h4 className="text-blue-600">Check-in</h4>
          <p className="text-gray-800">14:00</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-4">
          <h4 className="text-green-600">Check-out</h4>
          <p className="text-gray-800">12:00</p>
        </div>
      </div>
    </div>
  )
}
