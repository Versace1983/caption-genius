import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  // Estrai anche la lingua dalla richiesta
  const { prompt, platform, tone, language } = req.body;
  if (!prompt || prompt.trim().length === 0) {
    res.status(400).json({ error: 'Prompt mancante o vuoto' });
    return;
  }

  try {
    // Costruisci un prompt più dettagliato per l'LLM che includa la lingua
    const llmPrompt = `Generate 3 creative captions in ${language} for an image described as "${prompt}". The captions should be for the "${platform}" platform and have a "${tone}" tone. Use appropriate hashtags and emojis.`;

    const completion = await openai.chat.completions.create({
      model: "gemini-1.5-flash-latest",
      messages: [{ role: "user", content: llmPrompt }],
      max_tokens: 150, // Aumentato per didascalie più complete
      temperature: 0.7,
      
    });

    // Estrai i testi dalle scelte
    const captions = completion.choices.map(c => c.message.content.trim()).join('\n\n');

    res.status(200).json({ caption: captions });
  } catch (error) {
    console.error('Errore Gemini:', error);
    res.status(500).json({ error: 'Errore interno con Gemini' });
  }
}
