// App.jsx — Grèce antique permanent
import React, { useState } from "react";
import "./App.css";

function App() {
  const [civilisation, setCivilisation] = useState("Grèce");
  const [style, setStyle] = useState("Tragédie héroïque");
  const [elements, setElements] = useState(["Héros maudit"]);
  const [generatedStory, setGeneratedStory] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleElement = (element) => {
    setElements((prev) =>
      prev.includes(element)
        ? prev.filter((e) => e !== element)
        : [...prev, element]
    );
  };

  const generateAdventure = async () => {
    const prompt = `Génère une histoire mythologique courte basée sur la civilisation ${civilisation}, avec le style ${style}, incluant les éléments suivants : ${elements.join(", ")}`;
    setLoading(true);
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
      setGeneratedStory(data.choices?.[0]?.message?.content || "Erreur");
    } catch (error) {
      setGeneratedStory("Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <h1 className="title">MythoForge</h1>
        <div className="generator-box">
          <h2>Crée ton aventure mythologique</h2>

          <label>Civilisation antique :</label>
          <div className="button-row">
            {"Grèce Égypte Nordique".split(" ").map((c) => (
              <button
                key={c}
                onClick={() => setCivilisation(c)}
                className={`stone-button ${civilisation === c ? "active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>

          <label>Style :</label>
          <div className="button-row">
            {["Tragédie héroïque", "Épopée divine", "Romance interdite", "Complot cosmique"].map((s) => (
              <button key={s} onClick={() => setStyle(s)} className="stone-button">
                {s}
              </button>
            ))}
          </div>

          <label>Éléments :</label>
          <div className="button-row">
            {["Héros maudit", "Monstre ancestral", "Artefact sacré", "Dieux en guerre"].map((e) => (
              <button key={e} onClick={() => toggleElement(e)} className="stone-button">
                {e}
              </button>
            ))}
          </div>

          <button onClick={generateAdventure} className="stone-button main-action">
            Générer l’histoire
          </button>

          {loading && (
            <div className="loading-block">
              <img
                src="https://cdn-icons-png.flaticon.com/512/148/148855.png"
                alt="chargement"
                className="spin"
              />
              <p>Les Dieux écrivent l’histoire...</p>
            </div>
          )}

          {!loading && generatedStory && (
            <div className="story-block">
              {generatedStory}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;


