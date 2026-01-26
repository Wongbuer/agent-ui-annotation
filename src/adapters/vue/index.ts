/**
 * Vue 3 adapter for agent-ui-annotation
 */

import { registerAnnotationElement } from '../../element/annotation-element';

// Ensure custom element is registered
registerAnnotationElement();

// Component and composable
export { default as AgentUIAnnotation } from './AgentUIAnnotation.vue';
export { useAgentUIAnnotation } from './useAgentUIAnnotation';

// Types
export type { AgentUIAnnotationProps, AgentUIAnnotationExpose, AgentUIAnnotationEmits } from './types';

// Re-export core types for convenience
export type {
  Annotation,
  AnnotationId,
  OutputLevel,
  ThemeMode,
  Settings,
  ElementInfo,
} from '../../core/types';

// Re-export element for advanced use cases
export { AnnotationElement } from '../../element/annotation-element';
