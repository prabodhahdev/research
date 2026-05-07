import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Briefcase, Search, Upload, MessageSquare, Star } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SL Jobs AI — AI-Powered Job Platform for Sri Lanka",
  description:
    "AI-powered job aggregation and recommendation system for Sri Lankan job seekers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#F3F2EF] text-slate-800 font-sans antialiased">

        {/* ── NAVBAR ─────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-0 h-14">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0A66C2]">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="text-base font-bold text-[#0A66C2] tracking-tight">
                SL Jobs AI
              </span>
            </Link>

            {/* Nav links */}
            <nav className="flex items-center h-14">
              {[
                { href: "/jobs", label: "Jobs", icon: <Search size={16} /> },
                { href: "/upload-cv", label: "Upload CV", icon: <Upload size={16} /> },
                { href: "/recommendations", label: "Recommendations", icon: <Star size={16} /> },
                { href: "/chat", label: "Chat", icon: <MessageSquare size={16} /> },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center gap-1 px-4 h-full text-slate-500 hover:text-[#0A66C2] transition-colors duration-150 group"
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.label}</span>
                  {/* bottom active indicator */}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A66C2] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center rounded-t" />
                </Link>
              ))}

              {/* CTA button */}
              <div className="ml-3 pl-3 border-l border-slate-200 flex items-center h-8">
                <Link
                  href="/upload-cv"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#004182] transition-colors duration-200"
                >
                  <Upload size={12} />
                  Upload CV
                </Link>
              </div>
            </nav>

          </div>
        </header>

        {/* ── PAGE CONTENT ───────────────────────────────── */}
        <div className="min-h-screen">
          {children}
        </div>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer className="bg-white border-t border-slate-200 mt-10">
          <div className="mx-auto w-full max-w-6xl px-4 py-10">

            {/* top row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

              {/* brand */}
              <div className="max-w-xs">
                <Link href="/" className="flex items-center gap-2 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0A66C2]">
                    <Briefcase size={16} className="text-white" />
                  </div>
                  <span className="text-base font-bold text-[#0A66C2]">
                    SL Jobs AI
                  </span>
                </Link>
                <p className="text-xs leading-5 text-slate-500">
                  An AI-powered job aggregation and recommendation system built
                  exclusively for Sri Lankan job seekers. BSc Research Project —
                  Sabaragamuwa University of Sri Lanka.
                </p>
              </div>

              {/* links */}
              <div className="flex flex-wrap gap-10">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Platform
                  </h4>
                  <ul className="space-y-2">
                    {[
                      { href: "/jobs", label: "Browse Jobs" },
                      { href: "/upload-cv", label: "Upload CV" },
                      { href: "/recommendations", label: "Recommendations" },
                      { href: "/chat", label: "Career Chat" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-xs text-slate-500 hover:text-[#0A66C2] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Job Portals
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "TopJobs.lk",
                      "ikmanJOBS",
                      "XpressJobs",
                      "CareerFirst.lk",
                      "Adzuna",
                    ].map((portal) => (
                      <li key={portal}>
                        <span className="text-xs text-slate-500">{portal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Research
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "SUSL Faculty of Computing",
                      "Dept. of Computing & IS",
                      "SE 8101 Research Project",
                      "BSc Honours Degree",
                    ].map((item) => (
                      <li key={item}>
                        <span className="text-xs text-slate-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-xs text-slate-400">
                © 2025 SL Jobs AI — D.P.P.H.N. Thotillagolla · 20APSE4868
              </p>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Powered by Gemini AI
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500">
                  Research Prototype
                </span>
              </div>
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}