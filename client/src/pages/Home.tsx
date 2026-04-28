/*
 * RRS Website — "Void Monolith" Design
 * Brand Bible: Deep Void Black (#05070a), Midnight Navy (#0a0e1a),
 * Electric Blue (#00d4ff), White (#ffffff), Steel Gray (#a0aab5)
 * Typography: Montserrat (300-900), JetBrains Mono for stats
 *
 * POSITIONING: Tech Development & Integrations for SMBs
 * Services: Website Creation, Automation, Payments, CRM, Custom Workflows, Integrations
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Zap,
  CreditCard,
  Users,
  Workflow,
  Puzzle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  Code2,
  Layers,
  Settings,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Shield,
  Rocket,
  Building2,
  Briefcase,
  Wrench,
} from "lucide-react";

// CDN URLs
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/hero_bg-CfpUPAcwvxhhV57hxf95nW.webp";
const DASHBOARD_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/dashboard_mockup-L4YMtWk7ihCevE8W5xRSuG.webp";

// Team Headshots
const CHUCK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/chuck_headshot_cc9c5ae5.jpg";
const DARIUS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/darius_headshot_b8b97158.jpg";
const TROY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/troy_lemond_headshot_b1073e35.png";

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(end);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    if (typeof IntersectionObserver === 'undefined') {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
          setCount(0);
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
        }
      },
      { threshold: 0, rootMargin: '0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── Section Wrapper with fade-in ─── */
function Section({ children, className = "", id = "" }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

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
    { label: "Solutions", href: "#solution" },
    { label: "Results", href: "#results" },
    { label: "Team", href: "#team" },
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
        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase transition-colors duration-200">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="ml-2 px-6 py-2.5 bg-[#00d4ff] text-[#05070a] text-sm font-bold tracking-wide uppercase hover:bg-[#00b8e0] transition-all duration-300">
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
          <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 block text-center px-6 py-2.5 bg-[#00d4ff] text-[#05070a] text-sm font-bold tracking-wide uppercase">
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
            Technology Development & Integrations
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] xl:text-[7rem] font-black text-white leading-[0.95] tracking-[-0.03em] mb-8">
            We Build the<br />
            Systems That<br />
            <span className="text-[#00d4ff]">Scale You.</span>
          </h1>
          <p className="text-[#a0aab5] text-lg lg:text-xl font-light max-w-xl leading-relaxed mb-12">
            Custom websites, automation, payments, CRM, and integrated workflows — built for businesses ready to modernize and grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300">
              Start Your Build <ArrowRight size={18} />
            </a>
            <a href="#solution" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium text-sm tracking-wide uppercase hover:border-white/40 transition-colors duration-300">
              See What We Build <ChevronDown size={18} />
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
    { number: 73, suffix: "%", label: "of SMBs run on disconnected, manual systems" },
    { prefix: "$", number: 150, suffix: "K+", label: "lost annually to operational inefficiency" },
    { number: 60, suffix: "%", label: "of businesses lack a modern digital infrastructure" },
  ];

  return (
    <Section id="problem" className="py-28 lg:py-40" >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">The Problem</p>
            <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Your Operations Are Holding You Back.
            </h2>
            <p className="text-[#a0aab5] text-lg font-light leading-relaxed">
              Manual processes, disconnected tools, outdated websites, and patchwork systems are costing you time, money, and growth. Most businesses know they need to modernize — they just don't know where to start.
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
              alt="RRS Platform"
              className="w-full max-w-lg mx-auto lg:mx-0 opacity-90"
            />
          </motion.div>

          {/* Right: Text */}
          <div className="order-1 lg:order-2">
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">What We Build</p>
            <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Custom Tech.<br />Seamless<br />Integrations.
            </h2>
            <p className="text-[#a0aab5] text-lg font-light leading-relaxed mb-8">
              We design and develop the digital infrastructure your business needs — from websites and payment systems to CRM platforms and automated workflows. Everything built to work together.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, text: "Websites" },
                { icon: Zap, text: "Automation" },
                { icon: CreditCard, text: "Payments" },
                { icon: Puzzle, text: "Integrations" },
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
    { num: "01", title: "Discovery", desc: "We learn your business, workflows, and goals" },
    { num: "02", title: "Architecture", desc: "We design the systems and integrations you need" },
    { num: "03", title: "Build", desc: "Custom development — websites, automation, payments, CRM" },
    { num: "04", title: "Integrate", desc: "Connect everything into one seamless ecosystem" },
    { num: "05", title: "Deploy", desc: "Launch with testing, training, and full support" },
    { num: "06", title: "Optimize", desc: "Ongoing improvements to maximize performance" },
  ];

  return (
    <Section id="how" className="py-28 lg:py-40 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">How We Work</p>
        <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-16">
          From Vision to<br />Live Systems.
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

/* ─── Core Capabilities Section ─── */
function Features() {
  const features = [
    { icon: Globe, title: "Website Development", desc: "Custom-built, conversion-optimized websites that establish credibility and drive business." },
    { icon: Zap, title: "Automation", desc: "Eliminate manual tasks with intelligent workflows that run your operations on autopilot." },
    { icon: CreditCard, title: "Payment Systems", desc: "Stripe and payment integrations that accelerate cash flow and simplify transactions." },
    { icon: Users, title: "CRM Platforms", desc: "Centralized client management — track every relationship, automate every follow-up." },
    { icon: Workflow, title: "Custom Workflows", desc: "Tailored business processes built around how you actually operate — not generic templates." },
    { icon: Puzzle, title: "Integrations", desc: "Connect your tools, platforms, and data into one unified system that works together." },
  ];

  return (
    <Section id="features" className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Core Capabilities</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            Everything You Need<br />to Modernize.
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

/* ─── Technology Layer Section ─── */
function TechLayer() {
  return (
    <Section className="py-28 lg:py-40 bg-[#0a0e1a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">The Technology Layer</p>
            <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-6">
              Built to Run.<br />Built to Scale.
            </h2>
            <div className="space-y-5 mt-8">
              {[
                "Enterprise-grade architecture — not off-the-shelf templates",
                "Stripe, Square, and custom payment gateway integrations",
                "CRM systems that centralize every client touchpoint",
                "Automated workflows that eliminate manual bottlenecks",
                "Client portals and dashboards for self-service access",
                "Scalable infrastructure that grows with your business",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-[#00d4ff] mt-0.5 shrink-0" />
                  <span className="text-[#a0aab5] text-base font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {[
              { icon: Code2, label: "Custom Development", desc: "Purpose-built solutions tailored to your exact business requirements." },
              { icon: Layers, label: "System Integration", desc: "Connect disparate tools into one cohesive, automated ecosystem." },
              { icon: Settings, label: "Ongoing Optimization", desc: "Continuous improvements to keep your systems performing at peak." },
              { icon: Shield, label: "Reliable Infrastructure", desc: "Secure, stable, and built for uptime — your business depends on it." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5 p-5 border border-white/5 bg-[#05070a]/50"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[#00d4ff]/20 shrink-0">
                  <item.icon size={20} className="text-[#00d4ff]" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.label}</h4>
                  <p className="text-[#a0aab5] text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─── Results / Impact Section ─── */
const industries = [
  {
    icon: Briefcase,
    label: "Legal Publishing",
    color: "#00d4ff",
    beforeLabel: "BEFORE",
    beforeItems: ["Paper forms & phone intake", "Manual invoicing — 30-60 day cycles", "No client portal or self-service"],
    afterLabel: "AFTER",
    afterItems: ["Digital submission workflow", "Stripe instant payments", "Full client portal with tracking"],
    savings: "$150K+",
    savingsLabel: "annual operational savings",
    efficiency: "90%",
    efficiencyLabel: "reduction in admin hours",
    quote: "From paper-heavy legacy operations to a scalable digital infrastructure platform.",
  },
  {
    icon: Building2,
    label: "Hospitality",
    color: "#a855f7",
    beforeLabel: "BEFORE",
    beforeItems: ["Disconnected booking systems", "Manual guest communication", "No upsell automation"],
    afterLabel: "AFTER",
    afterItems: ["Unified reservation platform", "Automated guest engagement", "Integrated upsell workflows"],
    savings: "$200K+",
    savingsLabel: "in new revenue captured",
    efficiency: "75%",
    efficiencyLabel: "faster guest onboarding",
    quote: "Connected systems turn every guest interaction into a revenue opportunity.",
  },
  {
    icon: Wrench,
    label: "Home Services",
    color: "#f59e0b",
    beforeLabel: "BEFORE",
    beforeItems: ["Missed calls go unanswered", "Manual scheduling & dispatch", "Paper invoices and delayed payments"],
    afterLabel: "AFTER",
    afterItems: ["Automated call capture & routing", "Digital scheduling + CRM", "Instant mobile payments"],
    savings: "$120K+",
    savingsLabel: "recovered from missed opportunities",
    efficiency: "80%",
    efficiencyLabel: "reduction in scheduling time",
    quote: "Every call answered, every job tracked, every payment collected — automatically.",
  },
  {
    icon: BarChart3,
    label: "Professional Services",
    color: "#10b981",
    beforeLabel: "BEFORE",
    beforeItems: ["Spreadsheet-based client tracking", "Manual billing and proposals", "No centralized workflow"],
    afterLabel: "AFTER",
    afterItems: ["CRM with automated pipelines", "Integrated invoicing & payments", "Custom workflow automation"],
    savings: "$100K+",
    savingsLabel: "in operational efficiency gains",
    efficiency: "65%",
    efficiencyLabel: "less time on admin tasks",
    quote: "Spend less time managing operations and more time growing your business.",
  },
];

function Results() {
  const [active, setActive] = useState(0);
  const ind = industries[active];
  const Icon = ind.icon;
  const c = ind.color;

  return (
    <Section id="results" className="py-28 lg:py-40 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Real Impact</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            Manual Operations →<br /><span className="text-[#00d4ff]">Modern Systems.</span>
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
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-300 border"
                style={
                  active === i
                    ? { borderColor: item.color, color: item.color, backgroundColor: `${item.color}0d` }
                    : { borderColor: 'rgba(255,255,255,0.1)', color: '#a0aab5' }
                }
              >
                <TabIcon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Before / After Card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-0">
            {/* BEFORE */}
            <div className="bg-[#05070a] border border-white/5 p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-red-500/70 text-xs font-bold tracking-[0.2em] uppercase mb-6">{ind.beforeLabel}</span>
              <div className="space-y-4">
                {ind.beforeItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <X size={16} className="text-red-500/50 shrink-0" />
                    <span className="text-[#a0aab5]/70 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ARROW / TRANSITION */}
            <div className="bg-[#05070a] border-y border-white/5 lg:border p-8 lg:p-10 flex flex-col items-center justify-center" style={{ borderColor: `${c}33` }}>
              <div style={{ color: c }} className="mb-4">
                <ArrowRight size={32} className="hidden lg:block" />
                <ChevronDown size={32} className="lg:hidden" />
              </div>
              <span className="text-white font-black text-lg tracking-wide uppercase">With RRS</span>
              <div className="flex items-center gap-2 mt-2">
                <Icon size={16} style={{ color: c }} />
                <span style={{ color: c }} className="text-sm font-semibold">{ind.label}</span>
              </div>
            </div>

            {/* AFTER */}
            <div className="bg-[#05070a] border border-white/5 p-8 lg:p-10 flex flex-col justify-center" style={{ borderColor: `${c}33` }}>
              <span style={{ color: c }} className="text-xs font-bold tracking-[0.2em] uppercase mb-6">{ind.afterLabel}</span>
              <div className="space-y-4">
                {ind.afterItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} style={{ color: c }} className="shrink-0" />
                    <span className="text-white text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Bar */}
          <div className="bg-[#05070a] border border-t-0 border-white/5 p-8 lg:p-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
              <div>
                <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Cost Impact</span>
                <span className="font-mono text-3xl lg:text-4xl font-black tracking-tight" style={{ color: c }}>{ind.savings}</span>
                <span className="text-[#a0aab5]/50 text-xs block mt-1">{ind.savingsLabel}</span>
              </div>
              <div>
                <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Efficiency Gain</span>
                <span className="font-mono text-3xl lg:text-4xl font-black text-white tracking-tight">{ind.efficiency}</span>
                <span className="text-[#a0aab5]/50 text-xs block mt-1">{ind.efficiencyLabel}</span>
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
              className="inline-flex items-center justify-center gap-2 px-10 py-4 text-[#05070a] font-bold text-sm tracking-wide uppercase transition-colors duration-300"
              style={{ backgroundColor: c }}
            >
              Start Your Build <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Why RRS Section ─── */
function WhyRRS() {
  return (
    <Section className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Why RRS</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            One Partner Beats<br />a Dozen Vendors.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Without */}
          <div className="border border-white/5 p-8 lg:p-10">
            <h3 className="text-[#a0aab5] text-lg font-bold mb-6 uppercase tracking-wide">Without RRS</h3>
            <div className="space-y-4">
              {[
                "5-10 disconnected tools and vendors",
                "Manual processes eating up staff time",
                "No unified system or data visibility",
                "Outdated website that doesn't convert",
                "Growth capped by operational bottlenecks",
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
                "One integrated technology partner",
                "Automated workflows that run 24/7",
                "Unified platform with real-time dashboards",
                "Modern website built for your business",
                "Scalable systems that grow with you",
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
      bio: "Technology and business operations leader driving RRS from concept to market. Visionary behind the company's approach to digital modernization for growing businesses.",
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
      name: "Troy Lemond",
      title: "Principal, Strategic Alliances",
      bio: "Legendary network builder and relationship strategist. Architects the key alliances that power RRS's product ecosystem and market reach.",
      img: TROY_IMG,
    },
  ];

  return (
    <Section id="team" className="py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16 lg:mb-20">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Leadership</p>
          <h2 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em]">
            The Team Behind<br />the Build.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
          Ready to Modernize Your Business?
        </h2>
        <p className="text-[#a0aab5] text-lg font-light max-w-xl mx-auto mb-12">
          Let's build the systems that scale your operations, streamline your workflows, and grow your revenue.
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
      <TechLayer />
      <RelayLine />
      <Results />
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
