import ChatBox from "@/components/ChatBox";
import { MessageSquare, Sparkles, Lightbulb } from "lucide-react";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#F3F2EF]">
      <div className="mx-auto max-w-6xl px-4 py-8">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Career AI Assistant
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Ask anything about Sri Lankan jobs, career paths, and required skills
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">

          {/* Left sidebar */}
          <div className="space-y-4 lg:col-span-1">

            {/* Suggested questions */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5">
              <h2 className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                <Lightbulb size={13} className="text-[#0A66C2]" />
                Try asking
              </h2>
              <div className="space-y-2">
                {[
                  "Find IT jobs in Colombo",
                  "What skills do I need for marketing?",
                  "Entry level jobs for fresh graduates",
                  "Best paying jobs in Sri Lanka",
                  "Remote jobs available now",
                  "How to write a good CV?",
                  "Engineering jobs in Kandy",
                  "Healthcare jobs in Galle",
                ].map((q) => (
                  <div
                    key={q}
                    className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A66C2] transition-colors cursor-pointer"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>

            {/* About card */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={13} className="text-[#0A66C2]" />
                <h3 className="text-xs font-bold text-blue-800">
                  Powered by Gemini AI
                </h3>
              </div>
              <p className="text-xs text-blue-600 leading-5">
                Our chatbot uses Google Gemini AI and your local Sri Lankan
                job database to give you accurate, relevant career advice.
              </p>
            </div>

          </div>

          {/* Right — chat window */}
          <div className="lg:col-span-3">
            <ChatBox />
          </div>

        </div>
      </div>
    </main>
  );
}