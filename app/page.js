"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, ClipboardCheck, Thermometer, Users, TrendingUp, Compass, Mail, Lock, Clock, AlertTriangle } from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const C = {
  ink: "#1C2B2E",
  cream: "#F7F4EC",
  brass: "#B8895A",
  brassDark: "#9C7148",
  sage: "#5C7A6E",
  text: "#2E2E2E",
  textMuted: "#5C6663",
  line: "rgba(28,43,46,0.12)",
};

const serif = "'Fraunces', 'Iowan Old Style', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";

const FONT_IMPORT = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; }
    body { margin: 0; }
    a { text-decoration: none; }
    ::selection { background: ${C.brass}; color: white; }
  `}</style>
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const SERVICES = [
  {
    id: "control",
    eyebrow: "Software",
    name: "MD Control",
    line: "Taken komen automatisch op, locaties voeren uit, u ziet meteen wat afwijkt — vóór de NVWA dat doet.",
    icon: ClipboardCheck,
    status: "live",
  },
  {
    id: "advies",
    eyebrow: "Consultancy",
    name: "Sourcing, performance & concepting",
    line: "Scherpe inkoop, betere marges en concepten die werken op elke outlet — niet alleen op papier.",
    icon: TrendingUp,
    status: "soon",
  },
  {
    id: "interim",
    eyebrow: "Interim",
    name: "Interim operationeel leiderschap",
    line: "Mark van Dijk aan het stuur wanneer u tijdelijk iemand nodig heeft die de vloer al kent.",
    icon: Users,
    status: "soon",
  },
];

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function App() {
  const [page, setPage] = useState("home"); // home | control | soon

  return (
    <div style={{ fontFamily: sans, background: C.cream, minHeight: "100vh", color: C.text }}>
      {FONT_IMPORT}
      <NavBar page={page} setPage={setPage} />
      {page === "home" && <Home onOpenControl={() => setPage("control")} />}
      {page === "control" && <ControlInfo onBack={() => setPage("home")} onEnter={() => setPage("soon")} />}
      {page === "soon" && <ComingSoon onBack={() => setPage("control")} />}
      <SiteFooter />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------
function NavBar({ page, setPage }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "22px 48px", borderBottom: `1px solid ${C.line}`,
    }}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "baseline", gap: 8, padding: 0 }}>
        <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>MV</span>
        <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: C.textMuted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Diensten</span>
      </button>
      <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
        <span style={{ fontSize: 13, color: C.textMuted, letterSpacing: "0.04em" }}>Mark van Dijk</span>
        <a href="mailto:info@mvdiensten.nl" style={{
          display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 600,
          color: C.ink, border: `1px solid ${C.ink}`, borderRadius: 999, padding: "8px 16px",
        }}>
          <Mail size={14} /> Contact
        </a>
      </nav>
    </header>
  );
}

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------
function Home({ onOpenControl }) {
  return (
    <main>
      {/* Hero */}
      <section style={{ padding: "96px 48px 80px", maxWidth: 880, margin: "0 auto", textAlign: "left" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28,
          fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: C.sage,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.sage }} />
          Voor hoofdkantoren met meerdere outlets
        </div>
        <h1 style={{
          fontFamily: serif, fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 600, lineHeight: 1.08,
          color: C.ink, margin: "0 0 28px", letterSpacing: "-0.01em", maxWidth: 720,
        }}>
          Weet het vóórdat de inspecteur het u vertelt.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: C.textMuted, maxWidth: 580, margin: 0 }}>
          Tien hotels, twintig horeca-outlets in een pretpark, één hoofdkantoor dat het overzicht
          kwijt is. MV Diensten zet de vloer digitaal aan, zodat u op elk moment weet wat er speelt
          — in plaats van het te horen tijdens een controle.
        </p>
      </section>

      {/* Service register */}
      <section style={{ padding: "0 48px 100px", maxWidth: 880, margin: "0 auto" }}>
        <div style={{
          fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          color: C.textMuted, marginBottom: 18, paddingLeft: 4,
        }}>
          Diensten
        </div>
        <div style={{ border: `1px solid ${C.line}`, borderRadius: 4, overflow: "hidden" }}>
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.id} service={s} isLast={i === SERVICES.length - 1} onClick={s.id === "control" ? onOpenControl : undefined} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ServiceRow({ service, isLast, onClick }) {
  const { eyebrow, name, line, icon: Icon, status } = service;
  const clickable = !!onClick;
  return (
    <button
      onClick={onClick}
      disabled={!clickable}
      style={{
        width: "100%", display: "flex", alignItems: "center", gap: 24, textAlign: "left",
        padding: "28px 28px", background: "transparent", border: "none",
        borderBottom: isLast ? "none" : `1px solid ${C.line}`,
        cursor: clickable ? "pointer" : "default", transition: "background 0.15s",
      }}
      onMouseEnter={(e) => { if (clickable) e.currentTarget.style.background = "rgba(184,137,90,0.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      <div style={{
        width: 46, height: 46, borderRadius: 4, flexShrink: 0,
        background: status === "live" ? C.ink : "rgba(28,43,46,0.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon size={20} color={status === "live" ? C.cream : C.sage} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.brass }}>
            {eyebrow}
          </span>
          <StatusPin status={status} />
        </div>
        <div style={{ fontFamily: serif, fontSize: 21, fontWeight: 600, color: C.ink, marginBottom: 4 }}>
          {name}
        </div>
        <div style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.5 }}>{line}</div>
      </div>

      {clickable ? (
        <ArrowRight size={18} color={C.ink} style={{ flexShrink: 0 }} />
      ) : (
        <span style={{ fontSize: 12, color: C.textMuted, flexShrink: 0, fontStyle: "italic" }}>Binnenkort</span>
      )}
    </button>
  );
}

function StatusPin({ status }) {
  const live = status === "live";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      color: live ? C.sage : "#A39A8C",
    }}>
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: live ? C.sage : "#C9BFAF",
        boxShadow: live ? `0 0 0 3px rgba(92,122,110,0.15)` : "none",
      }} />
      {live ? "In bedrijf" : "In voorbereiding"}
    </span>
  );
}

// ---------------------------------------------------------------------------
// MD CONTROL — info page
// ---------------------------------------------------------------------------
function ControlInfo({ onBack, onEnter }) {
  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "56px 48px 100px" }}>
      <BackLink onClick={onBack} label="Alle diensten" />

      <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "32px 0 18px" }}>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.brass }}>
          Software
        </span>
        <StatusPin status="live" />
      </div>
      <h1 style={{ fontFamily: serif, fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 600, color: C.ink, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
        MD Control
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.65, color: C.ink, maxWidth: 640, margin: "0 0 14px", fontWeight: 500 }}>
        Tien outlets, twintig koelcellen, honderd schoonmaaktaken per dag. U kunt niet overal zijn —
        MD Control wel.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.65, color: C.textMuted, maxWidth: 620, margin: "0 0 48px" }}>
        Taken komen automatisch op bij elke locatie, op het moment dat ze moeten. Wordt iets te laat
        of te warm? U krijgt een melding voordat het een probleem wordt — niet pas bij de controle.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 20, marginBottom: 56 }}>
        <FeatureCard icon={Clock} title="Taken komen automatisch op"
          text="Elke locatie krijgt op het juiste moment de juiste taak — geen briefing nodig, geen Excel om bij te houden." />
        <FeatureCard icon={Thermometer} title="Eén centraal beeld"
          text="Vanaf het hoofdkantoor ziet u in real time welke outlet op schema loopt en welke achterblijft." />
        <FeatureCard icon={AlertTriangle} title="Alarm bij afwijking"
          text="Temperatuur buiten norm of een taak te laat? U weet het direct — niet de dag erna." />
        <FeatureCard icon={CheckCircle2} title="Klaar voor de inspecteur"
          text="NVWA, Bureau de Wit of Sensz ziet in één oogopslag precies wat hij moet zien. Geen rommelige map met papier." />
      </div>

      <div style={{
        background: C.ink, borderRadius: 6, padding: "40px 40px", display: "flex",
        flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div>
          <div style={{ color: C.cream, fontFamily: serif, fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
            Klaar om mee te kijken?
          </div>
          <div style={{ color: "rgba(247,244,236,0.65)", fontSize: 14 }}>
            Voor locaties en beheerders met toegang tot MD Control.
          </div>
        </div>
        <button onClick={onEnter} style={{
          display: "flex", alignItems: "center", gap: 9, padding: "14px 26px", borderRadius: 999,
          background: C.brass, border: "none", color: C.ink, fontSize: 14, fontWeight: 700, cursor: "pointer",
          whiteSpace: "nowrap",
        }}>
          <Lock size={15} /> Inloggen <ArrowRight size={15} />
        </button>
      </div>
    </main>
  );
}

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 6, padding: 22, background: "rgba(255,255,255,0.4)" }}>
      <Icon size={20} color={C.sage} style={{ marginBottom: 12 }} />
      <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 600, color: C.ink, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.55, color: C.textMuted }}>{text}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMING SOON — destination of the login button
// ---------------------------------------------------------------------------
function ComingSoon({ onBack }) {
  return (
    <main style={{ maxWidth: 600, margin: "0 auto", padding: "120px 48px 140px", textAlign: "center" }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%", background: C.ink, margin: "0 auto 28px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <Clock size={24} color={C.brass} />
      </div>
      <h1 style={{ fontFamily: serif, fontSize: 32, fontWeight: 600, color: C.ink, margin: "0 0 16px" }}>
        MD Control komt hier binnenkort online
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: C.textMuted, margin: "0 0 36px" }}>
        Deze pagina wordt de inlogomgeving voor locaties en beheerders. Heeft u interesse om
        als eerste locatie mee te testen? Neem contact op met Mark van Dijk.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="mailto:info@mvdiensten.nl" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 999,
          background: C.ink, color: C.cream, fontSize: 14, fontWeight: 600,
        }}>
          <Mail size={15} /> Neem contact op
        </a>
        <BackLink onClick={onBack} label="Terug naar MD Control" />
      </div>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------
function BackLink({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: "none",
      cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 600, color: C.textMuted,
    }}>
      <ArrowLeft size={14} /> {label}
    </button>
  );
}

function SiteFooter() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.line}`, padding: "32px 48px", display: "flex",
      justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <div style={{ fontSize: 13, color: C.textMuted }}>
        © {new Date().getFullYear()} MV Diensten — Mark van Dijk
      </div>
      <div style={{ fontSize: 13, color: C.textMuted, display: "flex", alignItems: "center", gap: 6 }}>
        <Compass size={13} color={C.brass} /> mvdiensten.nl
      </div>
    </footer>
  );
}
