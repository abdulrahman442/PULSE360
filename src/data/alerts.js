export const healthAlerts = [
  {
    id: "alert-001",
    slug: "cholera-vigilance-lagos-kano-borno",
    title: "Cholera Outbreak Alert: Flood-Prone LGAs in Lagos, Kano & Borno",
    category: "Outbreak",
    severity: "critical",
    publishedDate: "2026-11-18",
    updatedDate: "2026-11-22",
    issuingAgency: "Nigeria Centre for Disease Control & Prevention (NCDC)",
    state: "Lagos",
    lga: "Lagos Island",
    region: "Lagos Island, Kosofe, Kano Municipal & Maiduguri LGAs",
    affectedAreas: ["Lagos Island LGA", "Ikorodu LGA", "Kano Municipal", "Maiduguri Jere"],
    summary:
      "NCDC and State Ministries of Health have activated Emergency Operations Centres following acute watery diarrhea clusters. Residents are urged to boil drinking water and use ORS immediately.",
    description:
      "Surveillance teams have confirmed Vibrio cholerae clusters across densely populated riverine and flood-affected wards. Oral Rehydration Therapy (ORT) corners have been activated at Primary Health Centres, and emergency chlorine tablets plus IV fluids are being dispatched from Central Medical Stores.",
    symptoms: [
      "Sudden onset of profuse, painless watery diarrhea ('rice-water' stools)",
      "Frequent vomiting and severe abdominal cramping",
      "Rapid dehydration: sunken eyes, dry tongue, and weak pulse",
      "Extreme thirst and decreased urine output",
      "Painful leg muscle cramps from rapid electrolyte loss",
    ],
    preventionSteps: [
      "Boil all borehole, well, or sachet water of uncertain source for at least 1 minute before drinking.",
      "Wash hands thoroughly with soap and clean running water after using the toilet and before handling food.",
      "Wash fruits and vegetables with safe, treated water and eat food while still piping hot.",
      "Avoid open defecation and keep household latrines covered and disinfected.",
      "Start Oral Rehydration Salts (ORS) immediately at the first sign of watery stool while heading to a PHC.",
    ],
    whenToSeekCare:
      "Go immediately to the nearest General Hospital or Primary Health Centre (PHC) if watery diarrhea occurs more than 3 times in 2 hours, or if vomiting prevents drinking fluids.",
    emergencyHotline: "6232 (NCDC Toll-Free) / 112",
    updatesTimeline: [
      {
        date: "2026-11-22 10:15 AM",
        note: "45,000 ORS sachets and 12,000 Ringer's Lactate IV bags dispatched to Lagos and Kano State Medical Stores.",
      },
      {
        date: "2026-11-20 02:30 PM",
        note: "24-hour Oral Rehydration Therapy (ORT) corners activated across 18 Primary Health Centres.",
      },
      {
        date: "2026-11-18 08:00 AM",
        note: "NCDC Cholera Technical Working Group elevated alert level to Critical across priority LGAs.",
      },
    ],
  },
  {
    id: "alert-002",
    slug: "lassa-fever-dry-season-surveillance",
    title: "Lassa Fever Dry-Season Advisory: Ondo, Edo & Bauchi Corridor",
    category: "Outbreak",
    severity: "critical",
    publishedDate: "2026-11-16",
    updatedDate: "2026-11-21",
    issuingAgency: "NCDC National Lassa Fever Emergency Operations Centre",
    state: "Ondo",
    lga: "Owo",
    region: "Owo (Ondo), Etsako West (Edo) & Bauchi Central",
    affectedAreas: ["Owo LGA (Ondo)", "Akure South (Ondo)", "Etsako West (Edo)", "Oredo (Edo)"],
    summary:
      "Seasonal spike in Lassa fever transmission linked to multimammate rat contact and bush burning. Strict food storage hygiene and early Ribavirin access emphasized.",
    description:
      "During the dry season, Mastomys natalensis rodents frequently enter residential homes and food stores. Healthcare workers are reminded to maintain strict Infection Prevention and Control (IPC) standards and isolate suspected viral hemorrhagic fever cases early.",
    symptoms: [
      "Persistent high fever that does not respond to antimalarial treatment",
      "Severe sore throat, chest pain, and generalized body weakness",
      "Headache, nausea, vomiting, and abdominal pain",
      "Unexplained bleeding from gums, nose, or injection sites in advanced stages",
    ],
    preventionSteps: [
      "Store all grains (garri, rice, beans, maize) in tightly sealed rodent-proof plastic or metal containers.",
      "Avoid drying food items (cassava, yam chips, pepper) on bare ground along roadsides or open compounds.",
      "Block all rat entry holes in homes and clear overgrown bushes around residential buildings.",
      "Never touch or consume rodents; wash utensils thoroughly before cooking.",
      "Healthcare facilities must use full PPE when triaging febrile patients.",
    ],
    whenToSeekCare:
      "If fever persists after 48 hours of standard malaria/typhoid therapy, report immediately to Federal Medical Centre (FMC) Owo, Irrua Specialist Teaching Hospital, or call NCDC 6232.",
    emergencyHotline: "6232 (NCDC) / +234 800 9700 0010",
    updatesTimeline: [
      {
        date: "2026-11-21 11:00 AM",
        note: "Emergency Ribavirin and PPE stock replenished at FMC Owo and Irrua Specialist Hospital.",
      },
      {
        date: "2026-11-16 09:00 AM",
        note: "NCDC issued nationwide dry-season Lassa Fever preparedness directive to all 36 States and FCT.",
      },
    ],
  },
  {
    id: "alert-003",
    slug: "malaria-dengue-vector-control-advisory",
    title: "Malaria & Vector-Borne Illness Advisory: Post-Rain Stagnant Water Control",
    category: "Seasonal",
    severity: "warning",
    publishedDate: "2026-11-14",
    updatedDate: "2026-11-19",
    issuingAgency: "National Malaria Elimination Programme (NMEP) & State MoH",
    state: "Oyo",
    lga: "Ibadan North",
    region: "South-West & North-Central States (Oyo, Lagos, FCT Abuja)",
    affectedAreas: ["Ibadan North LGA", "Surulere LGA", "AMAC FCT", "Gwagwalada"],
    summary:
      "Elevated mosquito vector density recorded following late-season rainfall. Citizens are urged to test before treating fever and sleep under Insecticide-Treated Nets (ITNs).",
    description:
      "Community health facilities report increased outpatient visits for uncomplicated and severe malaria alongside suspected arboviral fevers. Rapid Diagnostic Tests (RDTs) and Artemisinin-based Combination Therapies (ACTs) are stocked across accredited PHCs.",
    symptoms: [
      "High fever, rigors (chills and shivering), and profuse sweating",
      "Severe headache and joint/muscle aches",
      "Loss of appetite, nausea, and bitterness in the mouth",
      "Drowsiness or convulsions in young children (severe malaria emergency)",
    ],
    preventionSteps: [
      "Sleep under Long-Lasting Insecticide-Treated Nets (LLINs) every night, especially pregnant women and children under 5.",
      "Clear blocked gutters, discarded tyres, and open water containers around compounds.",
      "Install intact window and door mosquito netting.",
      "Always confirm malaria with an RDT or microscopy test before taking ACT medication.",
    ],
    whenToSeekCare:
      "Seek urgent hospital care immediately if a child with fever develops convulsions, extreme weakness, inability to feed, or dark-colored urine.",
    emergencyHotline: "112 / State Primary Health Care Board",
    updatesTimeline: [
      {
        date: "2026-11-19 01:00 PM",
        note: "100,000 Malaria RDT kits and pediatric ACTs distributed to Oyo and FCT Primary Health Centres.",
      },
    ],
  },
  {
    id: "alert-004",
    slug: "nafdac-counterfeit-antimalarial-batch-recall",
    title: "NAFDAC Safety Alert: Recall of Falsified Artemether/Lumefantrine Batch",
    category: "Emergency",
    severity: "critical",
    publishedDate: "2026-11-11",
    updatedDate: "2026-11-18",
    issuingAgency: "NAFDAC Pharmacovigilance & Post-Marketing Surveillance",
    state: "FCT Abuja",
    lga: "AMAC",
    region: "Nationwide Pharmacy & Patent Medicine Channels",
    affectedAreas: ["All 36 States & FCT", "Wholesale Drug Markets", "Retail Pharmacies"],
    summary:
      "NAFDAC directs immediate quarantine of falsified 'Coartem-Plus Forte' Batch #NG-4490X found with zero active pharmaceutical ingredient. Report stock immediately.",
    description:
      "Routine post-marketing surveillance across open drug markets detected counterfeit blister packs mimicking registered antimalarial brands. Pharmacies, hospitals, and consumers are instructed to verify NAFDAC Registration Numbers and quarantine suspected batches.",
    symptoms: [
      "Failure of malaria fever to subside within 48 hours of dosing",
      "Unexpected severe gastric irritation or allergic skin reactions",
      "Progression to severe malaria due to lack of active ingredient",
    ],
    preventionSteps: [
      "Purchase medicines only from PCN-licensed pharmacies and accredited hospital dispensaries.",
      "Check the NAFDAC Registration Number and Mobile Authentication Service (MAS) scratch code before use.",
      "Inspect Batch #NG-4490X (Exp 09/2028) and return any matching packs to the nearest NAFDAC office.",
      "Report suspected substandard drugs via NAFDAC toll-free line or MedSafety App.",
    ],
    whenToSeekCare:
      "Visit an accredited clinic immediately if a patient's fever worsens after taking suspected counterfeit medication.",
    emergencyHotline: "0800-162-3322 (NAFDAC Toll-Free)",
    updatesTimeline: [
      {
        date: "2026-11-18 04:00 PM",
        note: "Joint NAFDAC and PCN enforcement taskforce sealed 14 unlicensed wholesale outlets.",
      },
    ],
  },
  {
    id: "alert-005",
    slug: "diphtheria-routine-immunization-kano-kaduna",
    title: "Diphtheria & Routine Immunization Intensification: North-West Zone",
    category: "Seasonal",
    severity: "warning",
    publishedDate: "2026-11-09",
    updatedDate: "2026-11-15",
    issuingAgency: "NPHCDA & NCDC Diphtheria Technical Working Group",
    state: "Kano",
    lga: "Dala",
    region: "Kano, Kaduna, Katsina & Sokoto States",
    affectedAreas: ["Dala LGA (Kano)", "Kumbotso (Kano)", "Zaria (Kaduna)", "Ungogo (Kano)"],
    summary:
      "Free Pentavalent and Td booster vaccines available across all Primary Health Centres. Parents urged to complete childhood immunization schedules promptly.",
    description:
      "Surveillance data shows pockets of unvaccinated children remain vulnerable to Corynebacterium diphtheriae. Cold-chain warehouses have prioritized Diphtheria Antitoxin (DAT) and antibiotics for designated treatment centres.",
    symptoms: [
      "Sore throat, low-grade fever, and difficulty swallowing",
      "Thick greyish-white membrane coating the throat and tonsils",
      "Swollen glands in the neck ('bull neck' appearance)",
      "Hoarseness and difficulty breathing",
    ],
    preventionSteps: [
      "Ensure children receive all 3 doses of Pentavalent vaccine at 6, 10, and 14 weeks at the nearest PHC.",
      "Obtain Td booster doses for older children and adolescents during outreach campaigns.",
      "Isolate symptomatic individuals early and avoid close droplet contact.",
    ],
    whenToSeekCare:
      "Seek emergency care at Aminu Kano Teaching Hospital or Murtala Muhammad Specialist Hospital immediately if a child develops throat membrane or breathing difficulty.",
    emergencyHotline: "6232 (NCDC) / State Immunization Desk",
    updatesTimeline: [
      {
        date: "2026-11-15 10:30 AM",
        note: "Mobile vaccination teams deployed across 24 wards in Dala and Kumbotso LGAs.",
      },
    ],
  },
  {
    id: "alert-006",
    slug: "mpox-surveillance-rivers-bayelsa-lagos",
    title: "Mpox Surveillance & Containment Update: South-South & Lagos",
    category: "Outbreak",
    severity: "resolved",
    publishedDate: "2026-10-22",
    updatedDate: "2026-11-12",
    issuingAgency: "NCDC Communicable Disease Surveillance Unit",
    state: "Rivers",
    lga: "Port Harcourt",
    region: "Port Harcourt (Rivers), Yenagoa & Eti-Osa (Lagos)",
    affectedAreas: ["Port Harcourt LGA", "Obio/Akpor LGA", "Eti-Osa LGA"],
    summary:
      "Active contact tracing and community sensitization have stabilized transmission across monitored LGAs. Vigilance and early sample testing remain ongoing.",
    description:
      "Following coordinated case management at University of Port Harcourt Teaching Hospital and Mainland Hospital Yaba, confirmed case counts have declined steadily over the last three epidemiological weeks.",
    symptoms: [
      "Characteristic blistering skin rash on face, palms, soles, or torso",
      "Fever, intense headache, and muscle aches",
      "Swollen lymph nodes in the neck, armpits, or groin",
    ],
    preventionSteps: [
      "Avoid direct skin-to-skin contact with individuals who have unexplained blister rashes.",
      "Do not share bedding, towels, or utensils with suspected cases.",
      "Report suspected cases to the LGA Disease Surveillance and Notification Officer (DSNO) or call 6232.",
    ],
    whenToSeekCare:
      "Visit the nearest designated isolation clinic or teaching hospital if a febrile illness is followed by a vesicular rash.",
    emergencyHotline: "6232 (NCDC Connect Centre)",
    updatesTimeline: [
      {
        date: "2026-11-12 09:00 AM",
        note: "Alert status downgraded to Resolved following 21 days of containment stability.",
      },
    ],
  },
];
