import React, { useState, useEffect } from "react";
import EnhancedTable from "../../common/EnhancedTable";
import Checkout from "./Checkout";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import Flag from 'react-world-flags';
import './Products.css'; 

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
    const issuingcountries = [...new Map(products.map(product => [product.isocode2, { isocode2: product.isocode2, name: product.issuingcountry }])).values()].sort((a, b) => a.name.localeCompare(b.name));
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
    console.log(`Filter changed: ${filterName}`, selectedOptions);
  };

  const handleSelectionChange = (selectedRows) => {
    setSelectedProducts(selectedRows);
    console.log("Selected products:", selectedRows);
  };

  const handleBuyClick = () => {
    setShowPopup(true);
    console.log("Buy button clicked");
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    console.log("Popup closed");
  };

  const filteredProducts = products.filter(product => {
    const producerMatch = filters.producers.length === 0 || filters.producers.includes(product.producer);
    const issuingCountryMatch = filters.issuingcountries.length === 0 || filters.issuingcountries.includes(product.isocode2);
    const productTypeMatch = filters.producttypes.length === 0 || filters.producttypes.includes(product.producttype);
    const metalMatch = filters.metals.length === 0 || filters.metals.includes(product.metal);
    return producerMatch && issuingCountryMatch && productTypeMatch && metalMatch;
  });

  const productColumns = [
    { header: t("productname"), accessor: "productname" },
    { header: t("producttype"), accessor: "producttype" },
    { header: t("metal"), accessor: "metal" },
    { header: t("issuingcountry"), accessor: "issuingcountry", className: "table-cell-issuingcountry" },
    { header: t("producer"), accessor: "producer", className: "table-cell-producer" },
    { header: t("fineweight"), accessor: "fineweight" },
    { header: t("unitofmeasure"), accessor: "unitofmeasure" },
    { header: t("price"), accessor: "price" }
  ];

  const MultiSelectDropDown = ({ label, options, selected, onChange }) => {
    const handleSelectChange = (event) => {
      const value = event.target.value;
      onChange(value);
    };

    return (
      <FormControl variant="outlined" fullWidth style={{ width: '150px', marginBottom: '20px' }}>
        <Select
          multiple
          value={selected}
          onChange={handleSelectChange}
          renderValue={(selected) => selected.join(', ')}
          style={{ background: 'linear-gradient(to bottom, silver, black)', color: 'white', border: '1px solid silver' }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: 'silver',
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.isocode2 || option.name} value={option.isocode2 || option.name}>
              <Checkbox checked={selected.indexOf(option.isocode2 || option.name) > -1} style={{ color: 'white' }} />
              {option.isocode2 && <Flag code={option.isocode2} style={{ width: '20px', marginRight: '10px' }} />}
              <ListItemText primary={option.name} style={{ color: 'white' }} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <div className="products-container">
      <h2>{t('products')}</h2>
      <div className="filters">
        <MultiSelectDropDown
          label={t("producer")}
          options={sortedProducers.map((producer) => ({ name: producer }))}
          selected={filters.producers}
          onChange={(value) => handleFilterChange("producers", value)}
        />

        <MultiSelectDropDown
          label={t("issuingcountry")}
          options={sortedIssuingCountries}
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
      <div className="table-container">
        <EnhancedTable data={filteredProducts} columns={productColumns} onSelectionChange={handleSelectionChange} selectable={true}/>
      </div>
      <div className="button-container">    
        <button
          className="action-button"
          disabled={selectedProducts.length === 0}
          onClick={handleBuyClick}
        >
          {t("buy")}
        </button>
      </div>
      {showPopup && (
        <Checkout
          selectedProducts={selectedProducts}
          custodians={custodians}
          onClose={handlePopupClose}
          onConfirm={handlePopupClose} 
        />
      )}
    </div>
  );
};

export default Products;