import { useSearchParams } from 'react-router-dom';
import { useAuthContext } from './useAuthContext';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

const useCustomerSelectMenu = () => {
    
    
    
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSelectedVendor = searchParams.get("vendor");
  let isRetailer = false;
  const { user } = useAuthContext();


  if (user.decodedToken.IsRetail === "1") {
    isRetailer = true;
  }

  const vendorsUrl = "https://api.marlin.ge/api/AccountDataFront";

  const {
    isLoading: vendorsIsLoading,
    error: vendorsError,
    data: vendorsData,
  } = useQuery({
    queryKey: ["calendar-select-customers"],
    queryFn: () => fetchData(vendorsUrl),
    select: (data) => {
      return data.data.data;
    },
  });

  const [selectedVendor, setSelectedVendor] = useState(null);

  let customers = null;

  if (isRetailer) {
    customers = vendorsData
      ?.filter((account) => !account.isRetail)
      .map((acc) => ({
        value: acc.name,
        label: acc.name,
        accountID: acc.accountID,
      }));
  } else {
    customers = vendorsData
      ?.filter((account) => account.isRetail)
      .map((acc) => ({
        value: acc.name,
        label: acc.name,
        accountID: acc.accountID,
      }));
  }

  useEffect(() => {
    if (!customers || !vendorsData) return;
    if (selectedVendor) return;

    const vendor = customers?.find((ven) => ven.value === urlSelectedVendor);

    if (!vendor) {
      setSelectedVendor(customers[0]);
    } else {
      setSelectedVendor(vendor);
    }
  }, [vendorsData, selectedVendor, setSelectedVendor]);

        
    
    

  return [customers, selectedVendor, setSelectedVendor]
    

}

export default useCustomerSelectMenu