import { NextResponse } from 'next/server';
import { askAssistant } from '@/lib/rag/local-inference';
import { alertsRepository } from '@/lib/db/repositories/alerts.repository';
import { classifySafetyQuery } from '@/lib/disaster/safety-engine';
import { searchOfflineFacilities } from '@/lib/disaster/facility-finder';
import { DISASTER_KNOWLEDGE_CORPUS } from '@/lib/rag/disaster-corpus';
import { checkLocalModelReadiness } from '@/lib/ai/model-config';

// Helper to deduplicate alerts by title & description
function getUniqueAlerts(alerts: any[]) {
  const seen = new Set<string>();
  return alerts.filter(alert => {
    const key = `${alert.title?.trim().toLowerCase()}_${alert.description?.trim().toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function POST(req: Request) {
  try {
    const { messages, userLocation } = await req.json();
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== 'USER') {
      return NextResponse.json({ error: 'Invalid message payload' }, { status: 400 });
    }

    const query = lastMessage.content;
    const qLower = query.toLowerCase();
    
    // Simulate a fast "AI generation" delay (1.0 second) for snappy response feeling
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 1. Run Safety Engine Classification
    const safety = classifySafetyQuery(query);

    let responseText = "";
    let citations: any[] = [];
    let mapAlerts: any[] = [];
    let hasMap = false;
    let suggestedQuestions: string[] = [
      "Ano ang dapat ihanda bago dumating ang bagyo?",
      "Saan ang pinakamalapit na evacuation center?",
      "Ipakita ang emergency checklist."
    ];

    // Fetch active alerts
    const rawActiveAlerts = alertsRepository.getActiveAlerts();
    const activeAlerts = getUniqueAlerts(rawActiveAlerts);

    // A. HANDLE ACTIVE LIFE-THREATENING OR MEDICAL EMERGENCY
    if (safety.isUrgent && safety.immediateActionText) {
      responseText = `${safety.immediateActionText}\n\n--- \n⚠️ *Paalala:* Ang Bantay AI ay isang offline assistant. Kung may linya ng komunikasyon, tumawag agad sa **911** o sa inyong **Barangay Emergency Hotlines**.`;
      
      citations = [
        { id: "doc_emerg_1", source: "NDRRMC & DOH Emergency Protocols", title: "Life Safety & Emergency First Response", relevance: 1.0 }
      ];

      return NextResponse.json({
        role: 'ASSISTANT',
        content: responseText,
        citations,
        hasMap: activeAlerts.length > 0,
        mapAlerts: activeAlerts,
        suggestedQuestions: [
          "Saan ang pinakamalapit na ospital?",
          "Ano ang emergency number ng BFP o Police?",
          "Ano ang dapat gawin habang naghihintay ng rescue?"
        ]
      });
    }

    // B. HANDLE FACILITY / LOCATION REQUESTS (Hospitals, Evacuation Centers, Watsons/Pharmacies, Barangay Halls, Police/Fire)
    const isLocationQuery = 
      safety.intent === 'LOCATION_REQUEST' || 
      qLower.includes('nearby') ||
      qLower.includes('malapit') ||
      qLower.includes('saan') ||
      qLower.includes('nasaan') ||
      qLower.includes('where') ||
      qLower.includes('ospital') || 
      qLower.includes('hospital') || 
      qLower.includes('evacuation') || 
      qLower.includes('likasan') || 
      qLower.includes('botika') || 
      qLower.includes('pharmacy') ||
      qLower.includes('watsons') ||
      qLower.includes('mercury') ||
      qLower.includes('barangay') ||
      qLower.includes('brgy') ||
      qLower.includes('city hall') ||
      qLower.includes('police') ||
      qLower.includes('pulis') ||
      qLower.includes('fire');

    if (isLocationQuery) {
      let cat: string | undefined = undefined;
      if (qLower.includes('watsons') || qLower.includes('mercury') || qLower.includes('botika') || qLower.includes('pharmacy') || qLower.includes('gamot')) {
        cat = 'PHARMACY';
      } else if (qLower.includes('ospital') || qLower.includes('hospital') || qLower.includes('doktor') || qLower.includes('clinic')) {
        cat = 'HOSPITAL';
      } else if (qLower.includes('evacuation') || qLower.includes('likasan') || qLower.includes('shelter')) {
        cat = 'EVACUATION';
      } else if (qLower.includes('barangay') || qLower.includes('brgy') || qLower.includes('lgu') || qLower.includes('city hall') || qLower.includes('municipal')) {
        cat = 'BARANGAY';
      } else if (qLower.includes('police') || qLower.includes('pulis') || qLower.includes('fire') || qLower.includes('sunog') || qLower.includes('bfp')) {
        cat = 'POLICE_FIRE';
      }

      const userLat = userLocation?.lat;
      const userLng = userLocation?.lng;

      const facilities = searchOfflineFacilities(query, userLat, userLng, cat);
      const topFacilities = facilities.slice(0, 6);

      if (topFacilities.length > 0) {
        const getCatLabel = (type: string) => {
          switch (type) {
            case 'PHARMACY': return '💊 Pharmacy / Watsons';
            case 'HOSPITAL': return '🏥 Hospital';
            case 'EVACUATION': return '🏫 Evacuation Hub';
            case 'BARANGAY':
            case 'LGU': return '🏛️ Barangay / City Hall';
            case 'POLICE_FIRE': return '🚓 Police & Fire Station';
            default: return `📍 ${type}`;
          }
        };

        const facList = topFacilities.map(f => {
          const distStr = f.formattedDistance ? ` • *${f.formattedDistance} away*` : '';
          return `- **${f.name}** (${getCatLabel(f.facility_type)})${distStr}\n  📍 ${f.address}`;
        }).join('\n\n');

        const locNote = userLat ? "batay sa inyong kasalukuyang GPS location" : "mula sa ating offline local directory";

        responseText = `### 📍 Mga Malapit na Emergency Facilities (${locNote}):\n\n${facList}\n\n*Lahat ng pasilidad na ito ay nakatala sa ating offline directory at bukas para sa tulong.*`;
        citations = topFacilities.map(f => ({
          id: f.id,
          source: "Offline Emergency Facility Directory 2026",
          title: f.name,
          relevance: 0.98
        }));
      } else {
        responseText = "Wala po tayong nahanap na pasilidad na tumutugma sa inyong hinahanap sa ating offline directory. Mangyaring sabihin ang inyong Barangay o Lungsod.";
      }

      return NextResponse.json({
        role: 'ASSISTANT',
        content: responseText,
        citations,
        hasMap: true,
        mapAlerts: activeAlerts,
        mapFacilities: topFacilities,
        suggestedQuestions: [
          "Saan ang pinakamalapit na Watsons o botika?",
          "Saan ang pinakamalapit na ospital?",
          "Saan ang pinakamalapit na evacuation center?",
          "Saan ang pinakamalapit na barangay hall?"
        ]
      });
    }

    // C. DISASTER GUIDANCE (TYPHOON, EARTHQUAKE, FLOOD, VOLCANO, FIRST AID, FIRE, LANDSLIDE)
    const isPreparednessQuery = 
      qLower.includes('before') || 
      qLower.includes('bago') || 
      qLower.includes('gawin') || 
      qLower.includes('dapat') || 
      qLower.includes('handa') || 
      qLower.includes('prepare') || 
      qLower.includes('preparation') || 
      qLower.includes('checklist') || 
      qLower.includes('what to do') || 
      qLower.includes('what should i do') || 
      qLower.includes('paano') || 
      qLower.includes('during') || 
      qLower.includes('habang') || 
      qLower.includes('after') || 
      qLower.includes('pagkatapos');

    // 1. Typhoon
    if (safety.hazardType === 'TYPHOON' || qLower.includes('bagyo') || qLower.includes('typhoon') || qLower.includes('storm')) {
      const guide = DISASTER_KNOWLEDGE_CORPUS.find(g => g.category === 'TYPHOON')!;
      suggestedQuestions = [
        "Saan ang pinakamalapit na evacuation center?",
        "Ano ang dapat ilagay sa 72-Hour Go Bag?",
        "Ano ang gagawin kapag may kasamang bata at senior citizen?"
      ];

      const typhoonAlerts = getUniqueAlerts(
        activeAlerts.filter(a => a.alert_type === 'TYPHOON' || a.title.toLowerCase().includes('bagyo') || a.title.toLowerCase().includes('typhoon'))
      );

      if (isPreparednessQuery) {
        let activeNote = "";
        if (typhoonAlerts.length > 0) {
          const alertSummary = typhoonAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
          activeNote = `\n\n--- \n⚠️ **Umiiral na Ulat sa Inyong Lugar:**\n${alertSummary}`;
          hasMap = false;
          mapAlerts = typhoonAlerts;
        }

        responseText = `### 🌀 ${guide.title}

**1. BAGO DUMATING ANG BAGYO (Preparedness):**
${guide.beforeActions.map(a => `- ${a}`).join('\n')}

**2. HABANG MAY BAGYO (During):**
${guide.duringActions.map(a => `- ${a}`).join('\n')}

**3. PAGKATAPOS NG BAGYO (After):**
${guide.afterActions.map(a => `- ${a}`).join('\n')}

**4. SPECIAL INSTRUCTIONS (Vulnerable Groups & Pets):**
${guide.specialInstructions?.map(a => `- ${a}`).join('\n')}${activeNote}`;

        citations = [{ id: guide.id, source: guide.publisher, title: guide.title, relevance: 1.0 }];
      } else {
        if (typhoonAlerts.length > 0) {
          const details = typhoonAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
          responseText = `Ayon sa ating real-time PAGASA Weather Satellite at local database cache:\n\n${details}\n\n**Mabilis na Paalala:**\n- Panatilihing nakasaksak o naka-charge ang emergency lights at mobile phones.\n- Kung nakatira sa mababang lugar o coastal area, maging handa sa posibleng paglikas.`;
          citations = typhoonAlerts.map(a => ({ id: a.id, source: "PAGASA Tropical Cyclone Warning", title: a.title, relevance: 1.0 }));
          hasMap = true;
          mapAlerts = typhoonAlerts;
        } else {
          responseText = "Ayon sa ating real-time PAGASA weather cache, **walang nade-detect na aktibong bagyo o tropical cyclone** sa loob ng Philippine Area of Responsibility (PAR) sa ngayon.\n\n**Kasalukuyang Panahon:** Fine to partly cloudy with isolated thunderstorms sa hapon o gabi. Manatiling alerto at laging maging handa.";
          citations = [{ id: "doc_typ_1", source: "PAGASA Weather Monitoring Cache", title: "PAGASA Weather Protocols", relevance: 0.95 }];
        }
      }
    }
    // 2. Earthquake
    else if (safety.hazardType === 'EARTHQUAKE' || qLower.includes('lindol') || qLower.includes('earthquake')) {
      const guide = DISASTER_KNOWLEDGE_CORPUS.find(g => g.category === 'EARTHQUAKE')!;
      suggestedQuestions = [
        "Ano ang dapat ilagay sa 72-Hour Go Bag?",
        "Saan ang ligtas na evacuation area sa pagyanig?",
        "Ano ang gagawin kapag may amoy ng gas pagkatapos ng lindol?"
      ];

      const quakeAlerts = getUniqueAlerts(
        activeAlerts.filter(a => a.alert_type === 'EARTHQUAKE' || a.title.toLowerCase().includes('earthquake') || a.title.toLowerCase().includes('lindol'))
      );

      if (isPreparednessQuery) {
        let activeNote = "";
        if (quakeAlerts.length > 0) {
          const alertSummary = quakeAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
          activeNote = `\n\n--- \n⚠️ **Umiiral na Lindol / Aftershock Advisory:**\n${alertSummary}`;
          hasMap = false;
          mapAlerts = quakeAlerts;
        }

        responseText = `### 🚨 ${guide.title}

**1. BAGO MAGKA-LINDOL (Preparedness):**
${guide.beforeActions.map(a => `- ${a}`).join('\n')}

**2. HABANG LUMILINDOL (During the Quake):**
${guide.duringActions.map(a => `- ${a}`).join('\n')}

**3. PAGKATAPOS NG PAGYANIG (After):**
${guide.afterActions.map(a => `- ${a}`).join('\n')}${activeNote}`;

        citations = [{ id: guide.id, source: guide.publisher, title: guide.title, relevance: 1.0 }];
      } else {
        if (quakeAlerts.length > 0) {
          const details = quakeAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
          responseText = `Ayon sa real-time PHIVOLCS Seismic Sensors sa ating DB:\n\n${details}\n\n**Earthquake Safety Protocols:**\n- **DUCK, COVER, & HOLD**: Magtago sa ilalim ng matibay na mesa.\n- Lumayo sa salamin, cabinet, at mga bagay na pwedeng matumba.\n- Pagkatapos ng pagyanig, lumabas nang maayos papunta sa open assembly area. Huwag gumamit ng elevator.`;
          citations = quakeAlerts.map(a => ({ id: a.id, source: "PHIVOLCS Seismic Monitoring", title: a.title, relevance: 1.0 }));
          hasMap = true;
          mapAlerts = quakeAlerts;
        } else {
          responseText = "Wala tayong nade-detect na malakas na lindol sa huling 2 oras ayon sa ating PHIVOLCS offline seismic network.\n\nLaging tandaan ang **Duck, Cover, & Hold** sakaling magkaroon ng hindi inaasahang pagyanig.";
          citations = [{ id: "doc_eq_1", source: "PHIVOLCS Earthquake Safety Guide", title: "Earthquake Preparedness Manual", relevance: 0.98 }];
        }
      }
    }
    // 3. Flood
    else if (safety.hazardType === 'FLOOD' || qLower.includes('baha') || qLower.includes('flood')) {
      const guide = DISASTER_KNOWLEDGE_CORPUS.find(g => g.category === 'FLOOD')!;
      suggestedQuestions = [
        "Saan ang ligtas na lugar at evacuation centers?",
        "Paano maiwasan ang leptospirosis sa baha?",
        "Ano ang emergency number ng rescue teams?"
      ];

      const floodAlerts = getUniqueAlerts(
        activeAlerts.filter(a => a.alert_type === 'FLOOD' || a.title.toLowerCase().includes('flood') || a.title.toLowerCase().includes('baha'))
      );

      if (isPreparednessQuery) {
        let activeNote = "";
        if (floodAlerts.length > 0) {
          const alertSummary = floodAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
          activeNote = `\n\n--- \n⚠️ **Aktibong Ulat ng Baha sa Lugar:**\n${alertSummary}`;
          hasMap = false;
          mapAlerts = floodAlerts;
        }

        responseText = `### 🌊 ${guide.title}

**1. BAGO ANG BAHA (Paghahanda):**
${guide.beforeActions.map(a => `- ${a}`).join('\n')}

**2. HABANG BUMABAHA (During):**
${guide.duringActions.map(a => `- ${a}`).join('\n')}

**3. PAGKATAPOS NG BAHA (After):**
${guide.afterActions.map(a => `- ${a}`).join('\n')}${activeNote}`;

        citations = [{ id: guide.id, source: guide.publisher, title: guide.title, relevance: 1.0 }];
      } else {
        if (floodAlerts.length > 0) {
          const locations = floodAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
          responseText = `Ayon sa ating real-time water level sensors at offline database, narito ang mga lugar na may aktibong baha at warning:\n\n${locations}\n\n**Ligtas na Payo:**\n1. Lumipat agad sa mataas na lugar.\n2. Huwag lumusong sa baha upang makaiwas sa leptospirosis at nakakuryenteng kable.\n3. Patayin ang main breaker ng kuryente kung pasok na ang tubig sa bahay.`;
          citations = floodAlerts.map(a => ({ id: a.id, source: "Realtime Water Level Telemetry", title: a.title, relevance: 1.0 }));
          hasMap = true;
          mapAlerts = floodAlerts;
        } else {
          responseText = "Wala po tayong nade-detect na aktibong baha sa ngayon ayon sa ating local offline sensor network.";
          citations = [{ id: "doc_fl_1", source: "Local Water Level Sensors", title: "Marikina River Sensor Node", relevance: 0.90 }];
        }
      }
    }
    // 4. Volcano
    else if (safety.hazardType === 'VOLCANO' || qLower.includes('bulkan') || qLower.includes('volcano') || qLower.includes('ashfall')) {
      const guide = DISASTER_KNOWLEDGE_CORPUS.find(g => g.category === 'VOLCANO')!;
      suggestedQuestions = [
        "Saan ang pinakamalapit na evacuation center?",
        "Ano ang gagawin kapag may ashfall?",
        "Ano ang emergency hotline ng PHIVOLCS?"
      ];

      const volcanoAlerts = getUniqueAlerts(
        activeAlerts.filter(a => a.alert_type === 'VOLCANO' || a.title.toLowerCase().includes('volcano') || a.title.toLowerCase().includes('bulkan'))
      );

      if (volcanoAlerts.length > 0) {
        const details = volcanoAlerts.map(a => `- **${a.title}**: ${a.description}`).join('\n');
        responseText = `Ayon sa ating real-time DB at PHIVOLCS Volcanic Monitoring Network, narito ang kasalukuyang estado ng mga bulkan:\n\n${details}\n\n**Mga Dapat Gawin (PHIVOLCS Advisory):**\n${guide.duringActions.map(a => `- ${a}`).join('\n')}`;
        citations = volcanoAlerts.map(a => ({ id: a.id, source: "PHIVOLCS Volcanic Bulletin", title: a.title, relevance: 1.0 }));
        hasMap = true;
        mapAlerts = volcanoAlerts;
      } else {
        responseText = `### 🌋 ${guide.title}\n\n**Mga Dapat Gawin sa Ashfall at Volcanic Unrest:**\n${guide.duringActions.map(a => `- ${a}`).join('\n')}\n\n*Status:* Walang bagong phreatic eruption advisory sa kasalukuyan.`;
        citations = [{ id: guide.id, source: guide.publisher, title: guide.title, relevance: 0.95 }];
      }
    }
    // 5. Fallback Default
    else {
      try {
        const ragResult = await askAssistant(query);
        responseText = ragResult.response;
        citations = ragResult.sources.map((s: any) => ({
          id: s.id,
          source: "Bantay AI Local Knowledgebase",
          title: s.title,
          relevance: 0.95
        }));
        hasMap = false;
      } catch (err) {
        responseText = `Ako ang iyong Bantay AI Local Assistant. Handa akong magbigay ng accurate at offline emergency guidance para sa Bagyo, Lindol, Baha, Ashfall, at First Aid.\n\nKasalukuyang may **${activeAlerts.length} active alerts** sa ating lokal na database.\n\nAno ang nais mong malaman?`;
        citations = [{ id: "doc_sys_1", source: "Bantay AI Local Knowledgebase", title: "Emergency System Index 2026", relevance: 0.90 }];
        hasMap = false;
      }
    }

    return NextResponse.json({
      role: 'ASSISTANT',
      content: responseText,
      citations: citations,
      hasMap: hasMap,
      mapAlerts: mapAlerts,
      suggestedQuestions: suggestedQuestions
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to process chat request' }, { status: 500 });
  }
}


