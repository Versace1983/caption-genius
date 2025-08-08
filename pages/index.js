import React, { useState } from 'react';
import Head from 'next/head';

// Definizione dell'oggetto delle traduzioni per l'internazionalizzazione (i18n)
const translations = {
  it: {
    title: "Genera Didascalie",
    description: "Inserisci una descrizione di un'immagine e lascia che Gemini generi didascalie creative per te.",
    placeholder: "Descrivi l'immagine (es. 'Un gattino che dorme su un cuscino')",
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
};

export default function Home() {
  // Aggiunto un nuovo stato per la lingua, con l'italiano come default
  const [language, setLanguage] = useState('it');
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Amichevole");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ottiene i testi tradotti in base alla lingua corrente
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
        // Invia anche la lingua al tuo endpoint API
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

          {/* Nuova tendina per la selezione della lingua */}
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
