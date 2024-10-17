import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
import { Link } from 'react-router-dom'

const { Search } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs
import { UsergroupAddOutlined } from '@ant-design/icons'
import '../../static/css/scroll_container.css'
const { Option } = Select
import 'moment/locale/vi'

export default function GeneralSettings() {
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
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>ITM - {t('page_setting.helmet_setting')}</title>
      </Helmet>
      <div className="h-full pb-20 lg:pb-4">
        <div className="h-full p-2 overflow-auto scrollable-content">
          <div className="p-2 mb-5">
            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl ">
              {t(' Thiết lập chung')}
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              {t(
                'Thay đổi các thiết lập chung của hệ thống để tối ưu hóa hoạt động và trải nghiệm người dùng.',
              )}
            </p>
          </div>

          <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
            <details
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="text-lg font-medium">{t('Người dùng')}</h2>

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
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 rounded-lg  transition  "
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="Option1"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {' '}
                        {t('Chỉnh hồ sơ nhân viên')}{' '}
                      </strong>

                      <p className="mt-1 text-pretty text-sm text-gray-700">
                        {t(
                          ' Cho phép nhân viên cập nhật dữ liệu của chính họ.',
                        )}
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
                    {t(' *** Người dùng hoạt động')}
                  </strong>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    <Link to="/u/action=2/users">
                      {t('Quản lý người dùng')}
                    </Link>
                  </p>
                </div>
              </div>
            </details>

            <details
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="text-lg font-medium">{t('Ngôn ngữ')}</h2>

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
                    {t('Quản lý ngôn ngữ')}
                  </p>
                </div>
              </div>
            </details>
            <details
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="text-lg font-medium">{t('Công ty')}</h2>

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
                    <strong className="font-medium text-gray-900">
                      {' '}
                      Công ty A{' '}
                    </strong>

                    <p className="mt-1 text-pretty text-sm text-gray-700">
                      Địa chỉ A
                    </p>
                    <p className="mt-1 text-pretty text-sm text-gray-700">
                      Địa chỉ B
                    </p>
                    <p className="mt-1 text-pretty text-sm text-gray-700">
                      Việt Nam
                    </p>
                    <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                      Cập nhật thông tin công ty
                    </p>
                  </div>
                </div>
                <div className="h-auto rounded-lg  p-2">
                  <div>
                    <strong className="font-medium text-gray-900">
                      {' '}
                      1 Công ty
                    </strong>

                    <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                      {t(' Quản lý công ty')}
                    </p>
                  </div>
                </div>
              </div>
            </details>
            <details
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="text-lg font-medium">
                  {t('Các quyền truy cập')}
                </h2>

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
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 rounded-lg  transition  "
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="Option1"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {' '}
                        {t('Tài khoản khách hàng')}{' '}
                      </strong>

                      <p className="mt-1 text-pretty text-sm text-gray-700">
                        {t(
                          ' Cho phép khách hàng đăng nhập để xem các tài liệu của họ',
                        )}
                      </p>

                      <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                        {t('  Quản lý quyền truy cập')}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
                <div className="h-auto rounded-lg  p-2">
                  <label
                    htmlFor="Option1"
                    className="flex cursor-pointer items-start gap-4 rounded-lg  transition  "
                  >
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="Option1"
                      />
                    </div>

                    <div>
                      <strong className="font-medium text-gray-900">
                        {' '}
                        {t(' Đặt lại mật khẩu')}{' '}
                      </strong>

                      <p className="mt-1 text-pretty text-sm text-gray-700">
                        {t('Cho phép đặt lại mật khẩu từ trang Đăng nhập')}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </details>
            <details
              className="group p-6 [&_summary::-webkit-details-marker]:hidden"
              open
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="text-lg font-medium">{t('Phím tắt')}</h2>

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
                    {t('Người sử dụng')}
                  </h3>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    <Link to="/u/action=2/users">
                      {t('Quản lý người dùng')}
                    </Link>
                  </p>

                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    <Link to="/u/action=3/groups_users">
                      {' '}
                      {t('Quản lý nhóm người dùng')}
                    </Link>
                  </p>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    <Link to="/a/action=8/personnel">
                      {t('Quản lý nhân viên')}
                    </Link>
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
                    {t(' Kỹ thuật')}
                  </h3>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    {t(' Quản lý quyền truy cập')}
                  </p>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    <Link to="/u/action=5/technique_menu">
                      {t('Quản lý menu')}
                    </Link>
                  </p>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    {t('Hồ sơ mô-đun')}
                  </p>
                </div>
                <div className="h-32 rounded-lg ">
                  {' '}
                  <h3 className="mt-2 max-w-md cursor-pointer text-pretty  mb-4 text-base">
                    {t(' Nhật ký')}
                  </h3>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    {t('Nhật ký hoạt động')}
                  </p>
                  <p className="mt-2 max-w-md cursor-pointer text-pretty text-sm text-indigo-500">
                    {t('Nhật ký truy cập')}
                  </p>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
