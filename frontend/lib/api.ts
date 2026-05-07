import type { ChatResponse } from "@/types/chat";
import type { Job } from "@/types/job";
import type { CvUploadResponse } from "@/types/recommendation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function searchJobs(params: {
  query?: string;
  location?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ jobs: Job[] }> {
  const qp = new URLSearchParams();
  if (params.query) qp.set("q", params.query);
  if (params.location) qp.set("location", params.location);
  if (params.category) qp.set("category", params.category);
  qp.set("page", String(params.page ?? 1));
  qp.set("page_size", String(params.pageSize ?? 20));

  return apiJson(`/jobs/search?${qp.toString()}`);
}

export async function uploadCv(file: File): Promise<CvUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/cv/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Upload failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as CvUploadResponse;
}

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  return apiJson(`/chat`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

