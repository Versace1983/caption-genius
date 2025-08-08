import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Verifica che il metodo HTTP sia POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  // Estrai i dati dal corpo della richiesta, incluso il nuovo parametro 'language'
  const { prompt, platform, tone, language } = req.body;

  // Gestisci il caso in cui il prompt sia mancante o vuoto
  if (!prompt || prompt.trim().length === 0) {
    res.status(400).json({ error: 'Prompt mancante o vuoto' });
    return;
  }

  // Costruisci un prompt più dettagliato per istruire il modello
  const fullPrompt = `Genera 3 didascalie per un post su ${platform}.
Descrizione dell'immagine: "${prompt}".
Il tono di voce deve essere "${tone}".
Scrivi le didascalie in lingua "${language}".`;

  console.log(`Prompt inviato a OpenAI: ${fullPrompt}`);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // O un altro modello disponibile
      messages: [
        {
          role: "system",
          content: "Sei un assistente creativo che genera didascalie per i social media."
        },
        {
          role: "user",
          content: fullPrompt
        }
      ],
      max_tokens: 150, // Aumentato il numero di token per didascalie più lunghe
      temperature: 0.8, // Aumentata la creatività
      n: 3, // Chiedi 3 didascalie
    });

    // Estrai i testi dalle scelte e uniscili in un'unica stringa
    const captions = completion.choices.map(c => c.message.content.trim()).join('\n\n---\n\n');

    // Invia le didascalie come risposta
    res.status(200).json({ caption: captions });
  } catch (error) {
    console.error('Errore OpenAI:', error);
    res.status(500).json({ error: 'Errore interno con OpenAI' });
  }
}
