/**
 * Safety & Intent Classification Engine for Bantay AI
 * Evaluates incoming user queries for active life-threatening emergencies,
 * medical emergencies, evacuation needs, location inquiries, or general preparedness.
 */

export type QueryIntent = 
  | 'ACTIVE_EMERGENCY'
  | 'MEDICAL_EMERGENCY'
  | 'EVACUATION'
  | 'LOCATION_REQUEST'
  | 'CURRENT_WARNING'
  | 'GENERAL_PREPAREDNESS'
  | 'RECOVERY'
  | 'UNKNOWN_OR_UNSUPPORTED';

export interface SafetyAnalysis {
  intent: QueryIntent;
  isUrgent: boolean;
  hazardType?: 'TYPHOON' | 'FLOOD' | 'EARTHQUAKE' | 'VOLCANO' | 'FIRE' | 'LANDSLIDE' | 'GENERAL';
  immediateActionText?: string;
  extractedLocation?: string;
}

export function classifySafetyQuery(queryText: string): SafetyAnalysis {
  const q = queryText.toLowerCase().trim();

  // 1. ACTIVE LIFE-THREATENING EMERGENCY TRIGGER KEYWORDS
  const isLifeThreatening = 
    q.includes('nalulunod') || 
    q.includes('drowning') || 
    q.includes('trapped') || 
    q.includes('na-trap') || 
    q.includes('natrap') || 
    q.includes('saklolo') || 
    q.includes('help me') || 
    q.includes('tulungan mo ako') || 
    q.includes('pumapasok na ang tubig') || 
    q.includes('water is entering') || 
    q.includes('nakuryente') || 
    q.includes('electrocuted') || 
    q.includes('amoy ng gas') || 
    q.includes('smell gas') || 
    q.includes('nasusunog') || 
    q.includes('on fire') || 
    q.includes('nahulog na kable') || 
    q.includes('downed wire');

  // 2. MEDICAL EMERGENCY TRIGGER KEYWORDS
  const isMedicalEmergency = 
    q.includes('walang malay') || 
    q.includes('unconscious') || 
    q.includes('hindi humihinga') || 
    q.includes('not breathing') || 
    q.includes('dugo') || 
    q.includes('bleeding') || 
    q.includes('inatake') || 
    q.includes('heart attack') || 
    q.includes('nabalian') || 
    q.includes('fracture') || 
    q.includes('na-suffocate') || 
    q.includes('hina-hika');

  // 3. EVACUATION QUERY KEYWORDS
  const isEvacuation = 
    q.includes('evacuate') || 
    q.includes('likas') || 
    q.includes('evacuation center') || 
    q.includes('san magtatago') || 
    q.includes('saan lilikas');

  // 4. LOCATION / FACILITY QUERY KEYWORDS
  const isLocationRequest = 
    q.includes('saan ang pinakamalapit') || 
    q.includes('where is the nearest') || 
    q.includes('ospital') || 
    q.includes('hospital') || 
    q.includes('health center') || 
    q.includes('pharmacy') || 
    q.includes('botika') || 
    q.includes('fire station') || 
    q.includes('police');

  // Detect hazard type
  let hazardType: SafetyAnalysis['hazardType'] = 'GENERAL';
  if (q.includes('bagyo') || q.includes('typhoon') || q.includes('storm')) hazardType = 'TYPHOON';
  else if (q.includes('baha') || q.includes('flood') || q.includes('tubig') || q.includes('nalulunod') || q.includes('lunod')) hazardType = 'FLOOD';
  else if (q.includes('lindol') || q.includes('earthquake')) hazardType = 'EARTHQUAKE';
  else if (q.includes('bulkan') || q.includes('volcano') || q.includes('ashfall') || q.includes('taal')) hazardType = 'VOLCANO';
  else if (q.includes('sunog') || q.includes('fire')) hazardType = 'FIRE';
  else if (q.includes('landslide') || q.includes('guho')) hazardType = 'LANDSLIDE';

  // 5. Build Immediate Emergency Safety Action if Urgent
  if (isLifeThreatening) {
    let actionText = "🚨 **IMMEDIATE EMERGENCY SAFETY STEP:**\n";
    if (q.includes('nalulunod') || q.includes('trapped') || q.includes('pumapasok na ang tubig') || q.includes('water is entering')) {
      actionText += "1. **Lumipat Agad sa Pinakamataas na Lugar:** Umiwas sa basement o ground floor. Magdala ng flashlight at pito (whistle).\n2. **Huwag Lumusong sa Mabilis na Baha.**\n3. **Tumawag sa 911 / Local Emergency Responders** o magsenyas gamit ang matingkad na tela sa bintana.";
    } else if (q.includes('amoy ng gas') || q.includes('smell gas')) {
      actionText += "1. **LUMABAS AGAD NG BAHAY:** Huwag magbukas ng ilaw, appliances, o mag-sindi ng apoy.\n2. E-ventilate o buksan ang mga bintana kung kayang gawin nang ligtas habang lumalabas.\n3. Tumawag sa Fire Department / BFP kapag nasa labas na sa ligtas na distansya.";
    } else if (q.includes('nakuryente') || q.includes('downed wire') || q.includes('kable')) {
      actionText += "1. **HUWAG HAWAKAN ANG BIKTIMA O KABLE:** Siguraduhing patay ang main breaker bago lumapit.\n2. Umiwas nang hindi bababa sa 10 metro mula sa anumang nahulog na kable ng kuryente.\n3. Tumawag agad sa emergency medical services.";
    } else {
      actionText += "1. Lumipat agad sa pinakaligtas at mataas na posisyon.\n2. Makipag-ugnayan agad sa inyong Barangay Emergency Operation Center o 911.\n3. Manatiling kalmado at magsenyas sa mga rescue teams.";
    }

    return {
      intent: 'ACTIVE_EMERGENCY',
      isUrgent: true,
      hazardType,
      immediateActionText: actionText
    };
  }

  if (isMedicalEmergency) {
    return {
      intent: 'MEDICAL_EMERGENCY',
      isUrgent: true,
      hazardType,
      immediateActionText: "🚨 **FIRST AID / MEDICAL EMERGENCY PROTOCOL:**\n1. **Tumawag agad sa Hospital o Emergency Medical Team (911).**\n2. Siguraduhing ligtas ang paligid bago lumapit sa biktima.\n3. Kung hindi humihinga at may pagsasanay, isagawa ang Hands-Only CPR."
    };
  }

  if (isEvacuation) {
    return {
      intent: 'EVACUATION',
      isUrgent: false,
      hazardType
    };
  }

  if (isLocationRequest) {
    return {
      intent: 'LOCATION_REQUEST',
      isUrgent: false,
      hazardType
    };
  }

  return {
    intent: 'GENERAL_PREPAREDNESS',
    isUrgent: false,
    hazardType
  };
}
