import React, { useState } from "react";
import { format, isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';
import PropTypes from "prop-types";
import './EnhancedTable.css';
import { formatNumber } from '../../utils/formatNumber';

const EnhancedTable = ({ data, columns, onSelectionChange, selectable = false, dateFormat }) => {
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isValid(date) ? format(date, dateFormat || 'dd.MM.yyyy HH:mm:ss') : 'Invalid Date';
  };

  const handleCheckboxChange = (product) => {
    const newSelectedRows = selectedRows.includes(product)
      ? selectedRows.filter(item => item !== product)
      : [...selectedRows, product];

    setSelectedRows(newSelectedRows);
    onSelectionChange(newSelectedRows);
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
    } else if (['purchasepriceperunit', 'price'].includes(column.accessor)) {
      return formatNumber(item[column.accessor]);
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
                  onChange={(e) => {
                    const allSelected = e.target.checked;
                    const newSelectedRows = allSelected ? data : [];
                    setSelectedRows(newSelectedRows);
                    onSelectionChange(newSelectedRows);
                  }}
                  checked={selectedRows.length === data.length}
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
  onSelectionChange: PropTypes.func.isRequired,
  selectable: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dateFormat: PropTypes.string
};

export default EnhancedTable;