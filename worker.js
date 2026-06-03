// Cloudflare Worker - 智谱 GLM API 代理
// 部署到 Cloudflare Workers 后，前端通过 /api/generate 调用

const ZHIPU_API_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const ALLOWED_ORIGIN = 'https://xiaoqi898.github.io';

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(request),
      });
    }

    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/api/health') {
      return jsonResponse({ ok: true, time: new Date().toISOString() });
    }

    // Story generation endpoint
    if (url.pathname === '/api/generate' && request.method === 'POST') {
      try {
        const { prompt } = await request.json();

        if (!prompt || prompt.length > 2000) {
          return jsonResponse({ error: 'Invalid prompt' }, 400);
        }

        // Call Zhipu GLM API
        const apiKey = env.ZHIPU_API_KEY;
        if (!apiKey) {
          return jsonResponse({ error: 'API key not configured' }, 500);
        }

        const response = await fetch(ZHIPU_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'glm-4-flash',
            messages: [
              {
                role: 'system',
                content: '你是一位中国历史学家和文学大师，擅长用第二人称"你"来叙述历史故事，文笔优美、画面感强。请直接输出故事文本，不要加标题、引号或任何格式标记。',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.85,
            max_tokens: 500,
            top_p: 0.9,
          }),
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('Zhipu API error:', response.status, errText);
          return jsonResponse({ error: 'AI service error', status: response.status }, 502);
        }

        const data = await response.json();
        const story = data.choices?.[0]?.message?.content || '';

        return jsonResponse({ story });
      } catch (err) {
        console.error('Worker error:', err);
        return jsonResponse({ error: 'Internal error' }, 500);
      }
    }

    // 404
    return new Response('Not Found', { status: 404 });
  },
};

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = origin === ALLOWED_ORIGIN ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1');

  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders({ headers: { get: () => '' } }()),
    },
  });
}
