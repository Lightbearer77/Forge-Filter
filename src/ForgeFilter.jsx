import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0d0d0d;
    color: #c8b89a;
    font-family: 'Crimson Text', Georgia, serif;
  }

  .forge-app {
    min-height: 100vh;
    background: #0d0d0d;
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(120,40,10,0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(80,30,5,0.08) 0%, transparent 50%);
    padding: 24px 16px 60px;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;
  }

  .header-rune {
    font-size: 11px;
    letter-spacing: 6px;
    color: #6b4a2a;
    font-family: 'Cinzel', serif;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .header-title {
    font-family: 'Cinzel', serif;
    font-size: 28px;
    font-weight: 900;
    color: #e8d5b0;
    letter-spacing: 3px;
    text-transform: uppercase;
    line-height: 1.1;
  }

  .header-title span {
    color: #c0521a;
  }

  .header-sub {
    font-size: 14px;
    color: #6b5a42;
    margin-top: 10px;
    letter-spacing: 1px;
    font-style: italic;
  }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #4a2f15, transparent);
  }

  .divider-mark {
    color: #c0521a;
    font-size: 14px;
  }

  /* Tabs */
  .tabs {
    display: flex;
    gap: 4px;
    margin-bottom: 28px;
    background: #111;
    border: 1px solid #2a1a0a;
    border-radius: 4px;
    padding: 4px;
  }

  .tab {
    flex: 1;
    padding: 10px 8px;
    background: transparent;
    border: none;
    color: #6b5a42;
    font-family: 'Cinzel', serif;
    font-size: 11px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
  }

  .tab.active {
    background: #1e0e05;
    color: #c0521a;
    border: 1px solid #3a1f08;
  }

  .tab:hover:not(.active) {
    color: #a07050;
  }

  /* Candidate selector */
  .candidate-bar {
    display: flex;
    gap: 10px;
    margin-bottom: 24px;
    align-items: center;
  }

  .candidate-input {
    flex: 1;
    background: #111;
    border: 1px solid #2a1a0a;
    border-radius: 4px;
    padding: 10px 14px;
    color: #c8b89a;
    font-family: 'Crimson Text', serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s;
  }

  .candidate-input:focus {
    border-color: #5a2e0e;
  }

  .candidate-input::placeholder {
    color: #3d2a18;
  }

  .btn {
    background: #1a0d05;
    border: 1px solid #3a1f08;
    color: #c0521a;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 10px 16px;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .btn:hover {
    background: #2a1508;
    border-color: #c0521a;
  }

  .btn-danger {
    color: #8a2a1a;
    border-color: #2a1010;
  }

  .btn-danger:hover {
    background: #1a0808;
    border-color: #8a2a1a;
  }

  /* Candidate chips */
  .candidate-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 24px;
  }

  .candidate-chip {
    padding: 6px 12px;
    background: #111;
    border: 1px solid #2a1a0a;
    border-radius: 3px;
    font-family: 'Crimson Text', serif;
    font-size: 14px;
    color: #8a7060;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .candidate-chip.selected {
    background: #1a0e06;
    border-color: #c0521a;
    color: #c8b89a;
  }

  .chip-status {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3a2a18;
  }

  .chip-status.pass { background: #4a7a3a; }
  .chip-status.fail { background: #8a2a1a; }
  .chip-status.pending { background: #7a6030; }

  /* Stage cards */
  .stage-card {
    background: #111;
    border: 1px solid #1e1208;
    border-radius: 6px;
    margin-bottom: 20px;
    overflow: hidden;
  }

  .stage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: #140c04;
    border-bottom: 1px solid #1e1208;
    cursor: pointer;
  }

  .stage-title-group {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .stage-number {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    color: #c0521a;
    letter-spacing: 2px;
    border: 1px solid #3a1f08;
    padding: 3px 7px;
    border-radius: 2px;
  }

  .stage-name {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: #c8b89a;
    letter-spacing: 1px;
  }

  .stage-badge {
    font-size: 11px;
    font-family: 'Cinzel', serif;
    letter-spacing: 1px;
    padding: 3px 8px;
    border-radius: 2px;
  }

  .badge-pass { color: #4a9a3a; background: #0d1e0a; border: 1px solid #2a4a1a; }
  .badge-fail { color: #c0321a; background: #1e0a0a; border: 1px solid #4a1a1a; }
  .badge-pending { color: #9a8040; background: #1a1508; border: 1px solid #3a2e10; }
  .badge-disq { color: #c0321a; background: #1e0a0a; border: 1px solid #4a1a1a; }

  .stage-body {
    padding: 16px 18px;
  }

  /* Criteria items */
  .criteria-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #1a1006;
    cursor: pointer;
    transition: background 0.15s;
  }

  .criteria-item:last-child { border-bottom: none; }

  .criteria-item:hover { background: rgba(120,60,10,0.05); margin: 0 -18px; padding: 10px 18px; }

  .check-box {
    width: 18px;
    height: 18px;
    border: 1px solid #3a2510;
    border-radius: 2px;
    flex-shrink: 0;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .check-box.checked-pass {
    background: #0d1e0a;
    border-color: #3a6a2a;
  }

  .check-box.checked-fail {
    background: #1e0808;
    border-color: #6a1a1a;
  }

  .check-icon { font-size: 11px; }

  .criteria-text {
    font-size: 15px;
    color: #a09070;
    line-height: 1.5;
    flex: 1;
  }

  .criteria-text.checked-pass { color: #c8b89a; }
  .criteria-text.checked-fail { color: #6a4a3a; text-decoration: line-through; }

  .criteria-tag {
    font-size: 10px;
    font-family: 'Cinzel', serif;
    color: #6a4a2a;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  /* Disqualifier items */
  .disq-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #1a0808;
    cursor: pointer;
  }

  .disq-item:last-child { border-bottom: none; }

  .disq-box {
    width: 18px;
    height: 18px;
    border: 1px solid #4a1a0a;
    border-radius: 2px;
    flex-shrink: 0;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1a0806;
  }

  .disq-box.triggered {
    background: #2a0808;
    border-color: #8a1a1a;
  }

  .disq-text {
    font-size: 15px;
    color: #7a5a4a;
    line-height: 1.5;
  }

  .disq-text.triggered {
    color: #c03020;
    font-weight: 600;
  }

  /* Notes */
  .notes-area {
    width: 100%;
    background: #0d0a06;
    border: 1px solid #2a1a0a;
    border-radius: 3px;
    padding: 10px 12px;
    color: #a09070;
    font-family: 'Crimson Text', serif;
    font-size: 14px;
    resize: vertical;
    min-height: 80px;
    outline: none;
    margin-top: 12px;
  }

  .notes-area:focus { border-color: #4a2510; }
  .notes-label { font-size: 10px; font-family: 'Cinzel', serif; color: #4a3020; letter-spacing: 2px; text-transform: uppercase; margin-top: 16px; }

  /* Summary panel */
  .summary-panel {
    background: #111;
    border: 1px solid #1e1208;
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 24px;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    margin-top: 14px;
  }

  .summary-stat {
    text-align: center;
  }

  .stat-number {
    font-family: 'Cinzel', serif;
    font-size: 26px;
    font-weight: 900;
    color: #c0521a;
    line-height: 1;
  }

  .stat-label {
    font-size: 10px;
    font-family: 'Cinzel', serif;
    color: #4a3a28;
    letter-spacing: 1.5px;
    margin-top: 4px;
    text-transform: uppercase;
  }

  .verdict-bar {
    margin-top: 18px;
    padding: 14px 16px;
    border-radius: 4px;
    text-align: center;
  }

  .verdict-bar.disqualified { background: #1e0808; border: 1px solid #4a1010; }
  .verdict-bar.advance { background: #0d1e0a; border: 1px solid #2a4a1a; }
  .verdict-bar.hold { background: #1a1508; border: 1px solid #3a2e10; }
  .verdict-bar.insufficient { background: #141008; border: 1px solid #2a2010; }

  .verdict-text {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .verdict-bar.disqualified .verdict-text { color: #c0321a; }
  .verdict-bar.advance .verdict-text { color: #4a9a3a; }
  .verdict-bar.hold .verdict-text { color: #9a8040; }
  .verdict-bar.insufficient .verdict-text { color: #6a5a3a; }

  .verdict-sub { font-size: 13px; color: #6a5a42; margin-top: 4px; font-style: italic; }

  /* Pipeline view */
  .pipeline-stages {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pipeline-stage {
    background: #111;
    border: 1px solid #1e1208;
    border-radius: 6px;
    padding: 14px 18px;
  }

  .pipeline-stage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .pipeline-stage-title {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: #c0521a;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .pipeline-count {
    font-family: 'Cinzel', serif;
    font-size: 11px;
    color: #4a3a28;
    letter-spacing: 1px;
  }

  .pipeline-members {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .pipeline-member {
    font-size: 13px;
    color: #8a7060;
    background: #0d0a06;
    border: 1px solid #2a1a0a;
    border-radius: 3px;
    padding: 4px 10px;
  }

  .pipeline-empty {
    font-size: 13px;
    color: #3a2a18;
    font-style: italic;
  }

  /* Approach guide */
  .guide-section {
    background: #111;
    border: 1px solid #1e1208;
    border-radius: 6px;
    margin-bottom: 18px;
    overflow: hidden;
  }

  .guide-header {
    padding: 14px 18px;
    background: #140c04;
    border-bottom: 1px solid #1e1208;
  }

  .guide-title {
    font-family: 'Cinzel', serif;
    font-size: 13px;
    color: #c8b89a;
    letter-spacing: 1px;
  }

  .guide-body {
    padding: 16px 18px;
  }

  .guide-item {
    padding: 9px 0;
    border-bottom: 1px solid #1a1006;
    font-size: 15px;
    color: #9a8a6a;
    line-height: 1.5;
    display: flex;
    gap: 10px;
  }

  .guide-item:last-child { border-bottom: none; }

  .guide-bullet {
    color: #c0521a;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .section-label {
    font-family: 'Cinzel', serif;
    font-size: 10px;
    color: #4a3020;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 14px;
  }

  .stage-timeline {
    display: flex;
    gap: 0;
    margin-bottom: 24px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .timeline-step {
    flex: 1;
    min-width: 80px;
    text-align: center;
    position: relative;
  }

  .timeline-step::after {
    content: '';
    position: absolute;
    top: 12px;
    right: -1px;
    width: 50%;
    height: 1px;
    background: #2a1a0a;
  }

  .timeline-step::before {
    content: '';
    position: absolute;
    top: 12px;
    left: 0;
    width: 50%;
    height: 1px;
    background: #2a1a0a;
  }

  .timeline-step:first-child::before { display: none; }
  .timeline-step:last-child::after { display: none; }

  .timeline-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #1a0e06;
    border: 1px solid #3a2010;
    margin: 0 auto 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cinzel', serif;
    font-size: 10px;
    color: #6a4a2a;
    position: relative;
    z-index: 1;
  }

  .timeline-dot.active {
    background: #2a1005;
    border-color: #c0521a;
    color: #c0521a;
  }

  .timeline-label {
    font-size: 9px;
    font-family: 'Cinzel', serif;
    color: #4a3020;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    line-height: 1.3;
  }

  .toggle-btn {
    background: none;
    border: none;
    color: #4a3020;
    cursor: pointer;
    font-size: 12px;
    transition: color 0.2s;
  }

  .toggle-btn:hover { color: #c0521a; }
`;

const STAGES = [
  {
    id: "s1",
    number: "I",
    name: "Passive Observation",
    subtitle: "No announcement. No invitation.",
    criteria: [
      { id: "s1a", text: "Handles adversity without collapse or blame-shift", tag: "Character" },
      { id: "s1b", text: "Keeps word on small things — shows up, follows through", tag: "Reliability" },
      { id: "s1c", text: "Treats men below him with respect — no contempt tells", tag: "Character" },
      { id: "s1d", text: "Has a spine — doesn't bend to whoever is in the room", tag: "Frame" },
      { id: "s1e", text: "Has something he's building, mastering, or protecting", tag: "Purpose" },
      { id: "s1f", text: "Already lives close to Tactical Virtues without prompting", tag: "Values" },
    ],
  },
  {
    id: "s2",
    number: "II",
    name: "Warm Introduction",
    subtitle: "Low-stakes social contact. No pitch, no reveal.",
    criteria: [
      { id: "s2a", text: "Adds energy to a group — doesn't drain it", tag: "Social" },
      { id: "s2b", text: "Earns his place as a newcomer — doesn't expect it", tag: "Character" },
      { id: "s2c", text: "Shows genuine interest in men around him — not performing for status", tag: "Character" },
      { id: "s2d", text: "Reads the room — social calibration present", tag: "Intelligence" },
      { id: "s2e", text: "No unresolved friction with existing sworn members", tag: "Compatibility" },
    ],
  },
  {
    id: "s3",
    number: "III",
    name: "Deliberate Testing",
    subtitle: "Controlled friction. Real situations revealing real character.",
    criteria: [
      { id: "s3a", text: "Passes reliability test — followed through with real consequence", tag: "Reliability" },
      { id: "s3b", text: "Handles conflict well — fights fair, doesn't fold or escalate", tag: "Conflict" },
      { id: "s3c", text: "Passed loyalty probe — defended others honestly, not performatively", tag: "Loyalty" },
      { id: "s3d", text: "Values probe confirms alignment — family, kin, legacy, masculine role", tag: "Values" },
      { id: "s3e", text: "Carried himself well under edge experience — held shape when hard", tag: "Fortitude" },
    ],
  },
  {
    id: "s4",
    number: "IV",
    name: "Council Review",
    subtitle: "Unanimous consent required. One no = pause and investigate.",
    criteria: [
      { id: "s4a", text: "Every sworn member trusts him with something real", tag: "Trust" },
      { id: "s4b", text: "No member has unresolved grievance — or grievance is resolved on record", tag: "Standing" },
      { id: "s4c", text: "Longhouse alignment reads as genuine — not surface performance", tag: "Alignment" },
      { id: "s4d", text: "Brings defined functional value to the tribe", tag: "Role" },
      { id: "s4e", text: "Financially self-reliant or on clear, credible trajectory", tag: "Provision" },
    ],
  },
];

const DISQUALIFIERS = [
  { id: "d1", text: "Disloyalty to a sworn brother — even once, even small" },
  { id: "d2", text: "Lying to the council" },
  { id: "d3", text: "Consistent dishonesty in daily life" },
  { id: "d4", text: "Pattern of blaming others — no self-accountability demonstrated" },
  { id: "d5", text: "No loyalty demonstrated to anyone across extended observation" },
  { id: "d6", text: "Active contempt for masculine structure or hierarchy" },
  { id: "d7", text: "Ideological hostility to tradition, kin bonds, or legacy orientation" },
  { id: "d8", text: "Heavy debt to chaos — addiction, unowned legal trouble, chronic drama" },
  { id: "d9", text: "Weaponizing legal or social systems against a member or their kin" },
  { id: "d10", text: "Sowing discord without direct confrontation — covert fracture behavior" },
];

const APPROACH_VENUES = [
  { venue: "Competitive sports leagues", note: "Men under pressure reveal character fast. Flag those who lose well and win without gloating." },
  { venue: "Firearms and tactical training", note: "Self-selects for sovereignty mindset. Shared edge experience built in." },
  { venue: "Trades, craft, and manual skill communities", note: "Men who build things tend to be men with stakes and pride in mastery." },
  { venue: "Hunting and outdoor culture", note: "Patience, self-reliance, kin-orientation already present." },
  { venue: "Martial arts gyms", note: "Sustained commitment and ego-management visible immediately." },
  { venue: "Heritage and ancestral culture events", note: "Direct alignment signal. Self-selecting pool for Asatru / traditional framework." },
  { venue: "Faith-adjacent or men's group spaces", note: "Pre-existing orientation toward brotherhood and shared code." },
  { venue: "Existing extended network", note: "Warm-contact expansion. Friends-of-squad are Stage 1 already without effort." },
];

const APPROACH_RULES = [
  "Never pitch the Longhouse directly. You are scouting, not recruiting.",
  "Invite to something low-commitment first — an activity, not a meeting.",
  "Your behavior at every gathering is a live advertisement for the standard you hold.",
  "One bad fit inside the perimeter costs more than five missed good candidates. Slow is safe.",
  "The 90-day minimum is non-negotiable. Pattern, not performance, is what you're reading.",
  "Unanimous council consent means unanimous — not a majority and a reluctant yes.",
];


const WIFE_TIERS = [
  {
    id: "t1",
    tier: "TIER 1",
    name: "Hard Filters",
    subtitle: "Pass/fail. One failure = exit. No exceptions.",
    color: "#c0321a",
    criteria: [
      { id: "w1a", text: "Wants children — actively, not 'someday maybe'", tag: "Biological" },
      { id: "w1b", text: "No serious unresolved fertility issues", tag: "Biological" },
      { id: "w1c", text: "Not currently married or in serious entanglement", tag: "Character" },
      { id: "w1d", text: "No pattern of male-hopping or serial short relationships", tag: "Character" },
      { id: "w1e", text: "No history of false accusations or weaponizing legal systems against men", tag: "Character" },
      { id: "w1f", text: "No addictions — substances, attention-seeking, social media performance", tag: "Character" },
      { id: "w1g", text: "Does not require external validation to feel stable", tag: "Character" },
      { id: "w1h", text: "Comfortable with masculine leadership — not performing submission, not fighting it", tag: "Orientation" },
      { id: "w1i", text: "Does not believe men are inherently oppressive or broken", tag: "Orientation" },
      { id: "w1j", text: "Not completely estranged from her own family without legitimate reason", tag: "Family" },
    ]
  },
  {
    id: "t2",
    tier: "TIER 2",
    name: "High-Weight Traits",
    subtitle: "Multiple weak scores here = wrong woman for the Longhouse.",
    color: "#9a6020",
    criteria: [
      { id: "w2a", text: "Respects tradition, lineage, and the idea that culture is worth preserving", tag: "Values" },
      { id: "w2b", text: "Has some spiritual or transcendent framework — not flatly materialist", tag: "Values" },
      { id: "w2c", text: "Believes a family has a shape — roles, structure, not just two people bumping around", tag: "Values" },
      { id: "w2d", text: "Emotionally regulated — can sit with discomfort without detonating", tag: "Temperament" },
      { id: "w2e", text: "Low drama baseline — conflict handled directly, not through manipulation", tag: "Temperament" },
      { id: "w2f", text: "Loyal under pressure — holds shape when things get hard", tag: "Temperament" },
      { id: "w2g", text: "Can run a household — or clearly capable of learning and willing to", tag: "Practical" },
      { id: "w2h", text: "Has a relationship with physical work, food, nourishment — not afraid of a kitchen", tag: "Practical" },
      { id: "w2i", text: "Not purely career-identity driven to the point that family becomes secondary", tag: "Practical" },
      { id: "w2j", text: "Can navigate group dynamics without fracturing them", tag: "Social" },
      { id: "w2k", text: "Respects the male space — doesn't need to colonize or compete with it", tag: "Social" },
    ]
  },
  {
    id: "t3",
    tier: "TIER 3",
    name: "Longhouse Fit",
    subtitle: "Longer-read signals. Emerge through time and small tests.",
    color: "#7a8040",
    criteria: [
      { id: "w3a", text: "Talks about her children's future, not just her own ambitions", tag: "Legacy" },
      { id: "w3b", text: "Has thought about what she wants to pass down — values, skills, culture", tag: "Legacy" },
      { id: "w3c", text: "Responds positively or curiously to intentional community and kin networks", tag: "Legacy" },
      { id: "w3d", text: "Integrates into a group — doesn't fragment it", tag: "Tribal" },
      { id: "w3e", text: "Supports your relationships with your brothers — doesn't compete for your bandwidth", tag: "Tribal" },
      { id: "w3f", text: "Would this woman take a vow seriously? Treats commitments as binding, not provisional", tag: "Oath" },
      { id: "w3g", text: "How does she talk about her past promises? Past relationships?", tag: "Oath" },
    ]
  },
  {
    id: "t4",
    tier: "TIER 4",
    name: "Green Flags",
    subtitle: "Additive value. Signals you are dealing with rare material.",
    color: "#4a8a6a",
    criteria: [
      { id: "w4a", text: "Values natural living, real food, physical health as a way of life — not a trend", tag: "Lifestyle" },
      { id: "w4b", text: "Has a skill set with genuine practical value — medical, agricultural, culinary, craft", tag: "Skill" },
      { id: "w4c", text: "Has a close female friend who is also high-character — can vet and be vetted", tag: "Character" },
      { id: "w4d", text: "Has worked through something hard and come out more grounded, not more fragile", tag: "Fortitude" },
      { id: "w4e", text: "Responds to your intensity and vision with curiosity rather than anxiety", tag: "Fit" },
      { id: "w4f", text: "Has some relationship with ancestral identity, heritage, or rootedness", tag: "Heritage" },
    ]
  }
];

const WIFE_DISQUALIFIERS = [
  { id: "wd1", text: "Active feminist ideology — men are oppressive, hierarchy is violence" },
  { id: "wd2", text: "History of false accusations or legal weaponization against men" },
  { id: "wd3", text: "Children from multiple fathers with no stable structure" },
  { id: "wd4", text: "Addicted to external validation — social media follower count as identity" },
  { id: "wd5", text: "Refuses any discussion of traditional roles or family structure" },
  { id: "wd6", text: "Completely estranged from family with no legitimate reason" },
  { id: "wd7", text: "Cannot handle mild friction without detonating or withdrawing" },
  { id: "wd8", text: "Treats your brotherhood as a threat to your relationship with her" },
];

const CONQUEST_FILTER = [
  "Am I acting from frame or thirst?",
  "Would the man who already owns his Longhouse do this?",
  "Is this woman a net gain to the fortress or a risk?",
];

function getStageStatus(checks, stageId) {
  const stage = STAGES.find(s => s.id === stageId);
  if (!stage) return "pending";
  const total = stage.criteria.length;
  const passed = stage.criteria.filter(c => checks[c.id] === "pass").length;
  const failed = stage.criteria.filter(c => checks[c.id] === "fail").length;
  if (failed > 0) return "fail";
  if (passed === total) return "pass";
  if (passed > 0) return "pending";
  return "pending";
}

function getDisqTriggered(disqs) {
  return DISQUALIFIERS.some(d => disqs[d.id]);
}

function getVerdict(checks, disqs, candidateName) {
  if (!candidateName) return null;
  const disqTriggered = getDisqTriggered(disqs);
  if (disqTriggered) return { type: "disqualified", text: "Disqualified", sub: "Hard disqualifier triggered. Exit the candidacy." };

  const s4Status = getStageStatus(checks, "s4");
  const s3Status = getStageStatus(checks, "s3");
  const s2Status = getStageStatus(checks, "s2");
  const s1Status = getStageStatus(checks, "s1");

  const allPassed = [s1Status, s2Status, s3Status, s4Status].every(s => s === "pass");
  if (allPassed) return { type: "advance", text: "Recommend Oath Invitation", sub: "All stages passed. Council consent confirmed. Proceed to probation oath." };

  const anyFailed = [s1Status, s2Status, s3Status, s4Status].some(s => s === "fail");
  if (anyFailed) return { type: "hold", text: "Hold — Investigate Failure", sub: "One or more stage failures. Do not advance. Revisit or exit." };

  const anyChecked = Object.keys(checks).length > 0;
  if (!anyChecked) return { type: "insufficient", text: "Observation in Progress", sub: "No scores recorded. Continue Stage I observation." };

  return { type: "hold", text: "In Progress", sub: "Continue working through stages. Do not advance prematurely." };
}

const initialCandidate = () => ({
  name: "",
  checks: {},
  disqs: {},
  notes: {},
  stage: "s1",
  collapsed: { s1: false, s2: false, s3: false, s4: false, disq: false }
});

export default function ForgeFilter() {
  const [activeTab, setActiveTab] = useState("score");
  const [candidates, setCandidates] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [newName, setNewName] = useState("");
  const [wifeCandidates, setWifeCandidates] = useState([]);
  const [selectedWifeIdx, setSelectedWifeIdx] = useState(null);
  const [newWifeName, setNewWifeName] = useState("");

  const addCandidate = () => {
    if (!newName.trim()) return;
    setCandidates(prev => [...prev, { ...initialCandidate(), name: newName.trim() }]);
    setSelectedIdx(candidates.length);
    setNewName("");
  };

  const removeCandidate = (idx) => {
    setCandidates(prev => prev.filter((_, i) => i !== idx));
    setSelectedIdx(null);
  };

  const updateCandidate = (fn) => {
    setCandidates(prev => prev.map((c, i) => i === selectedIdx ? fn(c) : c));
  };

  const toggleCheck = (criteriaId) => {
    updateCandidate(c => {
      const current = c.checks[criteriaId];
      const next = current === "pass" ? "fail" : current === "fail" ? undefined : "pass";
      const checks = { ...c.checks };
      if (next === undefined) delete checks[criteriaId];
      else checks[criteriaId] = next;
      return { ...c, checks };
    });
  };

  const toggleDisq = (disqId) => {
    updateCandidate(c => ({
      ...c,
      disqs: { ...c.disqs, [disqId]: !c.disqs[disqId] }
    }));
  };

  const setNote = (section, value) => {
    updateCandidate(c => ({ ...c, notes: { ...c.notes, [section]: value } }));
  };

  const toggleCollapse = (section) => {
    updateCandidate(c => ({
      ...c,
      collapsed: { ...c.collapsed, [section]: !c.collapsed[section] }
    }));
  };

  const selectedWife = selectedWifeIdx !== null ? wifeCandidates[selectedWifeIdx] : null;

  const initialWife = (name) => ({ name, checks: {}, disqs: {}, notes: {}, conquest: {}, collapsed: {} });

  const addWifeCandidate = () => {
    if (!newWifeName.trim()) return;
    setWifeCandidates(prev => [...prev, initialWife(newWifeName.trim())]);
    setSelectedWifeIdx(wifeCandidates.length);
    setNewWifeName("");
  };

  const removeWifeCandidate = (idx) => { setWifeCandidates(prev => prev.filter((_, i) => i !== idx)); setSelectedWifeIdx(null); };

  const updateWife = (fn) => { setWifeCandidates(prev => prev.map((c, i) => i === selectedWifeIdx ? fn(c) : c)); };

  const toggleWifeCheck = (id) => {
    updateWife(c => {
      const cur = c.checks[id];
      const next = cur === "pass" ? "fail" : cur === "fail" ? undefined : "pass";
      const checks = { ...c.checks };
      if (next === undefined) delete checks[id]; else checks[id] = next;
      return { ...c, checks };
    });
  };

  const toggleWifeDisq = (id) => { updateWife(c => ({ ...c, disqs: { ...c.disqs, [id]: !c.disqs[id] } })); };
  const setWifeNote = (section, val) => { updateWife(c => ({ ...c, notes: { ...c.notes, [section]: val } })); };
  const toggleWifeCollapse = (section) => { updateWife(c => ({ ...c, collapsed: { ...c.collapsed, [section]: !c.collapsed?.[section] } })); };
  const toggleWifeConquest = (i) => {
    updateWife(c => {
      const cur = c.conquest?.[i];
      const next = cur === true ? false : cur === false ? undefined : true;
      const conquest = { ...c.conquest };
      if (next === undefined) delete conquest[i]; else conquest[i] = next;
      return { ...c, conquest };
    });
  };

  const getWifeStatus = (c) => {
    if (WIFE_DISQUALIFIERS.some(d => c.disqs[d.id])) return "fail";
    const t1fails = WIFE_TIERS[0].criteria.filter(cr => c.checks[cr.id] === "fail").length;
    if (t1fails > 0) return "fail";
    const anyPass = WIFE_TIERS.some(t => t.criteria.some(cr => c.checks[cr.id] === "pass"));
    return anyPass ? "pass" : "pending";
  };

  const getWifeVerdict = (c) => {
    if (WIFE_DISQUALIFIERS.some(d => c.disqs[d.id])) return "✗";
    const t1fails = WIFE_TIERS[0].criteria.filter(cr => c.checks[cr.id] === "fail").length;
    if (t1fails > 0) return "✗";
    const total = WIFE_TIERS.reduce((acc, t) => acc + t.criteria.filter(cr => c.checks[cr.id] === "pass").length, 0);
    if (total > 15) return "✓";
    return "—";
  };

  const selected = selectedIdx !== null ? candidates[selectedIdx] : null;

  const getCandidateChipStatus = (c) => {
    if (getDisqTriggered(c.disqs)) return "fail";
    const anyPass = STAGES.some(s => getStageStatus(c.checks, s.id) === "pass");
    const anyFail = STAGES.some(s => getStageStatus(c.checks, s.id) === "fail");
    if (anyFail) return "fail";
    if (anyPass) return "pass";
    return "pending";
  };

  const pipelineData = STAGES.map(stage => ({
    ...stage,
    members: candidates.filter(c => {
      if (getDisqTriggered(c.disqs)) return false;
      const prevsPassed = STAGES.slice(0, STAGES.indexOf(stage)).every(prev =>
        getStageStatus(c.checks, prev.id) === "pass"
      );
      const thisPending = getStageStatus(c.checks, stage.id) !== "pass";
      return prevsPassed && thisPending && c.name;
    })
  }));

  const totalPassed = candidates.filter(c => {
    const v = getVerdict(c.checks, c.disqs, c.name);
    return v && v.type === "advance";
  }).length;

  const totalDisq = candidates.filter(c => getDisqTriggered(c.disqs)).length;

  return (
    <>
      <style>{styles}</style>
      <div className="forge-app">
        <div className="header">
          <div className="header-rune">◈ Longhouse Tribal Forge ◈</div>
          <div className="header-title">The <span>Forge</span> Filter</div>
          <div className="header-sub">Male Candidate Vetting System — Phases I–IV</div>
        </div>

        <div className="divider">
          <div className="divider-line"></div>
          <div className="divider-mark">⚔</div>
          <div className="divider-line"></div>
        </div>

        <div className="tabs">
          {[["score","Score Candidate"],["pipeline","Pipeline"],["wife","Wife Vetting"],["approach","Approach Guide"]].map(([id, label]) => (
            <button key={id} className={`tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>{label}</button>
          ))}
        </div>

        {/* SCORE TAB */}
        {activeTab === "score" && (
          <>
            <div className="candidate-bar">
              <input
                className="candidate-input"
                placeholder="Enter candidate name..."
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addCandidate()}
              />
              <button className="btn" onClick={addCandidate}>+ Add</button>
            </div>

            {candidates.length > 0 && (
              <div className="candidate-list">
                {candidates.map((c, i) => (
                  <div key={i} className={`candidate-chip ${selectedIdx === i ? "selected" : ""}`} onClick={() => setSelectedIdx(i)}>
                    <div className={`chip-status ${getCandidateChipStatus(c)}`}></div>
                    {c.name}
                  </div>
                ))}
              </div>
            )}

            {!selected && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#3a2a18" }}>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: "13px", letterSpacing: "2px" }}>ADD A CANDIDATE TO BEGIN SCORING</div>
              </div>
            )}

            {selected && (
              <>
                {/* Summary */}
                <div className="summary-panel">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontFamily: "Cinzel, serif", fontSize: "16px", color: "#c8b89a", letterSpacing: "1px" }}>{selected.name}</div>
                      <div style={{ fontSize: "12px", color: "#4a3a28", marginTop: "2px", fontStyle: "italic" }}>Candidate Record</div>
                    </div>
                    <button className="btn btn-danger" onClick={() => removeCandidate(selectedIdx)}>Remove</button>
                  </div>

                  <div className="summary-grid">
                    <div className="summary-stat">
                      <div className="stat-number">{STAGES.filter(s => getStageStatus(selected.checks, s.id) === "pass").length}<span style={{ fontSize: "14px", color: "#6a4a2a" }}>/4</span></div>
                      <div className="stat-label">Stages Passed</div>
                    </div>
                    <div className="summary-stat">
                      <div className="stat-number" style={{ color: getDisqTriggered(selected.disqs) ? "#c0321a" : "#3a2a18" }}>
                        {DISQUALIFIERS.filter(d => selected.disqs[d.id]).length}
                      </div>
                      <div className="stat-label">Disq. Triggered</div>
                    </div>
                    <div className="summary-stat">
                      <div className="stat-number" style={{ fontSize: "18px", marginTop: "4px" }}>
                        {(() => { const v = getVerdict(selected.checks, selected.disqs, selected.name); return v ? (v.type === "advance" ? "✓" : v.type === "disqualified" ? "✗" : "—") : "—"; })()}
                      </div>
                      <div className="stat-label">Verdict</div>
                    </div>
                  </div>

                  {(() => {
                    const v = getVerdict(selected.checks, selected.disqs, selected.name);
                    if (!v) return null;
                    return (
                      <div className={`verdict-bar ${v.type}`}>
                        <div className="verdict-text">{v.text}</div>
                        <div className="verdict-sub">{v.sub}</div>
                      </div>
                    );
                  })()}
                </div>

                {/* Stage cards */}
                {STAGES.map(stage => {
                  const status = getStageStatus(selected.checks, stage.id);
                  const collapsed = selected.collapsed[stage.id];
                  return (
                    <div className="stage-card" key={stage.id}>
                      <div className="stage-header" onClick={() => toggleCollapse(stage.id)}>
                        <div className="stage-title-group">
                          <div className="stage-number">STAGE {stage.number}</div>
                          <div>
                            <div className="stage-name">{stage.name}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                          <span className={`stage-badge badge-${status}`}>
                            {status === "pass" ? "PASS" : status === "fail" ? "FAIL" : "PENDING"}
                          </span>
                          <button className="toggle-btn">{collapsed ? "▼" : "▲"}</button>
                        </div>
                      </div>

                      {!collapsed && (
                        <div className="stage-body">
                          <div style={{ fontSize: "13px", color: "#4a3a28", fontStyle: "italic", marginBottom: "12px" }}>{stage.subtitle}</div>
                          {stage.criteria.map(c => {
                            const val = selected.checks[c.id];
                            return (
                              <div key={c.id} className="criteria-item" onClick={() => toggleCheck(c.id)}>
                                <div className={`check-box ${val === "pass" ? "checked-pass" : val === "fail" ? "checked-fail" : ""}`}>
                                  {val === "pass" && <span className="check-icon" style={{ color: "#4a9a3a" }}>✓</span>}
                                  {val === "fail" && <span className="check-icon" style={{ color: "#c03020" }}>✗</span>}
                                </div>
                                <div>
                                  <div className={`criteria-text ${val === "pass" ? "checked-pass" : val === "fail" ? "checked-fail" : ""}`}>{c.text}</div>
                                  <div className="criteria-tag">#{c.tag}</div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="notes-label">Field Notes — {stage.name}</div>
                          <textarea
                            className="notes-area"
                            placeholder="Observations, specific incidents, dates..."
                            value={selected.notes[stage.id] || ""}
                            onChange={e => setNote(stage.id, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Disqualifiers */}
                <div className="stage-card">
                  <div className="stage-header" onClick={() => toggleCollapse("disq")} style={{ borderBottom: getDisqTriggered(selected.disqs) ? "1px solid #4a1010" : "1px solid #1e1208" }}>
                    <div className="stage-title-group">
                      <div className="stage-number" style={{ color: "#8a2a1a", borderColor: "#3a1010" }}>⚠</div>
                      <div className="stage-name">Hard Disqualifiers</div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      {getDisqTriggered(selected.disqs) && <span className="stage-badge badge-disq">DISQUALIFIED</span>}
                      <button className="toggle-btn">{selected.collapsed["disq"] ? "▼" : "▲"}</button>
                    </div>
                  </div>

                  {!selected.collapsed["disq"] && (
                    <div className="stage-body">
                      <div style={{ fontSize: "13px", color: "#4a3a28", fontStyle: "italic", marginBottom: "12px" }}>Any single trigger ends candidacy immediately — any stage, any time.</div>
                      {DISQUALIFIERS.map(d => (
                        <div key={d.id} className="disq-item" onClick={() => toggleDisq(d.id)}>
                          <div className={`disq-box ${selected.disqs[d.id] ? "triggered" : ""}`}>
                            {selected.disqs[d.id] && <span style={{ color: "#c03020", fontSize: "11px" }}>✗</span>}
                          </div>
                          <div className={`disq-text ${selected.disqs[d.id] ? "triggered" : ""}`}>{d.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Overall notes */}
                <div style={{ marginTop: "20px" }}>
                  <div className="notes-label">Master Record — {selected.name}</div>
                  <textarea
                    className="notes-area"
                    style={{ minHeight: "100px" }}
                    placeholder="Summary assessment, council discussion notes, probation record..."
                    value={selected.notes["master"] || ""}
                    onChange={e => setNote("master", e.target.value)}
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* PIPELINE TAB */}
        {activeTab === "pipeline" && (
          <>
            <div className="summary-panel">
              <div className="section-label">Forge Overview</div>
              <div className="summary-grid">
                <div className="summary-stat">
                  <div className="stat-number">{candidates.length}</div>
                  <div className="stat-label">Total Candidates</div>
                </div>
                <div className="summary-stat">
                  <div className="stat-number" style={{ color: "#4a9a3a" }}>{totalPassed}</div>
                  <div className="stat-label">Oath-Ready</div>
                </div>
                <div className="summary-stat">
                  <div className="stat-number" style={{ color: "#c0321a" }}>{totalDisq}</div>
                  <div className="stat-label">Disqualified</div>
                </div>
              </div>
            </div>

            <div className="section-label">Stage Pipeline</div>
            <div className="pipeline-stages">
              {STAGES.map(stage => {
                const members = candidates.filter(c => {
                  if (!c.name) return false;
                  if (getDisqTriggered(c.disqs)) return false;
                  const idx = STAGES.indexOf(stage);
                  const prevsPassed = STAGES.slice(0, idx).every(prev => getStageStatus(c.checks, prev.id) === "pass");
                  const thisStatus = getStageStatus(c.checks, stage.id);
                  return prevsPassed && thisStatus !== "pass";
                });

                return (
                  <div key={stage.id} className="pipeline-stage">
                    <div className="pipeline-stage-header">
                      <div className="pipeline-stage-title">Stage {stage.number} — {stage.name}</div>
                      <div className="pipeline-count">{members.length} candidate{members.length !== 1 ? "s" : ""}</div>
                    </div>
                    <div className="pipeline-members">
                      {members.length === 0
                        ? <div className="pipeline-empty">No candidates at this stage</div>
                        : members.map((m, i) => <div key={i} className="pipeline-member">{m.name}</div>)
                      }
                    </div>
                  </div>
                );
              })}

              {/* Sworn */}
              <div className="pipeline-stage" style={{ borderColor: "#1a3a10" }}>
                <div className="pipeline-stage-header">
                  <div className="pipeline-stage-title" style={{ color: "#4a9a3a" }}>⚔ Oath-Ready</div>
                  <div className="pipeline-count">{totalPassed} candidate{totalPassed !== 1 ? "s" : ""}</div>
                </div>
                <div className="pipeline-members">
                  {totalPassed === 0
                    ? <div className="pipeline-empty">None yet — the Forge takes time</div>
                    : candidates.filter(c => getVerdict(c.checks, c.disqs, c.name)?.type === "advance")
                        .map((m, i) => <div key={i} className="pipeline-member" style={{ borderColor: "#2a4a1a", color: "#6a9a5a" }}>{m.name}</div>)
                  }
                </div>
              </div>

              {/* Disq */}
              {totalDisq > 0 && (
                <div className="pipeline-stage" style={{ borderColor: "#3a1010" }}>
                  <div className="pipeline-stage-header">
                    <div className="pipeline-stage-title" style={{ color: "#c0321a" }}>✗ Disqualified</div>
                    <div className="pipeline-count">{totalDisq}</div>
                  </div>
                  <div className="pipeline-members">
                    {candidates.filter(c => getDisqTriggered(c.disqs))
                      .map((m, i) => <div key={i} className="pipeline-member" style={{ borderColor: "#3a1010", color: "#6a3a3a" }}>{m.name}</div>)
                    }
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* APPROACH TAB */}

        {activeTab === "wife" && (
          <>
            <div className="summary-panel">
              <div className="section-label">Active Candidates</div>
              <div className="candidate-bar">
                <input className="candidate-input" placeholder="Enter candidate name..." value={newWifeName} onChange={e => setNewWifeName(e.target.value)} onKeyDown={e => e.key === "Enter" && addWifeCandidate()} />
                <button className="btn" onClick={addWifeCandidate}>+ Add</button>
              </div>
              {wifeCandidates.length > 0 && (
                <div className="candidate-list">
                  {wifeCandidates.map((c, i) => (
                    <div key={i} className={`candidate-chip ${selectedWifeIdx === i ? "selected" : ""}`} onClick={() => setSelectedWifeIdx(i)}>
                      <div className={`chip-status ${getWifeStatus(c)}`}></div>
                      {c.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!selectedWife && (
              <div style={{textAlign:"center",padding:"40px 0",color:"#3a2a18"}}>
                <div style={{fontFamily:"Cinzel, serif",fontSize:"13px",letterSpacing:"2px"}}>ADD A CANDIDATE TO BEGIN VETTING</div>
              </div>
            )}

            {selectedWife && (
              <>
                <div className="summary-panel">
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div>
                      <div style={{fontFamily:"Cinzel, serif",fontSize:"16px",color:"#c8b89a",letterSpacing:"1px"}}>{selectedWife.name}</div>
                      <div style={{fontSize:"12px",color:"#4a3a28",marginTop:"2px",fontStyle:"italic"}}>Vetting Record</div>
                    </div>
                    <button className="btn btn-danger" onClick={() => removeWifeCandidate(selectedWifeIdx)}>Remove</button>
                  </div>
                  <div className="summary-grid">
                    <div className="summary-stat">
                      <div className="stat-number">{WIFE_TIERS.reduce((acc, t) => acc + t.criteria.filter(c => selectedWife.checks[c.id] === "pass").length, 0)}</div>
                      <div className="stat-label">Green Checks</div>
                    </div>
                    <div className="summary-stat">
                      <div className="stat-number" style={{color:"#c0321a"}}>{WIFE_DISQUALIFIERS.filter(d => selectedWife.disqs[d.id]).length}</div>
                      <div className="stat-label">Disq. Triggered</div>
                    </div>
                    <div className="summary-stat">
                      <div className="stat-number" style={{fontSize:"16px",marginTop:"4px"}}>{getWifeVerdict(selectedWife)}</div>
                      <div className="stat-label">Verdict</div>
                    </div>
                  </div>
                </div>

                {/* Conquest Filter */}
                <div className="stage-card">
                  <div className="stage-header" onClick={() => toggleWifeCollapse("conquest")}>
                    <div className="stage-title-group">
                      <div className="stage-number" style={{color:"#c0521a"}}>⚡</div>
                      <div className="stage-name">Conquest Filter</div>
                    </div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                      <div style={{fontSize:"11px",fontFamily:"Cinzel, serif",color:"#4a3a28",letterSpacing:"1px"}}>RUN BEFORE ANY ESCALATION</div>
                      <button className="toggle-btn">{selectedWife.collapsed?.conquest ? "▼" : "▲"}</button>
                    </div>
                  </div>
                  {!selectedWife.collapsed?.conquest && (
                    <div className="stage-body">
                      {CONQUEST_FILTER.map((q, i) => (
                        <div key={i} className="criteria-item" onClick={() => toggleWifeConquest(i)}>
                          <div className={`check-box ${selectedWife.conquest?.[i] === true ? "checked-pass" : selectedWife.conquest?.[i] === false ? "checked-fail" : ""}`}>
                            {selectedWife.conquest?.[i] === true && <span className="check-icon" style={{color:"#4a9a3a"}}>✓</span>}
                            {selectedWife.conquest?.[i] === false && <span className="check-icon" style={{color:"#c03020"}}>✗</span>}
                          </div>
                          <div className="criteria-text">{q}</div>
                        </div>
                      ))}
                      <div style={{fontSize:"13px",color:"#6a4a2a",fontStyle:"italic",marginTop:"12px"}}>If any answer is shaky — stop. Reset. Proceed only from clarity.</div>
                    </div>
                  )}
                </div>

                {/* Tier cards */}
                {WIFE_TIERS.map(tier => {
                  const passed = tier.criteria.filter(c => selectedWife.checks[c.id] === "pass").length;
                  const failed = tier.criteria.filter(c => selectedWife.checks[c.id] === "fail").length;
                  const collapsed = selectedWife.collapsed?.[tier.id];
                  return (
                    <div className="stage-card" key={tier.id}>
                      <div className="stage-header" onClick={() => toggleWifeCollapse(tier.id)}>
                        <div className="stage-title-group">
                          <div className="stage-number" style={{color: tier.color, borderColor: tier.color + "44"}}>{tier.tier}</div>
                          <div>
                            <div className="stage-name">{tier.name}</div>
                          </div>
                        </div>
                        <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                          <span style={{fontSize:"11px",fontFamily:"Cinzel, serif",color:"#4a3a28"}}>{passed}/{tier.criteria.length}</span>
                          {failed > 0 && tier.id === "t1" && <span className="stage-badge badge-fail">FAIL</span>}
                          <button className="toggle-btn">{collapsed ? "▼" : "▲"}</button>
                        </div>
                      </div>
                      {!collapsed && (
                        <div className="stage-body">
                          <div style={{fontSize:"13px",color:"#4a3a28",fontStyle:"italic",marginBottom:"12px"}}>{tier.subtitle}</div>
                          {tier.criteria.map(c => {
                            const val = selectedWife.checks[c.id];
                            return (
                              <div key={c.id} className="criteria-item" onClick={() => toggleWifeCheck(c.id)}>
                                <div className={`check-box ${val === "pass" ? "checked-pass" : val === "fail" ? "checked-fail" : ""}`}>
                                  {val === "pass" && <span className="check-icon" style={{color:"#4a9a3a"}}>✓</span>}
                                  {val === "fail" && <span className="check-icon" style={{color:"#c03020"}}>✗</span>}
                                </div>
                                <div>
                                  <div className={`criteria-text ${val === "pass" ? "checked-pass" : val === "fail" ? "checked-fail" : ""}`}
                                    style={{textDecoration: val === "fail" ? "line-through" : "none"}}>
                                    {c.text}
                                  </div>
                                  <div className="criteria-tag">#{c.tag}</div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="notes-label">Field Notes — {tier.name}</div>
                          <textarea className="notes-area" placeholder="Observations, dates, specific incidents..." value={selectedWife.notes?.[tier.id] || ""} onChange={e => setWifeNote(tier.id, e.target.value)} />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Disqualifiers */}
                <div className="stage-card">
                  <div className="stage-header" onClick={() => toggleWifeCollapse("disq")} style={{borderBottom: WIFE_DISQUALIFIERS.some(d => selectedWife.disqs[d.id]) ? "1px solid #4a1010" : "1px solid #1e1208"}}>
                    <div className="stage-title-group">
                      <div className="stage-number" style={{color:"#8a2a1a",borderColor:"#3a1010"}}>⚠</div>
                      <div className="stage-name">Hard Disqualifiers</div>
                    </div>
                    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                      {WIFE_DISQUALIFIERS.some(d => selectedWife.disqs[d.id]) && <span className="stage-badge badge-disq">DISQUALIFIED</span>}
                      <button className="toggle-btn">{selectedWife.collapsed?.disq ? "▼" : "▲"}</button>
                    </div>
                  </div>
                  {!selectedWife.collapsed?.disq && (
                    <div className="stage-body">
                      <div style={{fontSize:"13px",color:"#4a3a28",fontStyle:"italic",marginBottom:"12px"}}>Any single trigger ends candidacy immediately.</div>
                      {WIFE_DISQUALIFIERS.map(d => (
                        <div key={d.id} className="disq-item" onClick={() => toggleWifeDisq(d.id)}>
                          <div className={`disq-box ${selectedWife.disqs[d.id] ? "triggered" : ""}`}>
                            {selectedWife.disqs[d.id] && <span style={{color:"#c03020",fontSize:"11px"}}>✗</span>}
                          </div>
                          <div className={`disq-text ${selectedWife.disqs[d.id] ? "triggered" : ""}`}>{d.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{marginTop:"20px"}}>
                  <div className="notes-label">Master Record — {selectedWife.name}</div>
                  <textarea className="notes-area" style={{minHeight:"100px"}} placeholder="Overall assessment, context, key observations..." value={selectedWife.notes?.master || ""} onChange={e => setWifeNote("master", e.target.value)} />
                </div>
              </>
            )}
          </>
        )}

        {activeTab === "approach" && (
          <>
            <div className="guide-section">
              <div className="guide-header">
                <div className="guide-title">Where to Find Forge-Worthy Men</div>
              </div>
              <div className="guide-body">
                {APPROACH_VENUES.map((v, i) => (
                  <div key={i} className="guide-item">
                    <div className="guide-bullet">◆</div>
                    <div>
                      <div style={{ color: "#c8b89a", fontWeight: 600, marginBottom: "2px" }}>{v.venue}</div>
                      <div style={{ fontSize: "14px" }}>{v.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="guide-section">
              <div className="guide-header">
                <div className="guide-title">Forge Approach Rules</div>
              </div>
              <div className="guide-body">
                {APPROACH_RULES.map((r, i) => (
                  <div key={i} className="guide-item">
                    <div className="guide-bullet" style={{ color: "#c0521a", fontFamily: "Cinzel, serif", fontSize: "11px", minWidth: "20px" }}>{i + 1}.</div>
                    <div>{r}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="guide-section">
              <div className="guide-header">
                <div className="guide-title">Stage Timeline Reference</div>
              </div>
              <div className="guide-body">
                <div className="stage-timeline">
                  {[
                    { n: "I", label: "Passive\nObserve" },
                    { n: "II", label: "Warm\nIntro" },
                    { n: "III", label: "Deliberate\nTest" },
                    { n: "IV", label: "Council\nReview" },
                    { n: "⚔", label: "90-Day\nProbation" },
                    { n: "◈", label: "Oath\nSworn" },
                  ].map((s, i) => (
                    <div key={i} className="timeline-step">
                      <div className="timeline-dot">{s.n}</div>
                      <div className="timeline-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: "14px", color: "#6a5a42", fontStyle: "italic", textAlign: "center", marginTop: "8px" }}>
                  Minimum 90 days between first contact and oath consideration. Pattern, not performance.
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
