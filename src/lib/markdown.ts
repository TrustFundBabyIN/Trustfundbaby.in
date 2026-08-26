import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/**
 * Convert markdown string to HTML safely.
 * Truncates content at "## Image Prompts" section.
 */
export async function markdownToHtml(md: string): Promise<string> {
  // Truncate at Image Prompts section if present
  const cutoff = md.indexOf("## Image Prompts");
  const content = cutoff !== -1 ? md.substring(0, cutoff) : md;

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return processed.toString();
}

/**
 * Extract learning objectives from markdown content.
 * Expects "## Learning Objectives" with bullet points.
 */
export function extractLearningObjectives(md: string): string[] {
  const match = md.match(/## Learning Objectives\n([\s\S]*?)(?=\n## )/);
  if (!match) return [];
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- ") || line.startsWith("* "))
    .map((line) => line.replace(/^[-*]\s+/, ""));
}

/**
 * Extract quiz questions from markdown content.
 * Format: 1. Question — A) OptA B) OptB C) OptC D) OptD (Answer: X)
 */
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export function extractQuizQuestions(md: string): QuizQuestion[] {
  const quizMatch = md.match(/## Quiz\n([\s\S]*?)(?=\n## )/);
  if (!quizMatch) return [];

  const quizSection = quizMatch[1].trim();
  // Match each numbered question
  const questionRegex = /^\d+\.\s+(.+?)\s*—\s*A\)\s*(.+?)\s*B\)\s*(.+?)\s*C\)\s*(.+?)\s*D\)\s*(.+?)\s*\(Answer:\s*([A-D])\)\s*$/gm;

  const questions: QuizQuestion[] = [];
  let m;
  while ((m = questionRegex.exec(quizSection)) !== null) {
    const [, question, a, b, c, d, answer] = m;
    questions.push({
      question: question.trim(),
      options: [a.trim(), b.trim(), c.trim(), d.trim()],
      correctIndex: answer.charCodeAt(0) - 65, // A=0, B=1, C=2, D=3
    });
  }

  return questions;
}

/**
 * Fetch and parse module markdown from /public/curriculum/.
 * Returns null if file not found or error.
 */
export async function fetchModuleMarkdown(
  year: number,
  moduleNum: number
): Promise<string | null> {
  try {
    const yearPadded = String(year).padStart(2, "0");
    const modulePadded = String(moduleNum).padStart(2, "0");
    const res = await fetch(`/curriculum/year-${yearPadded}/module-${modulePadded}.md`);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}
