import React, { useState } from "react";
import manufacturers from "../assets/manufacturers";
import issuingCountries from "../assets/issuingCountries";
import sampleData from "../assets/sampleData";
import MultiSelectDropdown from "../components/MultiSelectDropDown";

const ProductRequest = () => {
  const [filters, setFilters] = useState({
    productType: "Coin",
    manufacturers: [],
    issuingCountries: [],
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const sortedManufacturers = [...manufacturers].sort();
  const sortedIssuingCountries = [...issuingCountries].sort((a, b) => a.name.localeCompare(b.name));

  const handleFilterChange = (type, value) => {
    const currentSelection = [...filters[type]];
    if (currentSelection.includes(value)) {
      const updatedSelection = currentSelection.filter((item) => item !== value);
      setFilters({ ...filters, [type]: updatedSelection });
    } else {
      setFilters({ ...filters, [type]: [...currentSelection, value] });
    }
  };

  const handleCheckboxChange = (index) => {
    const newSelectedProducts = [...selectedProducts];
    if (newSelectedProducts.includes(index)) {
      newSelectedProducts.splice(newSelectedProducts.indexOf(index), 1);
    } else {
      newSelectedProducts.push(index);
    }
    setSelectedProducts(newSelectedProducts);

    const newTotal = newSelectedProducts.reduce(
      (sum, idx) => sum + parseFloat(sampleData[idx].price.replace(" CHF", "")),
      0
    );
    setTotalAmount(newTotal);
  };

  const filteredData = sampleData.filter((item) => {
    const matchesManufacturer =
      filters.manufacturers.length > 0
        ? filters.manufacturers.includes(item.manufacturer)
        : true;
    const matchesIssuingCountry =
      filters.issuingCountries.length > 0
        ? filters.issuingCountries.includes(item.issuingCountry)
        : true;
    return matchesManufacturer && matchesIssuingCountry;
  });

  const renderSelectedFilters = (filters, type, onRemove) => {
    return filters.map((filter, index) => (
      <span
        key={`${type}-${index}`}
        style={{
          display: "inline-block",
          padding: "2px 5px",
          margin: "2px",
          border: "1px solid silver",
          borderRadius: "15px",
          background: "linear-gradient(to bottom, silver, black)",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {filter}
        <button
          onClick={() => onRemove(type, filter)}
          style={{
            marginLeft: "5px",
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          x
        </button>
      </span>
    ));
  };

  const handleRemoveFilter = (type, value) => {
    const updatedSelection = filters[type].filter((item) => item !== value);
    setFilters({ ...filters, [type]: updatedSelection });
  };

  return (
    <div className="product-request">
      <h2>Request Products</h2>
      <div className="filters" style={{ display: "flex", justifyContent: "center", marginBottom: "20px", gap: "20px" }}>
        <MultiSelectDropdown
          label="Hersteller"
          options={sortedManufacturers.map((manufacturer) => ({ name: manufacturer }))}
          selected={filters.manufacturers}
          onChange={(value) => handleFilterChange("manufacturers", value)}
        />

        <MultiSelectDropdown
          label="Länder"
          options={sortedIssuingCountries}
          selected={filters.issuingCountries}
          onChange={(value) => handleFilterChange("issuingCountries", value)}
        />
      </div>

      <div className="selected-filters" style={{ textAlign: "center", marginBottom: "20px" }}>
        {renderSelectedFilters(filters.manufacturers, "manufacturers", handleRemoveFilter)}
        {renderSelectedFilters(filters.issuingCountries, "issuingCountries", handleRemoveFilter)}
      </div>

      <table className="enhanced-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Product Type</th>
            <th>Manufacturer</th>
            <th>Issuing Country</th>
            <th>Metal</th>
            <th>Weight</th>
            <th>Year</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.productType}</td>
              <td>{item.manufacturer}</td>
              <td>
                {
                  issuingCountries.find((country) => country.name === item.issuingCountry)?.flag
                } {item.issuingCountry}
              </td>
              <td>{item.metal}</td>
              <td>{item.weight}</td>
              <td>{item.year}</td>
              <td>{item.price}</td>
              <td>{item.seller}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="9" style={{ fontWeight: "bold", fontSize: "16px", textAlign: "right" }}>Total</td>
            <td style={{ fontWeight: "bold", fontSize: "16px" }}>{totalAmount.toFixed(2)} CHF</td>
          </tr>
        </tfoot>
      </table>
      <div className="order-button-container" style={{ textAlign: "right", marginTop: "20px" }}>
        <button
          className="order-button"
          style={{
            padding: "10px 20px",
            border: "1px solid silver",
            borderRadius: "5px",
            background: "linear-gradient(to bottom, silver, black)",
            color: "white",
            cursor: "pointer",
          }}
          disabled={selectedProducts.length === 0}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default ProductRequest;
