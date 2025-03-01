import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ProductTable from './ProductTable';
import CustodyServiceTable from './CustodyServiceTable';
import { fetchCustodyServices, fetchProductPrices, createOrders } from './api';

const HOME_DELIVERY = {
  id: 'home_delivery',
  custodyservicename: 'none, home delivery',
  fee: '20.00',
  paymentfrequency: 'one time'
};

const Checkout = ({ selectedProducts, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(10);
  const [selectedCustodian, setSelectedCustodian] = useState(HOME_DELIVERY.id);
  const [custodians, setCustodians] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState(selectedProducts);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
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
        const data = await fetchCustodyServices();
        setCustodians([HOME_DELIVERY, ...data]);
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
      const updatedProducts = await fetchProductPrices(productIds);
      updateProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching new prices:", error);
    }
  };

  const handleConfirm = async () => {
    const userId = '500472ff-24f0-4141-a756-f456cd3213d2'; // Hardcoded user ID
    const orders = products.map(product => ({
      userId,
      productId: product.id,
      quantity: quantities[product.id],
      totalPrice: quantities[product.id] * parseFloat(product.price),
      custodyServiceId: selectedCustodian === HOME_DELIVERY.id ? null : selectedCustodian
    }));

    try {
      await createOrders(orders);
      onConfirm(selectedCustodian);
    } catch (error) {
      console.error('Error creating orders:', error);
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
        <ProductTable
          products={products}
          quantities={quantities}
          handleQuantityChange={handleQuantityChange}
          totalSum={totalSum}
          t={t}
        />
        <h3>{t('custodyservice')}</h3>
        <CustodyServiceTable
          custodians={custodians}
          selectedCustodian={selectedCustodian}
          setSelectedCustodian={setSelectedCustodian}
          handleCustodyServiceChange={handleCustodyServiceChange}
          t={t}
        />
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