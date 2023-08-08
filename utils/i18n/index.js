import English from './locales/en';
import Turkish from './locales/tr';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'English',
  fallbackLocale: 'English',
  defaultLocale: 'English',
  messages: {
    English,
    Turkish,
  }
}))