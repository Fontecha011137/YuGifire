import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "./detalle.css";

export default function Detalle() {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteMessage, setFavoriteMessage] = useState("");

  // Obtener carta desde la API
  useEffect(() => {
    setLoading(true);
    axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
      .then(res => {
        setCard(res.data.data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  // Revisar usuario autenticado
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      console.log("Usuario autenticado:", u); // <-- Aquí ves al usuario en consola
      setUser(u);
    });
    return unsubscribe;
  }, []);

  // Función para agregar a favoritos
const addToFavorites = async () => {
  if (!user) {
    alert("Debes iniciar sesión para agregar a favoritos.");
    return;
  }

  try {
    console.log("UID del usuario:", user.uid);
    console.log("Carta a agregar:", card);

    await addDoc(collection(db, "favoritos"), {
      id: card.id,
      name: card.name,
      image: card.card_images[0].image_url,
      userId: user.uid,
    });
    alert("Carta agregada a favoritos!");
  } catch (error) {
    console.error("Error al agregar a favoritos:", error);
    alert("Ocurrió un error al agregar a favoritos: " + error.message);
  }
};


  if (loading) return <p>Cargando...</p>;

  return (
    <div className="detalle-container">
      <h1>Detalle</h1>
      {card ? (
        <div className="detalle-card">
          <img 
            src={card.card_images?.[0]?.image_url} 
            alt={card.name} 
          />
          <div className="detalle-info">
            <h2>{card.name}</h2>
            <p><strong>Tipo:</strong> {card.type}</p>
            <p><strong>ATK:</strong> {card.atk}</p>
            <p><strong>DEF:</strong> {card.def}</p>
            <p><strong>Descripción:</strong> {card.desc}</p>
            <button onClick={addToFavorites}>Agregar a favoritos</button>
            {favoriteMessage && <p>{favoriteMessage}</p>}
          </div>
        </div>
      ) : (
        <p>No se encontró la carta.</p>
      )}
    </div>
  );
}
