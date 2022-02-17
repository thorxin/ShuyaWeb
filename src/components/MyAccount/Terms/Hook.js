import _ from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { goBack } from "../../../util/goToSpecificPathName";

export function Hook({
  isLoading,
  termsConditions,
  /**
   * action
   */
  fetchTerms,
}) {

  useEffect(() => {
    fetchTerms();
  }, []);

  const history = useHistory();
  const goBack = () => {
      history.goBack();
  };

  return [
    isLoading,
    termsConditions,
  /**
   * action
   */
    goBack
  ];
}
