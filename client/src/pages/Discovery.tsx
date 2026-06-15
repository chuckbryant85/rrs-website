import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, ArrowRight, Send } from "lucide-react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";

type Question = {
  id: number;
  title: string;
  subtitle: string;
  options: string[];
};

const questions: Question[] = [
  {
    id: 1,
    title: "Where are you losing the most time right now?",
    subtitle: "What are you or your team doing manually every week that feels repetitive, time-consuming, or hard to keep up with?",
    options: [
      "Data entry & manual record-keeping",
      "Invoicing & billing follow-ups",
      "Client communication & follow-ups",
      "Scheduling & appointment management",
      "Document preparation & formatting",
      "Searching for prior work or reference materials",
      "Reporting & status updates",
      "Onboarding new clients or staff",
    ],
  },
  {
    id: 2,
    title: "What types of requests come in most often from your government clients?",
    subtitle: "Are there recurring questions, document requests, Open Records matters, council/board prep items, ordinances, contracts, HR/policy issues, or follow-ups that could be standardized or streamlined?",
    options: [
      "Open Records / FOIA requests",
      "Council or board meeting prep & agendas",
      "Ordinance drafting & review",
      "Contract review & management",
      "HR & policy-related inquiries",
      "Document requests & retrieval",
      "Legal notice submissions & publication",
      "Compliance & regulatory follow-ups",
    ],
  },
  {
    id: 3,
    title: "What is the current workflow from request to completion?",
    subtitle: "When a city, county, authority, or court sends something in, how does it get assigned, tracked, completed, reviewed, and sent back?",
    options: [
      "Requests come in via email — no centralized system",
      "Manual assignment by a manager or lead",
      "Tracked in spreadsheets or paper logs",
      "No formal tracking — relies on memory",
      "Completed work is reviewed manually before delivery",
      "Delivered back via email or physical mail",
      "Multiple handoffs between team members",
      "No standardized process — varies by person",
    ],
  },
  {
    id: 4,
    title: "Where do things get delayed or fall through the cracks?",
    subtitle: "Is the bottleneck intake, drafting, approvals, searching for prior work, gathering information, tracking deadlines, or client communication?",
    options: [
      "Intake & initial request processing",
      "Drafting & document preparation",
      "Internal approvals & sign-offs",
      "Searching for prior work or precedents",
      "Gathering information from clients",
      "Tracking deadlines & due dates",
      "Client communication & status updates",
      "Handoffs between departments or team members",
    ],
  },
  {
    id: 5,
    title: "If we could remove 5–10 hours of repetitive work per week, what would you want automated first?",
    subtitle: "This helps us identify the highest-impact area to start with instead of trying to change everything at once.",
    options: [
      "Client intake & request processing",
      "Invoicing & payment collection",
      "Document generation & formatting",
      "Email responses & client communication",
      "Scheduling & calendar management",
      "Status tracking & reporting",
      "File organization & retrieval",
      "Deadline monitoring & reminders",
    ],
  },
];

export default function Discovery() {
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [otherTexts, setOtherTexts] = useState<Record<number, string>>({});
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactCompany, setContactCompany] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.discovery.submit.useMutation({
    onSuccess: () => setSubmitted(true),
  });

  const progress = useMemo(() => {
    const answered = questions.filter(
      (q) => (answers[q.id]?.length ?? 0) > 0 || (otherTexts[q.id]?.trim().length ?? 0) > 0
    ).length;
    return Math.round((answered / questions.length) * 100);
  }, [answers, otherTexts]);

  const toggleOption = (questionId: number, option: string) => {
    setAnswers((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(option);
      return {
        ...prev,
        [questionId]: exists
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  const handleSubmit = () => {
    const formattedAnswers = questions.map((q) => ({
      question: q.title,
      selectedOptions: answers[q.id] || [],
      otherText: otherTexts[q.id]?.trim() || "",
    }));

    submitMutation.mutate({
      answers: formattedAnswers,
      contactName,
      contactEmail,
      contactCompany,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#05070a" }}>
        <div className="max-w-lg text-center px-6">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center border-2 border-[#00d4ff]">
            <CheckCircle2 size={40} className="text-[#00d4ff]" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4">Thank You!</h1>
          <p className="text-[#a0aab5] text-lg font-light leading-relaxed mb-8">
            Your responses have been submitted. We'll review your answers and reach out to schedule a discovery call to discuss how we can help streamline your operations.
          </p>
          <a
            href="https://revenuerelaysystems.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase"
          >
            Visit Our Website <ArrowRight size={18} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#05070a" }}>
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="https://revenuerelaysystems.com" className="flex items-center gap-3">
            <img src={LOGO_URL} alt="RRS" className="h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-extrabold text-sm tracking-wide">REVENUE RELAY</span>
              <span className="text-[#00d4ff] font-bold text-xs tracking-[0.15em]">SYSTEMS</span>
            </div>
          </a>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-[#05070a]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#a0aab5] text-xs font-semibold tracking-wide uppercase">Progress</span>
            <span className="text-[#00d4ff] text-xs font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-white/5 overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "#22c55e",
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-16">
          <p className="text-[#00d4ff] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Discovery Questionnaire
          </p>
          <h1 className="text-3xl lg:text-5xl font-black text-white leading-[1.05] tracking-[-0.02em] mb-4">
            Help Us Understand<br />Your Operations.
          </h1>
          <p className="text-[#a0aab5] text-lg font-light leading-relaxed max-w-2xl">
            Select all answers that apply to each question. If your situation isn't listed, use the "Other" field to describe it. This helps us identify the highest-impact areas to focus on.
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-16">
          {questions.map((q) => (
            <div key={q.id} className="border-l-2 border-[#00d4ff]/30 pl-8">
              <div className="mb-6">
                <span className="text-[#00d4ff]/50 text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                  Question {q.id} of {questions.length}
                </span>
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  {q.title}
                </h2>
                <p className="text-[#a0aab5] text-sm font-light leading-relaxed">
                  {q.subtitle}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {q.options.map((option) => {
                  const isSelected = answers[q.id]?.includes(option) ?? false;
                  return (
                    <button
                      key={option}
                      onClick={() => toggleOption(q.id, option)}
                      className={`text-left px-4 py-3 border transition-all duration-200 text-sm font-medium ${
                        isSelected
                          ? "border-[#00d4ff] bg-[#00d4ff]/10 text-white"
                          : "border-white/10 bg-transparent text-[#a0aab5] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                            isSelected ? "border-[#00d4ff] bg-[#00d4ff]" : "border-white/30"
                          }`}
                        >
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#05070a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Other field */}
              <div className="mt-4">
                <label className="text-[#a0aab5] text-xs font-semibold tracking-wide uppercase block mb-2">
                  Other (please specify)
                </label>
                <textarea
                  value={otherTexts[q.id] || ""}
                  onChange={(e) =>
                    setOtherTexts((prev) => ({ ...prev, [q.id]: e.target.value }))
                  }
                  placeholder="Describe anything not listed above..."
                  className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 placeholder:text-[#a0aab5]/40 focus:border-[#00d4ff]/50 focus:outline-none transition-colors resize-none"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-20 border-t border-white/5 pt-12">
          <h2 className="text-2xl font-bold text-white mb-2">Your Information</h2>
          <p className="text-[#a0aab5] text-sm font-light mb-8">
            So we can follow up with a tailored plan.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[#a0aab5] text-xs font-semibold tracking-wide uppercase block mb-2">Name</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your full name"
                className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 placeholder:text-[#a0aab5]/40 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[#a0aab5] text-xs font-semibold tracking-wide uppercase block mb-2">Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 placeholder:text-[#a0aab5]/40 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-[#a0aab5] text-xs font-semibold tracking-wide uppercase block mb-2">Company / Organization</label>
            <input
              type="text"
              value={contactCompany}
              onChange={(e) => setContactCompany(e.target.value)}
              placeholder="Your company name"
              className="w-full bg-transparent border border-white/10 text-white text-sm px-4 py-3 placeholder:text-[#a0aab5]/40 focus:border-[#00d4ff]/50 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-12 flex flex-col items-center">
          <button
            onClick={handleSubmit}
            disabled={submitMutation.isPending || progress === 0}
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#00d4ff] text-[#05070a] font-bold text-sm tracking-wide uppercase hover:bg-[#00b8e0] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitMutation.isPending ? "Submitting..." : "Submit Responses"} <Send size={18} />
          </button>
          {submitMutation.isError && (
            <p className="text-red-400 text-sm mt-4">
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/5 pt-8 text-center">
          <p className="text-[#a0aab5]/50 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Revenue Relay Systems. All rights reserved.
          </p>
          <p className="text-[#a0aab5]/40 text-xs mt-2">
            3064 Wake Forest Road, Raleigh, NC 27609
          </p>
        </footer>
      </main>
    </div>
  );
}
