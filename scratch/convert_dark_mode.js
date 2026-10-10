const fs = require('fs');

const path = process.argv[2];
if (!path) {
  console.error('Please provide a path');
  process.exit(1);
}
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  'bg-white': 'bg-slate-900',
  'bg-slate-50': 'bg-slate-900/50',
  'bg-slate-100': 'bg-slate-800',
  'bg-slate-200': 'bg-slate-700',
  'border-slate-200': 'border-slate-800',
  'border-slate-100': 'border-slate-800',
  'text-slate-900': 'text-white',
  'text-slate-800': 'text-white',
  'text-slate-700': 'text-slate-200',
  'text-slate-600': 'text-slate-400',
  'text-slate-500': 'text-slate-400',
  'bg-blue-50': 'bg-blue-900/20',
  'border-blue-100': 'border-blue-900/50',
  'border-blue-200': 'border-blue-800',
  'border-blue-300': 'border-blue-700',
  'text-blue-700': 'text-blue-400',
  'text-blue-600': 'text-blue-400',
  'bg-blue-100': 'bg-blue-900/40',
  'bg-indigo-50': 'bg-indigo-900/20',
  'text-indigo-600': 'text-indigo-400',
  'bg-emerald-50': 'bg-emerald-900/20',
  'text-emerald-600': 'text-emerald-400',
  'text-emerald-700': 'text-emerald-300',
  'text-emerald-900': 'text-emerald-100',
  'border-emerald-100': 'border-emerald-900/50',
  'bg-emerald-100': 'bg-emerald-900/40',
  'bg-rose-50': 'bg-rose-900/20',
  'text-rose-500': 'text-rose-400',
  'bg-purple-50': 'bg-purple-900/20',
  'text-purple-600': 'text-purple-400',
  'bg-purple-100': 'bg-purple-900/40',
  'bg-red-50': 'bg-red-950/40',
  'border-red-100': 'border-red-900/50',
  'bg-red-100': 'bg-red-900/50',
  'border-red-200': 'border-red-800',
  'bg-amber-50': 'bg-amber-900/20',
  'text-amber-600': 'text-amber-400',
  'bg-amber-100': 'bg-amber-900/40',
  'text-amber-500': 'text-amber-400',
  'bg-pink-100': 'bg-pink-900/40',
  'text-pink-500': 'text-pink-400',
  'border-current/10': 'border-white/10'
};

for (const [find, replace] of Object.entries(replacements)) {
  content = content.replace(new RegExp(find, 'g'), replace);
}

fs.writeFileSync(path, content, 'utf8');
console.log(path + ' converted to dark mode successfully.');
