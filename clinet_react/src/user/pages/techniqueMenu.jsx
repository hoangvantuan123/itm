import { useState, useEffect } from 'react'
import {
  Table,
  Checkbox,
  Layout,
  Button,
  Tag,
  Row,
  Col,
  Card,
  Select,
  Modal,
  Typography,
  Drawer,
  Pagination,
} from 'antd'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import Search from '../components/search'
import { PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons'
import ImportAction from '../components/action/importAction'
import ShowAction from '../components/action/showAction'
import '../../static/css/drawer_cusstom.css'
import PhoneUserGroupsAction from '../components/phone/usersGroupsAction'
import AddMenu from '../components/add/addMenu'
import { GetMenuPageLimit } from '../../features/menu/getMenuPageLimit'
import MenuDrawer from '../components/systemMenu'
const { Content } = Layout
const { Option } = Select
const { Text } = Typography
const { Title } = Typography
import { checkActionPermission } from '../../permissions'

export default function TechniqueMenu({ permissions }) {
  const [tableData, setTableData] = useState([])
  const { t } = useTranslation()
  const [isMobile, setIsMobile] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalOpenMenu, setIsModalOpenMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const [selectedDetails, setSelectedDetails] = useState(null)
  const [actionUsers, setActionUsers] = useState(null)
  const canCreate = checkActionPermission(
    permissions,
    'setting-2-1-2',
    'create',
  )
  const canEdit = checkActionPermission(permissions, 'setting-2-1-2', 'edit')
  const canDelete = checkActionPermission(
    permissions,
    'setting-2-1-2',
    'delete',
  )

  const fetchData = async () => {
    setLoading(true)
    const response = await GetMenuPageLimit(page, limit)
    if (response.success) {
      setTableData(response.data.data)
      setTotal(response.data.total)
      setTotalPages(response.data.totalPages)
      setError(null)
    } else {
      setError(response.message)
      setTableData([])
    }
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [page, limit])
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
    columnWidth: 60,
  }
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
  })

  const columns = [
    {
      title: t('column_table.action'),
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
      title: t('column_table.sequence'),
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
      title: t('column_table.name'),
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
      title: t('column_table.key_name'),
      dataIndex: 'key_name',
      key: 'key_name',
      sorter: (a, b) => {
        const A = a.key_name || ''
        const B = b.key_name || ''
        return A.localeCompare(B)
      },
      ...(visibleColumns.key_name ? {} : { key_name: () => null }),
    },
    {
      title: t('column_table.parent_name'),
      dataIndex: 'parent_name',
      key: 'parent_name',
      sorter: (a, b) => {
        const A = a.parent_name || ''
        const B = b.parent_name || ''
        return A.localeCompare(B)
      },
      ...(visibleColumns.parent_name ? {} : { parent_name: () => null }),
    },
    {
      title: t('column_table.parent_path'),
      dataIndex: 'parent_path',
      key: 'parent_path',
      sorter: (a, b) => {
        const A = a.parent_path || ''
        const B = b.parent_path || ''
        return A.localeCompare(B)
      },
      ...(visibleColumns.parent_path ? {} : { parent_path: () => null }),
    },
  ]

  const handleViewDetails = (group) => {
    setSelectedDetails(group)
    setIsModalVisible(true)
  }
  const handleTableChange = (pagination) => {
    setPage(pagination.current)
    setLimit(pagination.pageSize)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    setSelectedDetails(null)
  }
  const renderTable = () => (
    <Table
      className="cursor-pointer"
      rowSelection={rowSelection}
      columns={columns}
      loading={loading}
      onRow={(record) => ({
        onClick: () => {
          handleViewDetails(record)
        },
      })}
      bordered
      dataSource={tableData}
      scroll={{
        x: 'calc(100px + 50%)',
        y: 650,
      }}
      size="small"
      rowKey="id"
      footer={() =>
        canCreate && (
          <span
            type="primary"
            className="mt-2 max-w-md cursor-pointer text-pretty text-base text-indigo-500"
            size="large"
          >
            {t('column_table.add_row')}
          </span>
        )
      }
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
    />
  )
  const renderKanban = () => {
    return (
      <Row gutter={16} className="bg-slate-50  pb-32">
        {tableData.map((item) => (
          <Col span={24} key={item.id} style={{ marginBottom: 16 }}>
            <Card title={item.name} onClick={() => handleViewDetails(item)}>
              <strong>{t('column_table.sequence')}:</strong> {item.sequence} <br />
              <strong>{t('column_table.key_name')}:</strong> {item.key_name} <br />
            </Card>
          </Col>
        ))}
      </Row>
    )
  }
  const openModalAddMenu = () => {
    setIsModalOpenMenu(true)
  }
  const closeModalAddMenu = () => {
    setIsModalOpenMenu(false)
  }

  const handleOnClickAction = () => {
    setActionUsers('actionMenu')
  }
  return (
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>ITM - {t('Menu')}</title>
      </Helmet>
      {isMobile && <div className="flex items-center justify-end"></div>}
      <div className="p-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 sm:text-xl ">
          {t('page.menu')}
        </h1>


        <AddMenu
          isOpen={isModalOpenMenu}
          onClose={closeModalAddMenu}
          fetchTableData={fetchData}
        />
      </div>
      
      <div className="p-2 mb flex items-center justify-between">
        <span className="inline-flex overflow-hidden">
          <div className="flex items-center gap-2">
            {canCreate && (
              <Button
                onClick={openModalAddMenu}
                type="primary"
                icon={<PlusOutlined />}
                className=" rounded-lg h-full border-gray-200 bg-indigo-600 hover:bg-none text-white shadow-sm text-sm"
                size="large"
              >
                {t('page.add')}
              </Button>
            )}
              {selectedRowKeys != null && selectedRowKeys.length > 0 && (
              <ShowAction
                handleOnClickAction={handleOnClickAction}
                actionUsers={actionUsers}
                setActionUsers={setActionUsers}
                setSelectedRowKeys={setSelectedRowKeys}
                selectedRowKeys={selectedRowKeys}
                fetchDataUser={fetchData}
                canDelete={canDelete}
              />
            )}
          </div>
        </span>
      </div>
      <Layout className="h-screen lg:pb-[70px]">
        <Layout
          style={{
            padding: isMobile ? '0 8px' : '0',
          }}
          className="h-full p-2 overflow-auto scrollable-content"
        >
          <Content className="bg-slate-50 p-2">
            {isMobile ? renderKanban() : renderTable()}
          </Content>
        </Layout>
      </Layout>

      <MenuDrawer
        canEdit={canEdit}
        selectedDetails={selectedDetails}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        fetchTableData={fetchData}
      />
    </div>
  )
}
