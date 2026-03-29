/**
 * RRS Revenue Impact Calculator
 * Interactive tool for prospects to calculate their potential revenue uplift
 * Includes 1-2% agent fee on assisted checkouts
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Building2,
  Wrench,
  Landmark,
  Calculator as CalcIcon,
  TrendingUp,
  DollarSign,
  MapPin,
  BarChart3,
  User,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  Send,
} from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";

const industryOptions = [
  {
    key: "retail",
    label: "Retail / Grocery",
    icon: ShoppingCart,
    avgUpsell: 20,
    upsellLabel: "Avg upsell per customer ($)",
    dailyMetricLabel: "Customers per day (per location)",
    defaultDaily: 500,
    captureRate: 0.85,
    agentFeeRate: 0.015,
    description: "AI-assisted carts increase basket size by $20–$35 per customer.",
  },
  {
    key: "hospitality",
    label: "Hospitality",
    icon: Building2,
    avgUpsell: 150,
    upsellLabel: "Avg upsell per guest ($)",
    dailyMetricLabel: "Rooms per night (per location)",
    defaultDaily: 100,
    captureRate: 0.80,
    agentFeeRate: 0.02,
    description: "AI concierge drives $150–$400 in extras per guest interaction.",
  },
  {
    key: "hvac",
    label: "HVAC / Plumbing",
    icon: Wrench,
    avgUpsell: 400,
    upsellLabel: "Avg job value ($)",
    dailyMetricLabel: "Missed calls per day (per location)",
    defaultDaily: 10,
    captureRate: 0.80,
    agentFeeRate: 0.01,
    description: "Capture 80% of missed leads that would otherwise walk away.",
  },
  {
    key: "municipalities",
    label: "Municipalities",
    icon: Landmark,
    avgUpsell: 8,
    upsellLabel: "Avg cost savings per request ($)",
    dailyMetricLabel: "Requests per day (per location)",
    defaultDaily: 1000,
    captureRate: 0.90,
    agentFeeRate: 0.0,
    description: "Reduce call center costs from $5–$12 per request to under $1.",
  },
];

function formatCurrency(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n).toLocaleString()}`;
  return `$${Math.round(n)}`;
}

export default function Calculator() {
  const [industry, setIndustry] = useState(0);
  const [locations, setLocations] = useState(1);
  const [dailyMetric, setDailyMetric] = useState(industryOptions[0].defaultDaily);
  const [avgUpsell, setAvgUpsell] = useState(industryOptions[0].avgUpsell);

  // Lead capture form state
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to an API
    console.log("Lead captured:", { ...formData, industry: ind.label, locations, netMonthly, netAnnual });
    setFormSubmitted(true);
  };

  const ind = industryOptions[industry];
  const Icon = ind.icon;

  const dailyCaptured = dailyMetric * avgUpsell * ind.captureRate * locations;
  const monthlyCaptured = dailyCaptured * 30;
  const annualCaptured = dailyCaptured * 365;
  const agentFeeMonthly = monthlyCaptured * ind.agentFeeRate;
  const agentFeeAnnual = annualCaptured * ind.agentFeeRate;
  const netMonthly = monthlyCaptured - agentFeeMonthly;
  const netAnnual = annualCaptured - agentFeeAnnual;

  const handleIndustryChange = (i: number) => {
    setIndustry(i);
    setDailyMetric(industryOptions[i].defaultDaily);
    setAvgUpsell(industryOptions[i].avgUpsell);
  };

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
            <Link href="/pricing" className="text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
              Pricing
            </Link>
            <Link href="/" className="text-[#a0aab5] hover:text-white text-sm font-medium tracking-wide uppercase transition-colors">
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <CalcIcon size={20} className="text-[#00d4ff]" />
              <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase">Revenue Calculator</p>
            </div>
            <h1 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-4">
              Calculate Your<br /><span className="text-[#00d4ff]">Revenue Impact.</span>
            </h1>
            <p className="text-[#a0aab5] text-lg font-light max-w-2xl">
              Enter your business details below to see how much additional revenue RRS can capture for you every month.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-28 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-[#0a0e1a] border border-white/5 p-8 lg:p-10">
                <h3 className="text-white font-bold text-lg mb-8 uppercase tracking-wide">Your Business Details</h3>

                {/* Industry Selection */}
                <div className="mb-8">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase block mb-3">Industry</label>
                  <div className="grid grid-cols-2 gap-3">
                    {industryOptions.map((opt, i) => {
                      const OptIcon = opt.icon;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleIndustryChange(i)}
                          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wide uppercase transition-all duration-300 border ${
                            industry === i
                              ? "border-[#00d4ff] text-[#00d4ff] bg-[#00d4ff]/5"
                              : "border-white/10 text-[#a0aab5] hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <OptIcon size={14} />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[#a0aab5]/50 text-xs mt-2 font-light">{ind.description}</p>
                </div>

                {/* Locations */}
                <div className="mb-8">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-3">
                    <MapPin size={12} className="text-[#00d4ff]" />
                    Number of Locations
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10000}
                    value={locations}
                    onChange={(e) => setLocations(Number(e.target.value))}
                    className="w-full accent-[#00d4ff] mb-2"
                  />
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      min={1}
                      max={10000}
                      value={locations}
                      onChange={(e) => setLocations(Math.max(1, Math.min(10000, Number(e.target.value))))}
                      className="w-20 bg-[#05070a] border border-white/10 text-white text-center py-2 font-mono text-lg focus:border-[#00d4ff] focus:outline-none transition-colors"
                    />
                    <span className="text-[#a0aab5]/50 text-xs">location{locations > 1 ? "s" : ""}</span>
                  </div>
                </div>

                {/* Daily Metric */}
                <div className="mb-8">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-3">
                    <BarChart3 size={12} className="text-[#00d4ff]" />
                    {ind.dailyMetricLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={dailyMetric}
                    onChange={(e) => setDailyMetric(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#05070a] border border-white/10 text-white py-3 px-4 font-mono text-lg focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>

                {/* Avg Upsell */}
                <div className="mb-4">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-3">
                    <DollarSign size={12} className="text-[#00d4ff]" />
                    {ind.upsellLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={avgUpsell}
                    onChange={(e) => setAvgUpsell(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#05070a] border border-white/10 text-white py-3 px-4 font-mono text-lg focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Results Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-[#0a0e1a] border border-[#00d4ff]/20 p-8 lg:p-10 sticky top-24">
                <div className="flex items-center gap-2 mb-8">
                  <TrendingUp size={18} className="text-[#00d4ff]" />
                  <h3 className="text-[#00d4ff] font-bold text-lg uppercase tracking-wide">Your Revenue Impact</h3>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Icon size={16} className="text-[#00d4ff]" />
                  <span className="text-white text-sm font-semibold">{ind.label}</span>
                  <span className="text-[#a0aab5]/50 text-xs ml-2">{locations} location{locations > 1 ? "s" : ""}</span>
                </div>

                {/* Daily */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Daily Revenue Captured</span>
                  <span className="font-mono text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {formatCurrency(dailyCaptured)}
                  </span>
                </div>

                {/* Monthly */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Monthly Revenue Captured</span>
                  <span className="font-mono text-4xl lg:text-5xl font-black text-[#00d4ff] tracking-tight">
                    {formatCurrency(monthlyCaptured)}
                  </span>
                </div>

                {/* Annual */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Annual Revenue Captured</span>
                  <span className="font-mono text-4xl lg:text-5xl font-black text-[#00d4ff] tracking-tight">
                    {formatCurrency(annualCaptured)}
                  </span>
                </div>

                {/* Agent Fee */}
                {ind.agentFeeRate > 0 && (
                  <div className="bg-[#05070a] border border-white/5 p-5 mb-6">
                    <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-3">
                      RRS Agent Fee ({(ind.agentFeeRate * 100).toFixed(1)}% on assisted checkouts)
                    </span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-[#a0aab5]/40 text-xs block mb-1">Monthly</span>
                        <span className="font-mono text-lg text-[#a0aab5] font-bold">{formatCurrency(agentFeeMonthly)}</span>
                      </div>
                      <div>
                        <span className="text-[#a0aab5]/40 text-xs block mb-1">Annual</span>
                        <span className="font-mono text-lg text-[#a0aab5] font-bold">{formatCurrency(agentFeeAnnual)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Impact */}
                <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/20 p-5 mb-8">
                  <span className="text-[#00d4ff] text-xs font-bold tracking-[0.2em] uppercase block mb-3">Net Revenue Impact</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[#a0aab5]/40 text-xs block mb-1">Monthly</span>
                      <span className="font-mono text-2xl text-white font-black">{formatCurrency(netMonthly)}</span>
                    </div>
                    <div>
                      <span className="text-[#a0aab5]/40 text-xs block mb-1">Annual</span>
                      <span className="font-mono text-2xl text-[#00d4ff] font-black">{formatCurrency(netAnnual)}</span>
                    </div>
                  </div>
                </div>

                {/* CTA / Lead Form */}
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#00d4ff]/10 border border-[#00d4ff]/30 p-6 text-center"
                  >
                    <CheckCircle2 size={36} className="text-[#00d4ff] mx-auto mb-3" />
                    <h4 className="text-white font-bold text-lg mb-2">We'll Be in Touch!</h4>
                    <p className="text-[#a0aab5] text-sm">Our team will reach out within 24 hours with a personalized revenue strategy for your business.</p>
                    <Link
                      href="/pricing"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 mt-4 border border-white/10 text-[#a0aab5] font-bold text-xs tracking-wide uppercase hover:border-white/20 hover:text-white transition-all duration-300"
                    >
                      View Pricing Plans <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ) : !showForm ? (
                  <>
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300"
                    >
                      Get Your Custom Report <Send size={18} />
                    </button>
                    <Link
                      href="/pricing"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 mt-3 border border-white/10 text-[#a0aab5] font-bold text-sm tracking-wide uppercase hover:border-white/20 hover:text-white transition-all duration-300"
                    >
                      View Pricing Plans <ArrowRight size={18} />
                    </Link>
                  </>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">Get Your Personalized Report</p>
                    <p className="text-[#a0aab5]/60 text-xs mb-4">We'll send a detailed breakdown tailored to your business.</p>

                    <div className="relative">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aab5]/40" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#05070a] border border-white/10 text-white py-3 pl-10 pr-4 text-sm placeholder:text-[#a0aab5]/30 focus:border-[#00d4ff] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aab5]/40" />
                      <input
                        type="email"
                        required
                        placeholder="Work Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#05070a] border border-white/10 text-white py-3 pl-10 pr-4 text-sm placeholder:text-[#a0aab5]/30 focus:border-[#00d4ff] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aab5]/40" />
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#05070a] border border-white/10 text-white py-3 pl-10 pr-4 text-sm placeholder:text-[#a0aab5]/30 focus:border-[#00d4ff] focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a0aab5]/40" />
                      <input
                        type="text"
                        required
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#05070a] border border-white/10 text-white py-3 pl-10 pr-4 text-sm placeholder:text-[#a0aab5]/30 focus:border-[#00d4ff] focus:outline-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300"
                    >
                      Send My Report <Send size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-full text-[#a0aab5]/40 text-xs hover:text-[#a0aab5] transition-colors text-center pt-1"
                    >
                      Back to results
                    </button>
                  </motion.form>
                )}
              </div>
            </motion.div>
          </div>
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
