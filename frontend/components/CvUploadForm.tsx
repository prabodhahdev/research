"use client";

import { useState, useRef } from "react";
import { uploadCv } from "@/lib/api";
import type {
  CvUploadResponse,
  JobRecommendation,
} from "@/types/recommendation";
import JobCard from "./JobCard";
import {
  Upload,
  FileText,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";

export default function CvUploadForm({
  onRecommendations,
}: {
  onRecommendations?: (data: CvUploadResponse) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    if (f && f.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    setFile(f);
    setError(null);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0] ?? null;
    handleFile(f);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Please choose a PDF CV file first.");
      return;
    }
    setLoading(true);
    try {
      const data = await uploadCv(file);
      setRecommendations(data.recommendations);
      onRecommendations?.(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  // score color
  function scoreColor(score: number) {
    if (score >= 0.75) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 0.5) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 0.3) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-slate-500 bg-slate-50 border-slate-200";
  }

  // score label
  function scoreLabel(score: number) {
    if (score >= 0.75) return "Excellent Match";
    if (score >= 0.5) return "Good Match";
    if (score >= 0.3) return "Partial Match";
    return "Low Match";
  }

  return (
    <div className="space-y-4">

      {/* Upload card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
        <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Upload size={15} className="text-[#0A66C2]" />
          Upload Your CV
        </h2>

        <form onSubmit={onSubmit}>

          {/* Drop zone */}
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
              dragging
                ? "border-[#0A66C2] bg-blue-50"
                : file
                ? "border-green-300 bg-green-50"
                : "border-slate-300 bg-slate-50 hover:border-[#0A66C2] hover:bg-blue-50"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) =>
                handleFile(e.target.files?.[0] ?? null)
              }
            />

            {file ? (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 mb-3">
                  <FileText size={24} className="text-green-600" />
                </div>
                <p className="text-sm font-semibold text-green-700">
                  {file.name}
                </p>
                <p className="text-xs text-green-500 mt-1">
                  {(file.size / 1024).toFixed(1)} KB — Ready to upload
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 transition-colors"
                >
                  <X size={12} />
                  Remove file
                </button>
              </>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 mb-3">
                  <Upload size={24} className="text-[#0A66C2]" />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Drag and drop your CV here
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  or click to browse files
                </p>
                <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
                  <FileText size={11} />
                  PDF files only
                </p>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle size={14} className="flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !file}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analyzing your CV...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Get AI Job Recommendations
              </>
            )}
          </button>
        </form>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
          <Loader2
            size={28}
            className="animate-spin text-[#0A66C2] mx-auto mb-3"
          />
          <p className="text-sm font-semibold text-blue-800">
            Analyzing your CV...
          </p>
          <p className="text-xs text-blue-500 mt-1">
            Gemini AI is reading your skills and finding the best matches
          </p>
        </div>
      )}

      {/* Recommendations */}
      {!loading && recommendations.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">

          {/* Results header */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
              <Trophy size={16} className="text-[#0A66C2]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Your Top Job Matches
              </h3>
              <p className="text-xs text-slate-500">
                {recommendations.length} jobs matched based on your CV
              </p>
            </div>
          </div>

          {/* Each recommendation */}
          <div className="space-y-5">
            {recommendations.map((r, idx) => (
              <div
                key={`${r.job.title}-${idx}`}
                className="rounded-xl border border-slate-100 p-4 bg-slate-50"
              >
                {/* Match score bar */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">
                      #{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${scoreColor(r.match_score)}`}
                    >
                      {scoreLabel(r.match_score)} —{" "}
                      {(r.match_score * 100).toFixed(0)}%
                    </span>
                  </div>

                  {/* Score progress bar */}
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#0A66C2] transition-all duration-500"
                        style={{
                          width: `${Math.min(r.match_score * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      {(r.match_score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Job card */}
                <JobCard job={r.job} />

                {/* Skills section */}
                <div className="mt-3 grid sm:grid-cols-2 gap-3">

                  {/* Matched skills */}
                  <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-green-700 mb-2">
                      <CheckCircle2 size={12} />
                      Matched Skills
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {r.matched_skills.length > 0 ? (
                        r.matched_skills.slice(0, 6).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-green-100 border border-green-200 px-2 py-0.5 text-xs font-medium text-green-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-green-600">
                          N/A
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Missing skills */}
                  <div className="rounded-lg border border-red-100 bg-red-50 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-bold text-red-700 mb-2">
                      <XCircle size={12} />
                      Skills to Improve
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {r.missing_skills.length > 0 ? (
                        r.missing_skills.slice(0, 6).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-red-100 border border-red-200 px-2 py-0.5 text-xs font-medium text-red-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-red-600">
                          None — great fit!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}