import ChatBox from "@/components/ChatBox";

export default function ChatPage() {
  return (
    <main className="bg-[#F3F2EF]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Career AI Assistant
          </h1>
          <p className="mt-1 text-base text-slate-500">
            Ask anything about Sri Lankan jobs, career paths, and required skills
          </p>
        </div>

        <ChatBox />
      </div>
    </main>
  );
}
