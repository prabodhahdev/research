"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { uploadCv } from "@/lib/api";
import { saveCvRecommendationsToSession } from "@/lib/recommendationsStorage";
import type {
  CvUploadResponse,
  JobRecommendation,
} from "@/types/recommendation";
import RecommendationList from "./RecommendationList";
import {
  Upload,
  FileText,
  X,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

/** First-screen preview on Upload CV; full list on /recommendations via Load more */
const UPLOAD_PREVIEW_LIMIT = 8;

export default function CvUploadForm({
  onRecommendations,
}: {
  onRecommendations?: (data: CvUploadResponse) => void;
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    if (!f) {
      setFile(null);
      return;
    }
    const name = f.name.toLowerCase();
    const okType =
      f.type === "application/pdf" ||
      f.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".pdf") ||
      name.endsWith(".docx");
    if (!okType) {
      setError("Only PDF and DOCX files are supported.");
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
      setError("Please choose a PDF or DOCX CV file first.");
      return;
    }
    setLoading(true);
    try {
      const data = await uploadCv(file);
      setRecommendations(data.recommendations);
      saveCvRecommendationsToSession({
        v: 1,
        skills: data.skills ?? [],
        recommendations: data.recommendations,
        jobsConsidered: data.jobs_considered ?? 0,
        savedAt: new Date().toISOString(),
      });
      onRecommendations?.(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 min-w-0">

      {/* Upload card */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6">
        <h2 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Upload size={17} className="text-[#0A66C2] flex-shrink-0" />
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
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 sm:p-10 text-center cursor-pointer transition-all duration-200 ${
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
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                <p className="text-sm font-semibold text-green-700 break-all px-1">
                  {file.name}
                </p>
                <p className="text-sm text-green-500 mt-1">
                  {(file.size / 1024).toFixed(1)} KB — Ready to upload
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-red-500 transition-colors"
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
                <p className="text-sm text-slate-400 mt-1">
                  or click to browse files
                </p>
                <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-500">
                  <FileText size={11} />
                  PDF or DOCX files
                </p>
              </>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
              <span className="min-w-0 break-words">{error}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !file}
            className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#004182] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin flex-shrink-0" />
                <span>Analyzing your CV...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="flex-shrink-0" />
                <span className="text-center leading-snug">
                  <span className="sm:hidden">Get Recommendations</span>
                  <span className="hidden sm:inline">Get Hybrid NLP Recommendations</span>
                </span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-6 text-center">
          <Loader2
            size={28}
            className="animate-spin text-[#0A66C2] mx-auto mb-3"
          />
          <p className="text-sm font-semibold text-blue-800">
            Analyzing your CV...
          </p>
          <p className="text-sm text-blue-500 mt-1 leading-6">
            The rule-based research parser is reading your skills while the hybrid NLP model ranks matches from the imported research dataset
          </p>
        </div>
      )}

      {/* Recommendations */}
      {!loading && recommendations.length > 0 && (() => {
        const total = recommendations.length;
        const preview = recommendations.slice(0, UPLOAD_PREVIEW_LIMIT);
        const hasMore = total > UPLOAD_PREVIEW_LIMIT;
        const listSubtitle =
          hasMore
            ? `Showing ${preview.length} of ${total} top matches`
            : `${total} job${total === 1 ? "" : "s"} matched based on your CV`;

        return (
          <div className="space-y-3 min-w-0">
            <RecommendationList
              recommendations={preview}
              subtitle={listSubtitle}
            />
            {hasMore && (
              <button
                type="button"
                onClick={() => router.push("/recommendations")}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0A66C2] shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
              >
                Load more ({total - preview.length} more)
                <ArrowRight size={16} className="flex-shrink-0" />
              </button>
            )}
            <p className="text-sm text-slate-500 text-center px-1 leading-6">
              Saved to this browser — open{" "}
              <Link
                href="/recommendations"
                className="font-semibold text-[#0A66C2] hover:underline"
              >
                Recommendations
              </Link>{" "}
              for the full list anytime.
            </p>
          </div>
        );
      })()}
    </div>
  );
}