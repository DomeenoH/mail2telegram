import type { Ai } from '@cloudflare/workers-types';

interface WorkersAiResponse {
    response?: string;
}

export async function summarizedByWorkerAI(ai: Ai, model: string, prompt: string): Promise<string> {
    const result = await ai.run(model as any, {
        messages: [
            {
                role: 'system',
                content: '你是一个专业的邮件总结助手。你必须严格使用中文进行回答。严禁直接使用英文进行总结。你的总结应当简洁、清晰，直接提供邮件摘要。',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    }) as WorkersAiResponse | string;

    if (typeof result === 'string') {
        return result || 'AI 暂时无法生成总结。';
    }

    if (result?.response) {
        return result.response;
    }

    console.error('AI Response Error:', result);
    return '抱歉，AI 总结服务返回了空结果。';
}

export async function summarizedByOpenAI(key: string, endpoint: string, model: string, prompt: string): Promise<string> {
    if (!key || !endpoint || !model) {
        return 'Sorry, the OpenAI API is not configured properly.';
    }
    const resp = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`,
        },
        body: JSON.stringify({
            model,
            messages: [
                {
                    role: 'system',
                    content: '你是一个专业的邮件总结助手。你必须严格使用中文进行回答。严禁直接使用英文进行总结。你的总结应当简洁、清晰，直接提供邮件摘要。',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        }),
    });
    if (!resp.ok) {
        throw new Error(`OpenAI API request failed: ${resp.status}`);
    }
    const body = await resp.json() as any;
    return body?.choices?.[0]?.message?.content || '';
}
