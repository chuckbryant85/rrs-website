/**
 * RRS Pricing Page
 * Based on goalsapp.ai pricing structure + 1-2% agent fee on assisted checkouts
 */

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Star,
  Zap,
  Crown,
} from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";

const plans = [
  {
    name: "Professional",
    icon: Zap,
    bestFor: "Single-location businesses",
    price: "$497",
    period: "/month",
    annual: "$5,964/year (12-month contract)",
    setup: "$1,500 one-time setup",
    agentFee: "1% agent fee on assisted checkouts",
    popular: false,
    whiteGlove: false,
    features: [
      "24/7 AI across all channels",
      "SMS, Web Chat, Voice, Social DMs",
      "Multi-language support (20+ languages)",
      "Automated booking & lead capture",
      "Brand voice customization",
      "Reservation system integrations",
      "Review monitoring (3 platforms)",
      "AI-powered review responses",
      "Sentiment analysis & alerts",
      "Monthly reputation reports",
      "Onboarding & brand voice setup",
      "Monthly optimization reviews",
      "Quarterly strategy sessions",
      "5,000 monthly conversations",
    ],
  },
  {
    name: "Enterprise",
    icon: Star,
    bestFor: "Multi-location operators & groups",
    price: "$1,497",
    period: "/month",
    annual: "3 locations included",
    setup: "$3,500 one-time setup",
    agentFee: "1.5% agent fee on assisted checkouts",
    popular: true,
    whiteGlove: false,
    extra: "+$397/mo per additional location",
    examples: [
      "3 locations: $1,497/mo",
      "5 locations: $2,291/mo",
      "10 locations: $4,467/mo",
    ],
    features: [
      "Everything in Professional, plus:",
      "Multi-location dashboard",
      "Cross-location analytics",
      "Advanced routing & escalation",
      "Unlimited review responses (all platforms)",
      "Review generation campaigns",
      "Custom workflows & automation",
      "Dedicated Success Manager",
      "4-hour response SLA",
      "Monthly strategy calls",
      "Quarterly business reviews",
      "15,000 monthly conversations",
    ],
  },
  {
    name: "Portfolio",
    icon: Crown,
    bestFor: "National brands & PE-backed portfolios (10+)",
    price: "Custom",
    period: "",
    annual: "Starting at $5,000–$15,000/mo",
    setup: "$10,000+ one-time setup",
    agentFee: "2% agent fee on assisted checkouts",
    popular: false,
    whiteGlove: true,
    features: [
      "Everything in Enterprise, plus:",
      "Custom integrations & API access",
      "White-glove success team",
      "Crisis management protocols",
      "Executive dashboards & board reporting",
      "24/7 emergency support (1-hr SLA)",
      "Multi-brand management",
      "Custom SLA guarantees",
      "Unlimited conversations",
    ],
  },
];

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ background: "#05070a" }}>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#05070a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="RRS" className="h-10 w-auto" />
            <div className="leading-none">
              <span className="text-white font-black text-sm tracking-wide block">REVENUE RELAY</span>
              <span className="text-[#00d4ff] font-bold text-xs tracking-[0.15em] block">SYSTEMS</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/calculator" className="text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
              Calculator
            </Link>
            <Link href="/" className="text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">Pricing</p>
            <h1 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-4">
              Infrastructure That<br /><span className="text-[#00d4ff]">Pays for Itself.</span>
            </h1>
            <p className="text-[#a0aab5] text-lg font-light max-w-2xl mx-auto">
              Simple pricing. Powerful infrastructure. Every plan includes a small agent fee on assisted checkouts — so we only win when you win.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agent Fee Callout */}
      <section className="pb-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/20 p-6 text-center">
            <p className="text-[#00d4ff] text-sm font-bold tracking-wide uppercase mb-2">Performance-Aligned Pricing</p>
            <p className="text-[#a0aab5] text-sm font-light">
              Every plan includes a <span className="text-white font-semibold">1–2% agent fee</span> on AI-assisted checkouts and conversions. This means our revenue is directly tied to yours — we only make money when we make <span className="text-white font-semibold">you</span> money.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => {
              const PlanIcon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative flex flex-col border p-8 lg:p-10 ${
                    plan.popular
                      ? "border-[#00d4ff]/40 bg-[#0a0e1a]"
                      : "border-white/5 bg-[#0a0e1a]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d4ff] text-[#05070a] text-xs font-black tracking-[0.15em] uppercase px-5 py-1.5">
                      Most Popular
                    </div>
                  )}
                  {plan.whiteGlove && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs font-black tracking-[0.15em] uppercase px-5 py-1.5">
                      White-Glove
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <PlanIcon size={18} className="text-[#00d4ff]" />
                      <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                    </div>
                    <p className="text-[#a0aab5]/60 text-sm font-light">{plan.bestFor}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono text-4xl lg:text-5xl font-black text-white tracking-tight">{plan.price}</span>
                      <span className="text-[#a0aab5]/50 text-sm font-medium">{plan.period}</span>
                    </div>
                    <p className="text-[#a0aab5]/40 text-xs mt-1">{plan.annual}</p>
                    {plan.extra && (
                      <p className="text-[#00d4ff]/60 text-xs mt-1">{plan.extra}</p>
                    )}
                  </div>

                  <div className="bg-[#05070a] border border-white/5 p-4 mb-6">
                    <p className="text-[#a0aab5]/50 text-xs mb-1">{plan.setup}</p>
                    <p className="text-[#00d4ff] text-xs font-semibold">{plan.agentFee}</p>
                  </div>

                  {plan.examples && (
                    <div className="mb-6">
                      <p className="text-[#a0aab5]/40 text-xs font-bold tracking-[0.15em] uppercase mb-2">Examples</p>
                      {plan.examples.map((ex, j) => (
                        <p key={j} className="text-[#a0aab5]/60 text-xs font-mono">{ex}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex-1 mb-8">
                    <div className="space-y-3">
                      {plan.features.map((feat, j) => (
                        <div key={j} className="flex items-start gap-2">
                          {j === 0 && plan.name !== "Professional" ? (
                            <span className="text-[#00d4ff] text-xs font-bold mt-0.5">&mdash;</span>
                          ) : (
                            <Check size={14} className="text-[#00d4ff] mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm font-light ${j === 0 && plan.name !== "Professional" ? "text-[#00d4ff] font-semibold" : "text-[#a0aab5]"}`}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="mailto:hello@revenuerelaysystems.com?subject=Pricing%20Inquiry%20-%20{plan.name}"
                    className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wide uppercase transition-colors duration-300 ${
                      plan.popular
                        ? "bg-[#00d4ff] text-[#05070a] hover:bg-[#00b8e0]"
                        : "border border-white/10 text-[#a0aab5] hover:border-[#00d4ff]/40 hover:text-white"
                    }`}
                  >
                    {plan.name === "Portfolio" ? "Contact Us" : "Get Started"} <ArrowRight size={16} />
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Calculator CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="bg-[#0a0e1a] border border-white/5 p-10 max-w-3xl mx-auto">
              <h3 className="text-white font-bold text-2xl mb-3">Not sure which plan is right?</h3>
              <p className="text-[#a0aab5] text-sm font-light mb-6">
                Use our Revenue Calculator to see exactly how much additional revenue RRS can capture for your business.
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300"
              >
                Calculate Your Revenue Impact <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
