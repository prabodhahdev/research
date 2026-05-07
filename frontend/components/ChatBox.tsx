"use client";

import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "@/lib/api";
import type { ChatMessage } from "@/types/chat";
import {
  Send,
  Loader2,
  Bot,
  User,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const SUGGESTIONS = [
  "Find IT jobs in Colombo",
  "Entry level jobs for graduates",
  "Remote jobs in Sri Lanka",
  "What skills for marketing?",
];

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your Sri Lankan career assistant powered by Gemini AI. I can help you find jobs, explore career paths, and give advice on skills.\n\nTry asking me something like:\n• Find IT jobs in Colombo\n• What skills do I need for marketing?\n• Best paying jobs in Sri Lanka",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function onSend(text?: string) {
    const messageText = (text ?? input).trim();
    if (!messageText || loading) return;

    setError(null);
    const userMsg: ChatMessage = { role: "user", content: messageText };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");

    setLoading(true);
    try {
      const data = await sendChatMessage(messageText);
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content: data.reply,
          related_jobs: data.related_jobs,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chat failed.");
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the backend. Please make sure the Python server is running.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden" style={{ height: "600px" }}>

      {/* ── CHAT HEADER ──────────────────────────── */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-[#0A66C2] px-5 py-3.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            Career AI Assistant
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-blue-100">
              Online — Powered by Gemini AI
            </span>
          </div>
        </div>
        <div className="ml-auto">
          <Sparkles size={16} className="text-white/60" />
        </div>
      </div>

      {/* ── MESSAGES AREA ────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#F3F2EF]">
        {messages.map((m, idx) => (
          <div
            key={`${m.role}-${idx}`}
            className={`flex items-end gap-2 ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* AI avatar */}
            {m.role === "assistant" && (
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0A66C2] mb-1">
                <Bot size={13} className="text-white" />
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                m.role === "user"
                  ? "rounded-br-sm bg-[#0A66C2] text-white"
                  : "rounded-bl-sm bg-white text-slate-800 border border-slate-100"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>

              {/* Related jobs if any */}
              {m.related_jobs && m.related_jobs.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Related Jobs
                  </p>
                  {m.related_jobs.slice(0, 3).map((job, i) => (
  <a
    key={i}
    href={job.url}
    target="_blank"
    rel="noreferrer"
    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2.5 hover:border-blue-200 hover:bg-blue-50 transition-colors"
  >
    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-bold text-[#0A66C2]">
      {job.company?.charAt(0) ?? "J"}
    </div>

    <div>
      <p className="text-xs font-semibold text-slate-800">
        {job.title}
      </p>
      <p className="text-xs text-slate-500">
        {job.company} · {job.location}
      </p>
    </div>
  </a>
))}
                </div>
              )}
            </div>

            {/* User avatar */}
            {m.role === "user" && (
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 mb-1">
                <User size={13} className="text-slate-600" />
              </div>
            )}
          </div>
        ))}

        {/* Loading dots */}
        {loading && (
          <div className="flex items-end gap-2 justify-start">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0A66C2]">
              <Bot size={13} className="text-white" />
            </div>
            <div className="rounded-2xl rounded-bl-sm bg-white border border-slate-100 px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── SUGGESTIONS ──────────────────────────── */}
      {messages.length <= 1 && (
        <div className="border-t border-slate-100 bg-white px-4 py-2">
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => onSend(s)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A66C2] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── ERROR ────────────────────────────────── */}
      {error && (
        <div className="border-t border-red-100 bg-red-50 px-4 py-2">
          <p className="flex items-center gap-1.5 text-xs text-red-600">
            <AlertCircle size={12} />
            {error}
          </p>
        </div>
      )}

      {/* ── INPUT AREA ───────────────────────────── */}
      <div className="border-t border-slate-100 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about jobs, skills, career advice..."
            disabled={loading}
            className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-[#0A66C2] focus:ring-2 focus:ring-blue-100 focus:bg-white disabled:opacity-60"
          />
          <button
            onClick={() => onSend()}
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:bg-[#004182] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>
        <p className="mt-1.5 text-center text-xs text-slate-400">
          Press Enter to send · Powered by Gemini AI
        </p>
      </div>

    </div>
  );
}