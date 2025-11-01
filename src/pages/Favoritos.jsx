import { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./favoritos.css"; // Creamos un CSS especial para favoritos

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) fetchFavoritos(u.uid);
    });
    return unsubscribe;
  }, []);

  const fetchFavoritos = async (uid) => {
    const q = query(collection(db, "favoritos"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    const favs = snapshot.docs.map((doc) => doc.data());
    setFavoritos(favs);
  };

  if (!user) return <p className="favoritos-message">Inicia sesión para ver tus favoritos.</p>;

  return (
    <div className="favoritos-container">
      <h1>Mis Favoritos</h1>
      {favoritos.length === 0 ? (
        <p className="favoritos-message">No tienes cartas guardadas.</p>
      ) : (
        <div className="favoritos-grid">
          {favoritos.map((card) => (
            <div key={card.id} className="favorito-card">
              <img src={card.image} alt={card.name} />
              <p>{card.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
