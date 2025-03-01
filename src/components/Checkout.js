import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ProductTable from './ProductTable';
import CustodyServiceTable from './CustodyServiceTable';
import { fetchCustodyServices, fetchProductPrices, createOrders } from './api';
import './Checkout.css';

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
    <div className="checkout-overlay">
      <div className="checkout-container">
        <h2>{t('checkout')}</h2>
        <div className="checkout-countdown">
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
        <div className="checkout-buttons">
          <button
            className="checkout-button"
            onClick={onClose}
          >
            {t('cancel')}
          </button>
          <button
            className="checkout-button"
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