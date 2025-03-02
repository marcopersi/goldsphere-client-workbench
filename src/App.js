import React, { useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Portfolio from "./components/features/Portfolio/Portfolio";
import ProductOrder from "./components/features/ProductOrder/ProductOrder";
import ReferenceData from "./components/features/ReferenceData/ReferenceData";
import Products from "./components/features/Products/Products";
import APIDocs from "./components/APIDocs";
import logo from "./assets/logo.webp";
import './App.css'; // Neue CSS-Datei für Stile

const Home = () => <h2 align="center">Welcome to GoldSphere</h2>;

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((lng) => {
    i18n.changeLanguage(lng);
  }, [i18n]);

  const navItems = [
    { path: "/portfolio", label: t('yourPortfolio') },
    { path: "/products", label: t('products') },
    { path: "/product-request", label: t('productRequest') },
    { path: "/references", label: t('references') },
    { path: "/api-docs", label: t('apiDocs') }
  ];

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="logo-container">
            <img src={logo} alt="GoldSphere Logo" className="logo" />
            <h1>GoldSphere</h1>
          </div>
          <nav className="nav-container">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="nav-link"
                onMouseOver={(e) => (e.target.style.background = "linear-gradient(to bottom, silver, black)")}
                onMouseOut={(e) => (e.target.style.background = "linear-gradient(to bottom, gold, black)")}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="language-container">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              className="language-select"
            >
              <option value="en">🇬🇧 English</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="es">🇪🇸 Español</option>
            </select>
            <button className="more-button">
              {t('...')}
            </button>
          </div>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-request" element={<ProductOrder />} />
            <Route path="/references" element={<ReferenceData />} />
            <Route path="/api-docs" element={<APIDocs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;