import type { Job } from "./job";

export type RecommendationMode = "search" | "cv";

export interface JobRecommendation {
  job: Job;
  match_score: number;
  /** @deprecated No longer returned; kept optional for old sessionStorage payloads */
  matched_skills?: string[];
  missing_skills?: string[];
  mode: RecommendationMode;
  explanation?: string;
}

export interface CvUploadResponse {
  skills?: string[];
  recommendations: JobRecommendation[];
  jobs_considered?: number;
}
