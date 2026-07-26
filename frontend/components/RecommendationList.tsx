"use client";

import type { JobRecommendation } from "@/types/recommendation";
import JobCard from "./JobCard";
import { Trophy } from "lucide-react";

export default function RecommendationList({
  recommendations,
  title = "Your Top Job Matches",
  subtitle,
  className = "",
}: {
  recommendations: JobRecommendation[];
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  if (recommendations.length === 0) return null;

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6 min-w-0 overflow-hidden ${className}`}
    >
      <div className="flex items-start gap-2 mb-4 sm:mb-5 min-w-0">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
          <Trophy size={16} className="text-[#0A66C2]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 break-words">
            {subtitle ??
              `${recommendations.length} jobs ranked for your CV`}
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-5">
        {recommendations.map((r, idx) => (
          <div
            key={`${r.job.title}-${idx}-${r.job.url ?? ""}`}
            className="rounded-xl border border-slate-100 p-3 sm:p-4 bg-slate-50 min-w-0"
          >
            <div className="mb-2 sm:mb-3">
              <span className="text-sm font-bold text-slate-500">
                #{idx + 1}
              </span>
            </div>
            <JobCard job={r.job} />
          </div>
        ))}
      </div>
    </div>
  );
}
