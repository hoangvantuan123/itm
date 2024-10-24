import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Input,
  Button,
  Typography,
  Dropdown,
  Menu,
  Spin,
  message,
} from 'antd'
import Logo from '../../assets/ItmLogo.png'
import { GetFindByPhone } from '../../features/hrRecruitment/getFindByPhone'
const { Title, Text } = Typography
import { useTranslation } from 'react-i18next'

const WorkerDeclarationPassForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('Tiếng Việt')
  const [loading, setLoading] = useState(false)
  const [data, setDaa] = useState([])
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = async (values) => {
    try {
      const response = await GetFindByPhone(values.phoneNumber)
      if (response.success) {
        const data = response.data.data
        setDaa(data)
        const routerPath = `/public/apply/form/2/${data.router}`
        navigate(`${routerPath}`)
      } else {
        message.error('api_status.error')
      }
    } catch (error) {
      const routerPath = `/public/apply/form/2/new`
      navigate(`${routerPath}`)
    }
  }

  const handleMenuClick = (e) => {
    setLanguage(e.key)
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Tiếng Việt">{t('Tiếng Việt')}</Menu.Item>
      <Menu.Item key="English">{t('English')}</Menu.Item>
      <Menu.Item key="Français">{t('Français')}</Menu.Item>
      <Menu.Item key="日本語">{t('日本語')}</Menu.Item>
      <Menu.Item key="한국어">{t('한국어')}</Menu.Item>
    </Menu>

  )

  return (
    <div className="flex flex-col h-screen bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center justify-between ">
          <img src={Logo} alt="Logo" className="mr-2" style={{ maxHeight: '40px' }} />
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <Button className="border-none p-2 bg-none shadow-none">
            {language}
          </Button>
        </Dropdown>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <Title level={2} className="text-center">
          {t('page_phone_pass.title_note_1')}
        </Title>
        <Text
          type="secondary"
          style={{
            marginBottom: '20px',
            display: 'block',
            textAlign: 'center',
          }}
        >
          {t('page_phone_pass.title_note_2')}
        </Text>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Form
            onFinish={handleSubmit}
            style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}
          >
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: t('page_phone_pass.rules_phone_number') },
                { len: 10, message: t('page_phone_pass.rules_phone_number_2') },
                {
                  pattern: /^\d+$/,
                  message: t('page_phone_pass.rules_phone_number_6'),
                },
              ]}
            >
              <Input
                value={phoneNumber}
                className="bg-white hover:bg-white"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={t('page_phone_pass.note_phone_number')}
                type="tel"
                size="large"
                inputMode="numeric"
              />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                className="w-full rounded-lg h-full border-none bg-indigo-600 text-white shadow-sm"
                htmlType="submit"
              >
                {t('page_phone_pass.submit')}
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  )
}

export default WorkerDeclarationPassForm
