/*
 * RRS Website — "Void Monolith" Design
 * Brand Bible: Deep Void Black (#05070a), Midnight Navy (#0a0e1a),
 * Electric Blue (#00d4ff), White (#ffffff), Steel Gray (#a0aab5)
 * Typography: Montserrat (300-900), JetBrains Mono for stats
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageSquare,
  PhoneMissed,
  Database,
  RefreshCw,
  Target,
  BarChart3,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  Building2,
  Wrench,
  Landmark,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// CDN URLs
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/hero_bg-CfpUPAcwvxhhV57hxf95nW.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/dashboard_mockup-L4YMtWk7ihCevE8W5xRSuG.webp";
const MOBILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/mobile_chat-924frS6Jh5zgkEafDqUweX.webp";

// Team Headshots
const CHUCK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/chuck_headshot_cc9c5ae5.jpg";
const DARIUS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/darius_headshot_b8b97158.jpg";
const LARRY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/larry_headshot_7676779a.jpg";
const STEPHANIE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/stephanie_headshot_19786506.jpg";

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Section Wrapper with fade-in ─── */
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Relay Line Divider ─── */
function RelayLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="w-full overflow-hidden py-1">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="relay-line w-full origin-left"
      />
    </div>
  );
}

/* ─── Navigation ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Features", href: "#features" },
    { label: "Results", href: "#results" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "Calculator", href: "/calculator" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#05070a]/95 backdrop-blur-md border-b border-white/5" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18 lg:h-24">
        <a href="#" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="RRS" className="h-12 lg:h-16 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-extrabold text-sm sm:text-base lg:text-xl tracking-wide">REVENUE RELAY</span>
            <span className="text-[#00d4ff] font-bold text-xs sm:text-sm lg:text-base tracking-[0.15em]">SYSTEMS</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="ml-4 px-6 py-2.5 border border-[#00d4ff] text-[#00d4ff] text-sm font-semibold tracking-wide uppercase hover:bg-[#00d4ff] hover:text-[#05070a] transition-all duration-300">
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#05070a]/98 backdrop-blur-md border-b border-white/5 px-6 pb-6"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block py-3 text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 block text-center px-6 py-2.5 border border-[#00d4ff] text-[#00d4ff] text-sm font-semibold tracking-wide uppercase">
            Get Started
          </a>
        </motion.div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#05070a" }}>
      {/* Background image with low opacity */}
      <div className="absolute inset-0 opacity-30">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/40 via-transparent to-[#05070a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            Revenue Infrastructure
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-black text-white leading-[0.95] tracking-[-0.03em] mb-8">
            Never Miss<br />
            Another<br />
            <span className="text-[#00d4ff]">Opportunity.</span>
          </h1>
          <p className="text-[#a0aab5] text-lg lg:text-xl font-light max-w-xl leading-relaxed mb-12">
            AI-powered engagement that captures every lead, responds instantly, and converts interactions into revenue — 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300">
              Start Capturing Revenue <ArrowRight size={18} />
            </a>
            <a href="#solution" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium text-sm tracking-wide uppercase hover:border-white/40 transition-colors duration-300">
              See How It Works <ChevronDown size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Problem Section ─── */
function Problem() {
  const stats = [
    { number: 28, suffix: "%", label: "of business calls go unanswered every day" },
    { prefix: "$", number: 126, suffix: "K+", label: "lost per year from missed calls alone" },
    { number: 80, suffix: "%", label: "conversion drop when response exceeds 5 minutes" },
  ];

  return (
    <Section id="problem" className="py-28 lg:py-40" >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">The Problem</p>
            <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Your Business Is Losing Money Right Now.
            </h2>
            <p className="text-[#a0aab5] text-lg font-light leading-relaxed">
              Every missed call, slow follow-up, and disconnected tool is a customer walking away. The revenue is there — you're just not capturing it.
            </p>
          </div>

          {/* Right: Stats */}
          <div className="space-y-10 lg:pt-4">
            {stats.map((stat, i) => (
              <div key={i} className="border-l-2 border-[#00d4ff]/30 pl-6">
                <div className="stat-number text-4xl lg:text-5xl mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} prefix={stat.prefix || ""} />
                </div>
                <p className="text-[#a0aab5] text-base font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Solution Section ─── */
function Solution() {
  return (
    <Section id="solution" className="py-28 lg:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Dashboard image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <img
              src={DASHBOARD_IMG}
              alt="RRS Dashboard"
              className="w-full max-w-lg mx-auto lg:mx-0 opacity-90"
            />
          </motion.div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">The Solution</p>
            <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6">
              One System.<br />Every Channel.<br />Every Opportunity.
            </h2>
            <p className="text-[#a0aab5] text-lg font-light leading-relaxed mb-8">
              Revenue Relay Systems captures every inbound lead across calls, texts, chat, email, and web — then responds instantly, follows up automatically, and converts it into revenue.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Phone, text: "Calls" },
                { icon: MessageSquare, text: "SMS & Chat" },
                { icon: Mail, text: "Email" },
                { icon: Calendar, text: "Scheduling" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <item.icon size={18} className="text-[#00d4ff]" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── How It Works Section ─── */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Lead Comes In", desc: "Call, text, chat, web form, or ad click" },
    { num: "02", title: "AI Responds", desc: "Personalized conversation in seconds" },
    { num: "03", title: "CRM Captures", desc: "Every detail logged automatically" },
    { num: "04", title: "Follow-Up Fires", desc: "Automated sequences keep it going" },
    { num: "05", title: "Conversion", desc: "Appointments booked, deals closed" },
    { num: "06", title: "Retargeting", desc: "Re-engage to maximize lifetime value" },
  ];

  return (
    <Section id="how" className="py-28 lg:py-40 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">How It Works</p>
        <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-16">
          From Lead to Revenue<br />in Six Steps.
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="stat-number text-5xl lg:text-6xl opacity-20">{step.num}</span>
              <h3 className="text-white text-xl font-bold mt-2 mb-2">{step.title}</h3>
              <p className="text-[#a0aab5] text-sm font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Features Section ─── */
function Features() {
  const features = [
    { icon: MessageSquare, title: "AI Chat + SMS", desc: "Engage customers instantly on their preferred channel." },
    { icon: PhoneMissed, title: "Missed Call Recovery", desc: "Never lose a lead to a missed call again." },
    { icon: Database, title: "CRM Auto-Logging", desc: "Every interaction captured without lifting a finger." },
    { icon: RefreshCw, title: "Automated Follow-Ups", desc: "Persistent, personalized outreach on autopilot." },
    { icon: Target, title: "Smart Retargeting", desc: "Bring back leads who didn't convert the first time." },
    { icon: BarChart3, title: "Performance Analytics", desc: "See exactly what's working and what's not." },
  ];

  return (
    <Section id="features" className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Core Capabilities</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            Everything You Need.<br />Nothing You Don't.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group"
            >
              <div className="w-12 h-12 flex items-center justify-center border border-[#00d4ff]/20 mb-5 group-hover:border-[#00d4ff]/60 transition-colors duration-300">
                <f.icon size={22} className="text-[#00d4ff]" />
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-[#a0aab5] text-sm font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── AI Layer Section ─── */
function AILayer() {
  return (
    <Section className="py-28 lg:py-40 bg-[#0a0e1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">The AI Layer</p>
            <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Your Best Employee That Never Sleeps.
            </h2>
            <div className="space-y-5 mt-8">
              {[
                "Natural, human-like conversations — not robotic scripts",
                "Personalized responses based on customer context",
                "Available 24/7 — nights, weekends, holidays",
                "Learns and improves with every interaction",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#00d4ff] mt-0.5 shrink-0" />
                  <span className="text-[#a0aab5] text-base font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img
              src={MOBILE_IMG}
              alt="AI Chat Interface"
              className="w-64 lg:w-72 opacity-90"
            />
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Revenue Impact Calculator Section ─── */
const industries = [
  {
    icon: ShoppingCart,
    label: "Retail / Grocery",
    lostLabel: "LOST DAILY",
    lostAmount: "$10,000",
    lostDetail: "500 customers × $20 missed upsell per cart",
    capturedLabel: "CAPTURED DAILY",
    capturedAmount: "$10,000",
    capturedDetail: "AI-assisted carts: $65–$80 vs $45 avg",
    monthly: "$300,000+",
    annual: "$3.6M+",
    quote: "By guiding customers from intent to full carts, RRS increases basket size automatically.",
  },
  {
    icon: Building2,
    label: "Hospitality",
    lostLabel: "MISSED DAILY",
    lostAmount: "$15,000",
    lostDetail: "100 rooms × $150 in missed upsells per guest",
    capturedLabel: "CAPTURED DAILY",
    capturedAmount: "$15,000",
    capturedDetail: "AI concierge: $150–$400 extras per guest",
    monthly: "$450,000+",
    annual: "$5M+",
    quote: "Every guest interaction becomes a revenue opportunity.",
  },
  {
    icon: Wrench,
    label: "HVAC / Plumbing",
    lostLabel: "LOST DAILY",
    lostAmount: "$4,000",
    lostDetail: "10 missed calls × $400 avg job value",
    capturedLabel: "RECOVERED DAILY",
    capturedAmount: "$3,200",
    capturedDetail: "80% of missed leads captured by RRS",
    monthly: "$96,000+",
    annual: "$1.1M+",
    quote: "Every missed call is revenue. RRS makes sure none slip through.",
  },
  {
    icon: Landmark,
    label: "Municipalities",
    lostLabel: "WASTED DAILY",
    lostAmount: "$10,000",
    lostDetail: "1,000 requests × $5–$12 per call center request",
    capturedLabel: "SAVED DAILY",
    capturedAmount: "$9,000",
    capturedDetail: "AI-handled requests: <$1 each",
    monthly: "$120,000+",
    annual: "$1.4M+",
    quote: "Reduce costs while improving citizen satisfaction.",
  },
];

function RevenueImpact() {
  const [active, setActive] = useState(0);
  const ind = industries[active];
  const Icon = ind.icon;

  return (
    <Section id="results" className="py-28 lg:py-40 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">What This Means in Dollars</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            Missed Revenue →<br /><span className="text-[#00d4ff]">Captured Revenue.</span>
          </h2>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap gap-3 mb-14">
          {industries.map((item, i) => {
            const TabIcon = item.icon;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 border ${
                  active === i
                    ? "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/5"
                    : "border-white/10 text-[#a0aab5] hover:border-white/20 hover:text-white"
                }`}
              >
                <TabIcon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Calculator Card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Calculator Grid */}
          <div className="grid lg:grid-cols-3 gap-0">
            {/* LOST */}
            <div className="bg-[#05070a] border border-white/5 p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={14} className="text-red-500/70" />
                <span className="text-red-500/70 text-xs font-bold tracking-[0.2em] uppercase">{ind.lostLabel}</span>
              </div>
              <div className="font-mono text-4xl lg:text-5xl font-black text-red-400/80 mb-3 tracking-tight">
                {ind.lostAmount}
              </div>
              <p className="text-[#a0aab5]/60 text-sm font-light">{ind.lostDetail}</p>
            </div>

            {/* ARROW / TRANSITION */}
            <div className="bg-[#05070a] border-y border-white/5 lg:border lg:border-[#00d4ff]/20 p-8 lg:p-10 flex flex-col items-center justify-center">
              <div className="text-[#00d4ff] mb-4">
                <ArrowRight size={32} className="hidden lg:block" />
                <ChevronDown size={32} className="lg:hidden" />
              </div>
              <span className="text-white font-black text-lg tracking-wide uppercase">With RRS</span>
              <div className="flex items-center gap-2 mt-2">
                <Icon size={16} className="text-[#00d4ff]" />
                <span className="text-[#00d4ff] text-sm font-semibold">{ind.label}</span>
              </div>
            </div>

            {/* CAPTURED */}
            <div className="bg-[#05070a] border border-white/5 lg:border-[#00d4ff]/20 p-8 lg:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={14} className="text-[#00d4ff]" />
                <span className="text-[#00d4ff] text-xs font-bold tracking-[0.2em] uppercase">{ind.capturedLabel}</span>
              </div>
              <div className="font-mono text-4xl lg:text-5xl font-black text-[#00d4ff] mb-3 tracking-tight">
                {ind.capturedAmount}
              </div>
              <p className="text-[#a0aab5]/60 text-sm font-light">{ind.capturedDetail}</p>
            </div>
          </div>

          {/* Impact Bar */}
          <div className="bg-[#05070a] border border-t-0 border-white/5 p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              <div>
                <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Monthly Impact</span>
                <span className="font-mono text-3xl lg:text-4xl font-black text-white tracking-tight">{ind.monthly}</span>
              </div>
              <div>
                <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Annual Impact</span>
                <span className="font-mono text-3xl lg:text-4xl font-black text-[#00d4ff] tracking-tight">{ind.annual}</span>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[#a0aab5] text-base font-light italic leading-relaxed">
                  "{ind.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 flex justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300"
            >
              Calculate Your Revenue Impact <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* UseCases removed — replaced by RevenueImpact calculator above */

/* ─── Why RRS Section ─── */
function WhyRRS() {
  return (
    <Section className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Why RRS Wins</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            One System Beats<br />a Dozen Tools.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Without */}
          <div className="border border-white/5 p-8 lg:p-10">
            <h3 className="text-[#a0aab5] text-lg font-bold mb-6 uppercase tracking-wide">Without RRS</h3>
            <div className="space-y-4">
              {[
                "5-10 disconnected tools",
                "Leads slip through the cracks",
                "Slow, manual follow-ups",
                "No visibility into what's working",
                "Revenue left on the table",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <X size={16} className="text-red-500/70 shrink-0" />
                  <span className="text-[#a0aab5]/70 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* With */}
          <div className="border border-[#00d4ff]/20 p-8 lg:p-10">
            <h3 className="text-[#00d4ff] text-lg font-bold mb-6 uppercase tracking-wide">With RRS</h3>
            <div className="space-y-4">
              {[
                "One unified platform",
                "Every lead captured and followed up",
                "Instant, automated engagement",
                "Real-time performance dashboard",
                "Every opportunity converted",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d4ff] shrink-0" />
                  <span className="text-white text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Team Section ─── */
function Team() {
  const team = [
    {
      name: "Chuck Bryant Jr.",
      title: "Founder & Principal",
      bio: "20+ years in technology, private equity, and business operations. Visionary leader driving RRS from concept to market.",
      img: CHUCK_IMG,
      linkedin: "https://www.linkedin.com/in/chuck-bryant-jr-86539564/",
    },
    {
      name: "Darius Miller",
      title: "Principal, Strategic Partnerships",
      bio: "Former professional athlete turned entrepreneur and investor. Brings elite-level discipline and a winning mindset to every venture.",
      img: DARIUS_IMG,
    },
    {
      name: "Larry Drew II",
      title: "Principal, Business Development",
      bio: "Accomplished athlete and business strategist with deep expertise in brand building, partnerships, and high-performance team culture.",
      img: LARRY_IMG,
    },
    {
      name: "Stephanie Arakel",
      title: "Principal, Brand & Growth",
      bio: "Award-winning marketing executive specializing in brand strategy, customer acquisition, and high-impact digital campaigns.",
      img: STEPHANIE_IMG,
    },
  ];

  return (
    <Section id="team" className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Leadership</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            The Team Behind<br />the Engine.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              {/* Headshot */}
              <div className="relative mb-6 overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Blue accent bar at bottom of image */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#00d4ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>

              {/* Info */}
              <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-[#00d4ff] text-sm font-semibold tracking-wide uppercase mb-3">{member.title}</p>
              <p className="text-[#a0aab5] text-sm font-light leading-relaxed mb-4">{member.bio}</p>

              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#a0aab5] hover:text-[#00d4ff] text-xs font-medium tracking-wide uppercase transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CTA Section ─── */
function CTA() {
  return (
    <Section id="contact" className="py-28 lg:py-40 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-6">Get Started</p>
        <h2 className="text-4xl lg:text-[4rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6 max-w-3xl mx-auto">
          Capture Every Opportunity. Convert Every Interaction.
        </h2>
        <p className="text-[#a0aab5] text-lg font-light max-w-xl mx-auto mb-12">
          Let's build your revenue engine.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="mailto:hello@revenuerelaysystems.com" className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300">
            Contact Us <ArrowRight size={18} />
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[#a0aab5] text-sm">
          <a href="https://revenuerelaysystems.com" className="hover:text-[#00d4ff] transition-colors">revenuerelaysystems.com</a>
          <span className="hidden sm:inline text-white/10">|</span>
          <a href="mailto:hello@revenuerelaysystems.com" className="hover:text-[#00d4ff] transition-colors">hello@revenuerelaysystems.com</a>
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="RRS" className="h-8 w-auto opacity-60" />
          <span className="text-[#a0aab5]/50 text-sm font-semibold tracking-wide">Revenue Relay Systems</span>
        </div>
        <p className="text-[#a0aab5]/50 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} Revenue Relay Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#05070a" }}>
      <Nav />
      <Hero />
      <RelayLine />
      <Problem />
      <RelayLine />
      <Solution />
      <RelayLine />
      <HowItWorks />
      <RelayLine />
      <Features />
      <RelayLine />
      <AILayer />
      <RelayLine />
      <RevenueImpact />
      <RelayLine />
      <WhyRRS />
      <RelayLine />
      <Team />
      <RelayLine />
      <CTA />
      <Footer />
    </div>
  );
}
