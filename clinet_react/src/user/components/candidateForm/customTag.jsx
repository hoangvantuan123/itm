import { Tag } from 'antd'

const CustomTag = ({ status }) => {
  let color
  let text

  switch (status) {
    case true:
      color = 'green'
      text = 'Đạt'
      break
    case false:
      color = 'volcano'
      text = 'Không đạt'
      break
    default:
      color = 'default'
      text = 'Chưa đánh giá'
      break
  }

  return <Tag color={color}>{text}</Tag>
}

export default CustomTag
