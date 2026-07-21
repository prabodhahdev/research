import type { JobRecommendation } from "@/types/recommendation";

const STORAGE_KEY = "sl-job:cv-recommendations-v1";

export type StoredCvRecommendations = {
  v: 1;
  skills: string[];
  recommendations: JobRecommendation[];
  jobsConsidered: number;
  savedAt: string;
};

function isJobRecommendation(x: unknown): x is JobRecommendation {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (typeof o.match_score !== "number" || o.job === null || typeof o.job !== "object") {
    return false;
  }
  const ms = o.matched_skills;
  const miss = o.missing_skills;
  if (ms !== undefined && !Array.isArray(ms)) return false;
  if (miss !== undefined && !Array.isArray(miss)) return false;
  return true;
}

export function saveCvRecommendationsToSession(data: StoredCvRecommendations): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Quota or private mode — ignore
  }
}

export function loadCvRecommendationsFromSession(): StoredCvRecommendations | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const o = parsed as Record<string, unknown>;
    if (o.v !== 1 || !Array.isArray(o.skills) || typeof o.savedAt !== "string") {
      return null;
    }
    if (typeof o.jobsConsidered !== "number" || !Array.isArray(o.recommendations)) {
      return null;
    }
    if (!o.recommendations.every(isJobRecommendation)) return null;
    return {
      v: 1,
      skills: o.skills.filter((s): s is string => typeof s === "string"),
      recommendations: o.recommendations as JobRecommendation[],
      jobsConsidered: o.jobsConsidered,
      savedAt: o.savedAt,
    };
  } catch {
    return null;
  }
}

export function clearCvRecommendationsSession(): void {
  if (typeof sessionStorage === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
