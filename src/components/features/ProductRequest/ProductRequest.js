import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Flag from 'react-world-flags';
import { format, isValid } from 'date-fns';

const EnhancedTable = ({ data, columns, onSelectionChange, selectable = false }) => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    onSelectionChange(selectedRows);
  }, [selectedRows, onSelectionChange]);

  useEffect(() => {
    // Reset selected rows when data changes
    setSelectedRows([]);
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isValid(date)) {
      return format(date, 'dd.MM.yyyy HH:mm:ss');
    } else {
      return 'Invalid Date';
    }
  };

  const handleCheckboxChange = (product) => {
    const newSelectedRows = selectedRows.includes(product)
      ? selectedRows.filter(item => item !== product)
      : [...selectedRows, product];

    setSelectedRows(newSelectedRows);
  };

  const handleHeaderCheckboxChange = (e) => {
    const allSelected = e.target.checked;
    const newSelectedRows = allSelected ? data : [];
    setSelectedRows(newSelectedRows);
  };

  const renderCell = (item, column) => {
    if (column.accessor.includes('createdat') || column.accessor.includes('updatedat') || column.accessor.includes('purchasedate')) {
      return formatDate(item[column.accessor]);
    } else if (column.accessor === 'issuingcountry') {
      const countryCode = item.isocode2.toUpperCase(); 
      return (
        <>
          <Flag code={countryCode} style={{ width: '20px', height: '15px', marginRight: '5px' }} />
          {item[column.accessor]}
        </>
      );
    } else {
      return item[column.accessor];
    }
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "80%", textAlign: "center" }}>
      <thead>
        <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
          {selectable && (
            <th style={{ border: "1px solid silver", padding: "5px" }}>
              <input
                type="checkbox"
                onChange={handleHeaderCheckboxChange}
                checked={selectedRows.length > 0 && selectedRows.length === data.length}
              />
            </th>
          )}
          {columns.map((column) => (
            <th key={column.accessor} style={{ border: "1px solid silver", padding: "5px" }}>
              {t(column.header.charAt(0).toUpperCase() + column.header.slice(1))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {selectable && (
              <td style={{ border: "1px solid silver", padding: "5px" }}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                />
              </td>
            )}
            {columns.map((column) => (
              <td key={column.accessor} style={{ border: "1px solid silver", padding: "5px" }}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const ProductRequest = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [snackbarQueue, setSnackbarQueue] = useState([]);

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

  const handleProcessOrder = async () => {
    try {
      const responses = await Promise.all(selectedOrders.map(order => axios.put(`http://localhost:11215/api/orders/process/${order.id}`)));
      const updatedOrders = responses.map(response => response.data);

      updatedOrders.forEach(order => {
        setSnackbarQueue(prevQueue => [
          ...prevQueue,
          { id: order.id, message: `Die Order wurde erfolgreich in den Status "${order.orderstatus}" prozessiert.`, severity: 'success' }
        ]);
      });

      // Update the orders state with the updated orders
      setOrders(prevOrders => 
        prevOrders.map(order => {
          const updatedOrder = updatedOrders.find(updatedOrder => updatedOrder.id === order.id);
          return updatedOrder ? { ...order, ...updatedOrder } : order;
        })
      );

      setSelectedOrders([]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setSnackbarQueue(prevQueue => [
          ...prevQueue,
          { id: Date.now(), message: `Fehler: ${error.response.data}`, severity: 'error' }
        ]);
      } else {
        console.error("Error processing orders:", error);
      }
    }
  };

  const handleSnackbarClose = (id) => {
    setSnackbarQueue(prevQueue => prevQueue.filter(snackbar => snackbar.id !== id));
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
      <div style={{ display: "flex", justifyContent: "flex-end", width: "80%", gap: "10px" }}>
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
          onClick={handleProcessOrder}
          onMouseOver={(e) => {
            e.target.style.background = "linear-gradient(to bottom, gold, black)";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "linear-gradient(to bottom, silver, black)";
          }}
        >
          {t('processOrder')}
        </button>
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
      {snackbarQueue.map(({ id, message, severity }) => (
        <Snackbar
          key={id}
          open={true}
          autoHideDuration={5000}
          onClose={() => handleSnackbarClose(id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => handleSnackbarClose(id)} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
};

export default ProductRequest;
