import React, { useState, useEffect } from "react";
import EnhancedTable from "../../common/EnhancedTable";
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ReferenceData = () => {
  const { t } = useTranslation();

  const [metals, setMetals] = useState([]);
  const [custodians, setCustodians] = useState([]);
  const [countries, setCountries] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [producers, setProducers] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [custodyServices, setCustodyServices] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          metalsResponse,
          custodiansResponse,
          countriesResponse,
          productTypesResponse,
          producersResponse,
          orderStatusResponse,
          custodyServicesResponse
        ] = await Promise.all([
          axios.get('http://localhost:11215/api/references/metals'),
          axios.get('http://localhost:11215/api/custodians'),
          axios.get('http://localhost:11215/api/references/issuingCountries'),
          axios.get('http://localhost:11215/api/references/productTypes'),
          axios.get('http://localhost:11215/api/references/producers'),
          axios.get('http://localhost:11215/api/references/orderstatus'),
          axios.get('http://localhost:11215/api/custodyServices')
        ]);

        setMetals(metalsResponse.data);
        setCustodians(custodiansResponse.data);
        setCountries(countriesResponse.data);
        setProductTypes(productTypesResponse.data);
        setProducers(producersResponse.data);
        setOrderStatus(orderStatusResponse.data);
        setCustodyServices(custodyServicesResponse.data);
      } catch (error) {
        console.error("Error fetching reference data:", error);
      }
    };

    fetchData();
  }, [t]);

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
      <EnhancedTable data={orderStatus} columns={orderStatusColumns} />

      <h2>{t('custodyservices')}</h2>
      <EnhancedTable data={custodyServices} columns={custodyServicesColumns} />
    </div>
  );
};

export default ReferenceData;