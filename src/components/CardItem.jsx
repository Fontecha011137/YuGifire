import { Link } from "react-router-dom";

export default function CardItem({ card }) {
  return (
    <div className="card-item">
      <Link to={`/detalle/${card.id}`}>
        <img src={card.card_images[0].image_url} alt={card.name} />
      </Link>
      <p>{card.name}</p>
    </div>
  );
}
