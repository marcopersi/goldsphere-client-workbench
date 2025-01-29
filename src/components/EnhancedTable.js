import React from "react";
import { format, isValid } from 'date-fns';
import { useTranslation } from 'react-i18next';

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

  // Wenn keine Spalten definiert sind, automatisch Spalten basierend auf den Daten generieren
  const autoColumns = data.length > 0 ? Object.keys(data[0]).map(key => ({ header: key, accessor: key })) : [];

  const tableColumns = columns || autoColumns;

  return (
    <table style={{ borderCollapse: "collapse", width: "80%", textAlign: "center" }}>
      <thead>
        <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
          {tableColumns.map((column) => (
            <th key={column.accessor} style={{ border: "1px solid silver" }}>
              {t(column.header.charAt(0).toUpperCase() + column.header.slice(1))}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {tableColumns.map((column) => (
              <td key={column.accessor} style={{ border: "1px solid silver" }}>
                {column.accessor.includes('created_at') || column.accessor.includes('updated_at')
                  ? formatDate(item[column.accessor])
                  : item[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EnhancedTable;