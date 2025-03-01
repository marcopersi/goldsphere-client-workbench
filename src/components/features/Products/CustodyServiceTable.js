import React from 'react';
import PropTypes from 'prop-types';
import '../../../styles/CustodyServiceTable.css';

const CustodyServiceTable = ({ custodians, selectedCustodian, setSelectedCustodian, handleCustodyServiceChange, t }) => (
  <table className="custody-service-table">
    <thead>
      <tr>
        <th>{t('select')}</th>
        <th>{t('custodyservicename')}</th>
        <th>{t('fee')}</th>
        <th>{t('paymentfrequency')}</th>
      </tr>
    </thead>
    <tbody>
      {custodians.map((custodian) => (
        <tr key={custodian.id}>
          <td>
            <input
              type="radio"
              name="custodian"
              value={custodian.id}
              checked={selectedCustodian === custodian.id}
              onChange={() => setSelectedCustodian(custodian.id)}
            />
          </td>
          <td>
            {custodian.id === 'home_delivery' ? (
              custodian.custodyservicename
            ) : (
              <select
                value={custodian.custodyServiceId || ''}
                onChange={(e) => handleCustodyServiceChange(custodian.id, e.target.value)}
              >
                <option value="" disabled>{t('select')}</option>
                {custodians
                  .filter(c => c.id !== 'home_delivery')
                  .map(c => (
                    <option key={c.id} value={c.id}>
                      {c.custodyservicename}
                    </option>
                  ))}
              </select>
            )}
          </td>
          <td>{custodian.fee}</td>
          <td>{custodian.paymentfrequency}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

CustodyServiceTable.propTypes = {
  custodians: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    custodyservicename: PropTypes.string.isRequired,
    fee: PropTypes.string.isRequired,
    paymentfrequency: PropTypes.string.isRequired,
  })).isRequired,
  selectedCustodian: PropTypes.string.isRequired,
  setSelectedCustodian: PropTypes.func.isRequired,
  handleCustodyServiceChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CustodyServiceTable;