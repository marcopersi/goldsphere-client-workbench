import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import '../../../styles/ProductTable.css';

const ProductTable = ({ products, quantities, handleQuantityChange, totalSum, t }) => {
  const handleInputChange = useCallback((productId, value) => {
    handleQuantityChange(productId, parseInt(value, 10));
  }, [handleQuantityChange]);

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>{t('quantity')}</th>
          <th>{t('productname')}</th>
          <th>{t('price')}</th>
          <th>{t('total')}</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>
              <input
                type="number"
                min="1"
                value={quantities[product.id] || 1}
                onChange={(e) => handleInputChange(product.id, e.target.value)}
              />
            </td>
            <td>{product.productname}</td>
            <td>{product.price}</td>
            <td>{(quantities[product.id] || 1) * parseFloat(product.price)}</td>
          </tr>
        ))}
        <tr>
          <td colSpan="3" style={{ textAlign: "right", color: "white" }}>{t('total')}</td>
          <td>{totalSum.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  );
};

ProductTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    productname: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })).isRequired,
  quantities: PropTypes.objectOf(PropTypes.number).isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default ProductTable;