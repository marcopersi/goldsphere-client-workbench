import React, { useState, useEffect } from "react";
import MultiSelectDropdown from "../components/MultiSelectDropDown";
import EnhancedTable from "./EnhancedTable";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ProductRequest = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/orders');
        console.info("requested orders returned:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };
    fetchOrders();
  }, []);


  const orderColumns = [
    { header: t("user"), accessor: "username" },
    { header: t("productname"), accessor: "productname" },
    { header: t("quantity"), accessor: "quantity" },
    { header: t("totalprice"), accessor: "totalprice" },
    { header: t("orderstatus"), accessor: "orderstatus" },
    { header: t("custodyservice"), accessor: "custodyservicename" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2>{t('productRequest')}</h2>
      <EnhancedTable data={orders} columns={orderColumns} />
    </div>
  );
};

export default ProductRequest;
