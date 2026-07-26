import CvUploadForm from "@/components/CvUploadForm";
import { Upload, Sparkles, FileText, CheckCircle } from "lucide-react";

export default function UploadCvPage() {
  return (
    <main className="bg-[#F3F2EF] overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-4 sm:py-8">

        {/* Page header */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Upload Your CV
          </h1>
          <p className="mt-1 text-sm text-slate-500 leading-6">
            Upload your PDF or DOCX CV and let the hybrid NLP recommendation model
            find the best matching Sri Lankan jobs for your skills
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">

          {/* Left — how it works info cards */}
          <div className="order-2 space-y-4 lg:order-1 lg:col-span-1">

            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5">
              <h2 className="text-sm font-bold text-slate-800 mb-4">
                How it works
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <Upload size={16} className="text-[#0A66C2]" />,
                    title: "Upload your CV",
                    desc: "Select your PDF or DOCX CV file from your device",
                  },
                  {
                    icon: <FileText size={16} className="text-[#0A66C2]" />,
                    title: "Research parser reads your skills",
                    desc: "A rule-based research parser extracts your skills, experience and qualifications",
                  },
                  {
                    icon: <Sparkles size={16} className="text-[#0A66C2]" />,
                    title: "Get matched jobs",
                    desc: "Top jobs from the imported research dataset are ranked by how well they fit your profile",
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-3 min-w-0">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                      {step.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips card */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-blue-800 mb-3 uppercase tracking-wider">
                Tips for best results
              </h3>
              <ul className="space-y-2">
                {[
                  "Use a clear, well-formatted CV",
                  "Include specific skill names",
                  "List your years of experience",
                  "Add education qualifications",
                  "Mention job titles clearly",
                ].map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm text-blue-700"
                  >
                    <CheckCircle
                      size={12}
                      className="flex-shrink-0 mt-0.5 text-blue-500"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right — upload form + results */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-2">
            <CvUploadForm />
          </div>

        </div>
      </div>
    </main>
  );
}