import { Empty } from 'antd'
const NoData = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <Empty image={Empty.PRESENTED_IMAGE_DEFAULT} />
    </div>
  )
}

export default NoData
