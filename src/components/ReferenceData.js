import React, { useState, useEffect } from "react";
import EnhancedTable from "./EnhancedTable";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ReferenceData = () => {
  const { t } = useTranslation();

  const [metals, setMetals] = useState([]);
  const [custodians, setCustodians] = useState([]);
  const [countries, setCountries] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [producers, setproducers] = useState([]);

  console.info("ReferenceData component rendered");

  // Fetch data
  useEffect(() => {
    const fetchMetals = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/metals');
        console.info("requested metals returned:", response.data);
        setMetals(response.data);
      } catch (error) {
        console.error("Error fetching metals data:", error);
      }
    };

    const fetchCustodians = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/custodians');
        console.info("requested custodians returned:", response.data);
        setCustodians(response.data);
      } catch (error) {
        console.error("Error fetching custodians data:", error);
      }
    };

    const fetchIssuingCountries = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/issuingCountries');
        console.info("requested countries returned:", response.data);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    const fetchProductTypes = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/productTypes');
        console.info("requested product types returned:", response.data);
        setProductTypes(response.data);
      } catch (error) {
        console.error("Error fetching product types data:", error);
      } 
    };

    const fetchproducers = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/producers');
        console.info("requested producers returned:", response.data);
        setproducers(response.data);
      } catch (error) {
        console.error("Error fetching producers data:", error);
      }
    };  

      console.info("useEffect triggered");
      fetchMetals();
      fetchCustodians();
      fetchIssuingCountries();
      fetchProductTypes();
      fetchproducers();
    }, []);

  const metalColumns = [
    { header: t("name"), accessor: "metalname" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ];

  const custodianColumns = [
    { header: t("name"), accessor: "custodianname" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ];

  const countryColumns = [
    { header: t("name"), accessor: "issuingcountryname" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ];

  const productTypeColumns = [
    { header: t("name"), accessor: "producttypename" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ];

  const producerColumns = [
    { header: t("name"), accessor: "producername" },
    { header: t("createdat"), accessor: "createdat" },
    { header: t("updatedat"), accessor: "updatedat" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <h2>{t('referenceDataManagement')}</h2>

      <h2>{t('metals')}</h2>
      <EnhancedTable data={metals} columns={metalColumns} />

      <h2>{t('custodians')}</h2>
      <EnhancedTable data={custodians} columns={custodianColumns} />

      <h2>{t('countries')}</h2>
      <EnhancedTable data={countries} columns={countryColumns} />

      <h2>{t('productTypes')}</h2>
      <EnhancedTable data={productTypes} columns={productTypeColumns} />

      <h2>{t('manufactorer')}</h2>
      <EnhancedTable data={producers} columns={producerColumns} />
    </div>
  );
};

export default ReferenceData;