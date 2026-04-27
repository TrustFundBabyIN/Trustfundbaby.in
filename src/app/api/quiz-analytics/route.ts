import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "quiz-results.json");

export async function GET() {
  try {
    const data = JSON.parse(await fs.readFile(DATA_PATH, "utf-8"));
    const results = data.results || [];

    // Aggregate by module (year + module number)
    const analytics: Record<string, { year: number; module: number; total: number; avgScore: number; passRate: number; scores: number[] }> = {};

    for (const r of results) {
      const key = `${r.year}-${r.moduleNum}`;
      if (!analytics[key]) {
        analytics[key] = { year: r.year, module: r.moduleNum, total: 0, avgScore: 0, passRate: 0, scores: [] };
      }
      analytics[key].scores.push(r.score);
      analytics[key].total += 1;
    }

    // Compute averages
    const output = Object.values(analytics).map((a) => ({
      year: a.year,
      module: a.module,
      attempts: a.total,
      avgScore: Math.round((a.scores.reduce((s, v) => s + v, 0) / a.scores.length) * 10) / 10,
      passRate: Math.round((a.scores.filter((s) => s >= 3).length / a.scores.length) * 100),
    }));

    return NextResponse.json({ analytics: output });
  } catch {
    return NextResponse.json({ analytics: [] });
  }
}
