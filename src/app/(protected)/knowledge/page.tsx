import Link from 'next/link';
import { connection } from 'next/server';
import { knowledgeRepository } from '@/lib/db/repositories/knowledge.repository';

export const instant = false;

export default async function KnowledgeBasePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await connection();
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  
  // Fetch real data from the database
  const categories = knowledgeRepository.getCategories();
  const allDocuments = knowledgeRepository.getAllDocuments();
  const searchResults = query ? knowledgeRepository.search(query) : [];

  const quickTopics = ['Typhoon', 'Evacuation', 'First Aid', 'Earthquake', 'Flood'];

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto p-4 md:p-6 gap-6">
      <div className="shrink-0">
        <h1 className="text-3xl font-bold text-white mb-2">Offline Knowledge Library</h1>
        <p className="text-slate-400">Access official disaster protocols, manuals, and local guidelines without internet.</p>
      </div>

      {/* Search Input Bar */}
      <div className="relative shrink-0">
        <form method="GET" action="/knowledge">
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Search offline documents..." 
            className="w-full bg-slate-900 border border-slate-700 text-white placeholder:text-slate-400 rounded-xl px-5 py-4 pl-12 pr-12 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
          <button type="submit" className="absolute left-4 top-4 text-slate-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
            </svg>
          </button>
          {query && (
            <Link 
              href="/knowledge" 
              className="absolute right-4 top-4 text-slate-400 hover:text-white transition-colors text-xs font-bold px-2 py-0.5 bg-slate-800 rounded-full"
            >
              ✕ Clear
            </Link>
          )}
        </form>

        {/* Quick Topic Search Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Popular Topics:</span>
          {quickTopics.map((topic) => (
            <Link
              key={topic}
              href={`/knowledge?q=${encodeURIComponent(topic)}`}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shadow-sm ${
                query.toLowerCase() === topic.toLowerCase()
                  ? 'bg-blue-600 text-white border border-blue-500'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
              }`}
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>

      {/* Category Cards */}
      <div className="shrink-0">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.length > 0 ? categories.map(cat => (
            <Link 
              key={cat.name} 
              href={`/knowledge?q=${encodeURIComponent(cat.name)}`}
              className={`p-5 rounded-2xl border transition-all cursor-pointer group shadow-sm flex flex-col justify-between ${
                query.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-slate-800 border-blue-500 shadow-blue-900/20'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                <span className="text-blue-400 group-hover:translate-x-1 transition-transform font-bold text-sm">&rarr;</span>
              </div>
              <p className="text-xs text-slate-400">{cat.count} documents available</p>
            </Link>
          )) : (
            <div className="col-span-full text-center text-slate-400 py-4">No categories found.</div>
          )}
        </div>
      </div>

      {/* Main Content Area: Search Results or All Documents */}
      {query ? (
        <div className="flex-1 min-h-0 flex flex-col bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4 shrink-0 border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white">Search Results for "{query}"</h3>
            <span className="text-xs font-mono text-slate-400">{searchResults.length} match(es) found</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
            {searchResults.length > 0 ? searchResults.map(result => (
              <div key={result.chunk_id} className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors">
                <h4 className="font-bold text-blue-400 text-base mb-1">{result.title}</h4>
                {result.section_title && (
                  <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Section: {result.section_title}
                  </div>
                )}
                <p 
                  className="text-slate-300 text-sm leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: result.content }} 
                />
              </div>
            )) : (
              <div className="text-center text-slate-400 py-12">
                No offline documents matching "{query}" were found.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 min-h-0 flex flex-col bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4 shrink-0 border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">All Offline Documents & Protocols</h3>
            <span className="text-xs font-mono text-slate-400">{allDocuments.length} documents</span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {allDocuments.map(doc => (
              <Link 
                key={doc.id}
                href={`/knowledge?q=${encodeURIComponent(doc.title)}`}
                className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-900/20 border border-blue-800/40 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{doc.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{doc.document_type} • Published by {doc.publisher}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
