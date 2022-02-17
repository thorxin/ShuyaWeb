import { useEffect } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router";

export function Hook({
  isLoading,
  productOfferList,
  // action
  fetchTerms,
  fetchShipping,
  fetchWarranty,
  fetchPolicy,
  fetchPreOrderTC,
  fetchInstallation,
  fetchShippingById,
  fetchWarrantyById,
  fetchPolicyById,
  fetchPreOrderTCById,
  fetchInstallationById,
  fetchProductDetails  
}) {
 
  let { name } = useParams();

  useEffect(() => {
    switch (name) {
      case "shipping":
        fetchShipping();
      break;
      case "termsandcondition":
        fetchTerms();
      break;
      case "warranty":
        fetchWarranty();
      break;
      case "policy":
        fetchPolicy();
      break;
      case "preordertc":
        fetchPreOrderTC();
        break;
      case "installation":
        fetchInstallation();
      break;
  
      default:
        break;
  }
  },[name]);

    
  return [
    isLoading,
    productOfferList,
  ];
}
