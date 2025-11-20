"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./favoritos.css";

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos desde Firebase
  useEffect(() => {
    const loadFavs = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "favoritos"),
        where("userId", "==", user.uid)
      );

      const snapshot = await getDocs(q);

      const list = snapshot.docs.map((d) => ({
        firebaseId: d.id,
        ...d.data(),
      }));

      setFavoritos(list);
    };

    loadFavs();
  }, []);

  return (
    <div className="favoritos-container">
      <h1>Mis Cartas Favoritas</h1>

      {favoritos.length === 0 && (
        <p className="favoritos-message">No tienes cartas favoritas aún.</p>
      )}

      <div className="favoritos-grid">
        {favoritos.map((carta) => (
          <div key={carta.firebaseId} className="favorito-card">
            <Link
              to={`/detalle/${carta.id}`}
              state={{
                fromFavorites: true,
                firebaseId: carta.firebaseId,
              }}
            >
              <img src={carta.image} alt={carta.name} />
            </Link>

            <h3>{carta.name}</h3>

            {/* ⭐ Mostrar ATK y DEF si existen */}
            {carta.atk !== undefined && carta.def !== undefined ? (
              <p>
                <strong>ATK:</strong> {carta.atk} / <strong>DEF:</strong> {carta.def}
              </p>
            ) : (
              <p className="no-stats">Sin estadísticas disponibles.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
