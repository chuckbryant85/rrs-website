import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  Users,
  Workflow,
  BarChart3,
  Zap,
} from "lucide-react";

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";

const LOREAL_IMG = "/manus-storage/loreal_lemond_8634f8bb.jpeg";

// ── Question definitions ──────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "q1",
    number: "01",
    title: "Where are you losing the most time right now?",
    subtitle:
      "What are you or your team doing manually every week that feels repetitive, time-consuming, or hard to keep up with?",
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
    id: "q2",
    number: "02",
    title: "What types of requests come in most often from your government clients?",
    subtitle:
      "Are there recurring questions, document requests, Open Records matters, council/board prep items, ordinances, contracts, HR/policy issues, or follow-ups that could be standardized or streamlined?",
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
    id: "q3",
    number: "03",
    title: "What is the current workflow from request to completion?",
    subtitle:
      "When a city, county, authority, or court sends something in, how does it get assigned, tracked, completed, reviewed, and sent back?",
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
    id: "q4",
    number: "04",
    title: "Where do things get delayed or fall through the cracks?",
    subtitle:
      "Is the bottleneck intake, drafting, approvals, searching for prior work, gathering information, tracking deadlines, or client communication?",
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
    id: "q5",
    number: "05",
    title: "If we could remove 5–10 hours of repetitive work per week, what would you want automated first?",
    subtitle:
      "This helps us identify the highest-impact area to start with instead of trying to change everything at once.",
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

const BENEFITS = [
  { icon: Clock, text: "Reduce repetitive administrative work" },
  { icon: Users, text: "Organize client requests and internal tasks" },
  { icon: FileText, text: "Streamline document and information workflows" },
  { icon: BarChart3, text: "Improve follow-up and deadline tracking" },
  { icon: Workflow, text: "Create more consistency across recurring processes" },
  { icon: Zap, text: "Free up time for higher-value legal and strategic work" },
];

const APPROACH = [
  {
    step: "1",
    title: "Understand the current workflow",
    desc: "We learn how requests, documents, tasks, deadlines, and follow-ups are currently handled.",
  },
  {
    step: "2",
    title: "Identify the highest-impact bottlenecks",
    desc: "We look for repetitive tasks, manual processes, and areas where work gets delayed or duplicated.",
  },
  {
    step: "3",
    title: "Build practical AI and automation tools around the firm's existing process",
    desc: "We create custom solutions designed to support the way the team already works, not force them into a one-size-fits-all platform.",
  },
];

const LOREAL_HIGHLIGHTS = [
  "25+ years in live & virtual event production",
  "Celebrity talent booking & management",
  "White-glove client service & flawless execution",
  "P&L management & budget oversight",
  "Cross-functional team & vendor management",
  "Brand consulting, marketing & project management",
];

// ── Multi-select question component ──────────────────────────────────────────
function QuestionCard({
  q,
  index,
  selections,
  otherText,
  onToggle,
  onOther,
}: {
  q: (typeof QUESTIONS)[0];
  index: number;
  selections: string[];
  otherText: string;
  onToggle: (opt: string) => void;
  onOther: (val: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const answered = selections.length > 0 || otherText.trim().length > 0;

  return (
    <div className="border border-[#00d4ff]/20 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-[#0d1117] hover:bg-[#111820] transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold tracking-[0.2em] text-[#00d4ff]/60 uppercase">
            Question {index + 1} of {QUESTIONS.length}
          </span>
          {answered && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded-full">
              <CheckCircle2 size={12} /> Answered
            </span>
          )}
        </div>
        {open ? (
          <ChevronUp size={18} className="text-[#00d4ff]/40 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-[#00d4ff]/40 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-6 bg-[#0d1117] border-t border-[#00d4ff]/10">
          <h3 className="text-lg font-bold text-white mt-4 mb-1">{q.title}</h3>
          <p className="text-sm text-gray-400 mb-5 leading-relaxed">{q.subtitle}</p>

          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            {q.options.map((opt) => {
              const selected = selections.includes(opt);
              return (
                <button
                  key={opt}
                  onClick={() => onToggle(opt)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md border text-sm text-left transition-all duration-150 ${
                    selected
                      ? "border-[#00d4ff] bg-[#00d4ff]/10 text-[#00d4ff] font-medium"
                      : "border-white/10 text-gray-300 hover:border-[#00d4ff]/40 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center transition-colors ${
                      selected ? "bg-[#00d4ff] border-[#00d4ff]" : "border-white/20"
                    }`}
                  >
                    {selected && <CheckCircle2 size={10} className="text-[#05070a]" />}
                  </div>
                  {opt}
                </button>
              );
            })}
          </div>

          <div>
            <label className="text-xs font-bold tracking-[0.15em] text-[#00d4ff]/50 uppercase block mb-2">
              Other (please specify)
            </label>
            <textarea
              value={otherText}
              onChange={(e) => onOther(e.target.value)}
              placeholder="Describe anything not listed above..."
              rows={2}
              className="w-full px-4 py-3 border border-white/10 rounded-md text-sm text-gray-300 placeholder-gray-600 bg-[#111820] focus:outline-none focus:border-[#00d4ff]/50 resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function LFBarnes() {
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("LFBarnes Law");
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = trpc.discovery.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (err) => {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    },
  });

  const toggleOption = (qId: string, opt: string) => {
    setSelections((prev) => {
      const current = prev[qId] ?? [];
      return {
        ...prev,
        [qId]: current.includes(opt) ? current.filter((o) => o !== opt) : [...current, opt],
      };
    });
  };

  const answeredCount = QUESTIONS.filter(
    (q) => (selections[q.id]?.length ?? 0) > 0 || (otherTexts[q.id]?.trim().length ?? 0) > 0
  ).length;
  const progress = Math.round((answeredCount / QUESTIONS.length) * 100);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email before submitting.");
      return;
    }

    const answers = QUESTIONS.map((q) => ({
      question: q.title,
      selectedOptions: selections[q.id] ?? [],
      otherText: otherTexts[q.id] ?? "",
    }));

    submitMutation.mutate({
      contactName: name.trim(),
      contactEmail: email.trim(),
      contactCompany: company.trim() || "LFBarnes Law",
      answers,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#05070a] flex items-center justify-center px-4">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[#00d4ff]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Thank you, {name.split(" ")[0]}.</h1>
          <p className="text-gray-400 leading-relaxed mb-8">
            Your responses have been received. We'll review your answers and follow up with a tailored overview of how we can support LFBarnes Law.
          </p>
          <a
            href="https://revenuerelaysystems.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-[#05070a] text-sm font-bold tracking-wide uppercase rounded hover:bg-[#00bfea] transition-colors"
          >
            Visit Revenue Relay Systems <ArrowRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070a] font-sans">
      {/* ── Sticky Progress Bar ── */}
      <div className="sticky top-0 z-50 bg-[#05070a]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <a href="https://revenuerelaysystems.com" className="flex items-center gap-2 shrink-0">
            <img src={LOGO_URL} alt="RRS" className="h-8 w-auto" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-white font-extrabold text-xs tracking-wide">REVENUE RELAY</span>
              <span className="text-[#00d4ff] font-bold text-xs tracking-[0.15em]">SYSTEMS</span>
            </div>
          </a>
          <div className="flex-1 max-w-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Progress</span>
              <span className="text-xs font-bold text-[#00d4ff]">{progress}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00d4ff] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <a
            href="#questions"
            className="shrink-0 px-4 py-2 bg-[#00d4ff] text-[#05070a] text-xs font-bold tracking-wide uppercase rounded hover:bg-[#00bfea] transition-colors hidden sm:block"
          >
            Start Discovery
          </a>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-[#05070a] text-white py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Prepared for LFBarnes Law
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Custom AI Workflow Solutions<br className="hidden sm:block" /> for{" "}
            <span className="text-[#00d4ff]">LFBarnes Law</span>
          </h1>
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mb-8">
            Helping busy law firms and government-focused practices reduce manual work, streamline workflows, and create more capacity through practical AI and automation tools.
          </p>

        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-14 bg-[#05070a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-3">Who We Are</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Operational Technology Built Around How You Work
          </h2>
          <div className="text-gray-400 leading-relaxed space-y-4 max-w-3xl">
            <p>
              We work with professional-service businesses to identify the repetitive tasks, manual workflows, and operational bottlenecks that slow teams down — then we build custom AI and automation solutions around the way they already work.
            </p>
            <p>
              This is not about replacing legal judgment or forcing a firm into a one-size-fits-all software platform. It is about helping the team operate more efficiently by improving intake, document workflows, client communication, task tracking, follow-ups, reporting, and knowledge management.
            </p>
          </div>
        </div>
      </section>

      {/* ── Partner Profile ── */}
      <section className="py-16 bg-[#0d1117] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-3">Your Point of Contact</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10">
            Meet Your Point of Contact at Revenue Relay Systems
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="shrink-0">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#00d4ff]/40 mx-auto sm:mx-0">
                <img
                  src={LOREAL_IMG}
                  alt="Loreal Lemond"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Bio */}
            <div className="flex-1">
              <h3 className="text-white font-bold text-2xl mb-0.5">Loreal Lemond</h3>
              <p className="text-[#00d4ff] text-sm font-semibold tracking-wide uppercase mb-4">Co-Founder &amp; Partner</p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Loreal is a Co-Founder and Partner at Revenue Relay Systems. She brings over 25 years of experience in live and virtual event production, celebrity talent booking and management, and experiential event programming — known for delivering white-glove service and flawless execution from initial concept through final delivery.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                At Revenue Relay Systems, Loreal leads client relationships and engagement strategy, ensuring every project is handled with the same operational discipline and attention to detail she has built her career on. Skilled in P&amp;L management, budget oversight, cross-functional team leadership, and client relations, she is your direct point of contact throughout this process.
              </p>
              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-2">
                {LOREAL_HIGHLIGHTS.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shrink-0" />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-14 bg-[#05070a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-3">How This Could Help LFBarnes Law</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            For a Firm Handling Government Clients
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-2xl">
            For a firm handling government clients, municipal matters, document-heavy workflows, recurring requests, deadlines, and client communication, there may be opportunities to use AI and automation to:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFITS.map((b, i) => (
              <div key={i} className="border border-white/10 rounded-lg p-5 flex items-start gap-4 bg-[#0d1117]">
                <div className="w-9 h-9 bg-[#00d4ff]/10 rounded-md flex items-center justify-center shrink-0">
                  <b.icon size={18} className="text-[#00d4ff]" />
                </div>
                <p className="text-gray-300 text-sm font-medium leading-snug">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="py-14 bg-[#0d1117] border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-3">Our Approach</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Simple. Practical. Built Around You.
          </h2>
          <div className="space-y-6">
            {APPROACH.map((a, i) => (
              <div key={i} className="flex items-start gap-5">
                <div className="w-10 h-10 bg-[#00d4ff] text-[#05070a] rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {a.step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{a.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Discovery Questions ── */}
      <section id="questions" className="py-14 bg-[#05070a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-3">Discovery Questions</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Help Us Understand Your Operations
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Select all answers that apply to each question. If your situation isn't listed, use the "Other" field to describe it.
          </p>

          <div className="space-y-4">
            {QUESTIONS.map((q, i) => (
              <QuestionCard
                key={q.id}
                q={q}
                index={i}
                selections={selections[q.id] ?? []}
                otherText={otherTexts[q.id] ?? ""}
                onToggle={(opt) => toggleOption(q.id, opt)}
                onOther={(val) => setOtherTexts((prev) => ({ ...prev, [q.id]: val }))}
              />
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-8 border border-white/10 rounded-lg p-6 bg-[#0d1117]">
            <h3 className="text-base font-bold text-white mb-1">Your Information</h3>
            <p className="text-sm text-gray-500 mb-5">So we can follow up with a tailored plan.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold tracking-[0.15em] text-[#00d4ff]/60 uppercase block mb-1.5">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 border border-white/10 rounded-md text-sm text-gray-200 placeholder-gray-600 bg-[#05070a] focus:outline-none focus:border-[#00d4ff]/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.15em] text-[#00d4ff]/60 uppercase block mb-1.5">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-white/10 rounded-md text-sm text-gray-200 placeholder-gray-600 bg-[#05070a] focus:outline-none focus:border-[#00d4ff]/50"
                />
              </div>
              <div>
                <label className="text-xs font-bold tracking-[0.15em] text-[#00d4ff]/60 uppercase block mb-1.5">Firm / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Your firm name"
                  className="w-full px-4 py-2.5 border border-white/10 rounded-md text-sm text-gray-200 placeholder-gray-600 bg-[#05070a] focus:outline-none focus:border-[#00d4ff]/50"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#00d4ff] text-[#05070a] text-sm font-bold tracking-wide uppercase rounded hover:bg-[#00bfea] transition-colors disabled:opacity-60"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Responses"}
              {!submitMutation.isPending && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </section>

      {/* ── Our Goal ── */}
      <section className="py-14 bg-[#0d1117] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="text-[#00d4ff] text-xs font-bold tracking-[0.25em] uppercase mb-3">Our Goal</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">
            Understand First. Recommend Second.
          </h2>
          <div className="text-gray-400 leading-relaxed space-y-4 max-w-2xl">
            <p>
              Before recommending anything, we want to understand your day-to-day operations. Where is the work piling up? What are you doing repeatedly? What information are you constantly chasing? What documents or requests come up over and over again?
            </p>
            <p>
              Once we understand that, we can identify where automation or AI could help in a practical, secure, and meaningful way.
            </p>
          </div>
          <div className="mt-8">
            <a
              href="#questions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-[#05070a] text-sm font-bold tracking-wide uppercase rounded hover:bg-[#00bfea] transition-colors"
            >
              Start Discovery <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-6 bg-[#05070a] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="RRS" className="h-7 w-auto opacity-70" />
            <span className="text-gray-500 text-xs font-semibold tracking-wide">Revenue Relay Systems</span>
          </div>
          <p className="text-gray-600 text-xs">3064 Wake Forest Road, Raleigh, NC 27609</p>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Revenue Relay Systems</p>
        </div>
      </footer>
    </div>
  );
}
