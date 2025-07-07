import React from "react";
import "./CreationPersonnage.css";

const racinesMythos = {
  Grèce: {
    prefixes: ["Ari", "Theo", "Kle", "Xan", "Demi", "Ili", "Pto"],
    noyaux: ["dor", "kratos", "phem", "nys", "thes", "gora", "leos"],
    suffixes: ["os", "ion", "ides", "eus", "icles", "ias"]
  },
  Égypte: {
    prefixes: ["An", "Neph", "Kha", "Os", "Ra", "Thot", "Bast"],
    noyaux: ["mut", "tep", "sar", "khet", "amon", "maat", "rekh"],
    suffixes: ["hotep", "es", "ka", "seh", "nek", "et"]
  },
  Nordique: {
    prefixes: ["Sig", "Thor", "Rag", "Bry", "Ul", "Fen", "Hro"],
    noyaux: ["vald", "grim", "skel", "bjorn", "heim", "frost", "drak"],
    suffixes: ["nir", "hild", "ar", "ulf", "rik", "son", "a"]
  }
};

const classesRPG = [
  // Combattants
  "Guerrier", "Paladin","Berserker", "Gladiateur", "Chevalier noir",

  // Mages
  "Mage", "Nécromancien","Ensorceleur","Invocateur", "Élémentaliste",

  // Rôdeurs
  "Rôdeur", "Voleur", "Assassin",

  // Hybrides
  "Moine", "Barde", "Alchimiste",

  // Surnaturelles
  "Lycan", "Vampire", "Démon", "Enfant des dieux",

  // Défensives
  "Gardien", "Clerc", "Prêtre", "Chaman",

  // Spéciales
  "Oniromancien",
];

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function genererClasseAleatoire() {
  return getRandomItem(classesRPG);
}

function genererAttributAleatoire() {
  return getRandomItem(attributsSpeciaux);
}

const attributsSpeciaux = [
  {
    nom: "Épée Solaire",
    effet: "Inflige des dégâts brûlants aux ennemis, tout en les éblouissant.",
    description: "Loué soit la soleil, cette lame irradie la lumière du Soleil, brûlant tout sur son passage."
  },
  {
    nom: "Amulette Maudite",
    effet: "Augmente la puissance magique au prix d’une malédiction.",
    description: "Objet maudit par les dieux, elle confère un pouvoir immense mais attire le regard des forces obscures."
  },
  {
    nom: "Bâton des Éléments",
    effet: "Permet de contrôler le feu, la glace la foudre et la terre.",
    description: "Ce bâton ancestral canalise les forces primordiales de la nature."
  },
  {
    nom: "Anneau Céleste",
    effet: "Offre une protection divine, réduisant les dégâts subis.",
    description: "L'anneau, orné de runes anciennes, protège son porteur grâce à la bénédiction de RA."
  },
  {
    nom: "Ocarina de Lien",
    effet: "Permet de contrôler les bêtes et le créatures mythologiques.",
    description: "Une mélodie envoûtante qui permet de rallier les créatures adverses, on dit même qu'une certaine mélodie permetterait de changer le cours du temps..."
  },
  {
    nom: "Bouclier de Verre",
    effet: "Réduit les effets des malédictions et de la magie.",
    description: "Un bouclier crée dans la forge des Dieux qui repousse les forces obscures"
  },
  {
    nom: "Cape des Ombres",
    effet: "Permet de se rendre invisible pendant un court instant.",
    description: "Nul ne sait qui a tissé cette cape, personne ne l'a jamais vu..."
  },
  {
    nom: "Masque Ancien",
    effet: "Permet de voir au-delà des illusions et des mensonges.",
    description: "Ce masque sacré dévoile la véritable nature des choses et des êtres."
  },
  {
    nom: "Grimoire Interdit",
    effet: "Accorde de puissants sorts de nécromancie",
    description: "Un recueil ancien où sommeillent les arcanes les plus dangereux et puissants, il y est inscrit : Cthulhu."
  },
  {
    nom: "Armure Sacrée",
    effet: "Offre une défense quasi-invincible contre les attaques physiques.",
    description: "Forgée par les dieux eux-mêmes, elle protège contre les coups mortels."
  },
  {
    nom: "Sang de Dragon",
    effet: "Accroît la force et la vitalité de manière spectaculaire.",
    description: "Une essence draconique infusée dans les veines, on dit que ce sang viens d'un dragon nomé Paturnax."
  },
  {
    nom: "Ailes Mystiques",
    effet: "Permet de s'envoler.",
    description: "Des ailes légendaires conférant l'agilité et la liberté du vent."
  },
  {
    nom: "Couronne Sylvestre",
    effet: "Permet de comuniquer avec les plantes",
    description: "Couronne façonnée par les esprits de la nature, elle permet de philosopher avec votre chêne préferé"
  },
  {
    nom: "Calice d'Âmes",
    effet: "Permet de résister à la mort une fois",
    description: "Un objet mystérieux qui relie deux vies en un destin commun, à condition d'avoir donné la mort auparavant.."
  },
  {
    nom: "Sceptre de Guérison",
    effet: "Permet de soigner.",
    description: "Bâton sacré utilisé par les anciens prêtres de Rhon pour ramener la lumière dans les ténèbres."
  }
];

const iconesObjets = {
  "Épée Solaire": "⚔️",
  "Amulette Maudite": "📿",
  "Bâton des Éléments": "🪄",
  "Anneau Céleste": "💍",
  "Ocarina de Lien": "🎶",
  "Bouclier de Verre": "🛡️",
  "Cape des Ombres": "🕶️",
  "Masque Ancien": "🎭",
  "Grimoire Interdit": "📖",
  "Armure Sacrée": "🥋",
  "Sang de Dragon": "🐉",
  "Ailes Mystiques": "🪽",
  "Couronne Sylvestre": "👑",
  "Calice d'Âmes": "🍷",
  "Sceptre de Guérison": "🪬"
};


function genererNomAleatoire(civilisation) {
  const racines = racinesMythos[civilisation] || racinesMythos["Grèce"];
  return (
    getRandomItem(racines.prefixes) +
    getRandomItem(racines.noyaux) +
    getRandomItem(racines.suffixes)
  );
}

function CreationPersonnage({ personnage, setPersonnage, onValider, civilisation }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonnage((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="creation-box">
      <h3 className="subtitle">Création de ton héros</h3>

      <div className="field-group">
        <label>Nom du héros :</label>
        <div className="input-with-button">
          <input
            type="text"
            name="nom"
            value={personnage.nom}
            onChange={handleChange}
            placeholder="Ex: Achille, Bastet, Freya..."
          />
          <button
            type="button"
            className="stone-button small"
            onClick={() =>
              setPersonnage((prev) => ({
                ...prev,
                nom: genererNomAleatoire(civilisation),
              }))
            }
          >
            Aléatoire
          </button>
        </div>
      </div>

      <div className="field-group">
        <label>Classe :</label>
        <div className="input-with-button">
          <select
            name="classe"
            value={personnage.classe}
            onChange={handleChange}
          >
            <option value="">-- Choisir --</option>
            {classesRPG.map((cls, idx) => (
              <option key={idx} value={cls}>{cls}</option>
            ))}
          </select>
          <button
            type="button"
            className="stone-button small"
            onClick={() =>
              setPersonnage((prev) => ({
                ...prev,
                classe: genererClasseAleatoire(),
              }))
            }
          >
            Aléatoire
          </button>
        </div>
      </div>

      <div className="field-group">
        <label>Objet légendaire :</label>
        <div className="input-with-button">
          <select
  name="attribut"
  value={personnage.attribut}
  onChange={handleChange}
>
  <option value="">-- Choisir --</option>
  {attributsSpeciaux.map((attr, i) => (
    <option key={i} value={attr.nom}>{attr.nom}</option>
  ))}
</select>
{personnage.attribut && (
  <div key={personnage.attribut}
  className="attribut-details">
  <h4>{personnage.attribut}</h4>
  <div className="item-icon">
    {iconesObjets[personnage.attribut] || "✨"}
  </div>
  <p className="section-title">Effet :</p>
  <p>{attributsSpeciaux.find(a => a.nom === personnage.attribut)?.effet}</p>
  <p className="section-title">Histoire :</p>
  <p>{attributsSpeciaux.find(a => a.nom === personnage.attribut)?.description}</p>
</div>

)}

          <button
            type="button"
            className="stone-button small"
            onClick={() =>
  setPersonnage((prev) => ({
    ...prev,
    attribut: genererAttributAleatoire().nom,  
  }))
}

          >
            Aléatoire
          </button>
        </div>
      </div>

      <button className="stone-button main-action hero-validate" onClick={onValider}>
        Créer le héros
      </button>
    </div>
  );
}

export default CreationPersonnage;
