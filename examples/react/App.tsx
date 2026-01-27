import { AgentUIAnnotation, useAgentUIAnnotation } from 'agent-ui-annotation/react';
import { initI18n } from 'agent-ui-annotation';

// Optional: Initialize i18n at app startup. Not needed if using English (default).
// Change locale to 'zh-CN' for Chinese, or omit this call entirely for English.
initI18n({ locale: 'en' });

export default function App() {
  const { ref, activate, copyOutput } = useAgentUIAnnotation();

  return (
    <>
      <h1>Agent UI Annotation - React</h1>
      <button onClick={activate}>Activate</button>
      <button onClick={() => copyOutput()}>Copy Output</button>

      <AgentUIAnnotation
        ref={ref}
        theme="auto"
        outputLevel="standard"
        onAnnotationCreate={(a) => console.log('Created:', a)}
        onCopy={(content) => console.log('Copied:', content)}
      />
    </>
  );
}
