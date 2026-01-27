import { bootstrapApplication } from '@angular/platform-browser';
import { initI18n } from 'agent-ui-annotation';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Optional: Initialize i18n at app startup. Not needed if using English (default).
// Change locale to 'zh-CN' for Chinese, or omit this call entirely for English.
initI18n({ locale: 'en' });

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
