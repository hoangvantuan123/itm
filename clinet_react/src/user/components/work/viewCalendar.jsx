import { Calendar, Drawer } from 'antd'
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function CalendarView({
  sampleData,
  value,
  setValue,
  setDrawerVisible,
  setCheckInOutHistory,
}) {
  const { t } = useTranslation()

  const onSelect = (newValue) => {
    const selectedDate = newValue.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
    setValue(newValue)
    const data =
      sampleData.find((item) => item.date === selectedDate)?.records || []
    setCheckInOutHistory(data)
    setDrawerVisible(true)
  }

  const dateCellRender = (date) => {
    const selectedDate = date.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD')
    const record = sampleData.find((item) => item.date === selectedDate)

    if (!record) return <div></div>

    const icons = record.records.map((r, index) => {
      let icon = null
      if (r.status === 'Absent') {
        icon = (
          <CloseCircleOutlined style={{ color: 'red', fontSize: '16px' }} />
        )
      } else if (r.status === 'Late') {
        icon = (
          <ExclamationCircleOutlined
            style={{ color: 'yellow', fontSize: '16px' }}
          />
        )
      } else {
        icon = (
          <CheckCircleOutlined style={{ color: 'green', fontSize: '16px' }} />
        )
      }

      return (
        <div key={index} className="flex items-center gap-2">
          {icon}
          <span>{r.timeIn}</span>
        </div>
      )
    })

    return <div className="flex flex-col items-center">{icons}</div>
  }

  return (
    <Calendar
      className="p-1"
      value={value}
      onSelect={onSelect}
      dateCellRender={dateCellRender}
    />
  )
}
