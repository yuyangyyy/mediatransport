import { Link } from "react-router-dom";

import LogoMt from "./assets/logo-mediatransports.png";

import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-content">
      <div className="navbar-items">
        <Link to="/adminlog">
          <img
            className="navbar-logo"
            src={LogoMt}
            alt="Logo mediatransports"
          />
        </Link>
        <ul className="navbar-list">
          <Link to="/">
            <li className="navbar-list-row">Accueil</li>
          </Link>
          <Link to="/actualites">
            <li className="navbar-list-row">A la une</li>
          </Link>
          <li className="navbar-list-row">Annuaire</li>
          <Link to="/annonces">
            <li className="navbar-list-row">Petites Annonces</li>
          </Link>
          <Link to="/contacts">
            <li className="navbar-list-row">Contacts utiles</li>
          </Link>
          <Link to="/ressources">
            <li className="navbar-list-row">Ressources</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
