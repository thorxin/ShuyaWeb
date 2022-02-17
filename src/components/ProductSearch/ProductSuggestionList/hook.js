import { useHistory } from "react-router";

//components
import { SEARCH_BY_NAME } from "../../../constant/search";
import { goToSpecificPathNameWithData } from "../../../util/goToSpecificPathName";
import {
  PRODUCT_SEARCH,
  PRODUCT_SEARCH_RESULT,
} from "../../../constant/locationPathName";
import { setSearchHistory } from "../../../util/storage";

export function Hook() {
  const history = useHistory();

  const clickOnSuggestionProduct = (Product) => {
    setSearchHistory(Product);
    let propsState = {
      productName: Product.name,
      category: null,
      searchType: SEARCH_BY_NAME,
      isSearchByText: true
    };
    goToSpecificPathNameWithData(history, PRODUCT_SEARCH_RESULT, propsState);
  };

  return [clickOnSuggestionProduct];
}
