import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  Input,
  Space,
  Table,
  Form,
  Typography,
  Select,
  message,
  Tabs,
} from 'antd'

const { Search } = Input
import decodeJWT from '../../utils/decode-JWT'
const { Title, Text } = Typography
const { TabPane } = Tabs
import { UsergroupAddOutlined } from '@ant-design/icons'
import '../../static/css/scroll_container.css'
const { Option } = Select
import 'moment/locale/vi'

export default function PhoneGeneralSettings() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const userId = userFromLocalStorage.id
  const page = 1
  const pageSize = 100
  const { t } = useTranslation()
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'en',
  )
  const onFinish = (values) => {
    try {
      setLanguage(values.language)
      localStorage.setItem('language', values.language)
      message.success(t('personal_settings_key_menu_02.success'))
    } catch (error) {
      message.error(t('personal_settings_key_menu_02.error'))
    }
  }
  return (
    <div className="w-ful">
      <div className="h-full">
        <div className="p-2 mb-2">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl ">
            Cài đặt
          </h1>
        </div>

        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
          <details
            className="group p-3 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-lg font-medium">Người dùng</h2>

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
              <div className="h-auto rounded-lg  p-2">
                <label
                  for="Option1"
                  class="flex cursor-pointer items-start gap-4 rounded-lg  transition  "
                >
                  <div class="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      class="size-4 rounded border-gray-300"
                      id="Option1"
                    />
                  </div>

                  <div>
                    <strong class="font-medium text-gray-900">
                      {' '}
                      Chỉnh hồ sơ nhân viên{' '}
                    </strong>

                    <p class="mt-1 text-pretty text-sm text-gray-700">
                      Cho phép nhân viên cập nhật dữ liệu của chính họ.
                    </p>
                  </div>
                </label>
              </div>
              <div className="h-auto rounded-lg  p-2">
                <strong className="font-medium text-gray-900 flex gap-2 items-center ">
                  <UsergroupAddOutlined
                    style={{
                      fontSize: '24px',
                    }}
                  />
                  3000 Người dùng hoạt động
                </strong>

                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=2/users">Quản lý người dùng</Link>
                </p>
              </div>
            </div>
          </details>

          <details
            className="group p-3 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-lg font-medium">Ngôn ngữ</h2>

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
              <div className="h-auto rounded-lg  p-2">
                <Form
                  name="notification_settings"
                  onFinish={onFinish}
                  autoComplete="off"
                  layout="vertical"
                  initialValues={{ language }}
                >
                  <Form.Item
                    label={t('personal_settings_key_menu_02.language')}
                    name="language"
                  >
                    <Select
                      size="large"
                      style={{ width: '200px' }}
                      value={language}
                      onChange={(value) => setLanguage(value)}
                    >
                      <Option value="vi">
                        {t('personal_settings_key_menu_02.vietnamese')}
                      </Option>
                      <Option value="en">
                        {t('personal_settings_key_menu_02.english')}
                      </Option>
                    </Select>
                  </Form.Item>
                </Form>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  Quản lý ngôn ngữ
                </p>
              </div>
            </div>
          </details>
          <details
            className="group p-3 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-lg font-medium">Công ty</h2>

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
              <div className="h-auto rounded-lg  p-2">
                <div>
                  <strong class="font-medium text-gray-900"> Công ty A </strong>

                  <p class="mt-1 text-pretty text-sm text-gray-700">
                    Địa chỉ A
                  </p>
                  <p class="mt-1 text-pretty text-sm text-gray-700">
                    Địa chỉ B
                  </p>
                  <p class="mt-1 text-pretty text-sm text-gray-700">Việt Nam</p>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    Cập nhật thông tin công ty
                  </p>
                </div>
              </div>
              <div className="h-auto rounded-lg  p-2">
                <div>
                  <strong class="font-medium text-gray-900"> 1 Công ty</strong>

                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    Quản lý công ty
                  </p>
                </div>
              </div>
            </div>
          </details>
          <details
            className="group p-3 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-lg font-medium">Các quyền truy cập</h2>

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
              <div className="h-auto rounded-lg  p-2">
                <label
                  for="Option1"
                  class="flex cursor-pointer items-start gap-4 rounded-lg  transition  "
                >
                  <div class="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      class="size-4 rounded border-gray-300"
                      id="Option1"
                    />
                  </div>

                  <div>
                    <strong class="font-medium text-gray-900">
                      {' '}
                      Tài khoản khách hàng{' '}
                    </strong>

                    <p class="mt-1 text-pretty text-sm text-gray-700">
                      Cho phép khách hàng đăng nhập để xem các tài liệu của họ
                    </p>

                    <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                      Quản lý quyền truy cập
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
              <div className="h-auto rounded-lg  p-2">
                <label
                  for="Option1"
                  class="flex cursor-pointer items-start gap-4 rounded-lg  transition  "
                >
                  <div class="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      class="size-4 rounded border-gray-300"
                      id="Option1"
                    />
                  </div>

                  <div>
                    <strong class="font-medium text-gray-900">
                      {' '}
                      Đặt lại mật khẩu{' '}
                    </strong>

                    <p class="mt-1 text-pretty text-sm text-gray-700">
                      Cho phép đặt lại mật khẩu từ trang Đăng nhập
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </details>
          <details
            className="group p-3 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="text-lg font-medium">Phím tắt</h2>

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-5">
              <div className="h-auto rounded-lg ">
                <h3 className="mt-2 max-w-md cursor-pointer text-pretty  mb-4 text-base">
                  Người sử dụng
                </h3>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=2/users">Quản lý người dùng</Link>
                </p>

                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=3/groups_users">
                    {' '}
                    Quản lý nhóm người dùng
                  </Link>
                </p>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/a/action=8/personnel">Quản lý nhân viên</Link>
                </p>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=17/employee-interview-data">Quản lý tuyển dụng</Link>
                </p>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=20/data-employee">Danh sách nhân sự</Link>
                </p>

                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=20/data-salary">Quản lý chấm công</Link>
                </p>

              </div>
              <div className="h-32 rounded-lg ">
                <h3 className="mt-2 max-w-md cursor-pointer text-pretty  mb-4 text-base">
                  Kỹ thuật
                </h3>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  Quản lý quyền truy cập
                </p>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  <Link to="/u/action=5/technique_menu">Quản lý menu</Link>
                </p>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  Hồ sơ mô-đun
                </p>
              </div>
              <div className="h-32 rounded-lg ">
                {' '}
                <h3 className="mt-2 max-w-md cursor-pointer text-pretty  mb-4 text-base">
                  Nhật ký
                </h3>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  Nhật ký hoạt động
                </p>
                <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                  Nhật ký truy cập
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
