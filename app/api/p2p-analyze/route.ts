import Anthropic from "@anthropic-ai/sdk";
import { getFallbackAnalysis, getFallbackAnswer } from "@/lib/p2p/fallbacks";
import { P2P_SYSTEM_PROMPT } from "@/lib/p2p/systemPrompt";
import type { AnalyzeRequest } from "@/lib/p2p/types";

let warnedMissingKey = false;

function streamText(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

export async function POST(req: Request) {
  let body: AnalyzeRequest;

  try {
    body = (await req.json()) as AnalyzeRequest;
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const scenarioId = body.scenarioId ?? "default";

  if (!apiKey) {
    if (!warnedMissingKey) {
      console.warn(
        "[p2p-analyze] ANTHROPIC_API_KEY is missing — using fallback responses"
      );
      warnedMissingKey = true;
    }

    const fallback =
      body.type === "analyze"
        ? getFallbackAnalysis(scenarioId)
        : getFallbackAnswer(body.question ?? "", scenarioId);

    return new Response(streamText(fallback), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const userContent =
    body.type === "analyze"
      ? `Analyse this procurement P2P dataset and write a 3-4 paragraph consultant-style narrative in Sikha's voice. PO data (JSON):\n${JSON.stringify(body.data, null, 2)}`
      : `Answer this question about the procurement data in Sikha's voice. Question: "${body.question}"\n\nPO data (JSON):\n${JSON.stringify(body.data, null, 2)}`;

  try {
    const anthropic = new Anthropic({ apiKey });

    const stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: P2P_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    });

    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("[p2p-analyze] stream error:", err);
          const fallback =
            body.type === "analyze"
              ? getFallbackAnalysis(scenarioId)
              : getFallbackAnswer(body.question ?? "", scenarioId);
          controller.enqueue(encoder.encode(fallback));
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("[p2p-analyze] API error:", err);
    const fallback =
      body.type === "analyze"
        ? getFallbackAnalysis(scenarioId)
        : getFallbackAnswer(body.question ?? "", scenarioId);

    return new Response(streamText(fallback), {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
