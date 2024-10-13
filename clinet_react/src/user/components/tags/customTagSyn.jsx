import { Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

const CustomTagSyn = ({ status }) => {
  let color
  let text
  let icon

  switch (status) {
    case true:
      color = 'green'
      text = 'Đã đồng bộ'
      icon = <CheckCircleOutlined />
      break
    case false:
      color = 'volcano'
      text = 'Chưa đồng bộ'
      icon = <CloseCircleOutlined />
      break
    default:
      color = 'default'
      text = 'Không xác định'
      icon = <CloseCircleOutlined />
      break
  }

  return (
    <Tag color={color} >
      {icon} {text}
    </Tag>
  )
}

export default CustomTagSyn
