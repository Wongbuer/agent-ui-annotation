/**
 * Core i18n functions
 * Lightweight internationalization (~500 bytes minified)
 */

import type { TranslationStrings, I18nOptions, PartialTranslationStrings } from './types';
import { en } from './locales/en';
import { zhCN } from './locales/zh-CN';

/** Built-in locales registry */
const locales: Map<string, TranslationStrings> = new Map([
  ['en', en],
  ['zh-CN', zhCN],
]);

/** Current active translations */
let currentTranslations: TranslationStrings = en;

/** Whether to translate output (default: false for AI compatibility) */
let translateOutput = false;

/** English translations for output fallback */
const englishTranslations: TranslationStrings = en;

/**
 * Register a custom locale
 */
export function registerLocale(locale: string, translations: TranslationStrings): void {
  locales.set(locale, translations);
}

/**
 * Deep merge translation strings
 */
function deepMergeTranslations(
  target: TranslationStrings,
  source: PartialTranslationStrings
): TranslationStrings {
  const result = { ...target };

  for (const key of Object.keys(source) as (keyof TranslationStrings)[]) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (sourceValue !== undefined && targetValue !== undefined) {
      if (
        typeof sourceValue === 'object' &&
        sourceValue !== null &&
        typeof targetValue === 'object' &&
        targetValue !== null
      ) {
        // Merge nested objects
        (result as Record<string, unknown>)[key] = {
          ...targetValue,
          ...sourceValue,
        };
      }
    }
  }

  return result;
}

/**
 * Initialize i18n with options
 */
export function initI18n(options: I18nOptions = {}): void {
  const { locale = 'en', translations, translateOutput: shouldTranslateOutput = false } = options;

  // Get base locale translations
  let base = locales.get(locale);

  // Fallback to English if locale not found
  if (!base) {
    console.warn(`[i18n] Locale "${locale}" not found, falling back to English`);
    base = en;
  }

  // Merge custom translations if provided
  if (translations) {
    currentTranslations = deepMergeTranslations(base, translations);
  } else {
    currentTranslations = base;
  }

  translateOutput = shouldTranslateOutput;
}

/**
 * Get nested value from object by dot-separated key path
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Interpolate variables in a string
 * Replaces {{variable}} with the value from params
 */
function interpolate(str: string, params?: Record<string, string | number>): string {
  if (!params) return str;

  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const value = params[key];
    return value !== undefined ? String(value) : `{{${key}}}`;
  });
}

/**
 * Get translated string for UI elements
 * @param key Dot-separated key path (e.g., 'toolbar.settings')
 * @param params Optional interpolation parameters
 */
export function t(key: string, params?: Record<string, string | number>): string {
  const value = getNestedValue(currentTranslations as unknown as Record<string, unknown>, key);

  if (value === undefined) {
    // Fallback to English
    const fallback = getNestedValue(englishTranslations as unknown as Record<string, unknown>, key);
    if (fallback === undefined) {
      console.warn(`[i18n] Missing translation for key: ${key}`);
      return key;
    }
    return interpolate(fallback, params);
  }

  return interpolate(value, params);
}

/**
 * Get translated string for markdown output
 * Respects translateOutput flag - returns English if false
 * @param key Dot-separated key path (e.g., 'output.location')
 * @param params Optional interpolation parameters
 */
export function tOutput(key: string, params?: Record<string, string | number>): string {
  const translations = translateOutput ? currentTranslations : englishTranslations;
  const value = getNestedValue(translations as unknown as Record<string, unknown>, key);

  if (value === undefined) {
    // Always fallback to English for output
    const fallback = getNestedValue(englishTranslations as unknown as Record<string, unknown>, key);
    if (fallback === undefined) {
      console.warn(`[i18n] Missing translation for key: ${key}`);
      return key;
    }
    return interpolate(fallback, params);
  }

  return interpolate(value, params);
}

/**
 * Get the current locale's translations (for testing/debugging)
 */
export function getCurrentTranslations(): TranslationStrings {
  return currentTranslations;
}

/**
 * Check if translateOutput is enabled
 */
export function isOutputTranslationEnabled(): boolean {
  return translateOutput;
}

/**
 * Reset i18n to default state (useful for testing)
 */
export function resetI18n(): void {
  currentTranslations = en;
  translateOutput = false;
}
