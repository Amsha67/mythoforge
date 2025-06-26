import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [civilisation, setCivilisation] = useState("Égypte");
  const [style, setStyle] = useState("Tragédie héroïque");
  const [elements, setElements] = useState(["Héros maudit"]);
  const [generatedStory, setGeneratedStory] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lightningClass, setLightningClass] = useState("lightning-appear");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLightningClass(""); // Supprime l'effet après l'animation
    }, 2000); // Durée identique à l'animation CSS

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const body = document.body;

    const className =
      civilisation === "Grèce"
        ? "greek"
        : civilisation === "Égypte"
          ? "egypt"
          : "nordic";

    document.body.classList.remove("greek", "egypt", "nordic");
    document.body.classList.add(className);

    // Ajoute l’effet visuel temporaire
    body.classList.add("animate-fx");

    const timeout = setTimeout(() => {
      body.classList.remove("animate-fx");
    }, 1000);

    return () => {
      clearTimeout(timeout);
      body.classList.remove("animate-fx");
    };
  }, [civilisation]);

  const getStyleFromCivilisation = () => {
    switch (civilisation) {
      case "Grèce":
        return "inspiré d'une fresque antique grecque, avec des couleurs terreuses, dorées et des motifs classiques";
      case "Égypte":
        return "dans le style de l'art mural égyptien ancien, avec des formes stylisées et des couleurs ocres, bleues et dorées";
      case "Nordique":
        return "dans le style des sagas nordiques, avec une ambiance froide, des runes, et un style inspiré des gravures sur pierre ou bois viking";
      default:
        return "dans un style mythologique classique";
    }
  };


  const toggleElement = (element) => {
    setElements((prev) =>
      prev.includes(element)
        ? prev.filter((e) => e !== element)
        : [...prev, element]
    );
  };

  const generateImage = async (prompt) => {
    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          n: 1,
          size: "512x512",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur HTTP:", response.status, errorText);
        throw new Error(`Erreur OpenAI image: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Image générée :", data);
      setGeneratedImage(data.data?.[0]?.url || "");
    } catch (error) {
      console.error("Erreur dans generateImage:", error);
      setGeneratedImage("");
    }
  };


  const generateAdventure = async () => {
    const prompt = `Génère une histoire mythologique courte basée sur la civilisation ${civilisation}, avec le style ${style}, incluant les éléments suivants : ${elements.join(", ")}`;
    setLoading(true);
    setGeneratedStory("");
    setGeneratedImage(""); // <-- Réinitialiser l’image précédente

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
      const story = data.choices?.[0]?.message?.content || "❌ Erreur : aucune histoire reçue.";
      setGeneratedStory(story);

      // 🖼️ Ensuite, générer l’image à partir de l’histoire
      const storySummary = story.slice(0, 250); // tronque à 250 caractères
      const imagePrompt = `Illustration mythologique ${getStyleFromCivilisation()}, représentant une scène avec ${elements.join(", ")}.`;


      generateImage(imagePrompt);
    } catch (error) {
      console.error("Erreur lors de la génération de l'histoire :", error);
      setGeneratedStory("❌ Erreur lors de la génération.");
    } finally {
      setLoading(false);
    }
  };


  const getAuraClass = () => {
    if (civilisation === "Grèce") return "greek";
    if (civilisation === "Égypte") return "egypt";
    if (civilisation === "Nordique") return "nordic";
    return "";
  };

  return (
    <div className="page-layout">
      <div className="main-container">
        <h1 className={`title ${lightningClass}`}>MythoForge</h1>


        <div className="generator-box">
          <h2 className="hero-subtitle">Crée ton aventure mythologique</h2>


          <h3 className="subtitle">Civilisation :</h3>

          {/* === Carte interactive === */}
          <div className="map-container">
            <img src="/images/mytho-map.jpg" alt="Carte mythologique" className="mytho-map" />

            <div className="map-buttons">
              <button className="map-zone grec" onClick={() => setCivilisation("Grèce")}>Grèce</button>
              <button className="map-zone egypt" onClick={() => setCivilisation("Égypte")}>Égypte</button>
              <button className="map-zone nordic" onClick={() => setCivilisation("Nordique")}>Nordique</button>
            </div>
          </div>

          <div className="button-section">
            <div className="button-row">
              {["Grèce", "Égypte", "Nordique"].map((c) => (
                <button
                  key={c}
                  onClick={() => setCivilisation(c)}
                  className={`stone-button ${getAuraClass()} ${civilisation === c ? "active" : ""}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <h3 className="subtitle">Style :</h3>
          <div className="button-section">
            <div className="button-row">
              {["Tragédie héroïque", "Épopée divine", "Romance interdite", "Complot cosmique"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`stone-button ${getAuraClass()} ${style === s ? "active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <h3 className="subtitle">Éléments clés :</h3>
          <div className="button-section">
            <div className="button-row">
              {["Héros maudit", "Monstre ancestral", "Artefact sacré", "Dieux en guerre"].map((e) => (
                <button
                  key={e}
                  onClick={() => toggleElement(e)}
                  className={`stone-button ${getAuraClass()} ${elements.includes(e) ? "active" : ""}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateAdventure}
            className={`stone-button main-action ${getAuraClass()}`}
          >
            Écrire l'histoire
          </button>

          {loading && (
            <div className="loading-block">
              <p className="loading-text">🕰️Les Dieux écrivent l’histoire...</p>
            </div>
          )}

          {!loading && generatedStory && (
            <div className="story-block">
              {generatedStory}
            </div>
          )}

          {!loading && generatedImage && (
            <div className="image-block">
              <img
                src={generatedImage}
                alt="Illustration IA"
                className="generated-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
