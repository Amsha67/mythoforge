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
  "Épée Solaire",
  "Amulette maudite",
  "Bâton des Éléments",
  "Anneau Céleste",
  "Ocarina de lien",
  "Bouclier de verre",
  "Cape des Ombres",
  "Masque Ancien",
  "Grimoire Interdit",
  "Armure Sacrée",
  "Sang de Dragon",
  "Ailes mystiques",
  "Couronne Sylvestre",
  "Calice d'Âmes",
  "Sceptre de Guérison"
];


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
              <option key={i} value={attr}>{attr}</option>
            ))}
          </select>
          <button
            type="button"
            className="stone-button small"
            onClick={() =>
              setPersonnage((prev) => ({
                ...prev,
                attribut: genererAttributAleatoire(),
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
