import React from "react";
import { format, isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';
import Flag from 'react-world-flags';

const EnhancedTable = ({ data, columns }) => {
  const { t } = useTranslation();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isValid(date)) {
      return format(date, 'dd.MM.yyyy HH:mm:ss');
    } else {
      return 'Invalid Date';
    }
  };

  const renderCell = (item, column) => {
    if (column.accessor.includes('createdat') || column.accessor.includes('updatedat') || column.accessor.includes('purchasedate')) {
      return formatDate(item[column.accessor]);
    } else if (column.accessor === 'issuingcountry' || column.accessor === 'issuingcountryname') {
      const countryCode = item[column.accessor].toUpperCase().slice(0, 2); // Assuming the country code is the first two letters
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
    <table style={{ borderCollapse: "collapse", width: "80%", textAlign: "center" }}>
      <thead>
        <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
          {columns.map((column) => (
            <th key={column.accessor} style={{ border: "1px solid silver" }}>
              {t(column.header.charAt(0).toUpperCase() + column.header.slice(1))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.accessor} style={{ border: "1px solid silver" }}>
                {renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EnhancedTable;