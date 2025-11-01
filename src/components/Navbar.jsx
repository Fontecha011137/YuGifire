import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><NavLink to="/" className="nav-item">Home</NavLink></li>
        <li><NavLink to="/original" className="nav-item">Original</NavLink></li>
        <li><NavLink to="/informativa" className="nav-item">Informativa</NavLink></li>
        <li><NavLink to="/favoritos" className="nav-item">Favoritos</NavLink></li>
        <li><NavLink to="/login" className="nav-item">Login</NavLink></li>
        <li><NavLink to="/register" className="nav-item">Register</NavLink></li>
      </ul>
    </nav>
  );
}
