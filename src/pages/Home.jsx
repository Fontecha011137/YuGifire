import { useEffect, useState } from "react";
import axios from "axios";
import CardItem from "../components/CardItem";
import "./home.css"; 

export default function Home() {
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then(res => setCards(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const filtered = cards.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) &&
    (type ? c.type === type : true)
  );

  return (
    <div className="home">
      <h1>Cartas Yu-Gi-Oh!</h1>
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select onChange={e => setType(e.target.value)}>
        <option value="">Todos los tipos</option>
        <option value="Effect Monster">Effect Monster</option>
        <option value="Normal Monster">Normal Monster</option>
        <option value="Spell Card">Spell</option>
        <option value="Trap Card">Trap</option>
      </select>
      <div className="grid">
        {filtered.slice(0, 50).map(card => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
