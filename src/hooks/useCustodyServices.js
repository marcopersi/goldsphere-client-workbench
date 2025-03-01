import { useState, useEffect } from 'react';
import { fetchCustodyServices } from '../components/api/api';

const useCustodyServices = (homeDelivery) => {
  const [custodians, setCustodians] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await fetchCustodyServices();
        setCustodians([homeDelivery, ...data]);
      } catch (error) {
        console.error("Error fetching custodians data:", error);
      }
    };

    fetchServices();
  }, [homeDelivery]);

  return [custodians, setCustodians];
};

export default useCustodyServices;