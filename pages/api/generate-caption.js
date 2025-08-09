import OpenAI from "openai";

const openai = new OpenAI({
  // Utilizza una chiave API per l'ambiente Gemini.
  apiKey: process.env.GEMINI_API_KEY,
  // Specifica l'URL di base per l'API di Gemini.
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

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

    // Effettua la chiamata all'API di Gemini.
    const completion = await openai.chat.completions.create({
      // Specifica il modello di Gemini da utilizzare.
      model: "gemini-1.5-flash-latest",
      // Passa il prompt tradotto come messaggio dell'utente.
      messages: [{ role: "user", content: llmPrompt }],
      // Imposta il numero massimo di token per la risposta.
      max_tokens: 500,
      // Controlla la casualità della risposta.
      temperature: 0.7,
          
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
