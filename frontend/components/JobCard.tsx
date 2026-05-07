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
    adzuna: "bg-purple-50 text-purple-700 border-purple-200",
    careerfirst: "bg-teal-50 text-teal-700 border-teal-200",
  };

  const sourceKey = job.source?.toLowerCase().replace(/\s/g, "") ?? "";
  const badgeClass =
    sourceColors[sourceKey] ?? "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <div className="group mb-3 flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">

      {/* Company avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF3F8] text-lg font-bold text-[#0A66C2] border border-blue-100">
          {initial}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

          {/* Left side */}
          <div className="min-w-0 flex-1">

            {/* Title */}
            <h3 className="text-base font-semibold text-slate-900 leading-tight group-hover:text-[#0A66C2] transition-colors">
              {job.title}
            </h3>

            {/* Company */}
            <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
              <Building2 size={13} className="text-slate-400 flex-shrink-0" />
              <span className="font-medium">
                {job.company || "Company not listed"}
              </span>
            </div>

            {/* Location + category */}
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-slate-400" />
                {job.location || "Location not listed"}
              </span>
              {job.category && (
                <span className="flex items-center gap-1">
                  <Briefcase size={12} className="text-slate-400" />
                  {job.category}
                </span>
              )}
            </div>

            {/* Description */}
            {job.description && (
              <p className="mt-2.5 text-xs leading-5 text-slate-500 line-clamp-2">
                {job.description.length > 160
                  ? `${job.description.slice(0, 160)}...`
                  : job.description}
              </p>
            )}

            {/* Source badge */}
            {job.source && (
              <div className="mt-3">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}>
                  {job.source}
                </span>
              </div>
            )}

          </div>

          {/* Right side — apply button */}
          {job.url && (
            <div className="flex-shrink-0 sm:ml-4 mt-2 sm:mt-0">
              
                <a href={job.url}  
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#0A66C2] px-4 py-1.5 text-xs font-semibold text-[#0A66C2] transition-all duration-200 hover:bg-[#0A66C2] hover:text-white whitespace-nowrap"
              >
                Easy Apply
                <ExternalLink size={11} />
              </a>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}