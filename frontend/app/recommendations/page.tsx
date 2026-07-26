"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecommendationList from "@/components/RecommendationList";
import {
  loadCvRecommendationsFromSession,
  clearCvRecommendationsSession,
  type StoredCvRecommendations,
} from "@/lib/recommendationsStorage";
import {
  Trophy,
  Upload,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  BookOpen,
  Target,
  MapPin,
  Building2,
  ExternalLink,
  Info,
  Loader2,
} from "lucide-react";

// Sample layout when user has not uploaded a CV yet (same structure as before).
const MOCK_RECOMMENDATIONS = [
  {
    rank: 1,
    job: {
      title: "Software Engineer",
      company: "Dialog Axiata",
      location: "Colombo",
      source: "TopJobs",
      url: "#",
    },
  },
  {
    rank: 2,
    job: {
      title: "Full Stack Developer",
      company: "WSO2",
      location: "Colombo",
      source: "ikmanJOBS",
      url: "#",
    },
  },
  {
    rank: 3,
    job: {
      title: "Data Analyst",
      company: "Commercial Bank",
      location: "Colombo",
      source: "XpressJobs",
      url: "#",
    },
  },
];

export default function RecommendationsPage() {
  const [hydrated, setHydrated] = useState(false);
  const [stored, setStored] = useState<StoredCvRecommendations | null>(null);

  useEffect(() => {
    setStored(loadCvRecommendationsFromSession());
    setHydrated(true);
  }, []);

  function handleClearStored() {
    clearCvRecommendationsSession();
    setStored(null);
  }

  const savedLabel = stored
    ? new Date(stored.savedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  return (
    <main className="bg-[#F3F2EF] overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-4 sm:py-8">

        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Job Recommendations
          </h1>
          <p className="mt-1 text-sm text-slate-500 leading-6">
            Hybrid NLP job matches based on your CV skills and experience
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-4">

          <div className="order-2 space-y-4 min-w-0 lg:order-1 lg:col-span-1">

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0A66C2]">
                  <Upload size={15} className="text-white" />
                </div>
                <h2 className="text-sm font-bold text-blue-900">
                  Get Your Matches
                </h2>
              </div>
              <p className="text-sm text-blue-700 leading-5 mb-4">
                Upload your CV on the Upload CV page to get personalized job
                recommendations. Results appear here automatically for this
                browser session.
              </p>
              <Link
                href="/upload-cv"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#004182] transition-colors"
              >
                <Upload size={13} className="flex-shrink-0" />
                Upload Your CV
                <ArrowRight size={13} className="flex-shrink-0" />
              </Link>
            </div>

            {stored && stored.skills.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Skills from your CV
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {stored.skills.slice(0, 24).map((s) => (
                    <span
                      key={s}
                      className="max-w-full break-words rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-sm font-medium text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {stored.skills.length > 24 && (
                  <p className="mt-2 text-sm text-slate-400">
                    +{stored.skills.length - 24} more
                  </p>
                )}
              </div>
            )}

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={14} className="text-[#0A66C2]" />
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                  How Matching Works
                </h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: <Target size={12} className="text-slate-500" />, text: "We extract structured skills & keywords from your CV" },
                  { icon: <TrendingUp size={12} className="text-slate-500" />, text: "Jobs come from the imported research dataset" },
                  { icon: <Sparkles size={12} className="text-slate-500" />, text: "A hybrid NLP recommendation model blends skill overlap and text similarity with your CV" },
                  { icon: <Star size={12} className="text-slate-500" />, text: "Jobs are shown in ranked order from the stacking ensemble model" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                    <p className="text-sm text-slate-600 leading-5">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-green-50 bg-green-50 p-4 mt-4">
                <div className="flex items-start gap-2">
                  <Info size={13} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-800 uppercase tracking-wide mb-1">
                      How ranking works
                    </p>
                    <p className="text-sm text-green-700 leading-relaxed">
                      Jobs are ordered by the stacking recommendation model
                      (trained with NDCG@10). Results appear as a ranked list
                      (#1, #2, …) without a separate match percentage.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="order-1 min-w-0 space-y-4 lg:order-2 lg:col-span-3">

            {!hydrated && (
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-20 shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-[#0A66C2] mb-2" />
                <p className="text-sm text-slate-500">Loading…</p>
              </div>
            )}

            {hydrated && stored && stored.recommendations.length > 0 && (
              <>
                <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                  <Sparkles size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-800">
                      Personalized from your CV
                    </p>
                    
                    <button
                      type="button"
                      onClick={handleClearStored}
                      className="mt-3 text-sm font-semibold text-green-900 underline hover:no-underline"
                    >
                      Clear saved results from this browser
                    </button>
                  </div>
                </div>
                <RecommendationList
                  recommendations={stored.recommendations.slice(0, 20)}
                  title="Your top job matches"
                  subtitle={`${Math.min(stored.recommendations.length, 20)} picks from your latest upload`}
                  className="border-green-100"
                />
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 text-center sm:p-6">
                  <Upload size={24} className="mx-auto text-[#0A66C2] mb-2" />
                  <p className="text-sm text-slate-600 mb-4 leading-6">
                    Upload again anytime to refresh against the imported research dataset.
                  </p>
                  <Link
                    href="/upload-cv"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#004182] transition-colors sm:w-auto sm:py-2"
                  >
                    <Upload size={14} className="flex-shrink-0" />
                    Upload CV again
                  </Link>
                </div>
              </>
            )}

            {hydrated && (!stored || stored.recommendations.length === 0) && (
              <>
                <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <Sparkles size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">
                      Preview Mode — Sample Recommendations
                    </p>
                    <p className="text-sm text-amber-700 mt-0.5 leading-5">
                      These screenshots illustrate the layout only. Upload your CV on the{" "}
                      <Link
                        href="/upload-cv"
                        className="font-semibold underline hover:text-amber-900"
                      >
                        Upload CV page
                      </Link>{" "}
                      — your matches will appear here automatically.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Trophy size={16} className="text-[#0A66C2] flex-shrink-0" />
                    <h2 className="text-sm font-bold text-slate-800">
                      Sample job matches (demo)
                    </h2>
                    <span className="flex-shrink-0 rounded-full bg-[#0A66C2] px-2 py-0.5 text-sm font-bold text-white">
                      {MOCK_RECOMMENDATIONS.length}
                    </span>
                  </div>
                  <Link
                    href="/upload-cv"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:underline"
                  >
                    <Upload size={12} className="flex-shrink-0" />
                    Upload CV for real results
                  </Link>
                </div>

                {MOCK_RECOMMENDATIONS.map((rec) => (
                  <div
                    key={rec.rank}
                    className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50 sm:px-5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A66C2] text-sm font-bold text-white">
                        #{rec.rank}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                        <div className="flex gap-3 min-w-0">
                          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#EEF3F8] text-base font-bold text-[#0A66C2] border border-blue-100">
                            {rec.job.company.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-slate-900 break-words">{rec.job.title}</h3>
                            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-600 min-w-0">
                              <Building2 size={12} className="text-slate-400 flex-shrink-0" />
                              <span className="font-medium truncate">{rec.job.company}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 sm:gap-3">
                              <span className="flex items-center gap-1">
                                <MapPin size={11} className="text-slate-400 flex-shrink-0" />
                                {rec.job.location}
                              </span>
                              <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700">
                                {rec.job.source}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="inline-flex w-full flex-shrink-0 items-center justify-center gap-1.5 rounded-full border-2 border-slate-200 px-4 py-2 text-sm font-semibold text-slate-400 sm:w-auto sm:py-1.5">
                          Easy Apply (demo)
                          <ExternalLink size={11} className="flex-shrink-0" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 text-center sm:p-6">
                  <Trophy size={28} className="mx-auto text-[#0A66C2] mb-3" />
                  <h3 className="text-sm font-bold text-slate-800 mb-1">See your real job matches</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-6">
                    Upload your CV and get personalized recommendations from the imported research dataset, rule-based parser, and hybrid NLP recommendation model.
                  </p>
                  <Link
                    href="/upload-cv"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white hover:bg-[#004182] transition-colors sm:w-auto sm:py-2.5"
                  >
                    <Upload size={14} className="flex-shrink-0" />
                    Upload My CV Now
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
