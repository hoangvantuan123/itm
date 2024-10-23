import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Input,
    Modal,
    Typography,
    Form,
    Select,
    Button,
    Card,
    Divider,
    Space,
    Switch,
    Checkbox,
    Drawer,
    Radio,
    message,
    Row,
    Col,
    DatePicker,
} from 'antd'
import { PostKeyImportNew } from '../../../features/keyImport/postKeyImport'

const { Title } = Typography
const { Option } = Select

export default function AddDefaultMapping({ isOpen, onClose, fetchData }) {
    const { t } = useTranslation()
    const [form] = Form.useForm()

    const handleFinish = async (values) => {
        const {
            original_name,
            mapped_name
        } = values

        const data = {
            original_name,
            mapped_name

        }

        try {
            const response = await PostKeyImportNew(data)
            if (response.data.success) {
                message.success(t('Tạo thành công'))
                form.resetFields()
                fetchData()
                onClose()
            } else {
                message.error(t('Lỗi khi tạo key!'))
            }
        } catch (error) {
            message.error(t('Lỗi khi tạo key!'))
        }
    }

    return (
        <Drawer
            title={
                <Title level={4}>
                    <span className="text-base"> {t('Add')}</span>
                </Title>
            }
            open={isOpen}
            closable={false}
            width={600}
            extra={[
                <Button key="cancel" onClick={onClose}>
                    {t('Hủy')}
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    className=" ml-2 border-gray-200  bg-indigo-600 text-white  shadow-sm text-sm"
                    onClick={() => form.submit()}
                >
                    {t('Lưu')}
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ textAlign: 'left' }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label={t('Original name')}
                            name="original_name"
                            style={{ textAlign: 'left' }}
                        >
                            <Input size="large" placeholder={t('original name')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label={t('Key')}
                            name="mapped_name"
                            style={{ textAlign: 'left' }}
                        >
                            <Input size="large" placeholder={t('mapped name')} />
                        </Form.Item>
                    </Col>

                </Row>

            </Form>
        </Drawer>
    )
}
