import type { Job } from "./job";

export type RecommendationMode = "search" | "cv";

export interface JobRecommendation {
  job: Job;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  mode: RecommendationMode;
  explanation?: string;
}

export interface CvUploadResponse {
  recommendations: JobRecommendation[];
}

