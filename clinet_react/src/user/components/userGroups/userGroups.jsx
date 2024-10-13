import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Input,
  Modal,
  Typography,
  Form,
  Select,
  Button,
  Card,
  Divider,
  Space,
  Switch,
  Checkbox,
  Drawer,
  Radio,
  message,
  Table,
  Popconfirm,
  Tag,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { PostResGroups } from '../../../features/resGroups/postResGroups'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { PostResUserGroups } from '../../../features/resGroups/postResUserGroups'
import ShowListUser from './modalListUser'
import { GetAllResUserGroupsPageLimitID } from '../../../features/resGroups/getResUserGroupsID'
import { DeleteResUserGroups } from '../../../features/resGroups/deleteResUserGroups'
import { GetPermisionMenuGroupID } from '../../../features/menu/getPermissionsMenuGroupID'
import { PutPermissionsID } from '../../../features/menu/putPermissionsID'
import { DeletePermissionsMenu } from '../../../features/menu/deletePermissionsMenu'
import { PutGroupId } from '../../../features/resGroups/putGroupsId'
import ShowListMenu from './modalListMenu'
const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

export default function UserGroupsDrawer({
  group,
  isModalVisible,
  handleCancel,
  fetchDataGroups,
  canEdit,
  canDelete,
}) {
  const { t } = useTranslation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenListMenu, setIsModalOpenListMenu] = useState(false)
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  const [dataPermissionsMenu, setDataPermissionsMenu] = useState([])
  const [loadingPermissionsMenu, setLoadingPermissionsMenu] = useState(true)
  const [errorPermissionsMenu, setErrorPermissionsMenu] = useState(null)
  const [totalPagesPermissionsMenu, setTotalPagesPermissionsMenu] = useState(0)
  const [pagePermissionsMenu, setPagePermissionsMenu] = useState(1)
  const [limitPermissionsMenu, setLimitPermissionsMenu] = useState(10)
  const [totalPermissionsMenu, setTotalPermissionsMenu] = useState(0)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRowKeysPM, setSelectedRowKeysPM] = useState([])

  const handleCheckboxClick = (id, field, value) => {
    const newData = dataPermissionsMenu.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    )
    const updateData = {
      id: id,
      field: field,
      value: value,
    }
    if (canEdit) {
      PutPermissionsID(updateData)
      setDataPermissionsMenu(newData)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    setLoadingPermissionsMenu(true)

    try {
      const [response, responsePermissionsMenu] = await Promise.all([
        GetAllResUserGroupsPageLimitID(group?.id, page, limit), // API 1
        GetPermisionMenuGroupID(
          group?.id,
          pagePermissionsMenu,
          limitPermissionsMenu,
        ), // API 2
      ])

      if (response.success) {
        setDataSource(response.data.data)
        setTotal(response.data.total)
        setTotalPages(response.data.totalPages)
        setError(null)
      } else {
        setError(response.message)
        setDataSource([])
      }

      if (responsePermissionsMenu.success) {
        setDataPermissionsMenu(responsePermissionsMenu.data.data)
        setTotalPermissionsMenu(responsePermissionsMenu.data.total)
        setTotalPagesPermissionsMenu(responsePermissionsMenu.data.totalPages)
        setErrorPermissionsMenu(null)
      } else {
        setErrorPermissionsMenu(responsePermissionsMenu.message)
        setDataPermissionsMenu([])
      }
    } catch (error) {
      const errorMessage = error.message || 'Đã xảy ra lỗi'
      setError(errorMessage)
      setErrorPermissionsMenu(errorMessage)
      setDataSource([])
      setDataPermissionsMenu([])
    } finally {
      setLoading(false)
      setLoadingPermissionsMenu(false)
    }
  }
  const fetchUserGroups = async () => {
    setLoading(true)
    try {
      const response = await GetAllResUserGroupsPageLimitID(
        group?.id,
        page,
        limit,
      ) // API 1
      if (response.success) {
        setDataSource(response.data.data)
        setTotal(response.data.total)
        setTotalPages(response.data.totalPages)
        setError(null)
      } else {
        setError(response.message)
        setDataSource([])
      }
    } catch (error) {
      const errorMessage = error.message || 'Đã xảy ra lỗi'
      setError(errorMessage)
      setDataSource([])
    } finally {
      setLoading(false)
    }
  }

  const fetchPermissionsMenu = async () => {
    setLoadingPermissionsMenu(true)
    try {
      const responsePermissionsMenu = await GetPermisionMenuGroupID(
        group?.id,
        pagePermissionsMenu,
        limitPermissionsMenu,
      ) // API 2

      if (responsePermissionsMenu.success) {
        setDataPermissionsMenu(responsePermissionsMenu.data.data)
        setTotalPermissionsMenu(responsePermissionsMenu.data.total)
        setTotalPagesPermissionsMenu(responsePermissionsMenu.data.totalPages)
        setErrorPermissionsMenu(null)
      } else {
        setErrorPermissionsMenu(responsePermissionsMenu.message)
        setDataPermissionsMenu([])
      }
    } catch (error) {
      const errorMessage = error.message || 'Đã xảy ra lỗi'
      setErrorPermissionsMenu(errorMessage)
      setDataPermissionsMenu([])
    } finally {
      setLoadingPermissionsMenu(false)
    }
  }

  useEffect(() => {
    if (isModalVisible === true) {
      fetchData()
    }
    if (group) {
      form.setFieldsValue({
        name: group.name || '',
        comment: group.comment || '',
      })
    }
    if (pagePermissionsMenu > 1 || limitPermissionsMenu > 10) {
      fetchPermissionsMenu()
    }

    if (page > 1 || limit > 10) {
      fetchUserGroups()
    }
  }, [
    page,
    limit,
    pagePermissionsMenu,
    limitPermissionsMenu,
    group?.id,
    group,
    form,
  ])

  const handleAddRow = () => {
    setIsModalOpen(true)
  }

  const handleAddRowListMenu = () => {
    setIsModalOpenListMenu(true)
  }

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key))
  }
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const onSelectChangePM = (newSelectedRowKeys) => {
    setSelectedRowKeysPM(newSelectedRowKeys)
  }
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    login: true,
    language: true,
    active: true,
  })
  const [visibleColumnsPM, setVisibleColumnsPM] = useState({
    name: true,
  })

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }
  const columns = [
    {
      title: t('Tên'),
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
      title: t('Đăng nhập'),
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
      title: t('Ngôn ngữ'),
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
      title: 'Trạng thái',
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
          displayText = 'Đã kết nối'
        } else if (active === false) {
          color = 'error'
          displayText = 'Chưa kết nối'
        } else {
          color = 'default'
          displayText = 'Chưa xác định'
        }

        return (
          <Tag
            color={color}
            key={active}
            className="p-1 font-bold rounded-lg px-6"
          >
            {displayText} {/* Hiển thị văn bản thay vì {active} */}
          </Tag>
        )
      },
      ...(visibleColumns.active ? {} : { render: () => null }),
    },
  ]
  const rowSelectionPM = {
    selectedRowKeysPM,
    onChange: onSelectChangePM,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  }
  const columnsPM = [
    {
      title: 'Menu',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        const A = a.name || ''
        const B = b.name || ''
        return A.localeCompare(B)
      },
      ...(visibleColumnsPM.name ? {} : { render: () => null }),
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (text, record) => (
        <Checkbox
          checked={record.view}
          onChange={(e) =>
            handleCheckboxClick(record.id, 'view', e.target.checked)
          }
        />
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (text, record) => (
        <Checkbox
          checked={record.edit}
          onChange={(e) =>
            handleCheckboxClick(record.id, 'edit', e.target.checked)
          }
        />
      ),
    },
    {
      title: 'Create',
      dataIndex: 'create',
      key: 'create',
      render: (text, record) => (
        <Checkbox
          checked={record.create}
          onChange={(e) =>
            handleCheckboxClick(record.id, 'create', e.target.checked)
          }
        />
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (text, record) => (
        <Checkbox
          checked={record.delete}
          onChange={(e) =>
            handleCheckboxClick(record.id, 'delete', e.target.checked)
          }
        />
      ),
    },
  ]

  const handleFinish = async (values) => {
    const { name, comment } = values

    const data = {
      name,
      comment,
    }

    const promises = [PutGroupId(group?.id, data)]
    message.loading(t('Đang cập nhật...'))

    Promise.all(promises)
      .then((results) => {
        let success = true
        let errorMessage = ''

        results.forEach((result) => {
          if (!result.success) {
            success = false
            errorMessage = result.message || 'Lỗi khi cập nhật!'
          }
        })

        if (success) {
          fetchDataGroups()
          message.success(t('Cập nhật giá trị thành công'))
        } else {
          message.error(errorMessage)
        }
      })
      .catch((error) => {
        message.error(error.message || t('Lỗi khi cập nhật!'))
      })
      .finally(() => {
        message.destroy()
      })
  }

  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }
  const closeModalListMenu = () => {
    setIsModalOpenListMenu(false)
  }
  const handleTableChange = (pagination) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
  }
  const handleTableChangePM = (pagination) => {
    setPagePermissionsMenu(pagination.current)
    setLimitPermissionsMenu(pagination.pageSize)
  }
  const handleDeleteGroupsUser = async () => {
    try {
      const response = await DeleteResUserGroups(selectedRowKeys)

      if (response.success) {
        message.success('Xóa thành công')
        setSelectedRowKeys([])
        await fetchUserGroups()
      } else {
        message.error(
          `Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại`,
        )
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error)
      message.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }
  const handleDeletePermissionsMenu = async () => {
    try {
      const response = await DeletePermissionsMenu(selectedRowKeysPM)
      if (response.success) {
        message.success('Xóa thành công')
        setSelectedRowKeysPM([])
        await fetchPermissionsMenu()
      } else {
        message.error(
          `Xóa thất bại: Yêu cầu không thành công, vui lòng thử lại`,
        )
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error)
      message.error('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  return (
    <Drawer
      title={<Title level={4}>{group?.name}</Title>}
      open={isModalVisible}
      onClose={handleCancel}
      width={900}
      closable={false}
      extra={[
        <Button key="cancel" onClick={handleCancel}>
          {t('Thoát')}
        </Button>,
        canEdit && (
          <Button
            key="submit"
            type="primary"
            className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
            onClick={() => form.submit()}
          >
            {t('Lưu')}
          </Button>
        ),
      ].filter(Boolean)}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          language: 'vi',
          timezone: 'GMT+7',
          notifications: true,
          security: false,
        }}
        style={{ textAlign: 'left' }}
      >
        <Title level={5}>{t('Thông tin nhóm')}</Title>

        {/* Thông tin cơ bản */}
        <Form.Item
          label={t('Tên nhóm')}
          name="name"
          rules={[{ required: true, message: t('Vui lòng nhập tên nhóm') }]}
          style={{ textAlign: 'left' }}
        >
          <Input size="large" placeholder={t('Tên nhóm')} disabled={!canEdit} />
        </Form.Item>
        <Form.Item
          label={t('Ghi chú')}
          name="comment"
          style={{ textAlign: 'left' }}
        >
          <TextArea
            rows={4}
            size="large"
            placeholder={t('Ghi chú')}
            disabled={!canEdit}
          />
        </Form.Item>

        <div className="divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
          <details
            className="group  p-2 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="  text-base font-medium">Người dùng</h2>

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
              {selectedRowKeys != null &&
                selectedRowKeys.length > 0 &&
                canDelete &&
                canEdit && (
                  <>
                    <span
                      className="inline-flex gap-2 mt-3 rounded bg-red-100 hover:bg-red-200 p-1 text-red-600 cursor-pointer px-4"
                      onClick={() => {
                        handleDeleteGroupsUser()
                      }}
                    >
                      <DeleteOutlined className=" text-lg" />
                      Xoá
                    </span>
                  </>
                )}
              <Table
                rowSelection={rowSelection}
                className="mt-3 cursor-pointer"
                dataSource={dataSource}
                columns={columns}
                rowKey="id"
                bordered
                loading={loading}
                footer={() =>
                  canEdit && (
                    <span
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={handleAddRow}
                      className="mt-2 max-w-md cursor-pointer text-pretty text-base text-indigo-500"
                      size="large"
                    >
                      Thêm hàng mới
                    </span>
                  )
                }
                scroll={{ x: 'max-content', y: 400 }}
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
              />
            </div>
          </details>
          <details
            className="group p-2 [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
              <h2 className="  text-base font-medium">Menu & Quyền truy cập</h2>

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
            {selectedRowKeysPM != null &&
              selectedRowKeysPM.length > 0 &&
              canDelete &&
              canEdit && (
                <>
                  <span
                    className="inline-flex gap-2 mt-3 rounded bg-red-100 hover:bg-red-200 p-1 text-red-600 cursor-pointer px-4"
                    onClick={() => {
                      handleDeletePermissionsMenu()
                    }}
                  >
                    <DeleteOutlined className=" text-lg" />
                    Xoá
                  </span>
                </>
              )}
            <Table
              rowSelection={rowSelectionPM}
              className="mt-3 cursor-pointer"
              dataSource={dataPermissionsMenu}
              columns={columnsPM}
              rowKey="id"
              bordered
              loading={loading}
              footer={() =>
                canEdit && (
                  <span
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAddRowListMenu}
                    className="mt-2 max-w-md cursor-pointer text-pretty text-base text-indigo-500 "
                    size="large"
                  >
                    Thêm hàng mới
                  </span>
                )
              }
              scroll={{ x: 'max-content' }}
              pagination={{
                current: pagePermissionsMenu,
                pageSize: limitPermissionsMenu,
                total: totalPermissionsMenu,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} mục`,
                onChange: (page, pageSize) =>
                  handleTableChangePM({ current: page, pageSize }),
              }}
              onChange={(pagination) => handleTableChangePM(pagination)}
            />
          </details>
        </div>
      </Form>

      <ShowListUser
        isOpen={isModalOpen}
        onClose={closeModal}
        group={group}
        fetchDataUserGroups={fetchData}
      />
      <ShowListMenu
        isOpen={isModalOpenListMenu}
        onClose={closeModalListMenu}
        group={group}
        fetchDataUserGroups={fetchData}
      />
    </Drawer>
  )
}
