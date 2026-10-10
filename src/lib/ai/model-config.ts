/**
 * Local AI Model Configuration & Status Detector for Bantay AI
 * Evaluates whether Ollama / local LLM runtime is active and accessible offline.
 */

export interface LocalModelConfig {
  provider: 'ollama' | 'llamacpp' | 'embedded_rule_engine';
  baseUrl: string;
  modelName: string;
  temperature: number;
  maxTokens: number;
  isOfflineReady: boolean;
  statusText: string;
}

export const defaultModelConfig: LocalModelConfig = {
  provider: 'ollama',
  baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  modelName: process.env.OLLAMA_MODEL || 'llama3:8b',
  temperature: 0.2, // Low temperature for deterministic disaster guidance
  maxTokens: 1024,
  isOfflineReady: true,
  statusText: 'OFFLINE MODE — Local AI and installed disaster knowledge are available.'
};

export async function checkLocalModelReadiness(baseUrl = defaultModelConfig.baseUrl): Promise<{
  isOnline: boolean;
  modelName: string;
  message: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const res = await fetch(`${baseUrl}/api/tags`, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const models = data.models || [];
      const hasModel = models.some((m: any) => m.name.includes('llama') || m.name.includes('mistral') || m.name.includes('qwen'));
      
      return {
        isOnline: true,
        modelName: models[0]?.name || defaultModelConfig.modelName,
        message: hasModel 
          ? `Local LLM ready (${models[0]?.name})` 
          : `Ollama active. Recommended model: ${defaultModelConfig.modelName}`
      };
    }
  } catch (error) {
    // LLM server offline
  }

  return {
    isOnline: false,
    modelName: 'Built-in Local RAG Engine',
    message: 'Local Rule RAG Engine active (Offline fallback).'
  };
}
