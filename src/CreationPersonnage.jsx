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
  "Guerrier", "Paladin", "Barbare", "Berserker", "Maître d’armes", "Gladiateur", "Lame dansante", "Champion sacré", "Chevalier noir", "Templier",

  // Mages
  "Mage", "Sorcier", "Archimage", "Évocationniste", "Nécromancien", "Enchanteur", "Pyromancien", "Cryomancien", "Thaumaturge", "Prophète",

  // Rôdeurs
  "Rôdeur", "Archer", "Chasseur", "Traqueur", "Voleur", "Assassin", "Ombre", "Éclaireur", "Tireur d’élite", "Chasseur de primes",

  // Hybrides
  "Moine", "Barde", "Alchimiste", "Inquisiteur", "Invocateur", "Ensorceleur", "Élémentaliste", "Runiste", "Chevalier-mage",

  // Surnaturelles
  "Lycan", "Vampire", "Démoniste", "Enfant des dieux", "Métamorphe", "Avatar spirituel", "Héraut du Néant",

  // Défensives
  "Gardien", "Défenseur", "Clerc", "Prêtre", "Chaman", "Porteur de bouclier", "Exorciste", "Émissaire divin",

  // Spéciales
  "Tisseur de destin", "Maître des bêtes", "Stratège", "Porteur d’artefacts", "Voyageur des songes", "Templier du Soleil", "Esprit de la forêt", "Oracle de l’ombre"
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
  "Force divine", "Vision prophétique", "Maîtrise des éléments", "Bénédiction des dieux",
  "Commandement sur les bêtes", "Résistance aux malédictions", "Contrôle du feu",
  "Maître des ombres", "Lien avec le monde des esprits", "Parole magique", "Peau d'acier",
  "Sang de titan", "Vol mystique", "Esprit de la nature", "Double personnalité divine",
  "Aura de guérison", "Invulnérabilité temporaire", "Voyage dans les rêves",
  "Manipulation du temps", "Vision de l'au-delà", "Loyauté éternelle", "Appel des morts",
  "Écaille de dragon", "Enfant de la prophétie", "Porteur d’une flamme antique",
  "Protection runique", "Cri de guerre mythique", "Œil de vérité", "Sang maudit",
  "Portail dimensionnel"
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
        <label>Attribut spécial :</label>
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
