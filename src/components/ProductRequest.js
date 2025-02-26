import React, { useState, useEffect } from "react";
import EnhancedTable from "./EnhancedTable";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ProductRequest = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);

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

  const handleSelectionChange = (selectedRows) => {
    setSelectedOrders(selectedRows);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedOrders.map(order => axios.delete(`http://localhost:11215/api/orders/${order.id}`)));
      setOrders(prevOrders => prevOrders.filter(order => !selectedOrders.includes(order)));
      setSelectedOrders([]);
    } catch (error) {
      console.error("Error deleting orders:", error);
    }
  };

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
      <EnhancedTable data={orders} columns={orderColumns} onSelectionChange={handleSelectionChange} selectable={true} />
      <div style={{ display: "flex", justifyContent: "flex-end", width: "80%" }}>
        <button
          style={{
            padding: "10px 20px",
            border: "1px solid silver",
            borderRadius: "5px",
            background: "linear-gradient(to bottom, silver, black)",
            color: "white",
            cursor: selectedOrders.length > 0 ? "pointer" : "not-allowed",
            opacity: selectedOrders.length > 0 ? 1 : 0.5
          }}
          disabled={selectedOrders.length === 0}
          onClick={handleDelete}
          onMouseOver={(e) => {
            e.target.style.background = "linear-gradient(to bottom, gold, black)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "linear-gradient(to bottom, silver, black)";
          }}
        >
          {t('delete')}
        </button>
      </div>
    </div>
  );
};

export default ProductRequest;
