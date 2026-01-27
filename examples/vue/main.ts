import { createApp } from 'vue';
import { initI18n } from 'agent-ui-annotation';
import App from './App.vue';

// Optional: Initialize i18n at app startup. Not needed if using English (default).
// Change locale to 'zh-CN' for Chinese, or omit this call entirely for English.
initI18n({ locale: 'en' });

createApp(App).mount('#app');
