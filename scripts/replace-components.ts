import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir: string, callback: (filepath: string) => void) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts')) {
      callback(filepath);
    }
  }
}

let replaced = 0;

walkDir('./src/components', (filepath) => {
  const content = fs.readFileSync(filepath, 'utf-8');
  if (content.includes('Component</h3>')) {
    // Extract component name from file name
    const filename = path.basename(filepath, '.tsx');
    const componentName = filename.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
    
    const newContent = `import React from 'react';

interface ${componentName}Props {
  className?: string;
  children?: React.ReactNode;
}

export function ${componentName}({ className = '', children }: ${componentName}Props) {
  return (
    <div className={\`bg-white border border-slate-200 rounded-xl p-4 shadow-sm \${className}\`}>
      <h3 className="font-bold text-slate-800 border-b pb-2 mb-3">${componentName}</h3>
      <div className="text-sm text-slate-600">
        {children ? children : <p className="italic text-slate-400">Component body awaiting local database integration...</p>}
      </div>
    </div>
  );
}
`;
    fs.writeFileSync(filepath, newContent, 'utf-8');
    replaced++;
    console.log(`Updated component: ${filepath}`);
  }
});

console.log(`Successfully replaced ${replaced} component placeholders with proper React templates.`);
