import { useEffect, useState } from "react";
import { useHistory } from "react-router";

//components
import { SEARCH_CATEGORY } from "../../../constant/search";
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";
import { HISTORY_CATEGORY, setSearchHistory } from "../../../util/storage";
import { PRODUCT_SEARCH_RESULT } from "../../../constant/locationPathName";

export function Hook(delaySearchByText, clearData, searchedCurrentProduct) {
  const history = useHistory();

  const [isInputValue, setIsInputValue] = useState(false);
  const [isFocusInput, setIsFocusInput] = useState(false);

  const onFocus = () => setIsFocusInput(true);
  const onBlur = () => setIsFocusInput(false);

  const onChangeText = (value) => {
    if (value) {
      setIsInputValue(true);
      delaySearchByText(value);
      return;
    }
    clearData();
    setIsInputValue(false);
  };

  const dispatchClearDataList = () => {
    clearData();
  }

  const clickOnCategory = (Category) => {
    let propsState = {
      categoryName: Category.name,
      category: Category.id,
      searchType: SEARCH_CATEGORY,
    };
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState);
    setSearchHistory(Category, HISTORY_CATEGORY);
  };

  const clickOnBack = () => {
    history.goBack();
  };

  return [
    isFocusInput,
    isInputValue,
    /**
     * action
     */
    onFocus,
    onBlur,
    onChangeText,
    clickOnCategory,
    clickOnBack,
    dispatchClearDataList,
    setIsFocusInput
  ];
}
