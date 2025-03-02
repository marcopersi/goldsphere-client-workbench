import React, { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Flag from 'react-world-flags';
import { format, isValid } from 'date-fns';
import './ProductOrder.css'; // Neue CSS-Datei für Stile

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

  const handleCheckboxChange = useCallback((product) => {
    const newSelectedRows = selectedRows.includes(product)
      ? selectedRows.filter(item => item !== product)
      : [...selectedRows, product];

    setSelectedRows(newSelectedRows);
  }, [selectedRows]);

  const handleHeaderCheckboxChange = useCallback((e) => {
    const allSelected = e.target.checked;
    const newSelectedRows = allSelected ? data : [];
    setSelectedRows(newSelectedRows);
  }, [data]);

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
    <div className="table-container">
      <table className="enhanced-table">
        <thead>
          <tr className="table-header">
            {selectable && (
              <th className="table-cell">
                <input
                  type="checkbox"
                  onChange={handleHeaderCheckboxChange}
                  checked={selectedRows.length > 0 && selectedRows.length === data.length}
                />
              </th>
            )}
            {columns.map((column) => (
              <th key={column.accessor} className="table-cell">
                {t(column.header.charAt(0).toUpperCase() + column.header.slice(1))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {selectable && (
                <td className="table-cell">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.accessor} className="table-cell">
                  {renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

EnhancedTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  selectable: PropTypes.bool,
};

const ProductOrder = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [snackbarQueue, setSnackbarQueue] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleSelectionChange = useCallback((selectedRows) => {
    setSelectedOrders(selectedRows);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await Promise.all(selectedOrders.map(order => axios.delete(`http://localhost:11215/api/orders/${order.id}`)));
      setOrders(prevOrders => prevOrders.filter(order => !selectedOrders.includes(order)));
      setSelectedOrders([]);
    } catch (error) {
      console.error("Error deleting orders:", error);
    }
  }, [selectedOrders]);

  const handleProcessOrder = useCallback(async () => {
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
        const errorMessage = error.response.data.error || t('errorProcessingOrder');
        setSnackbarQueue(prevQueue => [
          ...prevQueue,
          { id: Date.now(), message: `Fehler: ${errorMessage}`, severity: 'error' }
        ]);
      } else {
        console.error("Error processing orders:", error);
      }
    }
  }, [selectedOrders, t]);

  const handleSnackbarClose = useCallback((id) => {
    setSnackbarQueue(prevQueue => prevQueue.filter(snackbar => snackbar.id !== id));
  }, []);

  const orderColumns = useMemo(() => [
    { header: t("user"), accessor: "username" },
    { header: t("productname"), accessor: "productname" },
    { header: t("quantity"), accessor: "quantity" },
    { header: t("totalprice"), accessor: "totalprice" },
    { header: t("orderstatus"), accessor: "orderstatus" },
    { header: t("custodyservice"), accessor: "custodyservicename" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ], [t]);

  return (
    <div className="product-order-container">
      <h2>{t('productRequest')}</h2>
      <EnhancedTable data={orders} columns={orderColumns} onSelectionChange={handleSelectionChange} selectable={true} />
      <div className="button-container">
        <button
          className="action-button"
          disabled={selectedOrders.length === 0}
          onClick={handleProcessOrder}
        >
          {t('processOrder')}
        </button>
        <button
          className="action-button"
          disabled={selectedOrders.length === 0}
          onClick={handleDelete}
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

export default ProductOrder;