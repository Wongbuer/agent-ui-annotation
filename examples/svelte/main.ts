import { mount } from 'svelte';
import { initI18n } from 'agent-ui-annotation';
import App from './App.svelte';

// Optional: Initialize i18n at app startup. Not needed if using English (default).
// Change locale to 'zh-CN' for Chinese, or omit this call entirely for English.
initI18n({ locale: 'en' });

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
