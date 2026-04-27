"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Play,
  BookOpen,
  Beaker,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Award,
  Download,
  ExternalLink,
  Loader2,
  Lock,
} from "lucide-react";
import { curriculum, getQuizForModule, type QuizQuestion } from "@/lib/education-data";
import {
  fetchModuleMarkdown,
  extractLearningObjectives,
  extractQuizQuestions,
  markdownToHtml,
} from "@/lib/markdown";

export default function ModuleViewerPage() {
  const params = useParams();
  const year = Number(params.year);
  const moduleNum = Number(params.module);
  const [currentStep, setCurrentStep] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [labOpened, setLabOpened] = useState(false);
  const [labCompleted, setLabCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentQNum, setCurrentQNum] = useState(0);

  // Markdown content state
  const [markdownHtml, setMarkdownHtml] = useState<string>("");
  const [learningObjectives, setLearningObjectives] = useState<string[]>([]);
  const [markdownLoading, setMarkdownLoading] = useState(true);
  // Track if real quiz was loaded from markdown
  const [loadedRealQuiz, setLoadedRealQuiz] = useState(false);

  const yearData = curriculum.find((y) => y.year === year);
  const moduleData = yearData?.modules.find((m) => m.num === moduleNum);
  const moduleTitle = moduleData?.title || "Unknown Module";

  // Load markdown content and extract quiz
  useEffect(() => {
    setMarkdownLoading(true);
    setMarkdownHtml("");
    setLearningObjectives([]);
    setLoadedRealQuiz(false);

    fetchModuleMarkdown(year, moduleNum).then(async (md) => {
      if (md) {
        // Convert markdown to HTML
        try {
          const html = await markdownToHtml(md);
          setMarkdownHtml(html);
        } catch (e) {
          console.error("Failed to parse markdown:", e);
          setMarkdownHtml(`<h3>Understanding ${moduleTitle}</h3><p>Content loading error.</p>`);
        }
        setLearningObjectives(extractLearningObjectives(md));
        setMarkdownLoading(false);

        // Try to extract real quiz from markdown
        const realQuiz = extractQuizQuestions(md);
        if (realQuiz.length > 0) {
          setQuestions(realQuiz);
          setLoadedRealQuiz(true);
        } else {
          // Fall back to skeleton quiz
          const skeleton = getQuizForModule(year, moduleNum);
          if (skeleton) {
            setQuestions(skeleton.questions);
            setLoadedRealQuiz(false);
          }
        }
      } else {
        // No markdown found, use generic content
        setMarkdownHtml(`<h3>Understanding ${moduleTitle}</h3><p>In this module, we explore the fundamentals of <strong>${moduleTitle.toLowerCase()}</strong>.</p>`);
        setLearningObjectives([]);
        setMarkdownLoading(false);
        setLoadedRealQuiz(false);
        const skeleton = getQuizForModule(year, moduleNum);
        if (skeleton) setQuestions(skeleton.questions);
      }
    });
  }, [year, moduleNum, moduleTitle]);

  const steps = ["Watch", "Learn", "Lab", "Quiz"];
  const stepIcons = [Play, BookOpen, Beaker, CheckCircle2];

  const canAccessQuiz = currentStep >= 3 && labCompleted;

  // Lab URL — opens specific lab module with global numbering
  const globalModNum = (year - 1) * 12 + moduleNum;
  const labUrl = `https://year-${year}-labs.vercel.app/labs/${String(globalModNum).padStart(2, "0")}/`;

  // PDF availability check
  const pdfUrl = `/curriculum/year-${String(year).padStart(2, "0")}/images/module-${String(moduleNum).padStart(2, "0")}.pdf`;
  const [pdfExists, setPdfExists] = useState<boolean | null>(null);

  useEffect(() => {
    setPdfExists(null);
    const checkPdf = async () => {
      try {
        const res = await fetch(pdfUrl, { method: "HEAD" });
        setPdfExists(res.ok);
      } catch {
        setPdfExists(false);
      }
    };
    checkPdf();
  }, [year, moduleNum, pdfUrl]);

  // Quiz handlers
  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (showFeedback) return;
    setSelectedOption(optIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || quizSubmitted) return;
    const correct = selectedOption === questions[currentQNum]?.correctIndex;
    setFeedbackCorrect(correct);
    setShowFeedback(true);

    const newAnswers = [...quizAnswers];
    newAnswers[currentQNum] = selectedOption;
    setQuizAnswers(newAnswers);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedOption(null);
      if (currentQNum < questions.length - 1) {
        setCurrentQNum((p) => p + 1);
      } else {
        // All questions answered
        const score = newAnswers.reduce(
          (acc, answer, idx) => acc + (answer === questions[idx]?.correctIndex ? 1 : 0),
          0
        );
        setQuizScore(score);
        setQuizSubmitted(true);
        setShowResults(true);

        // Save result
        saveQuizResult(score, questions.length);
      }
    }, 1500);
  };

  const saveQuizResult = async (score: number, total: number) => {
    setIsSubmitting(true);
    try {
      const childId =
        typeof window !== "undefined"
          ? localStorage.getItem("tfb-child-id") || `child-${Date.now()}`
          : `child-${Date.now()}`;

      await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          year,
          moduleNum,
          score,
          total,
          answers: quizAnswers,
        }),
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("tfb-child-id", childId);
        // Save completed modules
        const completed: string[] = JSON.parse(
          localStorage.getItem("tfb-completed-modules") || "[]"
        );
        const key = `${year}-${moduleNum}`;
        if (!completed.includes(key)) {
          completed.push(key);
          localStorage.setItem("tfb-completed-modules", JSON.stringify(completed));
        }
        // Save quiz score
        const scores: Record<string, number> = JSON.parse(
          localStorage.getItem("tfb-quiz-scores") || "{}"
        );
        scores[key] = score;
        localStorage.setItem("tfb-quiz-scores", JSON.stringify(scores));
      }
    } catch (e: unknown) {
      console.error("Failed to save quiz result:", e);
    }
    setIsSubmitting(false);
  };

  const nextModuleLink = moduleNum < 12
    ? `/education/module/${year}/${moduleNum + 1}`
    : null;

  const handleLaunchLab = () => {
    window.open(labUrl, "_blank", "noopener,noreferrer");
    setLabOpened(true);
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-navy-mid via-navy to-navy-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/education"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
          >
            <ChevronLeft size={14} />
            Back to Curriculum
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-gold/10 text-gold text-sm font-semibold rounded-full">
              Year {year} · Age {year + 12}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-white mb-2">
            Module {moduleNum}: {moduleTitle}
          </h1>
          <p className="text-white/50 text-sm">
            Step {currentStep + 1} of 4: {steps[currentStep]}
          </p>

          {/* Progress Bar */}
          <div className="mt-6 flex items-center gap-2">
            {steps.map((step, i) => {
              const Icon = stepIcons[i];
              const isActive = i === currentStep;
              const isPast = i < currentStep;
              const isAvailable = (i <= 2) || (i === 3 && labCompleted);
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (i === 3 && !labCompleted) return;
                    if (i > 0 && i < 3 && isPast) setCurrentStep(i);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? "bg-gold text-white"
                      : isPast
                      ? "bg-green/20 text-green"
                      : isAvailable
                      ? "bg-white/10 text-white/60 hover:bg-white/20 cursor-pointer"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  }`}
                >
                  <Icon size={12} />
                  {step}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Step Content */}
      <section className="py-12 min-h-[60vh] bg-cloud">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ======================== STEP 1: WATCH ======================== */}
          {currentStep === 0 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl text-ink mb-2">Watch the Lesson</h2>
                <p className="text-stone">Short video to introduce the key concepts</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-ink aspect-video">
                {year === 1 && moduleNum === 1 && videoPlaying ? (
                  <video
                    src="/videos/module-01-final.mp4"
                    controls
                    autoPlay
                    className="w-full aspect-video"
                  />
                ) : (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={`/module-images/0${Math.min(moduleNum, 9)}-barter-problem.png`}
                      alt={moduleTitle}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-navy-mid/60 flex items-center justify-center flex-col gap-4">
                      {year === 1 && moduleNum === 1 && !videoPlaying ? (
                        <button
                          onClick={() => setVideoPlaying(true)}
                          className="w-20 h-20 rounded-full bg-gold/90 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                        >
                          <Play size={32} className="text-white ml-1" fill="white" />
                        </button>
                      ) : (
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <Play size={32} className="text-white ml-1" />
                          </div>
                          <p className="text-white/70 text-sm font-medium">Video Coming Soon</p>
                          <p className="text-white/40 text-xs mt-1">{moduleTitle} — YouTube embed will be added soon</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green-light transition-colors"
                >
                  Continue to Lesson <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ======================== STEP 2: LEARN ======================== */}
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl text-ink mb-2">
                  Lesson: {moduleTitle}
                </h2>
                <p className="text-stone">Read and understand the key concepts</p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">

                {/* Learning Objectives */}
                {learningObjectives.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-ink mb-3 flex items-center gap-2">
                      <span className="text-xl">🎯</span> Learning Objectives
                    </h3>
                    <ul className="space-y-2 ml-2">
                      {learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2 text-stone">
                          <CheckCircle2 size={16} className="text-green mt-0.5 flex-shrink-0" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Main Content */}
                {markdownLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={24} className="animate-spin text-gold" />
                    <span className="ml-3 text-stone">Loading lesson...</span>
                  </div>
                ) : (
                  <div
                    className="prose prose-lg max-w-none prose-headings:text-ink prose-a:text-gold prose-strong:text-ink prose-p:text-stone prose-li:text-stone"
                    dangerouslySetInnerHTML={{ __html: markdownHtml }}
                  />
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-stone font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Video
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green-light transition-colors"
                >
                  Continue to Lab <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* ======================== STEP 3: LAB ======================== */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl text-ink mb-2">
                  Lab Activity
                </h2>
                <p className="text-stone">Practice what you&apos;ve learned in an interactive environment</p>
              </div>

              {!labCompleted ? (
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Beaker size={32} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-3">
                    Ready to Practice?
                  </h3>
                  <p className="text-stone mb-8 max-w-md mx-auto">
                    Launch the interactive lab for Module {moduleNum}: {moduleTitle}. You&apos;ll work through hands-on exercises that make the concepts click.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {!labOpened ? (
                      <button
                        onClick={handleLaunchLab}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-green text-white font-semibold rounded-xl hover:bg-green-light transition-all shadow-lg shadow-green/20"
                      >
                        <ExternalLink size={18} />
                        Launch Lab
                      </button>
                    ) : (
                      <button
                        onClick={() => setLabCompleted(true)}
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gold text-gold font-semibold rounded-xl hover:bg-gold hover:text-white transition-all shadow-lg shadow-gold/20"
                      >
                        <CheckCircle2 size={18} />
                        Mark Lab as Complete
                      </button>
                    )}
                    {pdfExists === true ? (
                      <a
                        href={pdfUrl}
                        className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-stone font-medium rounded-xl hover:bg-gray-50 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={18} />
                        Download Offline PDF
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 px-8 py-4 border border-gray-200 text-gray-400 font-medium rounded-xl cursor-not-allowed bg-gray-50"
                        title="Offline activity PDF not available yet"
                      >
                        <Download size={18} />
                        Offline Activity — Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-green/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 size={24} className="text-green" />
                    <h3 className="font-serif text-xl text-ink">Lab Completed!</h3>
                  </div>
                  <p className="text-stone mb-6">
                    Great job completing the lab! You&apos;re ready for the quiz.
                  </p>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green-light transition-colors"
                    >
                      Take the Quiz <ChevronRight size={16} />
                    </button>
                    <a
                      href={labUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-stone font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Reopen Lab
                    </a>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-stone font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} /> Back to Lesson
                </button>
                <div />
              </div>
            </div>
          )}

          {/* ======================== STEP 4: QUIZ ======================== */}
          {currentStep === 3 && (
            <div>
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl text-ink mb-2">
                  Quiz: {moduleTitle}
                </h2>
                {!canAccessQuiz && !quizSubmitted && (
                  <p className="text-stone">Complete the lab activity first to unlock the quiz</p>
                )}
                {canAccessQuiz && (
                  <p className="text-stone">
                    {loadedRealQuiz
                      ? `Answer ${questions.length} questions to complete this module`
                      : `Answer 5 questions to complete this module`
                    }
                  </p>
                )}
              </div>

              {!canAccessQuiz && !quizSubmitted && (
                <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock size={32} className="text-stone/30" />
                  </div>
                  <h3 className="font-serif text-xl text-ink mb-3">
                    Quiz Locked
                  </h3>
                  <p className="text-stone mb-6">
                    Complete the lab activity to unlock this quiz.
                  </p>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-light transition-colors"
                  >
                    <Beaker size={16} /> Go to Lab
                  </button>
                </div>
              )}

              {canAccessQuiz && !showResults && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  {/* Quiz Progress */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-stone">
                      Question {currentQNum + 1} of {questions.length}
                    </span>
                    <div className="flex gap-1">
                      {questions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx < currentQNum
                              ? "bg-green"
                              : idx === currentQNum
                              ? "bg-gold"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-ink mb-6">
                      {questions[currentQNum]?.question}
                    </h3>

                    <div className="space-y-3">
                      {questions[currentQNum]?.options.map((option, optIdx) => {
                        const isSelected = selectedOption === optIdx;
                        let className = "border-gray-200 hover:border-navy/30 hover:bg-navy/5";

                        if (showFeedback) {
                          if (optIdx === questions[currentQNum]?.correctIndex) {
                            className = "border-green bg-green/10";
                          } else if (isSelected && !feedbackCorrect) {
                            className = "border-red-300 bg-red-50";
                          }
                        } else if (isSelected) {
                          className = "border-navy bg-navy/5";
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(currentQNum, optIdx)}
                            disabled={showFeedback}
                            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${className}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-ink">{option}</span>
                              {showFeedback && optIdx === questions[currentQNum].correctIndex && (
                                <CheckCircle2 size={16} className="text-green flex-shrink-0" />
                              )}
                              {showFeedback && isSelected && !feedbackCorrect && (
                                <XCircle size={16} className="text-red-400 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {showFeedback && (
                      <div className={`mt-4 p-3 rounded-lg ${feedbackCorrect ? "bg-green/10" : "bg-amber-50"}`}>
                        <p className={`text-sm font-medium ${feedbackCorrect ? "text-green" : "text-amber-600"}`}>
                          {feedbackCorrect ? "🎉 Correct! Great job!" : "Not quite — the correct answer is highlighted in green."}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null || showFeedback}
                      className={`px-8 py-3 font-semibold rounded-lg transition-all ${
                        selectedOption !== null && !showFeedback
                          ? "bg-green text-white hover:bg-green-light shadow-lg shadow-green/20"
                          : "bg-gray-100 text-stone cursor-not-allowed"
                      }`}
                    >
                      {currentQNum < questions.length - 1 ? "Submit & Next" : "Submit Final Answer"}
                    </button>
                  </div>
                </div>
              )}

              {showResults && (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  {quizScore >= 4 ? (
                    <>
                      <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award size={36} className="text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl text-ink mb-2">
                        {quizScore === questions.length ? "Perfect Score! 🏆" : "Great Job! 🎉"}
                      </h3>
                      <p className="text-stone text-lg mb-6">
                        You scored {quizScore}/{questions.length}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">💪</span>
                      </div>
                      <h3 className="font-serif text-2xl text-ink mb-2">
                        Keep Going!
                      </h3>
                      <p className="text-stone text-lg mb-6">
                        You scored {quizScore}/{questions.length}. Review the lesson and try again!
                      </p>
                    </>
                  )}

                  {isSubmitting && (
                    <div className="flex items-center justify-center gap-2 text-stone text-sm mb-4">
                      <Loader2 size={14} className="animate-spin" />
                      Saving your result...
                    </div>
                  )}

                  {!isSubmitting && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      {nextModuleLink && quizScore >= 3 && (
                        <Link
                          href={nextModuleLink}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green-light transition-colors"
                        >
                          Next Module <ChevronRight size={16} />
                        </Link>
                      )}
                      {quizScore < 3 && (
                        <button
                          onClick={() => {
                            setCurrentStep(1);
                            setQuizSubmitted(false);
                            setShowResults(false);
                            setCurrentQNum(0);
                            setQuizAnswers([]);
                            setSelectedOption(null);
                            setShowFeedback(false);
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white font-semibold rounded-lg hover:bg-gold-light transition-colors"
                        >
                          Review & Retry
                        </button>
                      )}
                      {nextModuleLink && quizScore >= 3 && (
                        <button
                          onClick={() => {
                            setCurrentStep(1);
                            setQuizSubmitted(false);
                            setShowResults(false);
                            setCurrentQNum(0);
                            setQuizAnswers([]);
                            setSelectedOption(null);
                            setShowFeedback(false);
                          }}
                          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 text-stone font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Retake Quiz
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
