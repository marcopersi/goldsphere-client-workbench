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
  const [manufacturers, setManufacturers] = useState([]);

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
        const response = await axios.get('http://localhost:11215/api/references/issuing-countries');
        console.info("requested countries returned:", response.data);
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    const fetchProductTypes = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/product-types');
        console.info("requested product types returned:", response.data);
        setProductTypes(response.data);
      } catch (error) {
        console.error("Error fetching product types data:", error);
      } 
    };

    const fetchManufacturers = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/manufacturers');
        console.info("requested manufacturers returned:", response.data);
        setManufacturers(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers data:", error);
      }
    };  

      console.info("useEffect triggered");
      fetchMetals();
      fetchCustodians();
      fetchIssuingCountries();
      fetchProductTypes();
      fetchManufacturers();
    }, []);

  const metalColumns = [
    { header: t("name"), accessor: "name" },
    { header: t("created_at"), accessor: "created_at" },
    { header: t("updated_at"), accessor: "updated_at" }
  ];

  const custodianColumns = [
    { header: t("name"), accessor: "name" },
    { header: t("location"), accessor: "location" },
    { header: t("created_at"), accessor: "created_at" },
    { header: t("updated_at"), accessor: "updated_at" }
  ];

  const countryColumns = [
    { header: t("name"), accessor: "name" },
    { header: t("iso_code"), accessor: "iso_code" },
    { header: t("created_at"), accessor: "created_at" },
    { header: t("updated_at"), accessor: "updated_at" }
  ];

  const productTypeColumns = [
    { header: t("name"), accessor: "name" },
    { header: t("created_at"), accessor: "created_at" },
    { header: t("updated_at"), accessor: "updated_at" }
  ];

  const manufacturerColumns = [
    { header: t("name"), accessor: "name" },
    { header: t("created_at"), accessor: "created_at" },
    { header: t("updated_at"), accessor: "updated_at" }
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

      <h2>{t('manufactorers')}</h2>
      <EnhancedTable data={manufacturers} columns={manufacturerColumns} />
    </div>
  );
};

export default ReferenceData;