import type { Job } from "./job";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  related_jobs?: Job[];
}

export interface ChatResponse {
  reply: string;
  related_jobs?: Job[];
}

