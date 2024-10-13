import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationVI from './src/locales/vi.json'
import translationEN from './src/locales/en.json'

const savedLanguage = localStorage.getItem('language') || 'en'

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: translationVI,
    },
    en: {
      translation: translationEN,
    },
  },
  lng: savedLanguage, // Sử dụng ngôn ngữ từ localStorage hoặc 'vi'
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // Không cần escape HTML trong React
  },
})

export default i18n
