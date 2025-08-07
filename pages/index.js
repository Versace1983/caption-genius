import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Amichevole");
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setCaption("");

    const response = await fetch('/api/generate-caption', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, platform, tone }),
    });

    const data = await response.json();
    setIsLoading(false);

    if (response.status === 200) {
      setCaption(data.caption);
    } else {
      setCaption(data.error || 'Si è verificato un errore');
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
      // Sfondo con gradiente e immagine più chiara
      backgroundImage: `linear-gradient(rgba(224, 231, 255, 0.7), rgba(199, 210, 254, 0.7)), url('https://images.unsplash.com/photo-1542435503-9d10e0147983?fit=crop&w=1920&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      fontFamily: 'Roboto, sans-serif', // Font del corpo
      color: '#334155',
    }}>
      <Head>
        <title>Generatore di Didascalie Gemini</title>
        <link rel="icon" href="/favicon.ico" />
        {/* Importa i font da Google Fonts */}
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
          fontFamily: 'Poppins, sans-serif', // Font del titolo
        }}>
          Genera Didascalie
        </h1>

        <p style={{
          fontSize: '1rem',
          marginBottom: '2rem',
          textAlign: 'center',
          lineHeight: '1.5',
          color: '#64748b',
          fontFamily: 'Roboto, sans-serif',
        }}>
          Inserisci una descrizione di un'immagine e lascia che Gemini generi didascalie creative per te.
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
            placeholder="Descrivi l'immagine (es. 'Un gattino che dorme su un cuscino')"
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
              <option value="Instagram">Instagram</option>
              <option value="TikTok">TikTok</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
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
              <option value="Amichevole">Amichevole</option>
              <option value="Professionale">Professionale</option>
              <option value="Ironico">Ironico</option>
              <option value="Motivazionale">Motivazionale</option>
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
            {isLoading ? "Generazione in corso..." : "Genera Didascalie"}
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
              Scegli una didascalia:
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