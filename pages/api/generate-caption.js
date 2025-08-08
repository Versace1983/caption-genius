import OpenAI from "openai";

const openai = new OpenAI({
  // Utilizza una chiave API per l'ambiente Gemini.
  apiKey: process.env.GEMINI_API_KEY,
  // Specifica l'URL di base per l'API di Gemini.
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export default async function handler(req, res) {
  // Gestisce solo le richieste POST.
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  // Estrae i parametri dalla richiesta POST.
  const { prompt, platform, tone, language } = req.body;

  // Controlla se il prompt è mancante o vuoto.
  if (!prompt || prompt.trim().length === 0) {
    res.status(400).json({ error: 'Prompt mancante o vuoto' });
    return;
  }

  try {
    // Costruisce un prompt dettagliato per l'LLM, includendo lingua, piattaforma e tono.
    const llmPrompt = `Generate 3 creative captions in ${language} for an image described as "${prompt}". The captions should be for the "${platform}" platform and have a "${tone}" tone. Use appropriate hashtags and emojis.`;

    // Effettua la chiamata all'API di Gemini.
    const completion = await openai.chat.completions.create({
      // Specifica il modello di Gemini da utilizzare.
      model: "gemini-1.5-flash-latest",
      // Passa il prompt come messaggio dell'utente.
      messages: [{ role: "user", content: llmPrompt }],
      // Imposta il numero massimo di token per la risposta.
      max_tokens: 150,
      // Controlla la casualità della risposta.
      temperature: 0.7,
      // Richiede 3 didascalie.
      n: 3,
    });

    // Mappa le risposte per estrarre solo il testo delle didascalie.
    const captions = completion.choices.map(c => c.message.content.trim()).join('\n\n');

    // Invia la risposta di successo con le didascalie.
    res.status(200).json({ caption: captions });
  } catch (error) {
    // Gestione degli errori API, loggando l'errore e inviando una risposta di errore.
    console.error('Errore Gemini:', error);
    res.status(500).json({ error: 'Errore interno con Gemini' });
  }
}
