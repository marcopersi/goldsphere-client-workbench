import React, { useState, useEffect } from "react";
import EnhancedTable from "./EnhancedTable";
import MultiSelectDropDown from "./MultiSelectDropDown";
import Checkout from "./Checkout";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Products = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    producers: [],
    issuingcountries: [],
    producttypes: [],
    metals: []
  });

  const [sortedProducers, setSortedProducers] = useState([]);
  const [sortedIssuingCountries, setSortedIssuingCountries] = useState([]);
  const [sortedProductTypes, setSortedProductTypes] = useState([]);
  const [sortedMetals, setSortedMetals] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [custodians, setCustodians] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/products');
        console.info("requested products returned:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCustodians = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/custodians');
        setCustodians(response.data);
      } catch (error) {
        console.error("Error fetching custodians data:", error);
      }
    };

    fetchCustodians();
  }, []);

  useEffect(() => {
    const producers = [...new Set(products.map(product => product.producer))].sort();
    const issuingcountries = [...new Set(products.map(product => product.issuingcountry))].sort();
    const producttypes = [...new Set(products.map(product => product.producttype))].sort();
    const metals = [...new Set(products.map(product => product.metal))].sort();
    setSortedProducers(producers);
    setSortedIssuingCountries(issuingcountries);
    setSortedProductTypes(producttypes);
    setSortedMetals(metals);
  }, [products]);

  const handleFilterChange = (filterName, selectedOptions) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: selectedOptions
    }));
  };

  const handleSelectionChange = (selectedRows) => {
    setSelectedProducts(selectedRows);
  };

  const handleBuyClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleConfirm = (custodianId) => {
    // Senden Sie die Anfrage an den Server
    axios.post('http://localhost:11215/api/buy', {
      products: selectedProducts,
      custodianId
    }).then(response => {
      console.log('Purchase confirmed:', response.data);
      setShowPopup(false);
    }).catch(error => {
      console.error('Error confirming purchase:', error);
    });
  };

  const filteredProducts = products.filter(product => {
    const producerMatch = filters.producers.length === 0 || filters.producers.includes(product.producer);
    const issuingCountryMatch = filters.issuingcountries.length === 0 || filters.issuingcountries.includes(product.issuingcountry);
    const productTypeMatch = filters.producttypes.length === 0 || filters.producttypes.includes(product.producttype);
    const metalMatch = filters.metals.length === 0 || filters.metals.includes(product.metal);
    return producerMatch && issuingCountryMatch && productTypeMatch && metalMatch;
  });

  const productColumns = [
    { header: t("productname"), accessor: "productname" },
    { header: t("producttype"), accessor: "producttype" },
    { header: t("metal"), accessor: "metal" },
    { header: t("issuingcountry"), accessor: "issuingcountry" },
    { header: t("producer"), accessor: "producer" },
    { header: t("fineweight"), accessor: "fineweight" },
    { header: t("unitofmeasure"), accessor: "unitofmeasure" },
    { header: t("price"), accessor: "price" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2>{t('products')}</h2>
      <div className="filters" style={{ display: "flex", justifyContent: "center", marginBottom: "20px", gap: "20px" }}>
        <MultiSelectDropDown
          label={t("producer")}
          options={sortedProducers.map((producer) => ({ name: producer }))}
          selected={filters.producers}
          onChange={(value) => handleFilterChange("producers", value)}
        />

        <MultiSelectDropDown
          label={t("issuingcountry")}
          options={sortedIssuingCountries.map((country) => ({ name: country }))}
          selected={filters.issuingcountries}
          onChange={(value) => handleFilterChange("issuingcountries", value)}
        />

        <MultiSelectDropDown
          label={t("producttype")}
          options={sortedProductTypes.map((type) => ({ name: type }))}
          selected={filters.producttypes}
          onChange={(value) => handleFilterChange("producttypes", value)}
        />

        <MultiSelectDropDown
          label={t("metal")}
          options={sortedMetals.map((metal) => ({ name: metal }))}
          selected={filters.metals}
          onChange={(value) => handleFilterChange("metals", value)}
        />
      </div>
      <EnhancedTable data={filteredProducts} columns={productColumns} onSelectionChange={handleSelectionChange} selectable={true}/>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "80%" }}>    
        <button
          style={{
            padding: "10px 20px",
            border: "1px solid silver",
            borderRadius: "5px",
            background: "linear-gradient(to bottom, gold, silver)",
            color: "white",
            cursor: selectedProducts.length > 0 ? "pointer" : "not-allowed",
            opacity: selectedProducts.length > 0 ? 1 : 0.5
          }}
          disabled={selectedProducts.length === 0}
          onClick={handleBuyClick}
          onMouseOver={(e) => {
            e.target.style.background = "linear-gradient(to bottom, silver, black)";
          }}

          onMouseOut={(e) => {
            e.target.style.background = "linear-gradient(to bottom, gold, black)";
          }}
          >
          {
            t("buy")
          }
        </button>
      </div>
      {showPopup && (
        <Checkout
          selectedProducts={selectedProducts}
          custodians={custodians}
          onClose={handlePopupClose}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
};

export default Products;
