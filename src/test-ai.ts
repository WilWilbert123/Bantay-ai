import { askAssistant } from '../src/lib/rag/local-inference';
askAssistant("safe ba ako sa baha?").then(console.log).catch(console.error);
