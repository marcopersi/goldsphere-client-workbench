import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useTranslation } from 'react-i18next';

const EnhancedTable = ({ data }) => {
  const { t } = useTranslation();

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "product",
        header: t('product'),
        cell: (info) => (
          <div className="product-cell">
            {info.getValue()}
          </div>
        ),
      },
      {
        accessorKey: "productType",
        header: t('productType'),
        cell: (info) => (
          <div className="product-cell">
            {info.getValue()}
          </div>
        ),
      },
      { accessorKey: "weight", header: t('weight') },
      { accessorKey: "purchaseDate", header: t('purchaseDate') },
      { accessorKey: "seller", header: t('seller') },
      { accessorKey: "custody", header: t('custody') },
      { accessorKey: "price", header: t('value') },
    ],
    [t]
  );

  // Berechnung des Totals für die `price`-Spalte
  const totalValue = data.reduce((sum, row) => {
    const value = row.price ? parseFloat(row.price.replace(" CHF", "")) : 0;
    return sum + value;
  }, 0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="enhanced-table">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={columns.length - 1} style={{ textAlign: "right", fontWeight: "bold" }}>
            Total
          </td>
          <td style={{ fontWeight: "bold", fontSize: "16px" }}>
            {totalValue.toFixed(2)} CHF
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default EnhancedTable;
