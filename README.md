# BANTAY AI - Offline Local Disaster Intelligence System

Bantay AI is an offline-first emergency intelligence platform and bilingual AI assistant designed for the Philippines. It assists citizens, disaster responders, and local government units (LGUs) during natural disasters (Typhoons, Earthquakes, Floods, Volcanic Eruption, Ashfall, Landslides, Fires, First Aid) when cell towers, power grids, or internet connections are completely unavailable.

---

## Technical Overview & Local AI Disclosures

- What runs locally:
  - Local LLM inference via Ollama (llama3:8b, mistral, or qwen).
  - Deterministic Disaster Safety Engine & Intent Classifier (ACTIVE_EMERGENCY, MEDICAL_EMERGENCY, LOCATION_REQUEST, EVACUATION, GENERAL_PREPAREDNESS, RECOVERY).
  - Offline RAG system using SQLite Full-Text Search 5 (FTS5) over official Philippine disaster guidelines (NDRRMC, DOST-PAGASA, PHIVOLCS, DOH, Red Cross).
  - Haversine spatial search and offline emergency facility locator.
  - Interactive Leaflet vector maps with auto-GPS detection and turn-by-turn navigation HUD.
- What requires internet:
  - Downloading external map tiles if tiles are not already cached locally. (All core AI inference, RAG lookup, intent classification, and facility routing operate 100% offline).
- Models used:
  - llama3:8b (via Ollama) / mistral / qwen.
- Core Technologies:
  - Next.js 16 (App Router, Turbopack, React 19)
  - TypeScript
  - Tailwind CSS
  - SQLite3 with FTS5 (better-sqlite3)
  - Leaflet.js & OpenStreetMap
  - Vitest & Playwright
- Why this product benefits from running AI locally:
  During severe typhoons, earthquakes, or grid failures in the Philippines, telecom infrastructure frequently collapses. Cloud AI APIs become inaccessible exactly when people need immediate guidance most. Running AI locally on edge hardware (laptops, PCs, local server nodes) guarantees life-saving disaster response, instant triage, and navigation directions without relying on internet connectivity.

---

## Step-by-Step Setup Guide for Judges

Follow these steps to clone, configure, and launch Bantay AI on your local machine.

### Step 1: System Prerequisites
Ensure your system has the following installed:
- Node.js version 18.x, 20.x, or higher
- npm (version 9.x or higher)
- SQLite3 (included with Node.js runtime)
- Optional: Ollama (for running local LLM inference)

### Step 2: Clone the Repository
Clone the project repository to your local machine and navigate into the project folder:
```bash
git clone <REPOSITORY_URL>
cd BantayAI/bantay-ai
```

### Step 3: Install Project Dependencies
Run npm install to set up all required node modules:
```bash
npm install
```

### Step 4: Initialize and Seed the Offline Database
Seed the local SQLite database with real-time disaster records, emergency contacts, shelter coordinates, and hospitals:
```bash
npx tsx scripts/seed-database.ts
```

### Step 5: (Optional) Set Up Local LLM with Ollama
If you want to test full local LLM generation:
1. Install Ollama from https://ollama.com
2. Pull the model in your terminal:
   ```bash
   ollama pull llama3:8b
   ```
3. Ensure Ollama service is running locally (`http://localhost:11434`).

Note: If Ollama is not installed or running, Bantay AI automatically seamlessly switches to its built-in local deterministic RAG and Safety Engine. The application remains 100% functional without throwing errors.

### Step 6: Launch Development Server
Start the Next.js development server:
```bash
npm run dev
```

### Step 7: Open the Application
Navigate to http://localhost:3000 in your web browser.
- Emergency Assistant: http://localhost:3000/assistant
- Emergency Mode & Triage: http://localhost:3000/emergency
- Tactical Offline Map: http://localhost:3000/map

---

## Verification & Automated Test Commands

To verify application stability and AI accuracy:

1. Run Disaster AI Evaluation Suite:
   ```bash
   npx tsx scripts/eval-disaster-ai.ts
   ```

2. Run Unit Test Suite:
   ```bash
   npm run test:unit
   ```

3. Verify Production Build:
   ```bash
   npm run build
   ```

---

## Project Structure

- `src/app`: Next.js 16 App Router pages (Dashboard, Assistant, Map, Emergency).
- `src/lib/disaster`: Safety engine, intent classifier, and Haversine facility finder.
- `src/lib/rag`: Offline SQLite FTS5 RAG index and Philippine disaster corpus.
- `src/components/map`: Custom Leaflet map with turn-by-turn navigation HUD.
- `scripts`: Database seeding, document ingestion, and AI evaluation tools.

---

## License
Bantay AI is built for public disaster resilience. All emergency guidance is derived from official NDRRMC, PAGASA, PHIVOLCS, DOH, and Red Cross protocols.
# Bantay-ai
