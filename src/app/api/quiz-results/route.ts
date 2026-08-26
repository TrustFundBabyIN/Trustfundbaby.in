import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "quiz-results.json");

async function readResults() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return { results: [] };
  }
}

async function writeResults(data: { results: Record<string, unknown>[] }) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  const data = await readResults();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readResults();
    const entry = {
      ...body,
      timestamp: new Date().toISOString(),
    };
    data.results.push(entry);
    await writeResults(data);
    return NextResponse.json({ success: true, result: entry });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to save quiz result" },
      { status: 500 }
    );
  }
}
