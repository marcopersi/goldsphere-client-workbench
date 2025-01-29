import React, { useState } from "react";
import manufacturers from "../assets/manufacturers";
import issuingCountries from "../assets/issuingCountries";
import sampleData from "../assets/sampleData";
import MultiSelectDropdown from "../components/MultiSelectDropDown";
import EnhancedTable from "./EnhancedTable";
import { useTranslation } from 'react-i18next';

const ProductRequest = () => {
  const { t } = useTranslation(); // Initialisiere den Hook

  const [filters, setFilters] = useState({
    productType: "Coin",
    manufacturers: [],
    issuingCountries: [],
  });

  const productColumns = [
    { header: t("id"), accessor: "id" },
    { header: t("name"), accessor: "name" },
    { header: t("productType"), accessor: "productType" },
    { header: t("manufacturer"), accessor: "manufacturer" },
    { header: t("issuingCountry"), accessor: "issuingCountry" },
    { header: t("price"), accessor: "price" },
    { header: t("created_at"), accessor: "created_at" },
    { header: t("updated_at"), accessor: "updated_at" }
  ];

  return (
    <div>
      <h2>{t('productRequest')}</h2>
      <EnhancedTable data={sampleData} columns={productColumns} />
    </div>
  );
};

export default ProductRequest;
