import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Image,
  notification,
} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { loginAuth } from '../../features/auth/API/authAPI'
import decodeJWT from '../../utils/decode-JWT'
import BG from '../../assets/bgr.jpg'
import Logo from '../../assets/ItmLogo.png'
import Cookies from 'js-cookie'

const { Title, Text } = Typography

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    const { login, password } = values

    try {
      setLoading(true)
      setError(null)

      const response = await loginAuth({ login, password })

      if (response.success) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        localStorage.setItem('language', response.data.user.language)

        Cookies.set('accessToken', response.data.token)

        window.location.href = '/u/home'
      } else {
        setError(response.error)
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token')
    const user = queryParams.get('user')
    const decoded = decodeJWT(token)

    if (token && decoded) {
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(decoded))

      window.location.href = '/u/home'
    }
  }, [location])

  return (
    <>
      <Helmet>
        <title>{t('auth.login')}</title>
      </Helmet>
      <div className="min-h-screen  flex flex-col lg:flex-row items-center justify-center overflow-hidden ">
        {/* Cột chứa ảnh */}
        <div className="hidden lg:flex lg:w-1/2 p-2   h-screen items-center justify-center">
          <img
            src={BG}
            alt="Description of image"
            className="w-full h-full object-cover   rounded-2xl"
          />
        </div>

        {/* Cột chứa form login */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-5  pt-36  ">
          <div className="flex flex-col items-center top-20  absolute">
            <img
              src={Logo}
              alt="Company Logo"
              className=" w-60 h-auto mb-4 rounded-md"
            />

          </div>

          <div className="mx-auto max-w-lg text-center mb-5 mt-3 ">
            <h1 className="text-2xl font-bold sm:text-3xl">Welcome Back!</h1>
            <p className="mt-4 text-gray-500  text-xs">
              ITM Semiconductor CO., Ltd, a company that gives trust to
              customers and happiness to employees, value shared growth to
              shareholders.
            </p>
          </div>

          <Form
            onFinish={onFinish}
            layout="vertical"
            className="w-full sm:w-2/3 md:w-1/2 lg:w-2/3 xl:w-1/2"
          >
            <Form.Item
              name="login"
              rules={[
                { required: true, message: 'Please enter your Employee ID!' },
              ]}
            >
              <Input
                className="w-full p-3 text-sm "
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Employee ID"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter your Password!' },
              ]}
            >
              <Input.Password
                className="w-full  p-3 text-sm "
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            {error && (
              <div className="flex items-center justify-center mb-5 gap-2 self-end rounded bg-red-100 p-1 text-red-600">
                <span className="text-xs font-medium">{error}</span>
              </div>
            )}
            <Form.Item>
              <button
                type="submit"
                className="w-full rounded-lg h-full  bg-gray-700 text-white mt-4 p-3 text-base hover:bg-gray-700 first-line:relative hover:text-white"
                size="large"
              >
                Log in
              </button>

            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}
