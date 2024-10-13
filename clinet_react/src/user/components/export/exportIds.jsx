import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    Input,
    Modal,
    Typography,
    Form,
    Select,
    Button,
    Row,
    Col,
    DatePicker,
    message,
    Spin,
} from 'antd'
import { ExportDataAPI } from '../../../features/export/exportData'

const { Title } = Typography
const { Option } = Select

export default function ExportDataViewIds({ isOpen, onClose, table , selectedRowKeys}) {
    console.log("selectedRowKeys" , selectedRowKeys)
    const { t } = useTranslation()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    // State cho các ô nhập
    const [nameTags, setNameTags] = useState([]);
    const [phoneNumberTags, setPhoneNumberTags] = useState([]);
    const [citizenshipIdTags, setCitizenshipIdTags] = useState([]);
    const [interviewDate, setInterviewDate] = useState(null);
    const [applicantType, setApplicantType] = useState([]);
    const [applicantStatus, setApplicantStatus] = useState([]);
    const [cid, setCid] = useState([]);

    const handleFinish = async (values) => {
        const { name_file, fileType, startDate, endDate } = values;

        setLoading(true);

        try {

            const parsedFilter = {
                nameTags: nameTags,
                /*  */
            };

            const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
            const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';

            const response = await ExportDataAPI(table, parsedFilter, formattedStartDate, formattedEndDate, fileType, selectedRowKeys);

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name_file}.${fileType}`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            message.success(t('Xuất dữ liệu thành công!'));
            onClose();
        } catch (error) {
            console.error(error.message);
            message.error(t('Có lỗi xảy ra trong quá trình xuất dữ liệu.'));
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };

    return (
        <Modal
            title={
                <Title level={4}>
                    <span className="text-base"> {t('Tải xuống dữ liệu')}</span>
                </Title>
            }
            open={isOpen}
            onCancel={onClose}
            width={900}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    {t('Hủy')}
                </Button>,
                <Button
                    key="submit"
                    className="ml-2 border-gray-200 bg-indigo-600 text-white shadow-sm text-sm"
                    onClick={() => form.submit()}
                    loading={loading} 
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
                    <Col span={18}>
                        <Form.Item
                            label={t('Tên file')}
                            name="name_file"
                            rules={[{ required: true, message: t('Tên file tải!') }]}
                        >
                            <Input size="large" placeholder={t('Tên file')} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label={t('Chọn loại tệp')}
                            name="fileType"
                            rules={[{ required: true, message: t('Chọn loại tệp là bắt buộc!') }]}
                        >
                            <Select size="large" placeholder={t('Chọn loại tệp')}>
                                <Option value="csv">{t('CSV')}</Option>
                                <Option value="xlsx">{t('Excel')}</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                   
                </Row>
            </Form>
        </Modal>
    )
}
