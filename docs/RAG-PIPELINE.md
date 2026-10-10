# RAG (Retrieval-Augmented Generation) Pipeline Architecture

## Overview
Bantay AI uses a purely local, offline-capable Retrieval-Augmented Generation (RAG) pipeline to provide critical disaster information without relying on internet connectivity. The system embeds local documents from the `knowledge-base/` directory and stores them in a local SQLite database using the FTS5 (Full-Text Search) extension or a localized vector index.

## Knowledge Base Sources
The pipeline ingests markdown documents from official authorities:
1. **PAGASA**: Typhoon signals and weather-related protocols.
2. **PHIVOLCS**: Earthquake action guides and volcanic eruption safety.
3. **NDRRMC**: National disaster frameworks and tsunami guidelines.
4. **Philippine Red Cross**: First aid, health risks (leptospirosis), and CPR.
5. **Local Government Units (LGU)**: Evacuation protocols and relief distribution.

## Data Ingestion & Indexing
1. **Document Parsing**: Markdown files in `knowledge-base/sources` are chunked by headers and bullet points.
2. **Vectorization / FTS5**: Chunks are inserted into the `better-sqlite3` database. Due to local offline requirements, lightweight token matching (BM25 via FTS5) or localized ONNX embedding models are utilized.
3. **Metadata**: Each chunk retains metadata about its source (e.g., PAGASA, Red Cross) for citation.

## Query Pipeline
1. **User Query**: The user asks a question via the chat interface (e.g., "What to do during a typhoon?").
2. **Intent & Fallback Check**: The system checks if the query requires map data. If it's a general disaster question, it proceeds to the RAG pipeline.
3. **Retrieval**: The `lib/rag/local-inference.ts` queries the SQLite DB for the top 3-5 most relevant text chunks.
4. **Prompt Assembly**: The local AI assistant is provided with a system prompt that includes the retrieved chunks as strictly factual context.
5. **Generation**: The local LLM generates an accurate, concise response in the requested language (English/Tagalog) and cites the source authorities.

## Benefits
- **Zero Latency**: Everything runs locally.
- **Offline Reliability**: Guaranteed to function during power/internet outages.
- **Authoritative Answers**: Hallucinations are heavily mitigated by restricting the LLM to official Philippine disaster manuals.
