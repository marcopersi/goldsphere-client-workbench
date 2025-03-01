import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PropTypes from "prop-types";

const Checkout = ({ selectedProducts, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(10);
  const [selectedCustodian, setSelectedCustodian] = useState('home_delivery');
  const [custodians, setCustodians] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState(selectedProducts);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          // Reset the countdown and load new prices
          setCountdown(10);
          loadNewPrices();
          return 10;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchCustodianservices = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/custodyServices');
        setCustodians([{ id: 'home_delivery', custodyservicename: 'none, home delivery', fee: '20.00', paymentfrequency: 'one time' }, ...response.data]);
      } catch (error) {
        console.error("Error fetching custodians data:", error);
      }
    };

    fetchCustodianservices();
  }, []);

  useEffect(() => {
    const initialQuantities = selectedProducts.reduce((acc, product) => {
      acc[product.id] = 1; 
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [selectedProducts]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  };

  const handleCustodyServiceChange = (custodianId, custodyServiceId) => {
    setCustodians(prevCustodians =>
      prevCustodians.map(custodian =>
        custodian.id === custodianId ? { ...custodian, custodyServiceId } : custodian
      )
    );
  };

  const totalSum = products.reduce((sum, product) => {
    const quantity = quantities[product.id] || 1;
    return sum + (quantity * parseFloat(product.price));
  }, 0);

  const updateProducts = (updatedProducts) => {
    console.log('Updated products:', updatedProducts);
    if (!Array.isArray(updatedProducts)) {
      console.error("Expected updatedProducts to be an array");
      return;
    }

    setProducts(prevProducts =>
      prevProducts.map(product => {
        const updatedProduct = updatedProducts.find(p => p.id === product.id);
        return updatedProduct ? { ...product, price: updatedProduct.price } : product;
      })
    );
  };

  const loadNewPrices = async () => {
    try {
      const productIds = selectedProducts.map(product => product.id);
      const response = await axios.post('http://localhost:11215/api/products/prices', { productIds });
      const updatedProducts = response.data;
      updateProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching new prices:", error);
    }
    console.log('Loading new prices...');
  };

  const handleConfirm = async () => {
    const userId = '500472ff-24f0-4141-a756-f456cd3213d2'; // Hardcoded user ID
    const orders = products.map(product => ({
      userId,
      productId: product.id,
      quantity: quantities[product.id],
      totalPrice: quantities[product.id] * parseFloat(product.price),
      custodyServiceId: selectedCustodian === 'home_delivery' ? null : selectedCustodian
    }));

    try {
      console.log('creating orders:', orders);
      console.log('Request Body:', JSON.stringify(orders, null, 2));
      const response = await axios.post('http://localhost:11215/api/orders', orders, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.debug('Orders created:', response.data);
      onConfirm(selectedCustodian);
    } catch (error) {
      console.error('Error creating orders:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        backgroundColor: '#333', 
        padding: '20px',
        borderRadius: '10px',
        width: '80%',
        maxWidth: '800px',
        color: 'white' 
      }}>
        <h2>{t('checkout')}</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '24px', color: 'red' }}>
          <p>{t('countdown')}: {countdown}</p>
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
          <thead>
            <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('quantity')}</th>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('productname')}</th>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('price')}</th>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('total')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td style={{ border: "1px solid silver", padding: "10px" }}>
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                    style={{
                      fontSize: '16px', 
                      width: '60px', 
                      fontWeight: 'bold', 
                      textAlign: 'center', 
                      appearance: 'textfield' 
                    }}
                  />
                </td>
                <td style={{ border: "1px solid silver", padding: "10px" }}>{product.productname}</td>
                <td style={{ border: "1px solid silver", padding: "10px" }}>{product.price}</td>
                <td style={{ border: "1px solid silver", padding: "10px" }}>{(quantities[product.id] || 1) * parseFloat(product.price)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" style={{ border: "1px solid silver", textAlign: "right", color: "white", padding: "10px" }}>{t('total')}</td>
              <td style={{ border: "1px solid silver", padding: "10px" }}>{totalSum.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <h3>{t('custodyservice')}</h3>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
          <thead>
            <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('select')}</th>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('custodyservicename')}</th>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('fee')}</th>
              <th style={{ border: "1px solid silver", padding: "10px" }}>{t('paymentfrequency')}</th>
            </tr>
          </thead>
          <tbody>
            {custodians.map(custodian => (
              <tr key={custodian.id}>
                <td style={{ border: "1px solid silver", padding: "10px" }}>
                  <input
                    type="radio"
                    name="custodian"
                    value={custodian.id}
                    checked={selectedCustodian === custodian.id}
                    onChange={() => setSelectedCustodian(custodian.id)}
                  />
                </td>
                <td style={{ border: "1px solid silver", padding: "10px" }}>
                  {custodian.id === 'home_delivery' ? (
                    custodian.custodyservicename
                  ) : (
                    <select
                      value={custodian.custodyServiceId || ''}
                      onChange={(e) => handleCustodyServiceChange(custodian.id, e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="" disabled>{t('select')}</option>
                      {custodians
                        .filter(c => c.id !== 'home_delivery')
                        .map(c => (
                          <option key={c.id} value={c.id}>
                            {c.custodyservicename}
                          </option>
                        ))}
                    </select>
                  )}
                </td>
                <td style={{ border: "1px solid silver", padding: "10px" }}>{custodian.fee}</td>
                <td style={{ border: "1px solid silver", padding: "10px" }}>{custodian.paymentfrequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button
            style={{
              padding: "10px 20px",
              border: "1px solid silver",
              borderRadius: "5px",
              background: "linear-gradient(to bottom, silver, black)",
              color: "white",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "linear-gradient(to bottom, gold, black)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "linear-gradient(to bottom, silver, black)";
            }}
            onClick={onClose}
          >
            {t('cancel')}
          </button>
          <button
            style={{
              padding: "10px 20px",
              border: "1px solid silver",
              borderRadius: "5px",
              background: "linear-gradient(to bottom, silver, black)",
              color: "white",
              cursor: "pointer"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "linear-gradient(to bottom, gold, black)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "linear-gradient(to bottom, silver, black)";
            }}
            onClick={handleConfirm}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  selectedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Checkout;