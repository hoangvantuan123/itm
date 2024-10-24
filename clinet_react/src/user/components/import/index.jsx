import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Input,
  Drawer,
  Typography,
  Button,
  Upload,
  message,
  Select,
  Table,
  Checkbox,
  Layout,
  Row,
  Col,
  Dropdown,
  Spin,
  InputNumber,
} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { importData } from '../../../features/import/import'
import { TestImportData } from '../../../features/import/test_import'
import BG from '../../../assets/ItmLogo.png'
const { Option, OptGroup } = Select

const FileIcon = () => {
  return (
    <svg
      className="w-4 h-4 opacity-50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 2H15.2C16.8802 2 17.7202 2 18.362 2.32698C18.9265 2.6146 19.3854 3.07354 19.673 3.63803C20 4.27976 20 5.11984 20 6.8V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V16.5M16 13H11.5M16 9H12.5M16 17H8M6 10V4.5C6 3.67157 6.67157 3 7.5 3C8.32843 3 9 3.67157 9 4.5V10C9 11.6569 7.65685 13 6 13C4.34315 13 3 11.6569 3 10V6"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ImportForm({
  fetchData,
  isOpen,
  onClose,
  tableInfo,
  actionImport,
  keyImport
}) {
  const { t } = useTranslation()
  const [fileList, setFileList] = useState([])
  const [fileName, setFileName] = useState(null)
  const [tables, setTables] = useState([])
  const [selectedColumns, setSelectedColumns] = useState([])
  const [selectedTable, setSelectedTable] = useState(null)
  const [connectValues, setConnectValues] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [row, setRow] = useState(0)
 
  const handleUpload = async () => {
    if (!selectedTable || Object.keys(connectValues).length === 0) {
      message.error(t('page_import.error_upload'))
      return
    }

    setIsLoading(true)

    try {
      const mappedData = selectedTable.data.map((row) => {
        const newRow = {}
        selectedTable.columns.forEach((col) => {
          const mappedColumn = connectValues[col]
          if (mappedColumn) {
            newRow[mappedColumn] = row[col]
          }
        })
        return newRow
      })

      const batchSize = 1000
      const totalRows = mappedData.length
      const promises = []

      for (let i = 0; i < totalRows; i += batchSize) {
        const batch = mappedData.slice(i, i + batchSize)

        const data = {
          method: 'execute_import',
          model: actionImport,
          data: batch,
        }

        promises.push(importData(data))
      }

      const results = await Promise.all(promises)
      results.forEach((result) => {
        if (result.data.status === 200) {
          fetchData()
          message.success(t('page_import.success'))
          onClose()
        } else if (result.data.status === 400) {
          message.error(t(`error: ${result.message}`))
        }
      })
    } catch (error) {
      if (error.response && error.response.data) {
        const { status, message: errorMessage } = error.response.data
        message.error(
          t(`page_import.error_import: ${errorMessage}`),
        )
      } else {
        message.error(t('page_import.error_import'))
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (info) => {
    const { file, fileList } = info;
    const isCsvOrXlsx =
        file.type === 'text/csv' ||
        file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

    if (!isCsvOrXlsx) {
        message.error(t('page_import.error'));
        return;
    }

    setFileName(file.name);
    setFileList(fileList);
    setTables([]);

    const newConnectValues = {};
    
    const dateFields = [
        'Interview date',
        'Start date',
        'Date of birth',
        'Ngày cấp',
        'Entering day',
        'Leaving day',
        'Ngày ký HĐ lần 1',
        'Ngày ký HĐ lần 2',
        'Children birth date 1',
        'Children birth date 2',
        'Children birth date 3',
        'Entrance day 1',
        'Entrance day 2',
        'Leaving day 1',
        'Leaving day 2',
    ];

    const ExcelDateToJSDate = (date) => {
        return new Date(Math.round((date - 25569) * 86400 * 1000));
    };

    const formatDateToString = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (file.type === 'text/csv') {
        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = e.target.result;
            Papa.parse(csvData, {
                complete: (result) => {
                    if (result.errors.length) {
                        console.error('Errors:', result.errors);
                    }

                    if (!result.data || result.data.length === 0) {
                        message.error(t('page_import.none_data'));
                        return;
                    }

                    // Check if result.data[0] is defined
                    if (result.data.length > 0) {
                        const columns = Object.keys(result.data[0]);
                        setTables([{ name: 'CSV Data', columns, data: result.data }]);
                    }

                    tableInfo?.forEach((table) => {
                        table.columns.forEach((column) => {
                            for (const [key, mappedName] of Object.entries(keyImport)) {
                                if (column.name === mappedName) {
                                    newConnectValues[key] = column.name;
                                }
                            }
                        });
                    });

                    setConnectValues(newConnectValues);
                    message.success(t('page_import.import_csv'));
                },
                header: true,
                skipEmptyLines: true,
            });
        };

        reader.readAsText(file);
    } else if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const allTables = [];

            workbook.SheetNames.forEach((sheetName) => {
                const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                if (worksheet.length > 0) { // Ensure worksheet has data
                    const columns = Object.keys(worksheet[0]);
                    const wrappedData = worksheet.map((row) => {
                        return Object.fromEntries(
                            Object.entries(row).map(([key, value]) => {
                                if (dateFields.includes(key) && !isNaN(value)) {
                                    const dateValue = ExcelDateToJSDate(Number(value));
                                    value = formatDateToString(dateValue);
                                }
                                return [key, String(value)];
                            }),
                        );
                    });

                    allTables.push({ name: sheetName, columns, data: wrappedData });
                }
            });

            setTables(allTables);

            tableInfo?.forEach((table) => {
                table.columns.forEach((column) => {
                    for (const [key, mappedName] of Object.entries(keyImport)) {
                        if (column.name === mappedName) {
                            newConnectValues[key] = column.name;
                        }
                    }
                });
            });

            setConnectValues(newConnectValues);
            message.success(t('page_import.import_xlsx'));
        };

        reader.readAsArrayBuffer(file.originFileObj || file);
    }
};


  const handleConnectChange = (value, key) => {
    setConnectValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }))
  }

  const columns = [
    {
      title: t('page_import.name'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className=" flex flex-col">
          {' '}
          <h3 className=" font-bold">{record.name}</h3> {record.span}
        </div>
      ),
    },
    {
      title: t('page_import.connect'),
      dataIndex: 'connect',
      key: 'connect',
      render: (text, record) => (
        <Select
          value={connectValues[record.key] || undefined}
          onChange={(value) => handleConnectChange(value, record.key)}
          style={{ width: '100%' }}
          allowClear
          size="large"
          showSearch
          placeholder={t('page_import.note_connect')}
        >
          {tableInfo?.map((table) => (
            <OptGroup
              key={table.name}
              label={
                <span className="font-bold sticky-header">
                  {' '}
                  Model : {table.name}
                </span>
              }
            >
              {table.columns.map((column) => (
                <Option
                  key={`${table.name}-${column.name}`}
                  value={column.name}
                  disabled={Object.values(connectValues).includes(column.name)}
                >
                  <span className="flex items-center gap-3">
                    <FileIcon /> {t(`execute_import.${column.name}`)} -{' '}
                    <span className="italic  text-red-400">{column.type}</span>
                  </span>
                </Option>
              ))}
            </OptGroup>
          ))}
        </Select>
      ),
    },
    {
      title: t('page_import.note_col'),
      dataIndex: 'note',
      key: 'note',
    },
  ]
  useEffect(() => {
    if (isOpen === false) {
      setSelectedColumns([])
      setSelectedTable(null)
      setConnectValues({})
      setFileList([])
      setFileName([])
      setTables([])
    }
  }, [isOpen])
  const dataSource = selectedTable
    ? selectedTable.columns.map((col) => ({
        key: col,
        name: col,
        connect: connectValues[col] || '',
        note: `Ghi chú cho ${col}`,
        span:
          selectedTable.data.length > row
            ? selectedTable.data[row][col] || ''
            : '',
      }))
    : []

  const onChange = (value) => {
    setRow(value)
  }
  return (
    <Drawer
      title="Import"
      open={isOpen}
      onClose={onClose}
      width="100%"
      height={500}
      closable={false}
      extra={[
        <Button key="cancel" onClick={onClose}>
          {t('page_import.cancel')} 
        </Button>,
        <Upload
          accept=".csv, .xlsx"
          beforeUpload={() => false}
          onChange={handleFileChange}
          fileList={fileList}
          maxCount={1}
          className="ml-2"
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>{t('page_import.add_file')}</Button>
        </Upload>,
      ]}
    >
      {tables.length === '' ||
        (fileList.length === 0 && (
          <>
            <div className="grid h-[calc(100vh-300px)] overflow-hidden">
              <div className="flex flex-col justify-center items-center text-center h-full">
              <img src={BG} className=" opacity-80 h-auto mb-10" />

                <h1 className="mt-6 text-base font-bold tracking-tight text-gray-900">
                  {t(
                    'page_import.title_note_1',
                  )}
                </h1>
                <p className="ant-upload-hint">
                  {t(
                    'page_import.title_note_2',
                  )}
                </p>

                <Upload
                  accept=".csv, .xlsx"
                  beforeUpload={() => false}
                  onChange={handleFileChange}
                  fileList={fileList}
                  maxCount={1}
                  className="mt-5"
                >
                  <Button icon={<UploadOutlined />}>{t('page_import.add_file')}</Button>
                </Upload>
              </div>
            </div>
          </>
        ))}

      <Spin spinning={isLoading}>
        {' '}
        {tables.length > 0 && (
          <Row
            gutter={[16, 16]}
            className="  h-[calc(100vh-120px)] overflow-hidden"
          >
            <Col xs={24} sm={4} className=" border-r">

            <Button
                  size="large"
                  onClick={handleUpload}
                  className="w-full mb-5 border-gray-300 bg-blue-500 text-white text-sm hover:bg-blue-600"
                >
                  {t('page_import.import')}
                </Button>
             
              <div>
                <h3 className="text-base font-semibold">{t('Tệp đã nhập')}</h3>
                <div className="mt-4 mb-3">
                  <p className=" text-base flex items-center gap-2 cursor-pointer hover:text-slate-950">
                    {' '}
                    {fileName}
                  </p>
                </div>
                <p>
                  {' '}
                  {t(
                    'page_import.title_note_3',
                  )}
                </p>

                <div className="mt-5">
                  <label className="block mb-2">{t('page_import.enter_quantity')}</label>
                  <InputNumber
                    min={0}
                    size="large"
                    max={100}
                    className="w-full"
                    defaultValue={0}
                    onChange={onChange}
                  />

                  <label className="block mt-4 mb-2">{t('page_import.select_spreadsheet')}</label>
                  <Select
                    showSearch
                    placeholder={t('page_import.sheets')}
                    optionFilterProp="children"
                    className="w-full"
                    size="large"
                    onSelect={(value) => {
                      const selectedTable = tables.find(
                        (table) => table.name === value,
                      )
                      setSelectedTable(selectedTable)
                      setSelectedColumns([])
                    }}
                  >
                    {tables.map((table, index) => (
                      <Option key={index} value={table.name}>
                        {table.name}
                      </Option>
                    ))}
                  </Select>
                </div>

               
              </div>
            </Col>
            <Col xs={24} sm={20}>
              <div className="h-screen overflow-auto">
                {selectedTable && (
                  <div
                    style={{
                      maxHeight: 'calc(100vh - 120px)',
                      overflowY: 'auto',
                    }}
                  >
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      pagination={false}
                      bordered
                      scroll={{ y: 'calc(100vh - 200px)', x: 'max-content' }}
                      className="cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Spin>
    </Drawer>
  )
}