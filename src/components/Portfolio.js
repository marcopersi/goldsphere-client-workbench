import React from "react";
import EnhancedTable from "./EnhancedTable";
import sampleData from "../assets/sampleData";
import { useTranslation } from 'react-i18next';

const Portfolio = () => {
  const { t } = useTranslation();

  const portfolioColumns = [
    { header: t("product"), accessor: "product" },
    { header: t("productType"), accessor: "productType" },
    { header: t("manufacturer"), accessor: "manufacturer" },
    { header: t("issuingCountry"), accessor: "issuingCountry" },
    { header: t("metal"), accessor: "metal" },
    { header: t("weight"), accessor: "weight" },
    { header: t("year"), accessor: "year" },
    { header: t("price"), accessor: "price" },
    { header: t("seller"), accessor: "seller" },
    { header: t("purchaseDate"), accessor: "purchaseDate" },
    { header: t("custody"), accessor: "custody" }
  ];

  return (
    <div>
      <h2 style={{ color: "gold" }}>{t('yourPortfolio')}</h2>
      <EnhancedTable data={sampleData} columns={portfolioColumns} />
    </div>
  );
};

export default Portfolio;
