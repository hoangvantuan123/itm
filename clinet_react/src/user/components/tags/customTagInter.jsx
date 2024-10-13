import { Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  SmileOutlined,
  CloseCircleOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons'

const CustomTagInter = ({ status }) => {
  const { t } = useTranslation()

  let color, text, icon

  switch (status) {
    case 'waiting_interview':
      color = 'blue'
      text = t('Lên lịch phỏng vấn')
      icon = <ClockCircleOutlined />
      break
    case 'interviewed':
      color = 'cyan'
      text = t('Đã phỏng vấn')
      icon = <CheckCircleOutlined />
      break
    case 'waiting_result':
      color = 'orange'
      text = t('Đang đợi kết quả')
      icon = <SyncOutlined spin />
      break
    case 'accepted':
      color = 'green'
      text = t('Đã nhận')
      icon = <SmileOutlined />
      break
    case 'rejected':
      color = 'red'
      text = t('Không đạt')
      icon = <CloseCircleOutlined />
      break
    case 'worker':
      color = 'purple'
      text = t('Công nhân')
      icon = <ToolOutlined />
      break
    case 'staff':
      color = 'gold'
      text = t('Nhân viên')
      icon = <UserOutlined />
      break
    case true:
      color = 'green'
      text = t('Đã đồng bộ')
      icon = <CheckCircleOutlined />
      break
    case false:
      color = 'volcano'
      text = t('Chưa đồng bộ')
      icon = <CloseCircleOutlined />
      break
    default:
      color = 'default'
      text = t('Không xác định')
      icon = <ClockCircleOutlined />
      break
  }

  return (
    <Tag color={color}>
      {icon} {text}
    </Tag>
  )
}

export default CustomTagInter
