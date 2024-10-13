import { useState } from 'react'
import { Table, Input, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const salaryData = [
  // Dữ liệu mẫu
  {
    key: '1',
    date: '2024-09-01',
    timeIn: '08:00',
    timeOut: '17:00',
    status: 'Present',
  },
  {
    key: '2',
    date: '2024-09-02',
    timeIn: '08:15',
    timeOut: '17:05',
    status: 'Present',
  },
  {
    key: '3',
    date: '2024-09-03',
    timeIn: '09:00',
    timeOut: '18:00',
    status: 'Present',
  },
  {
    key: '4',
    date: '2024-09-04',
    timeIn: '08:30',
    timeOut: '17:30',
    status: 'Present',
  },
  {
    key: '5',
    date: '2024-09-05',
    timeIn: '08:00',
    timeOut: '12:00',
    status: 'Half Day',
  },
  {
    key: '6',
    date: '2024-09-06',
    timeIn: 'N/A',
    timeOut: 'N/A',
    status: 'Absent',
  },
  {
    key: '7',
    date: '2024-09-07',
    timeIn: '08:00',
    timeOut: '17:00',
    status: 'Present',
  },
  {
    key: '8',
    date: '2024-09-08',
    timeIn: '08:00',
    timeOut: '17:00',
    status: 'Present',
  },
  {
    key: '9',
    date: '2024-09-09',
    timeIn: '08:00',
    timeOut: '16:00',
    status: 'Present',
  },
  {
    key: '10',
    date: '2024-09-10',
    timeIn: '09:00',
    timeOut: '18:00',
    status: 'Present',
  },
]

export default function TableView() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = salaryData.filter((item) =>
    item.date.includes(searchTerm),
  )

  const totalWorkingHours = filteredData.reduce((total, record) => {
    const timeIn = moment(record.timeIn, 'HH:mm')
    const timeOut = moment(record.timeOut, 'HH:mm')

    if (timeIn.isValid() && timeOut.isValid()) {
      const duration = moment.duration(timeOut.diff(timeIn))
      return total + duration.asHours()
    }
    return total
  }, 0)

  const totalLateDays = filteredData.filter(
    (record) =>
      moment(record.timeIn, 'HH:mm').isValid() &&
      moment(record.timeIn, 'HH:mm').isAfter(moment('08:00', 'HH:mm')),
  ).length

  const totalAbsentDays = filteredData.filter(
    (record) => record.status === 'Absent',
  ).length

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
      render: (text, record) => (
        <span
          style={{
            color:
              record.timeIn &&
              moment(record.timeIn, 'HH:mm').isBefore(moment('08:00', 'HH:mm'))
                ? 'green'
                : 'red',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: t('Time Out'),
      dataIndex: 'timeOut',
      key: 'timeOut',
      render: (text, record) => (
        <span
          style={{
            color:
              record.timeOut &&
              moment(record.timeOut, 'HH:mm').isAfter(moment('17:00', 'HH:mm'))
                ? 'red'
                : 'green',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: t('Working Hours'),
      render: (text, record) => {
        const timeIn = moment(record.timeIn, 'HH:mm')
        const timeOut = moment(record.timeOut, 'HH:mm')

        if (timeIn.isValid() && timeOut.isValid()) {
          const duration = moment.duration(timeOut.diff(timeIn))
          return `${duration.hours()}h ${duration.minutes()}m`
        }
        return 'N/A'
      },
      key: 'workingHours',
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <div className="w-full h-screen overflow-auto  pb-36 p-3">
      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={12} sm={6}>
          <div className="border border-gray-300 rounded-lg bg-white p-4 text-center">
            <strong>{t('Total Working Hours')}</strong>
            <div>{totalWorkingHours.toFixed(2)}h</div>
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="border border-gray-300 rounded-lg bg-white p-4 text-center">
            <strong>{t('Total Late Days')}</strong>
            <div>{totalLateDays}</div>
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="border border-gray-300 rounded-lg bg-white p-4 text-center">
            <strong>{t('Total Absent Days')}</strong>
            <div>{totalAbsentDays}</div>
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="border border-gray-300 rounded-lg bg-white p-4 text-center">
            <strong>{t('Total Days')}</strong>
            <div>{filteredData.length}</div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Input
            placeholder={t('Search by date')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={false}
        locale={{ emptyText: t('No Data') }}
        scroll={{ x: true }}
        bordered
        className="bg-slate-50 cursor-pointer pb-0 md:pb-40"
      />
    </div>
  )
}
