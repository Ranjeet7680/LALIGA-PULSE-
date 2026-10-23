import os
import subprocess
import time

PDF_DIR = os.path.abspath("docs/pdf")
ASSETS_DIR = os.path.abspath("assets")
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# Helper to read SVG content directly to inline it into HTML for guaranteed rendering
def read_svg(filename):
    filepath = os.path.join(ASSETS_DIR, filename)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            # strip xml declaration if present
            if content.startswith("<?xml"):
                content = content[content.find("?>")+2:].strip()
            return content
    return ""

header_svg = read_svg("header.svg")
arch_svg = read_svg("diagram-architecture.svg")
layers_svg = read_svg("diagram-layers.svg")
loop_svg = read_svg("diagram-tactix-loop.svg")
fintech_svg = read_svg("diagram-fintech-economy.svg")

# COMMON PRINT CSS
COMMON_CSS = """
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700;800&display=swap');
  
  @page {
    size: A4 portrait;
    margin: 14mm 12mm 14mm 12mm;
  }
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
    color: #1e293b;
    background: #ffffff;
    line-height: 1.55;
    font-size: 11pt;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  .page-break {
    page-break-after: always;
    break-after: page;
  }
  
  .avoid-break {
    page-break-inside: avoid;
    break-inside: avoid;
  }
  
  h1, h2, h3, h4 {
    font-family: 'Space Grotesk', sans-serif;
    color: #0f172a;
    letter-spacing: -0.02em;
  }
  
  h1 { font-size: 22pt; font-weight: 800; margin-bottom: 8pt; color: #0a0c10; }
  h2 { font-size: 15pt; font-weight: 700; margin-top: 14pt; margin-bottom: 6pt; color: #ff4b44; border-bottom: 2px solid #fee2e2; padding-bottom: 4pt; }
  h3 { font-size: 12pt; font-weight: 700; margin-top: 10pt; margin-bottom: 4pt; color: #1e293b; }
  h4 { font-size: 10.5pt; font-weight: 700; margin-top: 6pt; margin-bottom: 2pt; color: #475569; }
  
  p { margin-bottom: 8pt; font-size: 10pt; color: #334155; }
  
  .cover-card {
    background: linear-gradient(135deg, #090c12 0%, #161c28 100%);
    color: #ffffff;
    padding: 24pt;
    border-radius: 12pt;
    margin-bottom: 16pt;
    border: 1px solid rgba(255, 75, 68, 0.3);
  }
  
  .badge {
    display: inline-block;
    padding: 3pt 8pt;
    border-radius: 9999px;
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .badge-red { background: rgba(255, 75, 68, 0.15); color: #ff4b44; border: 1px solid rgba(255, 75, 68, 0.3); }
  .badge-cyan { background: rgba(0, 240, 255, 0.15); color: #0284c7; border: 1px solid rgba(0, 240, 255, 0.3); }
  .badge-gold { background: rgba(245, 158, 11, 0.15); color: #d97706; border: 1px solid rgba(245, 158, 11, 0.3); }
  .badge-green { background: rgba(16, 185, 129, 0.15); color: #059669; border: 1px solid rgba(16, 185, 129, 0.3); }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 10pt 0 14pt 0;
    font-size: 9pt;
  }
  th {
    background: #0f172a;
    color: #ffffff;
    text-align: left;
    padding: 6pt 8pt;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 8.5pt;
    letter-spacing: 0.03em;
  }
  td {
    padding: 6pt 8pt;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
  }
  tr:nth-child(even) td { background: #f8fafc; }

  .metric-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8pt;
    margin: 12pt 0;
  }
  .metric-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8pt;
    padding: 10pt;
    text-align: center;
  }
  .metric-label { font-size: 7.5pt; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 2pt; }
  .metric-value { font-size: 16pt; font-weight: 800; font-family: 'Space Grotesk', sans-serif; color: #ff4b44; }
  .metric-sub { font-size: 7.5pt; color: #059669; font-weight: 600; }

  .callout {
    background: #f0fdf4;
    border-left: 4px solid #22c55e;
    padding: 10pt 12pt;
    margin: 10pt 0;
    border-radius: 0 8pt 8pt 0;
    font-size: 9.5pt;
    color: #14532d;
  }
  .callout-alert {
    background: #fef2f2;
    border-left: 4px solid #ef4444;
    padding: 10pt 12pt;
    margin: 10pt 0;
    border-radius: 0 8pt 8pt 0;
    font-size: 9.5pt;
    color: #7f1d1d;
  }

  .svg-container {
    width: 100%;
    margin: 10pt 0 14pt 0;
    border-radius: 8pt;
    overflow: hidden;
    background: #090c12;
    padding: 6pt;
    border: 1px solid #cbd5e1;
  }
  .svg-container svg { width: 100%; height: auto; display: block; }
"""

print("Writing HTML templates...")

# ==========================================
# 1. MASTER PROJECT PROPOSAL DOCUMENT
# ==========================================
proposal_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LALIGA PULSE — Master Project Proposal</title>
  <style>{COMMON_CSS}</style>
</head>
<body>

  <!-- COVER PAGE -->
  <div class="cover-card avoid-break" style="margin-top: 20pt; padding: 36pt 28pt; min-height: 480pt; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      <div style="display: flex; gap: 8pt; margin-bottom: 18pt;">
        <span class="badge badge-red">BEYOND THE MATCH CHALLENGE</span>
        <span class="badge badge-cyan">DUBAI FINTECH SUMMIT 2026</span>
        <span class="badge badge-gold">USD 10,000 FINALIST</span>
      </div>
      <h1 style="color: #ffffff; font-size: 32pt; line-height: 1.1; margin-bottom: 12pt;">
        LALIGA PULSE<span style="color: #ff4b44;">™</span>
      </h1>
      <p style="color: #94a3b8; font-size: 14pt; font-weight: 500; margin-bottom: 24pt;">
        The Synchronous In-Match Fan Arena, Optical Intelligence &amp; Fan Capital Network
      </p>
      <div style="height: 3px; background: linear-gradient(90deg, #ff4b44, #00f0ff); width: 120pt; margin-bottom: 24pt;"></div>
    </div>

    <div>
      <table style="background: transparent; margin: 0; color: #cbd5e1; font-size: 9pt;">
        <tr style="background: transparent;"><td style="border: none; padding: 4pt 0; width: 130pt; color: #94a3b8;"><strong>CHALLENGE HOSTS:</strong></td><td style="border: none; padding: 4pt 0; color: #ffffff;">LALIGA &amp; Ignyte</td></tr>
        <tr style="background: transparent;"><td style="border: none; padding: 4pt 0; color: #94a3b8;"><strong>SHOWCASE STAGE:</strong></td><td style="border: none; padding: 4pt 0; color: #ffffff;">Innovation Stage, Dubai FinTech Summit</td></tr>
        <tr style="background: transparent;"><td style="border: none; padding: 4pt 0; color: #94a3b8;"><strong>CORE TELEMETRY:</strong></td><td style="border: none; padding: 4pt 0; color: #ffffff;">Sportian Mediacoach TRACAB® 25fps Optical Mesh</td></tr>
        <tr style="background: transparent;"><td style="border: none; padding: 4pt 0; color: #94a3b8;"><strong>AI / PREDICTIVE:</strong></td><td style="border: none; padding: 4pt 0; color: #ffffff;">Microsoft Azure Beyond Stats ML Engine</td></tr>
        <tr style="background: transparent;"><td style="border: none; padding: 4pt 0; color: #94a3b8;"><strong>REPOSITORY &amp; WIKI:</strong></td><td style="border: none; padding: 4pt 0; color: #00f0ff;">github.com/Ranjeet7680/LALIGA-PULSE-</td></tr>
      </table>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 1: EXECUTIVE SUMMARY -->
  <h2>1. Executive Summary &amp; Strategic Rationale</h2>
  <p>
    Historically, football consumption has been structured around the passive viewing of the 90-minute linear match. Today, digital habits, mobile ubiquity, and multi-screening have decoupled younger generations from linear broadcasts: <strong>84% of Gen-Z fans multi-screen while watching football</strong>, toggling across WhatsApp, TikTok, X, and stats feeds.
  </p>
  <p>
    Furthermore, <strong>over 85% of LALIGA’s 200M+ international fans will never visit the Santiago Bernabéu or Metropolitano</strong>. For these fans, fandom feels geographically disconnected.
  </p>
  <p>
    <strong>LALIGA PULSE™</strong> is a synchronized, real-time fan participation layer and closed-loop loyalty network integrated natively into LALIGA's digital ecosystem. Powered directly by <strong>Sportian’s Mediacoach 25fps optical tracking system</strong> and <strong>Microsoft Azure Beyond Stats</strong>, PULSE converts every live match into an interactive, cooperative tactical arena.
  </p>

  <div class="metric-grid avoid-break">
    <div class="metric-card">
      <div class="metric-label">Screen Time</div>
      <div class="metric-value">68m</div>
      <div class="metric-sub">+277% vs. Baseline</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">D30 Retention</div>
      <div class="metric-value">54%</div>
      <div class="metric-sub">+145% Cohort Uplift</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">DAU / MAU</div>
      <div class="metric-value">36%</div>
      <div class="metric-sub">3x Market Average</div>
    </div>
    <div class="metric-card">
      <div class="metric-label">Viral K-Factor</div>
      <div class="metric-value">1.6</div>
      <div class="metric-sub">Self-Sustaining</div>
    </div>
  </div>

  <div class="svg-container avoid-break">
    {arch_svg}
  </div>

  <div class="page-break"></div>

  <!-- SECTION 2: CONCEPT SUMMARY & THE 4 OPPORTUNITY AREAS -->
  <h2>2. Concept Summary: How LALIGA PULSE Works</h2>
  <p>LALIGA PULSE directly addresses all four opportunity areas specified in the challenge brief:</p>

  <div class="avoid-break">
    <h3>Layer 1: In-Match Participation (Synchronous Micro-Tactix)</h3>
    <p>
      Instead of slow weekly fantasy or predatory gambling, PULSE delivers <strong>15-second synchronous tactical decision windows</strong> triggered dynamically when Mediacoach optical tracking detects critical phases (24m free-kick, 3v2 counter-attack breakaway, or high-press traps). Fans vote in real-time, with outcomes resolved in &lt;2.4s by official TRACAB telemetry.
    </p>
  </div>

  <div class="avoid-break">
    <h3>Layer 2: Structured Community (Global Peña Clan Wars)</h3>
    <p>
      Fans join or form verified digital supporter clubs (<em>Peñas</em>) such as <em>Peña Madridista Tokyo</em>, <em>Cairo Culés</em>, and <em>Peña LALIGA Dubai</em>. Individual tactical points pool into real-time matchday standings, creating tribal pride and collective belonging.
    </p>
  </div>

  <div class="avoid-break">
    <h3>Layer 3: Data &amp; Narrative Amplification (Beyond Stats 2.0)</h3>
    <p>
      PULSE translates Mediacoach tracking data into accessible consumer metrics: <strong>Momentum Shift Index (MSI™)</strong>, <strong>Pressure Cooker Rating</strong>, and <strong>Crowd Tactical IQ (CTIQ™)</strong>, giving broadcast commentators and fans instant storytelling hooks.
    </p>
  </div>

  <div class="avoid-break">
    <h3>Layer 4: Extended Experience &amp; FinTech Loyalty Loop</h3>
    <p>
      Engagement is sustained through mid-week tactical labs, in-stadium BLE beacon sync (synchronized phone flashlights and jumbotron voting), and a non-speculative loyalty wallet where fans earn <strong>$PULSE Credits</strong> redeemable for authentic club jerseys, LALIGA+ passes, and sponsor perks.
    </p>
  </div>

  <div class="svg-container avoid-break">
    {layers_svg}
  </div>

  <div class="page-break"></div>

  <!-- SECTION 3: IN-MATCH EXECUTION LOOP & TELEMETRY RESOLUTION -->
  <h2>3. In-Match Execution Loop &amp; Telemetry Resolution</h2>
  <p>
    The heartbeat of LALIGA PULSE is its sub-second execution cycle, ensuring prompt delivery and optical settlement occur synchronously across millions of multi-screen fans.
  </p>

  <div class="svg-container avoid-break">
    {loop_svg}
  </div>

  <table class="avoid-break">
    <thead>
      <tr>
        <th>Execution Phase</th>
        <th>Latency Target</th>
        <th>System Component</th>
        <th>Verification Mechanism</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1. Tactical Event Trigger</strong></td>
        <td>&lt; 380 ms</td>
        <td>Sportian Mediacoach Optical Mesh</td>
        <td>xG threshold &gt; 0.15 or Zone 14 entry detected</td>
      </tr>
      <tr>
        <td><strong>2. Synchronous Fan Window</strong></td>
        <td>15.0 seconds</td>
        <td>Adaptive Latency Sync Engine</td>
        <td>Universal countdown timer calibrated via HLS ID3 tags</td>
      </tr>
      <tr>
        <td><strong>3. Crowd Consensus Split</strong></td>
        <td>&lt; 500 ms</td>
        <td>Redis Sharded Aggregator</td>
        <td>Live percentages pushed to Mediapro TV Lower-Third</td>
      </tr>
      <tr>
        <td><strong>4. Telemetry Settlement</strong></td>
        <td>&lt; 2.4 seconds</td>
        <td>TRACAB Optical Coordinate Engine</td>
        <td>Automated spatial outcome verification (no manual scoring)</td>
      </tr>
      <tr>
        <td><strong>5. Loyalty Minting &amp; XP</strong></td>
        <td>&lt; 150 ms</td>
        <td>FinTech $PULSE Ledger</td>
        <td>Instant credit minting + Peña clan score aggregation</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- SECTION 4: INTEGRATION PLAN -->
  <h2>4. Ecosystem Integration Plan</h2>
  <p>
    LALIGA PULSE is architected as an expansion pack within LALIGA’s existing technological landscape, avoiding fragmented downloads or detached external portals.
  </p>

  <div class="avoid-break">
    <h3>Key Ecosystem Touchpoints:</h3>
    <ul>
      <li style="margin-bottom: 6pt; font-size: 10pt;"><strong>Sportian / Mediacoach:</strong> Ingests TRACAB 25fps optical tracking and official event metadata via Apache Kafka &amp; Azure Event Hubs streaming 150,000 coordinate points/min.</li>
      <li style="margin-bottom: 6pt; font-size: 10pt;"><strong>LALIGA Official App:</strong> Delivered as a high-performance modular React Native SDK / micro-frontend embedded natively in the flagship app.</li>
      <li style="margin-bottom: 6pt; font-size: 10pt;"><strong>LALIGA Fantasy Integration:</strong> Bi-directional reward loop: playing live PULSE duels unlocks exclusive bonus booster cards and XP inside <em>LALIGA Fantasy</em>.</li>
      <li style="margin-bottom: 6pt; font-size: 10pt;"><strong>Mediapro Broadcast &amp; LALIGA+ OTT:</strong> Synchronous lower-third graphics generated via Broadcaster API; HLS ID3 timed metadata tags eliminate broadcast delay spoilers.</li>
      <li style="margin-bottom: 6pt; font-size: 10pt;"><strong>Single Sign-On (LALIGA SSO):</strong> Seamless identity continuity tied to <code>laliga.com/id</code> across ticketing, merchandise, and digital wallet profiles.</li>
    </ul>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 5: FINTECH LOYALTY LOOP & MONETIZATION -->
  <h2>5. FinTech Loyalty Loop &amp; Monetization (Dubai FinTech Summit)</h2>
  <p>
    Presented at the <strong>Dubai FinTech Summit</strong>, LALIGA PULSE establishes a bridge between sports-tech and fintech via a non-speculative, closed-loop loyalty token economy.
  </p>

  <div class="svg-container avoid-break">
    {fintech_svg}
  </div>

  <div class="avoid-break">
    <h3>The 4-Pillar Monetization Framework:</h3>
    <table style="margin-top: 6pt;">
      <thead>
        <tr>
          <th>Revenue Stream</th>
          <th>Share (%)</th>
          <th>Commercial Mechanism</th>
          <th>Target Partners</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Sponsored Tactical Moments</strong></td>
          <td>42%</td>
          <td>Native 15s sponsored decision windows with branded click-throughs.</td>
          <td>EA SPORTS, Puma, Microsoft Azure</td>
        </tr>
        <tr>
          <td><strong>FinTech Card-Linked Marketplace</strong></td>
          <td>26%</td>
          <td>Card-linked merchant discounts and wallet redemption subsidies.</td>
          <td>Regional UAE &amp; MENA Digital Banks</td>
        </tr>
        <tr>
          <td><strong>B2B Zero-Party Fan Intelligence</strong></td>
          <td>18%</td>
          <td>Anonymized behavioral insights and tactical literacy profiles.</td>
          <td>Club Commercial Departments &amp; Sponsors</td>
        </tr>
        <tr>
          <td><strong>Club Premium Passes &amp; Perks</strong></td>
          <td>14%</td>
          <td>Exclusive tactical camera angles and VIP player Q&amp;A sessions.</td>
          <td>LALIGA+ Subscribers &amp; Hardcore Fans</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 6: PROTOTYPE SCOPE & DEMO DAY -->
  <h2>6. Prototype Scope: Demo Day vs. Production Roadmap</h2>
  <p>
    To ensure credibility on the Innovation Stage, the deliverable for Demo Day is a fully functional, live interactive web prototype backed by simulated optical telemetry data.
  </p>

  <table class="avoid-break">
    <thead>
      <tr>
        <th>Component</th>
        <th>Demo Day Working Deliverable</th>
        <th>Phase 2 Enterprise Rollout</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Live Match Simulator</strong></td>
        <td>Interactive ElClásico clock running simulated Mediacoach optical telemetry.</td>
        <td>Direct WebSocket connection to live stadium TRACAB tracking array.</td>
      </tr>
      <tr>
        <td><strong>In-Match Tactix Duels</strong></td>
        <td>Live 15s countdown timer, real-time voting, and automated sub-3s optical settlement.</td>
        <td>Automated AI challenge generator triggered dynamically by Beyond Stats xG spikes.</td>
      </tr>
      <tr>
        <td><strong>Peña Supporter Hub</strong></td>
        <td>Live clan leaderboard (Tokyo, Cairo, Dubai, Bogotá) and live banter wave.</td>
        <td>Official integration with LALIGA’s 2,500+ registered supporter federations.</td>
      </tr>
      <tr>
        <td><strong>FinTech Loyalty Wallet</strong></td>
        <td>Interactive $PULSE balance, fan status tiering, and instant perk redemption.</td>
        <td>Open Banking API card-linked offers with regional UAE/MENA digital banks.</td>
      </tr>
      <tr>
        <td><strong>Broadcaster TV Overlay</strong></td>
        <td>Simulated TV feed with synchronized lower-third crowd consensus graphics.</td>
        <td>Vizrt / Ross Video broadcast overlay plugin for Mediapro live television feeds.</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <!-- SECTION 7: RISK MITIGATION & COMPLIANCE -->
  <h2>7. Risk Mitigation &amp; Regulatory Compliance</h2>
  
  <div class="callout avoid-break">
    <strong>100% Free-to-Play, Non-Gambling Compliance Architecture:</strong><br/>
    LALIGA PULSE requires no real-money deposits, enforces zero monetary cashouts, and operates strictly as a skill-based loyalty utility. Compliant with <strong>Spain DGOJ</strong>, <strong>UAE SCA &amp; CBUAE</strong>, <strong>US State</strong>, and <strong>EU</strong> regulations without requiring gambling or gaming licenses.
  </div>

  <table class="avoid-break">
    <thead>
      <tr>
        <th>Risk Vector</th>
        <th>Specific Vulnerability</th>
        <th>Architectural Mitigation</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Broadcast Latency Variance</strong></td>
        <td>OTT viewers watching 15s behind cable seeing spoilers.</td>
        <td><strong>Adaptive Latency Buffer:</strong> Challenges calibrated to individual video timecodes via HLS ID3 tags or audio watermarking.</td>
      </tr>
      <tr>
        <td><strong>Data Protection &amp; Privacy</strong></td>
        <td>Cross-border storage of fan telemetry and geofencing.</td>
        <td><strong>Privacy by Design:</strong> On-device geofencing validation without server GPS upload; pseudonymous tokens linked to LALIGA SSO (GDPR &amp; UAE PDPL compliant).</td>
      </tr>
      <tr>
        <td><strong>Brand Safety &amp; Toxicity</strong></td>
        <td>Rival fanbases abusing live match chat rooms.</td>
        <td><strong>AI NLP Toxicity Shield:</strong> Multilingual automated filtering (Arabic, Spanish, Catalan, English) with automatic chat cooldowns and clan reputation penalties.</td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 30pt; padding: 16pt; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8pt; text-align: center;" class="avoid-break">
    <h3 style="margin-top: 0; color: #0a0c10;">LALIGA PULSE™ — Beyond The Match Challenge Submission</h3>
    <p style="margin-bottom: 0; font-size: 9pt; color: #64748b;">
      Authored for the Innovation Stage Showcase at the Dubai FinTech Summit 2026.<br/>
      Codebase &amp; Wiki: <strong>https://github.com/Ranjeet7680/LALIGA-PULSE-</strong>
    </p>
  </div>

</body>
</html>
"""

# ==========================================
# 2. EXECUTIVE PITCH DECK (SLIDE-STYLE)
# ==========================================
deck_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LALIGA PULSE — Executive Pitch Deck</title>
  <style>
    {COMMON_CSS}
    @page {{
      size: A4 landscape;
      margin: 12mm 12mm 12mm 12mm;
    }}
    .slide {{
      height: 480pt;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      page-break-after: always;
      break-after: page;
      padding: 16pt;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10pt;
    }}
    .slide-dark {{
      background: linear-gradient(135deg, #090c12 0%, #161c28 100%);
      color: #ffffff;
      border: 1px solid rgba(255, 75, 68, 0.4);
    }}
    .slide-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8pt;
      margin-bottom: 12pt;
    }}
    .slide-dark .slide-header {{
      border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    }}
    .slide-title {{
      font-size: 20pt;
      font-weight: 800;
      font-family: 'Space Grotesk', sans-serif;
      color: #0f172a;
    }}
    .slide-dark .slide-title {{ color: #ffffff; }}
    .slide-footer {{
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
      padding-top: 6pt;
      margin-top: 8pt;
    }}
    .slide-dark .slide-footer {{ border-top: 1px solid rgba(255, 255, 255, 0.1); }}
  </style>
</head>
<body>

  <!-- SLIDE 1: COVER -->
  <div class="slide slide-dark">
    <div style="display: flex; justify-content: space-between;">
      <span class="badge badge-red">BEYOND THE MATCH CHALLENGE</span>
      <span class="badge badge-gold">DUBAI FINTECH SUMMIT • INNOVATION STAGE</span>
    </div>
    <div style="text-align: center; margin: 40pt 0;">
      <h1 style="color: #ffffff; font-size: 38pt; margin-bottom: 10pt;">LALIGA PULSE<span style="color: #ff4b44;">™</span></h1>
      <p style="color: #00f0ff; font-size: 15pt; font-weight: 700; margin-bottom: 12pt;">
        The Synchronous In-Match Fan Arena, Optical Intelligence &amp; Fan Capital Network
      </p>
      <p style="color: #94a3b8; font-size: 11pt; max-width: 500pt; margin: 0 auto;">
        Transforming 90 minutes of passive broadcast viewing into a synchronized, co-operative global stadium powered by Mediacoach 25fps optical tracking and a non-speculative loyalty micro-economy.
      </p>
    </div>
    <div class="slide-footer">
      <span>Official Challenge Pitch Deck</span>
      <span>USD 10,000 Finalist Showcase</span>
      <span>github.com/Ranjeet7680/LALIGA-PULSE-</span>
    </div>
  </div>

  <!-- SLIDE 2: THE PROBLEM -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-title">1. The Second-Screen Attention Leak</div>
      <span class="badge badge-red">THE CHALLENGE</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16pt; flex: 1; align-items: center;">
      <div>
        <h3 style="color: #ff4b44; font-size: 15pt; margin-bottom: 8pt;">84% of Gen-Z Fans Multi-Screen During Matches</h3>
        <p style="font-size: 11pt;">During live 90-minute broadcasts, fan attention fragments across TikTok, WhatsApp, X, and betting apps. LALIGA generates the emotional surge, but third-party platforms harvest the screen time and monetization.</p>
        <h3 style="color: #0f172a; font-size: 15pt; margin-top: 14pt; margin-bottom: 8pt;">85%+ of Global Fans Never Visit Spain</h3>
        <p style="font-size: 11pt;">Remote international fans in MENA, LatAm, and Asia feel detached from the physical stadium culture. Existing fantasy games are asynchronous, while sports betting is restrictive, predatory, and inaccessible to youth.</p>
      </div>
      <div class="metric-grid" style="grid-template-columns: 1fr 1fr; gap: 12pt;">
        <div class="metric-card" style="padding: 16pt;"><div class="metric-label">Current App Session</div><div class="metric-value">18m</div><div class="metric-sub">Fragmented attention</div></div>
        <div class="metric-card" style="padding: 16pt;"><div class="metric-label">International Fans</div><div class="metric-value">85%+</div><div class="metric-sub">Geographically detached</div></div>
        <div class="metric-card" style="padding: 16pt;"><div class="metric-label">Multi-Screen Rate</div><div class="metric-value">84%</div><div class="metric-sub">Attention leakage</div></div>
        <div class="metric-card" style="padding: 16pt;"><div class="metric-label">Unmonetized Value</div><div class="metric-value">$1.2B</div><div class="metric-sub">Lost second-screen value</div></div>
      </div>
    </div>
    <div class="slide-footer">
      <span>Problem Identification</span>
      <span>LALIGA PULSE Pitch Deck</span>
      <span>Slide 2 of 6</span>
    </div>
  </div>

  <!-- SLIDE 3: THE SOLUTION & 4 LAYERS -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-title">2. The Solution: LALIGA PULSE™</div>
      <span class="badge badge-cyan">4-LAYER ARCHITECTURE</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10pt; flex: 1; align-items: stretch;">
      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8pt; padding: 12pt;">
        <span class="badge badge-red" style="margin-bottom: 8pt;">LAYER 1</span>
        <h4 style="color: #991b1b; font-size: 11pt;">In-Match Tactix</h4>
        <p style="font-size: 9pt; color: #7f1d1d;">15-second synchronous decision windows triggered by optical tracking with sub-3s settlement.</p>
        <div style="font-size: 8pt; font-weight: 700; color: #ff4b44; margin-top: 10pt;">KPI: +277% Screen Time</div>
      </div>
      <div style="background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8pt; padding: 12pt;">
        <span class="badge badge-cyan" style="margin-bottom: 8pt;">LAYER 2</span>
        <h4 style="color: #075985; font-size: 11pt;">Structured Community</h4>
        <p style="font-size: 9pt; color: #0c4a6e;">Global Peña clan wars (Tokyo, Cairo, Dubai, Bogotá) and tiered Proof-of-Fandom reputation.</p>
        <div style="font-size: 8pt; font-weight: 700; color: #0284c7; margin-top: 10pt;">KPI: 1.6 Viral K-Factor</div>
      </div>
      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8pt; padding: 12pt;">
        <span class="badge badge-gold" style="margin-bottom: 8pt;">LAYER 3</span>
        <h4 style="color: #92400e; font-size: 11pt;">Beyond Stats 2.0</h4>
        <p style="font-size: 9pt; color: #78350f;">Proprietary Momentum Shift Index (MSI™), Pressure Cooker, &amp; Crowd Tactical IQ (CTIQ™).</p>
        <div style="font-size: 8pt; font-weight: 700; color: #d97706; margin-top: 10pt;">KPI: +145% D30 Retention</div>
      </div>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8pt; padding: 12pt;">
        <span class="badge badge-green" style="margin-bottom: 8pt;">LAYER 4</span>
        <h4 style="color: #166534; font-size: 11pt;">FinTech Value Loop</h4>
        <p style="font-size: 9pt; color: #14532d;">Non-speculative $PULSE loyalty tokens redeemable for official kits, OTT passes, &amp; partner perks.</p>
        <div style="font-size: 8pt; font-weight: 700; color: #059669; margin-top: 10pt;">KPI: 3x DAU/MAU Growth</div>
      </div>
    </div>
    <div class="slide-footer">
      <span>Solution Breakdown</span>
      <span>LALIGA PULSE Pitch Deck</span>
      <span>Slide 3 of 6</span>
    </div>
  </div>

  <!-- SLIDE 4: SYSTEM & TELEMETRY -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-title">3. Optical Ingest &amp; Ecosystem Integration</div>
      <span class="badge badge-cyan">TECHNICAL COHERENCE</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16pt; flex: 1; align-items: center;">
      <div>
        <h3 style="color: #0f172a; font-size: 13pt; margin-bottom: 8pt;">Native Integration, Zero Standalone Friction</h3>
        <ul style="font-size: 10pt; color: #334155; margin-left: 14pt; line-height: 1.7;">
          <li><strong>Sportian Mediacoach:</strong> TRACAB 25fps optical mesh coordinate ingestion over Kafka.</li>
          <li><strong>Microsoft Azure:</strong> Databricks and Cognitive Services for Beyond Stats ML inference.</li>
          <li><strong>LALIGA Official App:</strong> Modular React Native micro-frontend with SSO authentication.</li>
          <li><strong>LALIGA Fantasy:</strong> Live duel wins award bonus booster cards in fantasy leagues.</li>
          <li><strong>Mediapro Broadcast:</strong> Real-time crowd consensus graphics keyed into linear TV lower-thirds.</li>
        </ul>
      </div>
      <div style="background: #090c12; border-radius: 8pt; padding: 8pt; border: 1px solid #334155;">
        {arch_svg}
      </div>
    </div>
    <div class="slide-footer">
      <span>Technical Pipeline</span>
      <span>LALIGA PULSE Pitch Deck</span>
      <span>Slide 4 of 6</span>
    </div>
  </div>

  <!-- SLIDE 5: FINTECH LOYALTY LOOP -->
  <div class="slide">
    <div class="slide-header">
      <div class="slide-title">4. FinTech Monetization Model (Dubai Summit Bridge)</div>
      <span class="badge badge-gold">SUSTAINABLE ECONOMICS</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16pt; flex: 1; align-items: center;">
      <div style="background: #090c12; border-radius: 8pt; padding: 8pt; border: 1px solid #334155;">
        {fintech_svg}
      </div>
      <div>
        <h3 style="color: #0f172a; font-size: 13pt; margin-bottom: 8pt;">Closed-Loop Fan Capital Network</h3>
        <ul style="font-size: 10pt; color: #334155; margin-left: 14pt; line-height: 1.7;">
          <li><strong>Sweat-Equity Minting:</strong> Fans earn $PULSE credits through match attention and accuracy.</li>
          <li><strong>Sponsor Capital:</strong> EA SPORTS, Puma, and regional UAE digital banks fund reward pools.</li>
          <li><strong>Real-World Perks:</strong> Authentic jerseys, LALIGA+ OTT passes, and Dubai FinTech Summit passes.</li>
          <li><strong>100% Free-to-Play:</strong> Compliant with Spain DGOJ, UAE SCA, and US regulations without gambling licenses.</li>
        </ul>
      </div>
    </div>
    <div class="slide-footer">
      <span>FinTech Economics</span>
      <span>LALIGA PULSE Pitch Deck</span>
      <span>Slide 5 of 6</span>
    </div>
  </div>

  <!-- SLIDE 6: TRACTION & PROTOTYPE -->
  <div class="slide slide-dark">
    <div class="slide-header">
      <div class="slide-title">5. Demo Day Prototype &amp; Enterprise Roadmap</div>
      <span class="badge badge-green">LIVE &amp; FUNCTIONAL</span>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16pt; flex: 1; align-items: center;">
      <div>
        <h3 style="color: #00f0ff; font-size: 14pt; margin-bottom: 8pt;">Built &amp; Working Live for Demo Day:</h3>
        <ul style="font-size: 10pt; color: #cbd5e1; margin-left: 14pt; line-height: 1.8;">
          <li>✓ Real-time match clock simulating ElClásico minute 74 free-kick.</li>
          <li>✓ 15s synchronous voting prompt with sub-3s optical settlement.</li>
          <li>✓ Global Peña clan war leaderboard (Tokyo, Cairo, Dubai, Bogotá).</li>
          <li>✓ Beyond Stats 2.0 Momentum Shift Index (MSI™) and 2D spatial pitch map.</li>
          <li>✓ Functional loyalty wallet with instant perks marketplace redemption.</li>
        </ul>
      </div>
      <div style="text-align: center; background: rgba(255, 255, 255, 0.05); padding: 18pt; border-radius: 10pt; border: 1px solid rgba(255, 255, 255, 0.1);">
        <h2 style="color: #ffd159; font-size: 20pt; margin-bottom: 6pt;">Ready to Scale to 200M Fans</h2>
        <p style="color: #94a3b8; font-size: 10pt; margin-bottom: 12pt;">
          Roadmap to integrate across all 20 Primera División clubs by Season 2026/27.
        </p>
        <span class="badge badge-red" style="font-size: 10pt; padding: 6pt 14pt;">USD 10,000 PRIZE WINNER BLUEPRINT</span>
      </div>
    </div>
    <div class="slide-footer">
      <span>Execution Plan</span>
      <span>LALIGA PULSE Pitch Deck</span>
      <span>Slide 6 of 6</span>
    </div>
  </div>

</body>
</html>
"""

# ==========================================
# 3. TECHNICAL ARCHITECTURE SPECIFICATION
# ==========================================
techspec_html = f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LALIGA PULSE — Technical Architecture Specification</title>
  <style>{COMMON_CSS}</style>
</head>
<body>

  <!-- COVER -->
  <div class="cover-card avoid-break" style="margin-top: 10pt; padding: 24pt;">
    <div style="display: flex; gap: 8pt; margin-bottom: 12pt;">
      <span class="badge badge-cyan">ENGINEERING SPECIFICATION</span>
      <span class="badge badge-red">SPORTIAN &amp; AZURE BEYOND STATS</span>
    </div>
    <h1 style="color: #ffffff; font-size: 24pt; margin-bottom: 8pt;">LALIGA PULSE™ Technical Spec</h1>
    <p style="color: #94a3b8; font-size: 11pt;">
      Data Ingestion, Latency Synchronization, Event Contracts &amp; Security Architecture
    </p>
  </div>

  <h2>1. Optical Telemetry Ingestion (Sportian Mediacoach TRACAB)</h2>
  <p>
    The optical tracking array consists of 8 to 16 synchronized high-frame-rate cameras installed in the stadium catenary, capturing real-time spatial positioning of all 22 players and the ball at <strong>25 frames per second</strong>.
  </p>

  <div class="svg-container avoid-break">
    {arch_svg}
  </div>

  <table class="avoid-break">
    <thead>
      <tr>
        <th>Field Name</th>
        <th>Type</th>
        <th>Frequency</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>match_id</code></td>
        <td>String (UUID)</td>
        <td>Static</td>
        <td>Official LALIGA fixture identifier</td>
      </tr>
      <tr>
        <td><code>frame_timestamp_utc</code></td>
        <td>Int64 (NTP ms)</td>
        <td>25 Hz</td>
        <td>Nanosecond-synchronized master timecode</td>
      </tr>
      <tr>
        <td><code>ball_coordinates</code></td>
        <td>Vec3 (X, Y, Z)</td>
        <td>25 Hz</td>
        <td>Ball 3D coordinates in normalized pitch space (0.0 to 105.0m)</td>
      </tr>
      <tr>
        <td><code>player_positions</code></td>
        <td>Array[PlayerPos]</td>
        <td>25 Hz</td>
        <td>22 objects with player_id, team_id, speed_kmh, and vector heading</td>
      </tr>
      <tr>
        <td><code>spatial_zone_index</code></td>
        <td>Int16 (1..18)</td>
        <td>25 Hz</td>
        <td>Current play zone (Zone 14: central edge of penalty box)</td>
      </tr>
    </tbody>
  </table>

  <div class="page-break"></div>

  <h2>2. Adaptive Latency Synchronization Buffer</h2>
  <p>
    Global broadcast feeds suffer from physical delivery variance:
  </p>
  <ul>
    <li>In-Stadium Spectators: <strong>0.0s delay</strong></li>
    <li>DTT / Terrestrial Antenna: <strong>+3.5s delay</strong></li>
    <li>IPTV / Cable: <strong>+8.2s delay</strong></li>
    <li>OTT Streaming (LALIGA+): <strong>+18.4s delay</strong></li>
  </ul>
  <p>
    To eliminate spoilers, the client SDK uses an <strong>Adaptive Latency Sync Engine</strong> that listens to an inaudible acoustic watermark or extracts HLS ID3 timed metadata tags from the user's video feed. Prompts appear synchronized to that specific fan's screen.
  </p>

  <h2>3. Apache Kafka Streaming &amp; Partitioning Strategy</h2>
  <table class="avoid-break">
    <thead>
      <tr>
        <th>Kafka Topic</th>
        <th>Partition Key</th>
        <th>Retention</th>
        <th>Consumers</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>laliga.optical.tracking.raw</code></td>
        <td><code>match_id</code> (16 Partitions)</td>
        <td>24 Hours</td>
        <td>Tactical State Machine, Spatial Aggregator</td>
      </tr>
      <tr>
        <td><code>laliga.tactix.prompts.active</code></td>
        <td><code>challenge_id</code> (4 Partitions)</td>
        <td>2 Hours</td>
        <td>Redis Edge Sync, Push Notification Gateway</td>
      </tr>
      <tr>
        <td><code>laliga.fan.votes.stream</code></td>
        <td><code>user_id_hash</code> (32 Partitions)</td>
        <td>1 Hour</td>
        <td>Consensus Aggregator, Audit Ledger</td>
      </tr>
      <tr>
        <td><code>laliga.settlement.outcomes</code></td>
        <td><code>challenge_id</code> (4 Partitions)</td>
        <td>7 Days</td>
        <td>$PULSE Token Ledger, Broadcaster SDI Gateway</td>
      </tr>
    </tbody>
  </table>

  <h2>4. Data Protection &amp; Security Boundary (GDPR &amp; UAE PDPL)</h2>
  <p>
    LALIGA PULSE adheres to Privacy-by-Design principles. Fan identity is decoupled from behavioral telemetry using an ephemeral cryptographic token tied to LALIGA Single Sign-On (SSO). Geofencing is calculated on-device without continuous server tracking.
  </p>

</body>
</html>
"""

# Write HTML templates to disk
files = [
    ("proposal_template.html", proposal_html),
    ("pitchdeck_template.html", deck_html),
    ("techspec_template.html", techspec_html)
]

for fname, content in files:
    fpath = os.path.join(PDF_DIR, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created HTML: {fpath}")

# Function to compile HTML to PDF using Edge headless
def compile_pdf(html_filename, pdf_filename):
    html_path = os.path.join(PDF_DIR, html_filename)
    pdf_path = os.path.join(PDF_DIR, pdf_filename)
    
    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--allow-file-access-from-files",
        f"--print-to-pdf={pdf_path}",
        "--no-pdf-header-footer",
        html_path
    ]
    
    print(f"Compiling {pdf_filename}...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    time.sleep(2)
    
    if os.path.exists(pdf_path):
        size = os.path.getsize(pdf_path)
        print(f"SUCCESS: {pdf_filename} generated ({size:,} bytes)")
    else:
        print(f"FAILED to generate {pdf_filename}. Stderr: {res.stderr}")

compile_pdf("proposal_template.html", "LALIGA_PULSE_Master_Project_Proposal.pdf")
compile_pdf("pitchdeck_template.html", "LALIGA_PULSE_Executive_Pitch_Deck.pdf")
compile_pdf("techspec_template.html", "LALIGA_PULSE_Technical_Architecture_Spec.pdf")

print("All PDF generation tasks complete!")
