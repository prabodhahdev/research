"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Upload,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  CheckCircle2,
  XCircle,
  MapPin,
  Building2,
  ExternalLink,
  Info,
} from "lucide-react";

// mock data to show how it looks with real data
const MOCK_RECOMMENDATIONS = [
  {
    rank: 1,
    score: 92,
    job: {
      title: "Software Engineer",
      company: "Dialog Axiata",
      location: "Colombo",
      source: "TopJobs",
      url: "#",
    },
    matched_skills: ["Python", "React", "SQL", "REST API", "Git"],
    missing_skills: ["Docker", "AWS"],
    label: "Excellent Match",
    labelColor: "text-green-700 bg-green-50 border-green-200",
    barColor: "bg-green-500",
  },
  {
    rank: 2,
    score: 78,
    job: {
      title: "Full Stack Developer",
      company: "WSO2",
      location: "Colombo",
      source: "ikmanJOBS",
      url: "#",
    },
    matched_skills: ["JavaScript", "Node.js", "React", "MongoDB"],
    missing_skills: ["Kubernetes", "TypeScript"],
    label: "Good Match",
    labelColor: "text-blue-700 bg-blue-50 border-blue-200",
    barColor: "bg-[#0A66C2]",
  },
  {
    rank: 3,
    score: 61,
    job: {
      title: "Data Analyst",
      company: "Commercial Bank",
      location: "Colombo",
      source: "XpressJobs",
      url: "#",
    },
    matched_skills: ["Python", "Excel", "SQL"],
    missing_skills: ["Tableau", "Power BI", "R"],
    label: "Partial Match",
    labelColor: "text-amber-700 bg-amber-50 border-amber-200",
    barColor: "bg-amber-500",
  },
];

export default function RecommendationsPage() {
  const [hasUploaded] = useState(false);

  return (
    <main className="min-h-screen bg-[#F3F2EF]">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* ── PAGE HEADER ──────────────────────── */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Job Recommendations
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            AI-powered job matches based on your CV skills and experience
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">

          {/* ── LEFT SIDEBAR ─────────────────── */}
          <div className="space-y-4 lg:col-span-1">

            {/* Upload prompt card */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2]">
                  <Upload size={15} className="text-white" />
                </div>
                <h2 className="text-sm font-bold text-blue-900">
                  Get Your Matches
                </h2>
              </div>
              <p className="text-xs text-blue-700 leading-5 mb-4">
                Upload your CV on the Upload CV page to get
                personalized job recommendations powered by Gemini AI.
              </p>
              <Link
                href="/upload-cv"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#004182] transition-colors"
              >
                <Upload size={13} />
                Upload Your CV
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* How matching works */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                <Info size={13} className="text-[#0A66C2]" />
                How matching works
              </h3>
              <div className="space-y-3">
                {[
                  {
                    icon: <BookOpen size={13} className="text-[#0A66C2]" />,
                    text: "AI reads your CV and extracts skills",
                  },
                  {
                    icon: <Target size={13} className="text-[#0A66C2]" />,
                    text: "Compares against all Sri Lankan jobs",
                  },
                  {
                    icon: <TrendingUp size={13} className="text-[#0A66C2]" />,
                    text: "Ranks by match percentage score",
                  },
                  {
                    icon: <Star size={13} className="text-[#0A66C2]" />,
                    text: "Shows matched and missing skills",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-50">
                      {item.icon}
                    </div>
                    <p className="text-xs text-slate-600 leading-5">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Score legend */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Match Score Guide
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Excellent Match", range: "75–100%", color: "bg-green-500" },
                  { label: "Good Match", range: "50–74%", color: "bg-[#0A66C2]" },
                  { label: "Partial Match", range: "30–49%", color: "bg-amber-500" },
                  { label: "Low Match", range: "0–29%", color: "bg-slate-400" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${item.color}`} />
                    <div className="flex flex-1 items-center justify-between">
                      <span className="text-xs text-slate-600">{item.label}</span>
                      <span className="text-xs font-medium text-slate-400">{item.range}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── MAIN CONTENT ─────────────────── */}
          <div className="lg:col-span-3 space-y-4">

            {/* Info banner */}
            <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <Sparkles size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-800">
                  Preview Mode — Sample Recommendations
                </p>
                <p className="text-xs text-amber-700 mt-0.5 leading-5">
                  These are sample results to show how recommendations look.
                  Upload your CV on the{" "}
                  <Link
                    href="/upload-cv"
                    className="font-semibold underline hover:text-amber-900"
                  >
                    Upload CV page
                  </Link>{" "}
                  to get your real personalized matches.
                </p>
              </div>
            </div>

            {/* Results header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={16} className="text-[#0A66C2]" />
                <h2 className="text-sm font-bold text-slate-800">
                  Top Job Matches
                </h2>
                <span className="rounded-full bg-[#0A66C2] px-2 py-0.5 text-xs font-bold text-white">
                  {MOCK_RECOMMENDATIONS.length}
                </span>
              </div>
              <Link
                href="/upload-cv"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A66C2] hover:underline"
              >
                <Upload size={12} />
                Upload CV for real results
              </Link>
            </div>

            {/* Recommendation cards */}
            {MOCK_RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.rank}
                className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Card top bar — rank + score */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A66C2] text-xs font-bold text-white">
                      #{rec.rank}
                    </div>
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${rec.labelColor}`}>
                      {rec.label}
                    </span>
                  </div>

                  {/* Score + progress bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-28 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${rec.barColor}`}
                          style={{ width: `${rec.score}%` }}
                        />
                      </div>
                      <span className="text-sm font-extrabold text-slate-700">
                        {rec.score}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Job info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      {/* Company avatar */}
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#EEF3F8] text-base font-bold text-[#0A66C2] border border-blue-100">
                        {rec.job.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {rec.job.title}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-600">
                          <Building2 size={12} className="text-slate-400" />
                          <span className="font-medium">{rec.job.company}</span>
                        </div>
                        <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={11} className="text-slate-400" />
                            {rec.job.location}
                          </span>
                          <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                            {rec.job.source}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Apply button */}
                    <a
                      href={rec.job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border-2 border-[#0A66C2] px-4 py-1.5 text-xs font-semibold text-[#0A66C2] transition-all hover:bg-[#0A66C2] hover:text-white"
                    >
                      Easy Apply
                      <ExternalLink size={11} />
                    </a>
                  </div>

                  {/* Skills section */}
                  <div className="mt-4 grid sm:grid-cols-2 gap-3">

                    {/* Matched skills */}
                    <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-green-700 mb-2">
                        <CheckCircle2 size={12} />
                        Your Matched Skills
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.matched_skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-green-200 bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing skills */}
                    <div className="rounded-lg border border-red-100 bg-red-50 p-3">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-red-700 mb-2">
                        <XCircle size={12} />
                        Skills to Improve
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.missing_skills.length > 0 ? (
                          rec.missing_skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-red-200 bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
                            >
                              {skill}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-red-600">
                            None — perfect fit!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 text-center">
              <Trophy size={28} className="mx-auto text-[#0A66C2] mb-3" />
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                See your real job matches
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Upload your CV and get personalized recommendations
                based on your actual skills and experience
              </p>
              <Link
                href="/upload-cv"
                className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#004182] transition-colors"
              >
                <Upload size={14} />
                Upload My CV Now
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}