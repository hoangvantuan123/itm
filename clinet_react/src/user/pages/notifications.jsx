import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import {
  Input,
  Space,
  Table,
  Typography,
  message,
  Menu,
  Layout,
  List,
  Modal,
  Button,
  Drawer,
} from 'antd'
const { Search } = Input
const { Title, Text } = Typography
import decodeJWT from '../../utils/decode-JWT'
import 'moment/locale/vi'
import '../../static/css/scroll_container.css'
import '../../static/css/drawer_search.css'
import {
  InboxOutlined,
  SaveOutlined,
  FilterOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const { Sider, Content } = Layout

export default function Notifications() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const userId = userFromLocalStorage.id
  const pageSize = 100
  const { t } = useTranslation()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (value) => {
    setDrawerVisible(false) // Đóng drawer sau khi tìm kiếm
  }
  const [selectedMenu, setSelectedMenu] = useState('inbox')
  const [notifications, setNotifications] = useState([])
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  const fetchNotifications = useCallback((menuKey) => {
    const data = [
      {
        key: '1',
        title: 'Thông báo về công việc',
        content: 'Bạn có một cuộc họp lúc 10:00 sáng ngày mai.',
        time: '2024-09-23 09:00',
      },
      {
        key: '2',
        title: 'Thông báo chấm công',
        content: 'Bạn đã chấm công thành công vào lúc 8:30 sáng.',
        time: '2024-09-23 08:30',
      },
      {
        key: '3',
        title: 'Tin tức mới',
        content: 'Hôm nay sẽ có một bản cập nhật phần mềm vào lúc 3:00 chiều.',
        time: '2024-09-23 15:00',
      },
      {
        key: '4',
        title: 'Thông báo nghỉ lễ',
        content: 'Công ty sẽ nghỉ lễ vào ngày 2 tháng 9.',
        time: '2024-09-02 00:00',
      },
      {
        key: '5',
        title: 'Thông báo khen thưởng',
        content: 'Bạn đã được khen thưởng cho hiệu suất làm việc xuất sắc.',
        time: '2024-09-22 10:00',
      },
      {
        key: '6',
        title: 'Thông báo về dự án',
        content: 'Dự án ABC đã hoàn thành giai đoạn đầu tiên.',
        time: '2024-09-21 14:00',
      },
      {
        key: '7',
        title: 'Thông báo khẩn cấp',
        content: 'Hệ thống sẽ bảo trì vào tối nay từ 10:00 đến 11:00.',
        time: '2024-09-23 22:00',
      },
      {
        key: '8',
        title: 'Thông báo đào tạo',
        content: 'Có một buổi đào tạo vào thứ Sáu lúc 1:00 chiều.',
        time: '2024-09-29 13:00',
      },
      {
        key: '9',
        title: 'Thông báo về sự kiện',
        content: 'Sự kiện công ty sẽ diễn ra vào ngày 20 tháng 11.',
        time: '2024-11-20 09:00',
      },
      {
        key: '10',
        title: 'Thông báo tuyển dụng',
        content: 'Công ty đang tìm kiếm ứng viên cho vị trí Marketing.',
        time: '2024-09-20 16:00',
      },
      {
        key: '11',
        title: 'Thông báo tuyển dụng',
        content: 'Công ty đang tìm kiếm ứng viên cho vị trí Marketing.',
        time: '2024-09-20 16:00',
      },
      {
        key: '12',
        title: 'Thông báo tuyển dụng',
        content: 'Công ty đang tìm kiếm ứng viên cho vị trí Marketing.',
        time: '2024-09-20 16:00',
      },
      {
        key: '13',
        title: 'Thông báo tuyển dụng',
        content: 'Công ty đang tìm kiếm ứng viên cho vị trí Marketing.',
        time: '2024-09-20 16:00',
      },
      {
        key: '14',
        title: 'Thông báo tuyển dụng',
        content: 'Công ty đang tìm kiếm ứng viên cho vị trí Marketing.',
        time: '2024-09-20 16:00',
      },
      {
        key: '15',
        title: 'Thông báo tuyển dụng 15',
        content: 'Công ty đang tìm kiếm ứng viên cho vị trí Marketing.',
        time: '2024-09-20 16:00',
      },
    ]

    setNotifications(data)
  }, [])

  useEffect(() => {
    fetchNotifications(selectedMenu)
  }, [selectedMenu, fetchNotifications])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobile])

  // Columns for the desktop table
  const columns = [
    {
      title: t('notification_title'),
      dataIndex: 'title',
      key: 'title',
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: t('notification_content'),
      dataIndex: 'content',
      key: 'content',
    },
  ]

  return (
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>ITM - {t('page_notifications.notifications')}</title>
      </Helmet>
      <Layout className="h-full">
        {!isMobile && (
          <Sider width={250} className="bg-white">
            <Menu
              mode="inline"
              selectedKeys={[selectedMenu]}
              onClick={({ key }) => setSelectedMenu(key)}
              className="h-full"
            >
              <Menu.Item key="inbox" icon={<InboxOutlined />}>
                {t('menu_inbox')}
              </Menu.Item>
              <Menu.Item key="saved" icon={<SaveOutlined />}>
                {t('menu_saved')}
              </Menu.Item>
              <Menu.Item key="filters" icon={<FilterOutlined />}>
                {t('menu_filters')}
              </Menu.Item>
            </Menu>
          </Sider>
        )}

        <Layout className="h-screen overflow-auto ">
          <Content className="p-3  pb-14 bg-slate-50">
            {/* Display 'Inbox' title only if on mobile */}
            {isMobile && (
              <div className="flex items-center justify-end">
                <Button
                  onClick={() => setDrawerVisible(true)}
                  className="mb-4 text-xl border-none  p-2 bg-none shadow-none"
                >
                  <SearchOutlined />
                </Button>
              </div>
            )}
            {isMobile && (
              <div className="mb-4">
                <Title level={4}>{t('Thông báo')}</Title>
              </div>
            )}

            {!isMobile ? (
              <Space className="mb-4 w-full">
                <Search
                  placeholder={t('search_notifications')}
                  onSearch={handleSearch}
                  enterButton
                  className={`w-full ${!isMobile && 'md:w-96'}`}
                />
              </Space>
            ) : (
              <div className="flex gap-2 mb-2 ">
                <span className="whitespace-nowrap rounded-full bg-slate-200 px-2.5 py-1 text-sm ">
                  notifications
                </span>
                <span className="whitespace-nowrap rounded-full bg-slate-200 px-2.5 py-1 text-sm ">
                  unread
                </span>
                <span className="whitespace-nowrap rounded-full bg-slate-200 px-2.5 py-1 text-sm ">
                  filters
                </span>
              </div>
            )}
            <div className="pb-36">
              {' '}
              {!isMobile ? (
                <Table
                  columns={columns}
                  dataSource={notifications}
                  pagination={{ pageSize }}
                  onRow={(record) => ({
                    onClick: () => message.info(`Nội dung: ${record.content}`),
                  })}
                  className="w-full"
                />
              ) : (
                <List
                  itemLayout="horizontal"
                  dataSource={notifications}
                  renderItem={(item) => (
                    <List.Item
                      key={item.key}
                      onClick={() => message.info(`Nội dung: ${item.content}`)}
                      className="border-b  p-4  cursor-pointer"
                    >
                      <List.Item.Meta
                        title={
                          <div className="flex justify-between w-full">
                            <Text strong>{item.title}</Text>
                            <Text type="secondary">{item.time}</Text>
                          </div>
                        }
                        description={item.content}
                      />
                    </List.Item>
                  )}
                />
              )}
            </div>
          </Content>
        </Layout>
        {isMobile && (
          <>
            <Drawer
              placement="bottom"
              closable={false}
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
              height="95%"
              bodyStyle={{ padding: '16px' }} // Thêm padding cho nội dung
            >
              <div className="flex  items-center gap-2">
                <div className="relative w-full">
                  <label htmlFor="Search" className="sr-only w-full ">
                    {' '}
                    Search{' '}
                  </label>

                  <input
                    type="text"
                    id="Search"
                    placeholder="Search for..."
                    className="w-full rounded-md border-gray-200  px-2 border py-1 pe-10 shadow-sm sm:text-sm"
                  />

                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button
                      type="button"
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <span className="sr-only">Search</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
                <Button
                  onClick={() => setDrawerVisible(false)}
                  style={{ width: '20%' }}
                  className="border-none hover:border-none shadow-none p-0"
                >
                  Cancel
                </Button>
              </div>
            </Drawer>
          </>
        )}
      </Layout>
    </div>
  )
}
