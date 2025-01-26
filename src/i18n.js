import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "yourPortfolio": "Your Portfolio",
      "productRequest": "Product Request",
      "apiDocs": "API Docs",
      "product": "Product",
      "productType": "Product Type",
      "weight": "Weight",
      "purchaseDate": "Purchase Date",
      "seller": "Seller",
      "custody": "Custody",
      "value": "Value",    
      // ...other translations
    }
  },
  de: {
    translation: {
      "welcome": "Willkommen",
      "yourPortfolio": "Ihr Portfolio",
      "productRequest": "Produktanfrage",
      "apiDocs": "API-Dokumentation",
      "product": "Produkt",
      "productType": "Produkttyp",
      "weight": "Gewicht",
      "purchaseDate": "Kaufdatum",
      "seller": "Verkäufer",
      "custody": "Verwahrung",
      "value": "Wert",      
      // ...other translations
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "yourPortfolio": "Votre portefeuille",
      "productRequest": "Demande de produit",
      "apiDocs": "Documentation de l'API",
      "product": "Produit",
      "productType": "Type de produit",
      "weight": "Poids",
      "purchaseDate": "Date d'achat",
      "seller": "Vendeur",
      "custody": "Garde",
      "value": "Valeur",
      // ...other translations
    }
  },
  it: {
    translation: {
      "welcome": "Benvenuto",
      "yourPortfolio": "Il tuo portafoglio",
      "productRequest": "Richiesta di prodotto",
      "apiDocs": "Documentazione API",
      "product": "Prodotto",
      "productType": "Tipo di prodotto",
      "weight": "Peso",
      "purchaseDate": "Data di acquisto",
      "seller": "Venditore",
      "custody": "Custodia",
      "value": "Valore",
      // ...other translations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;