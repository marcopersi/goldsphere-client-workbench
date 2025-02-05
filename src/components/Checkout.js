import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Checkout = ({ selectedProducts, onClose, onConfirm }) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState(10);
  const [selectedCustodian, setSelectedCustodian] = useState(null);
  const [custodians, setCustodians] = useState([]);

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
        console.info("requested custodians returned:", response.data);
        setCustodians(response.data);
      } catch (error) {
        console.error("Error fetching custodians data:", error);
      }
    };

    fetchCustodianservices();
  }, []);

  const loadNewPrices = () => {
    // Placeholder function to load new prices
    console.log('Loading new prices...');
    // Implement the logic to load new prices here
  };

  const totalSum = selectedProducts.reduce((sum, product) => sum + parseFloat(product.price), 0);

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
        <h2>{t('buy')}</h2>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '24px', color: 'red' }}>
          <p>{t('countdown')}: {countdown}</p>
        </div>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
          <thead>
            <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
              <th style={{ border: "1px solid silver" }}>{t('productname')}</th>
              <th style={{ border: "1px solid silver" }}>{t('price')}</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map(product => (
              <tr key={product.id}>
                <td style={{ border: "1px solid silver" }}>{product.productname}</td>
                <td style={{ border: "1px solid silver" }}>{product.price}</td>
              </tr>
            ))}
            <tr>
              <td style={{ border: "1px solid silver", fontWeight: "bold" }}>{t('total')}</td>
              <td style={{ border: "1px solid silver" }}>{totalSum.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <h3>{t('custodyservice')}</h3>
        <p>{t('custodyservicedescription')}</p>
        <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
          <thead>
            <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
              <th style={{ border: "1px solid silver" }}>{t('select')}</th>
              <th style={{ border: "1px solid silver" }}>{t('custodyservicename')}</th>
              <th style={{ border: "1px solid silver" }}>{t('fee')}</th>
              <th style={{ border: "1px solid silver" }}>{t('paymentfrequency')}</th>
            </tr>
          </thead>
          <tbody>
            {custodians.map(custodian => (
              <tr key={custodian.id}>
                <td style={{ border: "1px solid silver" }}>
                  <input
                    type="radio"
                    name="custodian"
                    value={custodian.id}
                    onChange={() => setSelectedCustodian(custodian.id)}
                  />
                </td>
                <td style={{ border: "1px solid silver" }}>{custodian.custodyservicename}</td>
                <td style={{ border: "1px solid silver" }}>{custodian.fee}</td>
                <td style={{ border: "1px solid silver" }}>{custodian.paymentfrequency}</td>
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
            onClick={() => onConfirm(selectedCustodian)}
          >
            {t('confirm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;