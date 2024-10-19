import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Typography, Table, Layout, Row, Col, Card, Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { GetHrSalaryCidId } from '../../features/hrSalary/getHrSalaryCidID';
import 'moment/locale/vi';
import '../../static/css/scroll_container.css';
import { debounce } from 'lodash';
import Spinner from './load'
const { Title } = Typography;
const { Content } = Layout;

const DetailPayrollUser = React.memo(({ permissions }) => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'))
    const CID = userFromLocalStorage.employeeCode || 0
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    return (
        <div className="w-full h-screen overflow-auto bg-white p-3  pb-24">
            <Helmet>
                <title>ITM </title>
            </Helmet>


        </div>
    );
});

export default DetailPayrollUser;
