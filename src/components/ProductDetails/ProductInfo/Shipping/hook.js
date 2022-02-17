import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export function Hook({
  isLoading,
  shippingInformation,
  // action
  fetchShipping,
}) {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    fetchShipping();
  }, []);

  return [isLoading, shippingInformation, goBack];
}
