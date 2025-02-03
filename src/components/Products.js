import React, { useState, useEffect } from "react";
import EnhancedTable from "./EnhancedTable";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Products = () => {
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);

  console.info("Product component rendered");

   // Fetch data
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

    console.info("useEffect triggered");
    fetchProducts();

  }, []);

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
      <h2 style={{ color: "gold" }}>{t('products')}</h2>
      <EnhancedTable data={products} columns={productColumns} />
    </div>
  );
}

export default Products;
