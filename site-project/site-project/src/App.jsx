import { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu, X, Mail, ArrowRight, CheckCircle2, Lock, Plus, Trash2,
  Newspaper, Briefcase, Code2, PenTool, BarChart3, Brain, Shield,
  Cloud, Megaphone, Smartphone, Ruler, Network, Video, Users,
  ChevronRight, LogOut, Send, Sparkles, GraduationCap, Twitter,
  Facebook, Instagram, Loader2, Building2, Settings2
} from "lucide-react";

/* ---------------------------------------------------------------
   GRAHAM ENGINEERING HUB — design tokens
   Dark tech-gradient direction, pulled from the company flier:
   near-black base, violet -> blue aurora gradients, gold + white
   from the logo used as precision accents.
----------------------------------------------------------------*/
const C = {
  bg: "#0A0B14",
  bgAlt: "#0E1020",
  panel: "rgba(255,255,255,0.035)",
  panelBorder: "rgba(255,255,255,0.09)",
  text: "#F1F2F7",
  muted: "#9096AC",
  mutedDim: "#6A7089",
  gold: "#C9A356",
  goldSoft: "rgba(201,163,86,0.16)",
  violet: "#7C6CE0",
  blue: "#4A8CE8",
};

const GRADIENT = "linear-gradient(120deg, #7C6CE0 0%, #5C7CE8 45%, #4AB8E8 100%)";

const COURSES = [
  { icon: BarChart3, title: "Data Analysis", desc: "Python, SQL, Excel & Power BI for real-world data." },
  { icon: Code2, title: "Web Development", desc: "Front-end, back-end & full-stack fundamentals." },
  { icon: PenTool, title: "Graphic Design", desc: "Photoshop, Illustrator & Canva for brand visuals." },
  { icon: Brain, title: "AI Engineering", desc: "Machine learning foundations & applied AI." },
  { icon: BarChart3, title: "Data Visualization", desc: "Turning raw data into clear, persuasive stories." },
  { icon: Sparkles, title: "UI/UX Design", desc: "Research, wireframing & interface design." },
  { icon: Shield, title: "Cybersecurity Basics", desc: "Core principles of keeping systems safe." },
  { icon: Cloud, title: "Cloud Computing", desc: "Fundamentals of cloud infrastructure & services." },
  { icon: Megaphone, title: "Digital Marketing", desc: "SEO, content & campaigns for growth." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Building apps for iOS & Android." },
  { icon: Ruler, title: "CAD / Engineering Design", desc: "Computer-aided design for engineering work." },
  { icon: Network, title: "Networking Fundamentals", desc: "How systems and devices connect & communicate." },
  { icon: Video, title: "Video Editing", desc: "Cutting, color & storytelling for video content." },
  { icon: Users, title: "Project Management", desc: "Agile & Scrum for running real projects." },
];

const SERVICES = [
  { icon: Building2, title: "Engineering Consultancy", desc: "Multi-discipline engineering expertise for your project, from concept to delivery." },
  { icon: Code2, title: "Web Design", desc: "Modern, functional websites built around your business goals." },
  { icon: PenTool, title: "Graphic Design", desc: "Professional visual identity and marketing design for business." },
  { icon: BarChart3, title: "Data Analysis", desc: "Turning your business data into decisions you can act on." },
  { icon: GraduationCap, title: "Tech Tutoring", desc: "Hands-on training in AI Engineering, Data Analysis, SQL, Python & Data Visualization." },
];

const SEED_NEWS = [
  { id: "n1", title: "Graham Engineering Hub expands tech training programs", body: "We're growing our student tutoring offering to cover more in-demand tech skills, from AI engineering to data visualization.", date: "2026-07-20", mediaType: "dashboard", stats: [{ label: "New students", value: "+34%" }, { label: "Active tracks", value: "14" }] },
  { id: "n2", title: "The rise of AI in everyday engineering workflows", body: "How engineering teams are using AI tools to speed up analysis, design iteration, and reporting.", date: "2026-07-15", mediaType: "live" },
  { id: "n3", title: "Why data visualization is now a core business skill", body: "Clear dashboards and visuals are becoming as important as the analysis behind them.", date: "2026-07-08", mediaType: "circuit" },
];

const SEED_PROJECTS = [
  { id: "p1", title: "Regional Infrastructure Assessment", body: "A multi-discipline engineering review supporting a regional infrastructure upgrade plan.", date: "2026-07-18", mediaType: "building" },
  { id: "p2", title: "Business Dashboard & Data Pipeline", body: "Design and build of a sales analytics dashboard for a growing retail business.", date: "2026-07-10", mediaType: "dashboard", stats: [{ label: "Revenue", value: "$5.2M" }, { label: "Growth", value: "+18%" }] },
  { id: "p3", title: "Corporate Brand & Web Refresh", body: "Full visual identity and website redesign for a client entering a new market.", date: "2026-06-29", mediaType: "circuit" },
];

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "training", label: "Training" },
  { id: "contact", label: "Contact" },
];

const LOGO_DATA_URI = "data:image/png;base64,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";

const SUPABASE_URL = "https://xpvivwtuxfbrrgobbfqw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_PI7MkpgIIwEnuqzsq7LDag_QldKErJg";
const WEB3FORMS_ACCESS_KEY = "86f5901c-7127-4df3-9371-3969e596f8b0";

async function sendEmail(payload) {
  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...payload }),
    });
  } catch (e) {
    // Supabase already has the record even if the email fails to send
  }
}

/* ---------------- Supabase REST helpers (no SDK needed) ---------------- */
async function sbRequest(path, { method = "GET", body, token, extraHeaders = {} } = {}) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      ...(method !== "GET" ? { Prefer: "return=representation" } : {}),
      ...extraHeaders,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try { const j = await res.json(); msg = j.message || j.error_description || msg; } catch (e) {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function sbLogin(email, password) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: SUPABASE_ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error_description || data.msg || "Login failed");
  return data; // { access_token, user, ... }
}

async function loadTable(table) {
  try {
    return await sbRequest(`/rest/v1/${table}?select=*&order=date.desc`);
  } catch (e) {
    return [];
  }
}
async function insertRow(table, row, token) {
  const [created] = await sbRequest(`/rest/v1/${table}`, { method: "POST", body: row, token });
  return created;
}
async function deleteRow(table, id, token) {
  await sbRequest(`/rest/v1/${table}?id=eq.${id}`, { method: "DELETE", token });
}
function normalizeItem(row) {
  return { id: row.id, title: row.title, body: row.body, date: row.date, mediaType: row.media_type || "none", media: row.media, stats: row.stats };
}

/* ---------------- shared UI bits ---------------- */
function Logo({ compact }) {
  return (
    <img
      src={LOGO_DATA_URI}
      alt="Graham Engineering Hub"
      style={{ height: compact ? 40 : 52, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}

function GradientText({ children, className = "", style = {} }) {
  return (
    <span
      className={className}
      style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", ...style }}
    >
      {children}
    </span>
  );
}

function Panel({ children, className = "", style = {} }) {
  return (
    <div
      className={className}
      style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 16, backdropFilter: "blur(6px)", ...style }}
    >
      {children}
    </div>
  );
}

function Button({ children, onClick, variant = "primary", type = "button", className = "", disabled }) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 px-5 py-3 rounded-full text-sm disabled:opacity-50";
  if (variant === "primary") {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${className}`}
        style={{ backgroundImage: GRADIENT, color: "#fff", boxShadow: "0 8px 24px -8px rgba(92,124,232,0.6)" }}>
        {children}
      </button>
    );
  }
  if (variant === "gold") {
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${className}`}
        style={{ background: C.gold, color: "#141418" }}>
        {children}
      </button>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${className}`}
      style={{ background: "transparent", color: C.text, border: `1px solid ${C.panelBorder}` }}>
      {children}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <span style={{ width: 26, height: 2, background: C.gold, display: "inline-block" }} />
      <span className="uppercase tracking-[0.2em] text-xs font-semibold" style={{ color: C.gold }}>{children}</span>
    </div>
  );
}

/* Background circuit / diamond motif */
function AmbientBG() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ background: C.bg }}>
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(124,108,224,0.20), transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: "55%", height: "55%", background: "radial-gradient(circle, rgba(74,140,232,0.16), transparent 70%)", filter: "blur(40px)" }} />
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="diamondGrid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 10 L110 60 L60 110 L10 60 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamondGrid)" />
      </svg>
    </div>
  );
}

/* Animated hero visual — layered engineering/tech mockup cards (no external media needed) */
function AutoVideo({ src }) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

function HeroVisual() {
  return (
    <div className="relative h-[360px] md:h-[420px] hidden sm:block">
      {/* blueprint / structural video card */}
      <Panel className="absolute top-0 left-0 w-[62%] h-[52%] overflow-hidden float-a" style={{ background: "#10121F" }}>
        <div className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full" style={{ color: "#fff", background: "rgba(0,0,0,0.4)" }}>Structural Layout · Rev 04</div>
        <AutoVideo src="/media/blueprint-live.mp4" />
      </Panel>

      {/* live dashboard video card */}
      <Panel className="absolute bottom-0 right-0 w-[62%] h-[50%] overflow-hidden float-b" style={{ background: "#10121F" }}>
        <div className="absolute top-3 left-3 z-10 flex items-center justify-between w-[calc(100%-24px)]">
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full" style={{ color: "#fff", background: "rgba(0,0,0,0.4)" }}>Project Analytics</span>
          <span className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full" style={{ color: "#fff", background: "rgba(0,0,0,0.4)" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: C.gold }} /> Live
          </span>
        </div>
        <AutoVideo src="/media/dashboard-live.mp4" />
      </Panel>

      {/* smaller code/tech video card floating on top */}
      <Panel className="absolute top-[38%] left-[28%] w-[54%] h-[26%] overflow-hidden float-c" style={{ background: "#0D0E19" }}>
        <AutoVideo src="/media/code-live.mp4" />
      </Panel>
    </div>
  );
}

/* ---------------- Rich media blocks for News / Projects ---------------- */
function MediaFrame({ children, height = 170 }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height, borderRadius: 12, background: "#0D0E19", border: `1px solid ${C.panelBorder}` }}>
      {children}
    </div>
  );
}

function BuildingIllustration() {
  return (
    <MediaFrame>
      <AutoVideo src="/media/engineering-live.mp4" />
    </MediaFrame>
  );
}

function DashboardIllustration({ stats }) {
  const bars = [55, 80, 40, 92, 60, 74, 48, 86];
  const s = stats || [{ label: "Progress", value: "72%" }, { label: "Growth", value: "+18%" }];
  return (
    <MediaFrame>
      <img src="/media/dashboard-photo.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.35 }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(13,14,25,0.55), rgba(13,14,25,0.9))" }} />
      <div className="relative p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: C.mutedDim }}>Live Dashboard</span>
          <span className="flex items-center gap-1 text-[10px]" style={{ color: C.gold }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: C.gold }} /> Live
          </span>
        </div>
        <div className="flex items-end gap-1.5 flex-1">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundImage: GRADIENT, opacity: 0.85 }} />
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          {s.map((st) => (
            <div key={st.label}>
              <div className="text-xs font-bold" style={{ color: C.text }}>{st.value}</div>
              <div className="text-[9px]" style={{ color: C.mutedDim }}>{st.label}</div>
            </div>
          ))}
        </div>
      </div>
    </MediaFrame>
  );
}

function CircuitIllustration() {
  return (
    <MediaFrame>
      <img src="/media/tech-photo.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.4 }} />
      <div className="w-full h-full relative" style={{ backgroundImage: GRADIENT, opacity: 0.75, mixBlendMode: "multiply" }} />
      <svg viewBox="0 0 400 170" className="w-full h-full absolute inset-0" opacity="0.55">
        <g stroke="#fff" strokeWidth="1.2" fill="none">
          <path d="M20 85 H120 V40 H220" />
          <path d="M20 130 H90 V150 H260" />
          <path d="M380 40 H300 V90 H240" />
          <circle cx="120" cy="85" r="4" fill="#fff" />
          <circle cx="220" cy="40" r="4" fill="#fff" />
          <circle cx="260" cy="150" r="4" fill="#fff" />
          <circle cx="240" cy="90" r="4" fill="#fff" />
        </g>
      </svg>
    </MediaFrame>
  );
}

function LiveEngineeringAnimation({ height = 170 }) {
  const bars = [45, 75, 58, 92, 66, 50, 80, 62];
  return (
    <MediaFrame height={height}>
      <div className="w-full h-full relative overflow-hidden" style={{ backgroundImage: GRADIENT }}>
        <svg viewBox="0 0 400 170" className="absolute inset-0 w-full h-full" opacity="0.55">
          <g stroke="#fff" strokeWidth="1.3" fill="none">
            <path className="flow-line" d="M10 40 H120 V90 H220 V50 H390" />
            <path className="flow-line flow-line-b" d="M10 135 H90 V150 H260 V110 H390" />
            <circle cx="120" cy="90" r="3.5" fill="#fff" />
            <circle cx="220" cy="50" r="3.5" fill="#fff" />
          </g>
        </svg>
        <div className="absolute inset-0 scan-sweep" />
        <span className="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.35)", color: "#fff" }}>
          <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: "#fff" }} /> LIVE
        </span>
        <div className="absolute top-3 right-3 gear-spin" style={{ color: "rgba(255,255,255,0.85)" }}>
          <Settings2 size={20} />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end gap-1.5" style={{ height: "42%" }}>
          {bars.map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm bar-pulse" style={{ height: `${h}%`, background: "rgba(255,255,255,0.88)", animationDelay: `${i * 0.14}s` }} />
          ))}
        </div>
      </div>
    </MediaFrame>
  );
}

function MediaBlock({ item }) {
  switch (item.mediaType) {
    case "building": return <BuildingIllustration />;
    case "dashboard": return <DashboardIllustration stats={item.stats} />;
    case "circuit": return <CircuitIllustration />;
    case "live": return <LiveEngineeringAnimation />;
    default: return null;
  }
}

/* ---------------- Live auto-updating feed (real external headlines/images) ---------------- */
function useLiveFeed(feedUrl, limit = 3) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
        const data = await res.json();
        if (cancelled) return;
        if (data.status === "ok" && Array.isArray(data.items)) {
          setItems(data.items.slice(0, limit));
          setStatus("ok");
        } else {
          setStatus("error");
        }
      } catch (e) {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => { cancelled = true; };
  }, [feedUrl, limit]);

  return { items, status };
}

function LiveNewsFeed() {
  const { items, status } = useLiveFeed("https://techcrunch.com/feed/", 3);

  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <SectionLabel>Auto-Updated · No Admin Needed</SectionLabel>
          <h2 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>Live From The Web</h2>
        </div>
        <span className="flex items-center gap-1.5 text-xs" style={{ color: C.gold }}>
          <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: C.gold }} /> Live feed
        </span>
      </div>

      {status === "loading" && <LoadingRow />}

      {status === "error" && (
        <Panel className="p-6 text-sm" style={{ color: C.muted }}>
          Couldn't load the live feed right now — this pulls real headlines from the web at page-load, so it depends on the visitor's connection. Try refreshing.
        </Panel>
      )}

      {status === "ok" && (
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <a key={i} href={it.link} target="_blank" rel="noopener noreferrer">
              <Panel className="p-4 h-full overflow-hidden hover:opacity-90 transition-opacity">
                {it.thumbnail || it.enclosure?.link ? (
                  <MediaFrame height={150}>
                    <img src={it.thumbnail || it.enclosure.link} alt="" className="w-full h-full object-cover" />
                  </MediaFrame>
                ) : (
                  <CircuitIllustration />
                )}
                <div className="p-2 pt-4">
                  <div className="text-xs mb-2" style={{ color: C.mutedDim }}>{it.pubDate ? it.pubDate.slice(0, 10) : ""}</div>
                  <div className="font-semibold text-sm leading-snug" style={{ color: C.text }}>{it.title}</div>
                </div>
              </Panel>
            </a>
          ))}
        </div>
      )}
      <p className="text-xs mt-4" style={{ color: C.mutedDim }}>Headlines and images pulled automatically from TechCrunch — refreshes each time this page loads.</p>
    </section>
  );
}

/* ---------------- Scroll reveal wrapper ---------------- */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <header className="sticky top-0 z-40" style={{ background: "rgba(10,11,20,0.82)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${C.panelBorder}` }}>
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-[88px] flex items-center justify-between">
        <button onClick={() => { setPage("home"); setMobileOpen(false); }}>
          <Logo />
        </button>
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setPage(n.id)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              style={{ color: page === n.id ? "#fff" : C.muted, background: page === n.id ? "rgba(255,255,255,0.06)" : "transparent" }}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => setPage("admin")} className="text-xs font-medium flex items-center gap-1.5" style={{ color: C.mutedDim }}>
            <Lock size={12} /> Admin
          </button>
          <Button onClick={() => setPage("contact")} className="!py-2.5 !px-4 !text-xs">Get a Quote <ArrowRight size={14} /></Button>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} style={{ color: C.text }}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden px-5 pb-5 flex flex-col gap-1" style={{ borderTop: `1px solid ${C.panelBorder}` }}>
          {[...NAV, { id: "admin", label: "Admin" }].map((n) => (
            <button
              key={n.id}
              onClick={() => { setPage(n.id); setMobileOpen(false); }}
              className="text-left px-3 py-3 rounded-lg text-sm font-medium"
              style={{ color: page === n.id ? "#fff" : C.muted, background: page === n.id ? "rgba(255,255,255,0.06)" : "transparent" }}
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------------- Footer ---------------- */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.panelBorder}` }} className="mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 grid md:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-relaxed" style={{ color: C.muted }}>
            Multi-discipline engineering consultancy and tech training hub.
          </p>
          <div className="flex items-center gap-3 mt-5">
            <Twitter size={16} style={{ color: C.mutedDim }} />
            <Facebook size={16} style={{ color: C.mutedDim }} />
            <Instagram size={16} style={{ color: C.mutedDim }} />
            <span className="text-xs" style={{ color: C.mutedDim }}>@GrahamTechHub</span>
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: C.gold }}>Company</div>
          <div className="flex flex-col gap-2.5">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => setPage(n.id)} className="text-left text-sm" style={{ color: C.muted }}>{n.label}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: C.gold }}>Services</div>
          <div className="flex flex-col gap-2.5">
            {SERVICES.map((s) => (
              <span key={s.title} className="text-sm" style={{ color: C.muted }}>{s.title}</span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: C.gold }}>Contact</div>
          <div className="flex items-center gap-2 text-sm mb-2" style={{ color: C.muted }}>
            <Mail size={14} /> grahamengineeringhub@gmail.com
          </div>
          <p className="text-sm" style={{ color: C.muted }}>Follow @GrahamTechHub for updates.</p>
        </div>
      </div>
      <div className="text-center text-xs pb-8" style={{ color: C.mutedDim }}>© 2026 Graham Engineering Hub. All rights reserved.</div>
    </footer>
  );
}

/* ---------------- Home ---------------- */
function Home({ setPage, news, projects, loading }) {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <div>
          <SectionLabel>Engineering · Technology · Training</SectionLabel>
          <h1 className="font-bold leading-[1.05]" style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)", color: C.text }}>
            Building what's next in <GradientText>engineering</GradientText> and <GradientText>technology</GradientText>.
          </h1>
          <p className="max-w-xl mt-6 text-base md:text-lg" style={{ color: C.muted }}>
            Graham Engineering Hub is a multi-discipline engineering consultancy and tech training hub — helping businesses build, and helping the next generation learn.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Button onClick={() => setPage("contact")}>Get a Quote <ArrowRight size={16} /></Button>
            <Button variant="ghost" onClick={() => setPage("training")}>View Courses</Button>
          </div>
        </div>
        <HeroVisual />
      </section>

      {/* services strip */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06}>
            <Panel className="p-5">
              <s.icon size={20} style={{ color: C.gold }} />
              <div className="mt-3 font-semibold text-sm" style={{ color: C.text }}>{s.title}</div>
            </Panel>
          </Reveal>
        ))}
      </section>

      {/* live animation */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">
          <SectionLabel>Innovation In Motion</SectionLabel>
          <h2 className="font-bold text-2xl md:text-3xl mb-6" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>
            Where engineering meets technology.
          </h2>
          <Panel className="p-2 md:p-3 overflow-hidden">
            <LiveEngineeringAnimation height={320} />
          </Panel>
        </section>
      </Reveal>

      {/* news feed */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <SectionLabel>Updated Daily</SectionLabel>
            <h2 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>Tech &amp; Engineering News</h2>
          </div>
          <Newspaper size={22} style={{ color: C.mutedDim }} />
        </div>
        {loading ? (
          <LoadingRow />
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {news.map((n, i) => (
              <Reveal key={n.id} delay={i * 0.08}>
                <Panel className="p-4 overflow-hidden">
                  <MediaBlock item={n} />
                  <div className="p-2 pt-4">
                    <div className="text-xs mb-3" style={{ color: C.mutedDim }}>{n.date}</div>
                    <div className="font-semibold mb-2" style={{ color: C.text }}>{n.title}</div>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{n.body}</p>
                  </div>
                </Panel>
              </Reveal>
            ))}
            {news.length === 0 && <EmptyNote text="No news posted yet." />}
          </div>
        )}
      </section>

      {/* live auto-updating external feed */}
      <LiveNewsFeed />

      {/* projects feed */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <SectionLabel>In Development</SectionLabel>
            <h2 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>Tech-Driven Projects</h2>
          </div>
          <Briefcase size={22} style={{ color: C.mutedDim }} />
        </div>
        {loading ? (
          <LoadingRow />
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08}>
                <Panel className="p-4 overflow-hidden">
                  <MediaBlock item={p} />
                  <div className="p-2 pt-4">
                    <div className="text-xs mb-3" style={{ color: C.mutedDim }}>{p.date}</div>
                    <div className="font-semibold mb-2" style={{ color: C.text }}>{p.title}</div>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.body}</p>
                  </div>
                </Panel>
              </Reveal>
            ))}
            {projects.length === 0 && <EmptyNote text="No projects posted yet." />}
          </div>
        )}
      </section>

      <Reveal><CTAStrip setPage={setPage} /></Reveal>
    </div>
  );
}

function LoadingRow() {
  return (
    <div className="flex items-center gap-2 py-10 justify-center" style={{ color: C.mutedDim }}>
      <Loader2 size={16} className="animate-spin" /> <span className="text-sm">Loading…</span>
    </div>
  );
}
function EmptyNote({ text }) {
  return <div className="text-sm col-span-3 py-6 text-center" style={{ color: C.mutedDim }}>{text}</div>;
}

function CTAStrip({ setPage }) {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20">
      <Panel className="p-10 md:p-14 text-center relative overflow-hidden">
        <div style={{ position: "absolute", inset: 0, background: GRADIENT, opacity: 0.08 }} />
        <h3 className="font-bold text-2xl md:text-3xl relative" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>Have a project in mind?</h3>
        <p className="mt-3 relative" style={{ color: C.muted }}>Let's talk about what you're building.</p>
        <div className="mt-6 relative">
          <Button onClick={() => setPage("contact")}>Contact Us <ArrowRight size={16} /></Button>
        </div>
      </Panel>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionLabel>About Us</SectionLabel>
      <h1 className="font-bold text-3xl md:text-5xl max-w-2xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>
        Two disciplines, <GradientText>one mission</GradientText>.
      </h1>
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        <Reveal>
        <Panel className="overflow-hidden">
          <div className="relative h-44">
            <img src="/media/construction-photo.jpeg" alt="Engineering site" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(10,11,20,0.9))" }} />
          </div>
          <div className="p-8 pt-5">
            <div className="font-semibold mb-3" style={{ color: C.gold }}>Engineering, at our core</div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Graham Engineering Hub is a multi-discipline engineering consultancy. We work across engineering
              consultancy, web design, graphic design, and data analysis, bringing a rigorous, problem-first
              approach to every client project.
            </p>
          </div>
        </Panel>
        </Reveal>
        <Reveal delay={0.1}>
        <Panel className="overflow-hidden">
          <div className="relative h-44">
            <img src="/media/engineering-photo.jpeg" alt="Engineering and tech desk" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(10,11,20,0.9))" }} />
          </div>
          <div className="p-8 pt-5">
            <div className="font-semibold mb-3" style={{ color: C.gold }}>Technology, for the next generation</div>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              Under @GrahamTechHub, we also tutor students in the tech skills shaping today's industry — AI
              engineering, data analysis, SQL, Python, and data visualization — turning our engineering
              know-how into hands-on learning.
            </p>
          </div>
        </Panel>
        </Reveal>
      </div>
      <div className="mt-10 grid sm:grid-cols-3 gap-5">
        {[
          { label: "Multi-discipline", desc: "Engineering expertise across specialties" },
          { label: "Client-first", desc: "Consultancy grounded in real business goals" },
          { label: "Teaching-driven", desc: "Sharing skills with the next generation" },
        ].map((v) => (
          <Panel key={v.label} className="p-6">
            <CheckCircle2 size={18} style={{ color: C.gold }} />
            <div className="font-semibold mt-3 text-sm" style={{ color: C.text }}>{v.label}</div>
            <div className="text-xs mt-1" style={{ color: C.muted }}>{v.desc}</div>
          </Panel>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Services ---------------- */
function Services({ setPage }) {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionLabel>What We Do</SectionLabel>
      <h1 className="font-bold text-3xl md:text-5xl max-w-2xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>
        Services built for <GradientText>real outcomes</GradientText>.
      </h1>
      <div className="grid md:grid-cols-2 gap-5 mt-10">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 4) * 0.06}>
            <Panel className="p-7 flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: C.goldSoft }}>
                <s.icon size={20} style={{ color: C.gold }} />
              </div>
              <div>
                <div className="font-semibold" style={{ color: C.text }}>{s.title}</div>
                <p className="text-sm mt-1.5 leading-relaxed" style={{ color: C.muted }}>{s.desc}</p>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Button onClick={() => setPage("contact")}>Discuss Your Project <ArrowRight size={16} /></Button>
      </div>
    </div>
  );
}

/* ---------------- Projects ---------------- */
function ProjectsPage({ projects, loading }) {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionLabel>Our Work</SectionLabel>
      <h1 className="font-bold text-3xl md:text-5xl max-w-2xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>
        Selected <GradientText>projects</GradientText>.
      </h1>
      <p className="mt-4 max-w-xl text-sm" style={{ color: C.muted }}>
        A look at engineering and tech work in progress. New projects are added regularly.
      </p>
      {loading ? <LoadingRow /> : (
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <Panel className="p-4 overflow-hidden">
                <MediaBlock item={p} />
                <div className="p-2 pt-4">
                  <div className="text-xs mb-3" style={{ color: C.mutedDim }}>{p.date}</div>
                  <div className="font-semibold mb-2" style={{ color: C.text }}>{p.title}</div>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{p.body}</p>
                </div>
              </Panel>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Training / Courses ---------------- */
function Training({ onRegister }) {
  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <SectionLabel>Student Training</SectionLabel>
      <h1 className="font-bold text-3xl md:text-5xl max-w-2xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>
        Learn the skills <GradientText>shaping tech</GradientText>.
      </h1>
      <p className="mt-4 max-w-xl text-sm" style={{ color: C.muted }}>
        Register for hands-on tutoring in any of the tracks below. Applications go straight to our admin team.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {COURSES.map((c, i) => (
          <Reveal key={c.title} delay={(i % 6) * 0.05}>
            <Panel className="p-6 flex flex-col h-full">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: C.goldSoft }}>
                <c.icon size={18} style={{ color: C.gold }} />
              </div>
              <div className="font-semibold text-sm" style={{ color: C.text }}>{c.title}</div>
              <p className="text-xs mt-1.5 flex-1 leading-relaxed" style={{ color: C.muted }}>{c.desc}</p>
              <button onClick={() => onRegister(c.title)} className="mt-4 text-xs font-semibold flex items-center gap-1 self-start" style={{ color: C.gold }}>
                Register <ChevronRight size={13} />
              </button>
            </Panel>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function RegisterModal({ course, onClose, onSubmit }) {
  const [form, setForm] = useState({ firstName: "", surname: "", email: "", device: "Laptop", statement: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.surname || !form.email) return;
    setSubmitting(true);
    await onSubmit({ ...form, course });
    setSubmitting(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(6,7,14,0.75)", backdropFilter: "blur(4px)" }}>
      <Panel className="w-full max-w-md p-7 relative max-h-[90vh] overflow-y-auto" style={{ background: "#12131F" }}>
        <button onClick={onClose} className="absolute top-5 right-5" style={{ color: C.mutedDim }}><X size={18} /></button>
        {done ? (
          <div className="text-center py-6">
            <CheckCircle2 size={36} style={{ color: C.gold }} className="mx-auto mb-4" />
            <div className="font-semibold" style={{ color: C.text }}>Application received</div>
            <p className="text-sm mt-2" style={{ color: C.muted }}>We've sent your registration for <span style={{ color: C.text }}>{course}</span> to our admin team. We'll be in touch by email.</p>
            <Button onClick={onClose} className="mt-6">Done</Button>
          </div>
        ) : (
          <>
            <div className="text-xs uppercase tracking-wider font-semibold mb-1" style={{ color: C.gold }}>Register</div>
            <div className="font-bold text-lg mb-5" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>{course}</div>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Input label="First name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} required />
                <Input label="Surname" value={form.surname} onChange={(v) => setForm({ ...form, surname: v })} required />
              </div>
              <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>What device will you use to learn?</label>
                <select
                  value={form.device}
                  onChange={(e) => setForm({ ...form, device: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.panelBorder}`, color: C.text }}
                >
                  <option>Laptop</option>
                  <option>Desktop computer</option>
                  <option>Tablet</option>
                  <option>Smartphone only</option>
                  <option>I don't have a device yet</option>
                </select>
              </div>
              <Input
                label="Why do you want to join this course?"
                value={form.statement}
                onChange={(v) => setForm({ ...form, statement: v })}
                textarea
              />
              <Button type="submit" disabled={submitting} className="mt-2 w-full">
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Submit Application <Send size={14} /></>}
              </Button>
            </form>
          </>
        )}
      </Panel>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required, textarea }) {
  const props = {
    value, required,
    onChange: (e) => onChange(e.target.value),
    className: "w-full px-4 py-3 rounded-xl text-sm outline-none",
    style: { background: "rgba(255,255,255,0.04)", border: `1px solid ${C.panelBorder}`, color: C.text },
    placeholder: label,
  };
  return (
    <div>
      <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>{label}</label>
      {textarea ? <textarea rows={4} {...props} /> : <input type={type} {...props} />}
    </div>
  );
}

/* ---------------- Contact ---------------- */
function Contact({ onSend }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await onSend(form);
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-10">
      <div>
        <SectionLabel>Get In Touch</SectionLabel>
        <h1 className="font-bold text-3xl md:text-5xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>
          Let's build <GradientText>together</GradientText>.
        </h1>
        <p className="mt-4 text-sm max-w-sm" style={{ color: C.muted }}>
          Send us a message about your project or question — it goes straight to our admin inbox.
        </p>
        <div className="mt-8 flex items-center gap-3 text-sm" style={{ color: C.muted }}>
          <Mail size={16} style={{ color: C.gold }} /> grahamengineeringhub@gmail.com
        </div>
        <div className="mt-3 flex items-center gap-3 text-sm" style={{ color: C.muted }}>
          <Twitter size={15} style={{ color: C.gold }} /> @GrahamTechHub
        </div>
      </div>
      <Panel className="p-7">
        {sent ? (
          <div className="text-center py-10">
            <CheckCircle2 size={36} style={{ color: C.gold }} className="mx-auto mb-4" />
            <div className="font-semibold" style={{ color: C.text }}>Message sent</div>
            <p className="text-sm mt-2" style={{ color: C.muted }}>Thanks for reaching out — our admin team has received it.</p>
            <Button onClick={() => setSent(false)} className="mt-6">Send another</Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Input label="Message" value={form.message} onChange={(v) => setForm({ ...form, message: v })} textarea required />
            <Button type="submit" disabled={sending} className="w-full mt-1">
              {sending ? <Loader2 size={16} className="animate-spin" /> : <>Send Message <Send size={14} /></>}
            </Button>
          </form>
        )}
      </Panel>
    </div>
  );
}

/* ---------------- Admin ---------------- */
function Admin({ news, setNews, projects, setProjects }) {
  const [session, setSession] = useState(null); // { token, email }
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState("news");
  const [newItem, setNewItem] = useState({ title: "", body: "", mediaType: "none", media: "" });
  const [saving, setSaving] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingInbox, setLoadingInbox] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setErr("");
    setLoggingIn(true);
    try {
      const data = await sbLogin(email, pw);
      setSession({ token: data.access_token, email: data.user?.email || email });
    } catch (e2) {
      setErr(e2.message || "Login failed.");
    }
    setLoggingIn(false);
  };

  useEffect(() => {
    if (!session) return;
    (async () => {
      setLoadingInbox(true);
      try {
        const [r, m] = await Promise.all([
          sbRequest("/rest/v1/registrations?select=*&order=date.desc", { token: session.token }),
          sbRequest("/rest/v1/messages?select=*&order=date.desc", { token: session.token }),
        ]);
        setRegistrations(r); setMessages(m);
      } catch (e) { /* leave empty on failure */ }
      setLoadingInbox(false);
    })();
  }, [session]);

  const addItem = async (list, setList, table) => {
    if (!newItem.title || !newItem.body || !session) return;
    setSaving(true);
    try {
      const created = await insertRow(table, {
        title: newItem.title,
        body: newItem.body,
        media_type: newItem.mediaType,
        media: newItem.media || null,
      }, session.token);
      setList([normalizeItem(created), ...list]);
      setNewItem({ title: "", body: "", mediaType: "none", media: "" });
    } catch (e) {
      setErr(e.message || "Couldn't publish — check you're logged in.");
    }
    setSaving(false);
  };

  const removeItem = async (list, setList, table, id) => {
    if (!session) return;
    try {
      await deleteRow(table, id, session.token);
      setList(list.filter((x) => x.id !== id));
    } catch (e) { /* no-op */ }
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto px-5 py-24">
        <Panel className="p-8">
          <Lock size={22} style={{ color: C.gold }} />
          <div className="font-bold text-xl mt-4" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>Admin Login</div>
          <p className="text-xs mt-1 mb-6" style={{ color: C.mutedDim }}>Sign in with the admin account created in Supabase Authentication.</p>
          <form onSubmit={login} className="flex flex-col gap-3">
            <Input label="Email" type="email" value={email} onChange={setEmail} required />
            <Input label="Password" type="password" value={pw} onChange={setPw} required />
            {err && <div className="text-xs" style={{ color: "#F87171" }}>{err}</div>}
            <Button type="submit" disabled={loggingIn} className="w-full mt-1">
              {loggingIn ? <Loader2 size={16} className="animate-spin" /> : "Log In"}
            </Button>
          </form>
        </Panel>
      </div>
    );
  }

  const tabs = [
    { id: "news", label: "News", count: news.length },
    { id: "projects", label: "Projects", count: projects.length },
    { id: "registrations", label: "Course Applications", count: registrations.length },
    { id: "messages", label: "Messages", count: messages.length },
  ];

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
      <div className="flex items-center justify-between mb-8">
        <div>
          <SectionLabel>Admin Dashboard</SectionLabel>
          <h1 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: "Sora, sans-serif", color: C.text }}>Manage Site Content</h1>
        </div>
        <button onClick={() => setSession(null)} className="text-xs font-medium flex items-center gap-1.5" style={{ color: C.mutedDim }}>
          <LogOut size={13} /> Log out
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="px-4 py-2 rounded-full text-xs font-semibold"
            style={{ background: tab === t.id ? C.gold : "rgba(255,255,255,0.05)", color: tab === t.id ? "#141418" : C.muted }}>
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {(tab === "news" || tab === "projects") && (
        <div>
          <Panel className="p-6 mb-6">
            <div className="font-semibold text-sm mb-4" style={{ color: C.text }}>
              Add {tab === "news" ? "news item" : "project"}
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <Input label="Title" value={newItem.title} onChange={(v) => setNewItem({ ...newItem, title: v })} />
              <Input label="Description" value={newItem.body} onChange={(v) => setNewItem({ ...newItem, body: v })} />
            </div>
            <div className="grid md:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="text-xs font-medium mb-1.5 block" style={{ color: C.muted }}>Media style</label>
                <select
                  value={newItem.mediaType}
                  onChange={(e) => setNewItem({ ...newItem, mediaType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${C.panelBorder}`, color: C.text }}
                >
                  <option value="none">Text only</option>
                  <option value="dashboard">Live dashboard graphic</option>
                  <option value="building">Building / structural graphic</option>
                  <option value="circuit">Tech / circuit graphic</option>
                  <option value="live">Live animation (engineering &amp; tech)</option>
                </select>
              </div>
            </div>
            <Button
              className="mt-4"
              disabled={saving}
              onClick={() => tab === "news" ? addItem(news, setNews, "news") : addItem(projects, setProjects, "projects")}
            >
              {saving ? <Loader2 size={15} className="animate-spin" /> : <><Plus size={15} /> Publish</>}
            </Button>
          </Panel>
          <div className="flex flex-col gap-3">
            {(tab === "news" ? news : projects).map((item) => (
              <Panel key={item.id} className="p-5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs" style={{ color: C.mutedDim }}>{item.date}</span>
                    {item.mediaType && item.mediaType !== "none" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: C.goldSoft, color: C.gold }}>{item.mediaType}</span>
                    )}
                  </div>
                  <div className="font-semibold text-sm" style={{ color: C.text }}>{item.title}</div>
                  <div className="text-xs mt-1" style={{ color: C.muted }}>{item.body}</div>
                </div>
                <button onClick={() => tab === "news" ? removeItem(news, setNews, "news", item.id) : removeItem(projects, setProjects, "projects", item.id)} style={{ color: C.mutedDim }}>
                  <Trash2 size={15} />
                </button>
              </Panel>
            ))}
          </div>
        </div>
      )}

      {loadingInbox && (tab === "registrations" || tab === "messages") && <LoadingRow />}

      {tab === "registrations" && (
        <div className="flex flex-col gap-3">
          {registrations.length === 0 && <EmptyNote text="No course applications yet." />}
          {registrations.map((r) => (
            <Panel key={r.id} className="p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm" style={{ color: C.text }}>{r.first_name ? `${r.first_name} ${r.surname || ""}` : r.name}</div>
                <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: C.goldSoft, color: C.gold }}>{r.course}</span>
              </div>
              <div className="text-xs mt-1.5" style={{ color: C.muted }}>{r.email}{r.device ? ` · ${r.device}` : ""}</div>
              {r.statement && <p className="text-xs mt-2 leading-relaxed" style={{ color: C.muted }}>"{r.statement}"</p>}
              <div className="text-xs mt-2" style={{ color: C.mutedDim }}>{r.date}</div>
            </Panel>
          ))}
        </div>
      )}

      {tab === "messages" && (
        <div className="flex flex-col gap-3">
          {messages.length === 0 && <EmptyNote text="No messages yet." />}
          {messages.map((m) => (
            <Panel key={m.id} className="p-5">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-sm" style={{ color: C.text }}>{m.name}</div>
                <span className="text-xs" style={{ color: C.mutedDim }}>{m.date}</span>
              </div>
              <div className="text-xs mt-1" style={{ color: C.muted }}>{m.email}</div>
              <div className="text-sm mt-2" style={{ color: C.text }}>{m.message}</div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Root App ---------------- */
export default function App() {
  const [page, setPage] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registerCourse, setRegisterCourse] = useState(null);

  useEffect(() => {
    (async () => {
      const [n, p] = await Promise.all([loadTable("news"), loadTable("projects")]);
      setNews(n.length ? n.map(normalizeItem) : SEED_NEWS);
      setProjects(p.length ? p.map(normalizeItem) : SEED_PROJECTS);
      setLoading(false);
    })();
  }, []);

  const submitRegistration = useCallback(async (data) => {
    const row = {
      name: `${data.firstName} ${data.surname}`.trim(),
      first_name: data.firstName,
      surname: data.surname,
      email: data.email,
      device: data.device || null,
      statement: data.statement || null,
      course: data.course,
    };
    try {
      const created = await insertRow("registrations", row);
      setRegistrations((prev) => [created, ...prev]);
    } catch (e) {
      setRegistrations((prev) => [{ id: `local-${Date.now()}`, ...row, date: new Date().toISOString().slice(0, 10) }, ...prev]);
    }
    sendEmail({
      subject: `New course application: ${data.course}`,
      from_name: `${data.firstName} ${data.surname}`,
      email: data.email,
      Course: data.course,
      Device: data.device,
      Statement: data.statement || "(none provided)",
    });
  }, []);

  const submitMessage = useCallback(async (data) => {
    const row = { name: data.name, email: data.email, message: data.message };
    try {
      const created = await insertRow("messages", row);
      setMessages((prev) => [created, ...prev]);
    } catch (e) {
      setMessages((prev) => [{ id: `local-${Date.now()}`, ...row, date: new Date().toISOString().slice(0, 10) }, ...prev]);
    }
    sendEmail({
      subject: `New contact message from ${data.name}`,
      from_name: data.name,
      email: data.email,
      Message: data.message,
    });
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        ::selection { background: rgba(124,108,224,0.35); }
        input::placeholder, textarea::placeholder { color: #5A6079; }
        @keyframes floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes floatB { 0%,100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
        @keyframes floatC { 0%,100% { transform: translateY(-4px); } 50% { transform: translateY(6px); } }
        @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        .float-a { animation: floatA 6s ease-in-out infinite; }
        .float-b { animation: floatB 7s ease-in-out infinite; }
        .float-c { animation: floatC 5s ease-in-out infinite; }
        .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }
        @keyframes dashFlow { to { stroke-dashoffset: -40; } }
        .flow-line { stroke-dasharray: 6 6; animation: dashFlow 1.3s linear infinite; }
        .flow-line-b { animation-duration: 1.7s; animation-direction: reverse; }
        @keyframes gearSpin { to { transform: rotate(360deg); } }
        .gear-spin { animation: gearSpin 5s linear infinite; }
        @keyframes barPulse { 0%,100% { transform: scaleY(0.65); } 50% { transform: scaleY(1); } }
        .bar-pulse { transform-origin: bottom; animation: barPulse 1.1s ease-in-out infinite; }
        @keyframes scanSweep { 0% { transform: translateY(-100%); opacity: 0; } 15% { opacity: 0.4; } 85% { opacity: 0.4; } 100% { transform: translateY(220%); opacity: 0; } }
        .scan-sweep { background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.28), transparent); height: 35%; animation: scanSweep 3.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .float-a, .float-b, .float-c, .pulse-dot, .flow-line, .gear-spin, .bar-pulse, .scan-sweep { animation: none; }
        }
      `}</style>
      <AmbientBG />
      <Nav page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {page === "home" && <Home setPage={setPage} news={news} projects={projects} loading={loading} />}
      {page === "about" && <About />}
      {page === "services" && <Services setPage={setPage} />}
      {page === "projects" && <ProjectsPage projects={projects} loading={loading} />}
      {page === "training" && <Training onRegister={setRegisterCourse} />}
      {page === "contact" && <Contact onSend={submitMessage} />}
      {page === "admin" && (
        <Admin
          news={news} setNews={setNews}
          projects={projects} setProjects={setProjects}
        />
      )}

      {page !== "admin" && <Footer setPage={setPage} />}

      {registerCourse && (
        <RegisterModal
          course={registerCourse}
          onClose={() => setRegisterCourse(null)}
          onSubmit={submitRegistration}
        />
      )}
    </div>
  );
}
