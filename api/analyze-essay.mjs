const MAX_TEXT_LENGTH = 8000;
const MIN_TEXT_LENGTH = 180;

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["score", "summary", "criteria", "strengths", "improvements", "revision"],
  properties: {
    score: { type: "integer", minimum: 0, maximum: 100 },
    summary: { type: "string" },
    criteria: {
      type: "array",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "score", "comment"],
        properties: {
          name: { type: "string" },
          score: { type: "integer", minimum: 0, maximum: 25 },
          comment: { type: "string" },
        },
      },
    },
    strengths: { type: "array", minItems: 1, maxItems: 3, items: { type: "string" } },
    improvements: { type: "array", minItems: 1, maxItems: 4, items: { type: "string" } },
    revision: { type: "string" },
  },
};

function jsonResponse(response, status, body) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.end(JSON.stringify(body));
}

function outputTextOf(payload) {
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "output_text" && content.text) return content.text;
    }
  }
  return "";
}

async function requestBodyOf(request) {
  if (request.body && typeof request.body === "object") return request.body;
  if (typeof request.body === "string") return JSON.parse(request.body);
  let raw = "";
  for await (const chunk of request) raw += chunk;
  return JSON.parse(raw || "{}");
}

export default async function handler(request, response) {
  if (request.method !== "POST") return jsonResponse(response, 405, { error: "Método não permitido." });
  if (process.env.ESSAY_AI_ENABLED !== "true" || !process.env.OPENAI_API_KEY) {
    return jsonResponse(response, 503, { error: "A correção por IA ainda não está configurada." });
  }

  let body;
  try {
    body = await requestBodyOf(request);
  } catch {
    return jsonResponse(response, 400, { error: "Corpo JSON inválido." });
  }
  const prompt = String(body?.prompt || "").trim().slice(0, 2000);
  const text = String(body?.text || "").trim();
  if (!prompt || text.length < MIN_TEXT_LENGTH || text.length > MAX_TEXT_LENGTH) {
    return jsonResponse(response, 400, { error: "Tema ou redação fora dos limites permitidos." });
  }

  const apiResponse = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_ESSAY_MODEL || "gpt-5-mini",
      store: false,
      max_output_tokens: 1400,
      instructions: [
        "Você é avaliador de redação técnico-administrativa para concurso público de nível médio.",
        "Avalie somente o texto recebido, sem inventar exigências do edital ou fatos não apresentados.",
        "Distribua exatamente 25 pontos para cada critério: Adequação ao tema, Estrutura, Clareza e objetividade, Linguagem formal.",
        "A nota total deve ser a soma dos quatro critérios.",
        "Seja específico, didático e conciso. Não reescreva a resposta inteira.",
      ].join(" "),
      input: `PROPOSTA:\n${prompt}\n\nTEXTO DO CANDIDATO:\n${text}`,
      text: {
        format: {
          type: "json_schema",
          name: "essay_feedback",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!apiResponse.ok) {
    const requestId = apiResponse.headers.get("x-request-id") || undefined;
    return jsonResponse(response, 502, { error: "O serviço de IA não concluiu a análise.", requestId });
  }
  const payload = await apiResponse.json();
  const outputText = outputTextOf(payload);
  try {
    const result = JSON.parse(outputText);
    const criteriaTotal = result.criteria.reduce((sum, item) => sum + Number(item.score || 0), 0);
    result.score = criteriaTotal;
    return jsonResponse(response, 200, result);
  } catch {
    return jsonResponse(response, 502, { error: "A resposta da IA não pôde ser validada." });
  }
}
