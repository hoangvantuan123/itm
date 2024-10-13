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
  InputNumber,
  Alert,
  Spin,
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { registerUser } from '../../../features/auth/API/registerAPI'
import { PostMenu } from '../../../features/menu/postMenu'
import { GetAllMenu } from '../../../features/menu/getAllMenu'
const { Title } = Typography
const { Option } = Select

export default function AddMenu({ isOpen, onClose, fetchTableData }) {
  const { t } = useTranslation()
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'

  const [form] = Form.useForm()
  const [menuOptions, setMenuOptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [total, setTotal] = useState(0)
  const fetchData = async () => {
    setLoading(true)
    const response = await GetAllMenu()
    if (response.success) {
      setMenuOptions(response.data.data)
      setTotal(response.data.total)
      setTotalPages(response.data.totalPages)
      setError(null)
    } else {
      setError(response.message)
    }
    setLoading(false)
  }
  const handleFinish = async (values) => {
    const { name, sequence, parent_id, key } = values
    const data = {
      name,
      sequence,
      ...(parent_id !== undefined ? { parent_id } : null),
      key,
    }
    try {
      const result = await PostMenu(
        data.name,
        data.sequence,
        data.parent_id,
        data.key,
      )
      console.log('result', result)
      if (result.success) {
        message.success(t('Tạo menu thành công'))
        fetchTableData()
        form.resetFields()
        onClose()
      } else {
        message.error(result.message || 'Lỗi khi tạo menu!')
      }
    } catch (error) {
      message.error(t('Lỗi khi tạo menu!'))
    }
  }
  useEffect(() => {
    if (isOpen === true) {
      fetchData()
    }
  }, [isOpen])
  return (
    <Drawer
      title={
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('Thêm mục Menu')}
        </Title>
      }
      open={isOpen}
      closable={false}
      width={900}
      extra={[
        <Button key="cancel" onClick={onClose}>
          {t('Hủy')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          className=" ml-2 border-gray-200  bg-indigo-600 text-white  shadow-sm text-sm"
          onClick={() => form.submit()}
        >
          {t('Lưu')}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ textAlign: 'left' }}
        className="w-full"
      >
        <Form.Item
          label={t('Menu')}
          name="name"
          rules={[
            { required: true, message: t('Vui lòng nhập tên menu hiển thị') },
          ]}
          style={{ textAlign: 'left' }}
        >
          <Input size="large" placeholder={t('Nhập menu hiển thị')} />
        </Form.Item>
        <div className="flex items-center gap-2 w-full">
          <Form.Item
            label={t('Thứ tự')}
            name="sequence"
            style={{ textAlign: 'left' }}
            rules={[{ required: true, message: t('Vui lòng số thứ tự') }]}
          >
            <InputNumber
              type="number"
              className="w-full"
              size="large"
              placeholder={t('Nhập thứ tự hiển thị')}
            />
          </Form.Item>
          <Form.Item
            label={t('Key')}
            name="key"
            style={{ textAlign: 'left' }}
            className="w-full"
            rules={[{ required: true, message: t('Vui lòng nhập Key') }]}
          >
            <Input size="large" placeholder={t('Nhập key hiển thị')} />
          </Form.Item>
        </div>
        <Form.Item
          label="Menu cha"
          name="parent_id"
          style={{ textAlign: 'left' }}
          className="w-full"
        >
          <Select
            showSearch
            placeholder="Chọn menu"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children?.toLowerCase().includes(input.toLowerCase())
            }
            size="large"
          >
            {menuOptions.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
