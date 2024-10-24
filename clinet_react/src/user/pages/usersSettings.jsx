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
  Menu as AntdMenu,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import 'moment/locale/vi'

const { Sider, Content } = Layout
import { PlusOutlined } from '@ant-design/icons'
import { SearchOutlined } from '@ant-design/icons'
import Search from '../components/search'
import ShowAction from '../components/action/showAction'
import PhoneSettingAction from '../components/phone/usersSettingAction'
import AddUser from '../components/add/addUser'
import UserProfile from '../components/profile'
import ImportAction from '../components/action/importAction'
import { GetAllResUsers } from '../../features/resUsers/getResUsers'
import { GetAllResGroups } from '../../features/resGroups/getAllResGroups'
import { registerUser } from '../../features/auth/API/registerAPI'
import { GetUserGroupsPageLimitID } from '../../features/resUsers/getUserGroupsPageLimitID'
import '../../static/css/scroll_container.css'
import '../../static/css/drawer_cusstom.css'
import { checkActionPermission } from '../../permissions'
import FieldActionUsers from '../components/action/fieldUsers'
import { GetFilterUsers } from '../../features/resUsers/getFilterUsers'

const { Option } = Select
const { Title } = Typography
export default function UsersSettings({ permissions }) {
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
  const [limit, setLimit] = useState(50)
  const [total, setTotal] = useState(0)
  const [actionUsers, setActionUsers] = useState(null)
  const canCreate = checkActionPermission(permissions, 'setting-1-2', 'create')
  const canEdit = checkActionPermission(permissions, 'setting-1-2', 'edit')
  const canDelete = checkActionPermission(permissions, 'setting-1-2', 'delete')
  const canView = checkActionPermission(permissions, 'setting-1-2', 'view')
  const [isDrawerVisibleFilter, setIsDrawerVisibleFilter] = useState(false)
  const [actionImport, setActionImport] = useState(null)
  const [nameTags, setNameTags] = useState([])
  const [dateRange, setDateRange] = useState([null, null])
  const handleOnClickActionImport = () => {
    setActionImport('users')
  }
  const [cid, setCid] = useState([])
  const handleOnClickAction = () => {
    setActionUsers('actionUsers')
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
    employee_code: true,
    name_user: true,
    login: true,
    language: true,
    active: true,
    action: true,
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { t } = useTranslation()
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const fetchData = async () => {
    setLoading(true)
    const [startDate, endDate] = dateRange.map((date) =>
      date ? date.format('YYYY-MM-DD') : null,
    )
    try {
      // Gọi các API đồng thời
      const [response, responseAllResGroups] = await Promise.all([
        GetFilterUsers(page, limit, startDate,
          endDate, nameTags, cid),
        GetAllResGroups(),
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
  const handleApplyFilter = async () => {
    setIsDrawerVisibleFilter(false)

    await fetchData()
  }
  const fetchDataResAllUser = async () => {
    setLoading(true)

    try {
      const response = await GetAllResUsers(page, limit)
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
    try {
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
    }
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
  const generateRandomString = (length) => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  const handleAddRow = async () => {
    const login = `User_${generateRandomString(6)}`
    const password = `123456789`
    const language = `vi`

    const token = localStorage.getItem('token_1h')
    if (!token) {
      message.error(
        'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.',
      )
      return
    }
    const result = await registerUser({
      login: login,
      password: password,
      name_user: login,
      language: language,
      token,
    })
    fetchData()
  }
  const renderTable = () => {
    const columns = [
      {
        title: 'CID',
        dataIndex:  t('column_table.CID'),
        key: 'employee_code',
        sorter: (a, b) => {
          const nameA = a.employee_code || ''
          const nameB = b.employee_code || ''
          return nameA.localeCompare(nameB)
        },
        ...(visibleColumns.employee_code ? {} : { render: () => null }),
      },
      {
        title: t('column_table.name_user'),
        dataIndex: 'name_user',
        key: 'name_user',
        sorter: (a, b) => {
          const nameA = a.name_user || ''
          const nameB = b.name_user || ''
          return nameA.localeCompare(nameB)
        },
        ...(visibleColumns.name_user ? {} : { render: () => null }),
      },
      {
        title: t('column_table.login'),
        dataIndex: 'login',
        key: 'login',
        sorter: (a, b) => {
          const loginA = a.login || ''
          const loginB = b.login || ''
          return loginA.localeCompare(loginB)
        },
        ...(visibleColumns.login ? {} : { render: () => null }),
      },
      {
        title: t('column_table.language'),
        dataIndex: 'language',
        key: 'language',
        sorter: (a, b) => {
          const languageA = a.language || ''
          const languageB = b.language || ''

          return languageA.localeCompare(languageB)
        },
        ...(visibleColumns.language ? {} : { render: () => null }),
      },
      {
        title: t('column_table.active'),
        dataIndex: 'active',
        key: 'active',
        sorter: (a, b) => {
          if (a.active === b.active) {
            return 0
          }
          return a.active ? -1 : 1
        },
        render: (active) => {
          let color
          let displayText

          if (active === true) {
            color = 'success'
            displayText = `${t('column_table.success')}`
          } else if (active === false) {
            color = 'error'
            displayText = `${t('column_table.error')}`
          } else {
            color = 'default'
            displayText = `${t('column_table.default')}`
          }

          return (
            <Tag
              color={color}
              key={active}
              className="p-1 font-bold rounded-lg px-6"
            >
              {displayText}
            </Tag>
          )
        },
        ...(visibleColumns.active ? {} : { render: () => null }),
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
          footer={() =>
            canCreate && (
              <span
                type="primary"
                className="mt-2 max-w-md cursor-pointer text-pretty text-base text-indigo-500"
                size="large"
                onClick={handleAddRow}
              >
                 {t('column_table.add_row')}
              </span>
            )
          }
          size="small"
          pagination={{
            current: page,
            pageSize: limit,
            total: total,
            showSizeChanger: true,
            showTotal: (total) => `${t('column_table.total')} ${total} ${t('column_table.item')}`,
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
            <Card title={user.name_user} onClick={() => showUserForm(user)}>
              <p>
                <strong>{t('Đăng nhập')}:</strong> {user.login}
              </p>
              <p>
                <strong>{t('Ngôn ngữ')}:</strong> {user.language}
              </p>
              <p>
                <strong>{t('Trạng thái')}:</strong> {user.status}
              </p>
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
        <title>ITM - {t('users_setting.helmet_user_setting')}</title>
      </Helmet>

      <div className="h-full">
        <div className="h-full">
          <div>
            {isMobile && (
              <div className=" flex items-center justify-end">
                <PhoneSettingAction
                  canCreate={canCreate}
                  handleMenuShowActionClick={handleMenuShowActionClick}
                  showSttingActionDropdown={showSttingActionDropdown}
                  setShowSettingActionDropdown={setShowSettingActionDropdown}
                />
              </div>
            )}
            {isMobile && phoneSettingUser === 'action_setting_1' && (
              <AddUser
                isOpen={isModalOpenAddUser}
                onClose={closeModalAddUser}
                fetchData={fetchData}
              />
            )}

            <div className="p-2 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-xl ">
                {t('page.users')}
              </h1>

           
              {canCreate && (
                <AddUser
                  isOpen={isModalOpenAddUser}
                  onClose={closeModalAddUser}
                  fetchData={fetchData}
                />
              )}
            </div>
            {!isMobile && (
              <div className="p-2 mb flex items-center justify-between">
                <span className="inline-flex overflow-hidden  ">
                  <div className="flex items-center gap-2">
                  {canCreate && (
                      <Button
                        onClick={openModalAddUser}
                        type="primary"
                        icon={<PlusOutlined />}
                              className=" rounded-lg h-full border-gray-200 bg-indigo-600 hover:bg-none text-white shadow-sm text-sm"
                        size="large"
                      >
                        {t('page.add')}
                      </Button>
                    )}

                    {canCreate && <ImportAction   fetchData={fetchData}    handleOnClickActionImport={handleOnClickActionImport}
                setActionImport={setActionImport}
                actionImport={actionImport} />}
                    <FieldActionUsers
                      handleApplyFilter={handleApplyFilter}
                      setIsDrawerVisible={setIsDrawerVisibleFilter}
                      isDrawerVisible={isDrawerVisibleFilter}
                      nameTags={nameTags}
                      setNameTags={setNameTags}
                      setCid={setCid}
                      cid={cid}

                    />
                    {selectedRowKeys != null && selectedRowKeys.length > 0 && (
                      <>
                        <ShowAction
                          handleOnClickAction={handleOnClickAction}
                          actionUsers={actionUsers}
                          setActionUsers={setActionUsers}
                          setSelectedRowKeys={setSelectedRowKeys}
                          selectedRowKeys={selectedRowKeys}
                          fetchDataUser={fetchData}
                          canDelete={canDelete}
                          userData={userData}
                        />
                      </>
                    )}
                  </div>
                </span>
              </div>
            )}
          </div>

          <Layout className="h-screen lg:pb-[70px] ">


            <Layout
              style={{
                padding: isMobile ? '0 8px' : '0',
                borderTopWidth: isMobile ? '0' : '1px',
              }}
              className="h-full p-2 overflow-auto     scrollable-content"
            >
              <Content className="bg-slate-50 p-2">
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
              permissions={permissions}
              canEdit={canEdit}
            />
          </Layout>
        </div>
      </div>
    </div>
  )
}
