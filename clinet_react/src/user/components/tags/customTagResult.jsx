import { Tag } from 'antd'

const CustomTagResult = ({ status }) => {
  let color
  let text

  switch (status) {
    case 'Pending':
      color = 'green'
      text = 'Pending'
      break
    case 'Not Send Yet':
      color = 'volcano'
      text = 'Not Send Yet'
      break
    default:
      color = 'default'
      text = 'Chưa đánh giá'
      break
  }

  return <Tag color={color}>{text}</Tag>
}

export default CustomTagResult
