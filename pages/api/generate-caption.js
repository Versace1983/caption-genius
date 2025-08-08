export default async function handler(req, res) {
  // Verifica che il metodo HTTP sia POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Metodo non consentito' });
    return;
  }

  // Estrai i dati dal corpo della richiesta, inclusi 'language'
  const { prompt, platform, tone, language } = req.body;

  // Gestisci il caso in cui il prompt sia mancante o vuoto
  if (!prompt || prompt.trim().length === 0) {
    res.status(400).json({ error: 'Prompt mancante o vuoto' });
    return;
  }

  // Costruisci un prompt dettagliato per istruire il modello Gemini
  const fullPrompt = `Genera 3 didascalie per un post sui social media.
Piattaforma: "${platform}".
Descrizione dell'immagine: "${prompt}".
Il tono di voce deve essere "${tone}".
Scrivi le didascalie in lingua "${language}".
Forniscimi solo le didascalie separate da una riga vuota.`;

  console.log(`Prompt inviato a Gemini: ${fullPrompt}`);

  try {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: fullPrompt }] });

    const payload = {
      contents: chatHistory,
      generationConfig: {
        responseMimeType: "text/plain",
      }
    };

    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    let captions = "";

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      captions = result.candidates[0].content.parts[0].text;
    } else {
      console.error('Risposta Gemini inaspettata:', result);
      return res.status(500).json({ error: 'Errore interno con Gemini: risposta non valida' });
    }

    // Invia le didascalie come risposta
    res.status(200).json({ caption: captions });
  } catch (error) {
    console.error('Errore durante la chiamata a Gemini:', error);
    res.status(500).json({ error: 'Errore interno con Gemini' });
  }
}
