import { Tag } from 'antd'

const CustomTypePersonnel = ({ status }) => {
  let color
  let text

  switch (status) {
    case true:
      color = 'green'
      text = 'Công nhân'
      break
    case false:
      color = 'geekblue'
      text = 'Nhân viên'
      break
    default:
      color = 'default'
      text = 'Default '
      break
  }

  return <Tag color={color}>{text}</Tag>
}

export default CustomTypePersonnel
