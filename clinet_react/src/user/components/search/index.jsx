import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Modal, Typography, Button } from 'antd'

const { Title } = Typography

const sampleData = [
  { id: 1, name: 'Người dùng 1', description: 'Mẫu nội dung tìm kiếm 1' },
  { id: 2, name: 'Người dùng 2', description: 'Mẫu nội dung tìm kiếm 2' },
  { id: 3, name: 'Người dùng 3', description: 'Mẫu nội dung tìm kiếm 3' },
  { id: 4, name: 'Người dùng 4', description: 'Mẫu nội dung tìm kiếm 4' },
  { id: 5, name: 'Người dùng 5', description: 'Mẫu nội dung tìm kiếm 5' },
]

export default function Search({ isOpen, onClose }) {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredData = sampleData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLowerCase()),
  )

  return (
    <Modal
      title="Tìm kiếm"
      open={isOpen}
      onCancel={onClose}
      style={{ top: 20 }}
      width={1500}
      footer={null}
    >
      <Input
        placeholder="Nhập từ khóa tìm kiếm..."
        value={searchValue}
        size="large"
        onChange={handleSearch}
      />
      <div className="w-full border-t mt-6"></div>
      <div className="mt-6">
        <ul className="space-y-1">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <li key={item.id}>
                <a
                  href="#"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <Title level={5}>{item.name}</Title>
                  <p>{item.description}</p>
                </a>
              </li>
            ))
          ) : (
            <li>
              <p className="text-gray-500">Không có kết quả tìm kiếm</p>
            </li>
          )}
        </ul>
      </div>
    </Modal>
  )
}
