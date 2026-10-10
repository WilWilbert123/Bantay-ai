import { classifySafetyQuery } from '../src/lib/disaster/safety-engine';
import { searchOfflineFacilities } from '../src/lib/disaster/facility-finder';
import { DISASTER_KNOWLEDGE_CORPUS } from '../src/lib/rag/disaster-corpus';

interface TestCase {
  id: string;
  query: string;
  expectedIntent: string;
  expectedHazard?: string;
  language: 'EN' | 'TL' | 'TAGLISH';
}

const TEST_SUITE: TestCase[] = [
  { id: 'TC01', query: 'What should I do before a typhoon?', expectedIntent: 'GENERAL_PREPAREDNESS', expectedHazard: 'TYPHOON', language: 'EN' },
  { id: 'TC02', query: 'Ano ang gagawin ko bago dumating ang bagyo?', expectedIntent: 'GENERAL_PREPAREDNESS', expectedHazard: 'TYPHOON', language: 'TL' },
  { id: 'TC03', query: 'What do I do during an earthquake?', expectedIntent: 'GENERAL_PREPAREDNESS', expectedHazard: 'EARTHQUAKE', language: 'EN' },
  { id: 'TC04', query: 'Ano ang dapat gawin kapag may ashfall?', expectedIntent: 'GENERAL_PREPAREDNESS', expectedHazard: 'VOLCANO', language: 'TL' },
  { id: 'TC05', query: 'Nalulunod ako tulungan mo ako!', expectedIntent: 'ACTIVE_EMERGENCY', expectedHazard: 'FLOOD', language: 'TL' },
  { id: 'TC06', query: 'I smell gas after an earthquake', expectedIntent: 'ACTIVE_EMERGENCY', expectedHazard: 'EARTHQUAKE', language: 'EN' },
  { id: 'TC07', query: 'Saan ang pinakamalapit na ospital?', expectedIntent: 'LOCATION_REQUEST', language: 'TL' },
  { id: 'TC08', query: 'Where is the nearest hospital in Quezon City?', expectedIntent: 'LOCATION_REQUEST', language: 'EN' },
  { id: 'TC09', query: 'Ano gagawin sa leptospirosis sa baha?', expectedIntent: 'GENERAL_PREPAREDNESS', expectedHazard: 'FLOOD', language: 'TAGLISH' },
  { id: 'TC10', query: 'May taong walang malay sa sunog!', expectedIntent: 'MEDICAL_EMERGENCY', expectedHazard: 'FIRE', language: 'TL' }
];

export function runDisasterEvaluation() {
  console.log("=================================================");
  console.log("   BANTAY AI — LOCAL DISASTER AI EVALUATION      ");
  console.log("=================================================");
  console.log(`Running ${TEST_SUITE.length} automated test cases...\n`);

  let passed = 0;
  let failed = 0;

  for (const tc of TEST_SUITE) {
    const safetyResult = classifySafetyQuery(tc.query);
    const intentMatched = safetyResult.intent === tc.expectedIntent;
    const hazardMatched = !tc.expectedHazard || safetyResult.hazardType === tc.expectedHazard;

    if (intentMatched && hazardMatched) {
      passed++;
      console.log(`✅ [${tc.id}] PASS (${tc.language}): "${tc.query}" -> Intent: ${safetyResult.intent} | Hazard: ${safetyResult.hazardType || 'GENERAL'}`);
    } else {
      failed++;
      console.log(`❌ [${tc.id}] FAIL (${tc.language}): "${tc.query}"`);
      console.log(`   Expected: Intent=${tc.expectedIntent}, Hazard=${tc.expectedHazard}`);
      console.log(`   Got: Intent=${safetyResult.intent}, Hazard=${safetyResult.hazardType}`);
    }
  }

  // Evaluate Facility Search
  console.log("\nTesting Offline Facility Search & Distance Calculation...");
  const facilities = searchOfflineFacilities('hospital', 14.555, 121.05);
  if (facilities.length > 0 && facilities[0].distanceKm !== undefined) {
    console.log(`✅ PASS: Facility search returned ${facilities.length} results. Closest: ${facilities[0].name} (${facilities[0].formattedDistance})`);
    passed++;
  } else {
    console.log("❌ FAIL: Facility search failed or distance undefined.");
    failed++;
  }

  // Evaluate Knowledge Base Corpus
  console.log("\nTesting Local Disaster Knowledge Base RAG Corpus...");
  if (DISASTER_KNOWLEDGE_CORPUS.length >= 4) {
    console.log(`✅ PASS: Knowledge corpus loaded with ${DISASTER_KNOWLEDGE_CORPUS.length} structured hazard guidelines.`);
    passed++;
  } else {
    console.log("❌ FAIL: Knowledge corpus incomplete.");
    failed++;
  }

  console.log("\n=================================================");
  console.log(`EVALUATION COMPLETE: ${passed} PASSED, ${failed} FAILED.`);
  console.log("=================================================");
}

if (require.main === module) {
  runDisasterEvaluation();
}
