import Link from "next/link";
import {
  BookOpen,
  Target,
  Search,
  Layers,
  Upload,
  ArrowRight,
  FlaskConical,
  Goal,
  HelpCircle,
  BarChart3,
  AlertTriangle,
  Rocket,
} from "lucide-react";

export default function ResearchPage() {
  return (
    <main className="bg-[#F3F2EF]">
      <div className="mx-auto max-w-4xl px-4 py-8 pb-14">
        <div className="mb-7">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            <FlaskConical size={13} />
            SE 8101 Research Project
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            About the Research
          </h1>
          <p className="mt-2 text-base text-slate-500 leading-7 max-w-2xl">
            AI-Powered Multi-Platform Job Aggregation and Recommendation System
            for Sri Lanka — Faculty of Computing, Department of Software
            Engineering, Sabaragamuwa University of Sri Lanka. BSc Honours in
            Software Engineering.
          </p>
        </div>

        {/* Problem */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">Problem Statement</h2>
          </div>
          <p className="text-base leading-7 text-slate-600">
            Job searching in Sri Lanka is fragmented. Seekers often browse many
            local portals separately, while global platforms like LinkedIn or
            Indeed have limited and sometimes outdated Sri Lankan coverage.
            General AI chatbots can give high-level advice, but they do not
            aggregate local vacancies or rank jobs from a user&apos;s CV against
            the Sri Lankan market.
          </p>
          <p className="mt-3 text-base leading-7 text-slate-600">
            <strong className="font-semibold text-slate-800">Main purpose:</strong>{" "}
            save time — reduce switching between websites and give personalized
            local job matches in one place.
          </p>
        </section>

        {/* Questions */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">Research Questions</h2>
          </div>
          <ol className="space-y-4 text-base leading-7 text-slate-600">
            <li>
              <span className="font-semibold text-slate-800">RQ01:</span> How can
              an AI-powered chatbot be designed to aggregate and present real-time
              job opportunities from multiple Sri Lankan job platforms (e.g.,
              TopJobs, MyJobs.lk, CV.lk, and government portals)?
            </li>
            <li>
              <span className="font-semibold text-slate-800">RQ02:</span> How
              effectively can the proposed chatbot provide personalized job and
              career guidance across multiple fields based on a user&apos;s skills,
              CV, and preferences?
            </li>
            <li>
              <span className="font-semibold text-slate-800">RQ03:</span> Does
              integrating job listings and career guidance into a single AI-based
              platform reduce the time and complexity faced by Sri Lankan job
              seekers compared to using multiple existing websites?
            </li>
            <li>
              <span className="font-semibold text-slate-800">RQ04:</span> What
              limitations exist in current AI chatbots (such as ChatGPT or Gemini)
              when providing Sri Lanka–specific job recommendations, and how can
              the proposed solution address these gaps?
            </li>
          </ol>
        </section>

        {/* Objectives */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Goal size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">Objectives</h2>
          </div>
          <p className="text-base leading-7 text-slate-600 mb-4">
            <strong className="font-semibold text-slate-800">Main objective:</strong>{" "}
            develop an AI platform that aggregates Sri Lankan job listings and
            delivers personalized recommendations and career guidance from CV
            and skill data.
          </p>
          <ul className="space-y-2.5 text-base leading-7 text-slate-600">
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RO1</span>
              Job aggregation from major Sri Lankan sources into one corpus
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RO2</span>
              Conversational career guidance across multiple fields
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RO3</span>
              Personalized recommendation from CV, skills, and experience
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RO4</span>
              User-friendly interface that unifies listings, guidance, and matching
            </li>
          </ul>
        </section>

        {/* Goals */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Search size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">Research Goals</h2>
          </div>
          <ul className="space-y-2.5 text-base leading-7 text-slate-600">
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RG1</span>
              Reduce job-search fragmentation with one aggregated platform
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RG2</span>
              Support better career decisions with multi-field guidance
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RG3</span>
              Improve personalization and relevance of job suggestions
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold shrink-0">RG4</span>
              Increase accessibility for Sri Lankan students and early-career seekers
            </li>
          </ul>
        </section>

        {/* What we built */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">
              What This Prototype Delivers
            </h2>
          </div>
          <ul className="space-y-2.5 text-base leading-7 text-slate-600">
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Aggregated dataset from TopJobs, Jobber, ITPro, Ikman, and XpressJobs
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Rule-based CV parser and stacking ensemble recommendation model
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Hybrid retrieval (SBERT + BM25) with field, skill, and experience features
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Unified web app: browse jobs, upload CV, view ranked matches, and chat
            </li>
          </ul>
        </section>

        {/* Model results */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">Model Results</h2>
          </div>
          <p className="text-base leading-7 text-slate-600 mb-4">
            Final stacking ensemble (SVM + Logistic Regression + XGBoost, meta
            LR), evaluated with GroupKFold by CV ID. Primary ranking metrics are
            highlighted.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-base">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Metric</th>
                  <th className="px-4 py-3 font-semibold">Train (K-Fold)</th>
                  <th className="px-4 py-3 font-semibold">Test (Unseen)</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t border-slate-100 bg-blue-50/60">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    NDCG@10
                    <span className="ml-2 text-sm font-medium text-[#0A66C2]">
                      primary
                    </span>
                  </td>
                  <td className="px-4 py-3">96.61%</td>
                  <td className="px-4 py-3 font-semibold">97.29%</td>
                </tr>
                <tr className="border-t border-slate-100 bg-blue-50/40">
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    Precision@10
                    <span className="ml-2 text-sm font-medium text-[#0A66C2]">
                      secondary
                    </span>
                  </td>
                  <td className="px-4 py-3">94.15%</td>
                  <td className="px-4 py-3 font-semibold">98.75%</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3">Accuracy</td>
                  <td className="px-4 py-3">82.02%</td>
                  <td className="px-4 py-3">80.42%</td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td className="px-4 py-3">F1 Weighted</td>
                  <td className="px-4 py-3">81.06%</td>
                  <td className="px-4 py-3">79.60%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            NDCG@10 and Precision@10 matter most for recommendation quality.
            Accuracy and F1 are reported for classification completeness.
          </p>
        </section>

        {/* Pipeline */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">How Matching Works</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              {
                step: "01",
                title: "Parse CV",
                desc: "Extract skills, field, and experience from the uploaded PDF or DOCX.",
              },
              {
                step: "02",
                title: "Retrieve jobs",
                desc: "Shortlist candidates with SBERT and BM25 from the local corpus.",
              },
              {
                step: "03",
                title: "Score features",
                desc: "Compute semantic, keyword, field, skill, and experience signals.",
              },
              {
                step: "04",
                title: "Rank with ensemble",
                desc: "SVM + LR + XGBoost with a meta learner produce the final match score.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-sm font-bold text-[#0A66C2] mb-1">
                  Step {item.step}
                </p>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">Limitations</h2>
          </div>
          <ul className="space-y-2.5 text-base leading-7 text-slate-600">
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Job listings are from an imported research corpus, not live scrape
              on every request
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Some jobs have incomplete category, skills, or experience fields,
              which can weaken feature signals
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              The research CV set is limited in size, so generalization to every
              career field may vary
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Chat guidance is rule/NLP-assisted over the local dataset, not a
              full general-purpose LLM
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              First recommendation after startup can be slower while embeddings
              and models load
            </li>
          </ul>
        </section>

        {/* Future development */}
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Rocket size={18} className="text-[#0A66C2]" />
            <h2 className="text-lg font-bold text-slate-900">
              Future Development
            </h2>
          </div>
          <ul className="space-y-2.5 text-base leading-7 text-slate-600">
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Scheduled live scraping to keep Sri Lankan job listings up to date
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Expand coverage to more local portals and richer job metadata
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              Stronger chatbot with deeper multi-turn career counselling
            </li>
            <li className="flex gap-2">
              <span className="text-[#0A66C2] font-bold">•</span>
              User accounts, saved searches, and feedback to improve ranking
            </li>
            
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/upload-cv"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-2.5 text-base font-semibold text-white hover:bg-[#004182] transition-colors"
          >
            <Upload size={17} />
            Try CV Matching
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}
