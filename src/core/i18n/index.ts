/**
 * i18n module exports
 */

export type {
  TranslationStrings,
  PartialTranslationStrings,
  I18nOptions,
  BuiltInLocale,
} from './types';

export {
  initI18n,
  registerLocale,
  t,
  tOutput,
  getCurrentTranslations,
  isOutputTranslationEnabled,
  resetI18n,
} from './i18n';

export { en } from './locales/en';
export { zhCN } from './locales/zh-CN';
