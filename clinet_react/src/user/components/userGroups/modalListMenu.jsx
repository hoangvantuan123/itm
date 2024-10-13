import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Modal, Typography, Button, Table, Tag, message } from 'antd'
import { GetMenuAvailableID } from '../../../features/menu/getMenuAvailablePageLimitID'
import { PostPermissionsMenu } from '../../../features/menu/postPermissionsMenu'
const { Title } = Typography

export default function ShowListMenu({
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
        GetMenuAvailableID(group?.id, page, limit),
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
  }, [page, limit, isOpen, group, group?.id])

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
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => {
        const A = a.id || 0
        const B = b.id || 0
        return A - B
      },
      ...(visibleColumns.id ? {} : { id: () => null }),
    },
    {
      title: 'Trình tự',
      dataIndex: 'sequence',
      key: 'sequence',
      sorter: (a, b) => {
        const A = a.sequence || 0
        const B = b.sequence || 0
        return A - B
      },
      ...(visibleColumns.sequence ? {} : { sequence: () => null }),
    },
    {
      title: 'Menu',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => {
        const A = a.name || ''
        const B = b.name || ''
        return A.localeCompare(B)
      },
      ...(visibleColumns.name ? {} : { name: () => null }),
    },
    {
      title: 'Menu Cha',
      dataIndex: 'parent_name',
      key: 'parent_name',
      sorter: (a, b) => {
        const A = a.parent_name || ''
        const B = b.parent_name || ''
        return A.localeCompare(B)
      },
      ...(visibleColumns.parent_name ? {} : { parent_name: () => null }),
    },
  ]
  const handleTableChange = (pagination) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
  }
  const handleFinish = async () => {
    try {
      const groupId = group?.id
      const result = await PostPermissionsMenu(selectedRowKeys, groupId)
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
      title="Menu"
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
          y: 550,
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
