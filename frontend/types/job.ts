export type JobCategory =
  | "IT"
  | "Business"
  | "Marketing"
  | "Healthcare"
  | "Engineering"
  | "Other";

export type ExperienceLevel = "Intern" | "Entry" | "Mid" | "Senior" | "Other";

export interface Job {
  id?: string;
  title: string;
  company?: string;
  location?: string;
  category?: JobCategory | string;
  experience_level?: ExperienceLevel | string;
  salary?: string | null;
  posted_date?: string | null;
  description?: string | null;
  url?: string | null;
  source?: string | null;
}

