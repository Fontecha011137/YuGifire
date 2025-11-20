import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import "./detalle.css";

export default function Detalle() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const fromFavorites = location.state?.fromFavorites || false;
  const firebaseId = location.state?.firebaseId || null;

  const [card, setCard] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Detectar usuario autenticado
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Cargar carta desde API siempre, aunque venga de favoritos
  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
        );
        setCard(res.data.data[0]);
      } catch (error) {
        console.error(error);
        alert("No se pudo cargar la carta.");
      }
      setLoading(false);
    };

    fetchCard();
  }, [id]);

  // Agregar a favoritos
  const addToFavorites = async () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar a favoritos.");
      return;
    }

    await addDoc(collection(db, "favoritos"), {
      id: card.id,
      name: card.name,
      image: card.card_images[0].image_url,
      atk: card.atk,
      def: card.def,
      userId: user.uid,
    });

    alert("Carta agregada a favoritos!");
  };

  // Quitar de favoritos
  const removeFromFavorites = async () => {
    if (!firebaseId) return;

    await deleteDoc(doc(db, "favoritos", firebaseId));
    alert("Carta retirada de favoritos");
    navigate("/favoritos");
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <h1>Detalle</h1>

      {card ? (
        <div className="detalle-card">
          <img src={card.card_images?.[0]?.image_url} alt={card.name} />

          <div className="detalle-info">
            <h2>{card.name}</h2>
            <p>
              <strong>Tipo:</strong> {card.type}
            </p>
            <p>
              <strong>ATK:</strong> {card.atk ?? "N/A"}
            </p>
            <p>
              <strong>DEF:</strong> {card.def ?? "N/A"}
            </p>
            <p>
              <strong>Descripción:</strong> {card.desc}
            </p>

            {!fromFavorites && (
              <button onClick={addToFavorites}>Agregar a favoritos</button>
            )}

            {fromFavorites && (
              <button onClick={removeFromFavorites}>
                Quitar de favoritos
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>No se encontró la carta.</p>
      )}
    </div>
  );
}

