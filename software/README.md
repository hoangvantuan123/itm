


# API Documentation for `res_groups`

| HTTP Method | Endpoint              | Description                         | Query Params            | Body Params                                                                                                                       |
|-------------|-----------------------|-------------------------------------|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **POST**    | `api/p/res_groups`          | Tạo một nhóm mới                   |                         | - `name` (string): Tên nhóm<br>- `category_id` (number): ID danh mục<br>- `color` (string): Màu sắc<br>- `create_uid` (number): ID người tạo<br>- `write_uid` (number): ID người sửa<br>- `comment` (string): Ghi chú<br>- `share` (boolean): Chia sẻ<br>- `create_date` (Date): Ngày tạo<br>- `write_date` (Date): Ngày sửa cuối cùng |
| **GET**     | `api/p/res_groups`          | Lấy danh sách nhóm có phân trang    | `page` (number): Trang hiện tại<br>`limit` (number): Số lượng bản ghi trên một trang |                                                                                                                                   |
| **GET**     | `api/p/res_groups/:id`      | Lấy thông tin nhóm theo `id`        |                         |                                                                                                                                   |
| **PUT**     | `api/p/res_groups/:id`      | Cập nhật thông tin nhóm theo `id`   |                         | - Các trường giống như POST                                                                                                       |
| **DELETE**  | `api/p/res_groups/:id`      | Xóa nhóm theo `id`                  |                         |                                                                                                                                   |

## Cách sử dụng API

### 1. Tạo nhóm mới (POST)
- **Endpoint**: `/res_groups`
- **Body**:
  ```json
  {
    "name": "Group Name",
    "category_id": 1,
    "color": "blue",
    "create_uid": 1,
    "write_uid": 1,
    "comment": "This is a comment",
    "share": true,
    "create_date": "2024-09-15T09:33:19.000Z",
    "write_date": "2024-09-15T09:33:19.000Z"
  }





/*  */


import { useState } from 'react'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Tag, Select, DatePicker } from 'antd'
const { RangePicker } = DatePicker
import moment from 'moment'

export default function ListView({ listData }) {
  const [groupBy, setGroupBy] = useState('day')
  const [selectedDate, setSelectedDate] = useState(moment())
  const [showListContent, setListContent] = useState(false)
  const [viewMode, setViewMode] = useState('week')
  const handleDateChange = (date) => {
    setSelectedDate(date)
    setListContent(!showListContent)
  }
  const groupedData = listData.reduce((acc, item) => {
    const { date } = item
    let groupKey = date // Mặc định theo ngày

    const itemDate = new Date(date)

    if (groupBy === 'month') {
      groupKey = `${itemDate.getFullYear()}-${itemDate.getMonth() + 1}` // Nhóm theo tháng
    } else if (groupBy === 'year') {
      groupKey = `${itemDate.getFullYear()}` // Nhóm theo năm
    }

    if (!acc[groupKey]) {
      acc[groupKey] = []
    }
    acc[groupKey].push(item)
    return acc
  }, {})

  // Sắp xếp các nhóm theo thứ tự giảm dần
  const sortedKeys = Object.keys(groupedData).sort(
    (a, b) => new Date(b) - new Date(a),
  )

  // Hàm kiểm tra màu của thẻ dựa trên Time In
  const getTimeInTagColor = (timeIn) => {
    const timeInDate = new Date(`1970-01-01T${timeIn}:00`)
    const eightAM = new Date('1970-01-01T08:00:00')
    const eightFifteenAM = new Date('1970-01-01T08:15:00')
    const eightThirtyAM = new Date('1970-01-01T08:30:00')

    if (timeInDate <= eightAM) {
      return <Tag color="green">Đúng giờ</Tag>
    } else if (timeInDate > eightAM && timeInDate <= eightFifteenAM) {
      return <Tag color="yellow">Muộn &lt; 15 phút</Tag>
    } else if (timeInDate > eightFifteenAM && timeInDate <= eightThirtyAM) {
      return <Tag color="orange">Muộn 15-30 phút</Tag>
    } else {
      return <Tag color="red">Muộn &gt; 30 phút</Tag>
    }
  }

  // Hàm kiểm tra màu của thẻ dựa trên Time Out
  const getTimeOutTagColor = (timeOut) => {
    const timeOutDate = new Date(`1970-01-01T${timeOut}:00`)
    const fivePM = new Date('1970-01-01T17:00:00')

    if (timeOutDate >= fivePM) {
      return <Tag color="green">Đủ giờ</Tag>
    } else {
      return <Tag color="red">Chưa đủ giờ</Tag>
    }
  }
  const getWeekDates = (date) => {
    const startOfWeek = date.clone().startOf('week')
    const weekDates = []

    for (let i = 0; i < 7; i++) {
      weekDates.push(startOfWeek.clone().add(i, 'days'))
    }

    return weekDates
  }

  const weekDates = getWeekDates(selectedDate)
  const getMonthDates = (date) => {
    const startOfMonth = date.clone().startOf('month')
    const endOfMonth = date.clone().endOf('month')
    const monthDates = []

    for (
      let d = startOfMonth;
      d.isBefore(endOfMonth.clone().add(1, 'days'));
      d.add(1, 'days')
    ) {
      monthDates.push(d.clone())
    }

    return monthDates
  }

  const monthDates = getMonthDates(selectedDate)

  return (
    <div>
      <div className="p-2">
      {showListContent !== true && (<> <div className="grid grid-cols-7 gap-2">
            {monthDates.map((date, index) => (
              <div
                key={index}
                className={`text-center p-2 ${date.isSame(moment(), 'day') ? ' bg-white rounded-lg' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                {index < 7 && ( 
                  <span className="text-xs">{date.format('ddd')}</span>
                )}
                <br />
                {date.format('DD')}
              </div>
            ))}
          </div></>)}
          {showListContent === true && (<>
            <div className="flex justify-between cursor-pointer bg-slate-50 h-24 rounded-b-xl p-2 border-gray-500">
            {weekDates.map((date, index) => (
              <div
                key={index}
                className={`flex-1 text-center p-2 ${date.isSame(moment(), 'day') ? ' bg-white rounded-lg' : ''}`}
                onClick={() => handleDateChange(date)}
              >
                <span className="text-xs">{date.format('ddd')}</span>
                <br />
                {date.format('DD')}
              </div>
            ))}
          </div>
</>)}

        
      </div>
      {showListContent && (
        <div className="h-full w-full p-4 ">
          <h3 className="text-xl mb-2 font-semibold">
            {selectedDate.format('YYYY-MM-DD')}
          </h3>
          <h4 className="text-gray-600 mb-4">Thời gian đã chấm công</h4>

          <div className="bg-blue-100 rounded-lg p-4 mb-4">
            <h4 className="text-blue-600">Check-in</h4>
            <p className="text-gray-800">14:00</p>
          </div>

          <div className="bg-green-100 rounded-lg p-4">
            <h4 className="text-green-600">Check-out</h4>
            <p className="text-gray-800">12:00</p>
          </div>
        </div>
      )}

      {showListContent === false && (
        <>
          <div className=" items-center flex p-2 justify-between">
            <Select
              className="mb-3   right-0"
              value={groupBy}
              onChange={(value) => setGroupBy(value)}
              options={[
                { value: 'day', label: 'Theo ngày' },
                { value: 'month', label: 'Theo tháng' },
                { value: 'year', label: 'Theo năm' },
              ]}
            />
          </div>

          <div className="p-2">
            <div className="divide-y w-full  pb-20  lg:pb-0 divide-gray-200 rounded-xl border border-gray-200 bg-white">
              {sortedKeys.map((key, index) => {
                const itemsForKey = groupedData[key]

                return (
                  <details
                    className="group w-full p-4 [&_summary::-webkit-details-marker]:hidden"
                    open
                    key={index}
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                      <h2 className="text-base font-medium">{key}</h2>
                      <span className="relative size-5 shrink-0">
                        <svg
                          className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div>
                      {itemsForKey.map((item, itemIndex) => {
                        const timeIn = item.records[0].timeIn
                        const timeOut = item.records[0].timeOut

                        return (
                          <div
                            key={itemIndex}
                            className="mt-2 grid grid-rows-2 grid-cols-2 gap-4 items-center"
                          >
                            {groupBy !== 'day' ? (
                              <div className="col-span-2  text-gray-700 text-sm font-medium">
                                {item.date}
                              </div>
                            ) : null}

                            <>
                              <div className="flex items-center gap-2">
                                <ClockCircleOutlined
                                  style={{ color: '#1890ff' }}
                                />
                                <span className="text-sm text-gray-600">
                                  Time In:
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  {timeIn}
                                </span>
                                {getTimeInTagColor(timeIn)}
                              </div>
                            </>

                            <>
                              <div className="flex items-center gap-2">
                                <ClockCircleOutlined
                                  style={{ color: '#52c41a' }}
                                />
                                <span className="text-sm text-gray-600">
                                  Time Out:
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                  {timeOut}
                                </span>
                                {getTimeOutTagColor(timeOut)}
                              </div>
                            </>
                          </div>
                        )
                      })}
                    </div>
                  </details>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
