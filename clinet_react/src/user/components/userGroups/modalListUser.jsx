import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Modal, Typography, Button, Table, Tag, message } from 'antd'
import { GetAllResUsers } from '../../../features/resUsers/getResUsers'
import { PostResUserGroups } from '../../../features/resGroups/postResUserGroups'
import { GetUsersGroupAvailableID } from '../../../features/resGroups/getUsersGroupAvailablePageLimitID'

const { Title } = Typography

export default function ShowListUser({
  isOpen,
  onClose,
  group,
  fetchDataUserGroups,
}) {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState('')
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }
  const fetchData = async () => {
    setLoading(true)

    try {
      // Gọi các API đồng thời
      const [response, responseAllResGroups] = await Promise.all([
        GetUsersGroupAvailableID(group?.id, page, limit),
      ])

      if (response.success) {
        setUserData(response.data.data)
        setTotal(response.data.total)
        setTotalPages(response.data.totalPages)
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
  useEffect(() => {
    if (isOpen === true) {
      fetchData()
    }
  }, [page, limit, isOpen])

  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    login: true,
    language: true,
    active: true,
    action: true,
  })
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
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
  const columns = [
    {
      title: 'Tên',
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
      title: 'Đăng nhập',
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
      title: 'Ngôn ngữ',
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
            {displayText}
          </Tag>
        )
      },
      ...(visibleColumns.active ? {} : { render: () => null }),
    },
  ]
  const handleTableChange = (pagination) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
  }
  const handleFinish = async () => {
    try {
      const groupId = group?.id
      const result = await PostResUserGroups(selectedRowKeys, groupId)
      if (result.success) {
        fetchDataUserGroups()
        message.success('Cập nhật người dùng thành công')
        onClose()
      } else {
        message.error(result.message || 'Lỗi khi thêm người dùng!')
      }
    } catch (error) {
      message.error('Lỗi khi khi thêm người dùng!')
    }
  }
  return (
    <Modal
      title="Người dùng"
      open={isOpen}
      onCancel={onClose}
      width={1200}
      height={500}
      footer={[
        <Button
          key="cancel"
          onClick={onClose}
          style={{ backgroundColor: '#f5f5f5', borderColor: '#d9d9d9' }}
        >
          {t('Thoát')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleFinish}
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          {t('Lưu')}
        </Button>,
      ]}
    >
      <Table
        rowSelection={rowSelection}
        bordered
        columns={columns}
        dataSource={userData}
        rowKey="id"
        className=" cursor-pointer pb-0"
        scroll={{
          x: 'max-content',
          y: 450,
        }}
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
        loading={loading}
      />
    </Modal>
  )
}
