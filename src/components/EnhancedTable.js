import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

const EnhancedTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "product",
        header: "Product",
        cell: (info) => (
          <div className="product-cell">
            {info.getValue()}
          </div>
        ),
      },
      {
        accessorKey: "productType",
        header: "Product Type",
        cell: (info) => (
          <div className="product-cell">
            {info.getValue()}
          </div>
        ),
      },
      { accessorKey: "weight", header: "Weight" },
      { accessorKey: "purchaseDate", header: "Purchase Date" },
      { accessorKey: "seller", header: "Seller" },
      { accessorKey: "custody", header: "Custody" },
      { accessorKey: "price", header: "Value" },
    ],
    []
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
