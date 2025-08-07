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

  const { prompt } = req.body;
  if (!prompt || prompt.trim().length === 0) {
    res.status(400).json({ error: 'Prompt mancante o vuoto' });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gemini-1.5-flash-latest",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 30, // Didascalie più brevi
      n: 3, // Genera 3 didascalie
      temperature: 0.7,
    });

    const captions = completion.choices.map(c => c.message.content.trim()).join('\n\n');

    res.status(200).json({ caption: captions });
  } catch (error) {
    console.error('Errore Gemini:', error);
    res.status(500).json({ error: 'Errore interno con Gemini' });
  }
}