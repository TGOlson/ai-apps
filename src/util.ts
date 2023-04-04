const COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';

export type Config = {
  token: string,
};

export type Message = {
  role: 'system' | 'assistant' | 'user',
  content: string,
};

// a little quick/sloppy typing just to get the types to work out
// for now all we care about is the delta of the first choice
// TODO: clean this up if more rigorous typing is needed
export type CompletionsStreamResponse = {
  id: string,
  object: string,
  created: number,
  choices: {
    index: number,
    delta: {
      content: string,
    },
    finish_reason: string,
  }[],
  usage: {
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
  }
};

// streams responses from chatgpt completions api
export const streamChatGPTCompletions = async (config: Config, messages: Message[]): Promise<ReadableStream<CompletionsStreamResponse>> => {
  const res = await fetch(COMPLETIONS_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.token}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.5,
      stream: true,
    }),
  });

  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const statusText = res.statusText;
    const result = await res.body?.getReader().read();
    throw new Error(
      `OpenAI API returned an error: ${decoder.decode(result?.value) || statusText}`,
    );
  }

  const body = res.body;
  if (!body) {
    throw new Error('OpenAI API returned an empty response');
  }

  return new ReadableStream({
    async start(controller) {
      const reader = body.getReader();

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          controller.close();
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          const message = line.replace(/^data: /, '');

          if (message === '[DONE]') {
            controller.close();
            break;
          }

          const json = JSON.parse(message) as CompletionsStreamResponse;
          controller.enqueue(json);
        }
      }
    }
  });
};
