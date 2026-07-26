import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SL Jobs Search",
  description:
    "Research dataset and hybrid NLP recommendation system for Sri Lankan job seekers",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Extensions (e.g. grammar checkers) may inject `data-*` attributes before React hydrates,
          which otherwise triggers hydration mismatch warnings on the `<body>` element. */}
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-[#F3F2EF] text-slate-800 font-sans antialiased"
      >

        {/* ── NAVBAR ─────────────────────────────────────── */}
        <Navbar />

        {/* ── PAGE CONTENT ───────────────────────────────── */}
        <div className="flex-1">
          {children}
        </div>

        {/* ── FOOTER ─────────────────────────────────────── */}
        <footer className="bg-white border-t border-slate-200 mt-10">
          <div className="mx-auto w-full max-w-6xl px-4 py-10">

            {/* top row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">

              {/* brand */}
              <div className="max-w-xs">
                <Link href="/" className="flex items-center gap-2.5 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2]">
                    <Search size={18} className="text-white" />
                  </div>
                  <span className="text-xl font-bold text-[#0A66C2]">
                    SL Jobs AI
                  </span>
                </Link>
                <p className="text-sm leading-6 text-slate-500">
                  A research dataset, rule-based parser, and hybrid NLP
                  recommendation system built exclusively for Sri Lankan job
                  seekers. BSc Honours in Software Engineering — Sabaragamuwa
                  University of Sri Lanka.
                </p>
              </div>

              {/* links */}
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Platform
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      { href: "/jobs", label: "Browse Jobs" },
                      { href: "/upload-cv", label: "Upload CV" },
                      { href: "/recommendations", label: "Recommendations" },
                      { href: "/chat", label: "Career Chat" },
                      { href: "/research", label: "About Research" },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-slate-500 hover:text-[#0A66C2] transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Platform Model
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      "Imported research dataset",
                      "Rule-based research parser",
                      "Hybrid NLP recommendations",
                      "Explainable skill matching",
                    ].map((item) => (
                      <li key={item}>
                        <span className="text-sm text-slate-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Research
                  </h4>
                  <ul className="space-y-2.5">
                    {[
                      "SUSL Faculty of Computing",
                      "Dept. of Software Engineering",
                      "SE 8101 Research Project",
                      "BSc Hons in Software Engineering",
                    ].map((item) => (
                      <li key={item}>
                        <span className="text-sm text-slate-500">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider mt-5 mb-2">
                    Supervisor
                  </h4>
                  <p className="text-sm text-slate-500">
                    Prof. (Dr.) S. Vasanthapriyan
                  </p>
                </div>
              </div>
            </div>

            {/* divider */}
            <div className="mt-8 border-t border-slate-100 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-sm text-slate-400">
                © 2025 SL Jobs AI — D.P.P.H.N. Thotillagolla · 20APSE4868
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Hybrid NLP model
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-500">
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