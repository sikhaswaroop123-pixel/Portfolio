import type { AnalyzeRequest } from "@/lib/p2p/types";

export async function streamP2PAnalyze(
  payload: AnalyzeRequest,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): Promise<void> {
  try {
    const res = await fetch("/api/p2p-analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok || !res.body) {
      throw new Error(`API error: ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, { stream: true });
      if (text) onChunk(text);
    }

    onDone();
  } catch (err) {
    onError(err instanceof Error ? err : new Error(String(err)));
  }
}
