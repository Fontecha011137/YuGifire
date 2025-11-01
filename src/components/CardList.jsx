// src/components/CardList.jsx
import CardItem from "./CardItem";

export default function CardList({ cards }) {
  return (
    <div className="card-list">
      {cards.map(card => (
        <CardItem key={card.id} card={card} />
      ))}
    </div>
  );
}
