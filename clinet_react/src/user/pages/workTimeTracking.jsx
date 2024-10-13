import { useState, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { Input, Space, Table, Typography, message, Tabs } from 'antd'

const { Search } = Input
import decodeJWT from '../../utils/decode-JWT'
const { Title, Text } = Typography
const { TabPane } = Tabs
import 'moment/locale/vi'

export default function WorkTimeTracking() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
  const userNameLogin = userFromLocalStorage?.login || 'none'

  const userId = userFromLocalStorage.id
  const page = 1
  const pageSize = 100
  const { t } = useTranslation()
  return (
    <div className="w-full h-screen bg-slate-50">
      <Helmet>
        <title>ITM - {t('page_setting.helmet_setting')}</title>
      </Helmet>
      <div>
        <div className="p-3 h-screen overflow-hidden flex flex-col">
          Menu action Chấm công Setting : {userNameLogin}{' '}
        </div>
      </div>
    </div>
  )
}
