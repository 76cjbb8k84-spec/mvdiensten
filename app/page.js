"use client";

import { useState } from "react";
import {
  ArrowRight, ArrowUpRight, Thermometer, Users2, LineChart,
  Mail, Lock, Radio, CalendarRange, ShieldCheck, Gauge,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens
// ---------------------------------------------------------------------------
const C = {
  ink: "#13211F",
  paper: "#F6F3EB",
  paperSoft: "#EFEBE0",
  panel: "#192823",
  panelLight: "#22352F",
  terracotta: "#C9622C",
  terracottaSoft: "rgba(201,98,44,0.14)",
  green: "#3D5C52",
  greenSoft: "rgba(61,92,82,0.12)",
  greenLight: "#7CA591",
  grey: "#8E876F",
  border: "rgba(19,33,31,0.09)",
  borderDark: "rgba(245,242,234,0.1)",
};

const display = "'Fraunces', 'Iowan Old Style', Georgia, serif";
const sans = "'Inter', system-ui, -apple-system, sans-serif";
const mono = "'IBM Plex Mono', 'Courier New', monospace";

const FONT_IMPORT = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
    * { box-sizing: border-box; }
    html, body { margin: 0; }
    a { text-decoration: none; }
    button { font-family: inherit; }
    ::selection { background: ${C.terracotta}; color: white; }

    .grain {
      position: fixed; inset: 0; pointer-events: none; z-index: 1;
      opacity: 0.5; mix-blend-mode: overlay;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
    }
    .tile { transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, background 0.25s ease; }
    .tile:hover { transform: translateY(-3px); }
    .feature-row { transition: background 0.25s ease; }
    @media (prefers-reduced-motion: reduce) {
      .tile, .feature-row { transition: none !important; }
      .tile:hover { transform: none; }
    }
  `}</style>
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const SERVICES = [
  {
    id: "control",
    code: "01",
    name: "MD Control",
    category: "Software",
    line: "Taken, temperatuur en schoonmaak per outlet, automatisch ingepland en centraal gecontroleerd.",
    status: "live",
  },
  {
    id: "advies",
    code: "02",
    name: "Sourcing & Concepting",
    category: "Consultancy",
    line: "Inkoop, marge en conceptontwikkeling voor hospitality-organisaties met meerdere vestigingen.",
    status: "soon",
  },
  {
    id: "interim",
    code: "03",
    name: "Interim Operations",
    category: "Inzet op locatie",
    line: "Tijdelijk operationeel leiderschap voor organisaties die snel iemand nodig hebben die de vloer kent.",
    status: "soon",
  },
];

const OUTLET_PREVIEW = [
  { name: "Hotel Amstel View", pct: 96, state: "ok" },
  { name: "Hotel Maasoever", pct: 88, state: "ok" },
  { name: "Beach Club Noord", pct: 61, state: "warn" },
  { name: "Brasserie Kade 7", pct: 100, state: "ok" },
];

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export default function App() {
  const [page, setPage] = useState("home"); // home | control | soon

  return (
    <div style={{
      fontFamily: sans, minHeight: "100vh", color: C.ink, position: "relative",
      background: `
        radial-gradient(ellipse 900px 600px at 15% -10%, rgba(61,92,82,0.07), transparent 60%),
        radial-gradient(ellipse 700px 500px at 100% 20%, rgba(201,98,44,0.05), transparent 55%),
        ${C.paper}
      `,
    }}>
      {FONT_IMPORT}
      <div className="grain" />
      <div style={{ position: "relative", zIndex: 2 }}>
        <NavBar setPage={setPage} />
        {page === "home" && <Home onOpenControl={() => setPage("control")} />}
        {page === "control" && <ControlInfo onBack={() => setPage("home")} onEnter={() => setPage("soon")} />}
        {page === "soon" && <ComingSoon onBack={() => setPage("control")} />}
        <SiteFooter />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------
function NavBar({ setPage }) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "30px 56px",
    }}>
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <span style={{ fontFamily: display, fontSize: 21, fontWeight: 600, color: C.ink, letterSpacing: "-0.01em" }}>
          MVDiensten
        </span>
      </button>
      <a href="mailto:info@mvdiensten.nl" style={{
        display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 600,
        color: C.ink, padding: "9px 6px",
      }}>
        Contact <ArrowUpRight size={14} />
      </a>
    </header>
  );
}

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------
function Home({ onOpenControl }) {
  return (
    <main>
      {/* Hero with live-feeling dashboard preview */}
      <section style={{ padding: "64px 56px 0", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, fontFamily: mono, fontSize: 11.5, fontWeight: 500,
              letterSpacing: "0.09em", color: C.green, marginBottom: 32,
            }}>
              <span style={{ width: 16, height: 1, background: C.green, display: "inline-block" }} />
              ÉÉN OUTLET OF TIEN. ALTIJD GRIP.
            </div>
            <h1 style={{
              fontFamily: display, fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 600, lineHeight: 1.06,
              color: C.ink, margin: "0 0 28px", letterSpacing: "-0.015em",
            }}>
              Eén overzicht.<br />Elke outlet,<br />elke dag.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#4F4A3F", maxWidth: 440, margin: "0 0 0" }}>
              MVDiensten bouwt software en levert expertise voor hospitality met een of
              meerdere F&amp;B-outlets — om de operatie te sturen in plaats van te volgen.
            </p>
          </div>

          {/* Signature element: live-feeling outlet status panel */}
          <DashboardPreview />
        </div>
      </section>

      {/* Service register — numbered tiles, sequence is meaningful (01 live, rest planned) */}
      <section style={{ padding: "150px 56px 140px", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 8 }}>
          <h2 style={{ fontFamily: display, fontSize: 25, fontWeight: 600, color: C.ink, margin: 0, letterSpacing: "-0.01em" }}>
            Wat we bouwen en leveren
          </h2>
          <span style={{ fontFamily: mono, fontSize: 12, color: C.grey }}>03 modules</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <ServiceTile key={s.id} service={s} onClick={s.id === "control" ? onOpenControl : undefined} />
          ))}
        </div>
      </section>
    </main>
  );
}

function DashboardPreview() {
  return (
    <div style={{
      background: `linear-gradient(165deg, ${C.panelLight}, ${C.panel})`,
      borderRadius: 16, padding: "26px 26px 22px", position: "relative",
      boxShadow: "0 2px 4px rgba(19,33,31,0.06), 0 16px 32px -12px rgba(19,33,31,0.28), 0 40px 80px -30px rgba(19,33,31,0.35)",
      border: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontFamily: mono, fontSize: 10.5, color: "rgba(245,242,234,0.5)", letterSpacing: "0.07em" }}>
          OUTLETS · VANDAAG
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: mono, fontSize: 10.5, color: C.greenLight }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: C.greenLight,
            boxShadow: `0 0 0 4px rgba(124,165,145,0.18)`,
          }} /> LIVE
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        {OUTLET_PREVIEW.map((o) => (
          <div key={o.name} style={{ display: "flex", alignItems: "center", gap: 13 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
              background: o.state === "warn" ? C.terracotta : C.greenLight,
            }} />
            <span style={{ color: "#EDE9DD", fontSize: 13, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {o.name}
            </span>
            <div style={{ width: 70, height: 5, borderRadius: 999, background: "rgba(245,242,234,0.1)", overflow: "hidden" }}>
              <div style={{
                width: `${o.pct}%`, height: "100%", borderRadius: 999,
                background: o.state === "warn" ? C.terracotta : C.greenLight,
              }} />
            </div>
            <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(245,242,234,0.55)", width: 32, textAlign: "right" }}>{o.pct}%</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.borderDark}`, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: mono, fontSize: 10.5, color: "rgba(245,242,234,0.4)" }}>1 afwijking gesignaleerd</span>
        <span style={{ fontFamily: mono, fontSize: 10.5, color: "rgba(245,242,234,0.4)" }}>4 outlets</span>
      </div>
    </div>
  );
}

function ServiceTile({ service, onClick }) {
  const { code, name, category, line, status } = service;
  const clickable = !!onClick;
  return (
    <button
      className="tile"
      onClick={onClick}
      disabled={!clickable}
      style={{
        textAlign: "left", padding: "30px 26px", background: C.paperSoft,
        border: `1px solid ${clickable ? "rgba(61,92,82,0.18)" : C.border}`, borderRadius: 14,
        cursor: clickable ? "pointer" : "default",
        display: "flex", flexDirection: "column", minHeight: 210,
        boxShadow: clickable
          ? "0 1px 2px rgba(19,33,31,0.04), 0 8px 20px -10px rgba(19,33,31,0.12)"
          : "0 1px 2px rgba(19,33,31,0.03)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontFamily: display, fontSize: 15, color: C.grey, fontWeight: 500 }}>{code}</span>
        <span style={{
          fontFamily: mono, fontSize: 9.5, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase",
          color: status === "live" ? C.green : C.grey,
          padding: "4px 9px", borderRadius: 99,
          background: status === "live" ? C.greenSoft : "rgba(142,135,111,0.12)",
        }}>
          {status === "live" ? "Actief" : "Gepland"}
        </span>
      </div>
      <div style={{ fontFamily: mono, fontSize: 11, color: C.terracotta, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>
        {category}
      </div>
      <div style={{ fontFamily: display, fontSize: 21, fontWeight: 600, color: C.ink, marginBottom: 12, letterSpacing: "-0.005em" }}>
        {name}
      </div>
      <div style={{ fontSize: 14, color: "#5F594C", lineHeight: 1.6, flex: 1 }}>{line}</div>
      {clickable && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: C.ink, marginTop: 18 }}>
          Bekijken <ArrowRight size={13} />
        </div>
      )}
    </button>
  );
}

// ---------------------------------------------------------------------------
// MD CONTROL — info page
// ---------------------------------------------------------------------------
function ControlInfo({ onBack, onEnter }) {
  return (
    <main style={{ maxWidth: 1140, margin: "0 auto", padding: "0 56px 140px" }}>
      <div style={{ padding: "36px 0 0" }}>
        <BackLink onClick={onBack} label="Alle modules" />
      </div>

      {/* Header block */}
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 80, alignItems: "center", padding: "32px 0 88px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <span style={{ width: 16, height: 1, background: C.terracotta, display: "inline-block" }} />
            <span style={{ fontFamily: mono, fontSize: 11, color: C.terracotta, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              01 · Software · Actief
            </span>
          </div>
          <h1 style={{ fontFamily: display, fontSize: "clamp(36px, 4.2vw, 52px)", fontWeight: 600, color: C.ink, margin: "0 0 24px", letterSpacing: "-0.015em", lineHeight: 1.08 }}>
            MD Control
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: "#4F4A3F", maxWidth: 460, margin: 0 }}>
            Taken, temperatuurcontrole en schoonmaak voor elke locatie. Automatisch ingepland,
            centraal gecontroleerd, klaar voor inspectie op elk gewenst moment.
          </p>
        </div>
        <DashboardPreview />
      </div>

      {/* Asymmetric stat-led rows instead of equal cards */}
      <div>
        <FeatureRow num="01" title="Automatisch ingepland"
          text="Elke locatie krijgt op het juiste moment de juiste taak. Geen briefing, geen Excel, geen WhatsApp-groep om bij te houden wie wat moet doen."
          icon={CalendarRange} />
        <FeatureRow num="02" title="Eén centraal beeld"
          text="Vanaf het hoofdkantoor ziet u per outlet welke taken op schema liggen en welke achterblijven, voordat het een patroon wordt."
          icon={LineChart} />
        <FeatureRow num="03" title="Afwijking, direct gemeld"
          text="Temperatuur buiten norm of een taak te laat? Het systeem meldt het direct, niet bij de volgende controleronde."
          icon={Thermometer} />
        <FeatureRow num="04" title="Klaar voor inspectie"
          text="Elke registratie staat vast met tijd, locatie en uitkomst. Geen rommelige map met papier wanneer de controleur voor de deur staat."
          icon={ShieldCheck} />
        <FeatureRow num="05" title="Rollen per gebruiker"
          text="Medewerkers zien hun eigen taken. Locatiemanagers zien hun eigen vestiging. Niemand ziet meer dan nodig is voor zijn rol."
          icon={Users2} />
        <FeatureRow num="06" title="Klaar voor sensoren"
          text="Begin met handmatige invoer. Schakel later over op automatische temperatuurmeting per koelcel, zonder het systeem te wisselen."
          icon={Radio} last />
      </div>

      {/* CTA */}
      <div style={{
        background: `linear-gradient(165deg, ${C.panelLight}, ${C.panel})`,
        borderRadius: 16, padding: "44px 48px", display: "flex",
        flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, marginTop: 72,
        boxShadow: "0 20px 50px -20px rgba(19,33,31,0.3)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div>
          <div style={{ fontFamily: display, color: C.paper, fontSize: 22, fontWeight: 600, marginBottom: 7 }}>
            Toegang voor locaties en beheerders
          </div>
          <div style={{ color: "rgba(245,242,234,0.55)", fontSize: 14 }}>
            Voor gebruikers met een actief MD Control-account.
          </div>
        </div>
        <button onClick={onEnter} style={{
          display: "flex", alignItems: "center", gap: 9, padding: "14px 26px", borderRadius: 99,
          background: C.terracotta, border: "none", color: C.paper, fontSize: 14, fontWeight: 700, cursor: "pointer",
          whiteSpace: "nowrap", boxShadow: "0 8px 20px -6px rgba(201,98,44,0.5)",
        }}>
          <Lock size={14} /> Inloggen <ArrowRight size={14} />
        </button>
      </div>
    </main>
  );
}

function FeatureRow({ num, title, text, icon: Icon, last }) {
  return (
    <div className="feature-row" style={{
      display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center",
      padding: "36px 8px", borderBottom: last ? "none" : `1px solid ${C.border}`,
      borderRadius: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontFamily: display, fontSize: 48, fontWeight: 600, color: "rgba(19,33,31,0.13)", lineHeight: 1, width: 56 }}>
          {num}
        </span>
        <div style={{
          width: 46, height: 46, borderRadius: 12, background: C.greenSoft,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={20} color={C.green} />
        </div>
      </div>
      <div>
        <div style={{ fontFamily: display, fontSize: 21, fontWeight: 600, color: C.ink, marginBottom: 9, letterSpacing: "-0.005em" }}>
          {title}
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#5F594C", margin: 0, maxWidth: 460 }}>{text}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COMING SOON — destination of the login button
// ---------------------------------------------------------------------------
function ComingSoon({ onBack }) {
  return (
    <main style={{ maxWidth: 580, margin: "0 auto", padding: "140px 56px 160px", textAlign: "center" }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14, background: `linear-gradient(165deg, ${C.panelLight}, ${C.panel})`,
        margin: "0 auto 32px", display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 14px 32px -12px rgba(19,33,31,0.3)",
      }}>
        <Gauge size={24} color={C.terracotta} />
      </div>
      <h1 style={{ fontFamily: display, fontSize: 30, fontWeight: 600, color: C.ink, margin: "0 0 16px", letterSpacing: "-0.01em" }}>
        MD Control komt hier binnenkort online
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.65, color: "#5F594C", margin: "0 0 36px" }}>
        Deze pagina wordt de inlogomgeving voor locaties en beheerders. Interesse om als eerste
        organisatie mee te testen? Neem contact op.
      </p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="mailto:info@mvdiensten.nl" style={{
          display: "flex", alignItems: "center", gap: 8, padding: "13px 24px", borderRadius: 99,
          background: C.ink, color: C.paper, fontSize: 14, fontWeight: 600,
        }}>
          <Mail size={14} /> Neem contact op
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
      cursor: "pointer", padding: "8px 0", fontSize: 13.5, fontWeight: 600, color: C.grey,
    }}>
      ← {label}
    </button>
  );
}

function SiteFooter() {
  return (
    <footer style={{
      borderTop: `1px solid ${C.border}`, padding: "32px 56px", display: "flex",
      justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
    }}>
      <div style={{ fontFamily: mono, fontSize: 12, color: C.grey }}>
        © {new Date().getFullYear()} MVDiensten
      </div>
      <div style={{ fontFamily: mono, fontSize: 12, color: C.grey }}>
        mvdiensten.nl
      </div>
    </footer>
  );
}
