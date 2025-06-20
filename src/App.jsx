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

      if (data.choices && data.choices[0]) {
        setGeneratedStory(data.choices[0].message.content);
      } else {
        setGeneratedStory("❌ Erreur : aucune histoire reçue.");
        console.error("Détails :", data);
      }
    } catch (error) {
      setGeneratedStory("❌ Erreur lors de la génération.");
      console.error("Erreur de fetch :", error);
    }
  };

  // ✅ Style d’animation parchemin
  const animationStyle = `
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

          {loading && (
  <div style={{ textAlign: "center", marginTop: "2rem" }}>
    <img
      src="https://i.gifer.com/origin/e0/e02a09e06168ef7b83840c6bbadb7ee7_w200.gif"
      alt="Sablier antique"
      style={{ width: "60px", height: "60px", marginBottom: "1rem" }}
    />
    <p style={{ fontStyle: "italic", color: "#ccc" }}>Génération en cours...</p>
  </div>
)}

{!loading && generatedStory && (
  <div
    style={{
      marginTop: "1rem",
      backgroundColor: #c7976d;
backgroundImage: url("https://www.transparenttextures.com/patterns/clean-gray-paper.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      backgroundSize: "cover",
      border: "2px solid #d1b77c",
      padding: "1.5rem",
      borderRadius: "12px",
      fontFamily: "'EB Garamond', serif",
      fontSize: "1.1rem",
      whiteSpace: "pre-wrap",
      boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      animation: "scrollFade 1.5s ease-in-out",
    }}
  >
    {generatedStory}
  </div>
)}

            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

