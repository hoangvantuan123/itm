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

export default function ExportDataView({ isOpen, onClose, table }) {
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
                phoneNumberTags: phoneNumberTags,
                citizenshipIdTags: citizenshipIdTags,
                interviewDate: interviewDate ? interviewDate.format('YYYY-MM-DD') : '',
                cid: cid,
                applicantType: applicantType,
                applicantStatus: applicantStatus
                /*  */
            };

            const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
            const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
            const ids = []

            const response = await ExportDataAPI(table, parsedFilter, formattedStartDate, formattedEndDate, fileType, ids);

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
                    <Col span={12}>
                        <Form.Item
                            label={t('Ngày bắt đầu')}
                            name="startDate"
                        >
                            <DatePicker size="large" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label={t('Ngày kết thúc')}
                            name="endDate"
                        >
                            <DatePicker size="large" style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <div className="mb-3">
                            <label className="block mb-1">Mã nhân viên:</label>
                            <Select
                                mode="tags"
                                value={cid}
                                onChange={setCid}
                                placeholder="Enter names"
                                size="large"
                                className="w-full"
                            >
                                {cid.map((tag) => (
                                    <Option key={tag} value={tag}>
                                        {tag}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-3">
                            <label className="block mb-1">{t('Tên')}</label>
                            <Select
                                mode="tags"
                                value={nameTags}
                                onChange={setNameTags}
                                placeholder={t('Nhập tên')}
                                size="large"
                                className="w-full"
                            >
                                {nameTags.map((tag) => (
                                    <Option key={tag} value={tag}>
                                        {tag}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-3">
                            <label className="block mb-1">{t('Số điện thoại')}</label>
                            <Select
                                mode="tags"
                                value={phoneNumberTags}
                                onChange={setPhoneNumberTags}
                                placeholder={t('Nhập số điện thoại')}
                                size="large"
                                className="w-full"
                            >
                                {phoneNumberTags.map((tag) => (
                                    <Option key={tag} value={tag}>
                                        {tag}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-3">
                            <label className="block mb-1">{t('Căn cước công dân')}</label>
                            <Select
                                mode="tags"
                                value={citizenshipIdTags}
                                onChange={setCitizenshipIdTags}
                                placeholder={t('Nhập Căn cước công dân')}
                                size="large"
                                className="w-full"
                            >
                                {citizenshipIdTags.map((tag) => (
                                    <Option key={tag} value={tag}>
                                        {tag}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-3">
                            <label className="block mb-1">{t('Thời gian phỏng vấn')}</label>
                            <DatePicker
                                value={interviewDate}
                                onChange={setInterviewDate}
                                format="YYYY-MM-DD"
                                className="cursor-pointer w-full"
                                size="large"
                            />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-3">
                            <label className="block mb-1">{t('Loại ứng viên')}</label>
                            <Select
                                mode="tags"
                                value={applicantType}
                                onChange={setApplicantType}
                                placeholder={t('Loại ứng viên')}
                                size="large"
                                className="w-full"
                            >
                                {applicantType.map((tag) => (
                                    <Option key={tag} value={tag}>
                                        {tag}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="mb-3">
                            <label className="block mb-1">{t('Trạng thái')}</label>
                            <Select
                                mode="tags"
                                value={applicantStatus}
                                onChange={setApplicantStatus}
                                placeholder={t('Trạng thái')}
                                size="large"
                                className="w-full"
                            >
                                <Option value="waiting_interview">{t('Lên lịch phỏng vấn')}</Option>
                                <Option value="interviewed">{t('Đã phỏng vấn')}</Option>
                                <Option value="waiting_result">{t('Đang đợi kết quả')}</Option>
                                <Option value="accepted">{t('Đã nhận')}</Option>
                                <Option value="rejected">{t('Không đạt')}</Option>
                            </Select>
                        </div>
                    </Col>

                </Row>
            </Form>
        </Modal>
    )
}
