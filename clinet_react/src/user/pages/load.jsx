import { Spin } from 'antd'
import BG from '../../assets/bg.png'

const Spinner = () => {
  return (
    <div className="grid h-screen place-content-center  bg-white px-4">
      {' '}
      {/*   <img src={BG} alt="Loading" className="w-full h-full" /> */}
      <Spin tip="Loading" size="large"></Spin>
    </div>
  )
}

export default Spinner
