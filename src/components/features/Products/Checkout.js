import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import ProductTable from './ProductTable';
import CustodyServiceTable from './CustodyServiceTable';
import { fetchProductPrices, createOrders } from '../../api/api';
import useCountdown from '../../../hooks/useCountdown';
import useCustodyServices from '../../../hooks/useCustodyServices';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardHeader, FormGroup, Label, Input, Button, Collapse } from 'reactstrap';
import '../../../styles/Checkout.css';

const HOME_DELIVERY = {
  id: 'home_delivery',
  custodyservicename: 'none, home delivery',
  fee: '20.00',
  paymentfrequency: 'one time'
};

const Checkout = ({ selectedProducts, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [selectedCustodian, setSelectedCustodian] = useState(HOME_DELIVERY.id);
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState(selectedProducts);
  const [error, setError] = useState(null);
  const [isProductTableOpen, setIsProductTableOpen] = useState(true);
  const [isCustodyServiceOpen, setIsCustodyServiceOpen] = useState(true);

  const countdown = useCountdown(10, () => loadNewPrices());
  const [custodians, setCustodians] = useCustodyServices(HOME_DELIVERY);

  useEffect(() => {
    const initialQuantities = selectedProducts.reduce((acc, product) => {
      acc[product.id] = 1; 
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [selectedProducts]);

  const handleQuantityChange = useCallback((productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity
    }));
  }, []);

  const handleCustodyServiceChange = useCallback((custodianId, custodyServiceId) => {
    setCustodians(prevCustodians =>
      prevCustodians.map(custodian =>
        custodian.id === custodianId ? { ...custodian, custodyServiceId } : custodian
      )
    );
  }, [setCustodians]);

  const calculateTotalSum = useCallback((products, quantities) => {
    return products.reduce((sum, product) => {
      const quantity = quantities[product.id] || 1;
      return sum + (quantity * parseFloat(product.price));
    }, 0);
  }, []);

  const totalSum = useMemo(() => calculateTotalSum(products, quantities), [products, quantities, calculateTotalSum]);

  const updateProducts = useCallback((updatedProducts) => {
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
  }, []);

  const loadNewPrices = useCallback(async () => {
    try {
      const productIds = selectedProducts.map(product => product.id);
      const updatedProducts = await fetchProductPrices(productIds);
      updateProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching new prices:", error);
      setError(t('errorFetchingPrices'));
    }
  }, [selectedProducts, updateProducts, t]);

  const handleConfirm = useCallback(async () => {
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
      setError(t('errorCreatingOrders'));
    }
  }, [products, quantities, selectedCustodian, onConfirm, t]);

  // provanance fee is 1% of the total sum
  const provenanceFee = (totalSum * 0.01).toFixed(2);

  return (
    <div className="checkout-overlay">
      <div className="checkout-container">
          <h3>{t('checkout')}</h3>
          <div className="checkout-countdown">
            <p>{t('countdown')}: {countdown}</p>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="mb-3">
            <Card>
              <CardHeader 
                onClick={() => setIsProductTableOpen(!isProductTableOpen)}
                style={{ cursor: 'pointer', background: 'linear-gradient(to bottom, silver, black)', color: 'white' }}
              >
              {t('products')}
              </CardHeader>
              <Collapse isOpen={isProductTableOpen}>
                  <CardBody>
                    <ProductTable
                      products={products}
                      quantities={quantities}
                      handleQuantityChange={handleQuantityChange}
                      totalSum={totalSum}
                      t={t}
                    />
                  </CardBody>
              </Collapse>
            </Card>
          </div>
        <Card className="mb-3 py-2">
          <CardHeader
            onClick={() => setIsCustodyServiceOpen(!isCustodyServiceOpen)}
            style={{ cursor: 'pointer', background: 'linear-gradient(to bottom, silver, black)', color: 'white' }}
          >
            {t('custodyservice')}
          </CardHeader>
          <Collapse isOpen={isCustodyServiceOpen}>
            <CardBody>
              <CustodyServiceTable
                custodians={custodians}
                selectedCustodian={selectedCustodian}
                setSelectedCustodian={setSelectedCustodian}
                handleCustodyServiceChange={handleCustodyServiceChange}
                t={t}
              />
            </CardBody>
          </Collapse>
        </Card>
        <Card className="mb-3 py-2">
          <CardHeader style={{ background: 'linear-gradient(to bottom, silver, black)', color: 'white' }}>
            {t('trustedsourcing')}
          </CardHeader>
          <CardBody>
            <table className="trusted-sourcing-table">
              <tbody>
                <tr>
                  <td>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />{' '}
                        {t('goldprovenancestatement')}
                      </Label>
                    </FormGroup>
                  </td>
                  <td>{provenanceFee} CHF</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
        <div className="checkout-buttons">
          <Button class="action-button" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button class="action-button" onClick={handleConfirm}>
            {t('confirm')}
          </Button>
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