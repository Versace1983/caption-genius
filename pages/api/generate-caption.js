// Questo handler gestisce le richieste POST per generare didascalie creative
// utilizzando l'API di Gemini. Il codice è stato aggiornato per utilizzare direttamente
// il modello 'gemini-2.5-flash-preview-05-20' e per rimuovere le dipendenze da
// librerie esterne non necessarie in questo ambiente.

// Oggetto per le traduzioni delle istruzioni LLM
const llmPrompts = {
  it: (description, platform, tone) => `Genera 3 didascalie creative in italiano per un'immagine descritta come "${description}". Le didascalie devono essere per la piattaforma "${platform}" e avere un tono "${tone}". Utilizza hashtag ed emoji appropriati.`,
  en: (description, platform, tone) => `Generate 3 creative captions in English for an image described as "${description}". The captions should be for the "${platform}" platform and have a "${tone}" tone. Use appropriate hashtags and emojis.`,
  es: (description, platform, tone) => `Genera 3 subtítulos creativos en español para una imagen descrita como "${description}". Los subtítulos deben ser para la plataforma "${platform}" y tener un tono "${tone}". Utiliza hashtags y emojis apropiados.`,
  de: (description, platform, tone) => `Generiere 3 kreative Untertitel auf Deutsch für ein Bild, das als "${description}" beschrieben wird. Die Untertitel sollten für die Plattform "${platform}" sein und einen "${tone}" Ton haben. Verwende passende Hashtags und Emojis.`,
  fr: (description, platform, tone) => `Génère 3 légendes créatives en français pour une image décrite comme "${description}". Les légendes doivent être pour la plateforme "${platform}" et avoir une tonalité "${tone}". Utilise des hashtags et des emojis appropriés.`,
  ru: (description, platform, tone) => `Сгенерируй 3 креативных подписи на русском языке для изображения, описанного как "${description}". Подписи должны быть для платформы "${platform}" и иметь тон "${tone}". Используй подходящие хэштеги и эмодзи.`,
  zh: (description, platform, tone) => `為描述為「${description}」的圖像生成 3 個中文創意標題。標題應適用於「${platform}」平台，並帶有「${tone}」語氣。使用適當的主題標籤和表情符號。`,
  ja: (description, platform, tone) => `「${description}」と説明されている画像について、日本語で3つのクリエイティブなキャプションを生成してください。キャプションは「${platform}」プラットフォーム向けで、「${tone}」のトーンである必要があります。適切なハッシュタグや絵文字を使用してください。`,
  ko: (description, platform, tone) => `「${description}」로 묘사된 이미지에 대해 한국어로 3개의 창의적인 캡션을 생성해 주세요. 캡션은 「${platform}」 플랫폼용이어야 하며 「${tone}」 톤을 가져야 합니다. 적절한 해시태그와 이모티콘을 사용하세요.`,
  ar: (description, platform, tone) => `قم بإنشاء 3 تعليقات إبداعية باللغة العربية لصورة موصوفة بأنها "${description}". يجب أن تكون التعليقات لمنصة "${platform}" وأن يكون لها نغمة "${tone}". استخدم علامات التصنيف والرموز التعبيرية المناسبة.`,
};

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
    // Seleziona il prompt tradotto in base alla lingua scelta dall'utente.
    const getPrompt = llmPrompts[language] || llmPrompts.en; // Fallback all'inglese
    const llmPrompt = getPrompt(prompt, platform, tone);

    // Preparazione del payload per l'API di Gemini.
    const chatHistory = [{ role: "user", parts: [{ text: llmPrompt }] }];
    const payload = { contents: chatHistory };
    const apiKey = ""; // L'API key verrà fornita automaticamente dall'ambiente
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // Effettua la chiamata all'API di Gemini con exponential backoff.
    let response;
    let retries = 0;
    const maxRetries = 3;
    const initialDelay = 1000;

    while (retries < maxRetries) {
      try {
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          break; // Esci dal ciclo se la chiamata ha successo
        } else {
          console.error(`Tentativo ${retries + 1} fallito con stato: ${response.status}`);
          throw new Error('API request failed');
        }
      } catch (err) {
        retries++;
        if (retries < maxRetries) {
          const delay = initialDelay * Math.pow(2, retries - 1);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          throw err;
        }
      }
    }

    const result = await response.json();
    
    // Controlla la struttura della risposta per evitare errori.
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      const captions = result.candidates[0].content.parts[0].text;
      // Invia la risposta di successo con le didascalie.
      res.status(200).json({ caption: captions });
    } else {
      console.error('Struttura della risposta Gemini non valida:', result);
      res.status(500).json({ error: 'Risposta non valida da Gemini' });
    }
    
  } catch (error) {
    // Gestione degli errori API, loggando l'errore e inviando una risposta di errore.
    console.error('Errore durante la chiamata a Gemini:', error);
    res.status(500).json({ error: 'Errore interno con Gemini' });
  }
}
