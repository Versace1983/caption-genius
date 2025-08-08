import React, { useState } from 'react';
import Head from 'next/head';

// Definizione dell'oggetto delle traduzioni per l'internazionalizzazione (i18n)
const translations = {
  it: {
    title: "GPP - Genera Post Professionali",
    description: "Inserisci una descrizione di un'immagine e lascia che GPP generi didascalie creative e professionali per te.",
    placeholder: "Descrivi l'immagine (es. 'Una giornata perfetta al mare con amici')",
    platformLabel: "Piattaforma",
    toneLabel: "Tono",
    generateButton: "Genera Didascalie",
    generatingButton: "Generazione in corso...",
    resultTitle: "Scegli una didascalia:",
    error: "Si è verificato un errore",
    networkError: "Errore di rete, riprova più tardi.",
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
    title: "Generate Captions",
    description: "Enter a description of an image and let Gemini generate creative captions for you.",
    placeholder: "Describe the image (e.g., 'A kitten sleeping on a pillow')",
    platformLabel: "Platform",
    toneLabel: "Tone",
    generateButton: "Generate Captions",
    generatingButton: "Generating...",
    resultTitle: "Choose a caption:",
    error: "An error occurred",
    networkError: "Network error, please try again later.",
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
    title: "Generador de Subtítulos",
    description: "Ingresa una descripción de una imagen y deja que Gemini genere subtítulos creativos para ti.",
    placeholder: "Describe la imagen (ej. 'Un gatito durmiendo en una almohada')",
    platformLabel: "Plataforma",
    toneLabel: "Tono",
    generateButton: "Generar Subtítulos",
    generatingButton: "Generando...",
    resultTitle: "Elige un subtítulo:",
    error: "Ocurrió un error",
    networkError: "Error de red, por favor, inténtalo de nuevo más tarde.",
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
    title: "Untertitel-Generator",
    description: "Gib eine Bildbeschreibung ein und lass Gemini kreative Untertitel für dich erstellen.",
    placeholder: "Beschreibe das Bild (z.B. 'Ein Kätzchen schläft auf einem Kissen')",
    platformLabel: "Plattform",
    toneLabel: "Ton",
    generateButton: "Untertitel generieren",
    generatingButton: "Generiere...",
    resultTitle: "Wähle einen Untertitel:",
    error: "Ein Fehler ist aufgetreten",
    networkError: "Netzwerkfehler, bitte versuche es später noch einmal.",
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
    title: "Générateur de Légendes",
    description: "Saisis une description d'image et laisse Gemini générer des légendes créatives pour toi.",
    placeholder: "Décris l'image (ex. 'Un chaton endormi sur un oreiller')",
    platformLabel: "Plateforme",
    toneLabel: "Tonalité",
    generateButton: "Générer des légendes",
    generatingButton: "Génération en cours...",
    resultTitle: "Choisis une légende:",
    error: "Une erreur s'est produite",
    networkError: "Erreur réseau, veuillez réessayer plus tard.",
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
    title: "Генератор подписей",
    description: "Введите описание изображения, и пусть Gemini сгенерирует для вас креативные подписи.",
    placeholder: "Опишите изображение (например, 'Котенок спит на подушке')",
    platformLabel: "Платформа",
    toneLabel: "Тон",
    generateButton: "Генерировать подписи",
    generatingButton: "Генерация...",
    resultTitle: "Выберите подпись:",
    error: "Произошла ошибка",
    networkError: "Ошибка сети, повторите попытку позже.",
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
    title: "标题生成器",
    description: "输入图片描述，让 Gemini 为你生成创意标题。",
    placeholder: "描述图片（例如：“一只小猫睡在枕头上”）",
    platformLabel: "平台",
    toneLabel: "语气",
    generateButton: "生成标题",
    generatingButton: "生成中...",
    resultTitle: "选择一个标题：",
    error: "发生错误",
    networkError: "网络错误，请稍后重试。",
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
    title: "キャプションジェネレーター",
    description: "画像の説明を入力すると、Gemini が創造的なキャプションを生成します。",
    placeholder: "画像の説明を入力してください（例：'枕で眠る子猫'）",
    platformLabel: "プラットフォーム",
    toneLabel: "トーン",
    generateButton: "キャプションを生成",
    generatingButton: "生成中...",
    resultTitle: "キャプションを選択：",
    error: "エラーが発生しました",
    networkError: "ネットワークエラー、後でもう一度お試しください。",
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
    title: "캡션 생성기",
    description: "이미지 설명을 입력하면 Gemini가 창의적인 캡션을 생성해 드립니다.",
    placeholder: "이미지 설명 입력 (예: '베개 위에서 자고 있는 아기 고양이')",
    platformLabel: "플랫폼",
    toneLabel: "톤",
    generateButton: "캡션 생성",
    generatingButton: "생성 중...",
    resultTitle: "캡션 선택:",
    error: "오류가 발생했습니다",
    networkError: "네트워크 오류, 나중에 다시 시도해 주세요.",
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
    title: "مولد التسميات التوضيحية",
    description: "أدخل وصفًا لصورة ودع Gemini يولد لك تسميات توضيحية إبداعية.",
    placeholder: "وصف الصورة (مثال: 'قطة صغيرة نائمة على وسادة')",
    platformLabel: "المنصة",
    toneLabel: "النغمة",
    generateButton: "توليد التسميات التوضيحية",
    generatingButton: "جارٍ التوليد...",
    resultTitle: "اختر تسمية توضيحية:",
    error: "حدث خطأ",
    networkError: "خطأ في الشبكة، يرجى المحاولة مرة أخرى لاحقًا.",
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
  const [language, setLanguage] = useState('it');
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Amichevole");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[language];

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setCaption("");

    try {
      const response = await fetch('/api/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, platform, tone, language }),
      });

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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '2rem',
      backgroundImage: `linear-gradient(rgba(224, 231, 255, 0.7), rgba(199, 210, 254, 0.7)), url('https://images.unsplash.com/photo-1542435503-9d10e0147983?fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Roboto, sans-serif',
      color: '#334155',
    }}>
      <Head>
        <title>{t.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
      </Head>

      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem',
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          marginBottom: '1rem',
          textAlign: 'center',
          color: '#4f46e5',
          fontFamily: 'Poppins, sans-serif',
        }}>
          {t.title}
        </h1>

        <p style={{
          fontSize: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          lineHeight: '1.5',
          color: '#64748b',
          fontFamily: 'Roboto, sans-serif',
        }}>
          {t.description}
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          gap: '1rem',
        }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t.placeholder}
            rows="4"
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              transition: 'border-color 0.3s',
              resize: 'none',
              fontFamily: 'Roboto, sans-serif',
            }}
          />

          {/* Nuova tendina per la selezione della lingua con più opzioni */}
          <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'flex-end' }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{
                padding: '0.5rem',
                fontSize: '0.875rem',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
                width: 'auto',
              }}
            >
              <option value="it">🇮🇹 Italiano</option>
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Español</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="zh">🇨� 中文 (Cinese)</option>
              <option value="ja">🇯🇵 日本語 (Giapponese)</option>
              <option value="ko">🇰🇷 한국어 (Coreano)</option>
              <option value="ar">🇦🇪 العربية (Arabo)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem',
                fontSize: '1rem',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {t.platforms.map((p, index) => (
                <option key={index} value={p.value}>{p.label}</option>
              ))}
            </select>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem',
                fontSize: '1rem',
                backgroundColor: '#f1f5f9',
                color: '#334155',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {t.tones.map((to, index) => (
                <option key={index} value={to.value}>{to.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: isLoading ? '#cbd5e1' : '#4f46e5',
              border: 'none',
              borderRadius: '8px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            {isLoading ? t.generatingButton : t.generateButton}
          </button>
        </form>

        {caption && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            width: '100%',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              marginBottom: '1rem',
              fontWeight: 600,
              color: '#334155',
              fontFamily: 'Poppins, sans-serif',
            }}>
              {t.resultTitle}
            </h3>
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              margin: 0,
              padding: 0,
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#475569',
              fontFamily: 'Roboto, sans-serif',
            }}>
              {caption}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
�