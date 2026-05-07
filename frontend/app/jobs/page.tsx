"use client";

import { useMemo, useState } from "react";
import { searchJobs } from "@/lib/api";
import type { Job } from "@/types/job";
import JobCard from "@/components/JobCard";
import {
  Search,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  SearchX,
  Wifi,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

const LOCATIONS = [
  "All Districts",
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Monaragala",
  "Ratnapura",
  "Kegalle",
  "Negombo",
];

const CATEGORIES = [
  "All Categories",
  "IT & Software",
  "Engineering",
  "Healthcare",
  "Business & Management",
  "Marketing & Sales",
  "Education & Teaching",
  "Finance & Accounting",
  "Hospitality & Tourism",
  "Legal",
  "Design & Creative",
  "Customer Service",
  "Manufacturing",
  "Agriculture",
  "NGO & Non-Profit",
];

const SOURCES = [
  "All Sources",
  "TopJobs",
  "ikmanJOBS",
  "XpressJobs",
  "CareerFirst",
  "Adzuna",
];

const WORK_TYPES = [
  { label: "Any Type", value: "all" },
  { label: "On-site", value: "onsite" },
  { label: "Remote", value: "remote" },
  { label: "Hybrid", value: "hybrid" },
];

const EXPERIENCE_LEVELS = [
  { label: "All Levels", value: "all" },
  { label: "Internship", value: "internship" },
  { label: "Entry Level (0–1 yrs)", value: "entry" },
  { label: "Junior (1–3 yrs)", value: "junior" },
  { label: "Mid Level (3–5 yrs)", value: "mid" },
  { label: "Senior (5–8 yrs)", value: "senior" },
  { label: "Lead / Manager (8+ yrs)", value: "lead" },
];

// reusable section header
function FilterSection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        {icon}
        {title}
      </label>
      {children}
      <div className="border-t border-slate-100 mt-4" />
    </div>
  );
}

// reusable pill button for filters
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150 ${
        active
          ? "bg-[#EEF3F8] text-[#0A66C2] font-semibold"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All Districts");
  const [category, setCategory] = useState("All Categories");
  const [source, setSource] = useState("All Sources");
  const [workType, setWorkType] = useState("all");
  const [experience, setExperience] = useState("all");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const canSearch = useMemo(
    () =>
      query.trim().length > 0 ||
      location !== "All Districts" ||
      workType !== "all" ||
      experience !== "all",
    [query, location, workType, experience]
  );

  // count active filters for badge
  const activeFilterCount = [
    location !== "All Districts",
    category !== "All Categories",
    source !== "All Sources",
    workType !== "all",
    experience !== "all",
  ].filter(Boolean).length;

  function clearAllFilters() {
    setLocation("All Districts");
    setCategory("All Categories");
    setSource("All Sources");
    setWorkType("all");
    setExperience("all");
  }

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchJobs({
        query: query.trim() || undefined,
        location: location !== "All Districts" ? location : undefined,
        category: category !== "All Categories" ? category : undefined,
        page: 1,
        pageSize: 20,
      });
      setJobs(data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F3F2EF]">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* ── PAGE HEADER ────────────────────────── */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Browse Sri Lankan Jobs
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Aggregated from TopJobs, ikman, XpressJobs, CareerFirst
            and more — all in one place
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-5">

          {/* ── SIDEBAR FILTERS ────────────────── */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 sticky top-16">

              {/* Filter header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-[#0A66C2]" />
                  <h2 className="text-sm font-bold text-slate-800">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0A66C2] text-xs font-bold text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#0A66C2] font-medium hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Location dropdown */}
              <FilterSection
                icon={<MapPin size={11} />}
                title="District"
              >
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </FilterSection>

              {/* Work type */}
              <FilterSection
                icon={<Wifi size={11} />}
                title="Work Type"
              >
                <div className="space-y-1">
                  {WORK_TYPES.map((type) => (
                    <FilterPill
                      key={type.value}
                      label={type.label}
                      active={workType === type.value}
                      onClick={() => setWorkType(type.value)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Experience level */}
              <FilterSection
                icon={<GraduationCap size={11} />}
                title="Experience"
              >
                <div className="space-y-1">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <FilterPill
                      key={level.value}
                      label={level.label}
                      active={experience === level.value}
                      onClick={() => setExperience(level.value)}
                    />
                  ))}
                </div>
              </FilterSection>

              {/* Category dropdown */}
              <FilterSection
                icon={<Briefcase size={11} />}
                title="Category"
              >
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 outline-none focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </FilterSection>

              {/* Source portal */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Source Portal
                </label>
                <div className="space-y-1">
                  {SOURCES.map((src) => (
                    <FilterPill
                      key={src}
                      label={src}
                      active={source === src}
                      onClick={() => setSource(src)}
                    />
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* ── MAIN CONTENT ───────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Search bar */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 mb-4">
              <form onSubmit={onSearch}>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search jobs, skills, companies..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004182] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <Search size={15} />
                    )}
                    {loading ? "Searching..." : "Search"}
                  </button>
                </div>

                {/* Active filter chips */}
                {activeFilterCount > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {location !== "All Districts" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        <MapPin size={10} />
                        {location}
                        <button
                          type="button"
                          onClick={() => setLocation("All Districts")}
                          className="ml-1 hover:text-blue-900 font-bold"
                        >×</button>
                      </span>
                    )}
                    {workType !== "all" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        <Wifi size={10} />
                        {WORK_TYPES.find((w) => w.value === workType)?.label}
                        <button
                          type="button"
                          onClick={() => setWorkType("all")}
                          className="ml-1 hover:text-blue-900 font-bold"
                        >×</button>
                      </span>
                    )}
                    {experience !== "all" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        <GraduationCap size={10} />
                        {EXPERIENCE_LEVELS.find((l) => l.value === experience)?.label}
                        <button
                          type="button"
                          onClick={() => setExperience("all")}
                          className="ml-1 hover:text-blue-900 font-bold"
                        >×</button>
                      </span>
                    )}
                    {category !== "All Categories" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        <Briefcase size={10} />
                        {category}
                        <button
                          type="button"
                          onClick={() => setCategory("All Categories")}
                          className="ml-1 hover:text-blue-900 font-bold"
                        >×</button>
                      </span>
                    )}
                    {source !== "All Sources" && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                        {source}
                        <button
                          type="button"
                          onClick={() => setSource("All Sources")}
                          className="ml-1 hover:text-blue-900 font-bold"
                        >×</button>
                      </span>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Results */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin mb-3 text-[#0A66C2]" />
                <p className="text-sm font-medium text-slate-500">
                  Searching jobs...
                </p>
              </div>
            ) : jobs.length > 0 ? (
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500">
                    Showing{" "}
                    <span className="font-bold text-slate-700">
                      {jobs.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                {jobs.map((j, idx) => (
                  <JobCard key={`${j.title}-${idx}`} job={j} />
                ))}
              </div>
            ) : searched ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-16 text-center shadow-sm">
                <SearchX size={36} className="text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-700">
                  No jobs found
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Try different keywords or clear the filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-xs font-semibold text-[#0A66C2] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
                <Search size={36} className="text-slate-300 mb-3" />
                <p className="text-sm font-semibold text-slate-700">
                  Search for jobs above
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Enter a keyword or select filters to get started
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}