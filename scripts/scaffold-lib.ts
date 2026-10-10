import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'src');

const filesToCreate = [
  // db repositories
  'lib/db/repositories/documents.repository.ts',
  'lib/db/repositories/chunks.repository.ts',
  'lib/db/repositories/reports.repository.ts',
  'lib/db/repositories/contacts.repository.ts',
  'lib/db/repositories/facilities.repository.ts',
  'lib/db/repositories/settings.repository.ts',
  'lib/db/repositories/audit.repository.ts',
  'lib/db/queries/knowledge-search.sql',
  'lib/db/queries/sensor-history.sql',
  
  // auth
  'lib/auth/permissions.ts',
  'lib/auth/rate-limit.ts',
  'lib/auth/require-user.ts',
  
  // config
  'lib/config/app-config.ts',
  'lib/config/model-config.ts',
  'lib/config/security-config.ts',

  // ai & rag
  'lib/ai/ollama-client.ts',
  'lib/ai/model-manager.ts',
  'lib/ai/inference.ts',
  'lib/ai/prompt-builder.ts',
  'lib/ai/response-parser.ts',
  'lib/ai/safety-policy.ts',
  'lib/ai/uncertainty.ts',
  'lib/ai/token-limits.ts',
  'lib/rag/document-loader.ts',
  'lib/rag/text-extractor.ts',
  'lib/rag/chunker.ts',
  'lib/rag/embedding-provider.ts',
  'lib/rag/embedding-index.ts',
  'lib/rag/retriever.ts',
  'lib/rag/reranker.ts',
  'lib/rag/citation-builder.ts',
  'lib/rag/relevance-threshold.ts',
  'lib/rag/rag-pipeline.ts',

  // disaster & sensors & maps
  'lib/disaster/alert-engine.ts',
  'lib/disaster/threshold-engine.ts',
  'lib/disaster/trend-analysis.ts',
  'lib/disaster/report-validation.ts',
  'lib/disaster/freshness-policy.ts',
  'lib/disaster/risk-classification.ts',
  'lib/disaster/incident-service.ts',
  'lib/sensors/sensor-protocol.ts',
  'lib/sensors/sensor-validation.ts',
  'lib/sensors/reading-normalizer.ts',
  'lib/sensors/device-auth.ts',
  'lib/sensors/ingestion-service.ts',
  'lib/maps/local-map-provider.ts',
  'lib/maps/geojson-loader.ts',
  'lib/maps/coordinate-validation.ts',

  // offline & security & schemas
  'lib/offline/offline-state.ts',
  'lib/offline/capability-check.ts',
  'lib/offline/asset-manifest.ts',
  'lib/offline/sync-policy.ts',
  'lib/security/csrf.ts',
  'lib/security/headers.ts',
  'lib/security/input-validation.ts',
  'lib/security/path-validation.ts',
  'lib/security/file-validation.ts',
  'lib/security/secrets.ts',
  'lib/security/audit-logger.ts',
  'lib/security/redaction.ts',
  'lib/schemas/auth.schema.ts',
  'lib/schemas/chat.schema.ts',
  'lib/schemas/document.schema.ts',
  'lib/schemas/alert.schema.ts',
  'lib/schemas/sensor.schema.ts',
  'lib/schemas/report.schema.ts',
  'lib/schemas/settings.schema.ts',
  'lib/utils/dates.ts',
  'lib/utils/errors.ts',
  'lib/utils/logger.ts',
  'lib/utils/constants.ts',

  // hooks
  'hooks/use-auth.ts',
  'hooks/use-offline-status.ts',
  'hooks/use-ai-chat.ts',
  'hooks/use-alerts.ts',
  'hooks/use-sensor-readings.ts',
  'hooks/use-local-settings.ts',

  // types
  'types/rag.ts',
  'types/maps.ts',

  // workers
  'workers/document-index.worker.ts',
  'workers/embedding.worker.ts',
  'workers/report-processing.worker.ts'
];

function generateContent(filePath: string) {
  if (filePath.endsWith('.sql')) {
    return `-- SQL template for ${path.basename(filePath)}\n`;
  }
  
  if (filePath.startsWith('hooks/')) {
    const fnName = path.basename(filePath, '.ts').replace(/-([a-z])/g, g => g[1].toUpperCase());
    return `import { useState } from 'react';\n\nexport function ${fnName}() {\n  return {};\n}\n`;
  }
  
  if (filePath.startsWith('types/')) {
    return `// Type definitions for ${path.basename(filePath, '.ts')}\n`;
  }
  
  return `// Implementation for ${path.basename(filePath, '.ts')}\n`;
}

console.log(`Scaffolding ${filesToCreate.length} library/hook files...`);

for (const file of filesToCreate) {
  const fullPath = path.join(basePath, file);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, generateContent(file));
  }
}

console.log('Lib Scaffolding complete!');
