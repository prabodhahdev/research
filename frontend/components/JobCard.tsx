"use client";

import type { Job } from "@/types/job";
import { MapPin, Briefcase, ExternalLink, Building2 } from "lucide-react";

export default function JobCard({ job }: { job: Job }) {
  const initial = job.company
    ? job.company.charAt(0).toUpperCase()
    : "J";

  const sourceColors: Record<string, string> = {
    topjobs: "bg-blue-50 text-blue-700 border-blue-200",
    ikman: "bg-orange-50 text-orange-700 border-orange-200",
    xpressjobs: "bg-green-50 text-green-700 border-green-200",
    careerfirst: "bg-teal-50 text-teal-700 border-teal-200",
  };

  const sourceKey = job.source?.toLowerCase().replace(/\s/g, "") ?? "";
  const badgeClass =
    sourceColors[sourceKey] ?? "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <div className="group mb-0 flex gap-3 sm:gap-4 rounded-xl border border-slate-200 bg-white p-3 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 min-w-0">

      {/* Company avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#EEF3F8] text-base sm:text-lg font-bold text-[#0A66C2] border border-blue-100">
          {initial}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col gap-3">

          {/* Left side */}
          <div className="min-w-0 flex-1">

            {/* Title */}
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug break-words group-hover:text-[#0A66C2] transition-colors">
              {job.title}
            </h3>

            {/* Company */}
            <div className="mt-1.5 flex items-center gap-1.5 text-sm sm:text-base text-slate-600 min-w-0">
              <Building2 size={15} className="text-slate-400 flex-shrink-0" />
              <span className="font-medium truncate">
                {job.company || "Company not listed"}
              </span>
            </div>

            {/* Location + category */}
            <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 text-sm text-slate-500">
              <span className="flex items-start gap-1 min-w-0">
                <MapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="break-words">{job.location || "Location not listed"}</span>
              </span>
              {job.category && (
                <span className="flex items-start gap-1 min-w-0 overflow-hidden">
                  <Briefcase size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 break-all">{job.category}</span>
                </span>
              )}
            </div>

            {/* Description */}
            {job.description && (
              <p className="mt-2 sm:mt-3 text-sm leading-6 text-slate-500 line-clamp-2 break-words">
                {job.description.length > 160
                  ? `${job.description.slice(0, 160)}...`
                  : job.description}
              </p>
            )}

            {/* Source badge */}
            {job.source && (
              <div className="mt-2 sm:mt-3">
                <span className={`inline-flex max-w-full items-center rounded-full border px-3 py-1 text-sm font-medium break-all ${badgeClass}`}>
                  {job.source}
                </span>
              </div>
            )}

          </div>

          {/* Apply button — full width on mobile */}
          {job.url && (
            <div className="w-full sm:w-auto sm:self-start">
              <a
                href={job.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-full border-2 border-[#0A66C2] px-5 py-2.5 sm:py-2 text-sm font-semibold text-[#0A66C2] transition-all duration-200 hover:bg-[#0A66C2] hover:text-white"
              >
                Easy Apply
                <ExternalLink size={13} />
              </a>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
