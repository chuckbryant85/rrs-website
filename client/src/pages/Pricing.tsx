/**
 * RRS Pricing Page
 * Tech Development & Integrations service tiers for SMBs
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
    name: "Launchpad",
    icon: Zap,
    bestFor: "Small businesses ready to modernize",
    price: "$5,000",
    period: " starting",
    annual: "One-time build + optional $500–$1,500/mo retainer",
    setup: "",
    popular: false,
    whiteGlove: false,
    features: [
      "Custom website design & development",
      "Mobile-responsive, conversion-optimized",
      "Stripe or payment gateway integration",
      "Basic CRM setup & configuration",
      "Contact forms & automated notifications",
      "Google Analytics & SEO foundations",
      "SSL, hosting, and domain setup",
      "30-day post-launch support",
      "Training & documentation",
    ],
  },
  {
    name: "Growth Engine",
    icon: Star,
    bestFor: "Scaling businesses that need integrated systems",
    price: "$15,000",
    period: " starting",
    annual: "One-time build + $2,000–$5,000/mo retainer",
    setup: "",
    popular: true,
    whiteGlove: false,
    features: [
      "Everything in Launchpad, plus:",
      "Custom workflow automation",
      "Advanced CRM with pipeline management",
      "Client portal with self-service access",
      "Multi-system integrations (APIs, Zapier, custom)",
      "Automated invoicing & payment collection",
      "Custom dashboards & reporting",
      "Dedicated project manager",
      "60-day post-launch support",
      "Priority response SLA",
    ],
  },
  {
    name: "Enterprise Build",
    icon: Crown,
    bestFor: "Complex operations needing full digital transformation",
    price: "Custom",
    period: "",
    annual: "Starting at $50,000+ for full buildout",
    setup: "",
    popular: false,
    whiteGlove: true,
    features: [
      "Everything in Growth Engine, plus:",
      "Full digital infrastructure architecture",
      "Custom application development",
      "Advanced automation & AI integrations",
      "Multi-department workflow systems",
      "Executive dashboards & board reporting",
      "Ongoing optimization & scaling",
      "Dedicated success team",
      "24/7 priority support",
      "Custom SLA guarantees",
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
              ROI Calculator
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
              Technology That<br /><span className="text-[#00d4ff]">Pays for Itself.</span>
            </h1>
            <p className="text-[#a0aab5] text-lg font-light max-w-2xl mx-auto">
              Custom-built systems designed to eliminate inefficiency, automate operations, and accelerate growth. Every engagement is scoped to your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Approach Callout */}
      <section className="pb-12 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/20 p-6 text-center">
            <p className="text-[#00d4ff] text-sm font-bold tracking-wide uppercase mb-2">Our Approach</p>
            <p className="text-[#a0aab5] text-sm font-light">
              Every project starts with a <span className="text-white font-semibold">discovery phase</span> to understand your operations, goals, and technical requirements. We scope, build, and deliver — then provide ongoing support to keep your systems running at peak performance.
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
                      Full Transformation
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
                  </div>

                  <div className="flex-1 mb-8">
                    <div className="space-y-3">
                      {plan.features.map((feat, j) => (
                        <div key={j} className="flex items-start gap-2">
                          {j === 0 && plan.name !== "Launchpad" ? (
                            <span className="text-[#00d4ff] text-xs font-bold mt-0.5">&mdash;</span>
                          ) : (
                            <Check size={14} className="text-[#00d4ff] mt-0.5 shrink-0" />
                          )}
                          <span className={`text-sm font-light ${j === 0 && plan.name !== "Launchpad" ? "text-[#00d4ff] font-semibold" : "text-[#a0aab5]"}`}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`mailto:hello@revenuerelaysystems.com?subject=Pricing%20Inquiry%20-%20${plan.name}`}
                    className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-sm tracking-wide uppercase transition-colors duration-300 ${
                      plan.popular
                        ? "bg-[#00d4ff] text-[#05070a] hover:bg-[#00b8e0]"
                        : "border border-white/10 text-[#a0aab5] hover:border-[#00d4ff]/40 hover:text-white"
                    }`}
                  >
                    {plan.name === "Enterprise Build" ? "Schedule a Call" : "Get Started"} <ArrowRight size={16} />
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
              <h3 className="text-white font-bold text-2xl mb-3">Not sure where to start?</h3>
              <p className="text-[#a0aab5] text-sm font-light mb-6">
                Use our ROI Calculator to see how much time and money your business can save with modern systems.
              </p>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300"
              >
                Calculate Your ROI <ArrowRight size={18} />
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
