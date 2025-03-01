import React from 'react';
import PropTypes from 'prop-types';

const CustodyServiceTable = ({ custodians, selectedCustodian, setSelectedCustodian, handleCustodyServiceChange, t }) => (
  <table style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
    <thead>
      <tr style={{ background: "linear-gradient(to bottom, silver, black)", color: "white" }}>
        <th style={{ border: "1px solid silver", padding: "10px" }}>{t('select')}</th>
        <th style={{ border: "1px solid silver", padding: "10px" }}>{t('custodyservicename')}</th>
        <th style={{ border: "1px solid silver", padding: "10px" }}>{t('fee')}</th>
        <th style={{ border: "1px solid silver", padding: "10px" }}>{t('paymentfrequency')}</th>
      </tr>
    </thead>
    <tbody>
      {custodians.map(custodian => (
        <tr key={custodian.id}>
          <td style={{ border: "1px solid silver", padding: "10px" }}>
            <input
              type="radio"
              name="custodian"
              value={custodian.id}
              checked={selectedCustodian === custodian.id}
              onChange={() => setSelectedCustodian(custodian.id)}
            />
          </td>
          <td style={{ border: "1px solid silver", padding: "10px" }}>
            {custodian.id === 'home_delivery' ? (
              custodian.custodyservicename
            ) : (
              <select
                value={custodian.custodyServiceId || ''}
                onChange={(e) => handleCustodyServiceChange(custodian.id, e.target.value)}
                style={{ width: '100%' }}
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
          <td style={{ border: "1px solid silver", padding: "10px" }}>{custodian.fee}</td>
          <td style={{ border: "1px solid silver", padding: "10px" }}>{custodian.paymentfrequency}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

CustodyServiceTable.propTypes = {
  custodians: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCustodian: PropTypes.string.isRequired,
  setSelectedCustodian: PropTypes.func.isRequired,
  handleCustodyServiceChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CustodyServiceTable;