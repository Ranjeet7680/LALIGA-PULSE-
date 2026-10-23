export const MATCH_INFO = {
  id: "elclasico-2026-r32",
  competition: "LALIGA EA SPORTS - Matchday 32",
  stadium: "Estadio Santiago Bernabéu, Madrid",
  attendance: "81,044",
  homeTeam: {
    name: "Real Madrid",
    shortName: "RMA",
    score: 2,
    color: "#FFFFFF",
    accent: "#FF4B44",
    logoText: "RMA",
    possession: "53%",
    xG: "2.14"
  },
  awayTeam: {
    name: "FC Barcelona",
    shortName: "BAR",
    score: 1,
    color: "#004D98",
    accent: "#A50044",
    logoText: "FCB",
    possession: "47%",
    xG: "1.68"
  },
  minute: 74,
  second: 18,
  opticalStreamFps: 25,
  latencyMs: 142,
  syncStatus: "MEDIACoach TRACAB® 25FPS SYNCED"
};

export const TACTICAL_EVENTS = [
  {
    id: "tactix-01",
    minute: "74'",
    title: "Direct Free-Kick Decision (24.2m)",
    context: "Jude Bellingham steps up with a 3-man wall aligned. Mediacoach indicates 0.18 xG on direct strikes from Zone 14.",
    sponsor: "POWERED BY MICROSOFT AZURE BEYOND STATS",
    question: "What is Jude Bellingham's immediate tactical execution?",
    options: [
      { id: "A", text: "Direct curl over wall to top-right corner", crowdVote: 64, odds: "+150 pts", correct: true },
      { id: "B", text: "Disguised slip pass to Vinícius Jr. on overlap", crowdVote: 28, odds: "+220 pts", correct: false },
      { id: "C", text: "Driven low strike targeting rebound", crowdVote: 8, odds: "+310 pts", correct: false }
    ],
    durationSeconds: 15,
    pointsReward: 250,
    opticalOutcomeExplanation: "Optical tracking confirms: 24.2m direct strike registered at 98.4 km/h with 0.22 xG trajectory into upper-right quadrant. Verified in 2.1s by Sportian Mediacoach."
  },
  {
    id: "tactix-02",
    minute: "79'",
    title: "1v1 Isolation: Lamine Yamal vs. Mendy",
    context: "Barcelona initiates quick wing isolation. Mediacoach data shows Yamal at 32.8 km/h sprint velocity with 78% take-on success today.",
    sponsor: "POWERED BY PUMA SPEED TELEMETRY",
    question: "How will the 1v1 duel resolve in the next 10 seconds?",
    options: [
      { id: "A", text: "Yamal cuts onto left foot and delivers far-post cross", crowdVote: 58, odds: "+180 pts", correct: true },
      { id: "B", text: "Mendy cleanly dispossesses and triggers counter", crowdVote: 31, odds: "+200 pts", correct: false },
      { id: "C", text: "Foul drawn inside the 18-yard box", crowdVote: 11, odds: "+350 pts", correct: false }
    ],
    durationSeconds: 15,
    pointsReward: 220,
    opticalOutcomeExplanation: "Optical telemetry: 1v1 won. Cross delivered into 6-yard box with 82 km/h entry speed. Resolution timestamp: 79:24."
  },
  {
    id: "tactix-03",
    minute: "84'",
    title: "High-Press Escape: Pressure Cooker 89%",
    context: "Barcelona traps Madrid in defensive third with 5 pressing players. Mediacoach Pressure Index spikes to 89%.",
    sponsor: "POWERED BY EA SPORTS FC TACTICAL LAB",
    question: "Will Real Madrid successfully break the press in 3 passes or less?",
    options: [
      { id: "A", text: "YES — Long diagonal release into open space", crowdVote: 52, odds: "+190 pts", correct: true },
      { id: "B", text: "NO — Barcelona forces turnover or defensive clearance", crowdVote: 48, odds: "+190 pts", correct: false }
    ],
    durationSeconds: 15,
    pointsReward: 200,
    opticalOutcomeExplanation: "Press bypassed via 42m diagonal pass from Valverde to Rodrygo. Ball traversed defensive lines in 2.3s."
  }
];

export const GLOBAL_PENAS = [
  {
    id: "pena-1",
    name: "Peña Madridista Tokyo",
    location: "Tokyo, Japan 🇯🇵",
    members: 1420,
    totalPoints: 184500,
    liveActive: 890,
    rank: 1,
    recentChant: "¡Hasta El Final! Vamos Real!",
    badgeColor: "#FF4B44"
  },
  {
    id: "pena-2",
    name: "Cairo Culés Supporters",
    location: "Cairo, Egypt 🇪🇬",
    members: 2180,
    totalPoints: 179200,
    liveActive: 1240,
    rank: 2,
    recentChant: "Força Barça! We fight until 90'!",
    badgeColor: "#004D98"
  },
  {
    id: "pena-3",
    name: "Peña LALIGA Dubai Hub",
    location: "Dubai, UAE 🇦🇪",
    members: 950,
    totalPoints: 165800,
    liveActive: 710,
    rank: 3,
    recentChant: "Live from Dubai FinTech Arena!",
    badgeColor: "#00F0FF"
  },
  {
    id: "pena-4",
    name: "Peña Blancos Bogotá",
    location: "Bogotá, Colombia 🇨🇴",
    members: 1320,
    totalPoints: 154100,
    liveActive: 820,
    rank: 4,
    recentChant: "¡Vamos con todo desde Colombia!",
    badgeColor: "#FFFFFF"
  },
  {
    id: "pena-5",
    name: "Barça Fanatics Singapore",
    location: "Singapore 🇸🇬",
    members: 810,
    totalPoints: 142900,
    liveActive: 540,
    rank: 5,
    recentChant: "Keep pressing high!",
    badgeColor: "#A50044"
  }
];

export const FAN_PROFILE = {
  name: "Zaid Al-Mansoor",
  handle: "@ZaidMadridista",
  location: "Dubai, UAE 🇦🇪",
  selectedPena: "Peña LALIGA Dubai Hub",
  tier: "Capitán de Peña",
  tierLevel: 3,
  pulseBalance: 3450,
  tacticalAccuracy: "78.4%",
  seasonRank: "Top 2% Worldwide",
  consecutiveMatches: 14,
  achievements: [
    { name: "ElClásico Tactician", icon: "⚔️", unlocked: true },
    { name: "Beyond Stats Decrypter", icon: "🧠", unlocked: true },
    { name: "Dubai FinTech Pioneer", icon: "🌐", unlocked: true },
    { name: "Stadium Geo-Pioneer", icon: "🏟️", unlocked: false }
  ]
};

export const REWARD_MARKETPLACE = [
  {
    id: "rew-1",
    title: "Official LALIGA Club Jersey (2025/26)",
    cost: 4500,
    category: "Physical Asset",
    partner: "Official LALIGA Store",
    available: 12,
    description: "Authentic customized home kit with official LALIGA sleeve badge."
  },
  {
    id: "rew-2",
    title: "1-Month LALIGA+ All-Access OTT Pass",
    cost: 1500,
    category: "Digital Subscription",
    partner: "LALIGA+",
    available: 150,
    description: "Multi-device HD streaming with synced tactical audio commentary."
  },
  {
    id: "rew-3",
    title: "Dubai FinTech Summit VIP Innovation Pass",
    cost: 3000,
    category: "Exclusive Experience",
    partner: "Dubai FinTech Summit & Ignyte",
    available: 5,
    description: "Exclusive access to the Innovation Stage & LALIGA Executive Lounge."
  },
  {
    id: "rew-4",
    title: "EA SPORTS FC 25 In-Game Custom Peña Kit",
    cost: 800,
    category: "Gaming Asset",
    partner: "EA SPORTS LALIGA",
    available: 1000,
    description: "Exclusive in-game badge and digital kit for Ultimate Team."
  }
];

export const LIVE_CHAT_STREAM = [
  { id: 1, user: "Kenji_TYO", pena: "Peña Tokyo 🇯🇵", text: "Bellingham is aiming top-right, look at his plant foot!", time: "74:02" },
  { id: 2, user: "Ahmed_DXB", pena: "Peña Dubai 🇦🇪", text: "Crowd consensus is 64% direct strike! Let's lock it in Peña Dubai!", time: "74:07" },
  { id: 3, user: "Tarek_CAI", pena: "Cairo Culés 🇪🇬", text: "Ter Stegen is stepping out slightly, watch out for the curl", time: "74:10" },
  { id: 4, user: "Mateo_BOG", pena: "Peña Bogotá 🇨🇴", text: "Locked in option A! 250 points on the line!", time: "74:13" }
];
