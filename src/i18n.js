import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      "yourPortfolio": "Portfolio",
      "productname": "Product Name",
      "productRequest": "Product Orders",
      "references": "Reference Data",
      "apiDocs": "API Docs",
      "products": "Products",
      "product": "Product",
      "producttypes": "Product Types",
      "producttype": "Product Type",
      "weight": "Weight",
      "purchaseDate": "Purchase Date",
      "seller": "Seller",
      "custody": "Custody",
      "id": "ID",
      "name": "Name",
      "location": "Location",
      "createdat": "Created At",
      "updatedat": "Updated At",
      "iso_code": "ISO Code",
      "referenceDataManagement": "Reference Data Management",
      "metals": "Metals",
      "custodians": "Custodians",
      "countries": "Countries",
      "producer": "Producer",
      "issuingcountry": "Issuing Country",
      "price": "Price",
      "year": "Year",
      "unitofmeasure": "Unit of Measure",     
      "fineweight": "Fine Weight",
      "apiDocsDescription": "Here you can find the API documentation for our services.",
      "endpoints": "Endpoints",
      "getPortfolio": "GET /portfolio - Retrieve your portfolio data",
      "getProductRequest": "GET /product-request - Retrieve product request data",
      "getReferenceData": "GET /references - Retrieve reference data",
      "getAPIDocs": "GET /api-docs - Retrieve API documentation",
      "orderstatus": "Order Status",
      "user": "User",
      "custodyservice": "Custody service",
      "totalprice": "total price",
      "quantity": "Quantity",
      "metal": "Metal",
      "purchasepriceperunit": "Paid price per unit",
      "purchasedate": "Buying date",
      "buy": "Checkout",
      "total": "Total Purchase",
      "custodyservicedescription": "If you do **not** select a custody service, your purchase will be shipped to the address in your profile.",
    }
  },
  de: {
    translation: {
      "welcome": "Willkommen",
      "yourPortfolio": "Ihr Portfolio",
      "productname": "Produkt",
      "productRequest": "Produkt Orders",
      "references": "Referenzdaten",
      "apiDocs": "API-Dokumentation",
      "products": "Produkte",
      "product": "Produkt",
      "productTypes": "Produkt Typen",
      "producttype": "Produkt Typ",
      "weight": "Gewicht",
      "purchaseDate": "Kaufdatum",
      "seller": "Verkäufer",
      "custody": "Verwahrung",
      "name": "Name",
      "location": "Standort",
      "createdat": "Erstellt am",
      "updatedat": "Aktualisiert am",
      "iso_code": "ISO-Code",
      "referenceDataManagement": "Verwaltung der Referenzdaten",
      "metals": "Metalle",
      "metal": "Metall",
      "custodians": "Verwahrstellen",
      "countries": "Länder (Ausgabe)",
      "producer": "Hersteller",
      "issuingcountry": "Ausgabeland",      
      "price": "Preis",
      "year": "Jahr",
      "unitofmeasure": "Maßeinheit",
      "fineweight": "Feingewicht",
      "apiDocsDescription": "Hier finden Sie die API-Dokumentation für unsere Dienste.",
      "endpoints": "Endpunkte",
      "getPortfolio": "GET /portfolio - Abrufen Ihrer Portfoliodaten",
      "getProductRequest": "GET /product-request - Abrufen von Produktanfragedaten",
      "getReferenceData": "GET /references - Abrufen von Referenzdaten",
      "getAPIDocs": "GET /api-docs - Abrufen der API-Dokumentation",
      "orderstatus": "Bestellstatus",
      "user": "Benutzer",
      "custodyservice": "Verwahrung",
      "totalprice": "Gesamtpreis",
      "quantity": "Menge",
      "purchasepriceperunit": "Kaufpreis pro Einheit",
      "purchasedate": "Kaufdatum",
      "buy": "Checkout",
      "total": "Total",
      "custodyservicedescription": "Wenn Sie *keinen* Verwahrungsdienst auswählen, wird Ihr Kauf an die Adresse in Ihrem Profil gesendet.",
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue",
      "yourPortfolio": "Votre Portefeuille",
      "productname": "Produit",
      "productRequest": "Demande de Produit",
      "references": "Données de Référence",
      "apiDocs": "Docs API",
      "products": "Produits",
      "producttype": "Type de Produit",
      "weight": "Poids",
      "purchaseDate": "Date d'Achat",
      "seller": "Vendeur",
      "custody": "Garde",
      "id": "ID",
      "name": "Nom",
      "location": "Emplacement",
      "createdat": "Créé le",
      "updatedat": "Mis à jour le",
      "iso_code": "Code ISO",
      "referenceDataManagement": "Gestion des Données de Référence",
      "metals": "Métaux",
      "custodians": "Dépositaires",
      "countries": "Pays",
      "productTypes": "Types de Produit",
      "producttype": "Type de Produit",
      "producer": "Fabricant",
      "issuingcountry": "Pays Émetteur",
      "price": "Prix",
      "year": "Année",
      "unitofmeasure": "Unité de Mesure",
      "fineweight": "Poids Fin",
      "apiDocsDescription": "Vous trouverez ici la documentation API pour nos services.",
      "endpoints": "Points de terminaison",
      "getPortfolio": "GET /portfolio - Récupérer les données de votre portefeuille",
      "getProductRequest": "GET /product-request - Récupérer les données de demande de produit",
      "getReferenceData": "GET /references - Récupérer les données de référence",
      "getAPIDocs": "GET /api-docs - Récupérer la documentation API",
      "orderstatus": "Statut de la commande",
      "user": "Utilisateur",
      "custodyservice": "Service de garde",
      "totalprice": "Prix total",
      "quantity": "Quantité",
      "purchasepriceperunit": "Prix d'achat par unité",
      "purchasedate": "Date d'achat",
      "buy": "Acheter",
      "total": "Total",
      "custodyservicedescription": "Si vous ne sélectionnez **pas** de service de garde, votre achat sera envoyé à l'adresse de votre profil.",
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido",
      "yourPortfolio": "Tu Portafolio",
      "productname": "Producto",
      "productRequest": "Solicitud de Producto",
      "references": "Datos de Referencia",
      "apiDocs": "Docs API",
      "products": "Productos",
      "productType": "Tipo de Producto",
      "weight": "Peso",
      "purchaseDate": "Fecha de Compra",
      "seller": "Vendedor",
      "custody": "Custodia",
      "id": "ID",
      "name": "Nombre",
      "location": "Ubicación",
      "createdat": "Creado el",
      "updatedat": "Actualizado el",
      "iso_code": "Código ISO",
      "referenceDataManagement": "Gestión de Datos de Referencia",
      "metals": "Metales",
      "custodians": "Custodios",
      "countries": "Países",
      "productTypes": "Tipos de Producto",
      "producttype": "Tipo de Producto",
      "producer": "Fabricante",
      "issuingcountry": "País Emisor",
      "price": "Precio",
      "year": "Año",
      "unitofmeasure": "Unidad de Medida",
      "fineweight": "Peso Fino",
      "apiDocsDescription": "Aquí puede encontrar la documentación de la API para nuestros servicios.",
      "endpoints": "Puntos finales",
      "getPortfolio": "GET /portfolio - Recuperar los datos de su portafolio",
      "getProductRequest": "GET /product-request - Recuperar datos de solicitud de producto",
      "getReferenceData": "GET /references - Recuperar datos de referencia",
      "getAPIDocs": "GET /api-docs - Recuperar documentación de la API",
      "orderstatus": "Estado del pedido",
      "user": "Usuario",
      "custodyservice": "Servicio de custodia",
      "totalprice": "Precio total",
      "quantity": "Cantidad",
      "purchasepriceperunit": "Precio de compra por unidad",
      "purchasedate": "Fecha de compra",
      "buy": "Comprar",
      "total": "Total",
      "custodyservicedescription": "Si **no** selecciona un servicio de custodia, su compra se enviará a la dirección de su perfil.",
    }
  },
  it: {
    translation: {
      "welcome": "Benvenuto",
      "yourPortfolio": "Il Tuo Portafoglio",
      "productname": "Prodotto",
      "productRequest": "Richiesta di Prodotto",
      "references": "Dati di Riferimento",
      "apiDocs": "Docs API",
      "products": "Prodotto",
      "productType": "Tipo di Prodotto",
      "weight": "Peso",
      "purchaseDate": "Data di Acquisto",
      "seller": "Venditore",
      "custody": "Custodia",
      "id": "ID",
      "name": "Nome",
      "location": "Posizione",
      "createdat": "Creato il",
      "updatedat": "Aggiornato il",
      "iso_code": "Codice ISO",
      "referenceDataManagement": "Gestione dei Dati di Riferimento",
      "metals": "Metalli",
      "custodians": "Custodi",
      "countries": "Paesi",
      "productTypes": "Tipi di Prodotto",
      "producttype": "Tipo di Prodotto",
      "producer": "Produttore",
      "issuingcountry": "Paese Emittente",
      "price": "Prezzo",
      "year": "Anno",
      "unitofmeasure": "Unità di Misura",
      "fineweight": "Peso Lordo",
      "apiDocsDescription": "Qui puoi trovare la documentazione API per i nostri servizi.",
      "endpoints": "Punti finali",
      "getPortfolio": "GET /portfolio - Recupera i dati del tuo portafoglio",
      "getProductRequest": "GET /product-request - Recupera i dati della richiesta di prodotto",
      "getReferenceData": "GET /references - Recupera i dati di riferimento",
      "getAPIDocs": "GET /api-docs - Recupera la documentazione API",
      "orderstatus": "Stato dell ordine",
      "user": "Utente",
      "custodyservice": "Servizio di custodia",
      "totalprice": "Prezzo totale",
      "quantity": "Quantità",
      "purchasepriceperunit": "Prezzo di acquisto per unità",
      "purchasedate": "Data di acquisto",
      "buy": "Acquistare",
      "total": "Total",
      "custodyservicedescription": "Se non selezioni **nessun** servizio di custodia, il tuo acquisto verrà inviato all'indirizzo nel tuo profilo .",
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // Standardsprache
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;