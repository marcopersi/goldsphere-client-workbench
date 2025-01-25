import React from "react";
import logo from "../assets/logo.webp"; // WebP-Logo
import { NavLink } from "react-router-dom";

const Header = () => (
  <header className="App-header">
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="GoldSphere Logo" className="logo" />
        <nav className="nav-links">
          <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/portfolio" className="nav-link" activeClassName="active">Portfolio</NavLink>
          <NavLink to="/upload" className="nav-link" activeClassName="active">Upload</NavLink>
          <NavLink to="/api-docs" className="nav-link" activeClassName="active">API Docs</NavLink>
        </nav>
      </div>
      <div className="navbar-right">
        <div className="language-switch">
          <select className="language-select">
            <option value="en">🇬🇧 English</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="it">🇮🇹 Italiano</option>
          </select>
        </div>
        <div className="menu-button">...</div>
      </div>
    </div>
  </header>
);

export default Header;
