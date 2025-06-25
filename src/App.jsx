// App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [civilisation, setCivilisation] = useState("Égypte");
  const [style, setStyle] = useState("Tragédie héroïque");
  const [elements, setElements] = useState(["Héros maudit"]);
  const [generatedStory, setGeneratedStory] = useState("");
  const [loading, setLoading] = useState(false);

  // Appliquer classe selon civilisation + lancer une animation spécifique
  useEffect(() => {
    const body = document.body;

    // Nettoyage
    body.classList.remove("greek", "egypt", "nordic", "greek-anim", "egypt-anim", "nordic-anim");

    // Ajout des classes
    const baseClass = getCivilisationClass(civilisation);
    body.classList.add(baseClass);            // fond
    body.classList.add(`${baseClass}-anim`);  // animation

    // Retire l'animation après 1s pour pouvoir rejouer plus tard
    const timeout = setTimeout(() => {
      body.classList.remove(`${baseClass}-anim`);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [civilisation]);

  const getCivilisationClass = (civ) => {
    if (civ === "Grèce") return "greek";
    if (civ === "Égypte") return "egypt";
    if (civ === "Nordique") return "nordic";
    return "";
  };

  const getAuraClass = () => getCivilisationClass(civilisation);

  const toggleElement = (element) => {
    setElements((prev) =>
      prev.includes(element) ? prev.filter((e) => e !== element) : [...prev, element]
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
      setGeneratedStory(data.choices?.[0]?.message?.content || "❌ Erreur : aucune histoire reçue.");
    } catch (error) {
      setGeneratedStory("❌ Erreur lors de la génération.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-layout">
      <div className="main-container">
        <h1 className="title">MythoForge</h1>
        <div className="generator-box">
          <h2>Crée ton aventure mythologique</h2>

          <label>Civilisation antique :</label>
          <div className="button-row">
            {["Grèce", "Égypte", "Nordique"].map((c) => (
              <button
                key={c}
                onClick={() => setCivilisation(c)}
                className={`stone-button ${civilisation === c ? getAuraClass() + " active" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>

          <label>Style :</label>
          <div className="button-row">
            {["Tragédie héroïque", "Épopée divine", "Romance interdite", "Complot cosmique"].map((s) => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`stone-button ${style === s ? getAuraClass() + " active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>

          <label>Éléments clés :</label>
          <div className="button-row">
            {["Héros maudit", "Monstre ancestral", "Artefact sacré", "Dieux en guerre"].map((e) => (
              <button
                key={e}
                onClick={() => toggleElement(e)}
                className={`stone-button ${elements.includes(e) ? getAuraClass() + " active" : ""}`}
              >
                {e}
              </button>
            ))}
          </div>

          <button onClick={generateAdventure} className={`stone-button main-action ${getAuraClass()}`}>
            Générer l’histoire
          </button>

          {loading && (
            <div className="loading-block">
              <p className="loading-text">🕰️Les Dieux écrivent l’histoire...</p>
            </div>
          )}

          {!loading && generatedStory && (
            <div className="story-block">{generatedStory}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
