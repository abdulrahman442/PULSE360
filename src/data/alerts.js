export const healthAlerts = [
  {
    id: "alert-001",
    slug: "cholera-vigilance-coastal-water-safety",
    title: "Cholera Outbreak Alert: Coastal & Flood-Prone Regions",
    category: "Outbreak",
    severity: "critical",
    publishedDate: "2026-11-18",
    updatedDate: "2026-11-20",
    issuingAgency: "National Public Health Emergency Operations Center",
    region: "Coastal Districts & Riverine Basin",
    affectedAreas: ["Eastern Coastline", "Delta River Basin", "Metro Zone 4"],
    summary:
      "A surge in acute watery diarrhea cases has been identified. Public health authorities urge immediate boiling of drinking water and adherence to strict hygiene protocols.",
    description:
      "Surveillance teams have detected a cluster of Vibrio cholerae infections across five municipal zones following recent heavy seasonal rains and flash floods. Contaminated water supply points have been cordoned off. Emergency rehydration points and water treatment chemical distributions are underway.",
    symptoms: [
      "Sudden onset of profuse, watery diarrhea ('rice-water' stools)",
      "Frequent vomiting and abdominal cramping",
      "Rapid dehydration, sunken eyes, dry mouth",
      "Extreme thirst and low blood pressure",
      "Muscle cramps caused by rapid electrolyte loss",
    ],
    preventionSteps: [
      "Boil all drinking water vigorously for at least 1 minute or treat with approved chlorine tablets.",
      "Wash hands thoroughly with soap and clean running water before eating and after using the restroom.",
      "Eat only freshly cooked meals that are served piping hot; avoid raw vegetables and unpeeled fruits.",
      "Avoid purchasing food or ice from unregistered street vendors in affected areas.",
      "Immediately administer Oral Rehydration Salts (ORS) at the first sign of watery diarrhea.",
    ],
    whenToSeekCare:
      "Seek emergency medical attention immediately if watery diarrhea occurs more than 3 times in 2 hours, if vomiting prevents fluid retention, or if signs of severe lethargy and unconsciousness appear.",
    emergencyHotline: "+1 (800) 555-PULSE (Option 1 - Outbreak Taskforce)",
    updatesTimeline: [
      {
        date: "2026-11-20 09:30 AM",
        note: "30,000 chlorine treatment packets deployed to municipal water distribution centers in Metro Zone 4.",
      },
      {
        date: "2026-11-19 02:00 PM",
        note: "Emergency rehydration clinics activated at St. Jude General Hospital and Coastal Community Health Center.",
      },
      {
        date: "2026-11-18 08:00 AM",
        note: "Public health surveillance alert issued following lab confirmation of 42 cluster cases.",
      },
    ],
  },
  {
    id: "alert-002",
    slug: "dengue-prevention-vector-control-advisory",
    title: "Seasonal Dengue Fever Alert: Enhanced Vector Control Required",
    category: "Seasonal",
    severity: "warning",
    publishedDate: "2026-11-15",
    updatedDate: "2026-11-19",
    issuingAgency: "Vector-Borne Disease Control Directorate",
    region: "Metropolitan Central & Suburban South",
    affectedAreas: ["Central City", "Green Valley Suburb", "South Park District"],
    summary:
      "Increased mosquito breeding indices detected following stagnant rainfall pools. Residents are instructed to eliminate standing water containers around residential premises.",
    description:
      "Hospital admissions for Dengue fever have risen by 35% compared to seasonal baselines. The Aedes aegypti mosquito species, active primarily in early morning and late afternoon, is multiplying in unattended containers, flower pots, tires, and roof gutters.",
    symptoms: [
      "Sudden high fever (reaching up to 104°F / 40°C)",
      "Severe retro-orbital (behind the eyes) headache",
      "Intense joint and muscle pain ('breakbone fever')",
      "Mild bleeding manifestations (nosebleeds, bleeding gums)",
      "Skin rash appearing 2 to 5 days after onset of fever",
    ],
    preventionSteps: [
      "Inspect and empty, clean, or turn over all containers holding standing water at least once every week.",
      "Apply DEET, Picaridin, or Oil of Lemon Eucalyptus mosquito repellents to exposed skin.",
      "Install fine mesh screens on household windows and doors.",
      "Wear light-colored, long-sleeved shirts and long pants during peak biting hours.",
      "Ensure rooftop water tanks and drainage gullies are tightly sealed.",
    ],
    whenToSeekCare:
      "Visit a healthcare facility if fever persists beyond 3 days. Seek immediate emergency care if severe abdominal pain, persistent vomiting, mucosal bleeding, or extreme fatigue develops.",
    emergencyHotline: "+1 (800) 555-PULSE (Option 2 - Vector Control)",
    updatesTimeline: [
      {
        date: "2026-11-19 11:00 AM",
        note: "Municipal fogging squads deployed in South Park and Green Valley districts.",
      },
      {
        date: "2026-11-15 10:00 AM",
        note: "Public awareness circular dispatched to all primary schools and community centers.",
      },
    ],
  },
  {
    id: "alert-003",
    slug: "respiratory-influenza-h3n2-surge",
    title: "Seasonal Influenza & Respiratory Illness Advisory",
    category: "Seasonal",
    severity: "warning",
    publishedDate: "2026-11-12",
    updatedDate: "2026-11-17",
    issuingAgency: "Department of Respiratory Disease & Immunization",
    region: "Nationwide & Urban Transit Hubs",
    affectedAreas: ["Nationwide Metro Centers", "Public Transit Corridors", "Schools"],
    summary:
      "Elevated transmission of influenza strain H3N2 and RSV observed among pediatric and geriatric populations. Annual influenza vaccination strongly advised.",
    description:
      "Primary health clinics report an influx of acute respiratory infection cases. Vulnerable groups, including children under 5, adults over 65, and individuals with asthma or cardiovascular conditions, are advised to take preventive precautions.",
    symptoms: [
      "High fever and severe chills",
      "Persistent dry or productive cough",
      "Sore throat, nasal congestion, and runny nose",
      "Profound body aches and generalized weakness",
      "Shortness of breath in severe cases",
    ],
    preventionSteps: [
      "Receive the updated seasonal quadrivalent influenza vaccine at participating clinics and pharmacies.",
      "Wear a protective mask in crowded indoor settings and transit vehicles.",
      "Practice respiratory etiquette: cover coughs and sneezes with a bent elbow or tissue.",
      "Stay home from work or school when exhibiting fever and flu-like symptoms.",
      "Regularly disinfect high-touch surfaces such as doorknobs, phones, and countertops.",
    ],
    whenToSeekCare:
      "Seek emergency care if experiencing difficulty breathing, chest tightness, bluish lips or face, or inability to retain fluids.",
    emergencyHotline: "+1 (800) 555-PULSE (Option 3 - Immunization Info)",
    updatesTimeline: [
      {
        date: "2026-11-17 03:00 PM",
        note: "Free flu shot pop-ups established at 18 major transit stations and city halls.",
      },
      {
        date: "2026-11-12 09:00 AM",
        note: "Advisory issued recommending indoor masking in elder care homes and hospitals.",
      },
    ],
  },
  {
    id: "alert-004",
    slug: "extreme-heat-air-quality-emergency",
    title: "Extreme Heatwave & Ozone Air Quality Advisory",
    category: "Environmental",
    severity: "advisory",
    publishedDate: "2026-11-10",
    updatedDate: "2026-11-16",
    issuingAgency: "Environmental Health & Climate Resilience Unit",
    region: "Inland Valley & Central Industrial Corridor",
    affectedAreas: ["North Valley", "Industrial Belt", "Highland County"],
    summary:
      "Daytime temperatures projected to exceed 39°C (102°F) alongside elevated ground-level ozone. Vulnerable groups should limit strenuous outdoor activity.",
    description:
      "A stagnant high-pressure weather system has trapped heat and fine particulate matter (PM2.5) across inland valleys. Air quality index (AQI) has reached 'Unhealthy for Sensitive Groups'. Cooling shelters have been activated.",
    symptoms: [
      "Throbbing headache, dizziness, and lightheadedness",
      "Profuse sweating transitioning to hot, dry skin (heatstroke warning)",
      "Throat irritation, coughing, and chest tightness from ozone",
      "Nausea and elevated pulse",
    ],
    preventionSteps: [
      "Stay hydrated by drinking water frequently, even before feeling thirsty; avoid caffeine and alcohol.",
      "Schedule necessary outdoor tasks before 10:00 AM or after 6:00 PM.",
      "Keep living quarters cool by closing blinds facing the sun and using fans or air conditioning.",
      "Check in on elderly neighbors, outdoor laborers, and those without air conditioning.",
      "Never leave children, disabled individuals, or pets in a parked vehicle.",
    ],
    whenToSeekCare:
      "Call emergency services immediately if a person exhibits confusion, slurred speech, loss of consciousness, or ceases sweating in extreme heat.",
    emergencyHotline: "+1 (800) 555-PULSE (Option 4 - Cooling Centers)",
    updatesTimeline: [
      {
        date: "2026-11-16 12:00 PM",
        note: "Community cooling centers expanded to 24-hour operation across North Valley.",
      },
    ],
  },
  {
    id: "alert-005",
    slug: "urgent-pediatric-cough-syrup-recall",
    title: "Product Safety Alert: Voluntary Recall of Contaminated Cough Syrup Batch",
    category: "Emergency",
    severity: "critical",
    publishedDate: "2026-11-08",
    updatedDate: "2026-11-14",
    issuingAgency: "Food, Drug & Medical Devices Regulatory Authority",
    region: "National Distribution",
    affectedAreas: ["All Retail Pharmacies", "Wholesale Distributors", "Private Clinics"],
    summary:
      "Batch #CS-2026-09 of 'BronchoRelief Junior 100ml' recalled due to trace diethylene glycol (DEG) contamination. Quarantine product immediately.",
    description:
      "Routine quality monitoring detected unacceptably elevated concentrations of industrial contaminants in a single manufacturing lot. Pharmacies and health centers have been instructed to immediately isolate remaining stock and contact recent purchasers.",
    symptoms: [
      "Acute abdominal pain and vomiting following syrup administration",
      "Decreased or absent urine output (oliguria / anuria)",
      "Unexplained drowsiness or lethargy in young children",
      "Rapid breathing or labored respiration",
    ],
    preventionSteps: [
      "Check household medicine cabinets for 'BronchoRelief Junior' Lot #CS-2026-09 with Expiry 08/2028.",
      "Do not administer this product under any circumstances; return it to the point of purchase.",
      "Consult a pediatrician or licensed pharmacist for safe therapeutic alternatives.",
      "Report any adverse reactions directly to the pharmacovigilance portal.",
    ],
    whenToSeekCare:
      "Bring child to the nearest pediatric emergency department if the recalled medication was ingested within the last 72 hours, particularly if urine output has decreased.",
    emergencyHotline: "+1 (800) 555-PULSE (Option 5 - Poison Control & Recalls)",
    updatesTimeline: [
      {
        date: "2026-11-14 05:00 PM",
        note: "Over 94% of affected bottles accounted for and quarantined nationwide.",
      },
      {
        date: "2026-11-08 08:30 AM",
        note: "Nationwide product freeze and recall notice officially distributed to all licensed distributors.",
      },
    ],
  },
  {
    id: "alert-006",
    slug: "mpox-clade-surveillance-update",
    title: "Mpox Surveillance & Vaccination Guidance Update",
    category: "Outbreak",
    severity: "resolved",
    publishedDate: "2026-10-25",
    updatedDate: "2026-11-10",
    issuingAgency: "Communicable Disease Prevention Bureau",
    region: "Metropolitan District 1 & 2",
    affectedAreas: ["District 1", "District 2"],
    summary:
      "Containment protocols successfully stabilized transmission. Free two-dose vaccines continue to be available for designated priority demographics.",
    description:
      "Through targeted contact tracing, rapid diagnostic testing, and community partnership outreach, new confirmed cases have dropped below threshold indicators for three consecutive weeks.",
    symptoms: [
      "Characteristic rash that progresses through stages: macules, papules, vesicles, pustules, scabs",
      "Fever, headache, muscle aches, backache",
      "Swollen lymph nodes (lymphadenopathy)",
      "Chills and exhaustion",
    ],
    preventionSteps: [
      "Eligible individuals are encouraged to complete both doses of the preventative vaccine.",
      "Avoid close, skin-to-skin contact with people who exhibit a characteristic rash.",
      "Avoid handling bedding, towels, or clothes used by an infected person without protective gloves.",
      "Maintain regular hand hygiene with soap and water or alcohol hand rub.",
    ],
    whenToSeekCare:
      "Consult a healthcare professional promptly if an unexplained blistering rash or swollen lymph nodes appear.",
    emergencyHotline: "+1 (800) 555-PULSE (Option 6 - Communicable Diseases)",
    updatesTimeline: [
      {
        date: "2026-11-10 10:00 AM",
        note: "Alert status updated to 'Resolved' following 21 days with zero community transmission clusters.",
      },
    ],
  },
];
