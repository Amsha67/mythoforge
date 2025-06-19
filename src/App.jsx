import React, { useState } from "react";

function App() {
  const [civilisation, setCivilisation] = useState("Grèce");
  const [style, setStyle] = useState("Tragédie héroïque");
  const [elements, setElements] = useState(["Héros maudit"]);
  const [generatedStory, setGeneratedStory] = useState("");

  const toggleElement = (element) => {
    setElements((prev) =>
      prev.includes(element)
        ? prev.filter((e) => e !== element)
        : [...prev, element]
    );
  };

  const generateAdventure = async () => {
  const prompt = `Génère une histoire mythologique courte basée sur la civilisation ${civilisation}, avec le style ${style}, incluant les éléments suivants : ${elements.join(", ")}`;

  // Message d'attente
  setGeneratedStory("⏳ L'IA forge ton histoire mythologique...");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    console.log("✅ Réponse API :", data);

    if (data.choices && data.choices[0]) {
  // Animation texte "parchemin"
  const fullText = data.choices[0].message.content;
  let current = "";
  let i = 0;

  const interval = setInterval(() => {
    current += fullText[i];
    setGeneratedStory(current);
    i++;
    if (i >= fullText.length) clearInterval(interval);
  }, 20); // ← Vitesse d'écriture (20 ms par caractère)
}
  } catch (error) {
    setGeneratedStory("❌ Erreur lors de la génération. Vérifie ta clé API ou ta connexion.");
    console.error("Erreur réseau/API :", error);
  }
};


  return (
    <div style={{ backgroundColor: "#0f1a2c", color: "white", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>MythoForge</h1>

      <div style={{ backgroundColor: "white", color: "black", padding: "1rem", borderRadius: "12px", maxWidth: "600px", marginTop: "1rem" }}>
        <h2 style={{ fontWeight: "bold" }}>Crée ton aventure mythologique</h2>

        <label>Civilisation antique :</label>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          {["Grèce", "Égypte", "Nordique"].map((c) => (
            <button
              key={c}
              onClick={() => setCivilisation(c)}
              style={{
                padding: "0.3rem 1rem",
                backgroundColor: civilisation === c ? "#cce4ff" : "#eee",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <label>Style d’aventure :</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {["Tragédie héroïque", "Épopée divine", "Romance interdite", "Complot cosmique"].map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              style={{
                padding: "0.3rem 1rem",
                backgroundColor: style === s ? "#cce4ff" : "#eee",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <label>Éléments clés :</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          {["Héros maudit", "Monstre ancestral", "Artefact sacré", "Dieux en guerre"].map((e) => (
            <button
              key={e}
              onClick={() => toggleElement(e)}
              style={{
                padding: "0.3rem 1rem",
                backgroundColor: elements.includes(e) ? "#cce4ff" : "#eee",
                border: "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {e}
            </button>
          ))}
        </div>

        <button
          onClick={generateAdventure}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Générer l’histoire
        </button>
function App() {
  // ... tes useState et fonctions ici

  // 💡 Bloc de style pour l'animation
  const animationStyle = `console.log("✅ Animation injectée !")
    @keyframes scrollFade {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
  <>
    <style>{animationStyle}</style>
    <div style={{ backgroundColor: "#0f1a2c", color: "white", minHeight: "100vh", padding: "2rem" }}>
      {/* ... ton contenu ici ... */}


      {generatedStory && (
  <div
    style={{
      marginTop: "1rem",
      padding: "2rem",
      borderRadius: "10px",
      fontFamily: "'Cormorant Garamond', serif",
      color: "#2c1b10",
      lineHeight: "1.7",
      whiteSpace: "pre-wrap",
      border: "4px solid #a97442",
      backgroundImage: 'url("https://i.imgur.com/w5v3GZL.jpg")',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      animation: "scrollFade 1s ease-in-out",
      backgroundPosition: "center",
    }}
  >
    {generatedStory}
  </div>
)}

  </div>
)}

  <div
    style={{
      marginTop: "1rem",
      backgroundColor: "#fff8dc", // couleur "parchemin"
      padding: "1rem",
      borderRadius: "8px",
      fontFamily: "'Cormorant Garamond', serif", // belle police antique
      boxShadow: "0 0 20px rgba(0,0,0,0.3)",
      lineHeight: "1.6",
      whiteSpace: "pre-wrap",
      border: "2px solid #deb887", // bordure façon vieux cuir
    }}
  >
    {generatedStory}
  </div>
)}
        )}
      </div>
    </div>
  );
}

export default App;
