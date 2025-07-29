import { AIClient } from "@/lib/ai-client"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// AIClientのインスタンスを生成
const aiClient = new AIClient()

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // AIClientを使ってチャットの応答ストリームを取得
    const stream = await aiClient.chatStream(messages)

    // ストリームをクライアントに返す
    return new Response(stream)
  } catch (error) {
    console.error("[Chat API Error]", error)
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred"
    return new Response(`Error: ${errorMessage}`, { status: 500 })
  }
}
