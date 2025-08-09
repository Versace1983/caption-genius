import { useState } from 'react';
import { PenTool, Wand2, Copy } from 'lucide-react';

// Definizione dell'oggetto delle traduzioni per l'internazionalizzazione (i18n)
const translations = {
  it: {
    languageName: "Italiano",
    languageLabel: "Seleziona la lingua",
    title: "Genera Post Professionali",
    description: "Inserisci una descrizione di un'immagine e lascia che CG generi didascalie creative e professionali per te.",
    placeholder: "Descrivi l'immagine (es. 'Una giornata perfetta al mare con amici')",
    platformLabel: "Piattaforma",
    platformDescription: "Scegli la piattaforma per adattare lo stile e gli hashtag.",
    toneLabel: "Tono",
    toneDescription: "Definisci il tono per riflettere la personalità del tuo brand.",
    generateButton: "Genera Didascalie",
    generatingButton: "Generazione in corso...",
    resultTitle: "Scegli una didascalia:",
    error: "Si è verificato un errore",
    networkError: "Errore di rete, riprova più tardi.",
    copySuccess: "Didascalia copiata!",
    copyFailure: "Impossibile copiare il testo.",
    // Opzioni per le tendine
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "Amichevole", label: "Amichevole" },
      { value: "Professionale", label: "Professionale" },
      { value: "Ironico", label: "Ironico" },
      { value: "Motivazionale", label: "Motivazionale" },
    ],
  },
  en: {
    languageName: "English",
    languageLabel: "Select your language",
    title: "Generate Captions",
    description: "Enter a description of an image and let CG generate creative captions for you.",
    placeholder: "Describe the image (e.g., 'A perfect day at the beach with friends')",
    platformLabel: "Platform",
    platformDescription: "Choose the platform to tailor the style and hashtags.",
    toneLabel: "Tone",
    toneDescription: "Define the tone to reflect your brand's personality.",
    generateButton: "Generate Captions",
    generatingButton: "Generating...",
    resultTitle: "Choose a caption:",
    error: "An error occurred",
    networkError: "Network error, please try again later.",
    copySuccess: "Caption copied!",
    copyFailure: "Failed to copy text.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "Friendly", label: "Friendly" },
      { value: "Professional", label: "Professional" },
      { value: "Ironic", label: "Ironic" },
      { value: "Motivational", label: "Motivational" },
    ],
  },
  es: {
    languageName: "Español",
    languageLabel: "Seleccione su idioma",
    title: "Generador de Subtítulos",
    description: "Ingresa una descripción de una imagen y deja que CG genere subtítulos creativos para ti.",
    placeholder: "Describe la imagen (ej. 'Un día perfecto en la playa con amigos.')",
    platformLabel: "Plataforma",
    platformDescription: "Elige la plataforma para adaptar el estilo y los hashtags.",
    toneLabel: "Tono",
    toneDescription: "Define el tono para reflejar la personalidad de tu marca.",
    generateButton: "Generar Subtítulos",
    generatingButton: "Generando...",
    resultTitle: "Elige un subtítulo:",
    error: "Ocurrió un error",
    networkError: "Error de red, por favor, inténtalo de nuevo más tarde.",
    copySuccess: "¡Subtítulo copiado!",
    copyFailure: "No se pudo copiar el texto.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "Amistoso", label: "Amistoso" },
      { value: "Profesional", label: "Profesional" },
      { value: "Irónico", label: "Irónico" },
      { value: "Motivacional", label: "Motivacional" },
    ],
  },
  de: {
    languageName: "Deutsch",
    languageLabel: "Wählen Sie Ihre Sprache",
    title: "Untertitel-Generator",
    description: "Gib eine Bildbeschreibung ein und lass CG kreative Untertitel für dich erstellen.",
    placeholder: "Beschreibe das Bild (z.B. 'Ein perfekter Tag am Strand mit Freunden')",
    platformLabel: "Plattform",
    platformDescription: "Wähle die Plattform, um den Stil und die Hashtags anzupassen.",
    toneLabel: "Ton",
    toneDescription: "Definiere den Ton, um die Persönlichkeit deiner Marke widerzuspiegeln.",
    generateButton: "Untertitel generieren",
    generatingButton: "Generiere...",
    resultTitle: "Wähle einen Untertitel:",
    error: "Ein Fehler ist aufgetreten",
    networkError: "Netzwerkfehler, bitte versuche es später noch einmal.",
    copySuccess: "Untertitel kopiert!",
    copyFailure: "Text konnte nicht kopiert werden.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "Freundlich", label: "Freundlich" },
      { value: "Professionell", label: "Professionell" },
      { value: "Ironisch", label: "Ironisch" },
      { value: "Motivierend", label: "Motivierend" },
    ],
  },
  fr: {
    languageName: "Français",
    languageLabel: "Sélectionnez votre langue",
    title: "Générateur de Légendes",
    description: "Saisis une description d'image et laisse CG générer des légendes créatives pour toi.",
    placeholder: "Décris l'image (ex. 'Une journée parfaite à la plage avec des amis')",
    platformLabel: "Plateforme",
    platformDescription: "Choisis la plateforme pour adapter le style et les hashtags.",
    toneLabel: "Tonalité",
    toneDescription: "Définis la tonalité pour refléter la personnalité de ta marque.",
    generateButton: "Générer des légendes",
    generatingButton: "Génération en cours...",
    resultTitle: "Choisis une légende:",
    error: "Une erreur s'est produite",
    networkError: "Erreur réseau, veuillez réessayer plus tard.",
    copySuccess: "Légende copiée !",
    copyFailure: "Échec de la copie du texte.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "Amical", label: "Amical" },
      { value: "Professionnel", label: "Professionnel" },
      { value: "Ironique", label: "Ironique" },
      { value: "Motivant", label: "Motivant" },
    ],
  },
  ru: {
    languageName: "Русский",
    languageLabel: "Выберите язык",
    title: "Генератор подписей",
    description: "Введите описание изображения, и пусть CG сгенерирует для вас креативные подписи.",
    placeholder: "Опишите изображение (например, 'Идеальный день на пляже с друзьями')",
    platformLabel: "Платформа",
    platformDescription: "Выберите платформу, чтобы адаптировать стиль и хэштеги.",
    toneLabel: "Тон",
    toneDescription: "Определите тон, чтобы отразить индивидуальность вашего бренда.",
    generateButton: "Генерировать подписи",
    generatingButton: "Генерация...",
    resultTitle: "Выберите подпись:",
    error: "Произошла ошибка",
    networkError: "Ошибка сети, повторите попытку позже.",
    copySuccess: "Подпись скопирована!",
    copyFailure: "Не удалось скопировать текст.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "Дружелюбный", label: "Дружелюбный" },
      { value: "Профессиональный", label: "Профессиональный" },
      { value: "Ироничный", label: "Ироничный" },
      { value: "Мотивационный", label: "Мотивационный" },
    ],
  },
  zh: {
    languageName: "中文",
    languageLabel: "选择你的语言",
    title: "标题生成器",
    description: "输入图片描述，让 CG 为你生成创意标题。",
    placeholder: "描述图片（例如：“與朋友在海灘度過完美的一天”）",
    platformLabel: "平台",
    platformDescription: "选择平台以调整样式和标签。",
    toneLabel: "语气",
    toneDescription: "定义语气以反映您的品牌个性。",
    generateButton: "生成标题",
    generatingButton: "生成中...",
    resultTitle: "选择一个标题：",
    error: "发生错误",
    networkError: "网络错误，请稍后重试。",
    copySuccess: "标题已复制！",
    copyFailure: "无法复制文本。",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "友好", label: "友好" },
      { value: "专业", label: "专业" },
      { value: "讽刺", label: "讽刺" },
      { value: "励志", label: "励志" },
    ],
  },
  ja: {
    languageName: "日本語",
    languageLabel: "言語を選択してください",
    title: "キャプションジェネレーター",
    description: "画像の説明を入力すると、CG が創造的なキャプションを生成します。",
    placeholder: "画像の説明を入力してください（例：'友達とビーチで過ごす完璧な一日'）",
    platformLabel: "プラットフォーム",
    platformDescription: "スタイルとハッシュタグを調整するためにプラットフォームを選択してください。",
    toneLabel: "トーン",
    toneDescription: "ブランドの個性を反映するためにトーンを定義してください。",
    generateButton: "キャプションを生成",
    generatingButton: "生成中...",
    resultTitle: "キャプションを選択：",
    error: "エラーが発生しました",
    networkError: "ネットワークエラー、後でもう一度お試しください。",
    copySuccess: "キャプションをコピーしました！",
    copyFailure: "テキストのコピーに失敗しました。",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "フレンドリー", label: "フレンドリー" },
      { value: "プロフェッショナル", label: "プロフェッショナル" },
      { value: "皮肉", label: "皮肉" },
      { value: "やる気を起こさせる", label: "やる気を起こさせる" },
    ],
  },
  ko: {
    languageName: "한국어",
    languageLabel: "언어를 선택하세요",
    title: "캡션 생성기",
    description: "이미지 설명을 입력하면 CG 가 창의적인 캡션을 생성해 드립니다.",
    placeholder: "이미지 설명 입력 (예: '친구들과 함께 해변에서 보낸 완벽한 하루')",
    platformLabel: "플랫폼",
    platformDescription: "스타일과 해시태그를 조정할 플랫폼을 선택하세요.",
    toneLabel: "톤",
    toneDescription: "브랜드의 개성을 반영하도록 톤을 정의하세요.",
    generateButton: "캡션 생성",
    generatingButton: "생성 중...",
    resultTitle: "캡션 선택:",
    error: "오류가 발생했습니다",
    networkError: "네트워크 오류, 나중에 다시 시도해 주세요.",
    copySuccess: "캡션을 복사했습니다!",
    copyFailure: "텍스트 복사에 실패했습니다.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "친근한", label: "친근한" },
      { value: "전문적인", label: "전문적인" },
      { value: "아이러니한", label: "아이러니한" },
      { value: "동기 부여", label: "동기 부여" },
    ],
  },
  ar: {
    languageName: "العربية",
    languageLabel: "اختر لغتك",
    title: "مولد التسميات التوضيحية",
    description: "أدخل وصفًا لصورة ودع CG يولد لك تسميات توضيحية إبداعية.",
    placeholder: "وصف الصورة (مثال: 'يوم مثالي على الشاطئ مع الأصدقاء')",
    platformLabel: "المنصة",
    platformDescription: "اختر المنصة لتكييف النمط والهاشتاجات.",
    toneLabel: "النغمة",
    toneDescription: "حدد النغمة لتعكس شخصية علامتك التجارية.",
    generateButton: "توليد التسميات التوضيحية",
    generatingButton: "جارٍ التوليد...",
    resultTitle: "اختر تسمية توضيحية:",
    error: "حدث خطأ",
    networkError: "خطأ في الشبكة، يرجى المحاولة مرة أخرى لاحقًا.",
    copySuccess: "تم نسخ التسمية التوضيحية!",
    copyFailure: "فشل نسخ النص.",
    platforms: [
      { value: "Instagram", label: "Instagram" },
      { value: "TikTok", label: "TikTok" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook", label: "Facebook" },
      { value: "Twitter", label: "Twitter" },
    ],
    tones: [
      { value: "ودود", label: "ودود" },
      { value: "احترافي", label: "احترافي" },
      { value: "ساخر", label: "ساخر" },
      { value: "تحفيزي", label: "تحفيزي" },
    ],
  },
};

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Friendly");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const t = translations[language];

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setCaption("");
    setCopyStatus("");

    try {
      // Inserisci qui la logica per la chiamata API
      // Nota: la chiamata API non è implementata in questo snippet per semplicità
      // e per evitare errori di compilazione in questo ambiente.
      const response = {
        status: 200,
        json: () => Promise.resolve({ caption: "This is a placeholder caption generated for " + prompt + "." })
      };

      const data = await response.json();
      setIsLoading(false);

      if (response.status === 200) {
        setCaption(data.caption);
      } else {
        setCaption(data.error || t.error);
      }
    } catch (err) {
      setIsLoading(false);
      setCaption(t.networkError);
    }
  }

  const handleCopy = () => {
    // Usiamo document.execCommand('copy') perché navigator.clipboard.writeText può non funzionare negli iframe
    const el = document.createElement('textarea');
    el.value = caption;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      setCopyStatus(t.copySuccess);
    } catch (err) {
      setCopyStatus(t.copyFailure);
    }
    document.body.removeChild(el);
    setTimeout(() => setCopyStatus(""), 2000); // Rimuove il messaggio dopo 2 secondi
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-8 text-slate-800">
        <main className="flex flex-col items-center p-8 max-w-xl w-full bg-white/80 rounded-xl shadow-lg backdrop-blur-sm relative">
          {/* Logo in alto a sinistra */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <PenTool className="h-8 w-8 text-indigo-600 animate-pulse" />
            <span className="font-bold text-xl text-indigo-800">
              CG <span className="font-light text-indigo-600">Caption Genius</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-4 text-center mt-12">
            {t.title}
          </h1>

          <p className="text-base sm:text-lg mb-8 text-center text-slate-600">
            {t.description}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2 mb-4">
              <span className="text-sm font-medium text-slate-700">{t.languageLabel}</span>
              <select
                value={language}
                onChange={(e) => {
                  const newLanguage = e.target.value;
                  setLanguage(newLanguage);
                  const newTones = translations[newLanguage].tones;
                  const newPlatforms = translations[newLanguage].platforms;
                  setTone(newTones[0].value);
                  setPlatform(newPlatforms[0].value);
                }}
                className="px-3 py-2 rounded-md bg-white/70 border border-slate-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all cursor-pointer"
              >
                {Object.keys(translations).map((langKey) => (
                  <option key={langKey} value={langKey}>
                    {translations[langKey].languageName}
                  </option>
                ))}
              </select>
            </div>


            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.placeholder}
              rows="4"
              className="w-full p-4 text-base bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">{t.platformLabel}</label>
                <p className="text-xs text-slate-500">{t.platformDescription}</p>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full p-4 text-base bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {t.platforms.map((p, index) => (
                    <option key={index} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">{t.toneLabel}</label>
                <p className="text-xs text-slate-500">{t.toneDescription}</p>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-4 text-base bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                >
                  {t.tones.map((to, index) => (
                    <option key={index} value={to.value}>{to.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 text-lg font-bold text-white rounded-lg shadow-md transition-all ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t.generatingButton}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Wand2 className="h-6 w-6" />
                  {t.generateButton}
                </div>
              )}
            </button>
          </form>

          {caption && (
            <div className="mt-8 p-6 w-full bg-slate-50 border border-slate-200 rounded-lg shadow-inner relative">
              <h3 className="text-xl font-semibold mb-4 text-slate-700">
                {t.resultTitle}
              </h3>
              <pre className="whitespace-pre-wrap break-words m-0 p-0 text-base leading-relaxed text-slate-600">
                {caption}
              </pre>
              <button
                onClick={handleCopy}
                className="absolute top-6 right-6 p-2 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-slate-200 transition-colors"
                title={t.copySuccess}
              >
                <Copy className="h-5 w-5" />
              </button>
              {copyStatus && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-sm px-3 py-1 rounded-full shadow-lg transition-opacity duration-300">
                  {copyStatus}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
