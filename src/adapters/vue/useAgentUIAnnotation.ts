/**
 * Vue 3 composable for agent-ui-annotation
 */

import { ref } from 'vue';
import type { OutputLevel } from '../../core/types';
import type { AgentUIAnnotationExpose } from './types';

/**
 * Composable for using agent-ui-annotation imperatively
 *
 * @example
 * ```vue
 * <script setup>
 * import { AgentUIAnnotation, useAgentUIAnnotation } from 'agent-ui-annotation/vue'
 *
 * const { ref: annotationRef, activate, copyOutput } = useAgentUIAnnotation()
 * </script>
 *
 * <template>
 *   <AgentUIAnnotation ref="annotationRef" />
 *   <button @click="activate">Start</button>
 *   <button @click="copyOutput()">Copy</button>
 * </template>
 * ```
 */
export function useAgentUIAnnotation() {
  const componentRef = ref<AgentUIAnnotationExpose | null>(null);

  const activate = () => {
    componentRef.value?.activate();
  };

  const deactivate = () => {
    componentRef.value?.deactivate();
  };

  const toggle = () => {
    componentRef.value?.toggle();
  };

  const copyOutput = async (level?: OutputLevel): Promise<boolean> => {
    return componentRef.value?.copyOutput(level) ?? Promise.resolve(false);
  };

  const getOutput = (level?: OutputLevel): string => {
    return componentRef.value?.getOutput(level) ?? '';
  };

  const clearAll = () => {
    componentRef.value?.clearAll();
  };

  return {
    ref: componentRef,
    activate,
    deactivate,
    toggle,
    copyOutput,
    getOutput,
    clearAll,
  };
}
