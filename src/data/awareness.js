export const healthArticles = [
  {
    id: "guide-001",
    slug: "clean-water-sanitation-cholera-prevention",
    title: "Household Water Purification & Cholera Prevention Protocol",
    category: "Disease Prevention",
    readTime: "4 min read",
    date: "November 2026",
    summary:
      "A practical field guide on boiling, chlorination, and Oral Rehydration Therapy (ORT) to protect Nigerian households during flood-season cholera risks.",
    content: [
      "In flood-prone wards and communities relying on shallow wells or unverified sachet water, Vibrio cholerae spreads rapidly through contaminated drinking water and raw food.",
      "The Gold Standard is rolling boiling: bring water to a vigorous, bubbling boil for at least 60 full seconds before cooling in a covered container.",
      "Chemical treatment with approved chlorine tablets or sodium hypochlorite: follow NCDC guidelines—add 2 drops of standard unscented household bleach per liter of clear water (4 drops if cloudy), stir, and wait 30 minutes.",
      "If anyone develops watery diarrhea, immediately mix 1 sachet of Oral Rehydration Salts (ORS) in 1 liter of safe boiled water and proceed to the nearest Primary Health Centre (PHC).",
    ],
    keyTakeaways: [
      "Boil drinking water vigorously for at least 1 minute.",
      "Wash hands with soap after toilet use and before eating or preparing food.",
      "Keep ORS sachets in your household first-aid kit.",
      "Report cluster cases immediately to NCDC 6232.",
    ],
  },
  {
    id: "guide-002",
    slug: "lassa-fever-food-storage-hygiene",
    title: "Lassa Fever Prevention: Protecting Homes & Food Stores",
    category: "Disease Prevention",
    readTime: "4 min read",
    date: "November 2026",
    summary:
      "Essential dry-season precautions to prevent Mastomys rat contamination of garri, rice, beans, and household kitchens.",
    content: [
      "Lassa fever is an acute viral hemorrhagic illness transmitted primarily when food or household items are contaminated with the urine or feces of infected multimammate rats.",
      "Never dry cassava flakes (garri), yam flour (elubo), maize, or pepper on bare ground along roadsides or open compounds where rodents forage at night.",
      "Store all dry foodstuffs in thick, tightly lidded plastic or metal drums rather than open sacks.",
      "Any fever lasting more than 48 hours that fails to respond to tested antimalarial treatment requires urgent evaluation at an accredited hospital—do not self-medicate indefinitely.",
    ],
    keyTakeaways: [
      "Store garri, rice, and grains in sealed rodent-proof containers.",
      "Never dry food items on bare open ground.",
      "Block rodent holes and clear bush around residential compounds.",
      "Seek early hospital care for persistent fever; call NCDC 6232.",
    ],
  },
  {
    id: "guide-003",
    slug: "recognizing-stroke-cardiac-emergencies",
    title: "Recognizing Early Signs of Heart Attack & Stroke (The BE-FAST Method)",
    category: "Emergency & First Aid",
    readTime: "5 min read",
    date: "November 2026",
    summary:
      "Minutes save lives when cardiovascular events strike. Learn the critical clinical symptoms that demand an instant emergency 112 / 767 call.",
    content: [
      "Hypertension and sudden cardiovascular emergencies are rising across urban and semi-urban Nigeria. Prompt recognition within the 'golden hour' drastically reduces disability and mortality.",
      "Use BE-FAST for stroke: B (Balance - sudden loss of balance), E (Eyes - sudden vision loss), F (Face - one side drooping), A (Arms - arm weakness or numbness), S (Speech - slurred speech), T (Time - call 112 or head to a Teaching Hospital stroke unit immediately).",
      "Do NOT force water, palm oil, or herbal mixtures into the mouth of an unconscious or seizing person—this causes fatal airway aspiration.",
    ],
    keyTakeaways: [
      "Remember BE-FAST: Balance, Eyes, Face, Arms, Speech, Time.",
      "Never pour liquids or spoons into the mouth of a convulsing person.",
      "Call 112 (or 767 LASAMBUS in Lagos) immediately.",
    ],
  },
  {
    id: "guide-004",
    slug: "essential-maternal-nutrition-immunization",
    title: "Maternal Health & Routine Childhood Immunization Schedule",
    category: "Maternal & Child Health",
    readTime: "6 min read",
    date: "October 2026",
    summary:
      "Protecting mothers and newborns through antenatal care at accredited PHCs, folic acid, exclusive breastfeeding, and NPHCDA vaccine schedules.",
    content: [
      "Under the Basic Health Care Provision Fund (BHCPF), pregnant women and children under 5 can access subsidized antenatal care and free routine immunizations at accredited Primary Health Centres nationwide.",
      "Exclusive breastfeeding for the first 6 months gives infants essential hydration and maternal antibodies that protect against pneumonia and diarrheal disease.",
      "Complete all NPHCDA childhood vaccines on schedule: BCG/OPV0/HBV at birth, Pentavalent doses at 6, 10, and 14 weeks, and Measles/Yellow Fever at 9 months.",
    ],
    keyTakeaways: [
      "Attend at least 4 to 8 antenatal checkups at a verified PHC or hospital.",
      "Practice exclusive breastfeeding for the first 6 months.",
      "Ensure children complete Pentavalent, Polio, and Measles vaccines.",
    ],
  },
  {
    id: "guide-005",
    slug: "mental-health-chronic-stress-management",
    title: "Navigating Chronic Stress: Practical Strategies for Emotional Resilience",
    category: "Mental Health",
    readTime: "4 min read",
    date: "October 2026",
    summary:
      "Evidence-based techniques to manage burnout, monitor blood pressure, and access confidential mental health support.",
    content: [
      "Economic pressure, urban commutes, and caregiving fatigue can trigger chronic stress, elevating blood pressure and weakening immune resilience.",
      "Practice physiological sighing (two quick inhales through the nose followed by one slow exhale through the mouth) to calm an overstimulated nervous system within seconds.",
      "Monitor your blood pressure monthly at any accredited community pharmacy or PHC, and reach out to the National Mental Health Crisis Line (0800-800-2000) whenever overwhelmed.",
    ],
    keyTakeaways: [
      "Check your blood pressure regularly—hypertension often has no early symptoms.",
      "Aim for 7 to 8 hours of restful sleep.",
      "Call 0800-800-2000 for confidential mental health support.",
    ],
  },
];

export const firstAidGuides = [
  {
    id: "fa-001",
    title: "Adult CPR (Hands-Only Cardiopulmonary Resuscitation)",
    icon: "bi-heart-pulse",
    color: "#b42318",
    urgent: true,
    steps: [
      "Check the scene for safety and tap the person's shoulder while shouting, 'Are you okay?'",
      "If unresponsive and not breathing normally, point to someone nearby to call 112 (or 767 in Lagos) and look for an AED.",
      "Place the heel of one hand in the center of the chest, and interlock your other hand on top.",
      "Lock your elbows and push hard and fast: at least 2 inches (5 cm) deep at 100–120 compressions per minute.",
      "Allow the chest to rise completely between pushes and continue until emergency responders or hospital staff take over.",
    ],
  },
  {
    id: "fa-002",
    title: "Choking Emergency (Heimlich Abdominal Thrusts)",
    icon: "bi-exclamation-triangle",
    color: "#a66b00",
    urgent: true,
    steps: [
      "Ask, 'Are you choking?' If the person can cough forcefully or speak, encourage coughing—do not slap their back while upright.",
      "If they cannot breathe, speak, or clutch their throat, act immediately.",
      "Stand behind them, wrap your arms around their waist, and make a fist slightly above the navel (below the ribcage).",
      "Grasp your fist with your other hand and deliver quick, inward-and-upward abdominal thrusts.",
      "Repeat until the airway clears or call 112 immediately if they become unconscious (begin CPR).",
    ],
  },
  {
    id: "fa-003",
    title: "Severe Bleeding & Road Trauma Response",
    icon: "bi-droplet",
    color: "#b42318",
    urgent: true,
    steps: [
      "Call 112 or FRSC 122 immediately for highway or trauma incidents.",
      "Protect yourself with clean gloves or a plastic barrier if available.",
      "Apply firm, continuous direct pressure onto the bleeding wound using sterile gauze or the cleanest cloth available.",
      "Do NOT pull off blood-soaked cloth; layer fresh cloth on top and maintain steady pressure.",
      "Keep the injured person lying flat and warm to prevent shock until ambulance evacuation arrives.",
    ],
  },
  {
    id: "fa-004",
    title: "Seizure / Convulsion Safety (What NOT to Do)",
    icon: "bi-shield-exclamation",
    color: "#ea580c",
    urgent: true,
    steps: [
      "Stay calm and gently lower the person onto their side (recovery position) on a soft surface.",
      "Clear hard or sharp objects away from their head and loosen tight collars.",
      "NEVER force a spoon, stick, finger, water, palm oil, or onions into their mouth—this breaks teeth and blocks breathing.",
      "Do not restrain their limbs forcefully; time the seizure.",
      "Call 112 or take them to the nearest hospital if the seizure lasts more than 5 minutes or repeats without waking.",
    ],
  },
];

export const healthMyths = [
  {
    myth: "Putting a metal spoon or palm oil in the mouth stops a convulsion.",
    fact: "Forcing objects or liquids into a seizing person's mouth causes severe airway choking, aspiration pneumonia, and broken teeth. Turn the person gently on their side and seek urgent hospital care.",
    category: "First Aid",
  },
  {
    myth: "Every fever is malaria—just buy antibiotics and antimalarials together.",
    fact: "Treating unconfirmed fever blindly delays diagnosis of Lassa fever, typhoid, or viral infections and drives antibiotic resistance. Always take an RDT or lab test first.",
    category: "Medication",
  },
  {
    myth: "Sachet ('pure') water is always 100% safe from cholera.",
    fact: "Unregulated or poorly stored sachet water can still carry bacterial contamination during outbreaks. Verify NAFDAC numbers or boil drinking water during cholera alerts.",
    category: "Water Safety",
  },
  {
    myth: "High blood pressure only affects older adults and always gives headaches.",
    fact: "Hypertension is called the 'silent killer' because most people feel completely normal until stroke or heart failure occurs. Check your BP regularly from age 18+.",
    category: "Preventive Care",
  },
];
