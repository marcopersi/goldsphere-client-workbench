import React from 'react';
import PropTypes from 'prop-types';

const ProductTable = ({ products, quantities, handleQuantityChange, totalSum, t }) => (
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
);

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  quantities: PropTypes.object.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default ProductTable;