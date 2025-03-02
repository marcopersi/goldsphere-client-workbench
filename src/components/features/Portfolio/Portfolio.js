import React, { useState, useEffect } from "react";
import EnhancedTable from "../../common/EnhancedTable";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Portfolio = () => {
  const { t } = useTranslation();

  const [portfolio, setPortfolio] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/portfolios');
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
        setError(t('errorFetchingData'));
      }
    };

    fetchPortfolio();
  }, [t]);

  const handleSelectionChange = () => {
    // Leerer Handler für onSelectionChange
  };

  const portfolioColumns = [
    { header: t("quantity"), accessor: "quantity" },
    { header: t("productname"), accessor: "productname" },
    { header: t("producttype"), accessor: "producttypename" },
    { header: t("fineweight"), accessor: "fineweight" },
    { header: t("unitofmeasure"), accessor: "unitofmeasure" },
    { header: t("issuingcountry"), accessor: "issuingcountry" },
    { header: t("custodyservice"), accessor: "custodyservicename" },
    { header: t("purchasedate"), accessor: "purchasedate" },
    { header: t("purchasepriceperunit"), accessor: "purchasepriceperunit" },    
  ];
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2 style={{ color: "gold" }}>{t('yourPortfolio')}</h2>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <EnhancedTable data={portfolio} columns={portfolioColumns} onSelectionChange={handleSelectionChange} />
      )}
    </div>
  );
}

export default Portfolio;
