import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Button, Typography } from 'antd';
import 'moment/locale/vi';
import Logo from '../../assets/ItmLogo.png';

const { Title, Text } = Typography;

export default function DownloadView() {
    const { t } = useTranslation();
    const [selectedOS, setSelectedOS] = useState('mac');

    // Handle OS selection
    const handleSelectOS = (os) => {
        setSelectedOS(os);
    };

    return (
        <div className="w-full h-screen bg-white flex items-center justify-center">
            <Helmet>
                <title>ITM - {t('Download')}</title>
            </Helmet>
            <div className="text-center">
                <img src={Logo} alt="Download Illustration" className="w-80 h-auto mb-32 mx-auto" />

                <Title level={2} className="mt-4 text-gray-800">
                    {t('Download')}
                </Title>

                <Text className="mt-2 text-gray-600 w-10">
                    {t('Available for macOS and Windows. Download the latest version now to enjoy our features and improvements.')}
                </Text>
                
                <div className="flex items-center justify-center mt-6 space-x-8">
                    <div
                        className={`cursor-pointer flex flex-col items-center p-4 w-28 rounded-lg transition-all ${selectedOS === 'mac' ? 'bg-[#e5e7ebaa]' : 'bg-slate-50'}`} 
                        onClick={() => handleSelectOS('mac')}
                    >
                        <svg fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-157.3-82.8-65.9-5.2-138 38.4-164.4 38.4-27.9 0-91.7-36.6-141.9-36.6C273.1 298.8 163 379.8 163 544.6c0 48.7 8.9 99 26.7 150.8 23.8 68.2 109.6 235.3 199.1 232.6 46.8-1.1 79.9-33.2 140.8-33.2 59.1 0 89.7 33.2 141.9 33.2 90.3-1.3 167.9-153.2 190.5-221.6-121.1-57.1-114.6-167.2-114.6-170.7zm-105.1-305c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"></path>
                        </svg>
                        <Text>{t('macOS')}</Text>
                    </div>

                    <div
                        className={`cursor-pointer flex flex-col items-center w-28 p-4 rounded-lg transition-all ${selectedOS === 'windows' ? 'bg-[#e5e7ebaa]' : 'bg-slate-50'}`} 
                        onClick={() => handleSelectOS('windows')}
                    >
                        <svg fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"></path>
                        </svg>
                        <Text>{t('Windows')}</Text>
                    </div>
                </div>

                {selectedOS && (
                    <div className="mt-10 p-2">
                        {selectedOS === 'mac' && (
                            <a 
                                href="/downloads/ITM-1.0.0.dmg" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className=" w-52 rounded-lg h-full bg-gray-700 text-white mt-4 p-3 text-base hover:bg-gray-800"
                            >
                                {t('Download for macOS')}
                            </a>
                        )}
                        {selectedOS === 'windows' && (
                            <a 
                                href="/downloads/ITM Setup 1.0.0.exe" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-52 rounded-lg h-full bg-gray-700 text-white mt-4 p-3 text-base hover:bg-gray-800"
                            >
                                {t('Download for Windows')}
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
