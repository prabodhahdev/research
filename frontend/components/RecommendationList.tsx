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
      className={`rounded-xl border border-slate-200 bg-white shadow-sm p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
          <Trophy size={16} className="text-[#0A66C2]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">
            {subtitle ??
              `${recommendations.length} jobs ranked for your CV`}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {recommendations.map((r, idx) => (
          <div
            key={`${r.job.title}-${idx}-${r.job.url ?? ""}`}
            className="rounded-xl border border-slate-100 p-4 bg-slate-50"
          >
            <div className="mb-3">
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
