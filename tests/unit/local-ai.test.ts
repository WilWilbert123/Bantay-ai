import { describe, it, expect, vi } from 'vitest';
import { retrieveLocalKnowledge } from '../../src/lib/rag/local-inference';

// Mock the SQLite DB for unit testing without the real file
vi.mock('better-sqlite3', () => {
  return {
    default: class {
      pragma() {}
      prepare() {
        return {
          all: () => [{ chunk_text: 'In case of flood, move to the second floor and bring your emergency kit.', document_title: 'Flood Guidelines' }]
        };
      }
    }
  };
});

describe('Offline RAG Pipeline', () => {
  it('should retrieve documents from local SQLite FTS5 index', () => {
    const results = retrieveLocalKnowledge('flood');
    expect(results).toHaveLength(1);
    expect(results[0].title).toContain('Flood Guidelines');
    expect(results[0].text).toContain('In case of flood');
  });
});
