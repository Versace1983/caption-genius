import OpenAI from "openai";

// Correzione: deve essere 'new OpenAI'
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
    const finalPrompt = `Genera tre didascalie brevi e creative per un'immagine con la seguente descrizione: "${prompt}". Separa ogni didascalia con una riga vuota.`;

    const completion = await openai.chat.completions.create({
      model: "gemini-1.5-flash-latest",
      messages: [{ role: "user", content: finalPrompt }],
      max_tokens: 150,
      temperature: 0.7,
    });

    const caption = completion.choices[0].message.content.trim();

    res.status(200).json({ caption });
  } catch (error) {
    console.error('Errore Gemini:', error);
    res.status(500).json({ error: 'Errore interno con Gemini' });
  }
}