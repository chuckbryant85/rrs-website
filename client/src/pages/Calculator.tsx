/**
 * RRS Tech Modernization ROI Calculator
 * Interactive tool for prospects to estimate operational savings
 * from custom tech development & integrations
 */

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator as CalcIcon,
  TrendingUp,
  DollarSign,
  BarChart3,
  User,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  Send,
  Globe,
  Zap,
  CreditCard,
  Users,
  Workflow,
  Clock,
} from "lucide-react";
import { Link } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";

const serviceOptions = [
  {
    key: "website",
    label: "Website Development",
    icon: Globe,
    hoursSavedPerWeek: 10,
    hoursLabel: "Hours saved per week on manual web updates",
    costPerHour: 50,
    defaultEmployees: 3,
    description: "Replace outdated sites with conversion-optimized platforms that reduce manual upkeep.",
  },
  {
    key: "automation",
    label: "Automation",
    icon: Zap,
    hoursSavedPerWeek: 20,
    hoursLabel: "Hours saved per week on manual tasks",
    costPerHour: 45,
    defaultEmployees: 5,
    description: "Eliminate repetitive workflows — data entry, follow-ups, scheduling, and reporting.",
  },
  {
    key: "payments",
    label: "Payment Systems",
    icon: CreditCard,
    hoursSavedPerWeek: 15,
    hoursLabel: "Hours saved per week on invoicing & collections",
    costPerHour: 55,
    defaultEmployees: 3,
    description: "Stripe integrations that cut invoice cycles from 30-60 days to instant collection.",
  },
  {
    key: "crm",
    label: "CRM Platform",
    icon: Users,
    hoursSavedPerWeek: 12,
    hoursLabel: "Hours saved per week on client management",
    costPerHour: 50,
    defaultEmployees: 4,
    description: "Centralize client data, automate follow-ups, and eliminate spreadsheet chaos.",
  },
  {
    key: "workflows",
    label: "Custom Workflows",
    icon: Workflow,
    hoursSavedPerWeek: 18,
    hoursLabel: "Hours saved per week on manual processes",
    costPerHour: 50,
    defaultEmployees: 5,
    description: "Purpose-built business processes that replace manual, error-prone operations.",
  },
];

function formatCurrency(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n).toLocaleString()}`;
  return `$${Math.round(n)}`;
}

export default function Calculator() {
  const [service, setService] = useState(0);
  const [employees, setEmployees] = useState(serviceOptions[0].defaultEmployees);
  const [hoursSaved, setHoursSaved] = useState(serviceOptions[0].hoursSavedPerWeek);
  const [costPerHour, setCostPerHour] = useState(serviceOptions[0].costPerHour);

  // Lead capture form state
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "" });

  const svc = serviceOptions[service];
  const Icon = svc.icon;

  const weeklySavings = hoursSaved * costPerHour * employees;
  const monthlySavings = weeklySavings * 4.33;
  const annualSavings = weeklySavings * 52;
  const totalHoursAnnual = hoursSaved * employees * 52;

  const handleServiceChange = (i: number) => {
    setService(i);
    setEmployees(serviceOptions[i].defaultEmployees);
    setHoursSaved(serviceOptions[i].hoursSavedPerWeek);
    setCostPerHour(serviceOptions[i].costPerHour);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead captured:", { ...formData, service: svc.label, employees, monthlySavings, annualSavings });
    setFormSubmitted(true);
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
              <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase">ROI Calculator</p>
            </div>
            <h1 className="text-4xl lg:text-[3.5rem] font-black text-white leading-[1.05] tracking-[-0.02em] mb-4">
              Calculate Your<br /><span className="text-[#00d4ff]">Efficiency Gains.</span>
            </h1>
            <p className="text-[#a0aab5] text-lg font-light max-w-2xl">
              See how much time and money your business can save by modernizing operations with custom-built technology.
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

                {/* Service Selection */}
                <div className="mb-8">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase block mb-3">Service Area</label>
                  <div className="grid grid-cols-2 gap-3">
                    {serviceOptions.map((opt, i) => {
                      const OptIcon = opt.icon;
                      return (
                        <button
                          key={opt.key}
                          onClick={() => handleServiceChange(i)}
                          className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold tracking-wide uppercase transition-all duration-300 border ${
                            service === i
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
                  <p className="text-[#a0aab5]/50 text-xs mt-2 font-light">{svc.description}</p>
                </div>

                {/* Employees Affected */}
                <div className="mb-8">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-3">
                    <Users size={12} className="text-[#00d4ff]" />
                    Team Members Affected
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full accent-[#00d4ff] mb-2"
                  />
                  <div className="flex justify-between items-center">
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={employees}
                      onChange={(e) => setEmployees(Math.max(1, Math.min(50, Number(e.target.value))))}
                      className="w-20 bg-[#05070a] border border-white/10 text-white text-center py-2 font-mono text-lg focus:border-[#00d4ff] focus:outline-none transition-colors"
                    />
                    <span className="text-[#a0aab5]/50 text-xs">team member{employees > 1 ? "s" : ""}</span>
                  </div>
                </div>

                {/* Hours Saved */}
                <div className="mb-8">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-3">
                    <Clock size={12} className="text-[#00d4ff]" />
                    {svc.hoursLabel}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={hoursSaved}
                    onChange={(e) => setHoursSaved(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-[#05070a] border border-white/10 text-white py-3 px-4 font-mono text-lg focus:border-[#00d4ff] focus:outline-none transition-colors"
                  />
                </div>

                {/* Cost Per Hour */}
                <div className="mb-4">
                  <label className="text-[#a0aab5] text-xs font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-3">
                    <DollarSign size={12} className="text-[#00d4ff]" />
                    Avg. Fully-Loaded Cost Per Hour ($)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={costPerHour}
                    onChange={(e) => setCostPerHour(Math.max(1, Number(e.target.value)))}
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
                  <h3 className="text-[#00d4ff] font-bold text-lg uppercase tracking-wide">Your Efficiency Gains</h3>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Icon size={16} className="text-[#00d4ff]" />
                  <span className="text-white text-sm font-semibold">{svc.label}</span>
                  <span className="text-[#a0aab5]/50 text-xs ml-2">{employees} team member{employees > 1 ? "s" : ""}</span>
                </div>

                {/* Hours Reclaimed */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Hours Reclaimed Annually</span>
                  <span className="font-mono text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {totalHoursAnnual.toLocaleString()} hrs
                  </span>
                </div>

                {/* Weekly Savings */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Weekly Cost Savings</span>
                  <span className="font-mono text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {formatCurrency(weeklySavings)}
                  </span>
                </div>

                {/* Monthly Savings */}
                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[#a0aab5]/50 text-xs font-bold tracking-[0.2em] uppercase block mb-2">Monthly Cost Savings</span>
                  <span className="font-mono text-4xl lg:text-5xl font-black text-[#00d4ff] tracking-tight">
                    {formatCurrency(monthlySavings)}
                  </span>
                </div>

                {/* Annual Savings */}
                <div className="bg-[#00d4ff]/5 border border-[#00d4ff]/20 p-5 mb-8">
                  <span className="text-[#00d4ff] text-xs font-bold tracking-[0.2em] uppercase block mb-3">Annual Operational Savings</span>
                  <span className="font-mono text-4xl lg:text-5xl font-black text-[#00d4ff] tracking-tight">
                    {formatCurrency(annualSavings)}
                  </span>
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
                    <p className="text-[#a0aab5] text-sm">Our team will reach out within 24 hours with a customized modernization plan for your business.</p>
                    <Link
                      href="/"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 mt-4 border border-white/10 text-[#a0aab5] font-bold text-xs tracking-wide uppercase hover:border-white/20 hover:text-white transition-all duration-300"
                    >
                      Back to Home <ArrowRight size={16} />
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
                      href="/"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 mt-3 border border-white/10 text-[#a0aab5] font-bold text-sm tracking-wide uppercase hover:border-white/20 hover:text-white transition-all duration-300"
                    >
                      Back to Home <ArrowRight size={18} />
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
                    <p className="text-white font-bold text-sm uppercase tracking-wide mb-1">Get Your Modernization Report</p>
                    <p className="text-[#a0aab5]/60 text-xs mb-4">We'll send a detailed breakdown tailored to your business operations.</p>

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
