import { Button } from 'antd'
import { Link } from 'react-router-dom'
import SuccessImage from '../../assets/success.png'

const SuccessNotification = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white px-4">
      <div className="text-center  flex flex-col items-center justify-between">
        <img src={SuccessImage} className=" mb-10 w-32 h-auto" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Thông Tin Đã Được Gửi!
        </h1>
        <p className="mt-4 text-gray-500">
          Cảm ơn bạn đã hoàn thành việc khai báo thông tin cá nhân.
        </p>
      </div>
    </div>
  )
}

export default SuccessNotification
