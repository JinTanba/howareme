import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import type { CoreMessage } from "ai"

/**
 * AIとのチャット機能を担う汎用的なクライアントクラス。
 * このクラスは、特定のAIプロバイダーとの通信ロジックをカプセル化します。
 */
export class AIClient {
  private readonly model

  /**
   * AIClientのインスタンスを生成します。
   * 環境変数 `OPENAI_API_KEY` からAPIキーを自動的に読み込みます。
   */
  constructor() {
    // Vercelの環境変数に設定されたOPENAI_API_KEYを利用して、
    // OpenAIモデルを初期化します。
    this.model = openai("gpt-4o-mini")
  }

  /**
   * メッセージ配列を受け取り、AIからの応答をストリーム形式で返します。
   * @param messages ユーザーからの入力を含むチャット履歴の配列。
   * @returns AIの応答を含むReadableStream。
   */
  async chatStream(messages: CoreMessage[]): Promise<ReadableStream> {
    const result = await streamText({
      model: this.model,
      messages,
    })

    // Vercel AI SDKの`toDataStreamResponse`が生成するResponseオブジェクトから
    // body (ReadableStream) を直接返します。
    return result.toDataStreamResponse().body
  }
}
