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
  const [orderstatus, setorderstatus] = useState([]);
  const [custodyservices, setcustodyservices] = useState([]);

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

    const fetchorderstatus = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/references/orderstatus');
        console.info("requested orderstatus returned:", response.data);
        setorderstatus(response.data);
      } catch (error) {
        console.error("Error fetching orderstatus data:", error);
      }
    };

    const fetchCustodyServices = async () => {
      try {
        const response = await axios.get('http://localhost:11215/api/custodyServices');
        console.info("requested custody services returned:", response.data);
        setcustodyservices(response.data);
      } catch (error) {
        console.error("Error fetching custody services data:", error);
      }
    };

      console.info("useEffect triggered");
      fetchMetals();
      fetchCustodians();
      fetchIssuingCountries();
      fetchProductTypes();
      fetchproducers();
      fetchorderstatus();
      fetchCustodyServices();
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

  const orderStatusColumns = [
    { header: t("orderstatus"), accessor: "orderstatus" },
  ];

  const custodyServicesColumns = [
    { header: t("custodian"), accessor: "custodianid" },
    { header: t("custodyservicename"), accessor: "custodyservicename" },
    { header: t("fee"), accessor: "fee" },
    { header: t("paymentfrequency"), accessor: "paymentfrequency" },
    { header: t("currencyid"), accessor: "currencyid" },
    { header: t("maxweight"), accessor: "maxweight" },
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

      <h2>{t('producttypes')}</h2>
      <EnhancedTable data={productTypes} columns={productTypeColumns} />

      <h2>{t('producer')}</h2>
      <EnhancedTable data={producers} columns={producerColumns} />

      <h2>{t('orderstatus')}</h2>
      <EnhancedTable data={orderstatus} columns={orderStatusColumns} />

      <h2>{t('custodyservices')}</h2>
      <EnhancedTable data={custodyservices} columns={custodyServicesColumns} />

    </div>
  );
};

export default ReferenceData;