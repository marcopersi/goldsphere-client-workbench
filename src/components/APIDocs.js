import React from "react";
import { useTranslation } from 'react-i18next';

const APIDocs = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('apiDocs')}</h2>
      <p>{t('apiDocsDescription')}</p>
      <h3>{t('endpoints')}</h3>
      <ul>
        <li>{t('getPortfolio')}</li>
        <li>{t('getProductRequest')}</li>
        <li>{t('getReferenceData')}</li>
        <li>{t('getAPIDocs')}</li>
      </ul>
    </div>
  );
};

export default APIDocs;