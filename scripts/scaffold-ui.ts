import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'src');

const filesToCreate = [
  // App Router - Auth
  'app/auth/unlock/page.tsx',
  'app/auth/change-password/page.tsx',
  'app/auth/recovery/page.tsx',

  // App Router - Protected
  'app/(protected)/emergency/page.tsx',
  'app/(protected)/emergency/flood/page.tsx',
  'app/(protected)/emergency/typhoon/page.tsx',
  'app/(protected)/emergency/earthquake/page.tsx',
  'app/(protected)/emergency/first-aid/page.tsx',
  'app/(protected)/emergency/evacuation/page.tsx',
  'app/(protected)/emergency/emergency-kit/page.tsx',
  'app/(protected)/monitoring/sensors/page.tsx',
  'app/(protected)/monitoring/reports/page.tsx',
  'app/(protected)/monitoring/history/page.tsx',
  'app/(protected)/map/page.tsx',
  'app/(protected)/directory/page.tsx',
  'app/(protected)/knowledge/page.tsx',
  'app/(protected)/knowledge/[documentId]/page.tsx',
  'app/(protected)/history/page.tsx',
  'app/(protected)/reports/page.tsx',
  'app/(protected)/settings/page.tsx',
  'app/(protected)/settings/security/page.tsx',
  'app/(protected)/settings/privacy/page.tsx',
  'app/(protected)/settings/offline/page.tsx',
  'app/(protected)/settings/models/page.tsx',
  'app/(protected)/settings/backup/page.tsx',
  'app/(protected)/about/page.tsx',

  // App Router - Admin
  'app/admin/layout.tsx',
  'app/admin/page.tsx',
  'app/admin/users/page.tsx',
  'app/admin/knowledge/page.tsx',
  'app/admin/alerts/page.tsx',
  'app/admin/sensors/page.tsx',
  'app/admin/audit/page.tsx',
  'app/admin/system/page.tsx',

  // App Router - API Routes
  'app/api/auth/login/route.ts',
  'app/api/auth/register/route.ts',
  'app/api/auth/unlock/route.ts',
  'app/api/auth/change-password/route.ts',
  'app/api/auth/session/route.ts',
  'app/api/health/route.ts',
  'app/api/system/status/route.ts',
  'app/api/system/offline/route.ts',
  'app/api/system/diagnostics/route.ts',
  'app/api/ai/chat/route.ts',
  'app/api/ai/cancel/route.ts',
  'app/api/ai/models/route.ts',
  'app/api/ai/readiness/route.ts',
  'app/api/conversations/route.ts',
  'app/api/conversations/[conversationId]/route.ts',
  'app/api/knowledge/search/route.ts',
  'app/api/knowledge/documents/route.ts',
  'app/api/knowledge/import/route.ts',
  'app/api/knowledge/[documentId]/route.ts',
  'app/api/emergencies/route.ts',
  'app/api/emergencies/[emergencyId]/route.ts',
  'app/api/alerts/route.ts',
  'app/api/alerts/active/route.ts',
  'app/api/alerts/[alertId]/route.ts',
  'app/api/sensors/route.ts',
  'app/api/sensors/readings/route.ts',
  'app/api/sensors/devices/route.ts',
  'app/api/sensors/devices/[deviceId]/route.ts',
  'app/api/reports/route.ts',
  'app/api/reports/[reportId]/route.ts',
  'app/api/directory/route.ts',
  'app/api/maps/features/route.ts',
  'app/api/settings/route.ts',
  'app/api/backups/route.ts',
  'app/api/backups/verify/route.ts',
  'app/api/admin/users/route.ts',
  'app/api/admin/audit/route.ts',
  'app/api/admin/system/route.ts',

  // Components
  'components/layout/app-sidebar.tsx',
  'components/layout/app-header.tsx',
  'components/layout/mobile-navigation.tsx',
  'components/layout/page-container.tsx',
  'components/auth/login-form.tsx',
  'components/auth/register-form.tsx',
  'components/auth/password-field.tsx',
  'components/auth/session-lock.tsx',
  'components/dashboard/system-status-card.tsx',
  'components/dashboard/active-alerts-card.tsx',
  'components/dashboard/sensor-summary-card.tsx',
  'components/dashboard/quick-actions.tsx',
  'components/assistant/chat-panel.tsx',
  'components/assistant/chat-message.tsx',
  'components/assistant/chat-input.tsx',
  'components/assistant/source-citations.tsx',
  'components/assistant/retrieved-passages.tsx',
  'components/assistant/model-status.tsx',
  'components/emergency/emergency-action-card.tsx',
  'components/emergency/safety-instructions.tsx',
  'components/emergency/emergency-checklist.tsx',
  'components/emergency/uncertainty-notice.tsx',
  'components/monitoring/alert-banner.tsx',
  'components/monitoring/sensor-reading-card.tsx',
  'components/monitoring/water-level-chart.tsx',
  'components/monitoring/report-verification.tsx',
  'components/monitoring/last-updated-label.tsx',
  'components/maps/offline-map.tsx',
  'components/maps/map-legend.tsx',
  'components/maps/location-popup.tsx',
  'components/knowledge/document-list.tsx',
  'components/knowledge/document-viewer.tsx',
  'components/knowledge/source-metadata.tsx',
  'components/directory/emergency-contact-card.tsx',
  'components/directory/facility-card.tsx',
  'components/settings/offline-indicator.tsx',
  'components/settings/model-settings.tsx',
  'components/settings/backup-controls.tsx',
  'components/shared/loading-state.tsx',
  'components/shared/error-state.tsx',
  'components/shared/empty-state.tsx',
  'components/shared/confirmation-dialog.tsx'
];

function generateContent(filePath: string) {
  const fileName = path.basename(filePath);
  
  if (filePath.includes('/page.tsx')) {
    const pageName = filePath.split('/').slice(-2, -1)[0].replace(/[^a-zA-Z]/g, '') + 'Page';
    return `export default function ${pageName || 'Page'}() {\n  return (\n    <div className="p-8">\n      <h1 className="text-2xl font-bold mb-4">${filePath}</h1>\n      <p>This module is currently being implemented for offline usage.</p>\n    </div>\n  );\n}\n`;
  }
  
  if (filePath.includes('/layout.tsx')) {
    return `export default function Layout({ children }: { children: React.ReactNode }) {\n  return <div>{children}</div>;\n}\n`;
  }
  
  if (filePath.includes('/route.ts')) {
    return `import { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ status: 'offline-ready', endpoint: '${filePath}' });\n}\n`;
  }
  
  if (filePath.includes('components/')) {
    const compName = fileName.replace('.tsx', '').split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
    return `export function ${compName}() {\n  return (\n    <div className="border p-4 rounded-lg bg-slate-50">\n      <h3 className="font-semibold text-sm text-slate-500">${compName} Component</h3>\n    </div>\n  );\n}\n`;
  }
  
  return `// File: ${filePath}\n`;
}

console.log(`Scaffolding ${filesToCreate.length} frontend files...`);

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

console.log('UI Scaffolding complete!');
