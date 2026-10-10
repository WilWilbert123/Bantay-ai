/**
 * Comprehensive Philippine Disaster Knowledge Corpus for Bantay AI RAG
 * Verified guidance based on NDRRMC, DOST-PAGASA, PHIVOLCS, DOH, & Red Cross.
 */

export interface DisasterGuide {
  id: string;
  category: string;
  hazardName: string;
  title: string;
  publisher: string;
  publishedAt: string;
  beforeActions: string[];
  duringActions: string[];
  afterActions: string[];
  specialInstructions?: string[];
}

export const DISASTER_KNOWLEDGE_CORPUS: DisasterGuide[] = [
  {
    id: 'guide_typhoon_2026',
    category: 'TYPHOON',
    hazardName: 'Typhoons & Tropical Cyclones (Bagyo)',
    title: 'NDRRMC & PAGASA National Typhoon Preparedness Manual 2026',
    publisher: 'DOST-PAGASA / NDRRMC',
    publishedAt: '2026-01-15',
    beforeActions: [
      'Sumubaybay sa opisyal na PAGASA Weather Bulletins at Signal Warnings sa radyo, TV, at LGU announcements.',
      'Ihanda ang 72-Hour Emergency Go-Bag (pagkain, malinis na tubig, flashlight, first aid kit, radyo, power bank, mga lisensya/dokumento).',
      'Itali o patibayin ang bubong, bintana, at pinto. Linisin ang mga kanal at drain sa paligid ng bahay.',
      'Mag-iwas sa pagbibiyahe sa dagat o mababang kalsada.'
    ],
    duringActions: [
      'Manatili sa loob ng matibay na bahay o evacuation center.',
      'Patayin ang main breaker ng kuryente kung may baha o banta ng kidlat.',
      'Huwag lumabas kapag dumaan ang "Eye of the Typhoon" o mata ng bagyo dahil pansamantalang kalmado lamang ang panahon at babalik ang malakas na hangin.'
    ],
    afterActions: [
      'Mag-ingat sa mga nahulog na kable ng kuryente at sirang puno.',
      'I-check ang bahay bago muling pumasok. Huwag bumalik sa bahay kung hindi pa nagbibigay ng go-signal ang LGU.',
      'Pakuluan ang inuming tubig upang maiwasan ang sakit.'
    ],
    specialInstructions: [
      'Mga Bata at Seniors: Tiyaking laging kasama ang pamilya at may suot na ID tags na may contact number.',
      'Mga Alagang Hayop (Pets): Huwag iwanang nakatali o nakakulong ang mga alagang hayop kapag lumilikas.'
    ]
  },
  {
    id: 'guide_flood_2026',
    category: 'FLOOD',
    hazardName: 'Floods & Flash Floods (Baha at Flash Flood)',
    title: 'DOH & NDRRMC Flood Risk & Leptospirosis Prevention Protocol 2026',
    publisher: 'NDRRMC / DOH',
    publishedAt: '2026-02-01',
    beforeActions: [
      'Alamin kung ang inyong lugar ay flood-prone o tabing-ilog.',
      'Ilipat ang mga gamit, appliances, at mahahalagang papel sa mataas na palapag.',
      'I-charge ang mga mobile phone at emergency lights.'
    ],
    duringActions: [
      'Patayin agad ang main power switch kung pumasok ang tubig sa bahay.',
      'Lumipat agad sa mas mataas na lugar o evacuation center habang mababa pa ang tubig.',
      'HUWAG LUMUSONG O LUMANGOY SA BAHA. Iwasan ang leptospirosis at nakakuryenteng kable.'
    ],
    afterActions: [
      'Maghugas agad ng sabon at malinis na tubig kung naitubig ang binti o paa sa baha. Uminom ng Prophylaxis (Doxycycline) ayon sa payo ng DOH.',
      'Linisin at i-disinfect ang buong bahay bago muling tirahan.'
    ]
  },
  {
    id: 'guide_earthquake_2026',
    category: 'EARTHQUAKE',
    hazardName: 'Earthquakes & Seismic Hazards (Lindol)',
    title: 'PHIVOLCS National Earthquake Safety & Evacuation Manual 2026',
    publisher: 'PHIVOLCS-DOST',
    publishedAt: '2026-01-10',
    beforeActions: [
      'Isagawa ang Home Safety Inspection: I-secure ang matataas na cabinet, salamin, at heavy appliances sa pader.',
      'Magkasundo ang pamilya sa isang Ligtas na Assembly Area kung saan magkikita pagkatapos ng pagyanig.',
      'Ihanda ang Emergency Go-Bag na may pito (whistle) at first aid kit.'
    ],
    duringActions: [
      'DUCK, COVER, & HOLD ON: Yumuko sa ilalim ng matibay na mesa, protektahan ang ulo, at kumapit hanggang matapos ang pagyanig.',
      'Lumayo sa mga bintanang salamin, cabinet, at naglalakihang gamit na pwedeng matumba.',
      'Huwag tumakbo palabas habang umuuga ang lupa.'
    ],
    afterActions: [
      'Lalabas nang maayos kapag huminto na ang pagyanig. HUWAG GUMAMIT NG ELEVATOR.',
      'Mag-ingat sa mga matutulis na bubog at sirang linya ng kuryente at gas.',
      'Mag-handa sa mga posibleng Aftershocks.'
    ]
  },
  {
    id: 'guide_volcano_2026',
    category: 'VOLCANO',
    hazardName: 'Volcanic Eruptions & Ashfall (Pagsabog ng Bulkan at Ashfall)',
    title: 'PHIVOLCS Volcanic Hazard & Ashfall Safety Protocol 2026',
    publisher: 'PHIVOLCS-DOST',
    publishedAt: '2026-03-01',
    beforeActions: [
      'Alamin ang PHIVOLCS Volcano Alert Levels (Level 1 hanggang Level 5).',
      'Maghanda ng N95 masks, goggles, at malinis na tubig sa bahay.',
      'Sumunod sa 4km-7km Permanent Danger Zone (PDZ) restrictions.'
    ],
    duringActions: [
      'Gumamit ng N95 Mask o basahang basa sa ilong at bibig habang may ashfall.',
      'Sarhan ang lahat ng pinto at bintana. Patayin ang aircon at electric fans upang hindi pumasok ang abo.',
      'Umalis agad kapag ipinag-utos ng LGU ang preemptive evacuation.'
    ],
    afterActions: [
      'Linisin ang abo sa bubong gamit ang kaunting tubig upang hindi bumigat at mabagsakan ang bahay.',
      'Magsuot ng proteksyon sa mata at balat habang naglilinis ng abo.'
    ]
  },
  {
    id: 'guide_firstaid_2026',
    category: 'FIRST_AID',
    hazardName: 'Emergency First Aid & Basic Medical Care (Paunang Lunas)',
    title: 'Philippine Red Cross Disaster First Aid Guide 2026',
    publisher: 'Philippine Red Cross / DOH',
    publishedAt: '2026-01-20',
    beforeActions: [
      'Mag-imbak ng kumpletong First Aid Kit sa bahay at sasakyan.',
      'Dinaluhan ang basic CPR at first aid training ng Red Cross.'
    ],
    duringActions: [
      'Pag-ampat ng Dugo (Bleeding): Lagyan ng malinis na gasa o tela ang sugat at diinan nang maayos (Direct Pressure).',
      'Pasa o Nabalian (Fracture): Huwag galawin ang nabaliang bahagi. Lagyan ng splint o suporta bago dalhin sa ospital.',
      'Paso o Sunog sa Balat (Burns): Buhusan ng malinis at malamig na tubig (taps water) sa loob ng 10-15 minuto. HUWAG lalagyan ng toothpaste o mantika.'
    ],
    afterActions: [
      'Ipadala agad ang biktima sa pinakamalapit na ospital o health center.'
    ]
  }
];
