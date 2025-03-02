import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Portfolio from "./components/features/Portfolio/Portfolio";
import ProductRequest from "./components/features/ProductOrder/ProductOrder";
import ReferenceData from "./components/features/ReferenceData/ReferenceData";
import Products from "./components/features/Products/Products";
import APIDocs from "./components/APIDocs";
import logo from "./assets/logo.webp";

const Home = () => <h2>Welcome to GoldSphere</h2>;

const App = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <img src={logo} alt="GoldSphere Logo" style={{ width: "70px", height: "70px" }} />
            <h1>GoldSphere</h1>
          </div>
          <nav style={{ display: "flex", gap: "15px" }}>
            <NavLink
              to="/portfolio"
              style={{
                padding: "10px 20px",
                border: "1px solid silver",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(to bottom, silver, black)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(to bottom, gold, black)")}
            >
              {t('yourPortfolio')}
            </NavLink>
            <NavLink
              to="/products"
              style={{
                padding: "10px 20px",
                border: "1px solid silver",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(to bottom, silver, black)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(to bottom, gold, black)")}
            >
              {t('products')}
            </NavLink>
            <NavLink
              to="/product-request"
              style={{
                padding: "10px 20px",
                border: "1px solid silver",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(to bottom, silver, black)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(to bottom, gold, black)")}
            >
              {t('productRequest')}
            </NavLink>
            <NavLink
              to="/references"
              style={{
                padding: "10px 20px",
                border: "1px solid silver",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(to bottom, silver, black)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(to bottom, gold, black)")}
            >
              {t('references')}
            </NavLink>            
            <NavLink
              to="/api-docs"
              style={{
                padding: "10px 20px",
                border: "1px solid silver",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.background = "linear-gradient(to bottom, silver, black)")}
              onMouseOut={(e) => (e.target.style.background = "linear-gradient(to bottom, gold, black)")}
            >
              {t('apiDocs')}
            </NavLink>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                border: "1px solid silver",
                fontSize: "18px",
              }}
            >
              <option value="en">🇬🇧 English</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="es">🇪🇸 Español</option> {/* Spanische Sprache hinzugefügt */}
            </select>
            <button
              style={{
                padding: "5px 10px",
                border: "1px solid silver",
                borderRadius: "5px",
                background: "linear-gradient(to bottom, gold, black)",
                color: "white",
                cursor: "pointer",
              }}
            >
              {t('...')}
            </button>
          </div>
        </header>
        <main style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-request" element={<ProductRequest />} />
            <Route path="/references" element={<ReferenceData />} />
            <Route path="/api-docs" element={<APIDocs />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;