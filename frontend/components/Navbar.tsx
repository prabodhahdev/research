"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Upload,
  MessageSquare,
  Star,
  BookOpen,
  Home,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: <Home size={18} /> },
  { href: "/jobs", label: "Jobs", icon: <Search size={18} /> },
  { href: "/upload-cv", label: "Upload CV", icon: <Upload size={18} /> },
  { href: "/recommendations", label: "Recommendations", icon: <Star size={18} /> },
  { href: "/chat", label: "Chat", icon: <MessageSquare size={18} /> },
  { href: "/research", label: "Research", icon: <BookOpen size={18} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 h-16">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A66C2]">
            <Search size={18} className="text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-[#0A66C2] tracking-tight">
            SL Jobs AI
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center h-16">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex flex-col items-center justify-center gap-1 px-3 xl:px-4 h-full transition-colors duration-150 group ${
                  active ? "text-[#0A66C2]" : "text-slate-500 hover:text-[#0A66C2]"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-[#0A66C2] transition-transform duration-200 origin-center rounded-t ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <div className="ml-3 pl-3 border-l border-slate-200 flex items-center h-9">
            <Link
              href="/upload-cv"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#004182] transition-colors duration-200"
            >
              <Upload size={14} />
              Upload CV
            </Link>
          </div>
        </nav>

        {/* Mobile / tablet controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/upload-cv"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#0A66C2] px-3.5 py-2 text-sm font-semibold text-white hover:bg-[#004182] transition-colors"
          >
            <Upload size={14} />
            Upload CV
          </Link>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0A66C2]"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-nav"
        className={`lg:hidden overflow-hidden border-t border-slate-200 bg-white transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto w-full max-w-6xl px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-[#0A66C2]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#0A66C2]"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/upload-cv"
            className="sm:hidden mt-2 flex items-center justify-center gap-1.5 rounded-full bg-[#0A66C2] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#004182]"
          >
            <Upload size={14} />
            Upload CV
          </Link>
        </nav>
      </div>
    </header>
  );
}
