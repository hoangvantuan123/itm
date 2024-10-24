import { Button } from 'antd'
import { Link } from 'react-router-dom'
import SuccessImage from '../../assets/success.png'
import { useTranslation } from 'react-i18next'
const SuccessNotification = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div className="text-center  flex flex-col items-center justify-between">
        <img src={SuccessImage} className=" mb-10 w-32 h-auto" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {t('api_status.send_success')}
        </h1>
        <p className="mt-4 text-gray-500">
        {t('api_status.note_send_success')}
        </p>
      </div>
    </div>
  )
}

export default SuccessNotification
