"use client";

import { useState } from "react";
import { searchJobs } from "@/lib/api";
import type { Job } from "@/types/job";
import JobCard from "@/components/JobCard";
import { Search, Loader2, AlertCircle, SearchX } from "lucide-react";

export default function JobsPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  async function onSearch(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setSearched(true);
    try {
      const data = await searchJobs({
        query: query.trim() || undefined,
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
    <main className="bg-[#F3F2EF]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-7">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Sri Lankan Jobs
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Search the imported research job dataset by keyword
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 mb-5">
          <form onSubmit={onSearch}>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search jobs, skills, companies..."
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-11 pr-4 py-3 text-base outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 focus:bg-white"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#004182] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Search size={17} />
                )}
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin mb-3 text-[#0A66C2]" />
            <p className="text-base font-medium text-slate-500">Searching jobs...</p>
          </div>
        ) : jobs.length > 0 ? (
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-700">{jobs.length}</span>{" "}
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
            <p className="text-base font-semibold text-slate-700">No jobs found</p>
            <p className="mt-1 text-sm text-slate-400">
              Try different keywords
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <Search size={40} className="text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">
              Search for jobs above
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Enter a keyword to get started
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
