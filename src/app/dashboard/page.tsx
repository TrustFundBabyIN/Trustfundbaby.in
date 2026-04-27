"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Award,
  TrendingUp,
  BookOpen,
  AlertTriangle,
  Download,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  XCircle,
  BarChart3,
} from "lucide-react";

interface QuizScore {
  key: string;
  year: number;
  module: number;
  score: number;
}

interface AnalyticsEntry {
  year: number;
  module: number;
  attempts: number;
  avgScore: number;
  passRate: number;
}

export default function DashboardPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<QuizScore[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsEntry[]>([]);
  const [corpus] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load from localStorage
      const completed = JSON.parse(
        localStorage.getItem("tfb-completed-modules") || "[]"
      ) as string[];
      setCompletedModules(completed);

      const scores: Record<string, number> = JSON.parse(
        localStorage.getItem("tfb-quiz-scores") || "{}"
      );
      const scoreList: QuizScore[] = Object.entries(scores).map(
        ([key, score]) => {
          const [year, module] = key.split("-").map(Number);
          return { key, year, module, score };
        }
      );
      setQuizScores(scoreList);
    }

    // Fetch analytics from API
    fetch("/api/quiz-analytics")
      .then((res) => res.json())
      .then((data) => setAnalytics(data.analytics || []))
      .catch(() => {});

    // Fetch quiz results for corpus overview
    fetch("/api/quiz-results")
      .then((res) => res.json())
      .then(() => {
        // Will be used for contribution feed once backend is connected
      })
      .catch(() => {});
  }, []);

  const year1Modules = [
    "What is Money?",
    "Barter & Trade",
    "History of Currency",
    "How Banks Work",
    "Saving vs Spending",
    "Needs vs Wants",
    "Your First Budget",
    "The Power of Compounding",
    "Digital Money & UPI",
    "Inflation: Why Money Shrinks",
    "Setting Financial Goals",
    "Year 1 Review & Quiz",
  ];

  const progress = Math.round((completedModules.filter((m) => m.startsWith("1-")).length / 12) * 100);

  // Find modules with low pass rates
  const needingSimplification = analytics.filter((a) => a.passRate < 70 && a.attempts >= 2);

  return (
    <>
      <Navbar />

      <section className="pt-24 pb-16 bg-gradient-to-br from-navy-mid via-navy to-navy-light min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">
              Parent Dashboard
            </h1>
            <p className="text-white/50">
              Track your child&apos;s financial education journey
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen size={20} className="text-gold" />
                <p className="text-white/60 text-sm">Modules Completed</p>
              </div>
              <p className="text-3xl font-bold text-white font-sans">
                {completedModules.length}
                <span className="text-white/40 text-lg">/108</span>
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Award size={20} className="text-green" />
                <p className="text-white/60 text-sm">Average Quiz Score</p>
              </div>
              <p className="text-3xl font-bold text-white font-sans">
                {quizScores.length > 0
                  ? Math.round(
                      (quizScores.reduce((a, b) => a + b.score, 0) / quizScores.length) * 100
                    ) / 10
                  : 0}
                <span className="text-white/40 text-lg">/5</span>
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp size={20} className="text-green" />
                <p className="text-white/60 text-sm">Trust Corpus</p>
              </div>
              <p className="text-3xl font-bold text-gold font-sans">
                ₹{corpus.toLocaleString("en-IN")}
              </p>
              <p className="text-white/30 text-xs mt-1">Coming soon</p>
            </div>

            <div className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <Users size={20} className="text-gold" />
                <p className="text-white/60 text-sm">Contributors</p>
              </div>
              <p className="text-3xl font-bold text-white font-sans">
                4
              </p>
              <p className="text-white/30 text-xs mt-1">Coming soon</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Year 1 Progress */}
            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Year 1 Progress
                </h2>
                <span className="text-gold text-sm font-medium">{progress}%</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/10 rounded-full mb-6">
                <div
                  className="h-full bg-green rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="space-y-2">
                {year1Modules.map((title, idx) => {
                  const key = `1-${idx + 1}`;
                  const isCompleted = completedModules.includes(key);
                  const score = quizScores.find((s) => s.key === key)?.score;

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? score !== undefined && score >= 3
                              ? "bg-green"
                              : "bg-amber-500"
                            : "bg-white/10"
                        }`}
                      >
                        {isCompleted ? (
                          (score !== undefined && score >= 3) ? (
                            <CheckCircle2 size={12} className="text-white" />
                          ) : (
                            <XCircle size={12} className="text-white" />
                          )
                        ) : (
                          <BookOpen size={10} className="text-white/40" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">
                          {idx + 1}. {title}
                        </p>
                      </div>
                      {score !== undefined && (
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            score >= 4
                              ? "bg-green/20 text-green"
                              : score >= 3
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {score}/5
                        </span>
                      )}
                      <Link
                        href={`/education/module/1/${idx + 1}`}
                        className="text-white/30 hover:text-white transition-colors"
                      >
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Needs Simplification */}
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle size={20} className="text-amber-300" />
                  <h2 className="text-lg font-semibold text-white">
                    Needs Simplification
                  </h2>
                </div>

                {needingSimplification.length > 0 ? (
                  <div className="space-y-3">
                    {needingSimplification.map((entry) => (
                      <div
                        key={`${entry.year}-${entry.module}`}
                        className="bg-white/5 rounded-xl p-4 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-white text-sm font-medium">
                            Year {entry.year} · Module {entry.module}
                          </p>
                          <p className="text-white/40 text-xs mt-1">
                            {entry.attempts} attempts
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-amber-300 text-sm font-bold">
                            {entry.passRate}% pass
                          </p>
                          <p className="text-white/30 text-xs mt-1">
                            Avg: {entry.avgScore}/5
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 size={32} className="text-white/10 mx-auto mb-3" />
                    <p className="text-white/30 text-sm">
                      No modules flagged yet. More data needed.
                    </p>
                  </div>
                )}
              </div>

              {/* Offline Activities */}
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Download size={20} className="text-gold" />
                  <h2 className="text-lg font-semibold text-white">
                    Offline Activities
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Budget Planner Worksheet", type: "PDF" },
                    { title: "Savings Jar Tracker", type: "PDF" },
                    { title: "Needs vs Wants Sort Cards", type: "PDF" },
                    { title: "Compound Interest Calculator", type: "Interactive" },
                  ].map(({ title, type }) => (
                    <div
                      key={title}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div>
                        <p className="text-white text-sm">{title}</p>
                        <p className="text-white/30 text-xs">{type}</p>
                      </div>
                      <button className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Family Contributions Feed */}
              <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <Users size={20} className="text-green" />
                  <h2 className="text-lg font-semibold text-white">
                    Contribution Feed
                  </h2>
                </div>

                <div className="space-y-3">
                  {[
                    { name: "Nana & Nani", amount: "₹10,000", date: "13 Mar 2026", note: "Birthday gift" },
                    { name: "Mausi Rekha", amount: "₹5,000", date: "10 Mar 2026", note: "Monthly SIP" },
                    { name: "Mama Suresh", amount: "₹2,000", date: "08 Mar 2026", note: "Diwali bonus" },
                  ].map(({ name, amount, date, note }) => (
                    <div key={name + date} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                      <Shield size={16} className="text-gold flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm">{name}</p>
                        <p className="text-white/30 text-xs">{note} · {date}</p>
                      </div>
                      <p className="text-green font-semibold text-sm">{amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
