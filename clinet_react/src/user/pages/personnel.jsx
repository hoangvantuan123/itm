import { useState, useEffect } from 'react'
import {
  Layout,
  Menu,
  Table,
  Button,
  Form,
  Input,
  Drawer,
  Card,
  Row,
  Col,
  Tag,
  Space,
  Dropdown,
  Select,
  Typography,
  Avatar,
  Menu as AntdMenu,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import 'moment/locale/vi'

const { Sider, Content } = Layout
import { PlusOutlined, UserOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import Search from '../components/search'
import ShowAction from '../components/action/showAction'
import PhoneSettingAction from '../components/phone/usersSettingAction'
import AddPersonnel from '../components/add/addPersonnel'
import UserProfile from '../components/hr/viewUserProfile'
import ImportAction from '../components/action/importAction'
import { GetAllResUsers } from '../../features/resUsers/getResUsers'
import { registerUser } from '../../features/auth/API/registerAPI'
import { GetUserGroupsPageLimitID } from '../../features/resUsers/getUserGroupsPageLimitID'
import { GetAllHrEmployeePageLimit } from '../../features/hr/getHrEmployeePageLimit'
import { GetAllDepartments } from '../../features/hr/getHrDepartmentsAll'
import '../../static/css/scroll_container.css'
import '../../static/css/drawer_cusstom.css'
import ImportForm from '../components/import'
const { Option } = Select
const { Title } = Typography
export default function Personnel() {
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false)
  const [phoneSettingUser, setPhoneSettingUser] = useState(null)
  const [showSttingActionDropdown, setShowSettingActionDropdown] =
    useState(false)

  /* GET */
  const [userData, setUserData] = useState([])
  const [groupsData, setGroupsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [actionUsers, setActionUsers] = useState(null)

  const handleOnClickAction = () => {
    setActionUsers('actionPersonnel')
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const openModalAddUser = () => {
    setIsModalOpenAddUser(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const closeModalAddUser = () => {
    setIsModalOpenAddUser(false)
  }
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    mobile_phone: true,
    work_email: true,
    employee_id: true,
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { t } = useTranslation()
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const fetchData = async () => {
    setLoading(true)

    try {
      const [response, responseAllResGroups] = await Promise.all([
        GetAllHrEmployeePageLimit(page, limit),
        GetAllDepartments(),
      ])

      if (response.success) {
        setUserData(response.data.data)
        setGroupsData(responseAllResGroups.data.data)
        setTotal(response.data.total)
        setTotalPages(response.data.totalPages)
        setError(null)
      } else {
        setError(response.message)
        setUserData([])
        setGroupsData([])
      }
    } catch (error) {
      setError(error.message || 'Đã xảy ra lỗi')
      setUserData([])
      setGroupsData([])
    } finally {
      setLoading(false)
    }
  }
  const fetchDataResAllUser = async () => {
    setLoading(true)

    try {
      const response = await GetAllHrEmployeePageLimit(page, limit)
      if (response.success) {
        setUserData(response.data.data)
        setTotal(response.data.total)
        setError(null)
      } else {
        setError(response.message)
        setUserData([])
      }
    } catch (error) {
      setError(error.message || 'Đã xảy ra lỗi')
      setUserData([])
    } finally {
      setLoading(false)
    }
  }
  const fetchDataOnClick = async (e) => {
    setLoading(true)
    /*  try {
       const response = await GetUserGroupsPageLimitID(e.key, page, limit)
       if (response.success) {
         setUserData(response.data.data)
         setTotal(response.data.total)
 
         setError(null)
       } else {
         setError(response.message)
         setUserData([])
       }
     } catch (error) {
       setError(error.message || 'Đã xảy ra lỗi')
       setUserData([])
     } finally {
       setLoading(false)
     } */
  }

  const handleTableChange = (pagination) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
  }

  useEffect(() => {
    if (selectedGroup === 'all') {
      fetchData()
    }
  }, [page, limit, selectedGroup])
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const showUserForm = (user) => {
    setSelectedUser(user)
    setIsModalVisible(true)
  }

  // Đóng Modal Form
  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedUser(null)
  }

  const handleSave = () => {
    setIsModalVisible(false)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }

  const handleAddRow = async () => {}
  const renderTable = () => {
    const columns = [
      {
        title: 'Tên nhân viên',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          const nameA = a.name || ''
          const nameB = b.name || ''
          return nameA.localeCompare(nameB)
        },
        ...(visibleColumns.name ? {} : { render: () => null }),
      },
      {
        title: 'Mã nhân viên',
        dataIndex: 'employee_id',
        key: 'employee_id',
        sorter: (a, b) => {
          const A = a.employee_id || ''
          const B = b.employee_id || ''
          return A.localeCompare(B)
        },
        ...(visibleColumns.employee_id ? {} : { render: () => null }),
      },
      {
        title: 'Email',
        dataIndex: 'work_email',
        key: 'work_email',
        sorter: (a, b) => {
          const loginA = a.work_email || ''
          const loginB = b.work_email || ''
          return loginA.localeCompare(loginB)
        },
        ...(visibleColumns.work_email ? {} : { render: () => null }),
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'mobile_phone',
        key: 'mobile_phone',
        ...(visibleColumns.mobile_phone ? {} : { render: () => null }),
      },
    ]

    return (
      <>
        <Table
          rowSelection={rowSelection}
          bordered
          columns={columns}
          dataSource={userData}
          rowKey="id"
          className="bg-slate-50 cursor-pointer pb-0 md:pb-40"
          onRow={(record) => ({
            onClick: () => {
              showUserForm(record)
            },
          })}
          loading={loading}
          footer={() => (
            <span
              onClick={handleAddRow}
              type="primary"
              className="mt-2 max-w-md cursor-pointer text-pretty text-base text-indigo-500"
              size="large"
            >
              {t(' Thêm hàng mới')}
            </span>
          )}
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} mục`,
            onChange: (page, pageSize) =>
              handleTableChange({ current: page, pageSize }),
          }}
          onChange={(pagination) => handleTableChange(pagination)}
          scroll={{
            x: 'calc(100px + 50%)',
            y: 650,
          }}
        />
      </>
    )
  }

  const renderKanban = () => {
    return (
      <Row gutter={16} className="bg-slate-50 pb-60">
        {userData.map((user) => (
          <Col span={24} key={user.login} style={{ marginBottom: 16 }}>
            <Card title={user.name} onClick={() => showUserForm(user)}>
              <Row gutter={[16, 16]}>
                <Col span={5}>
                  <Avatar shape="square" size={64} icon={<UserOutlined />} />
                </Col>

                <Col span={19}>
                  <strong>{t('Mã nhân viên')}:</strong> {user.employee_id}{' '}
                  <br />
                  <strong>{t('Số điện thoại')}:</strong> {user.mobile_phone}{' '}
                  <br />
                  <strong>{t('Email công việc:')}</strong> {user.work_email}{' '}
                  <br />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    )
  }

  const handleMenuShowActionClick = (e) => {
    setPhoneSettingUser(e.key)
    if (e.key === 'action_setting_1') {
      setShowSettingActionDropdown(false)
      setIsModalOpenAddUser(true)
    }
  }

  const handleShowActionClick = () => {
    setActionUsers(true)
  }
  const handleOnClickGroupID = (e) => {
    setSelectedGroup(e.key)
    if (e.key !== 'all') {
      fetchDataOnClick(e)
    } else {
      fetchDataResAllUser()
    }
  }
  return (
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>ITM - {t('Nhân viên')}</title>
      </Helmet>

      <div className="h-full">
        <div className="h-full">
          <div>
            {isMobile && (
              <div className=" flex items-center justify-end">
                <PhoneSettingAction
                  handleMenuShowActionClick={handleMenuShowActionClick}
                  showSttingActionDropdown={showSttingActionDropdown}
                  setShowSettingActionDropdown={setShowSettingActionDropdown}
                />
              </div>
            )}
            {isMobile && phoneSettingUser === 'action_setting_1' && (
              <AddPersonnel
                isOpen={isModalOpenAddUser}
                onClose={closeModalAddUser}
                fetchData={fetchData}
              />
            )}

            <div className="p-2 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-xl ">
                {t('Nhân viên')}
              </h1>

              {!isMobile && (
                <span className="inline-flex overflow-hidden  ">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={openModalAddUser}
                      type="primary"
                      icon={<PlusOutlined />}
                      className="w-full rounded-lg h-full border-gray-200  bg-indigo-600 text-white  shadow-sm text-sm"
                      size="large"
                    >
                      {t('Thêm')}
                    </Button>
                  </div>
                </span>
              )}
              <AddPersonnel
                isOpen={isModalOpenAddUser}
                onClose={closeModalAddUser}
                fetchData={fetchData}
              />
            </div>
            {!isMobile && (
              <div className="p-2 mb flex items-center justify-between">
                <span className="inline-flex overflow-hidden  ">
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue="Tùy chọn"
                      className=" w-28"
                      size="large"
                    >
                      <Option value="1">{t('Table')}</Option>
                      <Option value="2">Grid</Option>
                      <Option value="3">List</Option>
                    </Select>
                    <ImportAction />
                    {selectedRowKeys != null && selectedRowKeys.length > 0 && (
                      <>
                        <ShowAction
                          handleOnClickAction={handleOnClickAction}
                          actionUsers={actionUsers}
                          setActionUsers={setActionUsers}
                          setSelectedRowKeys={setSelectedRowKeys}
                          selectedRowKeys={selectedRowKeys}
                          fetchDataUser={fetchData}
                        />
                      </>
                    )}
                  </div>
                </span>
                <button
                  className=" border-[1.3px] border-[#d9d9d9]  rounded-lg p-[0.6rem]  w-52 flex items-center space-x-2 bg-white hover:bg-gray-100"
                  onClick={openModal}
                >
                  <SearchOutlined />
                  <span className="text-gray-500">Tìm kiếm</span>
                </button>
                <Search isOpen={isModalOpen} onClose={closeModal} />
              </div>
            )}
            {isMobile && (
              <div className="p-2">
                {' '}
                <button
                  className=" border-[1.3px] border-[#d9d9d9]  rounded-lg p-[0.6rem]  w-full flex items-center space-x-2 bg-white hover:bg-gray-100"
                  onClick={openModal}
                >
                  <SearchOutlined />
                  <span className="text-gray-500">Tìm kiếm</span>
                </button>
                <Search isOpen={isModalOpen} onClose={closeModal} />
              </div>
            )}
          </div>

          <Layout className="h-screen lg:pb-[70px] ">
            {!isMobile && (
              <Sider
                width={200}
                className="bg-slate-50 border-r border-t h-screen"
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['all']}
                  className=" pb-32 scroll-container h-full overflow-auto"
                  onClick={(e) => handleOnClickGroupID(e)}
                >
                  <Menu.Item key="all">All</Menu.Item>
                  {groupsData.map((group) => (
                    <Menu.Item key={group.id}>{group.name}</Menu.Item>
                  ))}
                </Menu>
              </Sider>
            )}

            <Layout
              style={{
                padding: isMobile ? '0 8px' : '0',
                borderTopWidth: isMobile ? '0' : '1px',
              }}
              className="h-full p-2 overflow-auto    scrollable-content"
            >
              <Content className="bg-slate-50">
                {isMobile ? renderKanban() : renderTable()}
              </Content>
            </Layout>
            <UserProfile
              groupsData={groupsData}
              isModalVisible={isModalVisible}
              user={selectedUser}
              handleCancel={handleCancel}
              setSelectedGroup={setSelectedGroup}
              fetchDataResAllUser={fetchDataResAllUser}
            />
          </Layout>
        </div>
      </div>
    </div>
  )
}
