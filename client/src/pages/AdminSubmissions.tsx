import { trpc } from "@/lib/trpc";
import { useState } from "react";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663427471100/HXXxYWaJKn68sUQWTqrYJ5/rrs_logo_cef58a2c.png";

export default function AdminSubmissions() {
  const { data: submissions, isLoading, error, refetch } = trpc.discovery.list.useQuery();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen" style={{ background: "#05070a", color: "#ffffff" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }} className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="RRS" className="h-10 w-auto" />
          <div>
            <div className="text-white font-extrabold text-base tracking-wide">REVENUE RELAY SYSTEMS</div>
            <div style={{ color: "#00d4ff" }} className="text-xs font-bold tracking-widest uppercase">Discovery Submissions</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => refetch()}
            style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff" }}
            className="px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-[#00d4ff]/10 transition-colors"
          >
            Refresh
          </button>
          <a
            href="/"
            style={{ color: "#a0aab5" }}
            className="text-xs font-medium tracking-wide uppercase hover:text-white transition-colors"
          >
            ← Back to Site
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">All Submissions</h1>
            <p style={{ color: "#a0aab5" }} className="text-sm mt-1">
              {isLoading ? "Loading..." : `${submissions?.length ?? 0} total response${(submissions?.length ?? 0) !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20" style={{ color: "#a0aab5" }}>
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-sm font-medium">Loading submissions...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.05)" }} className="p-6 text-center">
            <p className="text-red-400 text-sm">Failed to load submissions. Please refresh.</p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && submissions?.length === 0 && (
          <div style={{ border: "1px solid rgba(255,255,255,0.06)" }} className="p-16 text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-white font-bold text-lg mb-2">No submissions yet</p>
            <p style={{ color: "#a0aab5" }} className="text-sm">
              Share <span style={{ color: "#00d4ff" }}>revenuerelaysystems.com/discovery</span> to start collecting responses.
            </p>
          </div>
        )}

        {/* Submissions list */}
        {!isLoading && !error && submissions && submissions.length > 0 && (
          <div className="space-y-4">
            {submissions.map((sub, i) => {
              const isOpen = expanded === sub.id;
              const answeredCount = sub.answers.filter(
                (a) => a.selectedOptions.length > 0 || a.otherText
              ).length;

              return (
                <div
                  key={sub.id}
                  style={{ border: isOpen ? "1px solid rgba(0,212,255,0.3)" : "1px solid rgba(255,255,255,0.07)" }}
                  className="transition-all duration-200"
                >
                  {/* Row header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : sub.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-5 min-w-0">
                      <span
                        style={{ background: "rgba(0,212,255,0.1)", color: "#00d4ff", border: "1px solid rgba(0,212,255,0.2)" }}
                        className="text-xs font-black w-8 h-8 flex items-center justify-center shrink-0"
                      >
                        {submissions.length - i}
                      </span>
                      <div className="min-w-0">
                        <div className="text-white font-bold text-sm truncate">
                          {sub.contactName || sub.contactCompany || <span style={{ color: "#a0aab5" }}>Anonymous</span>}
                        </div>
                        <div style={{ color: "#a0aab5" }} className="text-xs mt-0.5 truncate">
                          {sub.contactEmail && <span className="mr-3">{sub.contactEmail}</span>}
                          {sub.contactCompany && sub.contactName && <span>{sub.contactCompany}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div style={{ color: "#00d4ff" }} className="text-xs font-bold">
                          {answeredCount}/5 answered
                        </div>
                        <div style={{ color: "#a0aab5" }} className="text-xs mt-0.5">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                            hour: "numeric", minute: "2-digit", timeZone: "America/New_York"
                          })} ET
                        </div>
                      </div>
                      <span style={{ color: "#a0aab5" }} className="text-lg">
                        {isOpen ? "▲" : "▼"}
                      </span>
                    </div>
                  </button>

                  {/* Expanded answers */}
                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} className="px-6 py-6 space-y-6">
                      {/* Contact info */}
                      {(sub.contactName || sub.contactEmail || sub.contactCompany) && (
                        <div style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }} className="p-4">
                          <div style={{ color: "#00d4ff" }} className="text-xs font-bold tracking-widest uppercase mb-3">Contact Information</div>
                          <div className="grid sm:grid-cols-3 gap-3">
                            {sub.contactName && (
                              <div>
                                <div style={{ color: "#a0aab5" }} className="text-xs uppercase tracking-wide mb-1">Name</div>
                                <div className="text-white text-sm font-medium">{sub.contactName}</div>
                              </div>
                            )}
                            {sub.contactEmail && (
                              <div>
                                <div style={{ color: "#a0aab5" }} className="text-xs uppercase tracking-wide mb-1">Email</div>
                                <a href={`mailto:${sub.contactEmail}`} style={{ color: "#00d4ff" }} className="text-sm font-medium hover:underline">
                                  {sub.contactEmail}
                                </a>
                              </div>
                            )}
                            {sub.contactCompany && (
                              <div>
                                <div style={{ color: "#a0aab5" }} className="text-xs uppercase tracking-wide mb-1">Company</div>
                                <div className="text-white text-sm font-medium">{sub.contactCompany}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Answers */}
                      {sub.answers.map((answer, qi) => (
                        <div key={qi}>
                          <div className="flex items-start gap-3 mb-3">
                            <span
                              style={{ background: "rgba(255,255,255,0.05)", color: "#a0aab5" }}
                              className="text-xs font-black w-6 h-6 flex items-center justify-center shrink-0 mt-0.5"
                            >
                              {qi + 1}
                            </span>
                            <div className="text-white font-bold text-sm leading-snug">{answer.question}</div>
                          </div>
                          <div className="ml-9 space-y-2">
                            {answer.selectedOptions.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {answer.selectedOptions.map((opt, oi) => (
                                  <span
                                    key={oi}
                                    style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}
                                    className="text-xs font-medium px-3 py-1"
                                  >
                                    {opt}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                            {answer.otherText && (
                              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }} className="px-3 py-2">
                                <span style={{ color: "#a0aab5" }} className="text-xs font-bold uppercase tracking-wide">Other: </span>
                                <span className="text-white text-sm">{answer.otherText}</span>
                              </div>
                            )}
                            {answer.selectedOptions.length === 0 && !answer.otherText && (
                              <span style={{ color: "#a0aab5" }} className="text-xs italic">No answer provided</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
