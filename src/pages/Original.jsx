import { useState, useEffect } from "react";
import axios from "axios";
import "./original.css";

export default function Empatica() {
  const [cards, setCards] = useState([]);
  const [personality, setPersonality] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then(res => setCards(res.data.data.slice(0, 100)))
      .catch(console.error);
  }, []);

  const findCardByPersonality = (type) => {
    let filtered = cards;
    if (type === "estrategico") filtered = cards.filter(c => c.atk > c.def);
    else if (type === "defensivo") filtered = cards.filter(c => c.def >= c.atk);
    else if (type === "equilibrado") filtered = cards.filter(c => c.atk === c.def);

    if (filtered.length === 0) return alert("No se encontró ninguna carta para este estilo.");

    const card = filtered[Math.floor(Math.random() * filtered.length)];
    setSelectedCard(card);
  }

  return (
    <div className="original-container">
      <h1>Encuentra tu carta según tu personalidad</h1>

      <div className="selects">
        <select onChange={e => setPersonality(e.target.value)} value={personality}>
          <option value="">Selecciona tu estilo</option>
          <option value="estrategico">Eres estratégico</option>
          <option value="defensivo">Eres defensivo</option>
          <option value="equilibrado">Eres equilibrado</option>
        </select>
        <button onClick={() => findCardByPersonality(personality)}>Mostrar carta</button>
      </div>

      {selectedCard && (
        <div className="compare-cards" style={{marginTop: "20px"}}>
          <div className="card">
            <h2>{selectedCard.name}</h2>
            <img src={selectedCard.card_images[0].image_url} alt={selectedCard.name} />
            <p><strong>ATK:</strong> {selectedCard.atk} / <strong>DEF:</strong> {selectedCard.def}</p>
          </div>
        </div>
      )}
    </div>
  );
}
