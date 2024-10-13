import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import moment from 'moment'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Space, Table, Typography, message, Tabs, Row, Col } from 'antd'

const { Search } = Input
import decodeJWT from '../../utils/decode-JWT'
const { Title, Text } = Typography
const { TabPane } = Tabs
import 'moment/locale/vi'
const MoreSettings = () => {
  return (
    <svg
      className="w-5 h-5 opacity-80"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.0001 9.32C13.1901 9.32 14.1601 8.35 14.1601 7.16C14.1601 5.97 13.1901 5 12.0001 5C10.8101 5 9.84009 5.97 9.84009 7.16C9.84009 8.35 10.8101 9.32 12.0001 9.32Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.78988 18.9999C7.97988 18.9999 8.94988 18.0299 8.94988 16.8399C8.94988 15.6499 7.97988 14.6799 6.78988 14.6799C5.59988 14.6799 4.62988 15.6499 4.62988 16.8399C4.62988 18.0299 5.58988 18.9999 6.78988 18.9999Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.21 18.9999C18.4 18.9999 19.37 18.0299 19.37 16.8399C19.37 15.6499 18.4 14.6799 17.21 14.6799C16.02 14.6799 15.05 15.6499 15.05 16.8399C15.05 18.0299 16.02 18.9999 17.21 18.9999Z"
        stroke="#292D32"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default function Home() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userId = userFromLocalStorage.id
  const page = 1
  const pageSize = 100
  const { t } = useTranslation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    const user = queryParams.get('user')
    const decoded = decodeJWT(token)
  }, [location])

  return (
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="h-full pb-20 lg:pb-4">
        <div className="h-full p-3 overflow-auto scrollable-content">
          <Row gutter={[10, 10]} className="grid-container">
            {/* div1: 3 cột, 3 hàng */}
            <Col span={8} className="div1 bg-blue-300 h-48 flex items-center justify-center">
              <div>Div 1</div>
            </Col>

            {/* div2: 2 hàng */}
            <Col span={8} className="div2 bg-red-300 h-32 flex items-center justify-center">
              <div>Div 2</div>
            </Col>

            {/* div3: 2 hàng */}
            <Col span={8} className="div3 bg-green-300 h-32 flex items-center justify-center">
              <div>Div 3</div>
            </Col>

            {/* div4: 3 cột, 3 hàng */}
            <Col span={8} className="div4 bg-yellow-300 h-48 flex items-center justify-center">
              <div>Div 4</div>
            </Col>

            {/* div5: 2 hàng */}
            <Col span={8} className="div5 bg-purple-300 h-32 flex items-center justify-center">
              <div>Div 5</div>
            </Col>

            {/* div6: 2 hàng */}
            <Col span={8} className="div6 bg-pink-300 h-32 flex items-center justify-center">
              <div>Div 6</div>
            </Col>

            {/* div7: 4 hàng */}
            <Col span={8} className="div7 bg-indigo-300 h-64 flex items-center justify-center">
              <div>Div 7</div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
