import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* Botón hamburguesa */}
      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        type="button"
      >
        <span className={open ? "line open" : "line"}></span>
        <span className={open ? "line open" : "line"}></span>
        <span className={open ? "line open" : "line"}></span>
      </button>

      {/* Links */}
      <ul className={open ? "navbar-links active" : "navbar-links"}>
        <li>
          <NavLink to="/" className="nav-item" onClick={() => setOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/original"
            className="nav-item"
            onClick={() => setOpen(false)}
          >
            Original
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/informativa"
            className="nav-item"
            onClick={() => setOpen(false)}
          >
            Informativa
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favoritos"
            className="nav-item"
            onClick={() => setOpen(false)}
          >
            Favoritos
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="nav-item" onClick={() => setOpen(false)}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className="nav-item"
            onClick={() => setOpen(false)}
          >
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
