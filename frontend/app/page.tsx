import Link from "next/link";
import {
  Search,
  Upload,
  MessageSquare,
  Briefcase,
  Globe,
  Sparkles,
  ArrowRight,
  MapPin,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <main className="bg-[#F3F2EF]">

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pt-6 pb-4">
        <div className="rounded-2xl bg-white shadow-md border border-slate-200 px-6 py-6 md:px-10 md:py-8">
          
          {/* badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            
            Research Project — Sabaragamuwa University of Sri Lanka
          </span>

          {/* heading */}
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 leading-snug md:text-5xl">
            Find Your Dream Job
            <br />
            <span className="text-[#0A66C2]">in Sri Lanka</span>
          </h1>

          {/* subtext */}
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
            Research dataset of Sri Lankan jobs from{" "}
            <span className="font-medium text-slate-700">TopJobs</span>,{" "}
            <span className="font-medium text-slate-700">Jobber</span>,{" "}
            <span className="font-medium text-slate-700">ITPro</span>,{" "}
            <span className="font-medium text-slate-700">Ikman</span> and{" "}
            <span className="font-medium text-slate-700">XpressJobs</span>
            <br /> upload your CV and let the hybrid model find the best matches.
          </p>

          {/* buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-base font-semibold text-white shadow hover:bg-[#004182] transition-all duration-200"
            >
              <Search size={17} />
              Browse Jobs
            </Link>
            <Link
              href="/upload-cv"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0A66C2] px-6 py-2.5 text-base font-semibold text-[#0A66C2] hover:bg-blue-50 transition-all duration-200"
            >
              <Upload size={17} />
              Upload CV
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
            >
              <MessageSquare size={17} />
              Career Chat
            </Link>
          </div>

          {/* stats row */}
          <div className="mt-6 flex flex-wrap gap-6 border-t border-slate-100 pt-5">
            {[
              { label: "Imported Jobs", value: "5500+" },
              { label: "Dataset Sources", value: "5" },
              { label: "Model", value: "Hybrid NLP" },
              { label: "Cost", value: "100% Free" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-xl font-extrabold text-[#0A66C2]">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-500 mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-base font-semibold uppercase tracking-widest text-slate-400 mb-5">
          How it works
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: <Search size={22} className="text-[#0A66C2]" />,
              step: "01",
              title: "Search Jobs",
              desc: "Browse hundreds of Sri Lankan job listings from multiple portals — filtered by location, field, and job type.",
            },
            {
              icon: <Upload size={22} className="text-[#0A66C2]" />,
              step: "02",
              title: "Upload Your CV",
              desc: "Upload your CV as a PDF or DOCX. Our AI reads your skills and experience and finds the best matching jobs automatically.",
            },
            {
              icon: <MessageSquare size={22} className="text-[#0A66C2]" />,
              step: "03",
              title: "Ask the Chatbot",
              desc: "Ask our AI chatbot anything — required skills, career paths, salary expectations, or location-specific openings.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  {item.icon}
                </div>
                <span className="text-3xl font-extrabold text-slate-100 group-hover:text-blue-100 transition-colors">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-base leading-7 text-slate-500">{item.desc}</p>
              <div className="mt-4">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#0A66C2] opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── JOB PORTALS ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-xl bg-white border border-slate-200 shadow-sm px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Aggregated from trusted Sri Lankan portals
              </h2>
              <p className="text-base text-slate-500 mt-1">
                These sources were cleaned and imported from the research dataset
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "TopJobs",
                "Jobber",
                "ITPro",
                "Ikman",
                "XpressJobs",
              ].map((portal) => (
                <span
                  key={portal}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600"
                >
                  {portal}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE HIGHLIGHTS ─────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <h2 className="text-base font-semibold uppercase tracking-widest text-slate-400 mb-5">
          Why use SL Jobs AI
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              icon: <Globe size={18} className="text-[#0A66C2]" />,
              title: "Multi-Platform Aggregation",
              desc: "Search the cleaned Sri Lankan job dataset imported into the local recommendation platform.",
            },
            {
              icon: <Sparkles size={18} className="text-[#0A66C2]" />,
              title: "AI-Powered CV Matching",
              desc: "Upload your CV once. Our research parser reads your skills and ranks every job using TF-IDF similarity, skill overlap, and field matching.",
            },
            {
              icon: <MessageSquare size={18} className="text-[#0A66C2]" />,
              title: "Conversational Career Guidance",
              desc: "Ask our chatbot anything about your career — it understands the Sri Lankan job market and gives personalized advice.",
            },
            {
              icon: <TrendingUp size={18} className="text-[#0A66C2]" />,
              title: "Built for Sri Lankan Job Seekers",
              desc: "Unlike LinkedIn or Indeed, we focus exclusively on local Sri Lankan portals — so every listing is relevant to you.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl bg-white border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-base leading-7 text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BOTTOM ─────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-6 pb-14">
        <div className="rounded-2xl bg-[#0A66C2] px-8 py-10 text-center shadow-md">
          <Briefcase size={32} className="mx-auto text-white opacity-80 mb-3" />
          <h2 className="text-2xl font-extrabold text-white">
            Ready to find your next opportunity?
          </h2>
          <p className="mt-2 text-base text-blue-100">
            Join thousands of Sri Lankan job seekers using AI to find better
            jobs faster.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-base font-bold text-[#0A66C2] hover:bg-blue-50 transition-all duration-200"
            >
              <Search size={17} />
              Browse All Jobs
            </Link>
            <Link
              href="/upload-cv"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3 text-base font-bold text-white hover:bg-blue-700 transition-all duration-200"
            >
              <Upload size={17} />
              Upload My CV
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}